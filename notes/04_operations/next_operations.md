# next_operations

## 概要

active_operations に入らなかった上位候補を保持する。

`next_operations` は、7日ローリングの `active_operations` に入らなかったが、近い将来に進める前提の task を置くレイヤーとする。

---

## 再評価結果（2026-04-29 Phase 0 hardening reroll）

### active へ移した task

- `issue routing completed condition の継続観測項目を weekly review 向けに整理する`
- `intake routing の archive / pending 後処理を実データで再観測する`
- `ADAM / EVE instruction 再層化後の runtime 反映確認 task を作る`

### active に新規配置した Phase 0 hardening task

- `docs/05 Phase 0 hardening reflection の本体反映可否を判断する`
- `issue routing completed condition を active / next / future 判断チェックに落とす`
- `intake routing の archive / pending 後処理を実データで再観測する準備をする`
- `intake routing 再観測結果を analysis / operations 候補へ返す`
- `design routing の最小運用ルールを確認する`
- `design routing 候補を実データから棚卸しする`
- `daily / weekly review と routing / rolling の責務境界を実例で確認する`
- `Phase 0 hardening の follow-up candidate を routing する`
- `EVE runtime reflection の最小確認プロンプトと完了条件を整理する`
- `Phase 0 hardening weekly readiness review draft を作る`
- `Phase 1 re-entry criteria を Phase 0 hardening 結果から整理する`

### next に残した task

- `Phase 1 Outlook Calendar API の読取設計を整理する`
- `legacy Todoist wrapper の削除判断を Phase 1 Todoist foundation 後に行う`

### 方針変更

- Phase 1 は Todoist foundation entry まで完了済みとして扱う
- Outlook read foundation は一旦 next に残し、Phase 0 hardening の re-entry criteria 整理後に active へ戻す
- Phase 0 hardening は issue routing / intake routing / design routing / review boundary / runtime reflection の順で固める

---

## タスク

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
