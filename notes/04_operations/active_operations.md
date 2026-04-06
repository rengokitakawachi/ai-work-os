# active_operations

## Day0（04/06 月）

- task: active_operations を schema 準拠で再構築する
  source_ref:
    - notes/02_design/2026-04-06_operations_task_schema.md
    - notes/02_design/2026-04-06_operations_rolling_generation_and_prioritization_spec.md
    - notes/04_operations/active_operations.md
  rolling_day: Day0
  why_now:
    - operations の実体を現行 schema / rolling モデルへ合わせる必要がある
  notes:
    - task / source_ref / rolling_day / why_now を最低限揃える

- task: next_operations を schema 準拠で再構成する
  source_ref:
    - notes/02_design/2026-04-06_operations_task_schema.md
    - notes/04_operations/next_operations.md
    - notes/04_operations/active_operations.md
  rolling_day: Day0
  why_now:
    - active に入らなかった上位候補を next に正しく保持する必要がある
  notes:
    - next の位置づけを backlog ではなく近未来候補に揃える

- task: Flow Control / routing / operations の整合を確認する
  source_ref:
    - notes/02_design/2026-04-06_flow_control_and_usecase_architecture.md
    - notes/02_design/standard_development_flow_v2.md
    - code/config/ai/adam_instruction.md
  rolling_day: Day0
  why_now:
    - 主要 design と instruction の間にズレが残ると後続修正基準がぶれる
  notes:
    - intake routing / issue routing / operations rolling の接続を確認する

## Day1（04/07 火）

- task: future_layer_operating_spec に残る旧用語と旧フローを現行モデルへ修正する
  source_ref:
    - notes/02_design/2026-04-03_future_layer_operating_spec.md
    - notes/02_design/2026-04-06_flow_control_and_usecase_architecture.md
    - notes/02_design/standard_development_flow_v2.md
  rolling_day: Day1
  why_now:
    - future の定義が他の設計の基準になるため、早めに揃える必要がある
  notes:
    - intake review 系の旧表現を routing / review 分離へ揃える

- task: standard_development_flow_v2 を現行 routing / rolling モデルへ更新する
  source_ref:
    - notes/02_design/standard_development_flow_v2.md
    - notes/02_design/2026-04-06_flow_control_and_usecase_architecture.md
    - notes/02_design/2026-04-06_operations_rolling_generation_and_prioritization_spec.md
  rolling_day: Day1
  why_now:
    - 全体フローの骨格文書を現行構造へ揃える必要がある
  notes:
    - future 定義、operations 候補生成、review 分離を反映する

## Day2（04/08 水）

- task: operations_generation_rules を Flow Control と ranking model に合わせて更新する
  source_ref:
    - notes/02_design/operations_generation_rules.md
    - notes/02_design/2026-04-06_operations_rolling_generation_and_prioritization_spec.md
    - notes/02_design/2026-04-06_flow_control_and_usecase_architecture.md
  rolling_day: Day2
  why_now:
    - operations 候補生成の旧モデルが残っており、現行設計と不整合
  due_date: 2026-04-08
  due_type: soft
  notes:
    - issue / design 起点だけでなく複数流入元モデルへ揃える

- task: classification_and_routing_spec の扱いを決める
  source_ref:
    - notes/02_design/classification_and_routing_spec.md
    - notes/02_design/2026-04-06_flow_control_and_usecase_architecture.md
    - notes/01_issues/idea_log.md
  rolling_day: Day2
  why_now:
    - 旧 routing 観点の設計を現行モデルへ残すか退避するか判断が必要
  notes:
    - 更新・future・archive のどれに送るか決める

## Day3（04/09 木）

- task: scoring knowledge の蓄積方針を dev_memo か design に整理する
  source_ref:
    - notes/02_design/2026-04-06_operations_rolling_generation_and_prioritization_spec.md
    - notes/00_inbox/dev_memo/2026-04-06_operations_rolling_gap_and_direction.md
    - notes/00_inbox/dev_memo/2026-04-06_manual_rolling_round1_notes.md
  rolling_day: Day3
  why_now:
    - 手動 rolling で得た迷いを知見化しないと後で失われる
  notes:
    - scoring は補助であり、知見蓄積の対象として扱う

## Day4（04/10 金）

- task: 手動 rolling 1周目で迷った点を抽出し、program に寄せる責務候補を整理する
  source_ref:
    - notes/00_inbox/dev_memo/2026-04-06_manual_rolling_round1_notes.md
    - notes/02_design/2026-04-06_flow_control_and_usecase_architecture.md
    - code/config/ai/adam_instruction.md
  rolling_day: Day4
  why_now:
    - hybrid 実装前に、何を program 化すべきかを運用結果から切り出す必要がある
  notes:
    - 迷いの多い判断点を責務分離の候補にする

## Day5（04/11 土）

- task: Phase 0 plan に対する現行 operations の接続を見直す
  source_ref:
    - notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md
    - notes/04_operations/active_operations.md
    - notes/01_issues/idea_log.md
  rolling_day: Day5
  why_now:
    - 直近作業が Phase 0 をどう前進させているかを確認する必要がある
  notes:
    - review 項目になる前に、operations 側の接続を見直す

## Day6（04/12 日）

- task: weekly review 前提で active / next / archive の更新準備をする
  source_ref:
    - notes/04_operations/active_operations.md
    - notes/04_operations/next_operations.md
    - notes/04_operations/archive_operations.md
  rolling_day: Day6
  why_now:
    - 1回目の手動 rolling 結果を weekly review へ返す準備が必要
  notes:
    - snapshot 保存と次週繰越の材料を揃える

---

## ルール

- 上から順に実行優先度とする
- Day は仮配置であり固定日付ではない
- 日付と曜日は人間可読性のために付与する
- 日付表示は daily review 時に更新する
- active_operations の各 task は task / source_ref / rolling_day を必須で持つ
- why_now / notes / due_date / due_type は必要に応じて持つ
- operations は候補を優先順位で並べ、7日枠に入るものを active_operations とする
- active に入らなかった上位候補を next_operations に置く
- スコアは補助であり、決定ではない
- 未完了タスクは翌日以降へ移動する
- 完了タスクは必要に応じて archive_operations に移す
- Phase 0 中は Flow Control / routing / operations の実運用整合を優先する
