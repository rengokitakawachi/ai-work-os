# next_operations

## 概要

active_operations に入らなかった上位候補を保持する。

`next_operations` は、
7日ローリングの `active_operations` に入らなかったが、
近い将来に進める前提の task を置くレイヤーとする。

---

## 再評価結果（2026-04-22 daily review）

### active へ繰り上げた task

- `pending_tasks 向けの inbox チャンク分解拡張要否を整理する`
- `pending_tasks 型複数論点入力の最小 split ルールを design に落とす`
- `flow-control 新 handoff shape 統一の到達点を weekly report に返す要点を整理する`
- `intake inbox adapter の複数 item 抽出最小拡張を設計する`

理由

- 第一バッチ 3 件の mechanical dry run 観測により、次の主論点が `pending_tasks` の粒度改善に絞られたため
- route 多様性確認は完了したため、次は split 要否整理と split ルールの design 化を先に active に置くのが自然である
- weekly report 向け返却要点と adapter の複数 item 設計は、その後段として Day1 に置くのが自然である

---

## タスク

- task: intake inbox adapter の複数 item 抽出最小拡張を実装する
  source_ref:
    - notes/08_analysis/2026-04-22_intake_routing_first_batch_mechanical_dry_run_observation.md
    - notes/00_inbox/dev_memo/2026-03-22_09-40-00_pending_tasks.md
    - src/services/flow-control/adapters.js
    - notes/02_design/intake_review_and_source_ref_spec.md
  why_now:
    - split ルールと設計が固まった後の最短実装候補である
    - 全 inbox 一般化ではなく `pending_tasks` 型に絞った最小拡張として置いておく
  notes:
    - まずは `1見出し = 1item` の成立性から確認する

- task: pending_tasks 分解後の第一バッチ再観測を行う
  source_ref:
    - notes/08_analysis/2026-04-22_intake_routing_first_batch_mechanical_dry_run_observation.md
    - notes/00_inbox/dev_memo/2026-03-22_09-40-00_pending_tasks.md
    - src/services/flow-control/intake-routing.js
    - src/services/flow-control/adapters.js
  why_now:
    - split 拡張後に、route / source_ref / inbox 後処理 / role boundary が改善したかを観測する必要がある
  notes:
    - expectation observation と mechanical dry run observation を比較基準として使う

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
