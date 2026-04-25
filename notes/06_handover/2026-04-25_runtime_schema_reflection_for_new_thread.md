# Handover

## 概要

2026-04-25 のセッションでは、Todoist projection の `due_date` / `due_type` 伝播欠落について、repo schema、instruction、operations、analysis を更新した。

主な到達点は次の通り。

- `config/ai/adam_schema.yaml` の `OperationTaskSchema` に `due_date` / `due_type` を追加した
- `config/ai/adam_instruction.md` に Action / API schema 更新時の runtime 反映確認ルールを追加した
- `notes/04_operations/active_operations.md` に `ADAM runtime の projectTasks schema に due_date / due_type が反映されたか確認する` task を追加した
- 一時点では、この会話の runtime tool schema に `due_date` / `due_type` がまだ見えていない観測を `notes/08_analysis/2026-04-25_runtime_projecttasks_schema_not_yet_reflected.md` に保存した
- その後、ユーザーが外部側で runtime 反映を実施したと報告した

この handover の目的は、新スレッドで ADAM runtime に新しい tool schema を適用した状態として再開し、`projectTasks` の `due_date` / `due_type` 伝播を検証することである。

---

## 成功（Success）

- Todoist due 欠落の根本原因を、repo code ではなく runtime-exposed schema の interface mismatch として整理した
- `src/services/tasks/projection.js` は既に `due_date` / `due_type` を Todoist payload に変換できることを確認した
- `src/services/tasks/validate.js` も `due_date` / `due_type` を validate / normalize できることを確認した
- `config/ai/adam_schema.yaml` を `2.1.6` に上げ、`OperationTaskSchema` に次を追加した
  - `due_date`
  - `due_type` enum: `date`, `deadline`
- `config/ai/adam_instruction.md` に、schema 更新後も runtime tool schema 確認まで completed としないルールを追加した
- `notes/02_design/2026-04-23_todoist_projection_due_date_propagation_gap.md` に、最小恒久対策を `schema 更新 → runtime 再反映 → dry_run 確認` として整理した
- `notes/04_operations/active_operations.md` の Day5 に runtime 反映確認 task を追加した
- ユーザーが runtime 反映を実施したと報告したため、新スレッドでは runtime 反映済み前提で確認に入れる

---

## 判明事項（Findings）

- `projection.js` の `getTaskDatePayload()` は `due_type: deadline` の場合 `deadline_date` を作り、それ以外の `due_date` は `due_string` にする
- `buildProjectionPayload()` は `due_date` が渡れば create / update payload に due 情報を含められる
- `validate.js` は `due_type` を `date` / `deadline` に限定できる
- 欠落していたのは repo code 側ではなく、GPT Action / runtime tool schema 側に `due_date` / `due_type` が露出していないことだった
- repo schema 更新、Action 再反映、runtime 確認は別状態として扱う必要がある
- Todoist projection の `apply` は、runtime schema 確認と dry_run payload 確認が終わるまで避けるのが安全

---

## 失敗 / 未解決（Issues）

- 2026-04-25 の会話中に一度、write 前の事前表示を省略してしまった。以後は `read → 整理 → 事前表示 → write → 保存確認` を必ず守る
- `notes/08_analysis/2026-04-25_runtime_projecttasks_schema_not_yet_reflected.md` は、runtime 反映前の観測として残っている。ユーザー報告により最新状態は「runtime 反映済み」だが、新スレッドで実際に tool schema と dry_run を確認する必要がある
- `ADAM runtime の projectTasks schema に due_date / due_type が反映されたか確認する` task は、まだ canonical には completed として反映していない
- `Todoist projection の due_date / due_type 伝播欠落を埋める最小対策を design に落とす` は design / schema / instruction まで進んだが、dry_run 確認前なので完全完了とは扱わない
- 2026-04-25 の進捗は daily review / daily report / archive_operations にはまだ返していない

---

## 次のアクション（Next Actions）

1. 新スレッドで最新 handover と関連ファイルを読む
2. `projectTasks` tool schema に以下が見えるか確認する
   - `current_active_tasks[].due_date`
   - `current_active_tasks[].due_type`
   - `previous_active_tasks[].due_date`
   - `previous_active_tasks[].due_type`
3. `projectTasks` を `dry_run` で実行し、payload に `due_string` または `deadline_date` が入るか確認する
4. dry_run が成功したら、`notes/08_analysis/2026-04-25_runtime_projecttasks_schema_not_yet_reflected.md` の後続観測として runtime 反映済み確認メモを保存する
5. operations 上の `ADAM runtime の projectTasks schema に due_date / due_type が反映されたか確認する` task を completed 候補として扱う。ただし archive 移動は daily review で行う
6. Todoist projection の `apply` は、dry_run の due payload 確認後に行う
7. その後、2026-04-25 分の daily review で active / next / archive / Todoist projection / daily report / content を整理する

---

## 関連docs

- `docs/13_dev_workflow.md`
- `docs/17_operations_system.md`
- `docs/05_roadmap.md`

---

## 関連code

- `config/ai/adam_schema.yaml`
- `config/ai/adam_instruction.md`
- `src/services/tasks/projection.js`
- `src/services/tasks/validate.js`
- `src/services/tasks/dispatch.js`
- `api/tasks/project.js`
- `api/tasks/project.test.js`
- `src/services/tasks/projection.test.js`

---

## 関連notes

- `notes/04_operations/active_operations.md`
- `notes/04_operations/next_operations.md`
- `notes/02_design/2026-04-23_todoist_projection_due_date_propagation_gap.md`
- `notes/08_analysis/2026-04-25_runtime_projecttasks_schema_not_yet_reflected.md`
- `notes/01_issues/idea_log.md`
- `notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md`
- `notes/06_handover/2026-04-25_phase0_review_and_todoist_alignment.md`

---

## 状態サマリ

- API：repo code は `due_date` / `due_type` を扱える。`adam_schema.yaml` も更新済み。ユーザー報告では runtime 反映済み。新スレッドで tool schema 可視性と dry_run payload を確認する必要がある。
- docs整合：docs 本体は未更新。今回は notes/design/code schema/instruction の範囲で進めている。SSOT 判断が必要な大きな仕様変更ではなく、projection interface mismatch の補正として扱う。
- notesフロー：design、analysis、active_operations は更新済み。daily review 未実施のため、完了 task の archive 移動や Day 再編はまだ行わない。

---

## 引き継ぎプロンプト

この handover を読み込んで、関連 docs / notes / code を取得し、現状を把握してから作業を再開して。

ユーザーは前スレッド末尾で「runtime に反映した。ADAM に適用するために新スレッドに移行しよう」と報告している。したがって最初に、`projectTasks` の runtime tool schema に `current_active_tasks[].due_date` / `current_active_tasks[].due_type` / `previous_active_tasks[].due_date` / `previous_active_tasks[].due_type` が見えるか確認すること。

見える場合は、`projectTasks` を `dry_run` で実行し、create / update payload に `due_string` または `deadline_date` が入るか確認する。dry_run 確認前に Todoist projection の `apply` はしない。

確認後、runtime 反映済みの観測を analysis に保存し、operations 上の `ADAM runtime の projectTasks schema に due_date / due_type が反映されたか確認する` task を completed 候補として扱う。ただし active から archive へ移すのは daily review で行う。
