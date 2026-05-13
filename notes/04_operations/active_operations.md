# active_operations

## Immediate Gates

通常 Day より前に解消すべき manual / external / runtime reflection gate を置く。

Immediate Gate が未完了の場合、その gate に blocked される active task を実行しない。

Immediate Gate は7日枠に数えない。

Open immediate gates:

- none

---

## Review state

Last review:

- type: daily review
- date: 2026-05-12
- daily_report: `notes/07_reports/daily/2026-05-12.md`
- active_reroll: applied
- todoist_projection_status: applied
- todoist_projection_request_id: `ccb40a9c-ecca-4ed6-8209-365a54e251a0`
- todoist_projection_result:
  - updated_existing_tasks: 13
  - created: none
  - closed: none
- completed_today: none
- correction_note:
  - Previous assistant response incorrectly treated 2026-05-11 review as sufficient.
  - User correctly pointed out that today is 2026-05-12 and daily rolling is required.
  - 2026-05-12 active Day0 tasks had no completion evidence, so they were carried forward.

Latest closure:

- task: ADAM bug fix log の運用方法を notes に固定する
- status: completed
- completed_at: 2026-05-11
- archived_to: `notes/04_operations/archive_operations.md`

Previous closure:

- task: DELTA L3 question index runtime fixture を確認する
- status: actual_behavior_confirmed
- completed_at: 2026-05-11
- archived_to: `notes/04_operations/archive_operations.md`

---

## Recently resolved gates / completed scopes

- task: ADAM bug fix log の運用方法を notes に固定する
  status: completed
  completed: true
  completed_at: 2026-05-11
  archived_to: `notes/04_operations/archive_operations.md`

- task: DELTA L3 question index runtime fixture を確認する
  status: actual_behavior_confirmed
  completed: true
  completed_at: 2026-05-11
  archived_to: `notes/04_operations/archive_operations.md`

- task: overdue Sunday Weekly Review Mode Immediate Gate を解消する
  status: completed
  completed: true
  completed_at: 2026-05-11
  archived_to: `notes/04_operations/archive_operations.md`

---

## Day0（05/13 水）

Capacity note: 約2h。5/12 Day0 未完了の2件をそのまま繰り越す。

- task: Phase 0 routing maturity matrix を作り、plan-driven discovery gate を整理する
  source_ref:
    - notes/01_issues/2026-05-03_routing_maturity_gap_intake_design_issue.md
    - notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md
    - notes/04_operations/active_operations.md
    - notes/04_operations/next_operations.md
    - docs/05_roadmap.md
    - docs/15_notes_system.md
    - docs/17_operations_system.md
  rolling_day: Day0
  due_date: 2026-05-13
  due_type: date
  status: active_carryover
  completed_condition:
    - Phase 0 plan の重点テーマを列挙する
    - issue / intake / design / test system の maturity を同じ基準で比較する
    - 各テーマについて completed / partially completed / not yet operational を判定する
    - intake routing の未充足 completed condition を列挙する
    - design routing の未充足 completed condition を列挙する
    - plan-driven discovery gate として、roadmap / plan の未充足テーマを issue / operations candidate 化する手順を整理する
    - 必要な後続 task を active / next / future / absorbed に dispositionする
    - 必要なら Phase 0 plan / docs / knowledge / operations への反映候補を分離する
    - report / analysis / operations のどこに evidence を残すか判断し、read-back sha を記録する
  external:
    todoist_task_id: 6gWr53gP72vVPvjH

- task: DELTA chapter-only normalization fixture を実行する
  source_ref:
    - systems/delta/config/delta_schema.yaml
    - systems/delta/roadmap/delta_roadmap.md
    - systems/delta/plan/2026_sharoushi_exam_plan.md
    - systems/delta/operations/active_operations.md
    - systems/delta/operations/next_operations.md
    - systems/delta/history/daily/2026-05-05.md
  rolling_day: Day0
  due_date: 2026-05-13
  due_type: date
  status: active_unblocked
  completed_condition:
    - `健康保険法の3章が終わった` ケースで、L3なら question_id への正規化または uncertaintyが必要と判断する
    - `国民年金法7章が終わった` ケースで、L1/L2なら page_range / next_start_page が必要と判断する
    - 変換不能時に confirmation next_action を出す
    - 実データを読んだ上で、推測で precise progress を作らない
  external:
    todoist_task_id: 6gWVwmxWFcf9Wp4H

