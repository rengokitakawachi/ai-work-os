# active_operations

## Immediate Gates

通常 Day より前に解消すべき manual / external / runtime reflection gate を置く。

Immediate Gate が未完了の場合、その gate に blocked される active task を実行しない。

Immediate Gate は7日枠に数えない。

- none

---

## Recently resolved gates

- gate: DELTA v0.6 learning operations readiness を 2026-05-03 中に確保する
  status: resolved
  completed: true
  completed_at: 2026-05-03
  source_ref:
    - systems/delta/operations/active_operations.md
    - systems/delta/config/delta_action_schema.yaml
    - systems/delta/config/delta_instruction.md
    - systems/delta/config/delta_schema.yaml
    - notes/02_design/2026-05-02_delta_daily_review_active_operations_auto_update.md
    - notes/02_design/2026-05-02_delta_operation_generation_judgment_regression_guard.md
  resolved_evidence:
    - DELTA GPT instruction/action schema updated by user
    - DELTA Knowledge: none because GPT Knowledge file limit 20 reached
    - delta_schema.yaml treated as repo-side internal schema source, not configured Knowledge
    - deltaResourceGet visible
    - deltaResourceWrite visible
    - bulk success request_id: 36f08d65-a5b8-45d0-bfc8-8de8e9828262
    - tree success request_id: 0caa6dc4-45e7-41ee-a3cf-8854481de4d7
    - systems/delta/operations/active_operations.md updated to v0.6 operations shape
    - operations shape sha: 7b3728ed80cd3be349752249cb32ec08e538e13f
    - saved recommended_lines recall pass request_id: f5d7b8bf-09ba-47d1-b064-a0380781bf0e
    - must_line / standard_line / stretch_line recalled without recompute
    - next_resume_question_id confirmed: Q7-1
    - recovery_targets recalled
    - Q4-10 next confirmed: Q7
    - Q7 next confirmed: Q9
    - Q5 / Q6 absent and Q8 no-exercise handling confirmed
    - first deltaResourceWrite failed due validation markers missing
    - failed write request_id: 3b7d63e9-2454-4977-9a51-9cbf0d73fefd
    - validation markers added repo-side to systems/delta/operations/active_operations.md
    - marker fix sha: 61158a505b905d222bcf4f747ed1f13dcc311da2
    - deltaResourceWrite actual behavior pass
    - pre-read request_id: 42135757-ec69-4fa2-9eb7-bed886f73fc7
    - write request_id: f25894a8-3b78-4526-b949-394ca9f412ca
    - write returned sha: d994fc2ad07ce228aa1276dcfa1662b4887c752f
    - read-back request_id: 1cc3777c-1e9a-4646-8ad4-a3f9aa4794f0
    - read-back sha: d994fc2ad07ce228aa1276dcfa1662b4887c752f
    - runtime_write_check line present: yes
    - validation markers still present: yes
  notes:
    - DELTA read / recall / delta_operations write minimum readiness is pass
    - This does not prove every future write scenario; sustained behavior remains to be monitored through daily review

- gate: DELTA configured GPT Action の deltaResourceGet read failure を解消する
  status: resolved
  completed: true
  resolved_evidence:
    - DELTA GPT 側で Bearer API key 設定後、最小 read test が成功
    - request_id: de8dc8c7-200e-4529-a09b-637873a9d0c7
    - resource: delta
    - action: read
    - branch: feature/atlas-pre-delta-foundation
    - file: operations/active_operations.md
    - returned_path: systems/delta/operations/active_operations.md
    - returned_sha: 7ead0b9d2626810869a8b93f96aca1c4ac95c351
    - read_only: true

- gate: DELTA L3 difficulty / estimated time recording rule を config に反映する
  status: resolved_repo_config_only
  completed: true
  notes:
    - repo config reflected
    - runtime behavior will be covered by later chapter / write fixtures if needed

- gate: DELTA daily review 後の active_operations 自動更新を repo 実装・schema に反映する
  status: resolved_runtime_minimum_pass
  completed: true
  notes:
    - repo code/config state reflected
    - runtime-visible schema for deltaResourceWrite confirmed
    - actual delta_operations update behavior confirmed by minimal safe write

- gate: DELTA operation生成・判定ミス再発防止 guard を repo config に反映する
  status: resolved_repo_config_only
  completed: true
  notes:
    - repo config reflected
    - runtime reasoning behavior remains to be monitored during daily operation generation

---

## Day0（05/03 日）

Capacity note: DELTA read / recall / write minimum readiness は pass。5/3 学習運用に必要な最低限の DELTA 不具合解消は完了。

