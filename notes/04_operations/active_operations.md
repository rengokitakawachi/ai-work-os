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

- type: Sunday Weekly Review Mode
- date: 2026-05-17
- daily_report: `notes/07_reports/daily/2026-05-17.md`
- weekly_report: `notes/07_reports/weekly/2026-05-17.md`
- weekly_snapshot: `notes/99_archive/operations/2026-05-17_weekly_operations.md`
- weekly_snapshot_sha: `9e117a221249661309d5a57bf64dad32df10b176`
- active_reroll: applied
- todoist_projection_status: pending_apply
- completed_today:
  - `Sunday Weekly Review Mode を実行する`
- partial_today:
  - task: `現在の inbox を一回整理する`
  - result: one real inbox item routed end-to-end, but full inbox listing remains blocked
  - evidence: `notes/08_analysis/2026-05-17_inbox_intake_routing_result.md`
- notes:
  - Daily close was executed first.
  - Weekly review and operations reroll were executed after daily close.
  - Todoist projection must be applied once after this active reroll.

Latest closure:

- task: Sunday Weekly Review Mode を実行する
- status: completed
- completed_at: 2026-05-17
- archived_to: `notes/04_operations/archive_operations.md`
- evidence:
  - notes/99_archive/operations/2026-05-17_weekly_operations.md
  - notes/07_reports/daily/2026-05-17.md
  - notes/07_reports/weekly/2026-05-17.md

Previous closure:

- task: Phase 0 routing maturity matrix を作り、plan-driven discovery gate を整理する
- status: completed_adam_only_scope
- completed_at: 2026-05-15
- archived_to: `notes/04_operations/archive_operations.md`

---

## Recently resolved gates / completed scopes

- task: Sunday Weekly Review Mode を実行する
  status: completed
  completed: true
  completed_at: 2026-05-17
  archived_to: `notes/04_operations/archive_operations.md`

- task: Phase 0 routing maturity matrix を作り、plan-driven discovery gate を整理する
  status: completed_adam_only_scope
  completed: true
  completed_at: 2026-05-15
  archived_to: `notes/04_operations/archive_operations.md`

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

---

## Day0（05/18 月）

Capacity note: 約2h。ADAM Phase 0 intake routing の継続。1件は end-to-end routing 済みだが、全体 listing blocker が残るため完了扱いしない。

- task: 現在の inbox を一回整理する
  source_ref:
    - notes/08_analysis/2026-05-17_inbox_intake_routing_result.md
    - notes/99_archive/issues/2026-05-03_individual_issue_files_routing_archive.md
    - notes/02_design/2026-05-01_routing_type_destination_constraints.md
    - notes/08_analysis/2026-04-30_routing_session_checklist.md
    - notes/08_analysis/2026-05-15_adam_only_phase0_routing_maturity_matrix.md
    - docs/15_notes_system.md
    - docs/17_operations_system.md
  rolling_day: Day0
  due_date: 2026-05-18
  due_type: date
  status: active_partial_completed_with_listing_blocker
  why_now:
    - ADAM-only Phase 0 matrix identified intake routing as not yet operational
    - One real inbox item was routed end-to-end on 2026-05-17
    - Full inbox listing remains blocked and must be resolved or formally split
  completed_condition:
    - `notes/00_inbox` の current tree または安定した listing 代替を確認する
    - 本システムと無関係な test clip を列挙する
    - delete candidate ごとに削除理由を明示する
    - inbox 直下の web / dev_memo 相当 file を分類する
    - inbox 配下の余計な下層 folder を列挙する
    - delete / move / archive の前に対象と影響範囲を確認する
    - Write Gate 後に必要な delete / move / archive を実行する
    - write 後に read-back / NOT_FOUND / destination 確認を行う
    - intake routing fixture として、何を issue / design / future / archive / delete / keep に送ったか保存する
  external:
    todoist_task_id: 6gfxCHWgH4M8755q

## Day1（05/19 火）

Capacity note: 約2h。Day0 の listing blocker が実行不能なら、design routing / report hardening に切り替える。

- task: design routing の最小 fixture を実行する
  source_ref:
    - notes/08_analysis/2026-05-15_adam_only_phase0_routing_maturity_matrix.md
    - docs/15_notes_system.md
    - docs/05_roadmap.md
  rolling_day: Day1
  due_date: 2026-05-19
  due_type: date
  status: active_candidate_after_intake
  completed_condition:
    - design candidate を1テーマ選ぶ
    - 既存 design へ吸収するか、1テーマ1design file を作るか判断する
    - holding file で止めない
    - docs / future / archive / operations candidate の disposition を保存する
    - source_ref chain を確認する
  external:
    todoist_task_id: 6gfxCHphWggvM2MH

