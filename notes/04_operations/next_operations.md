# next_operations

## 概要

active_operations に入らなかった上位候補を保持する。

`next_operations` は、
7日ローリングの `active_operations` に入らなかったが、
近い将来に進める前提の task を置くレイヤーとする。

---

## 再評価結果（2026-04-27 daytime reroll）

### active へ移した task

- `delta MVP resource layout を作る`
- `delta 社労士試験向け initial roadmap / plan / operations を作る`
- `delta learning history daily log template を作る`
- `repoResourceGet bulk の files 区切り仕様を整理する`
- `docs/05_roadmap.md への Phase 0 位置づけ反映案を作る`
- `legacy Todoist wrapper の削除前 gate を repo 全体で再確認する`
- `issue routing completed condition の継続観測項目を weekly review 向けに整理する`
- `Phase 1 Todoist / Outlook foundation へ進む前の Phase 0 残件を棚卸しする`

理由

- ADAM / EVE instruction / knowledge 整合は repo 実体上すでに完了済みであり、active 先頭 task としては stale だった
- delta は 2026-08-23 の社会保険労務士試験に向けた期限駆動案件であり、初期運用開始を急ぐ必要がある
- delta は design 保存だけでは完了ではなく、resource layout / initial roadmap / plan / operations / daily log template まで進める必要がある

---

## タスク

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

- task: repoResourceGet bulk 区切り仕様の最小実装差分を作る
  source_ref:
    - notes/01_issues/idea_log.md
    - docs/10_repo_resource_api.md
    - api/repo-resource.js
    - config/ai/adam_schema.yaml
  why_now:
    - 仕様整理後に、改行区切り対応または明示的 error message の最小実装へ進める
  notes:
    - schema 更新と runtime tool schema 反映確認を別 task として扱う

- task: intake routing の archive / pending 後処理を実データで再観測する
  source_ref:
    - notes/02_design/2026-04-26_intake_inbox_postprocess_general_rule.md
    - notes/02_design/intake_review_and_source_ref_spec.md
  why_now:
    - 一般化した rule が、pending_tasks 以外でも破綻しないかを確認する必要がある
  notes:
    - 単発確認ではなく、継続観測 task として扱う

---

## ルール

- active に入らなかった上位候補を置く
- task / source_ref を必須とする
- why_now / notes / due_date / due_type は必要に応じて持つ
- next は active の次に来る候補プールとして扱う
- 必要に応じて target_date や rolling_day を持ってよい
- daily / weekly review で再評価する
- active_operations に入る前提のものだけを置く
- 会話中に新規候補が発生した場合も、まずは reroll により active / next / future を決める
- backlog 化しない
- 80_future の代替として使わない
- 削除済みの `config/ai/common_*` / `config/ai/procedures/*` 構造は再作成しない
- ADAM / EVE config は現行 `instruction + knowledge + schema` 構成を前提に整合する
