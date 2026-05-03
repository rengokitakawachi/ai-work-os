# active_operations

## Immediate Gates

通常 Day より前に解消すべき manual / external / runtime reflection gate を置く。

Immediate Gate が未完了の場合、その gate に blocked される active task を実行しない。

Immediate Gate は7日枠に数えない。

- gate: DELTA v0.6 learning operations readiness を 2026-05-03 中に確保する
  status: active
  due_date: 2026-05-03
  due_type: deadline
  source_ref:
    - systems/delta/operations/active_operations.md
    - systems/delta/config/delta_action_schema.yaml
    - systems/delta/config/delta_instruction.md
    - systems/delta/config/delta_schema.yaml
    - notes/02_design/2026-05-02_delta_daily_review_active_operations_auto_update.md
    - notes/02_design/2026-05-02_delta_operation_generation_judgment_regression_guard.md
  blocks:
    - ADAM / EVE / DELTA の Action schema 正規ファイル名ルールを固定する
    - EVE runtime reflection の最小確認プロンプトと完了条件を整理する
    - Phase 1 re-entry criteria を Phase 0 hardening 結果から整理する
  why_now:
    - DELTA 不具合の解消が遅れると、2026-05-03 以降の学習スケジュールに直接影響する
    - active_operations が v0.6 shape に更新されないと、明日の推奨ライン・再開地点・回収対象が正本として固定されない
    - configured DELTA GPT が最新 Action schema / instruction を反映し、read / recall / write の最低限が確認されないと、日報後 operations update が機能しない
    - DELTA Knowledge はファイル上限20に達しているため、delta_schema.yaml は configured Knowledge ではなく repo-side internal schema source として扱う
  completed_condition:
    - `systems/delta/operations/active_operations.md` が v0.6 operations shape に更新され、read-back sha が記録される
    - configured DELTA GPT に最新 `delta_instruction.md` と `delta_action_schema.yaml` が反映される
    - `delta_schema.yaml` は configured Knowledge ではなく repo-side internal schema source として扱う前提が確認される
    - DELTA GPT runtime で `bulk` / `tree` / saved recommended_lines recall が成功する
    - DELTA GPT runtime-visible schema に `deltaResourceWrite` が見える
    - `resource=delta_operations`, `action=update`, `file=active_operations.md` の actual behavior を確認する、または失敗時は status/body/request_id と blocker を記録する
    - 5/3の学習開始に必要な must / standard / stretch / next_resume_question_id / recovery_targets が active_operations から読める

---

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
  notes:
    - configured DELTA GPT reflection and actual runtime behavior remain to be tested

- gate: DELTA daily review 後の active_operations 自動更新を repo 実装・schema に反映する
  status: resolved_repo_config_and_code_only
  completed: true
  notes:
    - repo code/config state only
    - configured DELTA GPT Action schema must be refreshed from systems/delta/config/delta_action_schema.yaml
    - runtime-visible schema and actual deltaResourceWrite behavior are not yet confirmed

- gate: DELTA operation生成・判定ミス再発防止 guard を repo config に反映する
  status: resolved_repo_config_only
  completed: true
  notes:
    - configured DELTA GPT reflection and actual runtime behavior remain to be tested

---

## Day0（05/03 日）

Capacity note: 通常は1日おおむね2hだが、DELTA 不具合が学習スケジュールへ直接影響するため、5/3は DELTA readiness を優先する。Action schema 命名固定は Day1 に下げる。

