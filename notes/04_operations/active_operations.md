# active_operations

## Immediate Gates

通常 Day より前に解消すべき manual / external / runtime reflection gate を置く。

Immediate Gate が未完了の場合、その gate に blocked される active task を実行しない。

Immediate Gate は7日枠に数えない。

- none

---

## Day0（05/02 土）

- task: ADAM runtime reflection fixtures を実行して、反映済み / 未反映を層別に記録する
  source_ref:
    - notes/08_analysis/2026-05-02_adam_eve_runtime_reflection_checklist.md
    - notes/08_analysis/2026-05-02_adam_runtime_reflection_fixture_results.md
    - notes/02_design/2026-04-26_adam_eve_instruction_schema_layering.md
    - config/ai/adam_instruction.md
    - config/ai/adam_knowledge.md
    - config/ai/adam_schema.yaml
    - notes/04_operations/active_operations.md
  rolling_day: Day0
  due_date: 2026-05-02
  due_type: date
  status: completed
  completed: true
  notes:
    - ADAM runtime reflection fixture result は保存・read-back 済み
    - configured GPT Instruction はユーザー報告により repo 最新相当に更新済み
    - Knowledge / Schema はユーザー確認により repo 最新と整合済み
    - Todoist projection fixture は dry_run まで確認済み。apply / external sync は未確認 follow-up

- task: ADAM / EVE instruction 再層化後の runtime 反映確認 task を作る
  source_ref:
    - notes/02_design/2026-04-26_adam_eve_instruction_schema_layering.md
    - config/ai/adam_instruction.md
    - config/ai/eve_instruction.md
    - config/ai/adam_knowledge.md
    - config/ai/eve_knowledge.md
    - config/ai/adam_schema.yaml
    - config/ai/eve_schema.yaml
    - notes/08_analysis/2026-05-02_adam_eve_runtime_reflection_checklist.md
  rolling_day: Day0
  due_date: 2026-05-02
  due_type: date
  status: completed
  completed: true
  notes:
    - ADAM / EVE runtime reflection checklist 作成・read-back 済み
  external:
    todoist_task_id: 6gW4H8PjHpjw7q7q

- task: DELTA v0.6 Integrated Operations Upgrade を instruction / knowledge / schema / projection 反映 task に分解する
  source_ref:
    - notes/08_analysis/2026-05-02_delta_v0_6_task_decomposition.md
    - notes/02_design/2026-05-02_delta_v0_6_integrated_operations_upgrade.md
    - notes/01_issues/2026-05-01_delta_daily_operations_plan_gap_check_issue.md
    - notes/02_design/2026-05-01_delta_daily_operations_plan_gap_check_design.md
    - notes/01_issues/2026-05-02_delta_progress_granularity_rule_issue.md
    - notes/02_design/2026-05-02_delta_progress_granularity_rule_design.md
    - notes/01_issues/2026-05-02_delta_recommended_line_generation_issue.md
    - notes/02_design/2026-05-02_delta_recommended_line_generation_design.md
    - notes/01_issues/2026-05-02_delta_history_daily_files_issue.md
    - notes/02_design/2026-05-02_delta_history_daily_files_design.md
    - notes/02_design/2026-04-30_delta_v0_6_operations_todoist_projection.md
    - systems/delta/roadmap/delta_roadmap.md
    - systems/delta/plan/2026_sharoushi_exam_plan.md
    - systems/delta/operations/active_operations.md
    - systems/delta/history/2026-05.md
  rolling_day: Day0
  due_date: 2026-05-02
  due_type: date
  status: completed
  completed: true
  notes:
    - 分解結果は notes/08_analysis/2026-05-02_delta_v0_6_task_decomposition.md に保存・read-back 済み
    - active continuation は DELTA v0.6 config reflection proposal
    - next candidates は DELTA operations shape proposal / projection profile implementation / write resource schema reflection / runtime confirmation fixtures
    - future candidates は append_daily_event / monthly summary rebuild automation / v0.7 review analytics
    - `systems/delta/config/delta_action_schema_v0.5.yaml` は参照 path で NOT_FOUND。source_ref は stale または未作成として扱う
  external:
    todoist_task_id: 6gWGH6f5vQhpF7gq

