# active_operations

## Immediate Gates

通常 Day より前に解消すべき manual / external / runtime reflection gate を置く。

Immediate Gate が未完了の場合、その gate に blocked される active task を実行しない。

Immediate Gate は7日枠に数えない。

- none

---

## Day0（05/02 土）

- task: DELTA v0.6 Integrated Operations Upgrade を instruction / knowledge / schema / projection 反映 task に分解する
  source_ref:
    - notes/02_design/2026-05-02_delta_v0_6_integrated_operations_upgrade.md
    - notes/01_issues/2026-05-01_delta_daily_operations_plan_gap_check_issue.md
    - notes/02_design/2026-05-01_delta_daily_operations_plan_gap_check_design.md
    - notes/01_issues/2026-05-02_delta_progress_granularity_rule_issue.md
    - notes/02_design/2026-05-02_delta_progress_granularity_rule_design.md
    - notes/01_issues/2026-05-02_delta_recommended_line_generation_issue.md
    - notes/02_design/2026-05-02_delta_recommended_line_generation_design.md
    - notes/02_design/2026-04-30_delta_v0_6_operations_todoist_projection.md
    - systems/delta/roadmap/delta_roadmap.md
    - systems/delta/plan/2026_sharoushi_exam_plan.md
    - systems/delta/operations/active_operations.md
    - systems/delta/history/2026-05.md
  rolling_day: Day0
  due_date: 2026-05-02
  due_type: date
  why_now:
    - DELTA の daily operations 生成が直近反応型になり、長期・中期計画からの逆算が必須プロセスとして働いていない問題が発生した
    - 2026-05-02 の学習予定提示で、plan 上は Q9-1〜Q11 想定、actual は Q3-3 にもかかわらず、甘い必達ラインが出た
    - ユーザーの章単位報告を page_range / question_id へ正規化できないと plan-gap check 自体の精度が落ちる
    - recommended_lines が日中の都度再見積もりになると、operations が正本として機能せず、日中判断が揺れる
    - Todoist projection は重要だが、正しい DELTA operations を生成できることと同じ v0.6 scope で扱う方が実運用価値が高い
    - DELTA v0.6 は「正しい operations を生成し、それを execution view に投影する」一括 upgrade として扱う
  completed_condition:
    - DELTA v0.6 scope を integrated operations upgrade として定義する
    - DELTA instruction / knowledge / schema / operations generation code or prompt / projection service のどこに反映すべきかを層分離する
    - plan-gap check の必須 read set を定義する
    - `gap_status` / `operation_mode` / `recovery_required` の配置先を決める
    - `survival_line` と `plan_minimum_line` の分離を反映対象にする
    - progress SSOT を study_type ごとに定義する
    - L1 / L2 は `page_range` / `next_start_page` を必須粒度にする
    - L3 は `questions` / `question_id` / `next_question` を必須粒度にする
    - chapter-only input を page_range / question_id へ正規化する rule を反映対象にする
    - 変換不能時は未確定記録と confirmation next_action を残す rule を反映対象にする
    - operations / history / next_action / review / plan-gap check で章だけの表現を残さない rule を反映対象にする
    - recommended_lines は daily review で生成し active_operations に保存する rule を反映対象にする
    - recommended_lines の fields を定義する
      - fixed_at
      - plan_anchor
      - current_position
      - expected_position
      - gap_status
      - operation_mode
      - must_line
      - standard_line
      - stretch_line
      - defer
      - recompute_triggers
    - 日中の「今日の推奨ラインは？」には saved recommended_lines を提示し、原則再計算しない rule を反映対象にする
    - recompute_triggers を定義し、明示条件がある場合だけ日中再計算できる rule を反映対象にする
    - Todoist projection を v0.6 scope に含める
    - DELTA Todoist projection profile / target / description shape / write-back path を反映対象にする
    - Todoist は DELTA operations の正本ではなく projection であることを反映対象にする
    - 長文依頼文で nested fenced code block を使わない output rule の配置先を決める
    - 明日の予定出力テンプレートを反映対象にする
    - runtime confirmation fixture として 2026-05-02 case、7章完了 case、3章終わり case、recommended_lines recall case、explicit recompute case、Todoist dry_run/apply/write-back case を定義する
    - 後続 implementation / runtime reflection task を active / next / future に routingする
  notes:
    - これは即実装ではなく、v0.6 修正作業を安全に分解する gate
    - progress granularity と recommended_lines 固定は plan-gap check の前提条件として同一 task に統合する
    - Todoist projection は v0.6 に含めるが、実行順は operations generation correctness の後
  external:
    todoist_task_id: 6gWGH6f5vQhpF7gq

