# active_operations

## Immediate Gates

通常 Day より前に解消すべき manual / external / runtime reflection gate を置く。

Immediate Gate が未完了の場合、その gate に blocked される active task を実行しない。

Immediate Gate は7日枠に数えない。

- gate: DELTA recovery line calibration configured GPT reflection / runtime fixture を確認する
  status: open
  source_ref:
    - systems/delta/config/delta_instruction.md
    - systems/delta/config/delta_schema.yaml
    - systems/delta/operations/active_operations.md
    - notes/08_analysis/2026-05-04_delta_recovery_line_calibration_fix.md
    - notes/10_logs/adam_bug_fix_log.md
  reason:
    - DELTA recovery line calibration fix は repo config / instruction / schema level では完了した
    - configured GPT reflection / runtime-visible behavior は未確認
    - DELTA の daily review / operations generation / runtime-dependent fixture の前提になる
    - Day2 の通常 task に置くと、Day1 の DELTA chapter-only normalization fixture や以降の DELTA runtime task が未反映 instruction のまま進むリスクがある
  blocks:
    - DELTA chapter-only normalization fixture を実行する
    - DELTA write resource schema reflection gate を整理する
    - DELTA Todoist projection profile を設計・実装する
    - DELTA Todoist dry_run / apply / write-back fixture を実行する
  completed_condition:
    - DELTA configured GPT に `delta_instruction.md` / `delta_schema.yaml` の recovery line calibration fix が反映されたことを確認する
    - DELTA runtime で recovery case fixture を実行する
    - fixture で `gap_status: delayed_but_recovering` かつ `operation_mode: recovery_forward` を使う
    - standard_line が plan_anchor.expected_position / 当日 plan target と一致することを確認する
    - plan target が stretch_line のみに逃げていないことを確認する
    - must_line が survival_line ではなく plan_minimum_line になっていることを確認する
    - runtime-visible behavior を観測するまで `completed_repo_config_level` を runtime completed と扱わない
  notes:
    - ADAM bug fix log 運用固定や Phase 0 routing maturity matrix は DELTA runtime に依存しないため、この gate では止めない
    - Todoist projection should be updated after this gate is written back if projection consistency is required

---

## Review state

Last review:

- type: conversation-triggered operations rolling
- date: 2026-05-04
- basis: 複数の高優先度 task が next_operations に追加されたため rolling
- previous_active_sha: `db148c3d038daf1eb0f2512ac95e281d999b2ee1`
- previous_next_sha: `da193a0f9c8f13db170aa0f8a6a1a203f05611c4`
- daily_report: `notes/07_reports/daily/2026-05-03.md`
- weekly_report: `notes/07_reports/weekly/2026-05-03.md`
- weekly_operations_snapshot: `notes/99_archive/operations/2026-05-03_weekly_operations.md`
- todoist_projection_request_id: `f3d7959e-eb87-47cd-874c-952f3dc08402`

Rolling result:

- Immediate Gate added after reassessment: DELTA recovery line calibration configured GPT reflection / runtime fixture.
- `ADAM bug fix log の運用方法を notes に固定する` を Day0 に昇格した。
- `Phase 0 routing maturity matrix を作り、plan-driven discovery gate を整理する` を Day1 に昇格した。
- Current active head remains `ADAM bug fix log の運用方法を notes に固定する` because the preceding Action schema naming task is completed.
- DELTA runtime-dependent tasks are blocked until the Immediate Gate is resolved.
- Todoist projection update for the new Immediate Gate is pending.

Execution update:

