# next_operations

## 概要

active_operations に入らなかった上位候補を保持する。

`next_operations` は、
7日ローリングの `active_operations` に入らなかったが、
近い将来に進める前提の task を置くレイヤーとする。

---

## タスク

- task: docs / notes / instruction の operations 周辺未反映差分を一覧化する
  source_ref:
    - notes/08_analysis/2026-04-04_repo_readthrough_findings.md
    - notes/02_design/2026-04-02_docs_15_notes_system_update_draft.md
    - code/config/ai/adam_instruction.md
  why_now:
    - docs 反映前の差分把握は重要だが、active の設計整合よりは後順位
  notes:
    - operations 関連の docs 差分を整理する

- task: docs 番号衝突と旧 docs 群の整理方針をメモ化する
  source_ref:
    - notes/08_analysis/2026-04-04_repo_readthrough_findings.md
    - notes/00_inbox/dev_memo/2026-04-04_repo_consistency_check_followup.md
  why_now:
    - 構造整理には必要だが、routing / operations の現行整合よりは後でよい
  notes:
    - docs 15 / 16 系の衝突整理を含む

- task: review system と operations rolling の接続ルールを design 観点で確認する
  source_ref:
    - notes/02_design/2026-04-03_review_system_operating_spec.md
    - notes/02_design/2026-04-06_operations_rolling_generation_and_prioritization_spec.md
  why_now:
    - review 接続は重要だが、まず generation / schema 整合を先に進める
  notes:
    - daily / weekly review の返却点を確認する

- task: Phase 0 完了条件に対する未充足項目を洗い出す
  source_ref:
    - notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md
    - notes/08_analysis/2026-04-04_repo_readthrough_findings.md
  why_now:
    - plan 観点の確認は必要だが、現行設計の主要修正後の方が精度が高い
  notes:
    - 直近 active の進行後に再評価する

- task: Phase 1 各 plan と operations 接続案を並べる
  source_ref:
    - notes/03_plan/2026-04_phase1_todoist_outlook_foundation.md
    - notes/03_plan/2026-04_phase1_schedule_proposal_and_outlook_write.md
    - notes/03_plan/2026-04_phase1_teams_and_obsidian_light_use.md
  why_now:
    - 次 phase への接続には必要だが、Phase 0 の骨格確定を先に行う
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
- backlog 化しない
- 80_future の代替として使わない
