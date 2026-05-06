# 2026-04-30 DELTA v0.6 operations Todoist projection

## 結論

DELTA v0.6 では、DELTA の `operations/active_operations.md` を Todoist execution view へ投影する機能を追加する。

これは DELTA 学習実行の visibility を上げる機能であり、DELTA operations の正本を Todoist に置き換えるものではない。

---

## 背景

DELTA v0.2 で read-only Action は成立した。

DELTA v0.5 で history write / operations update の runtime behavior は確認済みである。

次に、DELTA の学習 operations を Todoist に投影できると、日次の学習実行が見える化され、ADAM 側の operations projection と同じ運用感で DELTA を扱える。

DELTA roadmap / operations でも、Todoist projection は optional として扱われている。

---

## Scope

### In scope

- DELTA `systems/delta/operations/active_operations.md` の task を Todoist に投影する
- `due_date` / `due_type` を Todoist due に反映する
- `subject` / `study_type` / `material` / `topic` を Todoist description に反映する
- `source_ref` は `systems/delta/...` を維持する
- Todoist projection は view として扱い、DELTA operations を正本とする
- dry_run と apply を分ける
- apply 後に Todoist task id を DELTA operations へ戻す設計を検討する

### Out of scope

- Todoist を DELTA operations の正本にすること
- Todoist 側変更から DELTA operations へ双方向同期すること
- 学習履歴 history の自動生成
- L3 評価記号の Todoist 側編集
- Outlook / calendar 連携

---

## Existing projection gap

既存の `src/services/tasks/projection.js` は ADAM active_operations を前提としている。

特に以下が DELTA ではそのまま使いにくい。

- description の ref が `notes/04_operations/active_operations.md` に固定されている
- task payload は汎用的だが、DELTA 固有 field の説明文化がない
- `target` は schema 上 `active` のみ
- DELTA project_id / label / section の指定方針が未定
- apply 後の `todoist_task_id` を DELTA operations へ戻す経路が未整理

---

## Candidate implementation direction

### Option A: projectTasks を汎用化する

`projectTasks` の target を拡張する。

```text
target:
  - active
  - delta_active
```

DELTA 用に context を分ける。

```text
source_root: systems/delta/operations/active_operations.md
projection_profile: delta
project_id: optional
```

メリット:

- 既存 projection service を再利用できる
- ADAM と DELTA の projection 差分を小さくできる
- due_date / due_type の既存改善を使える

リスク:

- ADAM 専用前提を残したまま target だけ増やすと責務混線する
- schema / runtime reflection の確認が必要

### Option B: delta 専用 projection endpoint を作る

`/api/repo-resource` または `/api/tasks/project` に DELTA 専用 action を追加する。

メリット:

- DELTA 固有 payload を扱いやすい
- ADAM projection を壊しにくい

リスク:

- API surface が増える
- 既存方針「DELTA v0.3 以降は新規 API route を増やさず `/api/repo-resource` 統合方式」に反する可能性がある

### Preferred

Option A。

既存 `/api/tasks/project` と `src/services/tasks/projection.js` を拡張し、projection profile を分ける。

新規 API route は増やさない。

---

## Expected task shape

DELTA operation task は既存 ADAM task fields に加えて、次を持ちうる。

```yaml
task: string
source_ref: string[]
rolling_day: Day0
due_date: YYYY-MM-DD
due_type: date
subject: string
topic: string
study_type: L1/L2/L3/秒トレ
material: string
status: optional
notes: string[]
external:
  todoist_task_id: optional
```

Todoist description 例:

```text
profile: DELTA
subject: 国民年金法
study_type: L1/L2
material: 動画講義 / 基礎講座テキスト
topic: 6章 障害基礎年金
notes: 最低ライン: 秒トレ40問 + L1 国民年金法6章完了
source_ref: systems/delta/plan/2026_sharoushi_exam_plan.md, systems/delta/roadmap/delta_roadmap.md
ref: systems/delta/operations/active_operations.md
```

---

## Completed condition

- DELTA v0.6 schema proposal を作る
- `projectTasks` または同等 projection usecase が DELTA active operations を受け取れる
- dry_run で DELTA operations tasks から Todoist create/update payload が生成される
- payload description に DELTA 固有 field と `ref: systems/delta/operations/active_operations.md` が入る
- apply で Todoist task が作成または更新される
- apply 結果の Todoist task id を DELTA operations へ戻す方法を確認する
- ADAM active projection が壊れていないことを確認する
- DELTA GPT runtime-visible schema / behavior を確認する

---

## Routing decision

- type: operations candidate
- target: next_operations
- version: DELTA v0.6
- reason:
  - DELTA 日次学習の execution visibility に直結する
  - 既存 ADAM projection の再利用余地が大きい
  - ただし active_operations への即横入りはせず、ADAM の current active order を壊さない

---

## Source refs

- systems/delta/roadmap/delta_roadmap.md
- systems/delta/operations/active_operations.md
- systems/delta/plan/2026_sharoushi_exam_plan.md
- src/services/tasks/projection.js
- api/repo-resource.js
- config/ai/adam_schema.yaml