- task: DELTA v0.6 operations shape を feature branch に反映する
  source_ref:
    - notes/02_design/2026-05-02_delta_v0_6_operations_shape_proposal.md
    - notes/02_design/2026-05-02_delta_l3_difficulty_estimated_time_recording_rule.md
    - notes/02_design/2026-05-02_delta_daily_review_active_operations_auto_update.md
    - notes/02_design/2026-05-02_delta_operation_generation_judgment_regression_guard.md
    - systems/delta/operations/active_operations.md
    - systems/delta/history/daily/2026-05-02.md
    - systems/delta/plan/2026_sharoushi_exam_plan.md
    - systems/delta/roadmap/delta_roadmap.md
    - systems/delta/config/delta_instruction.md
    - systems/delta/config/delta_schema.yaml
  rolling_day: Day0
  due_date: 2026-05-03
  due_type: deadline
  why_now:
    - DELTA v0.6 config と Action read は確認済みだが、operations 本体が pre-v0.6 shape のまま
    - 5/3の学習開始前に recommended_lines / plan_gap / current_position / recovery_targets を正本として固定する必要がある
    - L3 記録標準項目、daily review 後 operations update rule、operation generation guard を operations 本体にも反映する必要がある
  completed_condition:
    - feature/atlas-pre-delta-foundation の `systems/delta/operations/active_operations.md` を read する
    - proposal note に基づき plan_gap / current_position / recommended_lines / precise progress units を反映する
    - L3 record requirements として question_id / source_page / difficulty / estimated_time / actual_time / time_delta / result / review_mark / next_review_target / time_analysis / estimate_source_status を反映する
    - daily review 後に operations update phase が必要であることを Rules または metadata に反映する
    - operation generation guard として plan_anchor必須 / judgment二層化 / on_track厳格化 / L3実在問題番号を反映する
    - 2026-05-02 日報後の Day3〜Day6 期待 operations を反映する
    - 5/3用の must_line / standard_line / stretch_line / next_resume_question_id / recovery_targets が active_operations に保存される
    - update 前に Write Gate を出す
    - update 後に read-back し sha を記録する
    - repo operations state と DELTA runtime behavior を混同しない
  notes:
    - ADAM が repo-side update を行う場合は `resource=code`, branch `feature/atlas-pre-delta-foundation` で更新する
    - DELTA GPT の deltaResourceWrite behavior 確認は別 fixture
  external:
    todoist_task_id: 6gWVwmw97XPvj43q

- task: DELTA configured GPT に最新 instruction / action schema を反映して runtime-visible schema を確認する
  source_ref:
    - systems/delta/config/delta_instruction.md
    - systems/delta/config/delta_schema.yaml
    - systems/delta/config/delta_action_schema.yaml
    - systems/delta/config/delta_action_schema_v0.6.yaml
  rolling_day: Day0
  due_date: 2026-05-03
  due_type: deadline
  blocked_by:
    - DELTA v0.6 operations shape を feature branch に反映する
  why_now:
    - 5/3の学習運用前に DELTA GPT が最新仕様を読めないと、operations update / recall / write fixture が成立しない
    - `deltaResourceWrite` は repo Action schema に追加済みだが、configured GPT runtime-visible schema は未確認
    - DELTA Knowledge は上限20に達しているため、delta_schema.yaml は configured Knowledge ではなく repo-side internal schema source として扱う
  completed_condition:
    - DELTA GPT に latest `delta_instruction.md` が反映される
    - DELTA GPT Actions に latest `delta_action_schema.yaml` が反映される
    - DELTA GPT Knowledge に `delta_schema.yaml` は登録しない前提を確認する
    - Bearer API key 設定が維持されている
    - 新スレッドで operationId `deltaResourceGet` と `deltaResourceWrite` が runtime-visible であることを確認する
    - 失敗時は configured Action schema / auth / backend / unknown のどこで失敗したか記録する
  notes:
    - `delta_schema.yaml` は内部データモデルであり GPT Actions に貼らない
    - `delta_schema.yaml` は Knowledge 上限により configured GPT Knowledge にも登録しない
    - GPT Actions に貼るのは `delta_action_schema.yaml`
  external:
    todoist_task_id: 6gWW3JhF8fWQh5Wq

