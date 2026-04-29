# active_operations

## Immediate Gates

通常 Day より前に解消すべき manual / external / runtime reflection gate を置く。

Immediate Gate が未完了の場合、その gate に blocked される active task を実行しない。

Immediate Gate は7日枠に数えない。

- task: DELTA bulk/read で systems/delta prefixed path を正規化し runtime 確認する
  type: runtime_reflection_gate
  status: repo_updated_runtime_pending
  completed: false
  source_ref:
    - systems/delta/config/delta_action_schema_v0.2.yaml
    - systems/delta/config/delta_action_schema_v0.3.yaml
    - src/services/delta-resource.js
    - runtime test 2026-04-29 DELTA relative bulk OK
    - runtime test 2026-04-29 DELTA systems/delta-prefixed bulk INVALID_REQUEST
  blocks:
    - DELTA tree result から read / bulk へ直接つなぐ調査効率
    - DELTA 学習系 config / history / operations の横断読取効率
  completed_condition:
    - DELTA relative path bulk が既に成功することを確認する
    - DELTA `systems/delta/` prefix 付き path が修正前に失敗することを確認する
    - `src/services/delta-resource.js` で `systems/delta/` prefix 付き path を正規化する
    - repo code read-back で修正反映を確認する
    - runtime で `resource=delta` / `files=systems/delta/config/delta_action_schema_v0.2.yaml\nsystems/delta/config/delta_action_schema_v0.3.yaml` の bulk が成功する
    - runtime で relative path 形式の DELTA bulk が継続して成功する
  why_now:
    - DELTA でも tree が返す path をそのまま bulk/read に渡せないと、DELTA runtime 調査効率が落ちる
    - docs/notes の path normalization と同種の問題であり、今まとめて閉じる方が安全である
    - 既存の DELTA v0.2 runtime confirmation は relative path bulk 成功の確認であり、tree path 直結の確認ではなかった
  notes:
    - ADAM 側 `resource=delta` / relative files bulk は成功した
    - ADAM 側 `resource=delta` / `systems/delta/` prefix 付き bulk は `INVALID_REQUEST` だった
    - `src/services/delta-resource.js` は repo 上で修正済み
    - 修正済み sha: 46a073e048daef6482efc8174e2eb7b666930915
    - runtime 反映後に再確認する

- task: repoResource bulk/read で resource-prefixed docs/notes path を正規化し runtime 確認する
  type: runtime_reflection_gate
  status: complete
  completed: true
  source_ref:
    - notes/01_issues/idea_log.md#20260425-030
    - docs/10_repo_resource_api.md
    - api/repo-resource.js
    - src/services/repo-resource/common.js
    - src/services/repo-resource/notes.js
    - src/services/repo-resource/docs.js
    - runtime test 2026-04-29 repoResourceGet bulk notes-prefixed path NOT_FOUND
    - runtime test 2026-04-29 repoResourceGet bulk notes-prefixed path OK
    - runtime test 2026-04-29 repoResourceGet bulk docs-prefixed path OK
  blocks:
    - repo tree result から read / bulk へ直接つなぐ調査効率
    - handover / operations / docs / code の横断読取効率
    - Phase 0 hardening 中の repo investigation safety
  completed_condition:
    - issue 20260425-030 の原因を newline separator ではなく resource-prefixed path normalization gap として整理する
    - `src/services/repo-resource/common.js` で docs/notes prefix 付き path を正規化する
    - repo code read-back で修正反映を確認する
    - runtime で `resource=notes` / `files=notes/04_operations/active_operations.md\nnotes/04_operations/next_operations.md` の bulk が成功する
    - runtime で `resource=docs` / `files=docs/10_repo_resource_api.md` の read または bulk が成功する
    - relative path 形式の既存 read / bulk が継続して成功する
  why_now:
    - repo tree が返す path をそのまま bulk/read に渡せないと、以後の docs / notes / code 横断調査効率が落ちる
    - handover 再開、review、routing、code 調査で bulk を頻用するため、Phase 0 hardening より先に修正する価値が高い
    - docs/10 は comma / newline 両対応を実装済みと定義しており、今回の実害は separator ではなく path 正規化である
  notes:
    - newline 区切り自体は `04_operations/active_operations.md\n04_operations/next_operations.md` で runtime 成功を確認した
    - `notes/` prefix 付き path は修正前 runtime で `NOT_FOUND` だった
    - `src/services/repo-resource/common.js` は repo 上で修正済み
    - 修正済み sha: 250d082838609e1487780e1a2a659801a279d656
    - runtime 反映後、`resource=notes` / `files=notes/04_operations/active_operations.md\nnotes/04_operations/next_operations.md` の bulk 成功を確認した
    - runtime 反映後、`resource=docs` / `files=docs/10_repo_resource_api.md\n10_repo_resource_api.md` の bulk 成功を確認した
    - relative path 形式も継続成功を確認した
    - runtime behavior confirmed
  external:
    todoist_task_id: 6gVmfg7P753HX6JH

