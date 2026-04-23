# active_operations

## Phase 0 位置づけ

### Phase 0 直結 task

- `pending_tasks 分解後の第一バッチ再観測を行う`
- `daily review reroll で plan / issue / next を必須候補源として確認する最小チェックを design に落とす`
- `ADAM の instruction へ daily review reroll gate 反映を確認する`
- `flow-control 新 handoff shape 統一の到達点を weekly report に返す要点を整理する`
- `docs/05_roadmap.md に Phase 0 をどう位置づけるか整理する`
- `issue routing の完成条件を plan / operations に反映する`
- `legacy な Todoist service wrapper を deprecated 化する段取りを design / operations に落とす`

### 補助 task

- `operations 提案時の Day 容量と reroll completeness を同時に確認するチェック項目を整理する`
- `pending_tasks 型 split 後の inbox archive / pending rule を整理する`

## Day0（04/24 金）

- task: pending_tasks 分解後の第一バッチ再観測を行う
  source_ref:
    - notes/08_analysis/2026-04-22_intake_routing_first_batch_mechanical_dry_run_observation.md
    - notes/00_inbox/dev_memo/2026-03-22_09-40-00_pending_tasks.md
    - src/services/flow-control/intake-routing.js
    - src/services/flow-control/adapters.js
  rolling_day: Day0
  due_date: 2026-04-24
  why_now:
    - `pending_tasks` 向け split 実装まで入ったため、次は route / 1テーマ1メモ / source_ref / inbox 後処理 / role boundary の再観測が必要である
    - 実装差分が小さいうちに観測し、追加修正が必要かを早めに判断したい
  notes:
    - `pending_tasks` だけを再観測対象にしてよい
    - 期待値 observation と第一回 mechanical dry run observation を比較基準にする
    - 1テーマ1メモ性がどこまで改善したかを重点確認する
  external:
    todoist_task_id: 6gR8gqXhC5FRM4cq

- task: daily review reroll で plan / issue / next を必須候補源として確認する最小チェックを design に落とす
  source_ref:
    - docs/17_operations_system.md
    - docs/13_dev_workflow.md
    - notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md
    - notes/01_issues/idea_log.md
    - notes/04_operations/active_operations.md
    - notes/04_operations/next_operations.md
  rolling_day: Day0
  due_date: 2026-04-24
  why_now:
    - 今回の daily review でも candidate source を明示し、reroll を実施した運用を design に返して再発防止へつなぐ必要がある
    - review 手順を fail-closed で守る最小チェックを先に固定すると、その後の運用が安定しやすい
  notes:
    - candidate source を明示確認する
    - active / next の両方を reroll 結果として更新する
    - Day 容量と依存順も同時に確認する
  external:
    todoist_task_id: 6gR8gmRr5v9m8GmH

- task: ADAM の instruction へ daily review reroll gate 反映を確認する
  source_ref:
    - config/ai/adam_instruction.md
    - notes/02_design/2026-04-03_review_system_operating_spec.md
    - notes/02_design/2026-04-18_daily_review_output_to_content_and_operations_connection_rule.md
    - notes/07_reports/daily/2026-04-22.md
  rolling_day: Day0
  due_date: 2026-04-24
  why_now:
    - repo 上の instruction と review spec には reroll gate を反映済みだが、ADAM runtime の instruction 反映確認は別 task として残す必要がある
    - `repo 更新 = 実運用反映` とみなさない再発防止の一部として、早めに確認する価値がある
  notes:
    - daily review 開始時に review モード / candidate source / reroll 実施有無を先に明示できるかを確認対象にする
    - candidate source 未確認なら fail-closed で停止する運用が ADAM 側でも効いているかを見る
  external:
    todoist_task_id: 6gRMpV4r6XqHxJjq

## Day1（04/25 土）

- task: flow-control 新 handoff shape 統一の到達点を weekly report に返す要点を整理する
  source_ref:
    - notes/08_analysis/2026-04-21_flow_control_handoff_shape_return_to_review_outputs.md
    - notes/08_analysis/2026-04-21_flow_control_new_handoff_shape_unification.md
  rolling_day: Day1
  due_date: 2026-04-25
  why_now:
    - intake inbox adapter の split 実装まで到達したため、週次 report に返す到達点を整理するタイミングとして自然である
  notes:
    - handover ではなく weekly report 向けの要点だけを整理する
  external:
    todoist_task_id: 6gQwqHx9RcJQJrRH

