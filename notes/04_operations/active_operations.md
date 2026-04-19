# active_operations

## Phase 0 位置づけ

### Phase 0 直結 task

- `issue routing の完成条件を plan / operations に反映する`
- `issue routing の最小運用実験で使う issue 候補と観測項目を決める`

### 補助 task

- `docs 番号衝突と旧 docs 群の整理方針をメモ化する`
- `Phase 1 各 plan と operations 接続案を並べる`

## Day0（04/20 月）

- task: issue routing の完成条件を plan / operations に反映する
  source_ref:
    - notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md
    - notes/02_design/2026-04-12_intake_and_issue_routing_minimum_roles.md
    - notes/02_design/2026-04-16_issue_routing_notes_write_minimum_usecase.md
    - src/services/flow-control/issue-routing.js
    - src/services/flow-control/issue-routing-actions.js
    - src/services/flow-control/issue-routing-notes-write.js
  rolling_day: Day0
  why_now:
    - Phase 0 の重点テーマは、実装があることではなく、実運用で効果が見えることまで持っていく必要がある
    - issue routing を最優先で閉じる前に、完成条件を plan と operations の正本へ明示する方が自然である
  notes:
    - issue routing の完成を「実 issue を流して効果が観測できること」として定義する
    - coding completion ではなく operation completion を基準にする
  due_date: 2026-04-20
  due_type: date

- task: issue routing の最小運用実験で使う issue 候補と観測項目を決める
  source_ref:
    - notes/02_design/2026-04-12_intake_and_issue_routing_minimum_roles.md
    - notes/02_design/2026-04-16_issue_routing_notes_write_minimum_usecase.md
    - notes/02_design/2026-04-16_issue_routing_operations_candidate_queue.md
    - notes/01_issues/idea_log.md
    - src/services/flow-control/issue-routing.js
    - src/services/flow-control/issue-routing-actions.js
    - src/services/flow-control/issue-routing-notes-write.js
  rolling_day: Day0
  why_now:
    - issue routing の完成は実運用で効果が見えることなので、最小運用実験の入力と観測項目を先に固定する必要がある
  notes:
    - 実 issue を数件選び、design / operations / future / archive の期待送付先を仮置きする
    - 送付結果、rolling 接続、keep / archive / defer の妥当性を観測項目に入れる
  due_date: 2026-04-20
  due_type: date

## Day1（04/21 火）

- task: docs 番号衝突と旧 docs 群の整理方針をメモ化する
  source_ref:
    - notes/08_analysis/2026-04-04_repo_readthrough_findings.md
    - notes/00_inbox/dev_memo/2026-04-04_repo_consistency_check_followup.md
    - notes/04_operations/next_operations.md
  rolling_day: Day1
  why_now:
    - repo 全体整合には必要だが、直近は issue routing 完成を優先する
  notes:
    - docs 15 / 16 系の衝突整理を含む
  due_date: 2026-04-21
  due_type: date
  external:
    todoist_task_id: 6gQFMv28VrRWm55H

## Day2（04/22 水）

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
  due_date: 2026-04-22
  due_type: date
  external:
    todoist_task_id: 6gQFMvgvW5j8QJ5H

## Day3（04/23 木）

- なし

## Day4（04/24 金）

- なし

## Day5（04/25 土）

- なし

## Day6（04/26 日）

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
