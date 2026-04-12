# next_operations

## 概要

active_operations に入らなかった上位候補を保持する。

`next_operations` は、
7日ローリングの `active_operations` に入らなかったが、
近い将来に進める前提の task を置くレイヤーとする。

---

## Phase 0 位置づけ

### Phase 0 直結 task

- なし（上位 2件は active へ繰り上げ済み）

### 補助 task

- `scoring knowledge の蓄積方針を dev_memo か design に整理する`
- `daily review の出力から content 抽出と operations rolling の接続ルールを design 観点で整理する`
- `latest handover 起点の次作業選定と active_operations 先頭の解釈ルールを整理する`
- `ADAM で試す 05_decisions の最小運用モデルを design に整理する`
- `stale active の整合回復ルールを design に整理する`
- `docs / notes / instruction の operations 周辺未反映差分を一覧化する`
- `docs 番号衝突と旧 docs 群の整理方針をメモ化する`
- `Phase 1 各 plan と operations 接続案を並べる`

## 再評価結果（2026-04-12）

### active へ繰り上げ済み

- `review system と operations rolling の接続ルールを design 観点で確認する`
- `Phase 0 完了条件に対する未充足項目を洗い出す`

理由

- D5 / D6 の誤混入 task を削除したため、
  next の最上位から Phase 0 直結 task を active へ補充した

### 現在の上位候補

- `docs / notes / instruction の operations 周辺未反映差分を一覧化する`
- `latest handover 起点の次作業選定と active_operations 先頭の解釈ルールを整理する`

理由

- docs 反映候補整理と report 返却準備が終わったため、
  次は未反映差分と再開解釈の明文化価値が高い

### 後段でよい候補

- `daily review の出力から content 抽出と operations rolling の接続ルールを design 観点で整理する`
- `stale active の整合回復ルールを design に整理する`
- `ADAM で試す 05_decisions の最小運用モデルを design に整理する`
- `scoring knowledge の蓄積方針を dev_memo か design に整理する`
- `docs 番号衝突と旧 docs 群の整理方針をメモ化する`
- `Phase 1 各 plan と operations 接続案を並べる`

理由

- 現時点では execution governance の中核整備や Phase 0 の残差分確認より優先度が低い
- repo 全体整合や Phase 1 論点は後段でも構わない

## タスク

- task: docs / notes / instruction の operations 周辺未反映差分を一覧化する
  source_ref:
    - notes/08_analysis/2026-04-04_repo_readthrough_findings.md
    - notes/02_design/2026-04-02_docs_15_notes_system_update_draft.md
    - code/config/ai/adam_instruction.md
  why_now:
    - docs 反映前の差分把握は必要だが、まずは instruction / active 側の試験運用結果を見てから整理する方がよい
  notes:
    - active-first execution と conversation routing の反映漏れ観点を含める

- task: latest handover 起点の次作業選定と active_operations 先頭の解釈ルールを整理する
  source_ref:
    - notes/06_handover/2026-04-08_17-30-00_summary.md
    - notes/04_operations/active_operations.md
    - notes/02_design/2026-04-07_conversation_triggered_candidate_routing_and_rolling.md
    - code/config/ai/adam_instruction.md
    - notes/01_issues/idea_log.md
  why_now:
    - 再開時に handover と active のどちらをどう読むかが揺れると、active-first execution と次作業選定の整合が崩れるため、近い将来の設計整理候補として保持する必要がある
  notes:
    - handover の next action を active task の未完部分として読める条件を明確にする
    - 競合時に active / next / future のどこへ送るかの判断も含める

- task: daily review の出力から content 抽出と operations rolling の接続ルールを design 観点で整理する
  source_ref:
    - notes/07_reports/README.md
    - notes/07_reports/daily/2026-04-08.md
    - notes/09_content/README.md
    - notes/04_operations/active_operations.md
    - notes/02_design/2026-04-03_review_system_operating_spec.md
    - notes/01_issues/idea_log.md
  why_now:
    - 日報を書いた後に content 抽出と rolling をどう接続するかが会話依存だと、daily review の出力運用が安定しないため、近い将来の設計整理候補として保持する必要がある
  notes:
    - report 保存で終わらず、content 抽出条件と operations 更新の接続点を整理する
    - review と routing の責務分離を崩さない前提で扱う

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

- task: ADAM で試す 05_decisions の最小運用モデルを design に整理する
  source_ref:
    - notes/05_decisions/README.md
    - notes/01_issues/idea_log.md
    - notes/04_operations/active_operations.md
  why_now:
    - EVE 本実装前に decision の集約モデルを ADAM で試す方針が出たため、抽出元、集約先、最小 schema、相互参照の設計を先に整理する必要がある
  notes:
    - docs / issue / design / plan / operations / dev_memo を紐づけ元とする前提で整理する

- task: scoring knowledge の蓄積方針を dev_memo か design に整理する
  source_ref:
    - notes/02_design/2026-04-06_operations_rolling_generation_and_prioritization_spec.md
    - notes/00_inbox/dev_memo/2026-04-06_operations_rolling_gap_and_direction.md
    - notes/00_inbox/dev_memo/2026-04-06_manual_rolling_round1_notes.md
    - notes/04_operations/active_operations.md
  why_now:
    - 重要ではあるが、いまの task を Todoist で見える化する価値よりは後順位であり、まずは実用価値の高い投影プロトタイプを先に固める方がよい
  notes:
    - score は決定ではなく補助である前提を維持する
    - dev_memo に残す条件と design に昇格する条件を見極める

- task: docs 番号衝突と旧 docs 群の整理方針をメモ化する
  source_ref:
    - notes/08_analysis/2026-04-04_repo_readthrough_findings.md
    - notes/00_inbox/dev_memo/2026-04-04_repo_consistency_check_followup.md
  why_now:
    - repo 全体整合には必要だが、Phase 0 の execution governance 試験よりは後順位
  notes:
    - docs 15 / 16 系の衝突整理を含む

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
