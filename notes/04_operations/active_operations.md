# active_operations

## Immediate Gates

通常 Day より前に解消すべき manual / external / runtime reflection gate を置く。

Immediate Gate が未完了の場合、その gate に blocked される active task を実行しない。

Immediate Gate は7日枠に数えない。

- gate: DELTA reverse-planning operations generator を実装・確認する
  status: open
  severity: critical
  source_ref:
    - notes/02_design/2026-05-05_delta_operations_generation_engine.md
    - notes/10_logs/2026-05-05_delta_operations_generation_engine_gap.md
    - notes/10_logs/2026-05-05_delta_operations_generator_service_implementation.md
    - notes/10_logs/2026-05-05_adam_delta_reverse_planning_gate_misjudgment.md
    - systems/delta/roadmap/delta_roadmap.md
    - systems/delta/plan/2026_sharoushi_exam_plan.md
    - systems/delta/operations/active_operations.md
    - systems/delta/history/daily/2026-05-04.md
    - systems/delta/config/delta_instruction.md
    - systems/delta/config/delta_schema.yaml
    - systems/delta/config/delta_operations_generation_schema.yaml
    - src/services/delta/operations-generator.js
    - src/services/delta/operations-generator.test.js
    - config/from-claude.md
  reason:
    - DELTA の役割は 2026-08-23 社労士試験合格に向けた学習支援である
    - 元々の不具合は、operations 生成時に roadmap / plan / current_position / remaining_scope から逆算せず、安易に7日間の計画を立ててしまうこと
    - 106 PASS / 0 FAIL は test failure と minimum deterministic generator readiness の解消であり、本来の reverse-planning gap の完了証拠ではない
    - minimum generator は roadmap / plan の read_evidence を要求し、unsafe draft を防ぐが、remaining scope / target date / capacity / special days から日別負荷を逆算・再配分する optimizer ではない
    - 2026-08-23 合格 target に対し、逆算計画が立てられない状態は DELTA mission critical blocker であり放置できない
    - 先に resolved とした DELTA operations generation gate は scope 判断が過小で、ADAM の blocker 判定ミスとして補正する
  blocks:
    - DELTA chapter-only normalization fixture を実行する
    - DELTA write resource schema reflection gate を整理する
    - DELTA Todoist projection profile を設計・実装する
    - DELTA Todoist dry_run / apply / write-back fixture を実行する
    - DELTA foundation を main に統合する準備をする
  completed_condition:
    - roadmap milestone と 2026-08-23 exam target を generator input として読む
    - plan intermediate target を generator input として読む
    - current_position と latest daily history を読む
    - completed_scope を読み、first-pass 完了範囲を new work から除外する
    - remaining L1/L2 page scope と L3 question scope を算出する
    - user_capacity と special_days / L3 unavailable days を反映する
    - D0-D6 Active operations と D7-target Next operations を roadmap / plan から逆算して生成する
    - 各 day の L1/L2 は page range + page count を持つ
    - 各 day の L3 は question range + question count を持つ
    - overload を検知し、redistribute / compression_required / critical_delay のいずれかを出す
    - generated operations が preflight を通る read_evidence を持つ
    - fixture で「roadmap / plan を読まない安易な7日計画」を拒否または失敗扱いにできることを確認する
    - fixture で「2026-08-23 target / plan / remaining scope / capacity から逆算した計画」を生成できることを確認する
    - ATLAS または local test で reverse-planning generator tests が PASS する
    - runtime-visible behavior を観測するまで repo config / test pass のみで completed と扱わない
  notes:
    - prior minimum generator gate is not enough for original issue closure
    - `DELTA full reverse-planning optimizer を設計する` was promoted from next_operations to this Immediate Gate
    - API / Action exposure is secondary; core issue is reverse-planning behavior
  external:
    todoist_task_id: 6gX9jR6g4Rpcm2pq

- gate: ADAM / EVE instruction configured GPT reflection を確認する
  status: resolved
  completed: true
  completed_at: 2026-05-05
  source_ref:
    - config/adam_instruction.md
    - config/eve_instruction.md
    - config/eve_action_schema.yaml
    - notes/08_analysis/2026-05-05_adam_eve_instruction_reflection_check.md
  evidence:
    - ADAM runtime fixture: PASS
    - EVE runtime fixture: PASS
  external:
    todoist_task_id: 6gX2rrfXcWXCR24q

