# active_operations

## Immediate Gates

通常 Day より前に解消すべき manual / external / runtime reflection gate を置く。

Immediate Gate が未完了の場合、その gate に blocked される active task を実行しない。

Immediate Gate は7日枠に数えない。

- gate: ADAM / EVE instruction configured GPT reflection を確認する
  status: resolved
  completed: true
  completed_at: 2026-05-05
  source_ref:
    - config/adam_instruction.md
    - config/eve_instruction.md
    - config/eve_action_schema.yaml
    - notes/08_analysis/2026-05-05_adam_eve_instruction_reflection_check.md
    - notes/10_logs/2026-05-04_adam_immediate_gate_judgment_miss.md
    - notes/07_reports/daily/2026-05-04.md
  reason:
    - ADAM instruction repo canonical は `config/adam_instruction.md` sha `88acd8ed6489fabcec2c192a7449ff87c2213964` として確認済み
    - EVE instruction repo canonical は `config/eve_instruction.md` sha `bb8f1e4721212dd6f46e432acb37c1e797f22f42` として確認済み
    - EVE action schema canonical は `config/eve_action_schema.yaml` sha `8bbead866bd682f8a996a93e7d4a5dc7d0053de2` として確認済み
    - ADAM runtime で handover restart guard / active_operations first / Immediate Gate blocker guard / tool result integrity guard が効いていることをこの thread で観測済み
    - EVE configured GPT runtime fixture で Task 分類、listTasks before update、guessed task no-update、Todoist scope guard、ADAM operations 非正本化を user 観測で PASS 確認済み
    - repo更新だけで runtime reflection 完了とは扱わず、runtime behavior 観測で閉じた
  blocks:
    - ADAM bug fix log の運用方法を notes に固定する
    - Phase 0 routing maturity matrix を作り、plan-driven discovery gate を整理する
    - EVE runtime reflection の最小確認プロンプトと完了条件を整理する
  completed_condition:
    - ADAM configured GPT に `config/adam_instruction.md` の最新内容が反映されたことを確認する
    - ADAM runtime で Immediate Gate 判定 guard が効いていることを最小プロンプトで確認する
    - EVE configured GPT に `config/eve_instruction.md` の最新内容が反映されたことを確認する
    - EVE runtime で schema reflection / Todoist task-management scope guard が効いていることを最小プロンプトで確認する
    - repo instruction 更新を runtime reflection 完了と混同しない
  evidence:
    - ADAM runtime fixture: PASS
    - EVE runtime fixture: PASS
    - evidence_note: notes/08_analysis/2026-05-05_adam_eve_instruction_reflection_check.md
    - evidence_note_sha: 329e079265d545c957ec09ad0d1eaf1e6a25289c
  notes:
    - この gate は ADAM / EVE runtime behavior の前提 gate
    - DELTA operations generation gate とは別 gate
    - 2026-05-04 daily review 後に user 指摘で追加した post-review correction
    - 2026-05-05 ADAM / EVE runtime fixture PASS により resolved
    - 旧 source_ref `config/ai/adam_instruction.md` / `config/ai/eve_instruction.md` は実在しないため canonical path に修正済み
  external:
    todoist_task_id: 6gX2rrfXcWXCR24q

