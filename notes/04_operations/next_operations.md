# next_operations

## 概要

active_operations に入らなかった上位候補を保持する。

`next_operations` は、
7日ローリングの `active_operations` に入らなかったが、
近い将来に進める前提の task を置くレイヤーとする。

---

## 再評価結果（2026-04-24 daily review）

### active へ繰り上げた task

- `直近 issue を plan / operations / dev_memo へどう落とすかの運用を整える`

理由

- `pending_tasks` 系の最小粒度改善と inbox 後処理 rule 整理まで前進したため、次は新しく見つかった due_date 伝播欠落 issue を含む直近 issue の placement 運用線を補強する価値が上がった
- daily review では plan / open issue / next_operations / current active を candidate source として確認し、依存順に沿って active を再配置した

---

## タスク

- task: pending_tasks 元 inbox を archive 扱いへ寄せてよいかを実運用上確認する
  source_ref:
    - notes/00_inbox/dev_memo/2026-03-22_09-40-00_pending_tasks.md
    - notes/02_design/2026-04-24_pending_tasks_split_postprocess_archive_pending_rule.md
    - notes/08_analysis/2026-04-24_pending_tasks_split_reconfirmation_after_intro_exclusion.md
  why_now:
    - design 上は archive 寄りと整理できたため、次は実運用上もその扱いでよいかを確認する価値がある
  notes:
    - これは rule 固定後の runtime 側確認として扱う

- task: intake routing の inbox 後処理 rule を一般化する
  source_ref:
    - notes/02_design/intake_review_and_source_ref_spec.md
    - notes/02_design/2026-04-24_pending_tasks_split_postprocess_archive_pending_rule.md
    - notes/04_operations/active_operations.md
  why_now:
    - `pending_tasks` で固めた archive / pending 判定を、intake 全体の後処理 rule に返す候補として育てる価値がある
  notes:
    - まずは `pending_tasks` の経験則を一般 rule へ持ち上げる前提整理に留める

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