## Day1（05/14 木）

Capacity note: 約2h。DELTA schema reflection と projection profile。

- task: DELTA write resource schema reflection gate を整理する
  source_ref:
    - systems/delta/config/delta_action_schema.yaml
    - systems/delta/config/delta_schema.yaml
    - systems/delta/roadmap/delta_roadmap.md
    - systems/delta/plan/2026_sharoushi_exam_plan.md
    - systems/delta/operations/active_operations.md
    - systems/delta/operations/next_operations.md
    - notes/02_design/2026-05-05_delta_operations_generation_engine.md
    - api/repo-resource.js
    - src/services/delta-operations.js
    - systems/delta/config/delta_special_day_guard.md
  rolling_day: Day1
  due_date: 2026-05-14
  due_type: date
  status: progressed_carryover
  notes:
    - 2026-05-09に dynamic D7 / L3 question index / special-day guard の複数修正が入った
    - special-day guard は actual behavior confirmed
    - L3 question index guard は actual behavior confirmed for 国民年金法 L3 択一
  external:
    todoist_task_id: 6gWVwp3j8jW25jPH

- task: DELTA Todoist projection profile を設計・実装する
  source_ref:
    - notes/08_analysis/2026-05-02_delta_v0_6_task_decomposition.md
    - src/services/tasks/projection.js
    - systems/delta/operations/active_operations.md
    - config/ai/adam_action_schema.yaml
  rolling_day: Day1
  due_date: 2026-05-14
  due_type: date
  status: active_unblocked_after_review_if_capacity
  external:
    todoist_task_id: 6gWVwpw43m9q8Cfq

## Day2（05/15 金）

- task: DELTA Todoist dry_run / apply / write-back fixture を実行する
  source_ref:
    - systems/delta/operations/active_operations.md
    - src/services/tasks/projection.js
    - systems/delta/config/delta_schema.yaml
  rolling_day: Day2
  due_date: 2026-05-15
  due_type: date
  blocked_by:
    - DELTA Todoist projection profile を設計・実装する
  external:
    todoist_task_id: 6gWVwp2QcjXXVc4q

- task: Phase 1 re-entry criteria を Phase 0 hardening 結果から整理する
  source_ref:
    - notes/08_analysis/2026-04-28_phase0_remaining_inventory_before_phase1.md
    - notes/08_analysis/2026-04-29_phase1_todoist_foundation_entry_boundary_analysis.md
    - notes/08_analysis/2026-04-30_phase0_hardening_weekly_readiness_review_draft.md
    - notes/02_design/2026-04-30_routing_core_concept_redefinition.md
  rolling_day: Day2
  due_date: 2026-05-15
  due_type: date
  external:
    todoist_task_id: 6gW4H8Wx6C8cp8hH

## Day3（05/16 土）

- task: docs/15 / docs/17 に routing core / weekly routing session を反映するか判断する
  source_ref:
    - notes/02_design/2026-04-30_routing_core_concept_redefinition.md
    - notes/08_analysis/2026-04-30_weekly_review_routing_session_integration.md
    - notes/08_analysis/2026-04-30_routing_session_checklist.md
    - docs/15_notes_system.md
    - docs/17_operations_system.md
  rolling_day: Day3
  due_date: 2026-05-16
  due_type: date
  external:
    todoist_task_id: 6gWG92HjPG42mh4q

- task: next_operations から次週補充候補を再評価する
  source_ref:
    - notes/04_operations/next_operations.md
    - notes/07_reports/weekly/2026-05-10.md
  rolling_day: Day3
  due_date: 2026-05-16
  due_type: date
  completed_condition:
    - next_operations の候補を dependency / blocker / phase priority で再評価する
    - recurring weekly review task の active 反映要否を確認する
    - Day capacity を確認し、軽すぎる場合は理由を明示する
    - Todoist projection の必要性を判断する
  external:
    todoist_task_id: 6gWjr8pQXPfC9fjH

## Day4（05/17 日）

Capacity note: Sunday. Sunday Weekly Review Mode を主タスクにする。日曜は daily / weekly で reroll と Todoist projection を二重実行しない。

