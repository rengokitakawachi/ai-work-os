# next_operations

## 概要

active_operations に入らなかった上位候補を保持する。

`next_operations` は、
7日ローリングの `active_operations` に入らなかったが、
近い将来に進める前提の task を置くレイヤーとする。

---

## 再評価結果（2026-04-23 daily review）

### active へ繰り上げた task

- `operations 提案時の Day 容量と reroll completeness を同時に確認するチェック項目を整理する`
- `pending_tasks 型 split 後の inbox archive / pending rule を整理する`

理由

- 2026-04-23 時点で `pending_tasks` 向け split 実装まで前進したため、再観測後に続く後処理 rule と運用チェックを 7日枠へ入れる価値が上がった
- daily review では plan / open issue / next_operations / current active を candidate source として確認し、依存順に沿って active を再配置した

---

## タスク

- task: 直近 issue を plan / operations / dev_memo へどう落とすかの運用を整える
  source_ref:
    - notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md
    - notes/01_issues/idea_log.md
    - notes/04_operations/active_operations.md
  why_now:
    - plan の `次に落とす作業` に含まれる継続論点であり、issue→operations 接続の運用線を補強する価値が残っている
  notes:
    - issue routing 後の placement だけでなく、plan 接続の運用線も整理対象にする

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
