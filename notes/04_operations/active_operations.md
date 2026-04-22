# active_operations

## Phase 0 位置づけ

### Phase 0 直結 task

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
    - notes/08_analysis/2026-04-22_flow_control_node_test_result.md
    - notes/08_analysis/2026-04-22_flow_control_node_test_result_head_aligned.md
  rolling_day: Day0
  due_date: 2026-04-22
  why_now:
    - issue routing と flow-control の運用観測を一巡した後で、構造変更由来の回帰有無を補助確認する価値がある
    - ただし実行担当は Claude とし、ADAM は結果受領後の記録と整合確認を行う
  notes:
    - 最終正式結果は HEAD 一致後の再実行を採用する
    - 最新 HEAD `438658e` に対して 36件中 36 pass / 0 fail を確認した
    - `notes/08_analysis/2026-04-22_flow_control_node_test_result_head_aligned.md` に正式結果を保存した
  status: completed
  completed: true
  external:
    todoist_task_id: 6gQwqHgFfQPgPQXH

- task: ADAM 実運用 instruction へ新スレッド再開識別子ルールを反映確認する
  source_ref:
    - config/ai/adam_instruction.md
    - notes/07_reports/daily/2026-04-21.md
    - notes/04_operations/active_operations.md
  rolling_day: Day0
  due_date: 2026-04-22
  why_now:
    - `ADAM_MMDD` 再開識別子ルールは repo の instruction に追加済みだが、ADAM の実運用判断への反映はまだ未確認である
    - 明日やるなら intake routing より前で、node --test と同じ Day0 に置くのが自然である
  notes:
    - repo 反映済みを理由に completed 扱いしない
    - 次の新スレッド再開時に `ADAM_MMDD` を再開識別子として読めることを確認対象にする
  status: completed
  completed: true
  external:
    todoist_task_id: 6gR4rGXfHgh563Rq

- task: design retain fallback の no_op 欠落が仕様変更か不整合かを整理する
  source_ref:
    - notes/08_analysis/2026-04-22_flow_control_node_test_result.md
    - src/services/flow-control/design-routing.test.js
    - src/services/flow-control/design-routing.js
    - src/services/flow-control/design-routing-notes-write.js
    - notes/08_analysis/2026-04-22_design_retain_no_op_layer_mismatch.md
  rolling_day: Day0
  due_date: 2026-04-22
  why_now:
    - `design-routing.test.js` で fallback retain path の `no_op` が `undefined` になっており、仕様変更なのか実装不整合なのかを先に切り分ける必要がある
    - intake 本筋の前に、design routing 側の fallback 意味づけを整理しておくと後段判断が安定する
  notes:
    - routing 層では `write_status` を持たず、apply 結果層で `no_op` が付くと整理した
    - `notes/08_analysis/2026-04-22_design_retain_no_op_layer_mismatch.md` に記録した
  status: completed
  completed: true

- task: intake routing の design / issue 期待値ズレが test 側か実装側かを切り分ける
  source_ref:
    - notes/08_analysis/2026-04-22_flow_control_node_test_result.md
    - src/services/flow-control/intake-routing.test.js
    - src/services/flow-control/intake-routing.js
    - src/services/flow-control/rules.js
    - notes/02_design/2026-04-21_intake_routing_minimum_operation_experiment.md
    - notes/02_design/intake_review_and_source_ref_spec.md
    - notes/02_design/2026-04-12_intake_and_issue_routing_minimum_roles.md
    - notes/08_analysis/2026-04-22_intake_design_issue_route_gap.md
  rolling_day: Day0
  due_date: 2026-04-22
  why_now:
    - `intake-routing.test.js` が `design` 期待に対して実装は `issue` を返しており、次の intake routing 本筋へ入る前にズレの性質を把握する必要がある
    - intake routing 候補整理を進めるにしても、route 境界の前提がずれていると観測設計に影響する
  notes:
    - spec では intake の最小分岐に `issue / design / future` が含まれる
    - current implementation は通常 intake をほぼ `issue` に落としており、spec 未達の可能性が高い
    - `notes/08_analysis/2026-04-22_intake_design_issue_route_gap.md` に記録した
  status: completed
  completed: true

