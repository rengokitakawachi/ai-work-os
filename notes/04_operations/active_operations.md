# active_operations

## Phase 0 位置づけ

### Phase 0 直結 task

- `design routing test の shape / import 崩れを静的に洗う`
- `パソコンで design routing test と reroll sample dry_run を実行する`
- `applyDesignRoutingActionPlan の skeleton を切る`

### 補助 task

- `src/services/todoist.js の repo 全体 usage を最終確認する`
- `docs 番号衝突と旧 docs 群の整理方針をメモ化する`
- `Phase 1 各 plan と operations 接続案を並べる`

## Day0（04/19 日）

- task: design routing test の shape / import 崩れを静的に洗う
  source_ref:
    - src/services/flow-control/design-routing.js
    - src/services/flow-control/design-routing-rules.js
    - src/services/flow-control/design-routing-actions.js
    - src/services/flow-control/design-routing.test.js
    - src/services/flow-control/index.js
    - src/services/flow-control/normalize.js
    - src/services/flow-control/design-routing-notes-write.js
    - src/services/flow-control/adapters.js
  rolling_day: Day0
  why_now:
    - design routing の最小 dry_run は code へ入ったが、テスト実行前に shape と import の崩れを先に潰す価値が高い
  notes:
    - candidate_id / design_id / action_plan key の不整合を優先確認した
    - `design-routing.js` / `design-routing-rules.js` / `design-routing-actions.js` / `design-routing-notes-write.js` / `adapters.js` の import/export と payload shape を静的確認した
    - 致命的な shape / import 崩れは見当たらず、次はパソコンでの実行確認が本命である
  status: completed
  completed: true
  due_date: 2026-04-19
  due_type: date
  external:
    todoist_task_id: 6gQFMq3G79pc3HrH

- task: パソコンで design routing test と reroll sample dry_run を実行する
  source_ref:
    - src/services/flow-control/design-routing.test.js
    - src/services/flow-control/design-routing.js
    - src/services/flow-control/orchestrate.js
    - src/services/flow-control/rolling.js
    - notes/08_analysis/2026-04-18_reroll_minimum_dry_run_io_confirmation.md
    - notes/02_design/2026-04-18_reroll_minimum_dry_run_expected_output_examples.md
  rolling_day: Day0
  why_now:
    - current code snapshot ベースの確認は完了したため、次は repo 実体で test と dry_run を走らせて差分を潰すのが自然である
    - iPhone では code 実行確認ができないため、パソコン利用時 task として明示する
  notes:
    - `node --test src/services/flow-control/design-routing.test.js` を優先実行する
    - 必要なら reroll sample input を流して expected output examples と照合する
  due_date: 2026-04-19
  due_type: date
  external:
    todoist_task_id: 6gQ82pGjp6x7w6qR

- task: src/services/todoist.js の repo 全体 usage を最終確認する
  source_ref:
    - notes/01_issues/idea_log.md
    - notes/02_design/2026-04-18_legacy_todoist_wrapper_deprecation_design.md
    - src/services/todoist.js
    - src/services/todoist/client.js
    - notes/04_operations/active_operations.md
  rolling_day: Day0
  why_now:
    - `src/services/todoist.js` を legacy 候補とみなす根拠は揃ったが、削除前には repo 全体 usage の最終確認が必要である
    - tasks 本線未使用はかなり確認できたため、次は hidden import の有無だけを gate として独立確認するのが自然である
  notes:
    - delete 実行ではなく final gate の usage 確認を行う
    - hidden import があれば `src/services/todoist/client.js` への移行対象を列挙する
    - hidden import がなければ削除候補へ進める判断材料を揃える
  due_date: 2026-04-19
  due_type: date
  external:
    todoist_task_id: 6gQFC8r2G8w7VgQH

## Day1（04/20 月）

- task: applyDesignRoutingActionPlan の skeleton を切る
  source_ref:
    - notes/02_design/2026-04-17_apply_design_routing_action_plan_minimum_usecase.md
    - notes/02_design/2026-04-17_design_routing_actions_js_minimum_skeleton.md
    - src/services/flow-control/design-routing-actions.js
    - src/services/flow-control/design-routing.js
  rolling_day: Day1
  why_now:
    - design routing の decision 層は通ったため、次に後段 payload usecase の最小骨格を切ると構造が閉じやすい
  notes:
    - docs 直接 apply はしない
    - future / archive / docs candidate / operations queue の最小 payload 生成責務だけを切る
  due_date: 2026-04-20
  due_type: date
  external:
    todoist_task_id: 6gQFMr73gFwpmg6q

## Day2（04/21 火）

- task: docs 番号衝突と旧 docs 群の整理方針をメモ化する
  source_ref:
    - notes/08_analysis/2026-04-04_repo_readthrough_findings.md
    - notes/00_inbox/dev_memo/2026-04-04_repo_consistency_check_followup.md
    - notes/04_operations/next_operations.md
  rolling_day: Day2
  why_now:
    - repo 全体整合には必要だが、直近は reroll dry_run / design routing 後段 / review 接続整理を優先していた
  notes:
    - docs 15 / 16 系の衝突整理を含む
  due_date: 2026-04-21
  due_type: date
  external:
    todoist_task_id: 6gQFMv28VrRWm55H

## Day3（04/22 水）

- task: Phase 1 各 plan と operations 接続案を並べる
  source_ref:
    - notes/03_plan/2026-04_phase1_todoist_outlook_foundation.md
    - notes/03_plan/2026-04_phase1_schedule_proposal_and_outlook_write.md
    - notes/03_plan/2026-04_phase1_teams_and_obsidian_light_use.md
    - notes/04_operations/next_operations.md
  rolling_day: Day3
  why_now:
    - 次 phase への接続には必要だが、直近は Phase 0 の粒度調整後の active task 群を優先したい
  notes:
    - Todoist / Outlook 接続の前段として保持する
  due_date: 2026-04-22
  due_type: date
  external:
    todoist_task_id: 6gQFMvgvW5j8QJ5H

## Day4（04/23 木）

- なし

## Day5（04/24 金）

- なし

## Day6（04/25 土）

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