- task: DELTA v0.6 operations shape を feature branch に反映する
  rolling_day: Day0
  due_date: 2026-05-03
  due_type: deadline
  status: completed
  completed: true
  source_ref:
    - systems/delta/operations/active_operations.md
    - systems/delta/history/daily/2026-05-02.md
    - systems/delta/plan/2026_sharoushi_exam_plan.md
    - systems/delta/roadmap/delta_roadmap.md
  resolved_evidence:
    - systems/delta/operations/active_operations.md updated
    - sha: 7b3728ed80cd3be349752249cb32ec08e538e13f
    - validation marker fix sha: 61158a505b905d222bcf4f747ed1f13dcc311da2
    - runtime write check sha: d994fc2ad07ce228aa1276dcfa1662b4887c752f
    - saved recommended_lines present
    - next_resume_question_id: Q7-1
    - recovery_targets present
  external:
    todoist_task_id: 6gWVwmw97XPvj43q

- task: DELTA configured GPT に最新 instruction / action schema を反映して runtime-visible schema を確認する
  rolling_day: Day0
  due_date: 2026-05-03
  due_type: deadline
  status: completed
  completed: true
  source_ref:
    - systems/delta/config/delta_instruction.md
    - systems/delta/config/delta_action_schema.yaml
    - systems/delta/config/delta_action_schema_v0.6.yaml
  resolved_evidence:
    - DELTA GPT instruction/action schema updated by user
    - Knowledge: none due 20-file limit
    - delta_schema.yaml treated as repo-side internal schema source, not configured Knowledge
    - deltaResourceGet visible
    - deltaResourceWrite visible
    - bulk success request_id: 36f08d65-a5b8-45d0-bfc8-8de8e9828262
    - tree success request_id: 0caa6dc4-45e7-41ee-a3cf-8854481de4d7
  external:
    todoist_task_id: 6gWW3JhF8fWQh5Wq

- task: DELTA configured GPT で bulk / tree / recommended_lines recall を確認する
  rolling_day: Day0
  due_date: 2026-05-03
  due_type: deadline
  status: completed
  completed: true
  source_ref:
    - systems/delta/config/delta_action_schema.yaml
    - systems/delta/operations/active_operations.md
    - systems/delta/history/daily/2026-05-02.md
    - systems/delta/plan/2026_sharoushi_exam_plan.md
  resolved_evidence:
    - active_operations read success request_id: f5d7b8bf-09ba-47d1-b064-a0380781bf0e
    - sha: 7b3728ed80cd3be349752249cb32ec08e538e13f
    - recomputed: no
    - must_line recalled
    - standard_line recalled
    - stretch_line recalled
    - next_resume_question_id: Q7-1
    - recovery_targets recalled
    - Day0 validation pass
  notes:
    - write was not executed in recall test
  external:
    todoist_task_id: 6gWVwpmPfc975CCq

- task: DELTA daily review write + operations update fixture を最小確認する
  rolling_day: Day0
  due_date: 2026-05-03
  due_type: deadline
  status: completed
  completed: true
  source_ref:
    - notes/02_design/2026-05-02_delta_daily_review_active_operations_auto_update.md
    - notes/02_design/2026-05-02_delta_l3_difficulty_estimated_time_recording_rule.md
    - notes/02_design/2026-05-02_delta_operation_generation_judgment_regression_guard.md
    - systems/delta/config/delta_action_schema.yaml
    - systems/delta/config/delta_instruction.md
    - systems/delta/config/delta_schema.yaml
    - systems/delta/history/daily/2026-05-02.md
    - systems/delta/operations/active_operations.md
  resolved_evidence:
    - deltaResourceWrite visible
    - first write failed safely due missing validation markers
    - failed write request_id: 3b7d63e9-2454-4977-9a51-9cbf0d73fefd
    - validation markers added
    - pre-read request_id: 42135757-ec69-4fa2-9eb7-bed886f73fc7
    - pre-read sha: 61158a505b905d222bcf4f747ed1f13dcc311da2
    - write status: UPDATED
    - write request_id: f25894a8-3b78-4526-b949-394ca9f412ca
    - returned sha: d994fc2ad07ce228aa1276dcfa1662b4887c752f
    - read-back request_id: 1cc3777c-1e9a-4646-8ad4-a3f9aa4794f0
    - read-back sha: d994fc2ad07ce228aa1276dcfa1662b4887c752f
    - runtime_write_check line present: yes
    - validation markers still present: yes
  notes:
    - daily history / monthly summary / Todoist were not touched in the write test
    - learning plan / recommended_lines / recovery_targets were not changed
  external:
    todoist_task_id: 6gWVwpq86mRC7Pcq