- gate: DELTA operations generation engine configured GPT reflection / runtime fixture を確認する
  status: open
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
    - src/services/delta-operations.js
    - src/services/delta/operations-generator.js
    - src/services/delta/operations-generator.test.js
    - api/repo-resource.js
  reason:
    - DELTA recovery line calibration fix は repo config / instruction / schema level では完了した
    - DELTA operations generation engine の detailed rules は supplemental schema へ追加済み
    - `delta_action_schema.yaml` v0.6.3 は user により configured GPT Actions へ再インポート済み
    - `read_evidence` pass-through と runtime preflight actual behavior は fixture で確認済み
    - negative runtime fixtures は 1A / 1B / 1C / L3 order まで PASS
    - positive valid-write fixture も PASS
    - current DELTA operations SHA は `ef4bc3ab2ba482a6b6ca056684fc9d298689ef5b`
    - deterministic generator service は `src/services/delta/operations-generator.js` に最小実装済み
    - generator test は `src/services/delta/operations-generator.test.js` に作成済み
    - ただし `npm test` は未実行で、API/action exposure と full reverse-planning optimizer の disposition は未完了
    - DELTA の daily review / operations generation / runtime-dependent fixture の前提になるため、test 実行確認までは gate を open のまま扱う
  blocks:
    - DELTA chapter-only normalization fixture を実行する
    - DELTA write resource schema reflection gate を整理する
    - DELTA Todoist projection profile を設計・実装する
    - DELTA Todoist dry_run / apply / write-back fixture を実行する
  completed_condition:
    - DELTA configured GPT に `delta_instruction.md` / `delta_schema.yaml` / `delta_operations_generation_schema.yaml` の最新内容が反映されたことを確認する
    - DELTA configured GPT Actions に `delta_action_schema.yaml` v0.6.3 / sha `610716c9a98a5676dad5b7cc72d5d9d84f8c59e8` が反映されたことを確認する
    - DELTA runtime-visible schema で `deltaResourceWrite` request body に `read_evidence` が見えることを確認する
    - DELTA runtime で `read_evidence` なしの `delta_operations` update が `DELTA_OPERATIONS_PREFLIGHT_FAILED` で拒否されることを確認する
    - DELTA runtime で completed 健康保険法L3 の新規 first-pass 再投入が `completed_health_insurance_L3_reintroduced_as_new_work` で拒否されることを確認する
    - DELTA runtime で国民年金法 L1/L2 未完了のまま厚生年金保険法 L1/L2 へ飛ぶ operations が `current_L1_L2_subject_skipped_before_completion` で拒否されることを確認する
    - DELTA runtime で国民年金法 L3 選択未完了のまま択一へ進む operations が `L3_order_violation_国民年金法_takuitsu_before_selected` で拒否されることを確認する
    - DELTA runtime で valid / safe operations content が preflight PASS で write できることを確認する
    - deterministic generator service が D0〜D6 Active operations と D7以降 Next operations を生成することを確認する
    - generator output が runtime preflight を通ることを test で確認する
    - `npm test` を実行し、既存 test と `operations-generator.test.js` が通ることを確認する
    - generator を API/action に出すか、service-only として daily review backend path から呼ぶかを判断する
    - full reverse-planning optimizer / material catalog parsing / load redistribution は別 task へ分離するか判断する
    - runtime-visible behavior を観測するまで `completed_repo_config_level` を runtime completed と扱わない
  notes:
    - 旧名: DELTA recovery line calibration configured GPT reflection / runtime fixture
    - controller fixture の形式PASSだけでは完了しない。plan-fit / completed_scope exclusion / read_evidence actual behavior まで見る
    - 2026-05-05 user reported configured GPT Action schema updated after v0.6.3 import fix
    - 2026-05-05 runtime preflight fixture set は negative / positive とも PASS
    - 2026-05-05 generator service minimum implementation created on main and feature branch
    - `npm test` 未実行のため、gate はまだ open
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
- DELTA Immediate Gate remains open: runtime preflight fixtures PASS, deterministic generator service created, `npm test` pending
- DELTA Action schema v0.6.3 import was reported updated by user and runtime behavior was later fixture-confirmed
- DELTA runtime preflight fixtures PASS: missing read_evidence, completed_scope reintroduction, L1/L2 continuity, L3 order, positive valid-write
- DELTA runtime-dependent tasks remain blocked until DELTA Immediate Gate is fully resolved
- ADAM / EVE runtime-dependent tasks are unblocked as of 2026-05-05 reflection fixture PASS
- Active rerolled to 2026-05-05 start
- Todoist projection needs update after gate resolution / completed_condition expansion

---

## Recently resolved gates / completed tasks

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

