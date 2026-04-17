# next_operations

## 概要

active_operations に入らなかった上位候補を保持する。

`next_operations` は、
7日ローリングの `active_operations` に入らなかったが、
近い将来に進める前提の task を置くレイヤーとする。

---

## Phase 0 位置づけ

### Phase 0 直結 task

- なし（現時点では reroll dry_run / design routing 後段 / review 接続整理を優先）

### 補助 task

- `docs 番号衝突と旧 docs 群の整理方針をメモ化する`
- `Phase 1 各 plan と operations 接続案を並べる`

## 再評価結果（2026-04-18 active split）

### next へ退避

- `docs 番号衝突と旧 docs 群の整理方針をメモ化する`
- `Phase 1 各 plan と operations 接続案を並べる`

理由

- Day0 本丸が 30分〜1.5時間程度の作業単位へ分割され、active 7日枠を維持するために後順位 2件を next に戻す方が自然だったため

## タスク

- task: docs 番号衝突と旧 docs 群の整理方針をメモ化する
  source_ref:
    - notes/08_analysis/2026-04-04_repo_readthrough_findings.md
    - notes/00_inbox/dev_memo/2026-04-04_repo_consistency_check_followup.md
    - notes/04_operations/next_operations.md
  why_now:
    - repo 全体整合には必要だが、直近は reroll dry_run / design routing 後段 / review 接続整理を優先したい
  notes:
    - docs 15 / 16 系の衝突整理を含む
  due_date: 2026-04-25
  due_type: date

- task: Phase 1 各 plan と operations 接続案を並べる
  source_ref:
    - notes/03_plan/2026-04_phase1_todoist_outlook_foundation.md
    - notes/03_plan/2026-04_phase1_schedule_proposal_and_outlook_write.md
    - notes/03_plan/2026-04_phase1_teams_and_obsidian_light_use.md
    - notes/04_operations/next_operations.md
  why_now:
    - 次 phase への接続には必要だが、直近は Phase 0 の粒度調整後の active task 群を優先したい
  notes:
    - Todoist / Outlook 接続の前段として保持する
  due_date: 2026-04-26
  due_type: date

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
