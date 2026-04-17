# active_operations

## Phase 0 位置づけ

### Phase 0 直結 task

- `reroll の最小 dry_run 入出力を確認する`
- `design routing test の shape / import 崩れを静的に洗う`
- `applyDesignRoutingActionPlan の skeleton を切る`

### 補助 task

- `operations task の粒度ルールと day 容量モデルを整理する`
- `daily review の出力から content 抽出と operations rolling の接続ルールを design 観点で整理する`
- `stale active の整合回復ルールを design に整理する`
- `ADAM で試す 05_decisions の最小運用モデルを design に整理する`
- `scoring knowledge の蓄積方針を dev_memo か design に整理する`

## Day0（04/18 土）

- task: reroll の最小 dry_run 入出力を確認する
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
    - src/services/flow-control/orchestrate.js
    - src/services/flow-control/ranking.js
    - src/services/flow-control/adapters.js
    - notes/04_operations/active_operations.md
  rolling_day: Day0
  why_now:
    - queue と active を含む reroll の実挙動確認が Day0 本丸の未完了残件として残っている
    - 最小 end-to-end dry_run を先に閉じないと、後処理統合 task の完了条件が曖昧なままになる
  notes:
    - plan / active / queue を同じ土俵に乗せた最小 dry_run の期待挙動を確認する
    - apply や実 write には広げず、まず reroll の decision 層を閉じる
  due_date: 2026-04-18
  due_type: date
  external:
    todoist_task_id: 6gPW3hq4Fh788Fm2

- task: operations task の粒度ルールと day 容量モデルを整理する
  source_ref:
    - notes/01_issues/idea_log.md
    - notes/02_design/2026-04-06_operations_rolling_generation_and_prioritization_spec.md
    - docs/17_operations_system.md
    - docs/15_notes_system.md
    - notes/04_operations/active_operations.md
  rolling_day: Day0
  why_now:
    - task 粒度が曖昧だと完了条件がぼやけ、daily review と reroll の両方が不安定になる
    - Day は複数 task を置ける箱であり、1日実行枠の見方も合わせて整理する必要がある
  notes:
    - task は 0.5〜1.5時間程度を目安にする
    - Day は 1 task 固定ではなく複数 task を置いてよい
    - 1日2時間前後は固定仕様ではなく将来の知見蓄積対象として扱う
  due_date: 2026-04-18
  due_type: date

## Day1（04/19 日）

- task: design routing test の shape / import 崩れを静的に洗う
  source_ref:
    - src/services/flow-control/design-routing.js
    - src/services/flow-control/design-routing-rules.js
    - src/services/flow-control/design-routing-actions.js
    - src/services/flow-control/design-routing.test.js
    - src/services/flow-control/index.js
    - src/services/flow-control/normalize.js
  rolling_day: Day1
  why_now:
    - design routing の最小 dry_run は code へ入ったが、テスト実行前に shape と import の崩れを先に潰す価値が高い
  notes:
    - candidate_id / design_id / action_plan key の不整合を優先確認する
    - node 実行可否確認前に静的に見える崩れを潰す
  due_date: 2026-04-19
  due_type: date

## Day2（04/20 月）

- task: applyDesignRoutingActionPlan の skeleton を切る
  source_ref:
    - notes/02_design/2026-04-17_apply_design_routing_action_plan_minimum_usecase.md
    - notes/02_design/2026-04-17_design_routing_actions_js_minimum_skeleton.md
    - src/services/flow-control/design-routing-actions.js
    - src/services/flow-control/design-routing.js
  rolling_day: Day2
  why_now:
    - design routing の decision 層は通ったため、次に後段 payload usecase の最小骨格を切ると構造が閉じやすい
  notes:
    - docs 直接 apply はしない
    - future / archive / docs candidate / operations queue の最小 payload 生成責務だけを切る
  due_date: 2026-04-20
  due_type: date

## Day3（04/21 火）

- task: daily review の出力から content 抽出と operations rolling の接続ルールを design 観点で整理する
  source_ref:
    - notes/07_reports/README.md
    - notes/07_reports/daily/2026-04-08.md
    - notes/09_content/README.md
    - notes/04_operations/active_operations.md
    - notes/02_design/2026-04-03_review_system_operating_spec.md
    - notes/01_issues/idea_log.md
  rolling_day: Day3
  why_now:
    - 日報を書いた後に content 抽出と rolling をどう接続するかが会話依存だと、daily review の出力運用が安定しないため、近い将来の設計整理候補として保持する必要がある
  notes:
    - report 保存で終わらず、content 抽出条件と operations 更新の接続点を整理する
    - review と routing の責務分離を崩さない前提で扱う
  quick_win: medium
  due_date: 2026-04-21
  due_type: date
  external:
    todoist_task_id: 6gMr5Mj7cJvC5VH2

## Day4（04/22 水）

- task: stale active の整合回復ルールを design に整理する
  source_ref:
    - notes/00_inbox/dev_memo/2026-04-08_active_first_execution_trial.md
    - notes/04_operations/active_operations.md
    - code/config/ai/adam_instruction.md
    - notes/02_design/2026-04-07_conversation_triggered_candidate_routing_and_rolling.md
  rolling_day: Day4
  why_now:
    - active-first execution の試験運用で stale active の補足ルールが必要と分かったが、現行 active の上位 task よりは後順位で整理する方がよい
  notes:
    - reroll before execution とは別の前処理ルールとして切り分ける
  due_date: 2026-04-22
  due_type: date
  external:
    todoist_task_id: 6gMr5PFQM8fC3XrR

## Day5（04/23 木）

- task: ADAM で試す 05_decisions の最小運用モデルを design に整理する
  source_ref:
    - notes/05_decisions/README.md
    - notes/01_issues/idea_log.md
    - notes/04_operations/active_operations.md
  rolling_day: Day5
  why_now:
    - EVE 本実装前に decision の集約モデルを ADAM で試す方針が出たため、抽出元、集約先、最小 schema、相互参照の設計を先に整理する必要がある
  notes:
    - docs / issue / design / plan / operations / dev_memo を紐づけ元とする前提で整理する
  due_date: 2026-04-23
  due_type: date
  external:
    todoist_task_id: 6gMr5Pc8j95X8GfR

## Day6（04/24 金）

- task: scoring knowledge の蓄積方針を dev_memo か design に整理する
  source_ref:
    - notes/02_design/2026-04-06_operations_rolling_generation_and_prioritization_spec.md
    - notes/00_inbox/dev_memo/2026-04-06_operations_rolling_gap_and_direction.md
    - notes/00_inbox/dev_memo/2026-04-06_manual_rolling_round1_notes.md
    - notes/04_operations/active_operations.md
  rolling_day: Day6
  why_now:
    - 重要ではあるが、いまの task を Todoist で見える化する価値よりは後順位であり、まずは実用価値の高い投影プロトタイプを先に固める方がよい
  notes:
    - score は決定ではなく補助である前提を維持する
    - dev_memo に残す条件と design に昇格する条件を見極める
  due_date: 2026-04-24
  due_type: date
  external:
    todoist_task_id: 6gMr5QWWx4JW5vQR

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
