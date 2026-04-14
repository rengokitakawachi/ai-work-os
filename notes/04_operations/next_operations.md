# next_operations

## 概要

active_operations に入らなかった上位候補を保持する。

`next_operations` は、
7日ローリングの `active_operations` に入らなかったが、
近い将来に進める前提の task を置くレイヤーとする。

---

## Phase 0 位置づけ

### Phase 0 直結 task

- なし（現時点では issue routing 継続と content / review 接続整理を優先）

### 補助 task

- なし

## 再評価結果（2026-04-14 daily review）

### active へ繰り上げ済み

- `Phase 1 各 plan と operations 接続案を並べる`

理由

- active の 7日枠を維持しつつも、まずは Phase 0 の issue routing 継続を優先したうえで、次 phase 接続候補を Day6 補充へ使う方が自然だったため

### 現在の上位候補

- なし

理由

- 直近 review 時点では、Phase 0 の issue routing 継続実装を優先するため、next に残すより active へ繰り上げた方が妥当だった

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