- task: ADAM / EVE instruction 再層化後の runtime 反映確認 task を作る
  source_ref:
    - notes/02_design/2026-04-26_adam_eve_instruction_schema_layering.md
    - config/ai/adam_instruction.md
    - config/ai/eve_instruction.md
    - config/ai/adam_knowledge.md
    - config/ai/eve_knowledge.md
    - config/ai/adam_schema.yaml
    - config/ai/eve_schema.yaml
  rolling_day: Day0
  due_date: 2026-05-02
  due_type: date
  why_now:
    - repo 更新と runtime 反映を区別する Phase 0 ルールを ADAM / EVE に適用する
    - Proactive Focus Completion Guard の反映確認とあわせ、runtime reflection の残範囲を明確にする
    - ユーザー判断として ADAM / EVE instruction 反映は明日実施する方針になった
  completed_condition:
    - ADAM runtime 確認項目を定義する
    - EVE runtime 確認項目を定義する
    - repo schema / configured Action / runtime-visible schema / actual behavior の確認層を分ける
    - 実行 gate と task 作成 gateを分ける
    - configured GPT への反映が必要な範囲を、manual reflection checklist として切り出す
  notes:
    - ADAM と EVE は別 runtime として確認する
    - repo instruction 更新だけで configured GPT reflection 済みとはみなさない
  external:
    todoist_task_id: 6gW4H8PjHpjw7q7q

## Day1（05/03 日）

- task: EVE runtime reflection の最小確認プロンプトと完了条件を整理する
  source_ref:
    - config/ai/eve_instruction.md
    - config/ai/eve_knowledge.md
    - config/ai/eve_schema.yaml
  rolling_day: Day1
  due_date: 2026-05-03
  due_type: date
  why_now:
    - Phase 1 以降に EVE runtime を使う前に、runtime-visible scope の確認方法を固定する
    - ADAM / EVE instruction 反映作業と連続して EVE 側の最小確認プロンプトを準備する方が反映漏れを抑えられる
  completed_condition:
    - EVE runtime で確認すべき instruction / knowledge / schema scope を列挙する
    - 最小確認プロンプトを作る
    - 実行を別 gate として扱うか判断する
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
  why_now:
    - Outlook read foundation へ戻る前に Phase 0 hardening と routing core 再定義の最低条件を明確にする
    - ADAM / EVE runtime reflection task の次に、Phase 1 へ戻れる条件を固定する必要がある
  completed_condition:
    - Phase 1 Outlook read foundation に戻る条件を整理する
    - Phase 0 hardening と並行可能な条件を整理する
    - routing session / weekly review integration が Phase 1 re-entry を阻害しない条件を明示する
    - Outlook task を next から active に戻す判断軸を作る
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
  why_now:
    - routing core は運用設計として大きく再定義された
    - docs は仕様 SSOT であり、安定仕様として昇格できる範囲を判断する必要がある
    - Phase 1 re-entry criteria の前提として、routing core が docs 昇格対象かを切り分ける
  completed_condition:
    - docs/15 / docs/17 を読む
    - routing core / weekly routing session のうち安定仕様化できる範囲を判断する
    - docs update proposal guard に従い、必要なら更新後全文を提示する
    - docs に置かず notes / knowledge に留める範囲も明示する
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

## Day3（05/05 火）

- task: repo history / show / grep の docs・schema・runtime reflection 残範囲を再確認する
  source_ref:
    - docs/10_repo_resource_api.md
    - config/ai/adam_schema.yaml
    - notes/08_analysis/2026-04-30_phase0_hardening_followup_candidate_routing.md
  rolling_day: Day3
  due_date: 2026-05-05
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

