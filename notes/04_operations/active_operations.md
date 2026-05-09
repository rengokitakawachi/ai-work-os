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
- date: 2026-05-09
- daily_report: `notes/07_reports/daily/2026-05-09.md`
- active_reroll: applied
- todoist_projection_status: applied
- todoist_projection_request_id: `7935d9c9-e57e-474f-a397-a04887cb34a2`
- todoist_projection_result:
  - updated_existing_tasks: 13
  - created: `DELTA L3 question index runtime fixture を確認する` / `6gc8VQqGG6FhM4rH`
  - closed: none
- correction_note:
  - 2026-05-09 daily review was briefly mistaken for Sunday Weekly Review Mode.
  - Mistaken weekly snapshot `notes/99_archive/operations/2026-05-10_weekly_operations.md` was marked `superseded_mistaken_creation`.
  - `archive_operations.md` was restored for daily review handling.

Latest closure:

- task: DELTA special-day L3 unavailable guard
- status: fixed_actual_behavior_confirmed
- completed_at: 2026-05-09
- archived_to: `notes/04_operations/archive_operations.md`
- evidence:
  - notes/10_logs/2026-05-09_delta_special_day_l3_unavailable_guard.md
  - systems/delta/config/delta_special_day_guard.md
  - src/services/delta-operations.js
  - src/services/delta/special-day.test.js
- result:
  - L3 unavailable day guard generalized
  - 2026-06-13 and 2026-06-26 L3 rejects confirmed
  - 2026-06-13 L1/L2 / 秒トレ allows confirmed

Latest closure before that:

- task: DELTA next_operations dynamic D7 validator fix
- status: fixed_actual_behavior_confirmed
- completed_at: 2026-05-09
- archived_to: `notes/04_operations/archive_operations.md`
- evidence:
  - notes/10_logs/2026-05-09_delta_next_operations_dynamic_d7_validator_fix.md
- result:
  - `next_operations.md` start date is dynamic from active Day6 + 1
  - runtime fixture passed for 2026-05-16 start

---

## Recently resolved gates / completed scopes

- task: DELTA special-day L3 unavailable guard
  status: fixed_actual_behavior_confirmed
  completed: true
  completed_at: 2026-05-09
  archived_to: `notes/04_operations/archive_operations.md`

- task: DELTA next_operations dynamic D7 validator fix
  status: fixed_actual_behavior_confirmed
  completed: true
  completed_at: 2026-05-09
  archived_to: `notes/04_operations/archive_operations.md`

- gate: DELTA reverse-planning operations generator を実装・確認する
  status: resolved
  completed: true
  completed_at: 2026-05-07
  archived_to: `notes/04_operations/archive_operations.md`

- task: repo history integrity incident after ATLAS recovery を調査・復旧方針を決める
  status: operationally_resolved
  completed: true
  completed_at: 2026-05-07

- task: DELTA minimum generator test readiness
  status: completed_scope_only
  completed_at: 2026-05-05
  archived_to: `notes/04_operations/archive_operations.md`

- gate: ADAM / EVE instruction configured GPT reflection を確認する
  status: resolved
  completed: true
  completed_at: 2026-05-05
  archived_to: `notes/04_operations/archive_operations.md`

---

## Day0（05/10 日）

Capacity note: Sunday. If daily review is requested on this date, Sunday Weekly Review Mode applies. Do not double-run reroll / Todoist projection.

- task: Sunday Weekly Review Mode を実行する
  source_ref:
    - docs/17_operations_system.md
    - docs/15_notes_system.md
    - notes/04_operations/active_operations.md
    - notes/04_operations/next_operations.md
    - notes/04_operations/archive_operations.md
    - notes/07_reports/weekly/2026-05-03.md
    - notes/01_issues/2026-05-03_review_report_template_gate_issue.md
    - notes/01_issues/2026-05-03_routing_maturity_gap_intake_design_issue.md
  rolling_day: Day0
  due_date: 2026-05-10
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
    todoist_task_id: 6gXh2qjvc69qcMQq