- task: design retain fallback の no_op 期待を test 層に合わせて補正する
  source_ref:
    - notes/08_analysis/2026-04-22_design_retain_no_op_layer_mismatch.md
    - notes/08_analysis/2026-04-22_flow_control_node_test_result_head_aligned.md
    - src/services/flow-control/design-routing.test.js
    - src/services/flow-control/design-routing-notes-write.js
  rolling_day: Day0
  due_date: 2026-04-22
  why_now:
    - GitHub main の正式 test でも design retain fail は継続しており、routing 層と apply 層の参照ずれを test で補正するのが第一候補である
    - code 修正ではなく test 期待の位置補正で閉じられる可能性が高い
  notes:
    - `write_status: no_op` は apply result 層で確認するよう test を補正した
    - 最新 HEAD `438658e` の正式再実行で flow-control 周辺 test green を確認した
  status: completed
  completed: true

- task: non-high-impact open issue が design に吸われる判定順を修正する
  source_ref:
    - notes/08_analysis/2026-04-22_flow_control_node_test_result_head_aligned.md
    - src/services/flow-control/rules.js
    - src/services/flow-control/rules.test.js
    - src/services/flow-control/issue-routing.test.js
    - notes/08_analysis/2026-04-22_issue_routing_medium_impact_expectation_conflict.md
  rolling_day: Day0
  due_date: 2026-04-22
  why_now:
    - GitHub main の正式 test で `evaluateCandidate keeps non-high-impact open issue in issue` が fail しており、architecture 判定が impact keep より先に効いている副作用を直す必要がある
    - intake 側の最小分岐追加で issue routing 側を壊していないかを先に閉じるのが安全である
  notes:
    - `source_type === issue` の keep bias を回復する判定順補正を入れた
    - medium-impact issue の期待不一致は issue-routing.test 側を keep bias 方針へ揃えて解消した
    - 最新 HEAD `438658e` の正式再実行で flow-control 周辺 test green を確認した
  status: completed
  completed: true

- task: intake routing の issue / design / future 最小分岐を spec に沿って実装する
  source_ref:
    - notes/08_analysis/2026-04-22_intake_design_issue_route_gap.md
    - notes/02_design/2026-04-21_intake_routing_minimum_operation_experiment.md
    - notes/02_design/intake_review_and_source_ref_spec.md
    - notes/02_design/2026-04-12_intake_and_issue_routing_minimum_roles.md
    - src/services/flow-control/intake-routing.js
    - src/services/flow-control/rules.js
    - src/services/flow-control/intake-routing.test.js
    - notes/08_analysis/2026-04-22_flow_control_node_test_result_head_aligned.md
  rolling_day: Day0
  due_date: 2026-04-22
  why_now:
    - intake routing の最小完成条件は `issue / design / future` の 3 分岐観測であり、intake-routing 側の正式 fail 自体は解消した
    - ただし正式結果では `rules.test.js` に副作用が出ており、issue routing 側を壊さずに最小分岐を成立させる補正がまだ必要である
  notes:
    - intake routing の最小3分岐を実装し、周辺 test と整合する形まで補正した
    - 最新 HEAD `438658e` の正式再実行で flow-control 周辺 test green を確認した
  status: completed
  completed: true

## Day1（04/23 木）

- task: intake routing の第一バッチ候補を整理する
  source_ref:
    - notes/02_design/2026-04-21_intake_routing_minimum_operation_experiment.md
    - notes/02_design/intake_review_and_source_ref_spec.md
    - notes/02_design/2026-04-12_intake_and_issue_routing_minimum_roles.md
    - notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md
  rolling_day: Day1
  due_date: 2026-04-23
  why_now:
    - issue routing の運用観測ラインは一巡し、flow-control 周辺 test も green になったため、次の Phase 0 本筋は intake routing の第一バッチ観測へ移るのが自然である
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
  due_date: 2026-04-23
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
  due_date: 2026-04-24
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