- task: DELTA v0.6 config reflection proposal を作成する
  source_ref:
    - notes/02_design/2026-05-02_delta_v0_6_config_reflection_proposal.md
    - notes/08_analysis/2026-05-02_delta_v0_6_task_decomposition.md
    - notes/02_design/2026-05-02_delta_v0_6_integrated_operations_upgrade.md
    - notes/02_design/2026-05-02_delta_history_daily_files_design.md
    - notes/02_design/2026-05-01_delta_daily_operations_plan_gap_check_design.md
    - notes/02_design/2026-05-02_delta_progress_granularity_rule_design.md
    - notes/02_design/2026-05-02_delta_recommended_line_generation_design.md
    - systems/delta/config/delta_instruction.md
    - systems/delta/config/delta_schema.yaml
  rolling_day: Day0
  due_date: 2026-05-02
  due_type: date
  status: completed
  completed: true
  notes:
    - proposal note は notes/02_design/2026-05-02_delta_v0_6_config_reflection_proposal.md に保存・read-back 済み
    - proposal には delta_instruction.md と delta_schema.yaml の complete proposed content を含めた
    - DELTA knowledge file は現 branch では未確認。現時点では作成せず、instruction + schema に反映する判断
    - repo config update / configured DELTA GPT reflection / runtime-visible schema / actual behavior は未完了の別 gate

- task: DELTA v0.6 config files を feature branch に反映する
  source_ref:
    - notes/02_design/2026-05-02_delta_v0_6_config_reflection_proposal.md
    - systems/delta/config/delta_instruction.md
    - systems/delta/config/delta_schema.yaml
    - systems/delta/config/delta_action_schema_v0.2.yaml
    - systems/delta/config/delta_action_schema_v0.3.yaml
  rolling_day: Day0
  due_date: 2026-05-02
  due_type: date
  why_now:
    - DELTA v0.6 の後続実装は、daily history / plan-gap / progress granularity / recommended_lines / projection boundary のルールが config に反映されてから進める必要がある
    - config reflection proposal は complete proposed content を含めて保存済み
    - repo config update と runtime reflection を分けたうえで、まず feature branch の config state を更新する
  completed_condition:
    - feature/atlas-pre-delta-foundation の `systems/delta/config/delta_instruction.md` を read する
    - feature/atlas-pre-delta-foundation の `systems/delta/config/delta_schema.yaml` を read する
    - proposal note の complete proposed content を基に両 file を update する
    - update 前に Write Gate を出す
    - update 後に read-back し sha を記録する
    - repo config updated と configured DELTA GPT reflected / runtime-visible schema confirmed / actual behavior confirmed を混同しない
  notes:
    - write target は feature/atlas-pre-delta-foundation branch
    - DELTA action schema v0.6 と runtime reflection は別 task として扱う

## Day1（05/03 日）

- task: EVE runtime reflection の最小確認プロンプトと完了条件を整理する
  source_ref:
    - config/ai/eve_instruction.md
    - config/ai/eve_knowledge.md
    - config/ai/eve_schema.yaml
  rolling_day: Day1
  due_date: 2026-05-03
  due_type: date
  notes:
    - 実行は別 gate として扱ってよい
  external:
    todoist_task_id: 6gW4H8WC38gVjjCH

- task: Phase 1 re-entry criteria を Phase 0 hardening 結果から整理する
  source_ref:
    - notes/08_analysis/2026-04-28_phase0_remaining_inventory_before_phase1.md
    - notes/08_analysis/2026-04-29_phase1_todoist_foundation_entry_boundary_analysis.md
    - notes/08_analysis/2026-04-30_phase0_hardening_weekly_readiness_review_draft.md
    - notes/02_design/2026-04-30_routing_core_concept_redefinition.md
  rolling_day: Day1
  due_date: 2026-05-03
  due_type: date
  notes:
    - Outlook read design は re-entry criteria の結果を見て active 作業として扱う
  external:
    todoist_task_id: 6gW4H8Wx6C8cp8hH