- `ADAM / EVE / DELTA の Action schema 正規ファイル名ルールを固定する` completed at repo-instruction guard level on 2026-05-04.
- Todoist projection task closed.
- DELTA canonical was corrected after branch-aware observation: canonical is `systems/delta/config/delta_action_schema.yaml` on `feature/atlas-pre-delta-foundation`.
- Duplicate DELTA `delta_action_schema_v0.6.yaml` remains because delete action is not supported by the current tool route.
- DELTA recovery line calibration fix was applied at repo config level and logged.
- Runtime confirmation was promoted from Day2 task condition to Immediate Gate after reassessment.

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
    - deltaResourceGet visible
    - deltaResourceWrite visible
    - bulk success request_id: 36f08d65-a5b8-45d0-bfc8-8de8e9828262
    - tree success request_id: 0caa6dc4-45e7-41ee-a3cf-8854481de4d7
    - systems/delta/operations/active_operations.md updated to v0.6 operations shape
    - operations shape sha: 7b3728ed80cd3be349752249cb32ec08e538e13f
    - validation marker fix sha: 61158a505b905d222bcf4f747ed1f13dcc311da2
    - runtime write check sha: d994fc2ad07ce228aa1276dcfa1662b4887c752f
  notes:
    - DELTA read / recall / delta_operations write minimum readiness is pass.
    - Sustained behavior remains to be monitored through daily review.

---

## Day0（05/04 月）

Capacity note: Action schema naming rule is completed. Remaining Day0 work is bug fix log operation method. DELTA runtime-dependent work is blocked by Immediate Gate.

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
    - notes/08_analysis/2026-05-04_action_schema_canonical_filename_rule.md
    - notes/10_logs/adam_bug_fix_log.md
  rolling_day: Day0
  due_date: 2026-05-04
  due_type: date
  completed: true
  completed_at: 2026-05-04
  completed_condition:
    - ADAM / EVE / DELTA の Action schema canonical file を確認する
    - `*_action_schema.yaml` は GPT Actions 用 OpenAPI schema、`*_schema.yaml` は内部 schema または legacy互換であると明文化する
    - ADAM / EVE instruction または knowledge のどちらに固定するか Rule Placement Guard で判断する
    - 必要なら config/ai/adam_instruction.md / config/ai/eve_instruction.md に最小差分で反映する
    - 更新後に read-back し sha を記録する
    - repo config state と configured GPT reflection / runtime-visible schema を混同しない
  completed_evidence:
    - ADAM canonical Action schema confirmed: `config/ai/adam_action_schema.yaml` branch `main` sha `ef97d3c2ebcc0afe18a3dbbab6e9f4a02983f0f0`
    - EVE canonical Action schema confirmed: `config/ai/eve_action_schema.yaml` branch `main` sha `8bbead866bd682f8a996a93e7d4a5dc7d0053de2`
    - DELTA canonical Action schema confirmed after branch-aware correction: `systems/delta/config/delta_action_schema.yaml` branch `feature/atlas-pre-delta-foundation` sha `1c332448ef03065150a088d9b2bcfc4bc30f4e50`
    - DELTA duplicate versioned schema observed: `systems/delta/config/delta_action_schema_v0.6.yaml` branch `feature/atlas-pre-delta-foundation` sha `1c332448ef03065150a088d9b2bcfc4bc30f4e50`
    - DELTA internal schema confirmed: `systems/delta/config/delta_schema.yaml` branch `feature/atlas-pre-delta-foundation` sha `da786bae2fb04c526434fa405e96172e151d184339463783`
    - ADAM instruction updated and read back: sha `ccd50476b175c37adf3a71834c150fd244ca2a2b`
    - EVE instruction updated and read back: sha `bb8f1e4721212dd6f46e432acb37c1e797f22f42`
    - Evidence note corrected: `notes/08_analysis/2026-05-04_action_schema_canonical_filename_rule.md` sha `257f8ff04f69c8f8cd13db55ee7049f9a633fdd2`
    - Bug fix log updated for main-only branch observation mistake: `notes/10_logs/adam_bug_fix_log.md` sha `b0bd32a8c2b0c71b3e8b770abc9080213ff6e336`
    - Todoist task closed: `6gWVwpfQPfxGpv7H`
  remaining_risk:
    - `systems/delta/config/delta_action_schema_v0.6.yaml` is a duplicate of canonical `delta_action_schema.yaml`, but delete failed with `ACTION_NOT_SUPPORTED` for `repoResourceWrite(resource=code, action=delete)`.
    - Treat duplicate deletion as manual cleanup or future cleanup when delete support is available.
    - Runtime reflection / runtime-visible schema / actual behavior remain separate and are not completed by repo evidence alone.
  external:
    todoist_task_id: 6gWVwpfQPfxGpv7H