- task: closed / deferred issue routing + archive fixture を実行する
  rolling_day: Day0
  due_date: 2026-05-03
  due_type: date
  status: completed
  completed: true
  source_ref:
    - notes/01_issues/idea_log.md
    - docs/15_notes_system.md
    - notes/99_archive/issues/2026-05-03_closed_and_fixture_issue_routing_archive.md
  resolved_evidence:
    - `status: closed` issue 3件を archive destination として保存
    - `status: deferred` issue 1件は fixture 用 issue と判断し archive destination として保存
    - archive sha: ab8c48b697b1686590c107fa1e159f18d07b3171
    - future destination: none
  notes:
    - `idea_log.md` source cleanup は未実行
    - source cleanup は大きな全文更新になるため、archive destination 保存後に分離判断する

## Day1（05/04 月）

Capacity note: DELTA readiness gate が解消したため、次は Action schema 正規ファイル名固定と normalization fixture に進む。合計おおむね2h想定。

- task: ADAM / EVE / DELTA の Action schema 正規ファイル名ルールを固定する
  source_ref:
    - config/ai/adam_action_schema.yaml
    - config/ai/eve_action_schema.yaml
    - config/ai/adam_schema.yaml
    - config/ai/eve_schema.yaml
    - config/ai/adam_instruction.md
    - config/ai/eve_instruction.md
    - systems/delta/config/delta_action_schema.yaml
    - systems/delta/config/delta_schema.yaml
  rolling_day: Day1
  due_date: 2026-05-04
  due_type: date
  completed_condition:
    - ADAM / EVE / DELTA の Action schema canonical file を確認する
    - `*_action_schema.yaml` は GPT Actions 用 OpenAPI schema、`*_schema.yaml` は内部 schema または legacy互換であると明文化する
    - ADAM / EVE instruction または knowledge のどちらに固定するか Rule Placement Guard で判断する
    - 必要なら config/ai/adam_instruction.md / config/ai/eve_instruction.md に最小差分で反映する
    - 更新後に read-back し sha を記録する
    - repo config state と configured GPT reflection / runtime-visible schema を混同しない
  external:
    todoist_task_id: 6gWVwpfQPfxGpv7H

- task: DELTA chapter-only normalization fixture を実行する
  source_ref:
    - systems/delta/config/delta_instruction.md
    - systems/delta/config/delta_schema.yaml
    - systems/delta/operations/active_operations.md
    - systems/delta/history/daily/2026-05-02.md
  rolling_day: Day1
  due_date: 2026-05-04
  due_type: date
  completed_condition:
    - `健康保険法の3章が終わった` ケースで、L3なら question_id への正規化または uncertainty が必要と判断する
    - `国民年金法7章が終わった` ケースで、L1/L2なら page_range / next_start_page が必要と判断する
    - 変換不能時に confirmation next_action を出す
    - 実データを読んだ上で、推測で precise progress を作らない
  external:
    todoist_task_id: 6gWVwmxWFcf9Wp4H

## Day2（05/05 火）

Capacity note: D2 は write resource reflection 整理と projection profile。合計おおむね2h想定。

- task: DELTA write resource schema reflection gate を整理する
  source_ref:
    - systems/delta/config/delta_action_schema.yaml
    - systems/delta/config/delta_action_schema_v0.6.yaml
    - systems/delta/config/delta_schema.yaml
    - api/repo-resource.js
    - src/services/delta-operations.js
  rolling_day: Day2
  due_date: 2026-05-05
  due_type: date
  completed_condition:
    - delta_history / delta_operations の repo実装、Action schema、runtime-visible schema、actual behavior を層別に整理する
    - deltaResourceWrite の configured Action reflection を確認する
    - runtime未確認を完了扱いしない
    - runtime backend validation markers と feature branch service code の差分有無を整理する
  external:
    todoist_task_id: 6gWVwp3j8jW25jPH

- task: DELTA Todoist projection profile を設計・実装する
  source_ref:
    - notes/08_analysis/2026-05-02_delta_v0_6_task_decomposition.md
    - src/services/tasks/projection.js
    - systems/delta/operations/active_operations.md
    - config/ai/adam_action_schema.yaml
  rolling_day: Day2
  due_date: 2026-05-05
  due_type: date
  completed_condition:
    - projection profile `delta` の設計を固める
    - ADAM projection を壊さない形で service / schema 反映方針を決める
    - 必要なら code update を行い、test / read-back を確認する
    - dry_run と apply / write-back を混同しない
  external:
    todoist_task_id: 6gWVwpw43m9q8Cfq

## Day3（05/06 水）

- task: DELTA Todoist dry_run / apply / write-back fixture を実行する
  source_ref:
    - systems/delta/operations/active_operations.md
    - src/services/tasks/projection.js
    - systems/delta/config/delta_schema.yaml
  rolling_day: Day3
  due_date: 2026-05-06
  due_type: date
  blocked_by:
    - DELTA Todoist projection profile を設計・実装する
  completed_condition:
    - DELTA operations → Todoist dry_run が DELTA ref / recommended_lines を含む payload を返す
    - apply が必要な場合は previous/current を必ず用意する
    - apply 後に returned todoist_task_id を DELTA operations へ戻せるか確認する
    - dry_run成功をapply成功と扱わない
  external:
    todoist_task_id: 6gWVwp2QcjXXVc4q

