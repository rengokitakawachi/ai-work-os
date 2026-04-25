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
- `src/services/tasks/validate.js` の `assertOperationTask()` / `normalizeOperationTask()` は `due_date` / `due_type` を扱える
- `config/ai/adam_schema.yaml` の `OperationTaskSchema` には `due_date` / `due_type` がまだ露出していない
- 実際にこの会話で使える `projectTasks` tool schema にも `due_date` / `due_type` が露出していない
- `notes/04_operations/active_operations.md` の task には `due_date` が書かれている

### canonical

- operations 正本では `due_date` が保持されている
- daily review 後の active_operations にも due_date は存在する
- operations 正本から Todoist execution view へ投影する時点で、due 情報を落としてはならない

### runtime

- 実運用では `projectTasks` を Todoist projection に使っている
- runtime の GPT Action / tool schema に `due_date` / `due_type` が露出していない場合、ADAM は projection 入力に due 情報を渡せない
- そのため create / update 時に due 情報が渡らず、新規 Todoist task の due が空になる

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
実運用で使っている `projectTasks` の GPT Action / tool schema がずれている。

repo 実装側は
`due_date` / `due_type`
を扱える状態に近い。

一方で、ADAM が実際に呼び出す runtime tool schema では、
`current_active_tasks` / `previous_active_tasks` の task shape が
`task / source_ref / rolling_day / why_now / notes / status / completed / external`
までに留まり、
date 情報を伝播できない。

つまり、
repo code の projection capability と runtime-exposed schema の interface mismatch が根本原因である。

---

## 追加確認（2026-04-25）

### 確認済み

- `src/services/tasks/projection.js`
  - `getTaskDatePayload()` は `due_date` / `due_type` を読む
  - `due_type: deadline` の場合は `deadline_date` を作る
  - それ以外の `due_date` は `due_string` にする
  - `due_date` がない場合は `rollingDayDate` fallback を使える
  - create / update payload に due 情報を含める経路がある

- `src/services/tasks/validate.js`
  - `assertOperationTask()` は `due_date` を string として検証する
  - `assertOperationTask()` は `due_type` を `date` / `deadline` に限定する
  - `normalizeOperationTask()` は `due_date` / `due_type` を保持する

### 未解決

- `config/ai/adam_schema.yaml` の `OperationTaskSchema` に `due_date` / `due_type` がない
- 現在の ADAM runtime の `projectTasks` tool schema にも `due_date` / `due_type` がない
- `dispatchProject()` は `rollingDayDates` を渡していないため、runtime 入力に `due_date` がない場合、`rolling_day` からの fallback も効かない

---

## 応急対策

日付なしで作成された Todoist task に対しては、
daily review 後に手動で due_date を補正する。

2026-04-23 時点では次の 3 件を手動補正した。

- `ADAM の instruction へ daily review reroll gate 反映を確認する`
- `operations 提案時の Day 容量と reroll completeness を同時に確認するチェック項目を整理する`
- `pending_tasks 型 split 後の inbox archive / pending rule を整理する`

ただしこれは runtime schema mismatch を解消しないため、恒久対策ではない。

---

## 恒久対策

### 1. ADAM Action schema の OperationTaskSchema 拡張

`config/ai/adam_schema.yaml` の `OperationTaskSchema` に、
少なくとも次を追加する。

- `due_date`
  - type: `string`
  - 意味: operations 正本上の task due date
  - 形式: 原則 `YYYY-MM-DD`

- `due_type`
  - type: `string`
  - enum: `date`, `deadline`
  - 意味: Todoist へ通常 due として入れるか deadline として入れるか

### 2. GPT Action / runtime schema の再反映

repo の schema 更新だけでは完了としない。

Action 定義を再反映し、ADAM runtime の `projectTasks` tool schema に
`due_date` / `due_type` が見えることを確認する。

### 3. projection payload 伝播確認

runtime から `projectTasks` を呼ぶとき、
`current_active_tasks` / `previous_active_tasks` の各 task に
operations 正本の `due_date` / `due_type` を含める。

`due_date` が渡れば、既存の `buildProjectionPayload()` が
Todoist payload へ伝播する。

### 4. rolling_day fallback は後段扱い

`rolling_day` から日付を補完する fallback は、
`dispatchProject()` が `rollingDayDates` を受け取れるようにする必要がある。

これは今回の最小対策には含めない。
まずは operations 正本に存在する `due_date` を runtime input に通すことで、
新規 create の due 欠落を止める。

### 5. review 後チェック

daily review では Todoist projection 更新後に、

- 新規 create された task に due が入っているか
- `deadline` 指定 task で deadline 権限不足が起きた場合、fallback 結果が projection result に残っているか

を確認する。

---

## 実装前提

最小実装対象は次の通り。

- `config/ai/adam_schema.yaml`
  - `OperationTaskSchema` に `due_date` / `due_type` を追加する

- Action / GPT runtime 設定
  - schema 再反映後、`projectTasks` tool schema に `due_date` / `due_type` が露出していることを確認する

- 必要に応じて test
  - `api/tasks/project.test.js` に `current_active_tasks[].due_date` / `due_type` を受け付ける確認を追加する
  - `projection.test.js` の既存 due payload test は維持する

今回は `src/services/tasks/projection.js` の責務拡張を主対象にしない。
既存実装が due payload を作れるため、まず interface mismatch の解消を優先する。

---

## 完了条件

- `config/ai/adam_schema.yaml` の `OperationTaskSchema` で `due_date` / `due_type` を扱える
- ADAM runtime の `projectTasks` tool schema に `due_date` / `due_type` が露出している
- `projectTasks` 呼び出し時に operations 正本由来の `due_date` / `due_type` を渡せる
- dry_run の create / update payload に `due_string` または `deadline_date` が入る
- 新規 create task に due が入る
- update 経路でも due が維持または更新される
- daily review 後に手動補正が不要になる
- repo code の projection capability と runtime-exposed schema の interface mismatch が解消される

---

## 次に落とす作業

- `config/ai/adam_schema.yaml` の `OperationTaskSchema` に due_date / due_type を追加する
- Action / GPT runtime schema を再反映し、`projectTasks` tool schema に due_date / due_type が見えることを確認する
- `projectTasks` dry_run で新規 create payload に due が入ることを確認する
- daily review 後に新規 Todoist task の due 有無を確認する最小チェックを review 手順へ返す
