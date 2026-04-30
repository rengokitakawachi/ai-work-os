# next_operations

## 概要

active_operations に入らなかった上位候補を保持する。

`next_operations` は、7日ローリングの `active_operations` に入らなかったが、近い将来に進める前提の task を置くレイヤーとする。

---

## 再評価結果（2026-04-30 daily review）

### active へ移動した / 繰り越した task

- `ADAM Proactive Focus Completion Guard の runtime 反映確認を行う`
- `routing session checklist に transform / relocation / archive same-folder rule を反映する`
- `routing session を weekly review procedure / knowledge へ反映する`
- `archive 判定済み未移動一覧を current rule に合わせて作る`
- `ADAM / EVE instruction 再層化後の runtime 反映確認 task を作る`
- `EVE runtime reflection の最小確認プロンプトと完了条件を整理する`
- `Phase 1 re-entry criteria を Phase 0 hardening 結果から整理する`
- `Phase 1 Outlook Calendar API の読取設計を整理する`
- `repo history / show / grep の docs・schema・runtime reflection 残範囲を再確認する`
- `legacy Todoist wrapper の削除判断を Phase 1 Todoist foundation 後に行う`

### active から完了退避した task

- `ADAM instruction 最新変更の runtime 反映確認を行う`
- `repo history / show / grep の docs 反映案を作る`
- `issue routing completed condition の継続観測項目を weekly review 向けに整理する`
- `issue routing completed condition を active / next / future 判断チェックに落とす`
- `intake routing の archive / pending 後処理を実データで再観測する準備をする`
- `intake routing の archive / pending 後処理を実データで再観測する`
- `intake routing 再観測結果を analysis / operations 候補へ返す`
- `design routing の最小運用ルールを確認する`
- `design routing 候補を実データから棚卸しする`
- `daily / weekly review と routing / rolling の責務境界を実例で確認する`
- `Phase 0 hardening の follow-up candidate を routing する`
- `Phase 0 hardening weekly readiness review draft を作る`

### next に残した task

- `DELTA foundation を main に統合する準備をする`
- `ATLAS 関係ファイルを systems/atlas に集約する設計を整理する`
- `DELTA v0.6 operations を Todoist execution view へ投影する`

### next に新規追加した task

- `archive 判定済み inbox file を archive へ移動する`
- `ChatGPT Agent 外部記事を抽象概念と製品仕様に分割して routing する`
- `notes delete API draft と current repoResourceWrite delete semantics の差分を確認する`
- `docs/15 / docs/17 に routing core / weekly routing session を反映するか判断する`

### 方針変更

- routing は都度 issue 処理ではなく、蓄積情報の整理・分解・結合・価値化・滞留解消機能として再定義した。
- 会話中の軽量分類は pre-routing / triage として扱う。
- weekly review は routing session の主要発動地点とする。
- routing session の出力型として transform / relocation / retain / pending / archive を明示する必要がある。
- routing 実行時、archive 判定が clear なものは Write Gate 後に同一 session 内で archive へ移してよい。
- archive 先は原則 `notes/99_archive/<same-layer>/...` とする。
- Phase 1 Outlook read foundation は Phase 1 re-entry criteria の完了後に active 化する。

---

## タスク

- task: DELTA foundation を main に統合する準備をする
  source_ref:
    - systems/delta/roadmap/delta_roadmap.md
    - systems/delta/plan/2026_sharoushi_exam_plan.md
    - systems/delta/operations/active_operations.md
    - systems/delta/history/2026-04.md
    - systems/delta/config/delta_action_schema_v0.5.yaml
    - notes/02_design/2026-04-30_delta_v0_6_operations_todoist_projection.md
    - notes/01_issues/idea_log.md#20260430-033
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

- task: ATLAS 関係ファイルを systems/atlas に集約する設計を整理する
  source_ref:
    - docs/05_roadmap.md
    - docs/17_operations_system.md
    - docs/15_notes_system.md
    - notes/01_issues/idea_log.md#20260430-034
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