- task: DELTA configured GPT で bulk / tree / recommended_lines recall を確認する
  source_ref:
    - systems/delta/config/delta_action_schema.yaml
    - systems/delta/operations/active_operations.md
    - systems/delta/history/daily/2026-05-02.md
    - systems/delta/plan/2026_sharoushi_exam_plan.md
  rolling_day: Day0
  due_date: 2026-05-03
  due_type: deadline
  blocked_by:
    - DELTA configured GPT に最新 instruction / action schema を反映して runtime-visible schema を確認する
  completed_condition:
    - DELTA GPT 新スレッドで `resource=delta`, `action=bulk`, branch 指定ありの read が成功する
    - DELTA GPT 新スレッドで `resource=delta`, `action=tree`, branch 指定ありの read が成功する
    - DELTA GPT が active_operations の saved recommended_lines を提示し、原則再計算しない
    - 失敗時は status/body/request_id を記録する
  notes:
    - write / Todoist apply はしない
  external:
    todoist_task_id: 6gWVwpmPfc975CCq

- task: DELTA daily review write + operations update fixture を最小確認する
  source_ref:
    - notes/02_design/2026-05-02_delta_daily_review_active_operations_auto_update.md
    - notes/02_design/2026-05-02_delta_l3_difficulty_estimated_time_recording_rule.md
    - notes/02_design/2026-05-02_delta_operation_generation_judgment_regression_guard.md
    - systems/delta/config/delta_action_schema.yaml
    - systems/delta/config/delta_instruction.md
    - systems/delta/config/delta_schema.yaml
    - systems/delta/history/daily/2026-05-02.md
    - systems/delta/operations/active_operations.md
  rolling_day: Day0
  due_date: 2026-05-03
  due_type: deadline
  blocked_by:
    - DELTA configured GPT に最新 instruction / action schema を反映して runtime-visible schema を確認する
    - DELTA v0.6 operations shape を feature branch に反映する
  completed_condition:
    - DELTA GPT runtime-visible schema に deltaResourceWrite が見える
    - DELTA GPT で write 前に対象 daily history と active_operations を read する
    - Write Gate 相当の確認を行う
    - actual write を行う場合は `resource=delta_operations`, `action=update`, `file=active_operations.md` を最小安全差分で確認する
    - actual write が危険な場合は dry-run/proposed content として止め、未確認 blocker を明示する
    - history sha と operations sha を read-back で記録する、または失敗情報を記録する
  notes:
    - 5/3中の最小要件は、少なくとも DELTA が active_operations から明日の学習線を読めること
    - one-question history write の完全 fixture は、必要に応じて後続へ回してよい
  external:
    todoist_task_id: 6gWVwpq86mRC7Pcq

## Day1（05/04 月）

Capacity note: D1 は残った正規化・schema整理。D0のDELTA readinessが未完了ならD0を継続する。

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
  blocked_by:
    - DELTA v0.6 learning operations readiness を 2026-05-03 中に確保する
  why_now:
    - ADAM / EVE も `*_action_schema.yaml` へ移行済みだが、instruction 上の命名規約固定が弱い
    - DELTA では `delta_action_schema.yaml` と `delta_schema.yaml` の役割分離が明確で、ADAM / EVE も同じルールへ寄せる必要がある
    - configured GPT に貼るファイルを誤ると runtime reflection や Action 設定ミスが再発する
  completed_condition:
    - ADAM / EVE / DELTA の Action schema canonical file を確認する
    - `*_action_schema.yaml` は GPT Actions 用 OpenAPI schema、`*_schema.yaml` は内部 schema または legacy互換であると明文化する
    - ADAM / EVE instruction または knowledge のどちらに固定するか Rule Placement Guard で判断する
    - 必要なら config/ai/adam_instruction.md / config/ai/eve_instruction.md に最小差分で反映する
    - 更新後に read-back し sha を記録する
    - repo config state と configured GPT reflection / runtime-visible schema を混同しない
  notes:
    - DELTA latest Action schema は systems/delta/config/delta_action_schema.yaml
    - ADAM latest Action schema は config/ai/adam_action_schema.yaml
    - EVE latest Action schema は config/ai/eve_action_schema.yaml
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

Capacity note: D2 は残りの write behavior と schema reflection。D0で最小確認済みなら詳細整理へ進む。

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
