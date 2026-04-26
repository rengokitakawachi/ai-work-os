# active_operations

## Phase 0 位置づけ

### Phase 0 直結 task

- `共通 core / tool use / schema reflection の draft を作る`
- `ADAM / EVE procedure draft を作る`
- `ADAM / EVE instruction 圧縮案を作る`

### 補助 task

- `repoResourceGet bulk の files 区切り仕様を整理する`
- `docs/05_roadmap.md への Phase 0 位置づけ反映案を作る`
- `legacy Todoist wrapper の削除前 gate を repo 全体で再確認する`
- `issue routing completed condition の継続観測項目を weekly review 向けに整理する`

## Day0（04/27 月）

- task: 共通 core / tool use / schema reflection の draft を作る
  source_ref:
    - notes/02_design/2026-04-26_adam_eve_instruction_schema_layering.md
    - notes/08_analysis/2026-04-26_adam_eve_instruction_schema_inventory.md
    - config/ai/adam_instruction.md
    - config/ai/eve_instruction.md
  rolling_day: Day0
  due_date: 2026-04-27
  due_type: date
  why_now:
    - ADAM / EVE の同時整備方針と section inventory ができたため、次は共通化してよい範囲を draft として固定する必要がある
    - 共通 core を先に作らないと、ADAM / EVE 個別 instruction の圧縮が二重作業になりやすい
  notes:
    - 正本の違いは共通化しない
    - common_core / common_tool_use / common_schema_reflection の draft を作る

- task: ADAM / EVE procedure draft を作る
  source_ref:
    - notes/02_design/2026-04-26_adam_eve_instruction_schema_layering.md
    - notes/08_analysis/2026-04-26_adam_eve_instruction_schema_inventory.md
    - config/ai/adam_instruction.md
    - config/ai/eve_instruction.md
  rolling_day: Day0
  due_date: 2026-04-27
  due_type: date
  why_now:
    - 共通 core と同時に、状況依存手順を procedure へ逃がす準備が必要である
    - ADAM と EVE では procedure 範囲が異なるため、先に draft で境界を固定する
  notes:
    - ADAM: review / routing / operations / write_gate / handover / schema reflection
    - EVE: task clarify / retrieval / create / update

## Day1（04/28 火）

- task: ADAM / EVE instruction 圧縮案を作る
  source_ref:
    - notes/02_design/2026-04-26_adam_eve_instruction_schema_layering.md
    - notes/08_analysis/2026-04-26_adam_eve_instruction_schema_inventory.md
    - config/ai/adam_instruction.md
    - config/ai/eve_instruction.md
  rolling_day: Day1
  due_date: 2026-04-28
  due_type: date
  why_now:
    - 共通 core と procedure draft の後で、ADAM / EVE それぞれの instruction 圧縮案を安全に作れる
    - repo 直接更新前に、人格別の正本差分を残した圧縮案を確認する必要がある
  notes:
    - この task では repo 本体更新ではなく圧縮案を作る
    - ADAM は docs / operations / code 制御、EVE は Todoist 正本の実行支援として分ける

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
    - issue `20260425-030` は daily review 中にも再発し、handover / 関連ファイル確認の効率と信頼性に影響する
    - ただし ADAM / EVE instruction / schema 再層化の前提整理が始まったため、その後段に置く
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
    - 2026-04-25 に Phase 0 の foundation 位置づけは design に整理済みで、次は docs 反映案へ進める
    - docs 本体更新は人間判断前提のため、まず反映案を作るのが安全である
  notes:
    - docs 直更新ではなく、差分案を先に作る
    - Phase 1 へ入る前の foundation として位置づける
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
    - architecture cleanup としては次段に置けるが、Phase 0 の主線より後に置くのが自然である
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
    - Phase 0 の複数運用改善が進んだため、Phase 1 へ進む前に残件と移行条件を確認する必要がある
  notes:
    - intake / issue / design routing、review、Todoist projection、ADAM / EVE instruction / schema 再層化の残件を並べる
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
- 直近の daily review rolling では、ADAM / EVE instruction / schema 再層化の共通 core と procedure draft を優先候補として扱う
