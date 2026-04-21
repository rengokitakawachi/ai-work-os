# active_operations

## Phase 0 位置づけ

### Phase 0 直結 task

- `flow-control 周辺の node --test 実行確認を行う`
- `ADAM 実運用 instruction へ新スレッド再開識別子ルールを反映確認する`
- `intake routing の第一バッチ候補を整理する`
- `intake routing の観測項目を analysis に落とす`

### 補助 task

- `flow-control 新 handoff shape 統一の到達点を weekly report に返す要点を整理する`

## Day0（04/22 水）

- task: flow-control 周辺の node --test 実行確認を行う
  source_ref:
    - notes/08_analysis/2026-04-21_flow_control_new_handoff_shape_unification.md
    - src/services/flow-control/issue-routing.test.js
    - src/services/flow-control/design-routing.test.js
    - src/services/flow-control/intake-routing.test.js
  rolling_day: Day0
  why_now:
    - issue routing と flow-control の運用観測を一巡した後で、構造変更由来の回帰有無を補助確認する価値がある
    - 前日から明日へ繰り越した唯一の未完了 task であり、intake routing 本筋へ進む前に先に閉じるのが自然である
  notes:
    - `node --test` の実行可否と失敗箇所を記録する
    - flow-control 周辺の新 shape 主経路が通るかを確認する
  external:
    todoist_task_id: 6gQwqHgFfQPgPQXH

- task: ADAM 実運用 instruction へ新スレッド再開識別子ルールを反映確認する
  source_ref:
    - config/ai/adam_instruction.md
    - notes/07_reports/daily/2026-04-21.md
    - notes/04_operations/active_operations.md
  rolling_day: Day0
  why_now:
    - `ADAM_MMDD` 再開識別子ルールは repo の instruction に追加済みだが、ADAM の実運用判断への反映はまだ未確認である
    - 明日やるなら intake routing より前で、node --test と同じ Day0 に置くのが自然である
  notes:
    - repo 反映済みを理由に completed 扱いしない
    - 次の新スレッド再開時に `ADAM_MMDD` を再開識別子として読めることを確認対象にする

## Day1（04/23 木）

- task: intake routing の第一バッチ候補を整理する
  source_ref:
    - notes/02_design/2026-04-21_intake_routing_minimum_operation_experiment.md
    - notes/02_design/intake_review_and_source_ref_spec.md
    - notes/02_design/2026-04-12_intake_and_issue_routing_minimum_roles.md
    - notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md
  rolling_day: Day1
  why_now:
    - issue routing の運用観測ラインは一巡したため、次の Phase 0 本筋は intake routing へ移るのが自然である
    - intake routing の完成条件を観測するには、issue / design / future の 3 分岐を見られる第一バッチ入力を先に決める必要がある
  notes:
    - 実 inbox 入力または inbox 相当の入力束から選ぶ
    - source_ref と inbox 後処理も見られる候補を優先する
  external:
    todoist_task_id: 6gQwqHvVc2cj87vq

- task: intake routing の観測項目を analysis に落とす
  source_ref:
    - notes/02_design/2026-04-21_intake_routing_minimum_operation_experiment.md
    - notes/02_design/intake_review_and_source_ref_spec.md
    - src/services/flow-control/intake-routing.js
    - src/services/flow-control/intake-routing.test.js
  rolling_day: Day1
  why_now:
    - 実験入力だけでなく、route / source_ref / inbox 後処理 / role boundary のどこを確認するかを先に固定しておくと、issue routing と同じ粒度で完成判定しやすい
  notes:
    - issue / design / future の出方
    - source_ref の自然さ
    - inbox 後処理として archive / pending をどう扱うか
  external:
    todoist_task_id: 6gQwqJ2HGv8fwVvq

## Day2（04/24 金）

- task: flow-control 新 handoff shape 統一の到達点を weekly report に返す要点を整理する
  source_ref:
    - notes/08_analysis/2026-04-21_flow_control_handoff_shape_return_to_review_outputs.md
    - notes/08_analysis/2026-04-21_flow_control_new_handoff_shape_unification.md
  rolling_day: Day2
  why_now:
    - report / handover の返し先整理は終わったため、必要なら週次 report に返す最小要点だけを残しておく価値がある
  notes:
    - handover ではなく weekly report 向けの要点だけを整理する
  external:
    todoist_task_id: 6gQwqHx9RcJQJrRH

## Day3（04/25 土）

- なし

## Day4（04/26 日）

- なし

## Day5（04/27 月）

- なし

## Day6（04/28 火）

- なし

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
- 直近の daily review rolling では、intake routing の最小運用実験と flow-control 回帰確認を優先候補として扱う