- gate: DELTA operations generation engine configured GPT reflection / runtime fixture を確認する
  status: partially_resolved_superseded_by_reverse_planning_gate
  completed: false
  source_ref:
    - systems/delta/config/delta_instruction.md
    - systems/delta/config/delta_schema.yaml
    - systems/delta/config/delta_operations_generation_schema.yaml
    - systems/delta/config/delta_action_schema.yaml
    - systems/delta/operations/active_operations.md
    - systems/delta/history/daily/2026-05-04.md
    - notes/02_design/2026-05-05_delta_operations_generation_engine.md
    - notes/10_logs/2026-05-05_delta_operations_generation_engine_gap.md
    - notes/10_logs/2026-05-05_delta_operations_generator_service_implementation.md
    - config/from-claude.md
    - src/services/delta-operations.js
    - src/services/delta/operations-generator.js
    - src/services/delta/operations-generator.test.js
  resolved_scope:
    - runtime preflight negative fixtures PASS
    - runtime preflight positive valid-write fixture PASS
    - daytime recommendation fixture PASS
    - minimum deterministic generator service test PASS
    - repository npm test 106 PASS / 0 FAIL
  unresolved_scope:
    - original reverse-planning gap remains open
    - roadmap / plan / remaining scope / capacity based load calculation is not proven
    - full reverse-planning optimizer is now tracked by Immediate Gate above
  evidence:
    - ATLAS_final_result_commit: 72c920e
    - from_claude_blob_sha: a420d5c76f2cd562003d3701a3ac51ee7eb6b7d4
    - implementation_log_sha: a5317308ad6ead68923ca1be9e651507e743848d
  external:
    todoist_task_id: 6gX2mXQwgvhVv79q

---

## Review state

Last review:

- type: daily review with post-review corrections
- date: 2026-05-04
- daily_report: `notes/07_reports/daily/2026-05-04.md`
- previous_active_sha: `78d5bb1c4aad4cb7c20f90baa88e456fcb57187e`
- archive_operations_sha: `439a6dc663b6333bc32acce0d12e0e60fe8287f7`
- todoist_projection_request_id: `e3689b7c-ae6c-46e5-a77c-761212dc0065`

Daily close result:

- Completed task archived: `ADAM / EVE / DELTA の Action schema 正規ファイル名ルールを固定する`
- Immediate Gate resolved: `ADAM / EVE instruction configured GPT reflection を確認する`
- DELTA minimum generator / test readiness reached 106 PASS / 0 FAIL
- Correction: DELTA original reverse-planning gap remains open and is now an Immediate Gate
- DELTA runtime-dependent tasks remain blocked until reverse-planning gate is resolved
- Todoist projection updated with reverse-planning Immediate Gate task `6gX9jR6g4Rpcm2pq`

---

## Recently resolved gates / completed tasks

- task: DELTA minimum generator test readiness
  status: completed_scope_only
  completed_at: 2026-05-05
  evidence_ref:
    - config/from-claude.md
    - notes/10_logs/2026-05-05_delta_operations_generator_service_implementation.md

- gate: ADAM / EVE instruction configured GPT reflection を確認する
  status: resolved
  completed: true
  completed_at: 2026-05-05
  evidence_ref:
    - notes/08_analysis/2026-05-05_adam_eve_instruction_reflection_check.md

- task: ADAM / EVE / DELTA の Action schema 正規ファイル名ルールを固定する
  status: completed
  completed_at: 2026-05-04
  archived_to: `notes/04_operations/archive_operations.md`
  evidence_ref:
    - `notes/08_analysis/2026-05-04_action_schema_canonical_filename_rule.md`
    - `notes/10_logs/adam_bug_fix_log.md`

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

---

## Day0（05/05 火）

Capacity note: First resolve Immediate Gate `DELTA reverse-planning operations generator を実装・確認する`. ADAM governance定着2件 remain active but should not displace mission-critical DELTA blocker.

