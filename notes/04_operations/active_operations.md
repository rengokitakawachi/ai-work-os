# active_operations

## Phase 0 位置づけ

### Phase 0 直結 task

- `delta MVP resource layout を作る`
- `delta 社労士試験向け initial roadmap / plan / operations を作る`
- `delta learning history daily log template を作る`
- `repoResourceGet bulk の files 区切り仕様を整理する`
- `docs/05_roadmap.md への Phase 0 位置づけ反映案を作る`

### 補助 task

- `legacy Todoist wrapper の削除前 gate を repo 全体で再確認する`
- `Phase 1 Todoist / Outlook foundation へ進む前の Phase 0 残件を棚卸しする`

## Day0（04/27 月）

- task: delta MVP resource layout を作る
  source_ref:
    - notes/02_design/2026-04-27_delta_learning_system_fast_track_architecture.md
    - docs/13_dev_workflow.md
    - docs/15_notes_system.md
    - docs/17_operations_system.md
  rolling_day: Day0
  due_date: 2026-04-27
  due_type: date
  why_now:
    - 2026-08-23 社労士試験に向けた期限駆動案件であり、初期運用開始を急ぐ必要がある
    - delta は core_system と別 system として扱うため、まず resource layout を固定しないと roadmap / plan / operations を安全に作れない
  notes:
    - systems/delta/ docs / roadmap / plan / operations / history / review / resources / config の最小構成を作る
    - この task は repo 本体作成前の差分案または notes/design で完了してよい
  external:
    todoist_task_id: 6gVFwG3q3hCHcrcH

- task: delta 社労士試験向け initial roadmap / plan / operations を作る
  source_ref:
    - notes/02_design/2026-04-27_delta_learning_system_fast_track_architecture.md
  rolling_day: Day0
  due_date: 2026-04-27
  due_type: date
  why_now:
    - resource layout の次に、2026-08-23 から逆算した実運用開始可能な roadmap / plan / operations が必要である
    - design 保存だけでは delta の completed condition を満たさない
  notes:
    - 初期 roadmap、2026_sharoushi_exam_plan、delta active_operations の最小草案を作る
    - 最初は API 完成を待たず GitHub markdown と ChatGPT UI の手動運用を前提にする
  external:
    todoist_task_id: 6gVFwG4QgQgQ2HJq

## Day1（04/28 火）

- task: delta learning history daily log template を作る
  source_ref:
    - notes/02_design/2026-04-27_delta_learning_system_fast_track_architecture.md
  rolling_day: Day1
  due_date: 2026-04-28
  due_type: date
  why_now:
    - delta は学習履歴を GitHub に保存する前提であり、日次ログ template がないと実運用を開始しにくい
  notes:
    - date / subject / topic / material / minutes / study_type / result / comprehension / quiz_score / weak_points / next_review_date / source_ref を含める
  external:
    todoist_task_id: 6gVFwG9QGC326H4H

## Day2（04/29 水）

- task: repoResourceGet bulk の files 区切り仕様を整理する
  source_ref:
    - notes/01_issues/idea_log.md
    - docs/10_repo_resource_api.md
    - config/ai/adam_schema.yaml
    - api/repo-resource.js
  rolling_day: Day2
  due_date: 2026-04-29
  due_type: date
  why_now:
    - handover / 関連ファイル確認の効率と信頼性に影響するが、delta 初期運用開始よりは後ろでよい
  notes:
    - まず仕様整理に留める
    - repo schema 更新と runtime tool schema 反映確認は別状態として扱う
  external:
    todoist_task_id: 6gRrVhjP6j8M66Jq

## Day3（04/30 木）

- task: docs/05_roadmap.md への Phase 0 位置づけ反映案を作る
  source_ref:
    - notes/02_design/2026-04-25_phase0_positioning_in_roadmap.md
    - notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md
    - docs/05_roadmap.md
  rolling_day: Day3
  due_date: 2026-04-30
  due_type: date
  why_now:
    - Phase 0 の foundation 位置づけは design に整理済みで、docs 反映案へ進める価値がある
  notes:
    - docs 直更新ではなく、差分案を先に作る
  external:
    todoist_task_id: 6gRrVhmXVh9wcjhH

## Day4（05/01 金）

- task: legacy Todoist wrapper の削除前 gate を repo 全体で再確認する
  source_ref:
    - notes/02_design/2026-04-18_legacy_todoist_wrapper_deprecation_design.md
    - src/services/todoist.js
    - src/services/todoist/client.js
    - src/services/tasks/service.js
    - src/services/tasks/projection.js
  rolling_day: Day4
  due_date: 2026-05-01
  due_type: date
  why_now:
    - deprecated 化の段取りは整理済みだが、削除前には repo 全体 usage と test gate の再確認が必要である
  notes:
    - 今回も即削除しない
    - usage 確認、参照移行要否、test 結果を削除判断の gate とする
  external:
    todoist_task_id: 6gRrVhq59gpX2JjH

## Day5（05/02 土）

- task: issue routing completed condition の継続観測項目を weekly review 向けに整理する
  source_ref:
    - notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md
    - notes/08_analysis/2026-04-21_issue_routing_operations_candidate_rolling_connection_observation.md
    - notes/08_analysis/2026-04-21_issue_routing_keep_future_archive_operational_validity.md
  rolling_day: Day5
  due_date: 2026-05-02
  due_type: date
  why_now:
    - issue routing の completed condition は plan / operations に返したが、単発確認と継続確認を分ける必要がある
    - weekly review で Phase 0 の進捗判断へ返せる形に整理しておく価値がある
  notes:
    - 単発確認済みの項目と、継続観測が必要な項目を分ける
  external:
    todoist_task_id: 6gRrVhrhjC7FgXPq

## Day6（05/03 日）

- task: Phase 1 Todoist / Outlook foundation へ進む前の Phase 0 残件を棚卸しする
  source_ref:
    - notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md
    - notes/03_plan/2026-04_phase1_todoist_outlook_foundation.md
    - notes/04_operations/active_operations.md
    - notes/04_operations/next_operations.md
  rolling_day: Day6
  due_date: 2026-05-03
  due_type: date
  why_now:
    - delta を含めて Phase 0 / Phase 1 の境界が変わったため、残件と移行条件の棚卸しが必要である
  notes:
    - intake / issue / design routing、review、Todoist projection、ADAM / EVE instruction / schema 再層化、delta 初期運用開始を並べる
    - Phase 1 に入れるものと、Phase 0 に残すものを分ける
  external:
    todoist_task_id: 6gRrVj47fCPCq8gH

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
- 削除済みの `config/ai/common_*` / `config/ai/procedures/*` 構造は再作成しない
- ADAM / EVE config は現行 `instruction + knowledge + schema` 構成を前提に整合する
