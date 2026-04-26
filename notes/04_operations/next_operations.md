# next_operations

## 概要

active_operations に入らなかった上位候補を保持する。

`next_operations` は、
7日ローリングの `active_operations` に入らなかったが、
近い将来に進める前提の task を置くレイヤーとする。

---

## 再評価結果（2026-04-26 daily review）

### active へ繰り上げた task

- `共通 core / tool use / schema reflection の draft を作る`
- `ADAM / EVE procedure draft を作る`
- `ADAM / EVE instruction 圧縮案を作る`

理由

- 2026-04-26 に ADAM / EVE instruction / schema の共通 layering design と section inventory が完了したため、次は repo 更新前の draft 群を作るのが自然である
- EVE も同時に扱う方針へ前提が変わったため、ADAM 単体 rewrite より共通 core / procedure / persona-specific instruction の順に進める

---

## タスク

- task: ADAM / EVE instruction / schema repo 更新差分を作る
  source_ref:
    - notes/02_design/2026-04-26_adam_eve_instruction_schema_layering.md
    - notes/08_analysis/2026-04-26_adam_eve_instruction_schema_inventory.md
    - config/ai/adam_instruction.md
    - config/ai/eve_instruction.md
    - config/ai/adam_schema.yaml
    - config/ai/eve_schema.yaml
  why_now:
    - common core / procedure / instruction 圧縮案が固まった後、repo 実体への反映差分を作る必要がある
  notes:
    - repo 更新後も runtime 反映確認は別 task とする
    - ADAM / EVE の正本差分を混ぜない

- task: ADAM / EVE instruction 再層化後の runtime 反映確認 task を作る
  source_ref:
    - notes/02_design/2026-04-26_adam_eve_instruction_schema_layering.md
    - config/ai/adam_instruction.md
    - config/ai/eve_instruction.md
    - config/ai/adam_schema.yaml
    - config/ai/eve_schema.yaml
  why_now:
    - instruction / schema 再層化は repo 更新だけでは完了しないため、ADAM / EVE それぞれの runtime 反映確認を後段 task として分ける必要がある
  notes:
    - completed condition は runtime 上で新 instruction と schema が観測できること
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
