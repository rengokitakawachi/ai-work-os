# active_operations

## Phase 0 位置づけ

### Phase 0 直結 task

- `repo の adam_instruction.md 変更を ADAM instruction へ反映する`
- `routing と writing を分離する最小実装を入れる`
- `issue routing の第一バッチ運用実験を実施する`
- `issue routing 第一バッチの観測結果を記録する`

### 補助 task

- `docs 番号衝突と旧 docs 群の整理方針をメモ化する`
- `Phase 1 各 plan と operations 接続案を並べる`

## Day0（04/21 火）

- task: repo の adam_instruction.md 変更を ADAM instruction へ反映する
  source_ref:
    - config/ai/adam_instruction.md
    - notes/01_issues/idea_log.md
    - notes/02_design/2026-04-20_routing_and_document_writing_separation.md
    - notes/02_design/2026-04-20_issue_routing_action_plan_handoff_schema.md
    - notes/04_operations/active_operations.md
  rolling_day: Day0
  why_now:
    - repo 上の instruction 変更だけでは不十分で、実際の ADAM instruction への反映はまだ未完了である
    - operations と issue routing の再発防止ルールを、実運用している instruction にも反映する必要がある
  notes:
    - Day 容量チェック
    - 前提変更を実験より先に置く原則
    - 送付先が自然でなければ issue に残してよい原則
    - repo 更新済みと実反映済みを混同しない
    - 実際の ADAM instruction へ反映した
  status: completed
  completed: true
  due_date: 2026-04-21
  due_type: date
  external:
    todoist_task_id: 6gQhHvcQp568p2Mq

- task: routing と writing を分離する最小実装を入れる
  source_ref:
    - notes/02_design/2026-04-20_routing_and_document_writing_separation.md
    - notes/02_design/2026-04-20_issue_routing_action_plan_handoff_schema.md
    - notes/02_design/2026-04-16_issue_routing_notes_write_minimum_usecase.md
    - src/services/flow-control/issue-routing.js
    - src/services/flow-control/issue-routing-actions.js
    - src/services/flow-control/issue-routing-notes-write.js
  rolling_day: Day0
  why_now:
    - 第一バッチ運用実験の前に、少なくとも routing と writer の分離骨格を code 側に反映しないと、観測対象が旧構造のままになる
  notes:
    - routed_candidates への過積載を減らし、normalized / decision / action plan の境界を code 上で明示する
    - writer usecase は keep_items を no-op として扱う
    - operations candidate は queue payload までに留める
  due_date: 2026-04-21
  due_type: date
  external:
    todoist_task_id: 6gQhHwqVpHPcWMFH

## Day1（04/22 水）

- task: issue routing の第一バッチ運用実験を実施する
  source_ref:
    - notes/02_design/2026-04-20_issue_routing_minimum_operation_experiment.md
    - notes/01_issues/idea_log.md
    - src/services/flow-control/issue-routing.js
    - src/services/flow-control/issue-routing-actions.js
    - src/services/flow-control/issue-routing-notes-write.js
    - src/services/flow-control/orchestrate.js
  rolling_day: Day1
  why_now:
    - 責務分離と action plan schema と最小実装を先に整理したうえで、第一バッチの観測を回す必要がある
  notes:
    - `20260418-022` と `20260419-023` を第一バッチ入力として routing する
    - route 判定、payload、operations candidate の rolling 接続可能性、route 多様性不足を記録する
    - `route_to: issue` / keep の結果も正規結果として観測する
  due_date: 2026-04-22
  due_type: date
  external:
    todoist_task_id: 6gQhHxprh7hfjPrq

- task: issue routing 第一バッチの観測結果を記録する
  source_ref:
    - notes/02_design/2026-04-20_issue_routing_minimum_operation_experiment.md
    - notes/01_issues/idea_log.md
    - src/services/flow-control/issue-routing.js
    - src/services/flow-control/issue-routing-actions.js
    - src/services/flow-control/issue-routing-notes-write.js
  rolling_day: Day1
  why_now:
    - 実験だけ行っても効果確認にならないため、観測結果を次の補正へ返す記録が必要である
  notes:
    - route ごとの結果、違和感、route 多様性不足、rolling 接続の妥当性を明示する
    - 必要なら design / report / issue へ返す
  due_date: 2026-04-22
  due_type: date
  external:
    todoist_task_id: 6gQhJ2gP7pxvMQ7H

## Day2（04/23 木）

- task: docs 番号衝突と旧 docs 群の整理方針をメモ化する
  source_ref:
    - notes/08_analysis/2026-04-04_repo_readthrough_findings.md
    - notes/00_inbox/dev_memo/2026-04-04_repo_consistency_check_followup.md
    - notes/04_operations/next_operations.md
  rolling_day: Day2
  why_now:
    - repo 全体整合には必要だが、直近は issue routing 完成を優先する
  notes:
    - docs 15 / 16 系の衝突整理を含む
    - `notes/08_analysis/2026-04-21_docs_number_collision_and_legacy_docs_cleanup_direction.md` を作成した
    - 現在の repo 実体では 15 / 16 / 17 の番号衝突は解消済みで、主問題は旧 docs 群の位置づけ整理であると確認した
  status: completed
  completed: true
  due_date: 2026-04-23
  due_type: date
  external:
    todoist_task_id: 6gQFMv28VrRWm55H

- task: Phase 1 各 plan と operations 接続案を並べる
  source_ref:
    - notes/03_plan/2026-04_phase1_todoist_outlook_foundation.md
    - notes/03_plan/2026-04_phase1_schedule_proposal_and_outlook_write.md
    - notes/03_plan/2026-04_phase1_teams_and_obsidian_light_use.md
    - notes/04_operations/next_operations.md
  rolling_day: Day2
  why_now:
    - 次 phase への接続には必要だが、直近は issue routing 完成と docs 整合を優先したい
  notes:
    - Todoist / Outlook 接続の前段として保持する
    - `notes/08_analysis/2026-04-21_phase1_plan_to_operations_connection_candidates.md` を作成した
    - foundation → proposal/write → support の依存順で operations に落とす方針を固定した
  status: completed
  completed: true
  due_date: 2026-04-23
  due_type: date
  external:
    todoist_task_id: 6gQFMvgvW5j8QJ5H

## Day3（04/24 金）

- なし

## Day4（04/25 土）

- なし

## Day5（04/26 日）

- なし

## Day6（04/27 月）

- なし

---

## ルール

- 実行対象は active_operations に入っている task のみとする
- 実行は上から順に行う
- Day は仮配置であり固定日付ではない
- 日付と曜日は人間可読性のために付与する
- 日付表示は daily review 時に更新する
- active_operations の各 task は task / source_ref / rolling_day を必須で持つ
- why_now / notes / due_date / due_type は必要に応じて持つ
- operations は候補を優先順位で並べ、7日枠に入るものを active_operations とする
- active に入らなかった上位候補を next_operations に置く
- スコアは補助であり、決定ではない
- 会話中に新規タスク候補が発生した場合は、先に operations rolling を行う
- 新規候補は active / next / future のどこに置くか決めてから扱う
- reroll 前に active 外タスクを実行しない
- 未完了タスクは翌日以降へ移動する
- 完了タスクは必要に応じて archive_operations に移す
- Phase 0 中は Flow Control / routing / operations の実運用整合を優先する
- 直近の daily review rolling では、issue routing の継続実装と後処理統合を優先候補として扱う
