# active_operations

## Immediate Gates

通常 Day より前に解消すべき manual / external / runtime reflection gate を置く。

Immediate Gate が未完了の場合、その gate に blocked される active task を実行しない。

Immediate Gate は7日枠に数えない。

- none

## Recently resolved / partially resolved gates

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
  resolved_evidence:
    - notes/02_design/2026-05-02_delta_l3_difficulty_estimated_time_recording_rule.md created and read-back confirmed
    - systems/delta/config/delta_instruction.md updated on feature/atlas-pre-delta-foundation
    - systems/delta/config/delta_schema.yaml updated on feature/atlas-pre-delta-foundation
  notes:
    - configured DELTA GPT reflection and actual runtime behavior remain to be tested

- gate: DELTA daily review 後の active_operations 自動更新を repo 実装・schema に反映する
  status: resolved_repo_config_and_code_only
  completed: true
  source_ref:
    - notes/02_design/2026-05-02_delta_daily_review_active_operations_auto_update.md
    - src/services/delta-operations.js
    - api/repo-resource.js
    - systems/delta/config/delta_action_schema.yaml
    - systems/delta/config/delta_action_schema_v0.6.yaml
    - systems/delta/config/delta_instruction.md
    - systems/delta/config/delta_schema.yaml
  resolved_evidence:
    - src/services/delta-operations.js created on feature/atlas-pre-delta-foundation
    - delta-operations.js sha: 8bbead1fb072e1d5ebbad9088cf951da19d4bc0c
    - api/repo-resource.js updated to route resource=delta_operations action=update
    - api/repo-resource.js sha: 78d0700200ef1972d9089329d2b2cfb448531ec8
    - systems/delta/config/delta_action_schema.yaml updated to expose unified deltaResourceWrite
    - delta_action_schema.yaml sha: 1c332448ef03065150a088d9b2bcfc4bc30f4e50
    - systems/delta/config/delta_action_schema_v0.6.yaml updated with same content
    - delta_action_schema_v0.6.yaml sha: 1c332448ef03065150a088d9b2bcfc4bc30f4e50
    - systems/delta/config/delta_instruction.md updated and compressed under limit
    - delta_instruction.md sha: fe0b851926904ada7201c7c4f1fa8af146194652
    - delta_instruction.md content_length: 7850
    - systems/delta/config/delta_schema.yaml updated with DailyReviewOperationsUpdate and delta_operations write_resource
    - delta_schema.yaml sha: 8a9c5cae8e446399de1111ef86b5e7b9abea8516
  notes:
    - This confirms repo code/config state only
    - configured DELTA GPT Action schema must be refreshed from systems/delta/config/delta_action_schema.yaml
    - runtime-visible schema and actual deltaResourceWrite behavior are not yet confirmed
    - OpenAPI cannot expose two POST operationIds on the same path; schema uses unified operationId deltaResourceWrite for delta_history and delta_operations

---

## Day0（05/02 土）

Capacity note: DELTA v0.6 の blocker が解消したため、D0 は operations 本体更新と read/recall fixture に集中する。合計おおむね2h想定。

- task: DELTA v0.6 operations shape proposal を作成する
  source_ref:
    - notes/02_design/2026-05-02_delta_v0_6_operations_shape_proposal.md
    - notes/02_design/2026-05-02_delta_l3_difficulty_estimated_time_recording_rule.md
    - notes/02_design/2026-05-02_delta_daily_review_active_operations_auto_update.md
    - notes/08_analysis/2026-05-02_delta_v0_6_task_decomposition.md
    - notes/02_design/2026-05-02_delta_v0_6_config_reflection_proposal.md
    - systems/delta/config/delta_instruction.md
    - systems/delta/config/delta_schema.yaml
    - systems/delta/operations/active_operations.md
    - systems/delta/history/daily/2026-05-02.md
    - systems/delta/history/monthly/2026-05.md
    - systems/delta/plan/2026_sharoushi_exam_plan.md
    - systems/delta/roadmap/delta_roadmap.md
  rolling_day: Day0
  due_date: 2026-05-02
  due_type: date
  status: completed
  completed: true
  notes:
    - proposal note は保存・read-back 済み
    - proposal は daily history を primary source、monthly summary を summary view として扱う
    - 2026-05-02 の gap_status は critical_delay、operation_mode は recovery_required と判断
    - L3 difficulty / estimated_time / time_delta rule と daily review operations update rule は後続 operations update に含める

