# 2026-04-23 todoist_projection_due_date_propagation_gap

## 目的

Todoist projection で新規 task に due が入らない事象の原因を、
状態層を分けて固定し、
応急対策と恒久対策を明確にする。

---

## 現象

daily review 後に Todoist へ新規 create された active task の一部で、
due が空のまま作成された。

既存の継続 task には due が残っていたため、
Todoist 全体の不具合ではなく、
新規 create 経路の date 伝播欠落とみなすのが自然である。

---

## 状態層

### repo

- `src/services/tasks/projection.js` は `due_date` / `due_type` を扱える
- `buildProjectionPayload()` は `due_date` または `rollingDayDate` から `due_string` / `deadline_date` を組み立てる
- `notes/04_operations/active_operations.md` の task には `due_date` が書かれている

### canonical

- operations 正本では `due_date` が保持されている
- daily review 後の active_operations にも due_date は存在する

### runtime

- 実運用では `projectTasks` を Todoist projection に使っている
- この projection 入出力スキーマには `due_date` / `due_type` が存在しない
- そのため create / update 時に due 情報が渡らない

---

## 直接原因

`projectTasks` 実行時に渡される active task 情報に
`due_date` / `due_type` が含まれていなかった。

その結果、
新規 create payload に due が入らず、
Todoist task が日付なしで作成された。

---

## 根本原因

Todoist projection の repo 実装と、
実運用で使っている `projectTasks` の task schema がずれている。

repo 実装側は
`due_date` / `due_type`
を前提にしているが、
runtime projection 側の schema は
`task / source_ref / rolling_day / why_now / notes`
までしか持たず、
date 情報を伝播できない。

つまり、
repo と runtime の interface mismatch が根本原因である。

---

## 応急対策

日付なしで作成された Todoist task に対しては、
daily review 後に手動で due_date を補正する。

2026-04-23 時点では次の 3 件を手動補正した。

- `ADAM の instruction へ daily review reroll gate 反映を確認する`
- `operations 提案時の Day 容量と reroll completeness を同時に確認するチェック項目を整理する`
- `pending_tasks 型 split 後の inbox archive / pending rule を整理する`

---

## 恒久対策

### 1. projectTasks schema 拡張

`current_active_tasks` / `previous_active_tasks` の task shape に
少なくとも次を追加する。

- `due_date`
- `due_type`

### 2. projection payload 伝播

create / update 時に、
task が持つ `due_date` / `due_type` を
Todoist payload へ渡す。

### 3. fallback 明示

`due_date` がない場合のみ、
必要に応じて `rolling_day` から日付補完する。

### 4. review 後チェック

daily review では Todoist projection 更新後に、

- 新規 create された task に due が入っているか

を確認する。

---

## 完了条件

- `projectTasks` schema で `due_date` / `due_type` を扱える
- 新規 create task に due が入る
- update 経路でも due が維持または更新される
- daily review 後に手動補正が不要になる
- repo 実装と runtime projection の interface mismatch が解消される

---

## 次に落とす作業

- `projectTasks` schema に due_date / due_type を追加する
- `projectTasks` の create / update payload へ due を伝播する
- `daily review 後に新規 Todoist task の due 有無を確認する最小チェックを design / review に落とす`