- task: DELTA L3 question index runtime fixture を確認する
  source_ref:
    - src/services/delta/l3-question-index.js
    - src/services/delta-operations.js
    - src/services/delta/operations-split.test.js
    - systems/delta/operations/next_operations.md
    - systems/delta/config/delta_operations_generation_schema.yaml
  rolling_day: Day0
  due_date: 2026-05-10
  due_type: date
  status: active_after_review_if_capacity
  completed_condition:
    - validator_version が `delta_operations_preflight_2026_05_09_l3_question_index_l3_unavailable_day_guard` であることを確認する
    - Q4-1〜Q4-4（4問）が allow されることを確認する
    - Q4-1〜Q4-4（3問）が reject されることを確認する
    - Q3-4 が reject されることを確認する
    - Q5-0 が allow されることを確認する
    - Q5-1 が reject されることを確認する
    - Q1-17〜Q1-32 が reject されることを確認する
    - 未通過16問 / できるところまで / n問相当 が reject されることを確認する
    - runtime fixture 結果を log に保存し、actual behavior confirmed か判定する
  external:
    todoist_task_id: 6gc8VQqGG6FhM4rH

## Day1（05/11 月）

Capacity note: 約2h。ADAM governance の未完了 task へ戻る。

- task: ADAM bug fix log の運用方法を notes に固定する
  source_ref:
    - notes/10_logs/adam_bug_fix_log.md
    - notes/10_logs/README.md
    - docs/15_notes_system.md
    - notes/01_issues/2026-05-03_review_report_template_gate_issue.md
    - notes/01_issues/2026-05-03_routing_maturity_gap_intake_design_issue.md
    - notes/10_logs/2026-05-04_adam_immediate_gate_judgment_miss.md
    - notes/10_logs/2026-05-05_adam_delta_reverse_planning_gate_misjudgment.md
    - notes/10_logs/2026-05-05_adam_handover_latest_detection_failure.md
    - notes/10_logs/2026-05-06_repo_history_integrity_incident_after_atlas_recovery.md
    - notes/10_logs/2026-05-09_delta_next_operations_dynamic_d7_validator_fix.md
    - notes/10_logs/2026-05-09_delta_special_day_l3_unavailable_guard.md
  rolling_day: Day1
  due_date: 2026-05-11
  due_type: date
  status: active_carryover
  completed_condition:
    - `adam_bug_fix_log` の役割を `notes/10_logs/README.md` または専用 log 冒頭に明文化する
    - bug / regression / fix entry の追加条件を定義する
    - issue / operations / design / docs へ送る条件を定義する
    - 修正済み / 未修正 / 再発観測中 / instruction反映候補などの status を固定する
    - daily / weekly review で bug fix log を確認する条件を定義する
    - `2026-05-04_adam_immediate_gate_judgment_miss.md` を `adam_bug_fix_log.md` に吸収するか判断する
    - 2026-05-09 DELTA validator logs を集約対象にするか判断する
    - ADAM instruction 圧縮後の regression inventory task へ接続するか判断する
    - 更新後に read-back し sha を記録する
  external:
    todoist_task_id: 6gWr53PC2R3QwRxq

- task: Phase 0 routing maturity matrix を作り、plan-driven discovery gate を整理する
  source_ref:
    - notes/01_issues/2026-05-03_routing_maturity_gap_intake_design_issue.md
    - notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md
    - notes/04_operations/active_operations.md
    - notes/04_operations/next_operations.md
    - docs/05_roadmap.md
    - docs/15_notes_system.md
    - docs/17_operations_system.md
  rolling_day: Day1
  due_date: 2026-05-11
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

## Day2（05/12 火）

- task: DELTA chapter-only normalization fixture を実行する
  source_ref:
    - systems/delta/config/delta_schema.yaml
    - systems/delta/roadmap/delta_roadmap.md
    - systems/delta/plan/2026_sharoushi_exam_plan.md
    - systems/delta/operations/active_operations.md
    - systems/delta/operations/next_operations.md
    - systems/delta/history/daily/2026-05-05.md
  rolling_day: Day2
  due_date: 2026-05-12
  due_type: date
  status: active_unblocked
  completed_condition:
    - `健康保険法の3章が終わった` ケースで、L3なら question_id への正規化または uncertaintyが必要と判断する
    - `国民年金法7章が終わった` ケースで、L1/L2なら page_range / next_start_page が必要と判断する
    - 変換不能時に confirmation next_action を出す
    - 実データを読んだ上で、推測で precise progress を作らない
  external:
    todoist_task_id: 6gWVwmxWFcf9Wp4H

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
  rolling_day: Day2
  due_date: 2026-05-12
  due_type: date
  status: progressed_carryover
  notes:
    - 2026-05-09に dynamic D7 / L3 question index / special-day guard の複数修正が入った
    - special-day guard は actual behavior confirmed
    - L3 question index guard は runtime fixture 未確認
  external:
    todoist_task_id: 6gWVwp3j8jW25jPH

## Day3（05/13 水）