- task: Sunday Weekly Review Mode を実行する
  source_ref:
    - docs/17_operations_system.md
    - docs/15_notes_system.md
    - notes/04_operations/active_operations.md
    - notes/04_operations/next_operations.md
    - notes/04_operations/archive_operations.md
    - notes/07_reports/weekly/2026-05-10.md
    - notes/01_issues/idea_log.md
  rolling_day: Day4
  due_date: 2026-05-17
  due_type: date
  status: recurring_review_due
  completed_condition:
    - daily close を先に行う
    - weekly review を後に行う
    - archive_operations snapshot を保存する
    - issue routing check を実行する
    - inbox / issue / design / future / operations 滞留を確認する
    - active_operations / next_operations を週次で再設計する
    - Todoist projection を一度だけ判断・実行する
  external:
    todoist_task_id: 6gcP4GjpwhXpq32q

## Day5（05/18 月）

- task: repo history / show / grep の docs・schema・runtime reflection 残範囲を再確認する
  source_ref:
    - docs/10_repo_resource_api.md
    - config/ai/adam_action_schema.yaml
    - notes/08_analysis/2026-04-30_phase0_hardening_followup_candidate_routing.md
  rolling_day: Day5
  due_date: 2026-05-18
  due_type: date
  external:
    todoist_task_id: 6gW4H8h3P22gwPvq

- task: ChatGPT Agent 外部記事を抽象概念と製品仕様に分割して routing する
  source_ref:
    - notes/00_inbox/ChatGPT Agent（エージェント）とは？背景や使い方を解説！.md
    - notes/08_analysis/2026-04-30_intake_routing_archive_pending_reobservation.md
    - notes/08_analysis/2026-05-01_archive_decision_unmoved_inventory_current_rule.md
  rolling_day: Day5
  due_date: 2026-05-18
  due_type: date
  notes:
    - 最新 OpenAI 情報を扱う場合は web / official source 確認が必要
  external:
    todoist_task_id: 6gWG92RX28p37gfq

## Day6（05/19 火）

- task: Phase 1 Outlook Calendar API の読取設計を整理する
  source_ref:
    - notes/03_plan/2026-04_phase1_todoist_outlook_foundation.md
    - docs/05_roadmap.md
    - notes/08_analysis/2026-04-29_phase1_todoist_foundation_entry_boundary_analysis.md
  rolling_day: Day6
  due_date: 2026-05-19
  due_type: date
  external:
    todoist_task_id: 6gW4H8g4c2HCvvRH

- task: notes delete API draft と current repoResourceWrite delete semantics の差分を確認する
  source_ref:
    - notes/02_design/2026-03-24_notes_delete_api_draft.md
    - docs/10_repo_resource_api.md
    - config/ai/adam_action_schema.yaml
    - notes/08_analysis/2026-05-01_archive_decision_unmoved_inventory_current_rule.md
  rolling_day: Day6
  due_date: 2026-05-19
  due_type: date
  status: promoted_from_next
  completed_condition:
    - docs/10_repo_resource_api.md を読む
    - current repoResourceWrite schema / actual behavior を確認する
    - archive / future/design retain / docs update candidate のどれにするか判断する
  external:
    todoist_task_id: 6gcfPRhfQVcxWGJH

---

## Rolled out to next_operations

以下は7日枠から外し、next_operations に残す。

- 現在の inbox を一回整理する
- legacy Todoist wrapper の削除判断を Phase 1 Todoist foundation 後に行う
- DELTA foundation を main に統合する準備をする
- ATLAS 関係ファイルを systems/atlas に集約する
- DELTA monthly summary rebuild automation を設計する
- DELTA dedicated append_daily_event action を検討する
- handover latest index と月別フォルダ構成を導入する

---

## ルール

- 実行対象は active_operations に入っている task のみとする
- 実行は上から順に行う
- Immediate Gate が未完了の場合、その gate に blocked される active task を実行しない
- Immediate Gate は通常 Day 枠に数えない
- active の7日構造より、実行可能性と blocker解消を優先する
- 後続 task を実行不能にする前提作業は通常 Day枠ではなく Immediate Gate として先頭に置く
- Day は仮配置であり固定日付ではない
- active_operations の各 task は task / source_ref / rolling_day を必須で持つ
- blocked_by / blocks は依存関係を構造化するために必要に応じて持つ
- operations rolling / daily review では Day capacity を必ず確認し、task はおおむね 0.5〜1.5h、1 day はおおむね2hとして扱う
- 新規候補は active / next / future のどこに置くか決めてから扱う
- main は Docs-aligned stable version として扱う
