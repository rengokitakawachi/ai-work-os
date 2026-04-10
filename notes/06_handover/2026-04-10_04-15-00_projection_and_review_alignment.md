# Handover

## 概要
このセッションでは、operations → Todoist 片方向 projection プロトタイプを、design・client・service・endpoint・schema まで接続した。その後、daily review を report 作成だけで終えてしまった誤りを是正し、review 実行ルールを instruction と review spec に追加した。さらに、active / archive の整合を取り直し、明日の最優先タスクを `web 版 GPT editor で ADAM instruction の最新変更を反映する` に固定した。ユーザー側では ADAM の instruction と schema の GPT editor 反映も完了済みであり、新スレではその前提で dry-run 検証から再開できる。

---

## 成功（Success）
- `notes/02_design/2026-04-09_operations_to_todoist_one_way_projection_prototype.md` に、operations → Todoist 片方向 projection の最小仕様を整理した
- projection の前提として
  - operations を正本
  - Todoist を execution view
  - 片方向
  - create / update / close / delete
  - active_operations のみを当面対象
  を固定した
- `project_id` を ADAM 専用概念ではなく、projection target project を指定する汎用入力として整理し直した
- `src/services/todoist/client.js` に `deleteTask` を追加した
- create 系に `project_id` を通し、`src/services/tasks/service.js` と `src/services/tasks/validate.js` を更新した
- `src/services/tasks/projection.js` を追加し、
  - create / update / close / delete / noop 判定
  - `todoist_task_id` 反映
  - projection target project 指定
  - `dryRun`
  を扱える最小 skeleton を実装した
- projection 専用 endpoint `POST /api/tasks/project` を追加し、
  `target / mode / project_id / previous_active_tasks / current_active_tasks`
  を受けて projection service を呼べる形にした
- `config/ai/adam_schema.yaml` に
  - `project_id` 付き `createTask`
  - `projectTasks`
  - `OperationTaskSchema`
  - `ProjectTasksRequest`
  - `TaskProjectResponse`
  を追加した
- daily review の誤りを受けて、
  - `code/config/ai/adam_instruction.md`
  - `notes/02_design/2026-04-03_review_system_operating_spec.md`
  に review 実行ルールと完了条件を追加した
- `notes/04_operations/active_operations.md` を rolling 後の状態に整え、
  2026-04-10 を `Day0` として再採番した
- `notes/04_operations/archive_operations.md` に 2026-04-09 完了タスクが入っていることを確認し、active との整合を回復した
- `notes/07_reports/daily/2026-04-09.md` を保存した
- ユーザー側で ADAM の instruction と schema を GPT editor に反映済みになった

---

## 判明事項（Findings）
- 既存 tasks API / Todoist client は未完成だが、projection service を差し込む途中形としては十分使える
- projection の責務を service 層へ寄せ、API を薄く保つ方針は既存 design と整合する
- `project_id` を task 本文に持たせず、projection 実行コンテキストで渡す形にすると、投影先分離と汎用性を両立しやすい
- iPhone アプリでは GPT の Actions / schema 編集はできず、web 版前提で扱う必要がある
- daily review は report 作成ではなく、
  - 実績確認
  - 明日の実行順調整
  - operations 更新
  - report 保存
  の手順完了で判定すべき
- review 完了判定を成果物基準ではなく手順基準へ切り替えないと、同じ失敗を繰り返しやすい

---

## 失敗 / 未解決（Issues）
- `POST /api/tasks/project` はできたが、まだ operations 正本を自動で読んで previous / current を生成するところまでは未接続
- `projectTasks` の実データ `dry_run` 検証はまだ未実施
- projection 実行結果を operations ファイルへどの単位で書き戻すかは未整理
- tasks API 全体の再設計論点は issue `20260409-015` として残っているが、design 着手はこれから
- `notes/07_reports/daily/2026-04-09.md` には「schema 反映は未実施」と書かれているが、その後ユーザー側で GPT editor 反映は完了した。日報本文は最新状態をまだ反映していない
- `api/tasks/project.js` 追加後の schema / endpoint / GPT Action 接続はできたが、実運用の first success はまだ取れていない

---

## 次のアクション（Next Actions）
- `projectTasks` Action 前提で、`POST /api/tasks/project` の `dry_run` を active の 1 task で試す
- まず `current_active_tasks` に 1 task だけを渡し、
  `mode: dry_run` + `project_id` 指定で create 判定・payload・project_id 反映を確認する
- その結果を見て、operations 正本の read / write 接続の最小方針を決める
- その後、必要なら projection 実行結果の返却先を design または dev_memo に追加整理する
- 別論点として、issue `20260409-015` の tasks API 全体再設計に着手するかを再評価する

---

## 関連docs
- docs/13_dev_workflow.md
- docs/15_notes_system.md
- docs/17_operations_system.md

---

## 関連code
- code/config/ai/adam_instruction.md
- code/config/ai/adam_schema.yaml
- code/src/services/todoist/client.js
- code/src/services/tasks/service.js
- code/src/services/tasks/validate.js
- code/src/services/tasks/dispatch.js
- code/src/services/tasks/projection.js
- code/api/tasks/project.js

---

## 関連notes
- notes/02_design/2026-04-09_operations_to_todoist_one_way_projection_prototype.md
- notes/02_design/2026-04-03_review_system_operating_spec.md
- notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md
- notes/03_plan/2026-04_phase1_todoist_outlook_foundation.md
- notes/04_operations/active_operations.md
- notes/04_operations/archive_operations.md
- notes/04_operations/next_operations.md
- notes/07_reports/daily/2026-04-09.md
- notes/01_issues/idea_log.md

---

## 状態サマリ
- API：projection endpoint / service / Todoist client 最小差分まで実装済み。first dry-run success は未確認
- docs整合：review 実行ルールは instruction / design に反映済み。projection design も更新済み
- notesフロー：daily review の rolling は是正済み。active は 2026-04-10 を Day0 とする状態に更新済み。archive と整合済み

---

## 引き継ぎプロンプト

このhandoverを読み込んで、関連docs・related notes・active_operations を取得し、`projectTasks` の dry-run 検証から再開して
