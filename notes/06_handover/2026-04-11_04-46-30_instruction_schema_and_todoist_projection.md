# Handover

## 概要
このセッションでは、review / operations / Todoist projection の運用境界を整理し、ADAM instruction と review spec へ日中運用原則を反映した。
あわせて、operations → Todoist projection を実運用レベルまで進め、事前参照・date / deadline 変換・無料プラン時の deadline fallback・`todoist_task_id` による同名 task 許容更新を確認した。
最後に、最新の active_operations を daily review 後の状態へ調整し、明日 Day0 先頭に「web 版 GPT editor で ADAM instruction / schema の最新変更を反映する」を復帰させた。

---

## 成功（Success）
- review / operations の日中運用原則を `code/config/ai/adam_instruction.md` と `notes/02_design/2026-04-03_review_system_operating_spec.md` に反映した
- `notes/02_design/2026-04-09_operations_to_todoist_one_way_projection_prototype.md` に、事前参照・date / deadline・同名 task 許容・無料プラン fallback を反映した
- `src/services/tasks/projection.js` に
  - Todoist 事前参照
  - `todoist_task_id` 優先更新
  - due_date / due_type → date / deadline 変換
  - deadline 403 時の skip fallback
  を実装した
- `src/services/todoist/client.js` に deadline_date 対応を追加した
- `src/services/tasks/validate.js` に due_date / due_type の受け入れを追加した
- EVE開発 project の Todoist task を一度削除し、最新 active_operations から再作成した
- active_operations の全 task に `due_date / due_type: date` を付け、Todoist 側へ日付反映を確認した
- 2026-04-10 daily review を実行し、daily report を保存した
- 明日 Day0 先頭 task を「instruction / schema 反映」内容へ修正した

---

## 判明事項（Findings）
- operation の rolling は原則 daily review でのみ実行し、archive 移動も daily review で固定するのが正しい
- 会話中は active 内の優先順位変更や並び替えは許可してよい
- Todoist projection 前に project の現状 task を読む手順が必要
- 同名 task は許容できるが、上書き対象の主識別子は `external.todoist_task_id` に置く必要がある
- Todoist 無料プランでは deadline は使えず、`deadline_date` を含む update は 403 になる
- そのため、schema 上は deadline を保持しつつ、実行時は deadline を skip して継続する設計が現実的
- Day 見出し日付の自動解釈は未接続であり、現状は task ごとの明示 `due_date` が確実

---

## 失敗 / 未解決（Issues）
- `config/ai/adam_schema.yaml` の repo 内更新は今回未反映の可能性があるため、web 版 GPT editor 上の最新 schema と repo 側の整合確認が必要
- Day 見出し日付を自動で読み取り Todoist date に落とす処理は未接続
- projection 結果を report / handover にどう定型返却するかは未整理
- Todoist 有料化後の deadline 実反映は未確認
- Day0 先頭の instruction / schema 反映 task は active に復帰済みだが、Todoist 側には新規作成されたため、必要なら `external.todoist_task_id` の書き戻し整理が必要

---

## 次のアクション（Next Actions）
- web 版 GPT editor で ADAM instruction と schema の最新変更を反映する
- `config/ai/adam_schema.yaml` の repo 側整合を確認し、必要なら更新する
- `Phase 0 plan に対する現行 operations の接続を見直す` から再開する
- weekly review 前提で active / next / archive の更新準備に進む

---

## 関連docs
- docs/13_dev_workflow.md
- docs/15_notes_system.md
- docs/17_operations_system.md

---

## 関連code
- code/config/ai/adam_instruction.md
- code/config/ai/adam_schema.yaml
- code/src/services/tasks/projection.js
- code/src/services/todoist/client.js
- code/src/services/tasks/validate.js

---

## 関連notes
- notes/02_design/2026-04-03_review_system_operating_spec.md
- notes/02_design/2026-04-09_operations_to_todoist_one_way_projection_prototype.md
- notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md
- notes/04_operations/active_operations.md
- notes/04_operations/archive_operations.md
- notes/07_reports/daily/2026-04-10.md
- notes/06_handover/2026-04-10_04-15-00_projection_and_review_alignment.md

---

## 状態サマリ
- API：projection の dry-run / apply、date 反映、deadline fallback まで確認済み
- docs整合：instruction と review spec には反映済み。schema 整合は要再確認
- notesフロー：daily review 実行済み。active / archive / daily report 更新済み

---

## 引き継ぎプロンプト

このhandoverを読み込んで、関連docsを取得し、active_operations を確認してから Day0 の instruction / schema 反映 task から作業を再開して
