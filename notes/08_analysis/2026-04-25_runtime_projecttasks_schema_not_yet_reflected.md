# 2026-04-25 runtime_projecttasks_schema_not_yet_reflected

## 目的

`config/ai/adam_schema.yaml` 更新後も、
ADAM runtime の `projectTasks` tool schema に
`due_date` / `due_type` がまだ反映されていない状態を記録する。

---

## 観測

2026-04-25 の会話時点で、
repo 上では `config/ai/adam_schema.yaml` の `OperationTaskSchema` に
次を追加済みである。

- `due_date`
- `due_type`

また、`config/ai/adam_instruction.md` にも
Action / API schema 更新時は runtime tool schema 反映確認まで
completed としないルールを追加済みである。

しかし、この会話で利用可能な `projectTasks` tool schema 上では、
operation task shape にまだ次の field が見えていない。

- `current_active_tasks[].due_date`
- `current_active_tasks[].due_type`
- `previous_active_tasks[].due_date`
- `previous_active_tasks[].due_type`

見えている field は概ね次に留まっている。

- `task`
- `source_ref`
- `rolling_day`
- `why_now`
- `notes`
- `status`
- `completed`
- `external.todoist_task_id`

---

## 判断

これは repo 更新済みだが runtime 未反映の状態である。

そのため、
`ADAM runtime の projectTasks schema に due_date / due_type が反映されたか確認する`
task は未完了のまま扱う。

この状態で Todoist projection を apply すると、
新規 create task の due 欠落を再発させる可能性がある。

---

## 次の確認

- GPT Action / runtime schema を再反映する
- 新しい runtime tool schema に `due_date` / `due_type` が見えるか確認する
- `projectTasks` dry_run で create / update payload に `due_string` または `deadline_date` が入るか確認する

---

## 完了条件への影響

次はまだ未達である。

- ADAM runtime の `projectTasks` tool schema に `due_date` / `due_type` が露出している
- dry_run payload に due 情報が入る
- Todoist projection 後の手動 due 補正が不要になる
