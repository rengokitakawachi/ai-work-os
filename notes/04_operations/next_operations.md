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

## 再評価結果（2026-04-20 reroll）

### active 内の順序修正

- `routing と document writing の責務分離方針を整理する` を `issue routing の第一バッチ運用実験を実施する` より前へ繰り上げた
- `issue routing と writer 間の action plan 受け渡し項目を定義する` を active に追加した
- `issue routing 第一バッチの観測結果を記録する` を active に追加した

理由

- routing と document writing の責務分離は、第一バッチ運用実験の前提を変える構造変更であり、実験より先に固定する必要がある
- Day は 1 task 固定ではなく、0.5〜1.5h 程度の task を複数置いて約2h に近づける方が自然である
- そのため、Day1 と Day2 を複数 task 構成へ再編し、依存順と容量の両方を修正した

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
