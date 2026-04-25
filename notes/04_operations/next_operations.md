# next_operations

## 概要

active_operations に入らなかった上位候補を保持する。

`next_operations` は、
7日ローリングの `active_operations` に入らなかったが、
近い将来に進める前提の task を置くレイヤーとする。

---

## 再評価結果（2026-04-25 daily review）

### active へ繰り上げた task

- `pending_tasks 元 inbox を archive 扱いへ寄せてよいかを実運用上確認する`
- `intake routing の inbox 後処理 rule を一般化する`

理由

- 2026-04-24 までに `pending_tasks` split と後処理 rule の design 固定が完了したため、元 inbox の実運用確認と一般化を次に進めるのが自然である
- 2026-04-25 には直近 issue が追加され、issue placement 運用と intake 後処理一般化を並行して進める価値が上がった

---

## タスク

- task: ADAM instruction 再層化後の runtime 反映確認 task を作る
  source_ref:
    - notes/01_issues/idea_log.md
    - config/ai/adam_instruction.md
    - config/ai/adam_schema.yaml
  why_now:
    - instruction 再層化は repo 更新だけでは完了しないため、runtime 反映確認を後段 task として分ける必要がある
  notes:
    - design と repo 更新が終わってから active 化する
    - completed condition は runtime 上で新 instruction の挙動が観測できること

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
    - notes/02_design/2026-04-24_pending_tasks_split_postprocess_archive_pending_rule.md
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
