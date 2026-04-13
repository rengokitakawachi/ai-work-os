# next_operations

## 概要

active_operations に入らなかった上位候補を保持する。

`next_operations` は、
7日ローリングの `active_operations` に入らなかったが、
近い将来に進める前提の task を置くレイヤーとする。

---

## Phase 0 位置づけ

### Phase 0 直結 task

- なし（現時点では Phase 0 の docs 反映と暫定運用反映を優先）

### 補助 task

- `Phase 1 各 plan と operations 接続案を並べる`

## 再評価結果（2026-04-13 daily review）

### active へ繰り上げ済み

- `docs 番号衝突と旧 docs 群の整理方針をメモ化する`

理由

- active の 7日枠を維持しつつ、repo 全体整合に関する近未来候補として妥当だったため

### 現在の上位候補

- `Phase 1 各 plan と operations 接続案を並べる`

理由

- 次 phase への接続には必要だが、まずは Phase 0 の docs 反映と暫定運用反映を優先する方が自然である

## タスク

- task: Phase 1 各 plan と operations 接続案を並べる
  source_ref:
    - notes/03_plan/2026-04_phase1_todoist_outlook_foundation.md
    - notes/03_plan/2026-04_phase1_schedule_proposal_and_outlook_write.md
    - notes/03_plan/2026-04_phase1_teams_and_obsidian_light_use.md
    - notes/04_operations/active_operations.md
  why_now:
    - 次 phase への接続には必要だが、まずは Phase 0 の docs 反映と暫定運用反映を優先する
  notes:
    - Todoist / Outlook 接続の前段として保持する

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