Capacity note: ADAM / EVE reflection gate is resolved. Continue ADAM governance定着2件. DELTA runtime-dependent work remains blocked by DELTA Immediate Gate.

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
  blocked_by:
    - ADAM / EVE instruction configured GPT reflection を確認する
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
  blocked_by:
    - ADAM / EVE instruction configured GPT reflection を確認する
  completed_condition:
    - Phase 0 plan の重点テーマを列挙する
    - issue / intake / design / test system の maturity を同じ基準で比較する
    - 各テーマについて completed / partially completed / not yet operational を判定する
    - intake routing の未充足 completed condition を列挙する
    - design routing の未充足 completed condition を列挙する
    - plan-driven discovery gate として、roadmap / plan の未充足テーマを issue / operations candidate 化する手順を整理する
    - 必要な後続 task を active / next / future / absorbed に disposition する
    - 必要なら Phase 0 plan / docs / knowledge / operations への反映候補を分離する
    - report / analysis / operations のどこに evidence を残すか判断し、read-back sha を記録する
  external:
    todoist_task_id: 6gWr53gP72vVPvjH

## Day1（05/06 水）

Capacity note: DELTA runtime-dependent task is blocked until DELTA Immediate Gate is resolved. EVE runtime task has been absorbed by resolved ADAM / EVE reflection gate evidence. If DELTA gate remains open, use this slot for non-runtime-dependent task via next reroll.

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
    - DELTA operations generation engine configured GPT reflection / runtime fixture を確認する
  completed_condition:
    - `健康保険法の3章が終わった` ケースで、L3なら question_id への正規化または uncertainty が必要と判断する
    - `国民年金法7章が終わった` ケースで、L1/L2なら page_range / next_start_page が必要と判断する
    - 変換不能時に confirmation next_action を出す
    - 実データを読んだ上で、推測で precise progress を作らない
  external:
    todoist_task_id: 6gWVwmxWFcf9Wp4H

- task: EVE runtime reflection の最小確認プロンプトと完了条件を整理する
  source_ref:
    - config/eve_instruction.md
    - config/eve_action_schema.yaml
    - notes/08_analysis/2026-05-05_adam_eve_instruction_reflection_check.md
  rolling_day: Day1
  due_date: 2026-05-06
  due_type: date
  status: absorbed_by_gate_resolution
  completed: true
  completed_at: 2026-05-05
  completed_condition:
    - EVE runtime で確認すべき instruction / knowledge / schema scope を列挙する
    - 最小確認プロンプトを作る
    - 実行を別 gate として扱うか判断する
  notes:
    - EVE runtime fixture was executed as part of the ADAM / EVE Immediate Gate closure.
    - Evidence is recorded in `notes/08_analysis/2026-05-05_adam_eve_instruction_reflection_check.md`.
  external:
    todoist_task_id: 6gW4H8WC38gVjjCH

## Day2（05/07 木）

Capacity note: DELTA write resource reflection and Todoist projection profile. Both DELTA tasks are blocked until DELTA Immediate Gate is resolved.

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
    - DELTA operations generation engine configured GPT reflection / runtime fixture を確認する
  completed_condition:
    - delta_history / delta_operations の repo実装、Action schema、runtime-visible schema、actual behavior を層別に整理する
    - deltaResourceWrite の configured Action reflection を確認する
    - runtime未確認を完了扱いしない
    - runtime backend validation markers と feature branch service code の差分有無を整理する
    - duplicate `systems/delta/config/delta_action_schema_v0.6.yaml` の削除可否を確認する
    - operations generation engine の configured GPT reflection を確認する
    - completed_scope_exclusion_validator を canonical schema / supplemental schema / runtime fixture のどこで担保するか整理する
    - runtime-visible behavior を観測するまで、`completed_repo_config_level` を runtime completed と混同しない
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
    - DELTA operations generation engine configured GPT reflection / runtime fixture を確認する
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
    - DELTA operations generation engine configured GPT reflection / runtime fixture を確認する
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