- task: DELTA v0.5 write schema で history write を復旧する
  type: runtime_reflection_gate
  status: complete
  completed: true
  source_ref:
    - systems/delta/config/delta_action_schema_v0.5.yaml
    - systems/delta/config/delta_action_schema_v0.4.yaml
    - api/repo-resource.js
    - src/services/delta-history.js
    - src/services/delta-operations.js
    - DELTA v0.5 runtime behavior confirmation 2026-04-29
  blocks:
    - DELTA daily history logging
    - DELTA 学習実績の repo 永続化
  notes:
    - DELTA v0.5 runtime behavior confirmed
    - controlled history update succeeded
    - operations update は実行していない
    - delete は実行していない
  external:
    todoist_task_id: 6gVjpcRR45RcpQqH

- task: ADAM handover trigger Always-On Rule を instruction / knowledge / runtime に反映する
  type: manual_runtime_reflection_gate
  status: complete
  completed: true
  source_ref:
    - config/ai/adam_instruction.md
    - config/ai/adam_knowledge.md
    - notes/06_handover/2026-04-29_phase0_hardening_restart_handover.md
    - ADAM runtime handover trigger confirmation 2026-04-29
  blocks:
    - handover / 新スレ移行時の正本誤認防止
    - Phase 0 hardening 中の restart safety
  completed_condition:
    - ADAM instruction repo へ Handover Trigger Guard を反映する
    - ADAM knowledge repo の Handover Procedure に trigger / content contract / forbidden を反映する
    - ADAM knowledge repo の Handover Procedure に Quality checklist を反映する
    - ADAM GPT editor の Instructions に最新版 `adam_instruction.md` を反映する
    - ADAM GPT editor の Knowledge に最新版 `adam_knowledge.md` を反映する
    - 新しい ADAM runtime で `新スレ` / `引き継ぎ書` が handover procedure trigger として扱われることを確認する
    - 出力に `handover は restart entry point であり execution source of truth ではない`、`Execution SSOT: notes/04_operations/active_operations.md`、first read list、guardrails が含まれることを確認する
    - 高品質 handover として current state snapshot / this thread actions / risks / source references が含まれることを確認する
  why_now:
    - 同種の handover trigger 欠落が2回発生した
    - handover は stale snapshot を正本化し得るため、Phase 0 hardening より前に修正すべき runtime safety gate である
    - repo 更新だけでは runtime behavior confirmed にならない
  notes:
    - repo instruction は更新済み
    - repo knowledge は Handover Trigger / Content contract / Forbidden / Quality checklist まで更新済み
    - ユーザーが ADAM GPT editor へ instruction / knowledge を反映済み
    - `notes/06_handover/2026-04-29_phase0_hardening_restart_handover.md` は作成・補完・保存確認済み
    - 新しい ADAM chat で `引き継ぎ` 系依頼を handover procedure request として扱い、handover を execution source of truth とせず `active_operations` を読んで次 action を判断した
    - runtime behavior confirmed
  external:
    todoist_task_id: 6gVjjP88XJg63pRH

