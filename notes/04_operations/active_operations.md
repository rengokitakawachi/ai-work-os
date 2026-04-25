# active_operations

## Phase 0 位置づけ

### Phase 0 直結 task

- `daily review reroll で plan / issue / next を必須候補源として確認する最小チェックを design に落とす`
- `ADAM の instruction へ daily review reroll gate 反映を確認する`
- `flow-control 新 handoff shape 統一の到達点を weekly report に返す要点を整理する`
- `docs/05_roadmap.md に Phase 0 をどう位置づけるか整理する`
- `issue routing の完成条件を plan / operations に反映する`
- `legacy な Todoist service wrapper を deprecated 化する段取りを design / operations に落とす`

### 補助 task

- `operations 提案時の Day 容量と reroll completeness を同時に確認するチェック項目を整理する`
- `Todoist projection の due_date / due_type 伝播欠落を埋める最小対策を design に落とす`
- `ADAM runtime の projectTasks schema に due_date / due_type が反映されたか確認する`
- `直近 issue を plan / operations / dev_memo へどう落とすかの運用を整える`

## Day0（04/25 土）

- task: daily review reroll で plan / issue / next を必須候補源として確認する最小チェックを design に落とす
  source_ref:
    - docs/17_operations_system.md
    - docs/13_dev_workflow.md
    - notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md
    - notes/01_issues/idea_log.md
    - notes/04_operations/active_operations.md
    - notes/04_operations/next_operations.md
  rolling_day: Day0
  due_date: 2026-04-25
  why_now:
    - 2026-04-24 の daily review でも candidate source を明示し、reroll を実施した運用を design に返して再発防止へつなぐ必要がある
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
    - notes/07_reports/daily/2026-04-24.md
  rolling_day: Day0
  due_date: 2026-04-25
  why_now:
    - repo 上の instruction と review spec には reroll gate を反映済みだが、ADAM runtime の instruction 反映確認は別 task として残す必要がある
    - `repo 更新 = 実運用反映` とみなさない再発防止の一部として、早めに確認する価値がある
  notes:
    - daily review 開始時に review モード / candidate source / reroll 実施有無を先に明示できるかを確認対象にする
    - candidate source 未確認なら fail-closed で停止する運用が ADAM 側でも効いているかを見る
  external:
    todoist_task_id: 6gRMpV4r6XqHxJjq

- task: flow-control 新 handoff shape 統一の到達点を weekly report に返す要点を整理する
  source_ref:
    - notes/08_analysis/2026-04-21_flow_control_handoff_shape_return_to_review_outputs.md
    - notes/08_analysis/2026-04-21_flow_control_new_handoff_shape_unification.md
  rolling_day: Day0
  due_date: 2026-04-25
  why_now:
    - pending_tasks 系の最小粒度改善と後処理ルール整理まで前進したため、週次 report に返す到達点を整理するタイミングとして自然である
    - Day0 の容量を 2時間前後に保つ補完 task としても自然である
  notes:
    - handover ではなく weekly report 向けの要点だけを整理する
  external:
    todoist_task_id: 6gQwqHx9RcJQJrRH

## Day1（04/26 日）

- task: docs/05_roadmap.md に Phase 0 をどう位置づけるか整理する
  source_ref:
    - notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md
    - docs/05_roadmap.md
    - notes/02_design/2026-04-03_plan_layer_operating_spec.md
  rolling_day: Day1
  due_date: 2026-04-26
  why_now:
    - plan では Phase 0 の foundation 位置づけが整理されているため、次は roadmap との接続を明文化する候補として評価するのが自然である
    - intake routing 周辺の最小運用が前進したので、上位計画との接続論点を少し先に置ける
  notes:
    - まずは docs 反映前の整理に留める
    - roadmap 直更新ではなく位置づけ整理を先に行う
  external:
    todoist_task_id: 6gR8grMFPw7p9cWH

## Day2（04/27 月）

- task: issue routing の完成条件を plan / operations に反映する
  source_ref:
    - notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md
    - notes/04_operations/active_operations.md
    - notes/04_operations/next_operations.md
    - notes/08_analysis/2026-04-21_issue_routing_operations_candidate_rolling_connection_observation.md
    - notes/08_analysis/2026-04-21_issue_routing_keep_future_archive_operational_validity.md
  rolling_day: Day2
  due_date: 2026-04-27
  why_now:
    - plan の `次に落とす作業` に明示されている継続論点であり、issue routing の完成条件を plan と operations に接続する必要が残っている
    - flow-control 周辺の green と intake 側の粒度改善後に、構造的完了条件を正本側へ返す段として自然である
  notes:
    - plan 側に issue routing completed condition の観測反映を明示する
    - `route_to: operations` は即 active 化ではなく rolling 比較対象化であることを反映対象に含める
    - keep / future / archive の役割差と再評価地点を completed condition 側へ接続する
    - docs 反映前の notes / operations 反映として扱う
  external:
    todoist_task_id: 6gR8gv5W9gwwf7wH

