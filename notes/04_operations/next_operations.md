# next_operations

## 概要

active_operations に入らなかった上位候補を保持する。

`next_operations` は、
7日ローリングの `active_operations` に入らなかったが、
近い将来に進める前提の task を置くレイヤーとする。

---

## Phase 0 位置づけ

### Phase 0 直結 task

- `intake routing の第一バッチ候補を整理する`
- `intake routing の観測項目を analysis に落とす`

### 補助 task

- `ADAM 実運用 instruction へ完成条件ベース判断手順を反映確認する`
- `flow-control 新 handoff shape 統一の到達点を weekly report に返す要点を整理する`

## 再評価結果（2026-04-21 reroll）

### active へ繰り上げ済み / 実施済み task

- `flow-control 周辺の node --test 実行確認を行う`
- `issue routing の medium impact keep bias 補正案を design に整理する`
- `issue routing の判定順補正を最小差分で実装する`
- `issue routing 補正後の第一バッチ再観測を行う`
- `issue routing の第二バッチ候補を整理する`
- `future / archive を観測できる issue 候補を追加する`
- `第二バッチ issue を routing して route 結果を記録する`
- `operations candidate を rolling に接続して反映確認する`
- `keep / future / archive の運用妥当性を整理する`
- `flow-control 新 handoff shape 統一の到達点を report / handover へ返す条件を整理する`

理由

- issue routing は運用観測ラインを一巡できたため、次の Phase 0 本筋は intake routing に移るのが自然である
- ただし `node --test` は明日に回したため、intake routing 実行はその後段に置く
- intake routing は既存設計と code/test はあるが、完成条件と最小運用実験がまだ弱いため、まず入力候補と観測項目を固定する必要がある
- repo の instruction 更新は済んでいるが、ADAM 実運用 instruction 反映は別 task として扱う必要がある

## タスク

- task: ADAM 実運用 instruction へ完成条件ベース判断手順を反映確認する
  source_ref:
    - config/ai/adam_instruction.md
    - notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md
    - notes/04_operations/active_operations.md
  why_now:
    - repo 上の instruction 更新だけでは不十分であり、ADAM の実運用判断に completed condition ベース判断が継続して効くかを別 task として確認する必要がある
  notes:
    - repo 更新済みを理由に completed 扱いしない
    - 次タスク提案と reroll 判断で実際に使えているかを見る

- task: intake routing の第一バッチ候補を整理する
  source_ref:
    - notes/02_design/2026-04-21_intake_routing_minimum_operation_experiment.md
    - notes/02_design/intake_review_and_source_ref_spec.md
    - notes/02_design/2026-04-12_intake_and_issue_routing_minimum_roles.md
    - notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md
  why_now:
    - intake routing の完成条件を観測するには、issue / design / future の 3 分岐を見られる第一バッチ入力を先に決める必要がある
  notes:
    - 実 inbox 入力または inbox 相当の入力束から選ぶ
    - source_ref と inbox 後処理も見られる候補を優先する

- task: intake routing の観測項目を analysis に落とす
  source_ref:
    - notes/02_design/2026-04-21_intake_routing_minimum_operation_experiment.md
    - notes/02_design/intake_review_and_source_ref_spec.md
    - src/services/flow-control/intake-routing.js
    - src/services/flow-control/intake-routing.test.js
  why_now:
    - 実験入力だけでなく、route / source_ref / inbox 後処理 / role boundary のどこを確認するかを先に固定しておくと、issue routing と同じ粒度で完成判定しやすい
  notes:
    - issue / design / future の出方
    - source_ref の自然さ
    - inbox 後処理として archive / pending をどう扱うか

- task: flow-control 新 handoff shape 統一の到達点を weekly report に返す要点を整理する
  source_ref:
    - notes/08_analysis/2026-04-21_flow_control_handoff_shape_return_to_review_outputs.md
    - notes/08_analysis/2026-04-21_flow_control_new_handoff_shape_unification.md
  why_now:
    - report / handover の返し先整理は終わったため、必要なら週次 report に返す最小要点だけを残しておく価値がある
  notes:
    - handover ではなく weekly report 向けの要点だけを整理する

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