- task: EVE runtime reflection の最小確認プロンプトと完了条件を整理する
  source_ref:
    - config/ai/eve_instruction.md
    - config/ai/eve_knowledge.md
    - config/ai/eve_action_schema.yaml
  rolling_day: Day3
  due_date: 2026-05-06
  due_type: date
  completed_condition:
    - EVE runtime で確認すべき instruction / knowledge / schema scope を列挙する
    - 最小確認プロンプトを作る
    - 実行を別 gate として扱うか判断する
  external:
    todoist_task_id: 6gW4H8WC38gVjjCH

## Day4（05/07 木）

- task: Phase 1 re-entry criteria を Phase 0 hardening 結果から整理する
  source_ref:
    - notes/08_analysis/2026-04-28_phase0_remaining_inventory_before_phase1.md
    - notes/08_analysis/2026-04-29_phase1_todoist_foundation_entry_boundary_analysis.md
    - notes/08_analysis/2026-04-30_phase0_hardening_weekly_readiness_review_draft.md
    - notes/02_design/2026-04-30_routing_core_concept_redefinition.md
  rolling_day: Day4
  due_date: 2026-05-07
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
  due_date: 2026-05-07
  due_type: date
  external:
    todoist_task_id: 6gWG92HjPG42mh4q

## Day5（05/08 金）

- task: Phase 1 Outlook Calendar API の読取設計を整理する
  source_ref:
    - notes/03_plan/2026-04_phase1_todoist_outlook_foundation.md
    - docs/05_roadmap.md
    - notes/08_analysis/2026-04-29_phase1_todoist_foundation_entry_boundary_analysis.md
  rolling_day: Day5
  due_date: 2026-05-08
  due_type: date
  external:
    todoist_task_id: 6gW4H8g4c2HCvvRH

- task: repo history / show / grep の docs・schema・runtime reflection 残範囲を再確認する
  source_ref:
    - docs/10_repo_resource_api.md
    - config/ai/adam_action_schema.yaml
    - notes/08_analysis/2026-04-30_phase0_hardening_followup_candidate_routing.md
  rolling_day: Day5
  due_date: 2026-05-08
  due_type: date
  external:
    todoist_task_id: 6gW4H8h3P22gwPvq

## Day6（05/09 土）

- task: ChatGPT Agent 外部記事を抽象概念と製品仕様に分割して routing する
  source_ref:
    - notes/00_inbox/ChatGPT Agent（エージェント）とは？背景や使い方を解説！.md
    - notes/08_analysis/2026-04-30_intake_routing_archive_pending_reobservation.md
    - notes/08_analysis/2026-05-01_archive_decision_unmoved_inventory_current_rule.md
  rolling_day: Day6
  due_date: 2026-05-09
  due_type: date
  notes:
    - 最新 OpenAI 情報を扱う場合は web / official source 確認が必要
  external:
    todoist_task_id: 6gWG92RX28p37gfq

---

## Rolled out to next_operations

以下は7日枠から外し、next_operations に送る。

- notes delete API draft と current repoResourceWrite delete semantics の差分を確認する
- 現在の inbox を一回整理する
- legacy Todoist wrapper の削除判断を Phase 1 Todoist foundation 後に行う
- DELTA foundation を main に統合する準備をする
- ATLAS 関係ファイルを systems/atlas に集約する設計を整理する
- DELTA monthly summary rebuild automation を設計する
- DELTA dedicated append_daily_event action を検討する
- DELTA review automation / analytics を v0.7 候補として整理する

---

## ルール

- 実行対象は active_operations に入っている task のみとする
- 実行は上から順に行う
- Immediate Gate が未完了の場合、その gate に blocked される active task を実行しない
- Immediate Gate は通常 Day 枠に数えない
- active の7日構造より、実行可能性と blocker 解消を優先する
- 後続 task を実行不能にする前提作業は通常 Day枠ではなく Immediate Gate として先頭に置く
- Day は仮配置であり固定日付ではない
- active_operations の各 task は task / source_ref / rolling_day を必須で持つ
- blocked_by / blocks は依存関係を構造化するために必要に応じて持つ
- operations rolling / daily review では Day capacity を必ず確認し、task はおおむね 0.5〜1.5h、1 day はおおむね2hとして扱う
- 新規候補は active / next / future のどこに置くか決めてから扱う
- main は Docs-aligned stable version として扱う
- branch は Notes-driven development space として扱う
