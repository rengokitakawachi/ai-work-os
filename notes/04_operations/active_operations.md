# active_operations

## Phase 0 位置づけ

### Phase 0 直結 task

- `issue routing の後処理統合と可変評価 schema の整理を進める`

### 補助 task

- `daily review の出力から content 抽出と operations rolling の接続ルールを design 観点で整理する`
- `stale active の整合回復ルールを design に整理する`
- `ADAM で試す 05_decisions の最小運用モデルを design に整理する`
- `scoring knowledge の蓄積方針を dev_memo か design に整理する`
- `docs 番号衝突と旧 docs 群の整理方針をメモ化する`

## Day0（04/18 土）

- task: issue routing の後処理統合と可変評価 schema の整理を進める
  source_ref:
    - notes/01_issues/idea_log.md
    - notes/02_design/2026-04-14_issue_routing_end_state_first_and_incremental_implementation.md
    - notes/02_design/2026-04-15_issue_routing_variable_assessment_schema.md
    - notes/02_design/2026-04-16_issue_routing_notes_write_minimum_usecase.md
    - notes/02_design/2026-04-16_issue_routing_operations_candidate_queue.md
    - notes/02_design/2026-04-16_operations_candidate_queue_to_rolling_io.md
    - notes/02_design/2026-04-16_operations_ranking_priority_axes.md
    - notes/02_design/2026-04-16_active_operations_as_reroll_candidate_source.md
    - notes/08_analysis/2026-04-16_issue_routing_postprocess_current_state.md
    - src/services/flow-control/issue-routing.js
    - src/services/flow-control/issue-routing-actions.js
    - src/services/flow-control/issue-routing-notes-write.js
    - src/services/flow-control/adapters.js
    - src/services/flow-control/orchestrate.js
    - src/services/flow-control/ranking.js
    - src/services/flow-control/rules.js
    - src/services/flow-control/placement.js
    - src/services/flow-control/normalize.js
    - notes/04_operations/active_operations.md
  rolling_day: Day0
  why_now:
    - 4/16 で issue routing 後処理統合は design / operations queue / active reroll source まで接続できたが、queue と active を含む reroll の実挙動確認がまだ残っている
    - issue routing は Phase 0 直結論点であり、引き続き先頭維持で詰める価値が高い
  notes:
    - 保存 / routing / 反映 / 再評価の責務分離を崩さない
    - 4/17 は active / next / plan / queue を同じ土俵に乗せた reroll の dry run 実確認を先に行う
    - future / archive apply は後段の薄い接続として残し、まず reroll 実挙動を閉じる
  due_date: 2026-04-18
  due_type: date
  external:
    todoist_task_id: 6gPW3hq4Fh788Fm2

## Day1（04/19 日）

- task: daily review の出力から content 抽出と operations rolling の接続ルールを design 観点で整理する
  source_ref:
    - notes/07_reports/README.md
    - notes/07_reports/daily/2026-04-08.md
    - notes/09_content/README.md
    - notes/04_operations/active_operations.md
    - notes/02_design/2026-04-03_review_system_operating_spec.md
    - notes/01_issues/idea_log.md
  rolling_day: Day1
  why_now:
    - 日報を書いた後に content 抽出と rolling をどう接続するかが会話依存だと、daily review の出力運用が安定しないため、近い将来の設計整理候補として保持する必要がある
  notes:
    - report 保存で終わらず、content 抽出条件と operations 更新の接続点を整理する
    - review と routing の責務分離を崩さない前提で扱う
  quick_win: medium
  due_date: 2026-04-19
  due_type: date
  external:
    todoist_task_id: 6gMr5Mj7cJvC5VH2

## Day2（04/20 月）

- task: stale active の整合回復ルールを design に整理する
  source_ref:
    - notes/00_inbox/dev_memo/2026-04-08_active_first_execution_trial.md
    - notes/04_operations/active_operations.md
    - code/config/ai/adam_instruction.md
    - notes/02_design/2026-04-07_conversation_triggered_candidate_routing_and_rolling.md
  rolling_day: Day2
  why_now:
    - active-first execution の試験運用で stale active の補足ルールが必要と分かったが、現行 active の上位 task よりは後順位で整理する方がよい
  notes:
    - reroll before execution とは別の前処理ルールとして切り分ける
  due_date: 2026-04-20
  due_type: date
  external:
    todoist_task_id: 6gMr5PFQM8fC3XrR