- task: ChatGPT Agent 外部記事を抽象概念と製品仕様に分割して routing する
  source_ref:
    - notes/00_inbox/ChatGPT Agent（エージェント）とは？背景や使い方を解説！.md
    - notes/08_analysis/2026-04-30_intake_routing_archive_pending_reobservation.md
    - notes/08_analysis/2026-05-01_archive_decision_unmoved_inventory_current_rule.md
  rolling_day: Day3
  due_date: 2026-05-05
  due_type: date
  why_now:
    - 対象Cは pending 例外が成立した
    - ADAM を「自律的に行動する OS」として説明する抽象概念 chunk は design / content に転用価値がある
    - 製品仕様・プラン・利用制限は時間変化するため公式情報確認が必要
  completed_condition:
    - 抽象概念 chunk と製品仕様 chunk を分離する
    - 抽象概念 chunk を design / content 素材として保存するか判断する
    - 製品仕様 chunk は公式情報確認が必要な issue / future として整理する
    - 元 file の pending 継続または archive 化条件を明示する
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
  why_now:
    - design routing で archive candidate と判定されたが、delete semantics は安全性が高く差分確認なしに archive しない
    - actual delete behavior では `resource=notes` の file path に `notes/` prefix を付けると validation error になり、allowed prefixes は `00_inbox/` などであることを観測した
  completed_condition:
    - docs/10_repo_resource_api.md を読む
    - current repoResourceWrite schema / actual behavior を確認する
    - design draft のどの部分が現行とズレているか整理する
    - archive / future/design retain / docs update candidate のどれにするか判断する
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
  why_now:
    - 現在の inbox には開発時の test clip / 直下配置 / 下層 folder など一回限りの整理対象がある
    - 恒久 knowledge ではなく cleanup issue として扱う判断になった
    - routing session の滞留解消機能を実運用で確認する素材にもなる
  completed_condition:
    - `notes/00_inbox` の current tree を確認する
    - 本システムと無関係な test clip を列挙する
    - delete candidate ごとに削除理由を明示する
    - inbox 直下の web / dev_memo 相当 file を分類する
    - inbox 配下の余計な下層 folder を列挙する
    - 下層 folder 内 file の移動 / routing / delete 方針を決める
    - delete 前に対象と影響範囲を確認する
    - Write Gate 後に delete / move を実行する
    - write 後に read-back / NOT_FOUND / destination 確認を行う
    - cleanup 結果を routing session summary または cleanup report に記録する
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
  why_now:
    - DELTA は read-only / bulk / history write が runtime confirmation 済みで、運用段階に入っている
    - `feature/atlas-pre-delta-foundation` に v0.6 以降を積み増す前に、foundation を main に統合する方が main との乖離を抑えられる
    - main は Docs-aligned stable version であり、運用中 subsystem は統合準備対象として扱うべきである
  completed_condition:
    - `feature/atlas-pre-delta-foundation` の DELTA 差分を棚卸しする
    - main に入れるべき DELTA files と、branch に残す files を分ける
    - `systems/delta/roadmap` / `plan` / `operations` / `history` / `config` の整合を確認する
    - ADAM 側 `repoResource delta` resource と docs / code / config の整合を確認する
    - runtime behavior confirmed 済み項目と未確認項目を列挙する
    - main 統合後に DELTA GPT runtime で read / bulk / write behavior を再確認する
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
  why_now:
    - ATLAS 関係ファイルを集約しないと、Claude 向け prompt / verification report / fixture / policy / handover が散在しやすい
    - ATLAS は test / verification / CI review system であり、systems 配下に subsystem として置く方が DELTA と構造的に揃う
    - ただし ATLAS は Claude が primary executor を担う特殊 subsystem のため、DELTA と同型で作る前に責務境界を固定する必要がある
  completed_condition:
    - ATLAS の primary executor が Claude であることを明記する
    - ADAM の責務を controller / integration / consistency に限定する
    - `systems/atlas/` に置くものと置かないものを分ける
    - 既存 ATLAS 関係ファイルの移動候補を棚卸しする
    - `systems/atlas/README.md` / roadmap / verification / prompts の初期構成案を作る
    - ATLAS outputs は verification evidence であり execution SSOT ではないことを明記する
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
