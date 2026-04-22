# active_operations

## Phase 0 位置づけ

### Phase 0 直結 task

- `pending_tasks 向けの inbox チャンク分解拡張要否を整理する`
- `pending_tasks 型複数論点入力の最小 split ルールを design に落とす`
- `intake inbox adapter の複数 item 抽出最小拡張を設計する`
- `daily review reroll で plan / issue / next を必須候補源として確認する最小チェックを design に落とす`
- `intake inbox adapter の複数 item 抽出最小拡張を実装する`
- `pending_tasks 分解後の第一バッチ再観測を行う`
- `flow-control 新 handoff shape 統一の到達点を weekly report に返す要点を整理する`
- `docs/05_roadmap.md に Phase 0 をどう位置づけるか整理する`
- `issue routing の完成条件を plan / operations に反映する`
- `legacy な Todoist service wrapper を deprecated 化する段取りを design / operations に落とす`

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

- task: daily review reroll で plan / issue / next を必須候補源として確認する最小チェックを design に落とす
  source_ref:
    - docs/17_operations_system.md
    - docs/13_dev_workflow.md
    - notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md
    - notes/01_issues/idea_log.md
    - notes/04_operations/active_operations.md
    - notes/04_operations/next_operations.md
  rolling_day: Day1
  due_date: 2026-04-24
  why_now:
    - 今回の daily review で近接論点だけで active を組み替え、plan / issue / next を候補源に入れた reroll が不足していた
    - 同種の見落としを防ぐには、daily review で確認する最小チェックを先に design 化するのが安全である
  notes:
    - candidate source を明示確認する
    - active / next の両方を reroll 結果として更新する
    - Day 容量と依存順も同時に確認する
  external:
    todoist_task_id: 6gR8gmRr5v9m8GmH

## Day2（04/25 土）

- task: intake inbox adapter の複数 item 抽出最小拡張を実装する
  source_ref:
    - notes/08_analysis/2026-04-22_intake_routing_first_batch_mechanical_dry_run_observation.md
    - notes/00_inbox/dev_memo/2026-03-22_09-40-00_pending_tasks.md
    - src/services/flow-control/adapters.js
    - notes/02_design/intake_review_and_source_ref_spec.md
  rolling_day: Day2
  due_date: 2026-04-25
  why_now:
    - split ルールと複数 item 設計が固まれば、次は `pending_tasks` 型に絞った最小実装へ進むのが自然である
    - route correctness は確認済みなので、次は粒度改善の実装差分を小さく切る段階である
  notes:
    - まずは `1見出し = 1item` の成立性から確認する
  external:
    todoist_task_id: 6gR8gpWffJQfM6vq

- task: pending_tasks 分解後の第一バッチ再観測を行う
  source_ref:
    - notes/08_analysis/2026-04-22_intake_routing_first_batch_mechanical_dry_run_observation.md
    - notes/00_inbox/dev_memo/2026-03-22_09-40-00_pending_tasks.md
    - src/services/flow-control/intake-routing.js
    - src/services/flow-control/adapters.js
  rolling_day: Day2
  due_date: 2026-04-25
  why_now:
    - split 拡張後に、route / source_ref / inbox 後処理 / role boundary が改善したかを観測する必要がある
    - 期待値 observation と第一回 mechanical dry run observation を比較基準として再観測するのが自然である
  notes:
    - `pending_tasks` だけを再観測対象にしてよい
    - 1テーマ1メモ性がどこまで改善したかを重点確認する
  external:
    todoist_task_id: 6gR8gqXhC5FRM4cq

## Day3（04/26 日）

- task: flow-control 新 handoff shape 統一の到達点を weekly report に返す要点を整理する
  source_ref:
    - notes/08_analysis/2026-04-21_flow_control_handoff_shape_return_to_review_outputs.md
    - notes/08_analysis/2026-04-21_flow_control_new_handoff_shape_unification.md
  rolling_day: Day3
  due_date: 2026-04-26
  why_now:
    - flow-control 周辺の回帰確認と inbox adapter 追加後の green まで到達したため、週次 report 向け要点を整理するタイミングとして自然である
  notes:
    - handover ではなく weekly report 向けの要点だけを整理する
  external:
    todoist_task_id: 6gQwqHx9RcJQJrRH

## Day4（04/27 月）

- task: docs/05_roadmap.md に Phase 0 をどう位置づけるか整理する
  source_ref:
    - notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md
    - docs/05_roadmap.md
    - notes/02_design/2026-04-03_plan_layer_operating_spec.md
  rolling_day: Day4
  due_date: 2026-04-27
  why_now:
    - plan では Phase 0 の foundation 位置づけが整理されているため、次は roadmap との接続を明文化する候補として評価するのが自然である
    - intake routing 周辺の最小運用が前進したので、上位計画との接続論点を少し先に置ける
  notes:
    - まずは docs 反映前の整理に留める
    - roadmap 直更新ではなく位置づけ整理を先に行う
  external:
    todoist_task_id: 6gR8grMFPw7p9cWH

## Day5（04/28 火）

- task: issue routing の完成条件を plan / operations に反映する
  source_ref:
    - notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md
    - notes/04_operations/active_operations.md
    - notes/04_operations/next_operations.md
    - notes/08_analysis/2026-04-21_flow_control_new_handoff_shape_unification.md
  rolling_day: Day5
  due_date: 2026-04-28
  why_now:
    - plan の `次に落とす作業` に明示されている継続論点であり、issue routing の完成条件を plan と operations に接続する必要が残っている
    - flow-control 周辺の green 確認後に、構造的完了条件を正本側へ返す段として自然である
  notes:
    - plan 側の完成条件と operations 側の実行単位をつなぐ
    - docs 反映前の notes / operations 反映として扱う
  external:
    todoist_task_id: 6gR8gv5W9gwwf7wH

## Day6（04/29 水）

- task: legacy な Todoist service wrapper を deprecated 化する段取りを design / operations に落とす
  source_ref:
    - notes/01_issues/idea_log.md
    - src/services/todoist.js
    - src/services/todoist/client.js
    - src/services/tasks/service.js
    - src/services/tasks/projection.js
  rolling_day: Day6
  due_date: 2026-04-29
  why_now:
    - open issue `20260418-022` は medium impact の architecture 論点として残っており、直近の routing / intake 論点が一段落した後の次候補として自然である
    - 実削除より前に、deprecated 化の段取りを design / operations に落として安全に進める必要がある
  notes:
    - `client.js` を正本とする前提で段取りを切る
    - 参照箇所確認 → deprecated 化 → 参照移行 → test 確認 → 削除 の順で整理する
  external:
    todoist_task_id: 6gR8gw9JGwGhm4cH

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