- task: ADAM bug fix log の運用方法を notes に固定する
  source_ref:
    - notes/10_logs/adam_bug_fix_log.md
    - notes/10_logs/README.md
    - docs/15_notes_system.md
    - notes/01_issues/2026-05-03_review_report_template_gate_issue.md
    - notes/01_issues/2026-05-03_routing_maturity_gap_intake_design_issue.md
    - notes/04_operations/next_operations.md
  rolling_day: Day0
  due_date: 2026-05-04
  due_type: date
  completed_condition:
    - `adam_bug_fix_log` の役割を `notes/10_logs/README.md` または専用 log 冒頭に明文化する
    - bug / regression / fix entry の追加条件を定義する
    - issue / operations / design / docs へ送る条件を定義する
    - 修正済み / 未修正 / 再発観測中 / instruction反映候補などの status を固定する
    - daily / weekly review で bug fix log を確認する条件を定義する
    - ADAM instruction 圧縮後の regression inventory task へ接続するか判断する
    - 更新後に read-back し sha を記録する
  external:
    todoist_task_id: 6gWr53PC2R3QwRxq

## Day1（05/05 火）

Capacity note: Plan-driven discovery gate plus DELTA normalization fixture. DELTA fixture is blocked until Immediate Gate is resolved.

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
  due_date: 2026-05-05
  due_type: date
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

- task: DELTA chapter-only normalization fixture を実行する
  source_ref:
    - systems/delta/config/delta_instruction.md
    - systems/delta/config/delta_schema.yaml
    - systems/delta/operations/active_operations.md
    - systems/delta/history/daily/2026-05-02.md
  rolling_day: Day1
  due_date: 2026-05-05
  due_type: date
  blocked_by:
    - DELTA recovery line calibration configured GPT reflection / runtime fixture を確認する
  completed_condition:
    - `健康保険法の3章が終わった` ケースで、L3なら question_id への正規化または uncertainty が必要と判断する
    - `国民年金法7章が終わった` ケースで、L1/L2なら page_range / next_start_page が必要と判断する
    - 変換不能時に confirmation next_action を出す
    - 実データを読んだ上で、推測で precise progress を作らない
  external:
    todoist_task_id: 6gWVwmxWFcf9Wp4H

## Day2（05/06 水）

Capacity note: DELTA write resource reflection 整理と projection profile。Both DELTA tasks are blocked until Immediate Gate is resolved.

- task: DELTA write resource schema reflection gate を整理する
  source_ref:
    - systems/delta/config/delta_action_schema.yaml
    - systems/delta/config/delta_schema.yaml
    - systems/delta/config/delta_instruction.md
    - systems/delta/operations/active_operations.md
    - notes/08_analysis/2026-05-04_delta_recovery_line_calibration_fix.md
    - notes/10_logs/adam_bug_fix_log.md
    - api/repo-resource.js
    - src/services/delta-operations.js
  rolling_day: Day2
  due_date: 2026-05-06
  due_type: date
  blocked_by:
    - DELTA recovery line calibration configured GPT reflection / runtime fixture を確認する
  completed_condition:
    - delta_history / delta_operations の repo実装、Action schema、runtime-visible schema、actual behavior を層別に整理する
    - deltaResourceWrite の configured Action reflection を確認する
    - runtime未確認を完了扱いしない
    - runtime backend validation markers と feature branch service code の差分有無を整理する
    - duplicate `systems/delta/config/delta_action_schema_v0.6.yaml` の削除可否を確認する
    - DELTA recovery line calibration fix の configured GPT reflection を確認する
    - DELTA runtime で recovery case fixture を実行し、standard_line が plan_anchor.expected_position と一致することを確認する
    - fixture では delayed_but_recovering + recovery_forward のケースで、plan target が stretch_line のみに逃げないことを確認する
    - fixture では must_line が survival_line ではなく plan_minimum_line になっていることを確認する
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
  due_date: 2026-05-06
  due_type: date
  blocked_by:
    - DELTA recovery line calibration configured GPT reflection / runtime fixture を確認する
  completed_condition:
    - projection profile `delta` の設計を固める
    - ADAM projection を壊さない形で service / schema 反映方針を決める
    - 必要なら code update を行い、test / read-back を確認する
    - dry_run と apply / write-back を混同しない
  external:
    todoist_task_id: 6gWVwpw43m9q8Cfq