## Day3（04/21 火）

- task: ADAM で試す 05_decisions の最小運用モデルを design に整理する
  source_ref:
    - notes/05_decisions/README.md
    - notes/01_issues/idea_log.md
    - notes/04_operations/active_operations.md
  rolling_day: Day3
  why_now:
    - EVE 本実装前に decision の集約モデルを ADAM で試す方針が出たため、抽出元、集約先、最小 schema、相互参照の設計を先に整理する必要がある
  notes:
    - docs / issue / design / plan / operations / dev_memo を紐づけ元とする前提で整理する
  due_date: 2026-04-21
  due_type: date
  external:
    todoist_task_id: 6gMr5Pc8j95X8GfR

## Day4（04/22 水）

- task: scoring knowledge の蓄積方針を dev_memo か design に整理する
  source_ref:
    - notes/02_design/2026-04-06_operations_rolling_generation_and_prioritization_spec.md
    - notes/00_inbox/dev_memo/2026-04-06_operations_rolling_gap_and_direction.md
    - notes/00_inbox/dev_memo/2026-04-06_manual_rolling_round1_notes.md
    - notes/04_operations/active_operations.md
  rolling_day: Day4
  why_now:
    - 重要ではあるが、いまの task を Todoist で見える化する価値よりは後順位であり、まずは実用価値の高い投影プロトタイプを先に固める方がよい
  notes:
    - score は決定ではなく補助である前提を維持する
    - dev_memo に残す条件と design に昇格する条件を見極める
  due_date: 2026-04-22
  due_type: date
  external:
    todoist_task_id: 6gMr5QWWx4JW5vQR

## Day5（04/23 木）

- task: docs 番号衝突と旧 docs 群の整理方針をメモ化する
  source_ref:
    - notes/08_analysis/2026-04-04_repo_readthrough_findings.md
    - notes/00_inbox/dev_memo/2026-04-04_repo_consistency_check_followup.md
    - notes/04_operations/next_operations.md
  rolling_day: Day5
  why_now:
    - repo 全体整合には必要だが、Phase 0 の接続弱化修正と暫定実装よりは後順位
    - active の 7日枠を維持する補充候補として妥当である
  notes:
    - docs 15 / 16 系の衝突整理を含む
  due_date: 2026-04-23
  due_type: date
  external:
    todoist_task_id: 6gMr5QwRGxpmCRF2

## Day6（04/24 金）

- task: Phase 1 各 plan と operations 接続案を並べる
  source_ref:
    - notes/03_plan/2026-04_phase1_todoist_outlook_foundation.md
    - notes/03_plan/2026-04_phase1_schedule_proposal_and_outlook_write.md
    - notes/03_plan/2026-04_phase1_teams_and_obsidian_light_use.md
    - notes/04_operations/next_operations.md
  rolling_day: Day6
  why_now:
    - active の 7日枠を維持しつつも、まずは Phase 0 の issue routing 継続を優先したい
    - 次 phase への接続候補として next からの補充に妥当である
  notes:
    - Todoist / Outlook 接続の前段として保持する
  due_date: 2026-04-24
  due_type: date
  external:
    todoist_task_id: 6gMr5RGcRm22HHJ2

---

## ルール

- 実行対象は active_operations に入っている task のみとする
- 実行は上から順に行う
- Day は仮配置であり固定日付ではない
- 日付と曜日は人間可読性のために付与する
- 日付表示は daily review 時に更新する
- active_operations の各 task は task / source_ref / rolling_day を必須で持つ
- why_now / notes / due_date / due_type は必要に応じて持つ
- operations は候補を優先順位で並べ、7日枠に入るものを active_operations とする
- active に入らなかった上位候補を next_operations に置く
- スコアは補助であり、決定ではない
- 会話中に新規タスク候補が発生した場合は、先に operations rolling を行う
- 新規候補は active / next / future のどこに置くか決めてから扱う
- reroll 前に active 外タスクを実行しない
- 未完了タスクは翌日以降へ移動する
- 完了タスクは必要に応じて archive_operations に移す
- Phase 0 中は Flow Control / routing / operations の実運用整合を優先する
- 直近の daily review rolling では、issue routing の継続実装と後処理統合を優先候補として扱う
