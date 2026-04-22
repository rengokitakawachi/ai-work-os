# active_operations

## Phase 0 位置づけ

### Phase 0 直結 task

- `pending_tasks 向けの inbox チャンク分解拡張要否を整理する`
- `pending_tasks 型複数論点入力の最小 split ルールを design に落とす`
- `flow-control 新 handoff shape 統一の到達点を weekly report に返す要点を整理する`
- `intake inbox adapter の複数 item 抽出最小拡張を設計する`

### 補助 task

- なし

## Day0（04/23 木）

- task: pending_tasks 向けの inbox チャンク分解拡張要否を整理する
  source_ref:
    - notes/08_analysis/2026-04-22_intake_routing_first_batch_mechanical_dry_run_observation.md
    - notes/08_analysis/2026-04-22_intake_inbox_markdown_adapter_minimum_requirements.md
    - notes/00_inbox/dev_memo/2026-03-22_09-40-00_pending_tasks.md
    - src/services/flow-control/adapters.js
    - notes/02_design/intake_review_and_source_ref_spec.md
  rolling_day: Day0
  due_date: 2026-04-23
  why_now:
    - 第一バッチの mechanical dry run で `pending_tasks` は route 自体は issue で妥当だったが、1ファイル1item では複数論点混在が残った
    - intake routing を入口処理として実運用に寄せるには、チャンク分解を入れるべきかを次に整理する必要がある
  notes:
    - `reflection_design` と `branch_strategy_future` は最小 adapter で十分観測できた
    - 拡張対象はまず `pending_tasks` に限定してよい
  external:
    todoist_task_id: 6gR8XV6Rp87J9G4H

- task: pending_tasks 型複数論点入力の最小 split ルールを design に落とす
  source_ref:
    - notes/08_analysis/2026-04-22_intake_routing_first_batch_mechanical_dry_run_observation.md
    - notes/00_inbox/dev_memo/2026-03-22_09-40-00_pending_tasks.md
    - notes/02_design/intake_review_and_source_ref_spec.md
    - src/services/flow-control/adapters.js
  rolling_day: Day0
  due_date: 2026-04-23
  why_now:
    - `pending_tasks` の複数論点混在を解消するには、実装前に最小 split ルールを固定するのが安全である
    - intake routing の役割を壊さず、1テーマ1メモへ近づける最小分解基準を先に整理したい
  notes:
    - `1見出し = 1item` で十分か
    - `まとめ` セクションを item 化しないか
    - source_ref の付け方を崩さない
  external:
    todoist_task_id: 6gR8XW2mQC5FX4hq

## Day1（04/24 金）

- task: flow-control 新 handoff shape 統一の到達点を weekly report に返す要点を整理する
  source_ref:
    - notes/08_analysis/2026-04-21_flow_control_handoff_shape_return_to_review_outputs.md
    - notes/08_analysis/2026-04-21_flow_control_new_handoff_shape_unification.md
  rolling_day: Day1
  due_date: 2026-04-24
  why_now:
    - report / handover の返し先整理は終わったため、必要なら週次 report に返す最小要点だけを残しておく価値がある
  notes:
    - handover ではなく weekly report 向けの要点だけを整理する
  external:
    todoist_task_id: 6gQwqHx9RcJQJrRH

- task: intake inbox adapter の複数 item 抽出最小拡張を設計する
  source_ref:
    - notes/08_analysis/2026-04-22_intake_routing_first_batch_mechanical_dry_run_observation.md
    - notes/08_analysis/2026-04-22_intake_inbox_markdown_adapter_minimum_requirements.md
    - notes/00_inbox/dev_memo/2026-03-22_09-40-00_pending_tasks.md
    - src/services/flow-control/adapters.js
  rolling_day: Day1
  due_date: 2026-04-24
  why_now:
    - `pending_tasks` の split 要否が整理できたら、次は adapter 側でどこまで複数 item 抽出するかを設計する段階になる
    - 最小実装のまま route 多様性は成立したため、次は粒度改善に寄せるのが自然である
  notes:
    - まず `pending_tasks` 型だけを対象にしてよい
    - 全 inbox 一般化は後回しにする
  external:
    todoist_task_id: 6gR8XX79VgjRwFvq

## Day2（04/25 土）

- なし

## Day3（04/26 日）

- なし

## Day4（04/27 月）

- なし

## Day5（04/28 火）

- なし

## Day6（04/29 水）

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
