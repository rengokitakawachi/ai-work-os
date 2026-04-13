# next_operations

## 概要

active_operations に入らなかった上位候補を保持する。

`next_operations` は、
7日ローリングの `active_operations` に入らなかったが、
近い将来に進める前提の task を置くレイヤーとする。

---

## Phase 0 位置づけ

### Phase 0 直結 task

- なし（現時点では Phase 0 の接続弱化修正と暫定実装を優先）

### 補助 task

- `docs 番号衝突と旧 docs 群の整理方針をメモ化する`
- `Phase 1 各 plan と operations 接続案を並べる`

## 再評価結果（2026-04-13 再調整）

### active へ繰り上げ済み

- `plan から operations への接続弱化ポイントと重要 issue の埋没防止ルールを design に整理する`
- `plan→issue→operations 接続弱化の暫定運用を instruction / docs / operations に反映する`

理由

- plan にある重要論点を design 化した後、早期に実運用へ反映しないと再発防止効果が出ないため
- Phase 0 を前進させるには、接続弱化の発見だけでなく暫定実装まで短距離でつなぐ方が自然である

### 現在の上位候補

- `docs 番号衝突と旧 docs 群の整理方針をメモ化する`
- `Phase 1 各 plan と operations 接続案を並べる`

理由

- どちらも重要ではあるが、まずは Phase 0 内の接続弱化修正と暫定実装を優先する方が自然である

## タスク

- task: docs 番号衝突と旧 docs 群の整理方針をメモ化する
  source_ref:
    - notes/08_analysis/2026-04-04_repo_readthrough_findings.md
    - notes/00_inbox/dev_memo/2026-04-04_repo_consistency_check_followup.md
  why_now:
    - repo 全体整合には必要だが、Phase 0 の接続弱化修正と暫定実装よりは後順位
  notes:
    - docs 15 / 16 系の衝突整理を含む

- task: Phase 1 各 plan と operations 接続案を並べる
  source_ref:
    - notes/03_plan/2026-04_phase1_todoist_outlook_foundation.md
    - notes/03_plan/2026-04_phase1_schedule_proposal_and_outlook_write.md
    - notes/03_plan/2026-04_phase1_teams_and_obsidian_light_use.md
    - notes/04_operations/active_operations.md
  why_now:
    - 次 phase への接続には必要だが、まずは Phase 0 の接続弱化修正と暫定実装を優先する
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
