# active_operations

## Immediate Gates

通常 Day より前に解消すべき manual / external / runtime reflection gate を置く。

Immediate Gate が未完了の場合、その gate に blocked される active task を実行しない。

Immediate Gate は7日枠に数えない。

- none

---

## Day0（04/30 木）

- task: issue routing completed condition の継続観測項目を weekly review 向けに整理する
  source_ref:
    - notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md
    - notes/08_analysis/2026-04-21_issue_routing_operations_candidate_rolling_connection_observation.md
    - notes/08_analysis/2026-04-21_issue_routing_keep_future_archive_operational_validity.md
  rolling_day: Day0
  due_date: 2026-04-30
  due_type: date
  why_now:
    - Phase 0 hardening の中心は issue routing の運用完成条件を review で読める形にすること
    - docs/05 reflection と runtime safety gates が完了したため、次に戻るべき先頭 task である
  completed_condition:
    - issue routing の単発確認済み項目を列挙する
    - 継続観測が必要な項目を列挙する
    - weekly review で確認できる形の checklist draft を作る
  notes:
    - 単発確認済み項目と継続観測項目を分ける
  external:
    todoist_task_id: 6gVjc63jPwjrxj6q

- task: issue routing completed condition を active / next / future 判断チェックに落とす
  source_ref:
    - notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md
    - docs/15_notes_system.md
    - docs/17_operations_system.md
  rolling_day: Day0
  due_date: 2026-04-30
  due_type: date
  why_now:
    - route_to: operations が即 active 化ではなく rolling 比較対象であることを運用チェックへ落とす
    - 直前 task の checklist を operations rolling で使える判断軸へ接続する
  completed_condition:
    - route_to: operations / design / future / archive / issue の後続処理を checklist 化する
    - active / next / future の判断基準に issue routing completed condition を接続する
    - operations rolling で使える candidate check として保存する
  notes:
    - plan / operations で読める checklist 形式を目指す
  external:
    todoist_task_id: 6gVjc649M5988WQH

## Day1（05/01 金）

- task: intake routing の archive / pending 後処理を実データで再観測する準備をする
  source_ref:
    - notes/02_design/2026-04-26_intake_inbox_postprocess_general_rule.md
    - notes/02_design/intake_review_and_source_ref_spec.md
  rolling_day: Day1
  due_date: 2026-05-01
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

- task: intake routing の archive / pending 後処理を実データで再観測する
  source_ref:
    - notes/02_design/2026-04-26_intake_inbox_postprocess_general_rule.md
    - notes/02_design/intake_review_and_source_ref_spec.md
  rolling_day: Day1
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

## Day2（05/02 土）

- task: intake routing 再観測結果を analysis / operations 候補へ返す
  source_ref:
    - notes/02_design/2026-04-26_intake_inbox_postprocess_general_rule.md
    - docs/15_notes_system.md
  rolling_day: Day2
  due_date: 2026-05-02
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

- task: design routing の最小運用ルールを確認する
  source_ref:
    - docs/15_notes_system.md
    - notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md
  rolling_day: Day2
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

## Day3（05/03 日）

- task: design routing 候補を実データから棚卸しする
  source_ref:
    - notes/02_design/
    - docs/15_notes_system.md
  rolling_day: Day3
  due_date: 2026-05-03
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

- task: daily / weekly review と routing / rolling の責務境界を実例で確認する
  source_ref:
    - docs/15_notes_system.md
    - docs/17_operations_system.md
    - notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md
  rolling_day: Day3
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

## Day4（05/04 月）

- task: Phase 0 hardening の follow-up candidate を routing する
  source_ref:
    - notes/02_design/2026-04-29_phase0_hardening_roadmap_reflection_draft.md
    - notes/08_analysis/2026-04-28_phase0_remaining_inventory_before_phase1.md
  rolling_day: Day4
  due_date: 2026-05-04
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

- task: ADAM / EVE instruction 再層化後の runtime 反映確認 task を作る
  source_ref:
    - notes/02_design/2026-04-26_adam_eve_instruction_schema_layering.md
    - config/ai/adam_instruction.md
    - config/ai/eve_instruction.md
    - config/ai/adam_knowledge.md
    - config/ai/eve_knowledge.md
    - config/ai/adam_schema.yaml
    - config/ai/eve_schema.yaml
  rolling_day: Day4
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

## Day5（05/05 火）

- task: EVE runtime reflection の最小確認プロンプトと完了条件を整理する
  source_ref:
    - config/ai/eve_instruction.md
    - config/ai/eve_knowledge.md
    - config/ai/eve_schema.yaml
  rolling_day: Day5
  due_date: 2026-05-05
  due_type: date
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

- task: Phase 0 hardening weekly readiness review draft を作る
  source_ref:
    - notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md
    - notes/02_design/2026-04-29_phase0_hardening_roadmap_reflection_draft.md
    - notes/04_operations/active_operations.md
  rolling_day: Day5
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

## Day6（05/06 水）

- task: Phase 1 re-entry criteria を Phase 0 hardening 結果から整理する
  source_ref:
    - notes/08_analysis/2026-04-28_phase0_remaining_inventory_before_phase1.md
    - notes/08_analysis/2026-04-29_phase1_todoist_foundation_entry_boundary_analysis.md
  rolling_day: Day6
  due_date: 2026-05-06
  due_type: date
  why_now:
    - Outlook read foundation へ戻る前に Phase 0 hardening の最低条件を明確にする
  completed_condition:
    - Phase 1 Outlook read foundation に戻る条件を整理する
    - Phase 0 hardening と並行可能な条件を整理する
    - Outlook task を next から active に戻す判断軸を作る
  notes:
    - Phase 1 Outlook Calendar API read design は next に残す
    - Day6 は Phase 1 re-entry 判断の境界 day として意図的に軽めにする
    - Outlook read design を同日に前倒しせず、criteria の結果を見てから次回 reroll で active 化する
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
- branch で開発し、main統合時に docs / code / config / operations / version を一致させる
- 現 main に docs/code 不一致がある場合は、新規 branch 開発前に整合回復を優先する
