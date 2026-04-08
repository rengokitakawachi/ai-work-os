# next_operations

## 概要

active_operations に入らなかった上位候補を保持する。

`next_operations` は、
7日ローリングの `active_operations` に入らなかったが、
近い将来に進める前提の task を置くレイヤーとする。

---

## タスク

- task: stale active の整合回復ルールを design に整理する
  source_ref:
    - notes/00_inbox/dev_memo/2026-04-08_active_first_execution_trial.md
    - notes/04_operations/active_operations.md
    - code/config/ai/adam_instruction.md
    - notes/02_design/2026-04-07_conversation_triggered_candidate_routing_and_rolling.md
  why_now:
    - active-first execution の試験運用で stale active の補足ルールが必要と分かったが、現行 active の上位 task よりは後順位で整理する方がよい
  notes:
    - reroll before execution とは別の前処理ルールとして切り分ける

- task: review system と operations rolling の接続ルールを design 観点で確認する
  source_ref:
    - notes/02_design/2026-04-03_review_system_operating_spec.md
    - notes/02_design/2026-04-06_operations_rolling_generation_and_prioritization_spec.md
    - notes/04_operations/active_operations.md
  why_now:
    - active 側で reroll と試験運用を進めた後、review にどう返すかを next で控えておく必要がある
  notes:
    - daily / weekly review の返却点と operations 更新点を明確にする

- task: docs / notes / instruction の operations 周辺未反映差分を一覧化する
  source_ref:
    - notes/08_analysis/2026-04-04_repo_readthrough_findings.md
    - notes/02_design/2026-04-02_docs_15_notes_system_update_draft.md
    - code/config/ai/adam_instruction.md
  why_now:
    - docs 反映前の差分把握は必要だが、まずは instruction / active 側の試験運用結果を見てから整理する方がよい
  notes:
    - active-first execution と conversation routing の反映漏れ観点を含める

- task: docs 番号衝突と旧 docs 群の整理方針をメモ化する
  source_ref:
    - notes/08_analysis/2026-04-04_repo_readthrough_findings.md
    - notes/00_inbox/dev_memo/2026-04-04_repo_consistency_check_followup.md
  why_now:
    - repo 全体整合には必要だが、Phase 0 の execution governance 試験よりは後順位
  notes:
    - docs 15 / 16 系の衝突整理を含む

- task: Phase 0 完了条件に対する未充足項目を洗い出す
  source_ref:
    - notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md
    - notes/08_analysis/2026-04-04_repo_readthrough_findings.md
    - notes/04_operations/active_operations.md
  why_now:
    - active の試験運用結果を踏まえて、Phase 0 完了条件の残差分を次順位で確認する必要がある
  notes:
    - execution governance と conversation routing を含めて再評価する

- task: Phase 1 各 plan と operations 接続案を並べる
  source_ref:
    - notes/03_plan/2026-04_phase1_todoist_outlook_foundation.md
    - notes/03_plan/2026-04_phase1_schedule_proposal_and_outlook_write.md
    - notes/03_plan/2026-04_phase1_teams_and_obsidian_light_use.md
    - notes/04_operations/active_operations.md
  why_now:
    - 次 phase への接続には必要だが、Phase 0 の骨格と execution governance の安定化が先である
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