- task: DELTA v0.6 operations shape を feature branch に反映する
  source_ref:
    - notes/02_design/2026-05-02_delta_v0_6_operations_shape_proposal.md
    - notes/02_design/2026-05-02_delta_l3_difficulty_estimated_time_recording_rule.md
    - notes/02_design/2026-05-02_delta_daily_review_active_operations_auto_update.md
    - systems/delta/operations/active_operations.md
    - systems/delta/history/daily/2026-05-02.md
    - systems/delta/plan/2026_sharoushi_exam_plan.md
    - systems/delta/roadmap/delta_roadmap.md
    - systems/delta/config/delta_instruction.md
    - systems/delta/config/delta_schema.yaml
  rolling_day: Day0
  due_date: 2026-05-02
  due_type: date
  why_now:
    - DELTA v0.6 config と Action read は確認済みだが、operations 本体が pre-v0.6 shape のまま
    - recommended_lines / plan_gap / current_position が operations に保存されないと、日中 recall と projection fixture が正しく動かない
    - L3 記録標準項目と daily review 後 operations update rule を operations 本体にも反映する必要がある
  completed_condition:
    - feature/atlas-pre-delta-foundation の `systems/delta/operations/active_operations.md` を read する
    - proposal note に基づき plan_gap / current_position / recommended_lines / precise progress units を反映する
    - L3 record requirements として question_id / source_page / difficulty / estimated_time / actual_time / time_delta / result / review_mark / next_review_target / time_analysis / estimate_source_status を反映する
    - daily review 後に operations update phase が必要であることを Rules または metadata に反映する
    - 2026-05-02 日報後の Day3〜Day6 期待 operations を反映する
    - update 前に Write Gate を出す
    - update 後に read-back し sha を記録する
    - repo operations state と DELTA runtime behavior を混同しない
  notes:
    - ADAM が repo-side update を行う場合は `resource=code`, branch `feature/atlas-pre-delta-foundation` で更新する
    - DELTA GPT の deltaResourceWrite behavior 確認は別 fixture

- task: DELTA configured GPT で bulk / tree / recommended_lines recall を確認する
  source_ref:
    - systems/delta/config/delta_action_schema.yaml
    - systems/delta/operations/active_operations.md
    - systems/delta/history/daily/2026-05-02.md
    - systems/delta/plan/2026_sharoushi_exam_plan.md
  rolling_day: Day0
  due_date: 2026-05-02
  due_type: date
  blocked_by:
    - DELTA v0.6 operations shape を feature branch に反映する
  completed_condition:
    - DELTA GPT 新スレッドで `resource=delta`, `action=bulk`, branch 指定ありの read が成功する
    - DELTA GPT 新スレッドで `resource=delta`, `action=tree`, branch 指定ありの read が成功する
    - DELTA GPT が active_operations の saved recommended_lines を提示し、原則再計算しない
    - 失敗時は status/body/request_id を記録する
  notes:
    - write / Todoist apply はしない

## Day1（05/03 日）

Capacity note: D1 は DELTA runtime reasoning/write fixture 2本。合計おおむね2h想定。

- task: DELTA chapter-only normalization fixture を実行する
  source_ref:
    - systems/delta/config/delta_instruction.md
    - systems/delta/config/delta_schema.yaml
    - systems/delta/operations/active_operations.md
    - systems/delta/history/daily/2026-05-02.md
  rolling_day: Day1
  due_date: 2026-05-03
  due_type: date
  completed_condition:
    - `健康保険法の3章が終わった` ケースで、L3なら question_id への正規化または uncertainty が必要と判断する
    - `国民年金法7章が終わった` ケースで、L1/L2なら page_range / next_start_page が必要と判断する
    - 変換不能時に confirmation next_action を出す
    - 実データを読んだ上で、推測で precise progress を作らない