- task: ADAM runtime instruction に Day capacity Always-On Rule を反映する
  type: manual_runtime_reflection_gate
  status: complete
  completed: true
  source_ref:
    - config/ai/adam_instruction.md
    - config/ai/adam_knowledge.md
  blocks:
    - 次回以降の daily review / operations reroll の品質保証
  notes:
    - repo instruction / knowledge は更新済み
    - ADAM runtime で Day capacity Always-On Rule が確認できた
    - runtime behavior として Day capacity correction 手順も確認できた
  external:
    todoist_task_id: 6gVgm3VxCq82hr2q

- task: DELTA v0.2 read-only Action runtime behavior confirmation
  type: runtime_reflection_gate
  status: complete
  completed: true
  source_ref:
    - systems/delta/config/delta_action_schema_v0.2.yaml
    - api/repo-resource.js
    - src/services/delta-resource.js
    - DELTA GPT Actions runtime test result 2026-04-28
  notes:
    - runtime test で tree / read / bulk がすべて成功した
    - `branch=feature/atlas-pre-delta-foundation` と `read_only: true` を確認した

---

## Day0（04/29 水）

- task: docs/05 Phase 0 hardening reflection の本体反映可否を判断する
  source_ref:
    - docs/05_roadmap.md
    - notes/02_design/2026-04-29_phase0_hardening_roadmap_reflection_draft.md
  rolling_day: Day0
  due_date: 2026-04-29
  due_type: date
  why_now:
    - Phase 0 hardening を roadmap の上位意味へ返すか判断する
    - docs 直更新は reflection draft の人間判断後に行う
  completed_condition:
    - reflection draft を読み、docs/05 本体へ反映するか判断する
    - 反映する場合の対象 section と最小差分を固定する
    - 反映しない場合は理由と再評価地点を残す
  notes:
    - Immediate Gate `ADAM handover trigger Always-On Rule を instruction / knowledge / runtime に反映する` が未完了なら実行しない
    - 反映する場合は Write Gate を出して docs/05 の最小差分更新に進む
  external:
    todoist_task_id: 6gVjc5vF39959h3q

- task: issue routing completed condition の継続観測項目を weekly review 向けに整理する
  source_ref:
    - notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md
    - notes/08_analysis/2026-04-21_issue_routing_operations_candidate_rolling_connection_observation.md
    - notes/08_analysis/2026-04-21_issue_routing_keep_future_archive_operational_validity.md
  rolling_day: Day0
  due_date: 2026-04-29
  due_type: date
  why_now:
    - Phase 0 hardening の中心は issue routing の運用完成条件を review で読める形にすること
  completed_condition:
    - issue routing の単発確認済み項目を列挙する
    - 継続観測が必要な項目を列挙する
    - weekly review で確認できる形の checklist draft を作る
  notes:
    - Immediate Gate `ADAM handover trigger Always-On Rule を instruction / knowledge / runtime に反映する` が未完了なら実行しない
    - 単発確認済み項目と継続観測項目を分ける
  external:
    todoist_task_id: 6gVjc63jPwjrxj6q

## Day1（04/30 木）

- task: issue routing completed condition を active / next / future 判断チェックに落とす
  source_ref:
    - notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md
    - docs/15_notes_system.md
    - docs/17_operations_system.md
  rolling_day: Day1
  due_date: 2026-04-30
  due_type: date
  why_now:
    - route_to: operations が即 active 化ではなく rolling 比較対象であることを運用チェックへ落とす
  completed_condition:
    - route_to: operations / design / future / archive / issue の後続処理を checklist 化する
    - active / next / future の判断基準に issue routing completed condition を接続する
    - operations rolling で使える candidate check として保存する
  notes:
    - plan / operations で読める checklist 形式を目指す
  external:
    todoist_task_id: 6gVjc649M5988WQH

- task: intake routing の archive / pending 後処理を実データで再観測する準備をする
  source_ref:
    - notes/02_design/2026-04-26_intake_inbox_postprocess_general_rule.md
    - notes/02_design/intake_review_and_source_ref_spec.md
  rolling_day: Day1
  due_date: 2026-04-30
  due_type: date
  why_now:
    - intake routing の後処理は Phase 0 の継続観測項目として残っている
  completed_condition:
    - 観測対象の inbox / dev_memo / pending_tasks 型入力を選定する
    - archive / pending / keep の観測項目を定義する
    - 実行前に想定される送付先と後処理条件を整理する
  notes:
    - 観測対象の inbox / dev_memo / pending_tasks 型入力を選定する
  external:
    todoist_task_id: 6gVjc654hjrvgxXq