## Day3（05/07 木）

- task: DELTA Todoist dry_run / apply / write-back fixture を実行する
  source_ref:
    - systems/delta/operations/active_operations.md
    - src/services/tasks/projection.js
    - systems/delta/config/delta_schema.yaml
  rolling_day: Day3
  due_date: 2026-05-07
  due_type: date
  blocked_by:
    - DELTA Todoist projection profile を設計・実装する
    - DELTA recovery line calibration configured GPT reflection / runtime fixture を確認する
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
  due_date: 2026-05-07
  due_type: date
  completed_condition:
    - EVE runtime で確認すべき instruction / knowledge / schema scope を列挙する
    - 最小確認プロンプトを作る
    - 実行を別 gate として扱うか判断する
  external:
    todoist_task_id: 6gW4H8WC38gVjjCH

## Day4（05/08 金）

- task: Phase 1 re-entry criteria を Phase 0 hardening 結果から整理する
  source_ref:
    - notes/08_analysis/2026-04-28_phase0_remaining_inventory_before_phase1.md
    - notes/08_analysis/2026-04-29_phase1_todoist_foundation_entry_boundary_analysis.md
    - notes/08_analysis/2026-04-30_phase0_hardening_weekly_readiness_review_draft.md
    - notes/02_design/2026-04-30_routing_core_concept_redefinition.md
  rolling_day: Day4
  due_date: 2026-05-08
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
  due_date: 2026-05-08
  due_type: date
  external:
    todoist_task_id: 6gWG92HjPG42mh4q

## Day5（05/09 土）

- task: Phase 1 Outlook Calendar API の読取設計を整理する
  source_ref:
    - notes/03_plan/2026-04_phase1_todoist_outlook_foundation.md
    - docs/05_roadmap.md
    - notes/08_analysis/2026-04-29_phase1_todoist_foundation_entry_boundary_analysis.md
  rolling_day: Day5
  due_date: 2026-05-09
  due_type: date
  external:
    todoist_task_id: 6gW4H8g4c2HCvvRH

- task: repo history / show / grep の docs・schema・runtime reflection 残範囲を再確認する
  source_ref:
    - docs/10_repo_resource_api.md
    - config/ai/adam_action_schema.yaml
    - notes/08_analysis/2026-04-30_phase0_hardening_followup_candidate_routing.md
  rolling_day: Day5
  due_date: 2026-05-09
  due_type: date
  external:
    todoist_task_id: 6gW4H8h3P22gwPvq

## Day6（05/10 日）

Capacity note: Sunday is kept for light routing / next reroll confirmation. Do not add more without dependency / blocker review.

- task: ChatGPT Agent 外部記事を抽象概念と製品仕様に分割して routing する
  source_ref:
    - notes/00_inbox/ChatGPT Agent（エージェント）とは？背景や使い方を解説！.md
    - notes/08_analysis/2026-04-30_intake_routing_archive_pending_reobservation.md
    - notes/08_analysis/2026-05-01_archive_decision_unmoved_inventory_current_rule.md
  rolling_day: Day6
  due_date: 2026-05-10
  due_type: date
  notes:
    - 最新 OpenAI 情報を扱う場合は web / official source 確認が必要
  external:
    todoist_task_id: 6gWG92RX28p37gfq

- task: next_operations から次週補充候補を再評価する
  source_ref:
    - notes/04_operations/next_operations.md
    - notes/07_reports/weekly/2026-05-03.md
  rolling_day: Day6
  due_date: 2026-05-10
  due_type: date
  completed_condition:
    - next_operations の候補を dependency / blocker / phase priority で再評価する
    - recurring weekly review task の active 反映要否を確認する
    - Day capacity を確認し、軽すぎる場合は理由を明示する
    - Todoist projection の必要性を判断する
  external:
    todoist_task_id: 6gWjr8pQXPfC9fjH

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
