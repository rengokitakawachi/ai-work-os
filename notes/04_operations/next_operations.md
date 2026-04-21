# next_operations

## 概要

active_operations に入らなかった上位候補を保持する。

`next_operations` は、
7日ローリングの `active_operations` に入らなかったが、
近い将来に進める前提の task を置くレイヤーとする。

---

## Phase 0 位置づけ

### Phase 0 直結 task

- なし

### 補助 task

- なし

## 再評価結果（2026-04-21 daily review）

### active へ繰り上げた task

- `intake routing の第一バッチ候補を整理する`
- `intake routing の観測項目を analysis に落とす`
- `flow-control 新 handoff shape 統一の到達点を weekly report に返す要点を整理する`

理由

- issue routing の運用観測ラインを archive へ退避し、未完了 1 件の node test を先頭に残したうえで、次の Phase 0 本筋を intake routing に切り替えたため
- next に置いていた intake routing 関連 task は、明日の主実行対象として active へ繰り上げるのが自然である
- `ADAM 実運用 instruction へ完成条件ベース判断手順を反映確認する` は runtime 反映確認が取れたため、next からも外した

## タスク

- なし

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