## Day2（05/01 金）

- task: intake routing の archive / pending 後処理を実データで再観測する
  source_ref:
    - notes/02_design/2026-04-26_intake_inbox_postprocess_general_rule.md
    - notes/02_design/intake_review_and_source_ref_spec.md
  rolling_day: Day2
  due_date: 2026-05-01
  due_type: date
  blocked_by:
    - intake routing の archive / pending 後処理を実データで再観測する準備をする
  why_now:
    - 一般化した postprocess rule が pending_tasks 以外でも破綻しないか確認する
  completed_condition:
    - 選定した実データで intake routing を観測する
    - route 結果と postprocess 結果を分けて記録する
    - archive / pending / keep の判断が破綻しないか確認する
  notes:
    - 観測結果は analysis に保存する
  external:
    todoist_task_id: 6gVjc652WPGHgfcH

- task: intake routing 再観測結果を analysis / operations 候補へ返す
  source_ref:
    - notes/02_design/2026-04-26_intake_inbox_postprocess_general_rule.md
    - docs/15_notes_system.md
  rolling_day: Day2
  due_date: 2026-05-01
  due_type: date
  blocked_by:
    - intake routing の archive / pending 後処理を実データで再観測する
  why_now:
    - 観測だけで終えず、routing 判定軸や後処理ルールの修正要否を残す
  completed_condition:
    - observation を analysis note に保存する
    - rule 修正が必要か判断する
    - follow-up があれば next_operations 候補として整理する
  notes:
    - 必要なら follow-up を next_operations に送る
  external:
    todoist_task_id: 6gVjc69Mf869CPRq

## Day3（05/02 土）

- task: design routing の最小運用ルールを確認する
  source_ref:
    - docs/15_notes_system.md
    - notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md
  rolling_day: Day3
  due_date: 2026-05-02
  due_type: date
  why_now:
    - Phase 0 完成対象のうち design routing の運用確認が相対的に薄い
  completed_condition:
    - docs / design / future/design / archive / operations candidate の判定軸を確認する
    - docs 昇格条件と design retain 条件を分ける
    - design routing が review の代替ではないことを確認する
  notes:
    - docs / design / future/design / archive / operations candidate の判定軸を確認する
  external:
    todoist_task_id: 6gVjc6944CWV5fCq

- task: design routing 候補を実データから棚卸しする
  source_ref:
    - notes/02_design/
    - docs/15_notes_system.md
  rolling_day: Day3
  due_date: 2026-05-02
  due_type: date
  blocked_by:
    - design routing の最小運用ルールを確認する
  why_now:
    - 最小運用ルールを実データで確認する必要がある
  completed_condition:
    - design layer から routing 候補を数件抽出する
    - docs 昇格候補 / future 候補 / archive 候補 / retain を分類する
    - 実行候補化すべき design があれば operations candidate として整理する
  notes:
    - docs 昇格候補と future/archive 候補を混同しない
  external:
    todoist_task_id: 6gVjc6H2m29xF84H

## Day4（05/03 日）

- task: daily / weekly review と routing / rolling の責務境界を実例で確認する
  source_ref:
    - docs/15_notes_system.md
    - docs/17_operations_system.md
    - notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md
  rolling_day: Day4
  due_date: 2026-05-03
  due_type: date
  why_now:
    - Phase 0 hardening では review に routing を背負わせない境界を固定する必要がある
  completed_condition:
    - daily review / weekly review / routing / rolling の入出力を比較する
    - review が report 作成だけではないことを再確認する
    - routing が review の代替ではないことを整理する
  notes:
    - daily review / weekly review / routing / rolling の入出力を比較する
  external:
    todoist_task_id: 6gVjc6FxwHRVWQmq