- task: DELTA v0.6 operations を Todoist execution view へ投影する
  source_ref:
    - notes/02_design/2026-04-30_delta_v0_6_operations_todoist_projection.md
    - systems/delta/operations/active_operations.md
    - systems/delta/roadmap/delta_roadmap.md
    - systems/delta/plan/2026_sharoushi_exam_plan.md
    - src/services/tasks/projection.js
    - config/ai/adam_schema.yaml
    - notes/01_issues/idea_log.md#20260430-031
  why_now:
    - DELTA 日次学習の execution visibility を上げる
    - DELTA operations はすでに due_date / due_type / study_type を持ち、Todoist 投影に適した形になっている
    - 既存 ADAM projection を汎用化できれば、新規 API route を増やさず v0.6 として実装できる
  completed_condition:
    - DELTA v0.6 schema proposal を作る
    - `projectTasks` または同等 projection usecase が DELTA active operations を受け取れる
    - dry_run で DELTA operations tasks から Todoist create/update payload が生成される
    - payload description に DELTA 固有 field と `ref: systems/delta/operations/active_operations.md` が入る
    - apply で Todoist task が作成または更新される
    - apply 結果の Todoist task id を DELTA operations へ戻す方法を確認する
    - ADAM active projection が壊れていないことを確認する
    - DELTA GPT runtime-visible schema / behavior を確認する
  notes:
    - preferred direction は既存 `/api/tasks/project` と `src/services/tasks/projection.js` の profile 拡張
    - 新規 API route は増やさない

- task: archive 判定済み inbox file を archive へ移動する
  source_ref:
    - notes/08_analysis/2026-04-30_intake_routing_archive_pending_reobservation.md
    - notes/00_inbox/2026-03-23_inbox_web_digest.md
    - notes/00_inbox/260322_091234AIエージェントの作り方完全ガイド｜失敗しない開発5ステップと選定方法 ｜SIGNATE総研.md
  why_now:
    - archive 判定済み file を inbox に残し続けると routing の滞留解消機能が弱くなる
    - routing 実行時に clear archive decision は archive move してよい方針にした
  completed_condition:
    - 対象 file を read する
    - archive destination を `notes/99_archive/00_inbox/` 配下で決める
    - source_ref が派生先に残っていることを確認する
    - Write Gate を出す
    - archive copy を作成する
    - original delete の是非と安全性を確認する
    - read-back / existence check を行う
  notes:
    - delete original は impact 確認後に行う

- task: ChatGPT Agent 外部記事を抽象概念と製品仕様に分割して routing する
  source_ref:
    - notes/00_inbox/ChatGPT Agent（エージェント）とは？背景や使い方を解説！.md
    - notes/08_analysis/2026-04-30_intake_routing_archive_pending_reobservation.md
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

- task: notes delete API draft と current repoResourceWrite delete semantics の差分を確認する
  source_ref:
    - notes/02_design/2026-03-24_notes_delete_api_draft.md
    - docs/10_repo_resource_api.md
    - config/ai/adam_schema.yaml
  why_now:
    - design routing で archive candidate と判定されたが、delete semantics は安全性が高く差分確認なしに archive しない
  completed_condition:
    - docs/10_repo_resource_api.md を読む
    - current repoResourceWrite schema / actual behavior を確認する
    - design draft のどの部分が現行とズレているか整理する
    - archive / future/design retain / docs update candidate のどれにするか判断する

- task: docs/15 / docs/17 に routing core / weekly routing session を反映するか判断する
  source_ref:
    - notes/02_design/2026-04-30_routing_core_concept_redefinition.md
    - notes/08_analysis/2026-04-30_weekly_review_routing_session_integration.md
    - docs/15_notes_system.md
    - docs/17_operations_system.md
  why_now:
    - routing core は運用設計として大きく再定義された
    - docs は仕様 SSOT であり、安定仕様として昇格できる範囲を判断する必要がある
  completed_condition:
    - docs/15 / docs/17 を読む
    - routing core / weekly routing session のうち安定仕様化できる範囲を判断する
    - docs update proposal guard に従い、必要なら更新後全文を提示する
    - docs に置かず notes / knowledge に留める範囲も明示する

---

## ルール

- active に入らなかった上位候補を置く
- task / source_ref を必須とする
- why_now / notes / due_date / due_type は必要に応じて持つ
- next は active の次に来る候補プールとして扱う
- 必要に応じて target_date や rolling_day を持ってよい
- daily / weekly review で再評価する
- active_operations に入る前提のものだけを置く
- 会話中に新規タスク候補が発生した場合も、まずは reroll により active / next / future を決める
- backlog 化しない
- 80_future の代替として使わない
- 削除済みの `config/ai/common_*` / `config/ai/procedures/*` 構造は再作成しない
- ADAM / EVE config は現行 `instruction + knowledge + schema` 構成を前提に整合する
- main は Docs-aligned stable version として扱う
- branch は Notes-driven development space として扱う
- merge 時に docs / code / config / operations / version を一致させる
- ATLAS は test / verification / CI review system として扱う
- DELTA v0.3 以降は新規 API route を増やさず、既存 `/api/repo-resource` 統合方式で進める
