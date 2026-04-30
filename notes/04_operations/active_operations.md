# active_operations

## Immediate Gates

通常 Day より前に解消すべき manual / external / runtime reflection gate を置く。

Immediate Gate が未完了の場合、その gate に blocked される active task を実行しない。

Immediate Gate は7日枠に数えない。

- task: Todoist projection integrity guard を instruction / daily review procedure に反映する
  source_ref:
    - notes/07_reports/2026-04-30_daily_review.md
    - config/ai/adam_instruction.md
    - config/ai/adam_knowledge.md
    - notes/04_operations/active_operations.md
  why_now:
    - 2026-04-30 daily review projection で `previous_active_tasks` を渡さず、旧 Todoist task が open のまま残った
    - Todoist は operations projection であり、projection 不整合は execution view の信頼性を落とす
    - daily review / operations rolling の再発防止 gate として、instruction / procedure に固定する必要がある
  blocks:
    - future daily review Todoist projection apply
    - operations rolling Todoist projection apply
  completed_condition:
    - `config/ai/adam_instruction.md` に Todoist Projection Integrity Guard を追加する
    - `config/ai/adam_knowledge.md` の Daily Review / Operations / Schema Reflection procedure に previous/current active snapshot 必須手順を追加する
    - `projectTasks(mode="dry_run")` と `projectTasks(mode="apply")` は `previous_active_tasks` + `current_active_tasks` の両方で行う rule を明記する
    - projection apply 後に旧 active projection task close / 新 active projection task open を確認する rule を明記する
    - returned Todoist task id を `active_operations` へ戻す rule を明記する
    - read-back / sha 確認する
  notes:
    - instruction repo update は `c0367d76949dce2195b369bb359e7aea489cda31` で完了
    - knowledge update はまだ未完了
    - repo update と configured GPT runtime 反映は別層

---

## Day0（05/01 金）

- task: ADAM Proactive Focus Completion Guard の runtime 反映確認を行う
  source_ref:
    - config/ai/adam_instruction.md
    - notes/08_analysis/2026-04-30_phase0_hardening_weekly_readiness_review_draft.md
    - notes/02_design/2026-04-30_routing_core_concept_redefinition.md
  rolling_day: Day0
  due_date: 2026-05-01
  due_type: date
  why_now:
    - 2026-04-30 に `Proactive Focus Completion Guard` を repo instruction へ追加した
    - repo 更新だけでは configured GPT / runtime 反映済みとはみなせない
    - 次 task へ進む前に phase-critical gate を自律検知する挙動は ADAM の実行品質に直結する
  completed_condition:
    - repo の `config/ai/adam_instruction.md` 最新 sha を確認する
    - configured GPT / runtime 反映済みかを repo 更新と分けて報告する
    - runtime behavior として、次 task へ進む前に completed now / remaining gates / next closure action / phase-critical 判定を行えるか確認する
    - repo updated / configured reflected / runtime-visible behavior confirmed / actual behavior confirmed を分けて記録する
  notes:
    - この会話内では guard を適用済みだが、configured GPT runtime 反映は別層
  external:
    todoist_task_id: 6gW4H84g6Hcwx33H

- task: routing session checklist に transform / relocation / archive same-folder rule を反映する
  source_ref:
    - notes/02_design/2026-04-30_routing_core_concept_redefinition.md
    - notes/08_analysis/2026-04-30_routing_session_checklist.md
    - notes/08_analysis/2026-04-30_weekly_review_routing_session_integration.md
  rolling_day: Day0
  due_date: 2026-05-01
  due_type: date
  why_now:
    - routing core は「蓄積情報の整理・分解・結合・価値化・滞留解消」として再定義された
    - ただし checklist には transform / relocation / archive same-folder rule がまだ明文化されていない
    - routing 実行時に archive 移動してよい条件と、design → future/design のような relocation routing を分ける必要がある
  completed_condition:
    - routing session の出力型を transform / relocation / retain / pending / archive に分ける
    - transform では新 file 作成・source_ref・old file archive を標準処理として明記する
    - relocation では existing file を別 layer へ移す条件を明記する
    - archive 先は原則 `notes/99_archive/<same-layer>/...` とする rule を明記する
    - 更新後 read-back / sha を確認する
  notes:
    - routing の滞留解消機能に直結するため、Phase 1 re-entry より先に閉じる
  external:
    todoist_task_id: 6gW4H88XWVJGPjMH