- task: ADAM bug fix log の運用方法を notes に固定する
  source_ref:
    - notes/10_logs/adam_bug_fix_log.md
    - notes/10_logs/README.md
    - docs/15_notes_system.md
    - notes/01_issues/2026-05-03_review_report_template_gate_issue.md
    - notes/01_issues/2026-05-03_routing_maturity_gap_intake_design_issue.md
    - notes/04_operations/next_operations.md
    - notes/10_logs/2026-05-04_adam_immediate_gate_judgment_miss.md
  rolling_day: Day0
  due_date: 2026-05-05
  due_type: date
  completed_condition:
    - `adam_bug_fix_log` の役割を `notes/10_logs/README.md` または専用 log 冒頭に明文化する
    - bug / regression / fix entry の追加条件を定義する
    - issue / operations / design / docs へ送る条件を定義する
    - 修正済み / 未修正 / 再発観測中 / instruction反映候補などの status を固定する
    - daily / weekly review で bug fix log を確認する条件を定義する
    - `2026-05-04_adam_immediate_gate_judgment_miss.md` を `adam_bug_fix_log.md` に吸収するか判断する
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
  rolling_day: Day0
  due_date: 2026-05-05
  due_type: date
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

## Day1（05/06 水）

- task: DELTA chapter-only normalization fixture を実行する
  source_ref:
    - systems/delta/config/delta_instruction.md
    - systems/delta/config/delta_schema.yaml
    - systems/delta/operations/active_operations.md
    - systems/delta/history/daily/2026-05-02.md
  rolling_day: Day1
  due_date: 2026-05-06
  due_type: date
  blocked_by:
    - DELTA reverse-planning operations generator を実装・確認する
  completed_condition:
    - `健康保険法の3章が終わった` ケースで、L3なら question_id への正規化または uncertainty が必要と判断する
    - `国民年金法7章が終わった` ケースで、L1/L2なら page_range / next_start_page が必要と判断する
    - 変換不能時に confirmation next_action を出す
    - 実データを読んだ上で、推測で precise progress を作らない
  external:
    todoist_task_id: 6gWVwmxWFcf9Wp4H

## Day2（05/07 木）

- task: DELTA write resource schema reflection gate を整理する
  source_ref:
    - systems/delta/config/delta_action_schema.yaml
    - systems/delta/config/delta_schema.yaml
    - systems/delta/config/delta_instruction.md
    - systems/delta/config/delta_operations_generation_schema.yaml
    - systems/delta/operations/active_operations.md
    - notes/02_design/2026-05-05_delta_operations_generation_engine.md
    - notes/10_logs/2026-05-05_delta_operations_generation_engine_gap.md
    - api/repo-resource.js
    - src/services/delta-operations.js
  rolling_day: Day2
  due_date: 2026-05-07
  blocked_by:
    - DELTA reverse-planning operations generator を実装・確認する
  completed_condition:
    - delta_history / delta_operations の repo実装、Action schema、runtime-visible schema、actual behavior を層別に整理する
    - deltaResourceWrite の configured Action reflection を確認する
    - runtime未確認を完了扱いしない
    - runtime backend validation markers と feature branch service code の差分有無を整理する
    - duplicate `systems/delta/config/delta_action_schema_v0.6.yaml` の削除可否を確認する
    - operations generation engine の configured GPT reflection を確認する
    - completed_scope_exclusion_validator を canonical schema / supplemental schema / runtime fixture のどこで担保するか整理する
    - runtime-visible behavior を観測するまで、repo config level を runtime completed と混同しない
  external:
    todoist_task_id: 6gWVwp3j8jW25jPH

- task: DELTA Todoist projection profile を設計・実装する
  source_ref:
    - notes/08_analysis/2026-05-02_delta_v0_6_task_decomposition.md
    - src/services/tasks/projection.js
    - systems/delta/operations/active_operations.md
    - config/ai/adam_action_schema.yaml
  rolling_day: Day2
  due_date: 2026-05-07
  due_type: date
  blocked_by:
    - DELTA reverse-planning operations generator を実装・確認する
  completed_condition:
    - projection profile `delta` の設計を固める
    - ADAM projection を壊さない形で service / schema 反映方針を決める
    - 必要なら code update を行い、test / read-back を確認する
    - dry_run と apply / write-back を混同しない
  external:
    todoist_task_id: 6gWVwpw43m9q8Cfq