## Day2（05/04 月）

- task: docs/15 / docs/17 に routing core / weekly routing session を反映するか判断する
  source_ref:
    - notes/02_design/2026-04-30_routing_core_concept_redefinition.md
    - notes/08_analysis/2026-04-30_weekly_review_routing_session_integration.md
    - notes/08_analysis/2026-04-30_routing_session_checklist.md
    - docs/15_notes_system.md
    - docs/17_operations_system.md
  rolling_day: Day2
  due_date: 2026-05-04
  due_type: date
  notes:
    - docs/15 が主対象、docs/17 は operations boundary のみが対象候補
  external:
    todoist_task_id: 6gWG92HjPG42mh4q

- task: Phase 1 Outlook Calendar API の読取設計を整理する
  source_ref:
    - notes/03_plan/2026-04_phase1_todoist_outlook_foundation.md
    - docs/05_roadmap.md
    - notes/08_analysis/2026-04-29_phase1_todoist_foundation_entry_boundary_analysis.md
  rolling_day: Day2
  due_date: 2026-05-04
  due_type: date
  notes:
    - Outlook 書き込みではなく read-only foundation に限定する
  external:
    todoist_task_id: 6gW4H8g4c2HCvvRH

## Day3（05/05 火）

- task: repo history / show / grep の docs・schema・runtime reflection 残範囲を再確認する
  source_ref:
    - docs/10_repo_resource_api.md
    - config/ai/adam_schema.yaml
    - notes/08_analysis/2026-04-30_phase0_hardening_followup_candidate_routing.md
  rolling_day: Day3
  due_date: 2026-05-05
  due_type: date
  notes:
    - 2026-04-30 の更新で v2.3.0 相当 schema は確認済みだが、全 action behavior は未確認
  external:
    todoist_task_id: 6gW4H8h3P22gwPvq

- task: ChatGPT Agent 外部記事を抽象概念と製品仕様に分割して routing する
  source_ref:
    - notes/00_inbox/ChatGPT Agent（エージェント）とは？背景や使い方を解説！.md
    - notes/08_analysis/2026-04-30_intake_routing_archive_pending_reobservation.md
    - notes/08_analysis/2026-05-01_archive_decision_unmoved_inventory_current_rule.md
  rolling_day: Day3
  due_date: 2026-05-05
  due_type: date
  notes:
    - 最新 OpenAI 情報を扱う場合は web / official source 確認が必要
  external:
    todoist_task_id: 6gWG92RX28p37gfq

## Day4（05/06 水）

- task: notes delete API draft と current repoResourceWrite delete semantics の差分を確認する
  source_ref:
    - notes/02_design/2026-03-24_notes_delete_api_draft.md
    - docs/10_repo_resource_api.md
    - config/ai/adam_schema.yaml
    - notes/08_analysis/2026-05-01_archive_decision_unmoved_inventory_current_rule.md
  rolling_day: Day4
  due_date: 2026-05-06
  due_type: date
  external:
    todoist_task_id: 6gWG92XP7RcR2pfq

- task: 現在の inbox を一回整理する
  source_ref:
    - notes/01_issues/2026-05-01_inbox_cleanup_once_issue.md
    - notes/02_design/2026-05-01_routing_type_destination_constraints.md
    - notes/08_analysis/2026-04-30_routing_session_checklist.md
  rolling_day: Day4
  due_date: 2026-05-06
  due_type: date
  external:
    todoist_task_id: 6gWG92WFmxFQJ6GH

## Day5（05/07 木）