- task: DELTA daily review write + operations update fixture を実行する
  source_ref:
    - notes/02_design/2026-05-02_delta_daily_review_active_operations_auto_update.md
    - notes/02_design/2026-05-02_delta_l3_difficulty_estimated_time_recording_rule.md
    - systems/delta/config/delta_action_schema.yaml
    - systems/delta/config/delta_instruction.md
    - systems/delta/config/delta_schema.yaml
    - systems/delta/history/daily/2026-05-02.md
    - systems/delta/history/monthly/2026-05.md
    - systems/delta/operations/active_operations.md
  rolling_day: Day1
  due_date: 2026-05-03
  due_type: date
  why_now:
    - v0.6 の daily review は daily history update だけでなく active_operations update までが完了条件
    - deltaResourceWrite は Action schema に出したが、configured DELTA GPT runtime では未確認
  completed_condition:
    - configured DELTA GPT に systems/delta/config/delta_action_schema.yaml 最新版が反映されている
    - DELTA GPT runtime-visible schema に deltaResourceWrite が見える
    - DELTA GPT で write 前に対象 daily history と active_operations を read する
    - Write Gate 相当の確認を行う
    - one-question L3 update の write target が `history/daily/YYYY-MM-DD.md` のみであることを確認する
    - daily review 確定後に `resource=delta_operations`, `action=update`, `file=active_operations.md` で operations update できることを確認する
    - Q3-4 / Q4-5 fixture で difficulty / estimated_time / actual_time / time_delta / estimate_source_status を記録できることを確認する
    - monthly summary と legacy monthly を one-question update では更新しないことを確認する
    - history sha と operations sha を read-back で記録する
  notes:
    - 外部副作用を伴うため、実行直前にユーザー確認または明示 gate を置く
    - deltaResourceWrite は unified operationId。resource で delta_history / delta_operations を分岐する

## Day2（05/04 月）

- task: DELTA write resource schema reflection gate を整理する
  source_ref:
    - systems/delta/config/delta_action_schema.yaml
    - systems/delta/config/delta_action_schema_v0.6.yaml
    - systems/delta/config/delta_schema.yaml
    - api/repo-resource.js
    - src/services/delta-operations.js
  rolling_day: Day2
  due_date: 2026-05-04
  due_type: date
  completed_condition:
    - delta_history / delta_operations の repo実装、Action schema、runtime-visible schema、actual behavior を層別に整理する
    - deltaResourceWrite の configured Action reflection を確認する
    - runtime未確認を完了扱いしない

- task: DELTA Todoist projection profile を設計・実装する
  source_ref:
    - notes/08_analysis/2026-05-02_delta_v0_6_task_decomposition.md
    - src/services/tasks/projection.js
    - systems/delta/operations/active_operations.md
    - config/ai/adam_action_schema.yaml
  rolling_day: Day2
  due_date: 2026-05-04
  due_type: date
  completed_condition:
    - projection profile `delta` の設計を固める
    - ADAM projection を壊さない形で service / schema 反映方針を決める
    - 必要なら code update を行い、test / read-back を確認する
    - dry_run と apply / write-back を混同しない

## Day3（05/05 火）

- task: DELTA Todoist dry_run / apply / write-back fixture を実行する
  source_ref:
    - systems/delta/operations/active_operations.md
    - src/services/tasks/projection.js
    - systems/delta/config/delta_schema.yaml
  rolling_day: Day3
  due_date: 2026-05-05
  due_type: date
  blocked_by:
    - DELTA Todoist projection profile を設計・実装する
  completed_condition:
    - DELTA operations → Todoist dry_run が DELTA ref / recommended_lines を含む payload を返す
    - apply が必要な場合は previous/current を必ず用意する
    - apply 後に returned todoist_task_id を DELTA operations へ戻せるか確認する
    - dry_run成功をapply成功と扱わない

- task: EVE runtime reflection の最小確認プロンプトと完了条件を整理する
  source_ref:
    - config/ai/eve_instruction.md
    - config/ai/eve_knowledge.md
    - config/ai/eve_action_schema.yaml
  rolling_day: Day3
  due_date: 2026-05-05
  due_type: date
  completed_condition:
    - EVE runtime で確認すべき instruction / knowledge / schema scope を列挙する
    - 最小確認プロンプトを作る
    - 実行を別 gate として扱うか判断する

