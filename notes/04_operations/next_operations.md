# next_operations

## 概要

active_operations に入らなかった上位候補を保持する。

`next_operations` は、
7日ローリングの `active_operations` に入らなかったが、
近い将来に進める前提の task を置くレイヤーとする。

---

## 再評価結果（2026-04-27 two-layer config alignment）

### active へ移した task

- `ADAM / EVE instruction / knowledge を現行2層構成に合わせて整合する`
- `delta 学習支援システムの fast-track architecture を開発計画に取り込む`

理由

- `config/ai/common_*` と `config/ai/procedures/*` は ADAM と相談して削除済みであり、再作成しない方針に戻した
- 現行 repo は `instruction + knowledge + schema` 構成であり、common / procedures file 分割案を repo 更新へ進めると構造が再分裂する
- delta は 2026-08-23 の社会保険労務士試験に向けた期限駆動案件であり、future ではなく active 後半に置いて次回以降の実行対象とする

---

## 再評価結果（2026-04-26 daily review）

### active へ繰り上げた task

- `共通 core / tool use / schema reflection の draft を作る`
- `ADAM / EVE procedure draft を作る`
- `ADAM / EVE instruction 圧縮案を作る`

補足

- 上記3件は notes/design / analysis として作成済み
- ただし `config/ai/common_*` / `config/ai/procedures/*` の repo file 作成は行わない
- 作成済み draft は設計検討履歴として扱い、現行 repo 反映対象は既存 `instruction + knowledge + schema` 構成へ戻す

---

## タスク

- task: ADAM / EVE instruction / knowledge repo 更新差分を作る
  source_ref:
    - notes/02_design/2026-04-26_adam_eve_instruction_schema_layering.md
    - notes/08_analysis/2026-04-26_adam_eve_instruction_schema_inventory.md
    - notes/08_analysis/2026-04-27_adam_eve_instruction_compression_proposal.md
    - config/ai/adam_instruction.md
    - config/ai/adam_knowledge.md
    - config/ai/eve_instruction.md
    - config/ai/eve_knowledge.md
  why_now:
    - common / procedures file は再作成しない方針に戻ったため、既存4ファイル前提で必要な差分を作る必要がある
    - instruction 圧縮案は既にあるが、参照先が削除済み common / procedures file を前提にしているため、現行2層構成へ合わせ直す必要がある
  notes:
    - schema 更新はこの task に含めない
    - `adam_schema.yaml` / `eve_schema.yaml` の変更は runtime reflection completed condition が異なるため別 task とする
    - repo 更新後も runtime 反映確認は別 task とする

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