## Day3（05/08 金）

- task: DELTA Todoist dry_run / apply / write-back fixture を実行する
  source_ref:
    - systems/delta/operations/active_operations.md
    - src/services/tasks/projection.js
    - systems/delta/config/delta_schema.yaml
  rolling_day: Day3
  due_date: 2026-05-08
  due_type: date
  blocked_by:
    - DELTA Todoist projection profile を設計・実装する
    - DELTA reverse-planning operations generator を実装・確認する
  completed_condition:
    - DELTA operations → Todoist dry_run が DELTA ref / recommended_lines を含む payload を返す
    - apply が必要な場合は previous/current を必ず用意する
    - apply 後に returned todoist_task_id を DELTA operations へ戻せるか確認する
    - dry_run成功をapply成功と扱わない
  external:
    todoist_task_id: 6gWVwp2QcjXXVc4q

- task: Phase 1 re-entry criteria を Phase 0 hardening 結果から整理する
  source_ref:
    - notes/08_analysis/2026-04-28_phase0_remaining_inventory_before_phase1.md
    - notes/08_analysis/2026-04-29_phase1_todoist_foundation_entry_boundary_analysis.md
    - notes/08_analysis/2026-04-30_phase0_hardening_weekly_readiness_review_draft.md
    - notes/02_design/2026-04-30_routing_core_concept_redefinition.md
  rolling_day: Day3
  due_date: 2026-05-08
  due_type: date
  external:
    todoist_task_id: 6gW4H8Wx6C8cp8hH

## Day4（05/09 土）

- task: docs/15 / docs/17 に routing core / weekly routing session を反映するか判断する
  source_ref:
    - notes/02_design/2026-04-30_routing_core_concept_redefinition.md
    - notes/08_analysis/2026-04-30_weekly_review_routing_session_integration.md
    - notes/08_analysis/2026-04-30_routing_session_checklist.md
    - docs/15_notes_system.md
    - docs/17_operations_system.md
  rolling_day: Day4
  due_date: 2026-05-09
  due_type: date
  external:
    todoist_task_id: 6gWG92HjPG42mh4q

- task: Phase 1 Outlook Calendar API の読取設計を整理する
  source_ref:
    - notes/03_plan/2026-04_phase1_todoist_outlook_foundation.md
    - docs/05_roadmap.md
    - notes/08_analysis/2026-04-29_phase1_todoist_foundation_entry_boundary_analysis.md
  rolling_day: Day4
  due_date: 2026-05-09
  due_type: date
  external:
    todoist_task_id: 6gW4H8g4c2HCvvRH

## Day5（05/10 日）

Capacity note: Sunday is kept for light routing / next reroll confirmation and recurring review judgment.

- task: repo history / show / grep の docs・schema・runtime reflection 残範囲を再確認する
  source_ref:
    - docs/10_repo_resource_api.md
    - config/ai/adam_action_schema.yaml
    - notes/08_analysis/2026-04-30_phase0_hardening_followup_candidate_routing.md
  rolling_day: Day5
  due_date: 2026-05-10
  due_type: date
  external:
    todoist_task_id: 6gW4H8h3P22gwPvq

- task: next_operations から次週補充候補を再評価する
  source_ref:
    - notes/04_operations/next_operations.md
    - notes/07_reports/weekly/2026-05-03.md
  rolling_day: Day5
  due_date: 2026-05-10
  due_type: date
  completed_condition:
    - next_operations の候補を dependency / blocker / phase priority で再評価する
    - recurring weekly review task の active 反映要否を確認する
    - Day capacity を確認し、軽すぎる場合は理由を明示する
    - Todoist projection の必要性を判断する
  external:
    todoist_task_id: 6gWjr8pQXPfC9fjH

## Day6（05/11 月）

- task: ChatGPT Agent 外部記事を抽象概念と製品仕様に分割して routing する
  source_ref:
    - notes/00_inbox/ChatGPT Agent（エージェント）とは？背景や使い方を解説！.md
    - notes/08_analysis/2026-04-30_intake_routing_archive_pending_reobservation.md
    - notes/08_analysis/2026-05-01_archive_decision_unmoved_inventory_current_rule.md
  rolling_day: Day6
  due_date: 2026-05-11
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