- task: DELTA Todoist projection profile を設計・実装する
  source_ref:
    - notes/08_analysis/2026-05-02_delta_v0_6_task_decomposition.md
    - src/services/tasks/projection.js
    - systems/delta/operations/active_operations.md
    - config/ai/adam_action_schema.yaml
  rolling_day: Day3
  due_date: 2026-05-13
  due_type: date
  status: active_unblocked_after_review_if_capacity
  external:
    todoist_task_id: 6gWVwpw43m9q8Cfq

- task: DELTA Todoist dry_run / apply / write-back fixture を実行する
  source_ref:
    - systems/delta/operations/active_operations.md
    - src/services/tasks/projection.js
    - systems/delta/config/delta_schema.yaml
  rolling_day: Day3
  due_date: 2026-05-13
  due_type: date
  blocked_by:
    - DELTA Todoist projection profile を設計・実装する
  external:
    todoist_task_id: 6gWVwp2QcjXXVc4q

## Day4（05/14 木）

- task: Phase 1 re-entry criteria を Phase 0 hardening 結果から整理する
  source_ref:
    - notes/08_analysis/2026-04-28_phase0_remaining_inventory_before_phase1.md
    - notes/08_analysis/2026-04-29_phase1_todoist_foundation_entry_boundary_analysis.md
    - notes/08_analysis/2026-04-30_phase0_hardening_weekly_readiness_review_draft.md
    - notes/02_design/2026-04-30_routing_core_concept_redefinition.md
  rolling_day: Day4
  due_date: 2026-05-14
  due_type: date
  external:
    todoist_task_id: 6gW4H8Wx6C8cp8hH

- task: docs/15 / docs/17 に routing core / weekly routing session を反映するか判断する
  source_ref:
    - notes/02_design/2026-04-30_routing_core_concept_redefinition.md
    - notes/08_analysis/2026-04-30_weekly_review_routing_session_integration.md
    - notes/08_analysis/2026-04-30_routing_session_checklist.md
    - docs/15_notes_system.md
    - docs/17_operations_system.md
  rolling_day: Day4
  due_date: 2026-05-14
  due_type: date
  external:
    todoist_task_id: 6gWG92HjPG42mh4q

## Day5（05/15 金）

- task: next_operations から次週補充候補を再評価する
  source_ref:
    - notes/04_operations/next_operations.md
    - notes/07_reports/weekly/2026-05-03.md
  rolling_day: Day5
  due_date: 2026-05-15
  due_type: date
  completed_condition:
    - next_operations の候補を dependency / blocker / phase priority で再評価する
    - recurring weekly review task の active 反映要否を確認する
    - Day capacity を確認し、軽すぎる場合は理由を明示する
    - Todoist projection の必要性を判断する
  external:
    todoist_task_id: 6gWjr8pQXPfC9fjH

- task: repo history / show / grep の docs・schema・runtime reflection 残範囲を再確認する
  source_ref:
    - docs/10_repo_resource_api.md
    - config/ai/adam_action_schema.yaml
    - notes/08_analysis/2026-04-30_phase0_hardening_followup_candidate_routing.md
  rolling_day: Day5
  due_date: 2026-05-15
  due_type: date
  external:
    todoist_task_id: 6gW4H8h3P22gwPvq

## Day6（05/16 土）

- task: ChatGPT Agent 外部記事を抽象概念と製品仕様に分割して routing する
  source_ref:
    - notes/00_inbox/ChatGPT Agent（エージェント）とは？背景や使い方を解説！.md
    - notes/08_analysis/2026-04-30_intake_routing_archive_pending_reobservation.md
    - notes/08_analysis/2026-05-01_archive_decision_unmoved_inventory_current_rule.md
  rolling_day: Day6
  due_date: 2026-05-16
  due_type: date
  notes:
    - 最新 OpenAI 情報を扱う場合は web / official source 確認が必要
  external:
    todoist_task_id: 6gWG92RX28p37gfq

- task: Phase 1 Outlook Calendar API の読取設計を整理する
  source_ref:
    - notes/03_plan/2026-04_phase1_todoist_outlook_foundation.md
    - docs/05_roadmap.md
    - notes/08_analysis/2026-04-29_phase1_todoist_foundation_entry_boundary_analysis.md
  rolling_day: Day6
  due_date: 2026-05-16
  due_type: date
  external:
    todoist_task_id: 6gW4H8g4c2HCvvRH

---

## Rolled out to next_operations

以下は7日枠から外し、next_operations に送る。

- notes delete API draft と current repoResourceWrite delete semantics の差分を確認する
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