## Day1（05/02 土）

- task: routing session を weekly review procedure / knowledge へ反映する
  source_ref:
    - notes/08_analysis/2026-04-30_weekly_review_routing_session_integration.md
    - notes/08_analysis/2026-04-30_routing_session_checklist.md
    - config/ai/adam_knowledge.md
    - docs/15_notes_system.md
    - docs/17_operations_system.md
  rolling_day: Day1
  due_date: 2026-05-02
  due_type: date
  why_now:
    - routing session は weekly review の主要発動地点として整理された
    - ただし procedure / docs 反映要否が残っている
    - daily review が report 作成だけでなく content / routing candidate を扱うことも含め、review procedure に接続する必要がある
  completed_condition:
    - adam_knowledge.md の weekly review procedure 更新要否を判断する
    - docs/15 / docs/17 への反映要否を判断する
    - 必要な場合は Write Gate 後に full replacement または docs proposal を作る
    - routing session が review の代替ではなく、weekly review 内で呼び出される usecase であることを明記する
  notes:
    - docs 更新は docs update proposal guard に従う
  external:
    todoist_task_id: 6gW4H8FHfVFqXrWq

- task: archive 判定済み未移動一覧を current rule に合わせて作る
  source_ref:
    - notes/08_analysis/2026-04-30_intake_routing_archive_pending_reobservation.md
    - notes/08_analysis/2026-04-30_design_routing_candidate_inventory.md
    - notes/08_analysis/2026-04-30_routing_session_checklist.md
  rolling_day: Day1
  due_date: 2026-05-02
  due_type: date
  why_now:
    - routing は archive 判定だけで放置すると滞留解消機能にならない
    - routing 実行時に archive move してよい方針へ修正されたため、未移動対象を current rule で整理する必要がある
  completed_condition:
    - archive decision / archive candidate / pending / relocation / retain を分ける
    - physical move 済み / 未済みを分ける
    - move すべきもの、retain すべきもの、review 待ちを分ける
    - archive 先を同等 layer 構造で提案する
    - この task で移動するか、別 file move task に送るか判断する
  notes:
    - 2026-04-30 に draft は作成したが、transform / relocation 方針反映前のため current rule で作り直す
  external:
    todoist_task_id: 6gW4H8J22QFHPCVH

## Day2（05/03 日）

- task: ADAM / EVE instruction 再層化後の runtime 反映確認 task を作る
  source_ref:
    - notes/02_design/2026-04-26_adam_eve_instruction_schema_layering.md
    - config/ai/adam_instruction.md
    - config/ai/eve_instruction.md
    - config/ai/adam_knowledge.md
    - config/ai/eve_knowledge.md
    - config/ai/adam_schema.yaml
    - config/ai/eve_schema.yaml
  rolling_day: Day2
  due_date: 2026-05-03
  due_type: date
  why_now:
    - repo 更新と runtime 反映を区別する Phase 0 ルールを ADAM / EVE に適用する
    - Proactive Focus Completion Guard の反映確認とあわせ、runtime reflection の残範囲を明確にする
  completed_condition:
    - ADAM runtime 確認項目を定義する
    - EVE runtime 確認項目を定義する
    - repo schema / configured Action / runtime-visible schema / actual behavior の確認層を分ける
    - 実行 gate と task 作成 gateを分ける
  notes:
    - ADAM と EVE は別 runtime として確認する
  external:
    todoist_task_id: 6gW4H8PjHpjw7q7q

- task: EVE runtime reflection の最小確認プロンプトと完了条件を整理する
  source_ref:
    - config/ai/eve_instruction.md
    - config/ai/eve_knowledge.md
    - config/ai/eve_schema.yaml
  rolling_day: Day2
  due_date: 2026-05-03
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
    todoist_task_id: 6gW4H8WC38gVjjCH

## Day3（05/04 月）

