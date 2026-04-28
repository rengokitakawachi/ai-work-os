# next_operations

## 概要

active_operations に入らなかった上位候補を保持する。

`next_operations` は、
7日ローリングの `active_operations` に入らなかったが、
近い将来に進める前提の task を置くレイヤーとする。

---

## 再評価結果（2026-04-28 daily review）

### active へ移した task

- `DELTA v0.3 history write を repo-resource 統合方式で実装する`
- `DELTA v0.3 history write runtime reflection を実行する`
- `DELTA v0.4 operations write の safety design gate を作る`
- `DELTA v0.4 operations write を repo-resource 統合方式で実装する`
- `DELTA v0.4 operations write runtime reflection を実行する`
- `Phase 1 Todoist foundation entry: Todoist service 境界と一覧取得 API を確認する`
- `docs/05_roadmap.md への Phase 0 位置づけ反映案を作る`

### 完了扱いで外した task

- `DELTA v0.2 read-only Action runtime behavior confirmation`

理由:

- DELTA GPT Actions で tree / read / bulk がすべて成功した
- `branch=feature/atlas-pre-delta-foundation` と `read_only: true` を確認した
- write / create / update / delete は未実行

### 方針変更

- Vercel Hobby の Serverless Functions 上限により、新規 `api/delta-*` route 追加方式は採用しない
- v0.3 以降も既存 `/api/repo-resource` へ resource を統合する方式で進める
- schema 更新だけでは runtime confirmed としない

---

## タスク

- task: issue routing completed condition の継続観測項目を weekly review 向けに整理する
  source_ref:
    - notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md
    - notes/08_analysis/2026-04-21_issue_routing_operations_candidate_rolling_connection_observation.md
    - notes/08_analysis/2026-04-21_issue_routing_keep_future_archive_operational_validity.md
  why_now:
    - issue routing の completed condition は plan / operations に返したが、単発確認と継続確認を分ける必要がある
    - weekly review で Phase 0 の進捗判断へ返せる形に整理しておく価値がある
  notes:
    - 単発確認済みの項目と、継続観測が必要な項目を分ける

- task: ADAM / EVE instruction 再層化後の runtime 反映確認 task を作る
  source_ref:
    - notes/02_design/2026-04-26_adam_eve_instruction_schema_layering.md
    - config/ai/adam_instruction.md
    - config/ai/eve_instruction.md
    - config/ai/adam_knowledge.md
    - config/ai/eve_knowledge.md
    - config/ai/adam_schema.yaml
    - config/ai/eve_schema.yaml
  why_now:
    - instruction / knowledge 再層化は repo 更新だけでは完了しないため、ADAM / EVE それぞれの runtime 反映確認を後段 task として分ける必要がある
  notes:
    - completed condition は runtime 上で新 instruction / knowledge / schema scope が観測できること
    - ADAM と EVE は別 runtime として確認する

- task: intake routing の archive / pending 後処理を実データで再観測する
  source_ref:
    - notes/02_design/2026-04-26_intake_inbox_postprocess_general_rule.md
    - notes/02_design/intake_review_and_source_ref_spec.md
  why_now:
    - 一般化した rule が、pending_tasks 以外でも破綻しないかを確認する必要がある
  notes:
    - 単発確認ではなく、継続観測 task として扱う

- task: Phase 1 Outlook Calendar API の読取設計を整理する
  source_ref:
    - notes/03_plan/2026-04_phase1_todoist_outlook_foundation.md
    - docs/05_roadmap.md
  why_now:
    - Todoist foundation entry の後続として、Outlook を schedule 正本として読む設計が必要になる
  notes:
    - Outlook 書き込みではなく read-only foundation に限定する
    - 認証 / calendar scope / free-busy 判定を分けて扱う

- task: legacy Todoist wrapper の削除判断を Phase 1 Todoist foundation 後に行う
  source_ref:
    - notes/02_design/2026-04-18_legacy_todoist_wrapper_deprecation_design.md
    - src/services/todoist.js
    - src/services/todoist/client.js
  why_now:
    - wrapper usage 確認は Phase 1 Todoist foundation entry に吸収するが、実削除判断は別 gate として残す方が安全である
  notes:
    - repo usage / tests / replacement path が揃うまで削除しない

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