## Day3（04/28 火）

- task: legacy な Todoist service wrapper を deprecated 化する段取りを design / operations に落とす
  source_ref:
    - notes/01_issues/idea_log.md
    - notes/02_design/2026-04-18_legacy_todoist_wrapper_deprecation_design.md
    - src/services/todoist.js
    - src/services/todoist/client.js
    - src/services/tasks/service.js
    - src/services/tasks/projection.js
  rolling_day: Day3
  due_date: 2026-04-28
  why_now:
    - open issue `20260418-022` は medium impact の architecture 論点として残っており、直近の routing / intake 論点が一段落した後の次候補として自然である
    - tasks 本線が `client.js` に収束しているため、次は削除前の安全な段取りを completed condition ベースで固定する価値がある
  notes:
    - `todoist.js` を legacy 対象、`client.js` を正本として固定する
    - deprecated 化は成立済みとし、残タスクを `repo 全体 usage 最終確認 → 参照移行 → test → 削除判断` の順で読む
    - 今回は削除しない
  external:
    todoist_task_id: 6gR8gw9JGwGhm4cH

## Day4（04/29 水）

- task: operations 提案時の Day 容量と reroll completeness を同時に確認するチェック項目を整理する
  source_ref:
    - notes/01_issues/idea_log.md
    - docs/17_operations_system.md
    - notes/04_operations/active_operations.md
  rolling_day: Day4
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

## Day5（04/30 木）

- task: Todoist projection の due_date / due_type 伝播欠落を埋める最小対策を design に落とす
  source_ref:
    - notes/01_issues/idea_log.md
    - notes/02_design/2026-04-23_todoist_projection_due_date_propagation_gap.md
    - src/services/tasks/projection.js
    - notes/04_operations/active_operations.md
  rolling_day: Day5
  due_date: 2026-04-30
  why_now:
    - 2026-04-24 に新規 Todoist task の due 欠落原因が `projectTasks` schema と runtime projection の不一致だと整理できた
    - 同じ欠落を再発させないため、最小対策を design に落として次の implementation 前提を固める必要がある
  notes:
    - `projectTasks` schema に due_date / due_type を通す方針を最小で整理する
    - review 後チェックも含める
  external:
    todoist_task_id: 6gRfFPv84296Pfmq

- task: ADAM runtime の projectTasks schema に due_date / due_type が反映されたか確認する
  source_ref:
    - config/ai/adam_schema.yaml
    - config/ai/adam_instruction.md
    - notes/02_design/2026-04-23_todoist_projection_due_date_propagation_gap.md
    - notes/04_operations/active_operations.md
  rolling_day: Day5
  due_date: 2026-04-30
  why_now:
    - repo schema と instruction は更新済みだが、runtime tool schema に反映されたとはまだみなせない
    - due_date / due_type 伝播欠落の完了条件には、ADAM runtime の projectTasks 入力 schema で当該 field が見えることの確認が必要である
  notes:
    - GPT Action / runtime schema 再反映後に確認する
    - `current_active_tasks[].due_date` / `current_active_tasks[].due_type` が tool schema 上で見えるか確認する
    - `previous_active_tasks[].due_date` / `previous_active_tasks[].due_type` が tool schema 上で見えるか確認する
    - dry_run で create / update payload に `due_string` または `deadline_date` が入るか確認する
    - repo 更新済みだけでは completed としない

## Day6（05/01 金）

- task: 直近 issue を plan / operations / dev_memo へどう落とすかの運用を整える
  source_ref:
    - notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md
    - notes/01_issues/idea_log.md
    - notes/04_operations/active_operations.md
  rolling_day: Day6
  due_date: 2026-05-01
  why_now:
    - plan の `次に落とす作業` に含まれる継続論点であり、issue→operations 接続の運用線を補強する価値が残っている
    - due_date 伝播欠落 issue のような新しい運用論点も、今後どこに落とすかの判断線を整理しておく必要がある
  notes:
    - issue routing 後の placement だけでなく、plan 接続の運用線も整理対象にする
  external:
    todoist_task_id: 6gRfFPxvWQ72HmMq

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
