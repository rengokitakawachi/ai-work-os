# next_operations

## 概要

active_operations に入らなかった上位候補を保持する。

`next_operations` は、7日ローリングの `active_operations` に入らなかったが、近い将来に進める前提の task を置くレイヤーとする。

---

## 再評価結果（2026-04-29 daily review）

### active へ残した / 繰り越した task

- `issue routing completed condition の継続観測項目を weekly review 向けに整理する`
- `issue routing completed condition を active / next / future 判断チェックに落とす`
- `intake routing の archive / pending 後処理を実データで再観測する準備をする`
- `intake routing の archive / pending 後処理を実データで再観測する`
- `intake routing 再観測結果を analysis / operations 候補へ返す`
- `design routing の最小運用ルールを確認する`
- `design routing 候補を実データから棚卸しする`
- `daily / weekly review と routing / rolling の責務境界を実例で確認する`
- `Phase 0 hardening の follow-up candidate を routing する`
- `ADAM / EVE instruction 再層化後の runtime 反映確認 task を作る`
- `EVE runtime reflection の最小確認プロンプトと完了条件を整理する`
- `Phase 0 hardening weekly readiness review draft を作る`
- `Phase 1 re-entry criteria を Phase 0 hardening 結果から整理する`

### active から完了退避した task

- `docs/05 Phase 0 hardening reflection の本体反映可否を判断する`
- `ADAM docs 更新提案では対象 docs 全文を code block で出す rule を instruction / runtime に反映する`
- `DELTA bulk/read で systems/delta prefixed path を正規化し runtime 確認する`
- `repoResource bulk/read で resource-prefixed docs/notes path を正規化し runtime 確認する`
- `DELTA v0.5 write schema で history write を復旧する`
- `ADAM handover trigger Always-On Rule を instruction / knowledge / runtime に反映する`
- `ADAM runtime instruction に Day capacity Always-On Rule を反映する`
- `DELTA v0.2 read-only Action runtime behavior confirmation`

### next に残した task

- `Phase 1 Outlook Calendar API の読取設計を整理する`
- `legacy Todoist wrapper の削除判断を Phase 1 Todoist foundation 後に行う`

### next に新規追加した task

- `DELTA foundation を main に統合する準備をする`
- `ATLAS 関係ファイルを systems/atlas に集約する設計を整理する`
- `DELTA v0.6 operations を Todoist execution view へ投影する`

### 方針変更

- Phase 0 hardening の実行順は、issue routing → intake routing → design routing → review boundary → runtime reflection → readiness / re-entry criteria の順で維持する
- Day0 は 2026-04-30 起点へ更新した
- Day6 は Phase 1 re-entry 判断の境界 day として意図的に軽めにし、Outlook read design を同日に前倒ししない
- Outlook read foundation は、Phase 1 re-entry criteria 整理後に active 化を再判断する
- issue `20260425-030` は bulk separator 問題としては実態修正済みであり、resource-prefixed path normalization gap として閉じる
- DELTA v0.6 Todoist projection は学習実行 visibility に効くが、会話中の新規候補のため active へ即横入りさせず next に置く
- DELTA foundation はすでに運用段階にあるため、v0.6 Todoist projection より前に main integration 準備を優先候補として置く
- ATLAS は Claude を primary executor とする特殊な verification subsystem として扱い、systems/atlas 集約は設計整理後に行う

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
    - active 化は次回 reroll で Phase 0 hardening との兼ね合いを見て判断する

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
    - これは folder 作成そのものではなく設計整理 task
    - systems/atlas を作る場合も、ADAM active_operations の代替にはしない
    - Claude の一時会話ログ全文は置かず、verification evidence / reports / prompts を置く

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
    - Todoist は projection / execution view であり、DELTA operations を正本とする
    - DELTA foundation main integration 準備を先に評価する
    - active 化は次回 reroll で、Phase 0 hardening / DELTA 優先度を比較して決める

- task: Phase 1 Outlook Calendar API の読取設計を整理する
  source_ref:
    - notes/03_plan/2026-04_phase1_todoist_outlook_foundation.md
    - docs/05_roadmap.md
    - notes/08_analysis/2026-04-29_phase1_todoist_foundation_entry_boundary_analysis.md
  why_now:
    - Todoist foundation entry の後続として、Outlook を schedule 正本として読む設計が必要になる
    - ただし Phase 0 hardening の re-entry criteria 整理後に active へ戻す方が安全である
  notes:
    - Outlook 書き込みではなく read-only foundation に限定する
    - 認証 / calendar scope / free-busy 判定を分けて扱う
    - Phase 0 hardening active の Day6 で re-entry criteria を整理してから再評価する

- task: legacy Todoist wrapper の削除判断を Phase 1 Todoist foundation 後に行う
  source_ref:
    - notes/02_design/2026-04-18_legacy_todoist_wrapper_deprecation_design.md
    - notes/08_analysis/2026-04-29_phase1_todoist_foundation_entry_boundary_analysis.md
    - src/services/todoist.js
    - src/services/todoist/client.js
  why_now:
    - Phase 1 Todoist foundation entry で `src/services/todoist/client.js` が SSOT と確認できた
    - ただし legacy wrapper の削除は repo usage / tests / replacement path が揃ってから判断する方が安全である
  notes:
    - 現時点では deprecated legacy として維持
    - 即削除しない
    - Phase 0 hardening 完了後または Phase 1 Todoist 周辺作業再開時に再評価する

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