- task: report template / README hardening を実行する
  source_ref:
    - notes/01_issues/2026-05-03_review_report_template_gate_issue.md
    - notes/07_reports/README.md
    - notes/08_analysis/2026-05-15_adam_only_phase0_routing_maturity_matrix.md
    - docs/15_notes_system.md
    - docs/17_operations_system.md
  rolling_day: Day1
  due_date: 2026-05-19
  due_type: date
  status: active_candidate_after_intake_if_capacity
  completed_condition:
    - report template / README / recent report のどれを正とするか決める
    - daily report の canonical filename と required sections を固定する
    - weekly report の canonical filename と required sections を固定する
    - tool failure と content fact を分離して書く rule を固定する
    - 必要なら docs/15 / docs/17 / notes/07_reports/README.md への反映候補を作る
  external:
    todoist_task_id: 6gfxCJ5Gmr25PvRH

## Day2（05/20 水）

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
  due_date: 2026-05-20
  due_type: date
  status: deferred_after_phase0_front
  external:
    todoist_task_id: 6gWVwp3j8jW25jPH

- task: DELTA Todoist projection profile を設計・実装する
  source_ref:
    - notes/08_analysis/2026-05-02_delta_v0_6_task_decomposition.md
    - src/services/tasks/projection.js
    - systems/delta/operations/active_operations.md
    - config/ai/adam_action_schema.yaml
  rolling_day: Day2
  due_date: 2026-05-20
  due_type: date
  status: deferred_after_phase0_front
  external:
    todoist_task_id: 6gWVwpw43m9q8Cfq

## Day3（05/21 木）

- task: DELTA Todoist dry_run / apply / write-back fixture を実行する
  source_ref:
    - systems/delta/operations/active_operations.md
    - src/services/tasks/projection.js
    - systems/delta/config/delta_schema.yaml
  rolling_day: Day3
  due_date: 2026-05-21
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
  rolling_day: Day3
  due_date: 2026-05-21
  due_type: date
  external:
    todoist_task_id: 6gW4H8Wx6C8cp8hH

## Day4（05/22 金）

- task: docs/15 / docs/17 に routing core / weekly routing session を反映するか判断する
  source_ref:
    - notes/02_design/2026-04-30_routing_core_concept_redefinition.md
    - notes/08_analysis/2026-04-30_weekly_review_routing_session_integration.md
    - notes/08_analysis/2026-04-30_routing_session_checklist.md
    - docs/15_notes_system.md
    - docs/17_operations_system.md
  rolling_day: Day4
  due_date: 2026-05-22
  due_type: date
  external:
    todoist_task_id: 6gWG92HjPG42mh4q

- task: next_operations から次週補充候補を再評価する
  source_ref:
    - notes/04_operations/next_operations.md
    - notes/07_reports/weekly/2026-05-17.md
  rolling_day: Day4
  due_date: 2026-05-22
  due_type: date
  external:
    todoist_task_id: 6gWjr8pQXPfC9fjH

## Day5（05/23 土）

- task: handover latest index と月別フォルダ構成を導入する
  source_ref:
    - notes/02_design/2026-05-03_handover_restart_flow_design.md
    - notes/10_logs/2026-05-05_adam_handover_latest_detection_failure.md
    - notes/06_handover/handover_template.md
  rolling_day: Day5
  due_date: 2026-05-23
  due_type: date
  status: phase0_completion_candidate
  completed_condition:
    - latest pointer の形式を決める
    - handover latest discovery failure を再発しない構成を作る
    - read-back で latest pointer と actual file path の整合を確認する
  external:
    todoist_task_id: 6gfxCJVwF83gXMRq

## Day6（05/24 日）

Capacity note: Sunday. Sunday Weekly Review Mode を主タスクにする。日曜は daily / weekly で reroll と Todoist projection を二重実行しない。

- task: Sunday Weekly Review Mode を実行する
  source_ref:
    - docs/17_operations_system.md
    - docs/15_notes_system.md
    - notes/04_operations/active_operations.md
    - notes/04_operations/next_operations.md
    - notes/04_operations/archive_operations.md
    - notes/07_reports/weekly/2026-05-17.md
    - notes/01_issues/idea_log.md
  rolling_day: Day6
  due_date: 2026-05-24
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

---

## Rolled out to next_operations

以下は7日枠から外し、next_operations に残す。

- DELTA chapter-only normalization fixture を実行する
- repo history / show / grep の docs・schema・runtime reflection 残範囲を再確認する
- Phase 1 Outlook Calendar API の読取設計を整理する
- notes delete API draft と current repoResourceWrite delete semantics の差分を確認する
- legacy Todoist wrapper の削除判断を Phase 1 Todoist foundation 後に行う
- DELTA foundation を main に統合する準備をする
- ATLAS 関係ファイルを systems/atlas に集約する
- DELTA monthly summary rebuild automation を設計する
- DELTA dedicated append_daily_event action を検討する

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