## Day4（05/06 水）

- task: Phase 1 re-entry criteria を Phase 0 hardening 結果から整理する
  source_ref:
    - notes/08_analysis/2026-04-28_phase0_remaining_inventory_before_phase1.md
    - notes/08_analysis/2026-04-29_phase1_todoist_foundation_entry_boundary_analysis.md
    - notes/08_analysis/2026-04-30_phase0_hardening_weekly_readiness_review_draft.md
    - notes/02_design/2026-04-30_routing_core_concept_redefinition.md
  rolling_day: Day4
  due_date: 2026-05-06
  due_type: date
  completed_condition:
    - Phase 1 Outlook read foundation に戻る条件を整理する
    - Phase 0 hardening と並行可能な条件を整理する
    - Outlook task を next から active に戻す判断軸を作る

- task: docs/15 / docs/17 に routing core / weekly routing session を反映するか判断する
  source_ref:
    - notes/02_design/2026-04-30_routing_core_concept_redefinition.md
    - notes/08_analysis/2026-04-30_weekly_review_routing_session_integration.md
    - notes/08_analysis/2026-04-30_routing_session_checklist.md
    - docs/15_notes_system.md
    - docs/17_operations_system.md
  rolling_day: Day4
  due_date: 2026-05-06
  due_type: date
  completed_condition:
    - docs/15 / docs/17 を読む
    - docs昇格対象か notes/knowledge 留めか判断する
    - docs更新提案が必要なら更新後全文を提示する

## Day5（05/07 木）

- task: Phase 1 Outlook Calendar API の読取設計を整理する
  source_ref:
    - notes/03_plan/2026-04_phase1_todoist_outlook_foundation.md
    - docs/05_roadmap.md
    - notes/08_analysis/2026-04-29_phase1_todoist_foundation_entry_boundary_analysis.md
  rolling_day: Day5
  due_date: 2026-05-07
  due_type: date
  completed_condition:
    - current Outlook-related code / config / docs を棚卸しする
    - calendar read endpoint または missing endpoint を特定する
    - event response shape と free/busy prerequisites を整理する

- task: repo history / show / grep の docs・schema・runtime reflection 残範囲を再確認する
  source_ref:
    - docs/10_repo_resource_api.md
    - config/ai/adam_action_schema.yaml
    - notes/08_analysis/2026-04-30_phase0_hardening_followup_candidate_routing.md
  rolling_day: Day5
  due_date: 2026-05-07
  due_type: date
  completed_condition:
    - docs/10 の反映済み範囲を確認する
    - runtime-visible schema confirmed 範囲を確認する
    - actual behavior confirmed / unconfirmed を分ける

## Day6（05/08 金）

- task: ChatGPT Agent 外部記事を抽象概念と製品仕様に分割して routing する
  source_ref:
    - notes/00_inbox/ChatGPT Agent（エージェント）とは？背景や使い方を解説！.md
    - notes/08_analysis/2026-04-30_intake_routing_archive_pending_reobservation.md
    - notes/08_analysis/2026-05-01_archive_decision_unmoved_inventory_current_rule.md
  rolling_day: Day6
  due_date: 2026-05-08
  due_type: date
  notes:
    - 最新 OpenAI 情報を扱う場合は web / official source 確認が必要

- task: notes delete API draft と current repoResourceWrite delete semantics の差分を確認する
  source_ref:
    - notes/02_design/2026-03-24_notes_delete_api_draft.md
    - docs/10_repo_resource_api.md
    - config/ai/adam_action_schema.yaml
    - notes/08_analysis/2026-05-01_archive_decision_unmoved_inventory_current_rule.md
  rolling_day: Day6
  due_date: 2026-05-08
  due_type: date
  completed_condition:
    - docs/10_repo_resource_api.md を読む
    - current repoResourceWrite schema / actual behavior を確認する
    - archive / future/design retain / docs update candidate のどれにするか判断する

---

## Rolled out to next_operations

以下は7日枠から外し、next_operations に送る。

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