- task: Phase 1 re-entry criteria を Phase 0 hardening 結果から整理する
  source_ref:
    - notes/08_analysis/2026-04-28_phase0_remaining_inventory_before_phase1.md
    - notes/08_analysis/2026-04-29_phase1_todoist_foundation_entry_boundary_analysis.md
    - notes/08_analysis/2026-04-30_phase0_hardening_weekly_readiness_review_draft.md
    - notes/02_design/2026-04-30_routing_core_concept_redefinition.md
  rolling_day: Day3
  due_date: 2026-05-04
  due_type: date
  why_now:
    - Outlook read foundation へ戻る前に Phase 0 hardening と routing core 再定義の最低条件を明確にする
  completed_condition:
    - Phase 1 Outlook read foundation に戻る条件を整理する
    - Phase 0 hardening と並行可能な条件を整理する
    - routing session / weekly review integration が Phase 1 re-entry を阻害しない条件を明示する
    - Outlook task を next から active に戻す判断軸を作る
  notes:
    - Outlook read design は next に残し、criteria の結果を見て active 化する
  external:
    todoist_task_id: 6gW4H8Wx6C8cp8hH

## Day4（05/05 火）

- task: Phase 1 Outlook Calendar API の読取設計を整理する
  source_ref:
    - notes/03_plan/2026-04_phase1_todoist_outlook_foundation.md
    - docs/05_roadmap.md
    - notes/08_analysis/2026-04-29_phase1_todoist_foundation_entry_boundary_analysis.md
  rolling_day: Day4
  due_date: 2026-05-05
  due_type: date
  why_now:
    - Todoist foundation entry の後続として、Outlook を schedule 正本として読む設計が必要になる
    - Phase 1 re-entry criteria 完了後に active 化する自然な次候補である
  completed_condition:
    - current Outlook-related code / config / docs を棚卸しする
    - calendar read endpoint または missing endpoint を特定する
    - required auth model を確認する
    - event response shape を提案する
    - free/busy calculation prerequisites を列挙する
    - 次の implementation task を routing する
  notes:
    - Outlook 書き込みではなく read-only foundation に限定する
  external:
    todoist_task_id: 6gW4H8g4c2HCvvRH

## Day5（05/06 水）

- task: repo history / show / grep の docs・schema・runtime reflection 残範囲を再確認する
  source_ref:
    - docs/10_repo_resource_api.md
    - config/ai/adam_schema.yaml
    - notes/08_analysis/2026-04-30_phase0_hardening_followup_candidate_routing.md
  rolling_day: Day5
  due_date: 2026-05-06
  due_type: date
  why_now:
    - history / grep は runtime behavior confirmed だが、show / compare / diff / search の actual behavior は未確認のまま残っている
    - repo schema / configured Action / runtime-visible schema / actual behavior を混同しないため、残範囲を明確にする
  completed_condition:
    - docs/10 の反映済み範囲を確認する
    - runtime-visible schema confirmed 範囲を確認する
    - actual behavior confirmed / unconfirmed を分ける
    - 残りを next / future / no-op に振り分ける
  notes:
    - 2026-04-30 の更新で v2.3.0 相当 schema は確認済みだが、全 action behavior は未確認
  external:
    todoist_task_id: 6gW4H8h3P22gwPvq

## Day6（05/07 木）

- task: legacy Todoist wrapper の削除判断を Phase 1 Todoist foundation 後に行う
  source_ref:
    - notes/02_design/2026-04-18_legacy_todoist_wrapper_deprecation_design.md
    - notes/08_analysis/2026-04-29_phase1_todoist_foundation_entry_boundary_analysis.md
    - src/services/todoist.js
    - src/services/todoist/client.js
  rolling_day: Day6
  due_date: 2026-05-07
  due_type: date
  why_now:
    - Phase 1 Todoist foundation entry で `src/services/todoist/client.js` が SSOT と確認できた
    - ただし legacy wrapper の削除は repo usage / tests / replacement path が揃ってから判断する方が安全
  completed_condition:
    - repo usage を確認する
    - replacement path を確認する
    - tests / runtime impact を確認する
    - delete / retain / future の判断を行う
  notes:
    - 現時点では deprecated legacy として維持
  external:
    todoist_task_id: 6gW4H8wXXwCx2Rvq

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