## Day2（04/26 日）

- task: docs/05_roadmap.md に Phase 0 をどう位置づけるか整理する
  source_ref:
    - notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md
    - docs/05_roadmap.md
    - notes/02_design/2026-04-03_plan_layer_operating_spec.md
  rolling_day: Day2
  due_date: 2026-04-26
  why_now:
    - plan では Phase 0 の foundation 位置づけが整理されているため、次は roadmap との接続を明文化する候補として評価するのが自然である
    - intake routing 周辺の最小運用が前進したので、上位計画との接続論点を少し先に置ける
  notes:
    - まずは docs 反映前の整理に留める
    - roadmap 直更新ではなく位置づけ整理を先に行う
  external:
    todoist_task_id: 6gR8grMFPw7p9cWH

## Day3（04/27 月）

- task: issue routing の完成条件を plan / operations に反映する
  source_ref:
    - notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md
    - notes/04_operations/active_operations.md
    - notes/04_operations/next_operations.md
    - notes/08_analysis/2026-04-21_flow_control_new_handoff_shape_unification.md
  rolling_day: Day3
  due_date: 2026-04-27
  why_now:
    - plan の `次に落とす作業` に明示されている継続論点であり、issue routing の完成条件を plan と operations に接続する必要が残っている
    - flow-control 周辺の green と intake 側の粒度改善後に、構造的完了条件を正本側へ返す段として自然である
  notes:
    - plan 側の完成条件と operations 側の実行単位をつなぐ
    - docs 反映前の notes / operations 反映として扱う
  external:
    todoist_task_id: 6gR8gv5W9gwwf7wH

## Day4（04/28 火）

- task: legacy な Todoist service wrapper を deprecated 化する段取りを design / operations に落とす
  source_ref:
    - notes/01_issues/idea_log.md
    - src/services/todoist.js
    - src/services/todoist/client.js
    - src/services/tasks/service.js
    - src/services/tasks/projection.js
  rolling_day: Day4
  due_date: 2026-04-28
  why_now:
    - open issue `20260418-022` は medium impact の architecture 論点として残っており、直近の routing / intake 論点が一段落した後の次候補として自然である
    - 実削除より前に、deprecated 化の段取りを design / operations に落として安全に進める必要がある
  notes:
    - `client.js` を正本とする前提で段取りを切る
    - 参照箇所確認 → deprecated 化 → 参照移行 → test 確認 → 削除 の順で整理する
  external:
    todoist_task_id: 6gR8gw9JGwGhm4cH

## Day5（04/29 水）

- task: operations 提案時の Day 容量と reroll completeness を同時に確認するチェック項目を整理する
  source_ref:
    - notes/01_issues/idea_log.md
    - docs/17_operations_system.md
    - notes/04_operations/active_operations.md
  rolling_day: Day5
  due_date: 2026-04-29
  why_now:
    - issue `20260419-023` は、Day 容量不足提案の再発防止と reroll completeness 確認の両方に関わる
    - 今回の reroll 補正運用を固定化する補助 task として自然である
  notes:
    - Day 容量
    - candidate source の網羅
    - 依存順確認
    を同時に見るチェックへ落とす
  external:
    todoist_task_id: 6gRMpV799XvGw94q

## Day6（04/30 木）

- task: pending_tasks 型 split 後の inbox archive / pending rule を整理する
  source_ref:
    - notes/00_inbox/dev_memo/2026-03-22_09-40-00_pending_tasks.md
    - notes/02_design/intake_review_and_source_ref_spec.md
    - notes/08_analysis/2026-04-22_intake_routing_first_batch_mechanical_dry_run_observation.md
  rolling_day: Day6
  due_date: 2026-04-30
  why_now:
    - split 実装後は、元 inbox を archive に移すか pending に残すかの rule も補強が必要になる
    - 再観測後に後処理ルールを整理する順が依存上自然である
  notes:
    - split 後の役目終了条件を明示する
  external:
    todoist_task_id: 6gRMpV9V8x32VMpH

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
