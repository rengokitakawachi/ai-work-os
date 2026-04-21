# active_operations

## Phase 0 位置づけ

### Phase 0 直結 task

- `issue routing の第二バッチ候補を整理する`
- `future / archive を観測できる issue 候補を追加する`
- `第二バッチ issue を routing して route 結果を記録する`
- `operations candidate を rolling に接続して反映確認する`
- `keep / future / archive の運用妥当性を整理する`

### 補助 task

- `flow-control 周辺の node --test 実行確認を行う`
- `flow-control 新 handoff shape 統一の到達点を report / handover へ返す条件を整理する`
- `ADAM instruction へ完成条件ベース判断手順を反映する`

## Day0（04/21 火）

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
    - architecture / operations issue が keep に吸われすぎない最小条件を整理した
    - `notes/02_design/2026-04-21_issue_routing_medium_impact_keep_bias_adjustment.md` を作成した
  status: completed
  completed: true

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
    - medium impact keep gate の強さを弱めるか、category 判定を先に見るかを反映した
    - `rules.js` で architecture / operations 判定を keep gate より前に出した
    - `issue-routing.test.js` に medium impact route test を追加した
  status: completed
  completed: true

## Day2（04/23 木）

- task: issue routing 補正後の第一バッチ再観測を行う
  source_ref:
    - notes/02_design/2026-04-20_issue_routing_minimum_operation_experiment.md
    - notes/08_analysis/2026-04-21_issue_routing_first_batch_observation.md
    - notes/01_issues/idea_log.md
    - src/services/flow-control/issue-routing.js
  rolling_day: Day2
  why_now:
    - 実装だけでは不十分であり、補正後に route 多様性と送付先遷移が改善したかを再観測する必要がある
  notes:
    - `20260418-022` と `20260419-023` の route 変化を比較した
    - `notes/08_analysis/2026-04-21_issue_routing_first_batch_reobservation_after_gate_adjustment.md` を作成した
    - design / operations route の回復見込みを確認した
  status: completed
  completed: true

## Day3（04/24 金）

- task: issue routing の第二バッチ候補を整理する
  source_ref:
    - notes/08_analysis/2026-04-21_issue_routing_first_batch_reobservation_after_gate_adjustment.md
    - notes/01_issues/idea_log.md
    - notes/02_design/2026-04-20_issue_routing_minimum_operation_experiment.md
    - notes/08_analysis/2026-04-21_issue_routing_second_batch_candidate_set.md
    - notes/02_design/2026-04-21_issue_routing_second_batch_additional_issue_conditions.md
  rolling_day: Day3
  why_now:
    - issue routing の完成条件は複数件の実例で route 多様性を観測することなので、第一バッチだけで止めずに次の入力候補を準備する必要がある
  notes:
    - design / operations / future / archive の未出 route を補える issue を優先する
    - 第二バッチは観測不足の送付先を埋める観点で選ぶ
    - `notes/08_analysis/2026-04-21_issue_routing_second_batch_candidate_set.md` を作成した
    - keep / future / archive 用の追加条件を `notes/02_design/2026-04-21_issue_routing_second_batch_additional_issue_conditions.md` に固定した
    - `20260421-025` `20260421-026` `20260421-027` を第二バッチ候補として issue log に追加した
  status: completed
  completed: true

- task: future / archive を観測できる issue 候補を追加する
  source_ref:
    - notes/01_issues/idea_log.md
    - notes/08_analysis/2026-04-21_issue_routing_first_batch_reobservation_after_gate_adjustment.md
    - notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md
    - notes/02_design/2026-04-21_issue_routing_second_batch_additional_issue_conditions.md
  rolling_day: Day3
  why_now:
    - issue routing の完成条件には future / archive 送付の実運用確認が含まれているため、第二バッチ入力の時点で未出 route を補う必要がある
  notes:
    - closed issue または open 以外 status の issue 候補を用意する
    - keep に偏らない route 観測を優先する
    - `20260421-026` を future 観測用、`20260421-027` を archive 観測用、`20260421-025` を keep 観測用として追加した
  status: completed
  completed: true

## Day4（04/25 土）

