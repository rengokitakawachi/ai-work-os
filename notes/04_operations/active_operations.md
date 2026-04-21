# active_operations

## Phase 0 位置づけ

### Phase 0 直結 task

- `flow-control 周辺の node --test 実行確認を行う`
- `issue routing の medium impact keep bias 補正案を design に整理する`
- `issue routing の判定順補正を最小差分で実装する`
- `issue routing 補正後の第一バッチ再観測を行う`

### 補助 task

- `issue routing の第二バッチ候補を整理する`
- `flow-control 新 handoff shape 統一の到達点を report / handover へ返す条件を整理する`

## Day0（04/21 火）

- task: flow-control 周辺の node --test 実行確認を行う
  source_ref:
    - notes/08_analysis/2026-04-21_flow_control_new_handoff_shape_unification.md
    - src/services/flow-control/issue-routing.test.js
    - src/services/flow-control/design-routing.test.js
    - src/services/flow-control/intake-routing.test.js
  rolling_day: Day0
  why_now:
    - routing / writing 分離と new handoff shape 統一後の最優先確認は、実ファイル環境での回帰確認である
    - 実行確認なしに次の gate 補正へ進むと、構造変更由来の不具合と判定ロジック補正を分離しにくい
  notes:
    - `node --test` の実行可否と失敗箇所を記録する
    - flow-control 周辺の新 shape 主経路が通るかを確認する

- task: issue routing の medium impact keep bias 補正案を design に整理する
  source_ref:
    - notes/08_analysis/2026-04-21_issue_routing_first_batch_observation.md
    - notes/02_design/2026-04-20_issue_routing_minimum_operation_experiment.md
    - src/services/flow-control/issue-routing.js
  rolling_day: Day0
  why_now:
    - 第一バッチ観測で medium impact issue が keep に寄りすぎることが確認できたため、次は補正方針を先に固定する必要がある
  notes:
    - impact gate と category 判定の順序を論点化する
    - architecture / operations issue が keep に吸われすぎない最小条件を整理する

## Day1（04/22 水）

- task: issue routing の判定順補正を最小差分で実装する
  source_ref:
    - notes/08_analysis/2026-04-21_issue_routing_first_batch_observation.md
    - src/services/flow-control/issue-routing.js
    - src/services/flow-control/issue-routing-actions.js
    - src/services/flow-control/issue-routing.test.js
  rolling_day: Day1
  why_now:
    - 補正方針を design に固定した後で、最小差分の code 補正へ進むのが安全である
  notes:
    - medium impact keep gate の強さを弱めるか、category 判定を先に見るかを反映する
    - action_plan / writer 境界は崩さない

- task: issue routing 補正後の第一バッチ再観測を行う
  source_ref:
    - notes/02_design/2026-04-20_issue_routing_minimum_operation_experiment.md
    - notes/08_analysis/2026-04-21_issue_routing_first_batch_observation.md
    - notes/01_issues/idea_log.md
    - src/services/flow-control/issue-routing.js
  rolling_day: Day1
  why_now:
    - 実装だけでは不十分であり、補正後に route 多様性と送付先遷移が改善したかを再観測する必要がある
  notes:
    - `20260418-022` と `20260419-023` を再入力する
    - keep / design / operations の変化と理由文の自然さを確認する

## Day2（04/23 木）

- なし

## Day3（04/24 金）

- なし

## Day4（04/25 土）

- なし

## Day5（04/26 日）

- なし

## Day6（04/27 月）

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
- 直近の daily review rolling では、issue routing の継続実装と後処理統合を優先候補として扱う
