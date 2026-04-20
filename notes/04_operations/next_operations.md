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

## 再評価結果（2026-04-20 daily review）

### archive へ移した task

- `routing と document writing の責務分離方針を整理する`
- `issue routing と writer 間の action plan 受け渡し項目を定義する`

### active 繰り上げ結果

- `repo の adam_instruction.md 変更を ADAM instruction へ反映する`
- `routing と writing を分離する最小実装を入れる`
- `issue routing の第一バッチ運用実験を実施する`
- `issue routing 第一バッチの観測結果を記録する`

理由

- 2026-04-20 は issue routing の構造整理が前進し、design 2件は完了扱いにできた
- 一方で ADAM instruction への実反映と code 側の最小実装は未完了であり、第一バッチ実験前に引き続き優先すべきである
- docs 整理と Phase 1 接続案は補助 task として 1 日後ろに保持するのが自然だった

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