- task: legacy Todoist wrapper の削除判断を Phase 1 Todoist foundation 後に行う
  source_ref:
    - notes/02_design/2026-04-18_legacy_todoist_wrapper_deprecation_design.md
    - notes/08_analysis/2026-04-29_phase1_todoist_foundation_entry_boundary_analysis.md
    - src/services/todoist.js
    - src/services/todoist/client.js
  rolling_day: Day5
  due_date: 2026-05-07
  due_type: date
  notes:
    - 現時点では deprecated legacy として維持
  external:
    todoist_task_id: 6gW4H8wXXwCx2Rvq

- task: DELTA foundation を main に統合する準備をする
  source_ref:
    - systems/delta/roadmap/delta_roadmap.md
    - systems/delta/plan/2026_sharoushi_exam_plan.md
    - systems/delta/operations/active_operations.md
    - systems/delta/history/2026-04.md
    - systems/delta/config/delta_action_schema_v0.5.yaml
    - notes/02_design/2026-04-30_delta_v0_6_operations_todoist_projection.md
    - notes/01_issues/idea_log.md#20260430-033
  rolling_day: Day5
  due_date: 2026-05-07
  due_type: date
  notes:
    - これは main merge 実行そのものではなく、統合準備 gate である
    - v0.6 Todoist projection より前に優先度比較する
  external:
    todoist_task_id: 6gWG92fMVFcPFfRH

## Day6（05/08 金）

- task: ATLAS 関係ファイルを systems/atlas に集約する設計を整理する
  source_ref:
    - docs/05_roadmap.md
    - docs/17_operations_system.md
    - docs/15_notes_system.md
    - notes/01_issues/idea_log.md#20260430-034
  rolling_day: Day6
  due_date: 2026-05-08
  due_type: date
  notes:
    - folder 作成そのものではなく設計整理 task
  external:
    todoist_task_id: 6gWG92Xxm538rMXq

---

## ルール

- 実行対象は active_operations に入っている task のみとする
- 実行は上から順に行う
- Immediate Gate が未完了の場合、その gate に blocked される active task を実行しない
- Immediate Gate は通常 Day 枠に数えない
- active の7日構造より、実行可能性と blocker 解消を優先する
- 後続 task を実行不能にする前提作業は通常 Day 枠ではなく Immediate Gate として先頭に置く
- Day は仮配置であり固定日付ではない
- 日付と曜日は人間可読性のために付与する
- 日付表示は daily review 時に更新する
- active_operations の各 task は task / source_ref / rolling_day を必須で持つ
- why_now / notes / due_date / due_type は必要に応じて持つ
- blocked_by / blocks は依存関係を構造化するために必要に応じて持つ
- operations rolling / daily review では Day capacity を必ず確認し、task はおおむね 0.5〜1.5h、1 day はおおむね 2h として、明示理由なしに軽すぎる Day を作らない
- operations は候補を優先順位で並べ、7日枠に入るものを active_operations とする
- active に入らなかった上位候補を next_operations に置く
- スコアは補助であり、決定ではない
- 会話中に新規タスク候補が発生した場合は、先に operations rolling を行う
- 新規候補は active / next / future のどこに置くか決めてから扱う
- reroll 前に active 外タスクを実行しない
- 未完了タスクは翌日以降へ移動する
- 完了タスクは必要に応じて archive_operations に移す
- Phase 0 中は Flow Control / routing / operations の実運用整合を優先する
- Phase 1 Outlook read foundation は Phase 0 hardening の re-entry criteria 整理後に active へ戻す
- 削除済みの `config/ai/common_*` / `config/ai/procedures/*` 構造は再作成しない
- ADAM / EVE config は現行 `instruction + knowledge + schema` 構成を前提に整合する
- main は Docs-aligned stable version として扱う
- branch は Notes-driven development space として扱う
- branch で開発し、main統合時に docs / code / config / operations / version を一致させる
- 現 main に docs/code 不一致がある場合は、新規 branch 開発前に整合回復を優先する
