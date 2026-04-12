# next_operations

## 概要

active_operations に入らなかった上位候補を保持する。

`next_operations` は、
7日ローリングの `active_operations` に入らなかったが、
近い将来に進める前提の task を置くレイヤーとする。

---

## Phase 0 位置づけ

### Phase 0 直結 task

- なし（4/12 daily review 時点では active 再構成を優先）

### 補助 task

- なし（旧 next は active へ繰り上げ済み）

## 再評価結果（2026-04-12 daily review）

### active へ繰り上げ済み

- `latest handover 起点の次作業選定と active_operations 先頭の解釈ルールを整理する`
- `daily review の出力から content 抽出と operations rolling の接続ルールを design 観点で整理する`
- `stale active の整合回復ルールを design に整理する`
- `ADAM で試す 05_decisions の最小運用モデルを design に整理する`
- `scoring knowledge の蓄積方針を dev_memo か design に整理する`
- `docs 番号衝突と旧 docs 群の整理方針をメモ化する`
- `Phase 1 各 plan と operations 接続案を並べる`

理由

- 4/12 までに旧 active が実質完了したため、daily review で旧 next をそのまま次週の active へ繰り上げた

### 現在の上位候補

- なし

理由

- 追加候補の再評価は次回 reroll / review で行う

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
