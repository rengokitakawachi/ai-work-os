# next_operations

## 概要

active_operations に入らなかった上位候補を保持する。

`next_operations` は、
7日ローリングの `active_operations` に入らなかったが、
近い将来に進める前提の task を置くレイヤーとする。

---

## 再評価結果（2026-04-22 daily review 補正 reroll）

### active へ繰り上げた task

- `pending_tasks 向けの inbox チャンク分解拡張要否を整理する`
- `pending_tasks 型複数論点入力の最小 split ルールを design に落とす`
- `intake inbox adapter の複数 item 抽出最小拡張を設計する`
- `daily review reroll で plan / issue / next を必須候補源として確認する最小チェックを design に落とす`
- `intake inbox adapter の複数 item 抽出最小拡張を実装する`
- `pending_tasks 分解後の第一バッチ再観測を行う`
- `flow-control 新 handoff shape 統一の到達点を weekly report に返す要点を整理する`
- `docs/05_roadmap.md に Phase 0 をどう位置づけるか整理する`
- `issue routing の完成条件を plan / operations に反映する`
- `legacy な Todoist service wrapper を deprecated 化する段取りを design / operations に落とす`

理由

- daily review は plan / issue / next を candidate source に含めて reroll すべきであり、その補正を行った
- intake routing の次段は `pending_tasks` 粒度改善だが、Plan 由来の上位接続論点と open issue 由来の architecture 論点も 7日枠に入ると判断した
- `next_operations` 既存候補だった実装 / 再観測も、前段依存が active 内に収まるため 7日枠へ繰り上げた

---

## タスク

- task: operations 提案時の Day 容量と reroll completeness を同時に確認するチェック項目を整理する
  source_ref:
    - notes/01_issues/idea_log.md
    - docs/17_operations_system.md
    - notes/04_operations/active_operations.md
  why_now:
    - issue `20260419-023` は、Day 容量不足提案の再発防止と reroll completeness 確認の両方に関わる
    - reroll 補正後の次候補として、運用チェック化を置くのが自然である
  notes:
    - Day 容量
    - candidate source の網羅
    - 依存順確認
    を同時に見るチェックへ落とす

- task: 直近 issue を plan / operations / dev_memo へどう落とすかの運用を整える
  source_ref:
    - notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md
    - notes/01_issues/idea_log.md
    - notes/04_operations/active_operations.md
  why_now:
    - plan の `次に落とす作業` に含まれる継続論点であり、今回の reroll 不足も issue→operations 接続の弱さと関係している
  notes:
    - issue routing 後の placement だけでなく、plan 接続の運用線も整理対象にする

- task: pending_tasks 型 split 後の inbox archive / pending rule を整理する
  source_ref:
    - notes/00_inbox/dev_memo/2026-03-22_09-40-00_pending_tasks.md
    - notes/02_design/intake_review_and_source_ref_spec.md
    - notes/08_analysis/2026-04-22_intake_routing_first_batch_mechanical_dry_run_observation.md
  why_now:
    - split を入れた後は、元 inbox を archive に移すか pending に残すかの rule も補強が必要になる
  notes:
    - split 後の役目終了条件を明示する

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