- task: Phase 0 hardening の follow-up candidate を routing する
  source_ref:
    - notes/02_design/2026-04-29_phase0_hardening_roadmap_reflection_draft.md
    - notes/08_analysis/2026-04-28_phase0_remaining_inventory_before_phase1.md
  rolling_day: Day4
  due_date: 2026-05-03
  due_type: date
  why_now:
    - hardening で出た追加候補を即実行せず active / next / future に振り分ける
  completed_condition:
    - hardening で発生した候補を一覧化する
    - active / next / future / archive の行き先を決める
    - Phase 1 Outlook へ戻す条件を更新する
  notes:
    - Phase 1 Outlook へ戻す条件も確認する
  external:
    todoist_task_id: 6gVjc6Mg38FGc9wq

## Day5（05/04 月）

- task: ADAM / EVE instruction 再層化後の runtime 反映確認 task を作る
  source_ref:
    - notes/02_design/2026-04-26_adam_eve_instruction_schema_layering.md
    - config/ai/adam_instruction.md
    - config/ai/eve_instruction.md
    - config/ai/adam_knowledge.md
    - config/ai/eve_knowledge.md
    - config/ai/adam_schema.yaml
    - config/ai/eve_schema.yaml
  rolling_day: Day5
  due_date: 2026-05-04
  due_type: date
  why_now:
    - repo 更新と runtime 反映を区別する Phase 0 ルールを ADAM / EVE にも適用する
  completed_condition:
    - ADAM runtime 確認項目を定義する
    - EVE runtime 確認項目を定義する
    - repo schema / configured Action / runtime-visible schema / actual behavior の確認層を分ける
  notes:
    - ADAM と EVE は別 runtime として確認する
  external:
    todoist_task_id: 6gVjc6JJ4q2mxCfH

- task: EVE runtime reflection の最小確認プロンプトと完了条件を整理する
  source_ref:
    - config/ai/eve_instruction.md
    - config/ai/eve_knowledge.md
    - config/ai/eve_schema.yaml
  rolling_day: Day5
  due_date: 2026-05-04
  why_now:
    - Phase 1 以降に EVE runtime を使う前に、runtime-visible scope の確認方法を固定する
  completed_condition:
    - EVE runtime で確認すべき instruction / knowledge / schema scope を列挙する
    - 最小確認プロンプトを作る
    - 実行を別 gate として扱うか判断する
  notes:
    - 実行は別 gate として扱ってよい
  external:
    todoist_task_id: 6gVjc6RR6cP5vGJH

## Day6（05/05 火）

- task: Phase 0 hardening weekly readiness review draft を作る
  source_ref:
    - notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md
    - notes/02_design/2026-04-29_phase0_hardening_roadmap_reflection_draft.md
    - notes/04_operations/active_operations.md
  rolling_day: Day6
  due_date: 2026-05-05
  due_type: date
  why_now:
    - Phase 0 hardening の結果を weekly review で判断できる形に集約する
  completed_condition:
    - Phase 0 hardening の確認済み項目を整理する
    - 残る継続観測項目を整理する
    - weekly review に渡す判断材料を作る
  notes:
    - report 作成ではなく、weekly review に渡す readiness draft とする
  external:
    todoist_task_id: 6gVjc6R38pqXWjXq

- task: Phase 1 re-entry criteria を Phase 0 hardening 結果から整理する
  source_ref:
    - notes/08_analysis/2026-04-28_phase0_remaining_inventory_before_phase1.md
    - notes/08_analysis/2026-04-29_phase1_todoist_foundation_entry_boundary_analysis.md
  rolling_day: Day6
  due_date: 2026-05-05
  due_type: date
  why_now:
    - Outlook read foundation へ戻る前に Phase 0 hardening の最低条件を明確にする
  completed_condition:
    - Phase 1 Outlook read foundation に戻る条件を整理する
    - Phase 0 hardening と並行可能な条件を整理する
    - Outlook task を next から active に戻す判断軸を作る
  notes:
    - Phase 1 Outlook Calendar API read design は next に残す
  external:
    todoist_task_id: 6gVjc6WRCmM8VxVH

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
- branch で開発し、main 統合時に docs / code / config / operations / version を一致させる
- 現 main に docs/code 不一致がある場合は、新規 branch 開発前に整合回復を優先する