- task: 第二バッチ issue を routing して route 結果を記録する
  source_ref:
    - notes/01_issues/idea_log.md
    - notes/02_design/2026-04-20_issue_routing_minimum_operation_experiment.md
    - src/services/flow-control/issue-routing.js
    - src/services/flow-control/issue-routing-actions.js
  rolling_day: Day4
  why_now:
    - 第二バッチ候補を集めるだけでは完成条件に届かず、実際の route 結果と action_plan を観測する必要がある
  notes:
    - design / operations / future / archive / issue の出方を記録する
    - action_plan の route 多様性を確認する

- task: 第二バッチ観測結果を analysis に返す
  source_ref:
    - notes/01_issues/idea_log.md
    - src/services/flow-control/issue-routing.js
    - notes/08_analysis/2026-04-21_issue_routing_first_batch_reobservation_after_gate_adjustment.md
  rolling_day: Day4
  why_now:
    - 実行だけでは不十分であり、第二バッチの観測結果を次の補正判断へ返す記録が必要である
  notes:
    - 未出 route が残るか
    - 理由文と next_action が自然か
    - keep と送付先のバランスが改善したか

## Day5（04/26 日）

- task: operations candidate を rolling に接続して反映確認する
  source_ref:
    - notes/08_analysis/2026-04-21_issue_routing_first_batch_reobservation_after_gate_adjustment.md
    - notes/04_operations/active_operations.md
    - notes/04_operations/next_operations.md
    - src/services/flow-control/issue-routing-actions.js
  rolling_day: Day5
  why_now:
    - issue routing の完成条件には operations へ送った候補が rolling に接続されることが含まれているため、operations candidate の反映先まで観測する必要がある
  notes:
    - operations candidate が active / next / future のどこへ入るかを確認する
    - queue payload だけで終わらず placement まで見る

- task: keep / future / archive の運用妥当性を整理する
  source_ref:
    - notes/08_analysis/2026-04-21_issue_routing_first_batch_observation.md
    - notes/08_analysis/2026-04-21_issue_routing_first_batch_reobservation_after_gate_adjustment.md
    - notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md
  rolling_day: Day5
  why_now:
    - issue routing の完成条件には keep / archive / defer の判断が運用上破綻しないことが含まれるため、送付先ごとの妥当性をまとめて確認する必要がある
  notes:
    - keep / future / archive の再評価地点が自然か確認する
    - 観測結果を次の routing 補正要否へ返す

## Day6（04/27 月）

- task: flow-control 周辺の node --test 実行確認を行う
  source_ref:
    - notes/08_analysis/2026-04-21_flow_control_new_handoff_shape_unification.md
    - src/services/flow-control/issue-routing.test.js
    - src/services/flow-control/design-routing.test.js
    - src/services/flow-control/intake-routing.test.js
  rolling_day: Day6
  why_now:
    - issue routing と flow-control の運用観測を一巡した後で、構造変更由来の回帰有無を補助確認する価値がある
  notes:
    - `node --test` の実行可否と失敗箇所を記録する
    - flow-control 周辺の新 shape 主経路が通るかを確認する

- task: flow-control 新 handoff shape 統一の到達点を report / handover へ返す条件を整理する
  source_ref:
    - notes/08_analysis/2026-04-21_flow_control_new_handoff_shape_unification.md
    - notes/08_analysis/2026-04-21_routing_return_compatibility_inventory.md
  rolling_day: Day6
  why_now:
    - flow-control 側の到達点を review 出力でどう回収するか整理しておくと、Phase 0 完了判定を安定させやすい
  notes:
    - 同一スレッド運用中は handover を作らない前提を維持する
    - report / daily review / weekly review のどこで回収するかを整理する

- task: ADAM instruction へ完成条件ベース判断手順を反映する
  source_ref:
    - config/ai/adam_instruction.md
    - notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md
  rolling_day: Day6
  why_now:
    - 完成条件を主語に task を組む判断を再現可能にするには、instruction へ明示的に反映して運用ルール化する必要がある
  notes:
    - config/ai/adam_instruction.md への repo 反映は実施済み
    - 実運用で継続して使える判断手順として保持する
  status: completed
  completed: true

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
