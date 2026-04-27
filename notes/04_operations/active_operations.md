# active_operations

## Phase 0 位置づけ

### Phase 0 直結 task

- `ADAM / EVE instruction / knowledge を現行2層構成に合わせて整合する`
- `repoResourceGet bulk の files 区切り仕様を整理する`
- `docs/05_roadmap.md への Phase 0 位置づけ反映案を作る`

### 補助 task

- `legacy Todoist wrapper の削除前 gate を repo 全体で再確認する`
- `issue routing completed condition の継続観測項目を weekly review 向けに整理する`

## Day0（04/27 月）

- task: ADAM / EVE instruction / knowledge を現行2層構成に合わせて整合する
  source_ref:
    - notes/02_design/2026-04-26_adam_eve_instruction_schema_layering.md
    - notes/08_analysis/2026-04-26_adam_eve_instruction_schema_inventory.md
    - notes/08_analysis/2026-04-27_adam_eve_instruction_compression_proposal.md
    - config/ai/adam_instruction.md
    - config/ai/adam_knowledge.md
    - config/ai/eve_instruction.md
    - config/ai/eve_knowledge.md
  rolling_day: Day0
  due_date: 2026-04-27
  due_type: date
  why_now:
    - `config/ai/common_*` と `config/ai/procedures/*` は ADAM と相談して削除済みであり、再作成しない方針に戻す必要がある
    - 現行 repo は `instruction + knowledge` の2層構成であり、共通 layer / procedure file 分割案をそのまま repo 更新へ進めると構造が再分裂する
    - 既に instruction 圧縮案は作成済みのため、次は現行2層構成に合わせて必要差分だけを整理するのが正しい
  notes:
    - repo 本体への common / procedures file 作成はしない
    - `notes/02_design/2026-04-27_common_core_tool_use_schema_reflection_draft.md` と `notes/02_design/2026-04-27_adam_eve_procedure_draft.md` は、現行方針では repo 反映対象ではなく、設計検討履歴として扱う
    - 次に作る差分案は `adam_instruction.md` / `adam_knowledge.md` / `eve_instruction.md` / `eve_knowledge.md` の既存4ファイル前提に限定する
  completed_condition:
    - common / procedures 再作成をしない方針が operations 上で読める
    - instruction 圧縮案が既存作成済みであることを前提に、次の repo 差分対象が既存4ファイルへ絞られている
    - next_operations の repo 更新差分 task が、削除済み構造を前提にしない形へ修正されている
  external:
    todoist_task_id: 6gV6JmQh2MfCQ49H

## Day1（04/28 火）

- task: repoResourceGet bulk の files 区切り仕様を整理する
  source_ref:
    - notes/01_issues/idea_log.md
    - docs/10_repo_resource_api.md
    - config/ai/adam_schema.yaml
    - api/repo-resource.js
  rolling_day: Day1
  due_date: 2026-04-28
  due_type: date
  why_now:
    - issue `20260425-030` は daily review 中にも再発し、handover / 関連ファイル確認の効率と信頼性に影響する
    - ADAM / EVE instruction / knowledge の2層構成方針を戻した後、次に残る schema / API 整合の実害がある論点である
  notes:
    - まず仕様整理に留める
    - repo schema 更新と runtime tool schema 反映確認は別状態として扱う
  external:
    todoist_task_id: 6gRrVhjP6j8M66Jq

## Day2（04/29 水）

- task: docs/05_roadmap.md への Phase 0 位置づけ反映案を作る
  source_ref:
    - notes/02_design/2026-04-25_phase0_positioning_in_roadmap.md
    - notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md
    - docs/05_roadmap.md
  rolling_day: Day2
  due_date: 2026-04-29
  due_type: date
  why_now:
    - 2026-04-25 に Phase 0 の foundation 位置づけは design に整理済みで、次は docs 反映案へ進める
    - docs 本体更新は人間判断前提のため、まず反映案を作るのが安全である
  notes:
    - docs 直更新ではなく、差分案を先に作る
    - Phase 1 へ入る前の foundation として位置づける
  external:
    todoist_task_id: 6gRrVhmXVh9wcjhH

## Day3（04/30 木）

- task: legacy Todoist wrapper の削除前 gate を repo 全体で再確認する
  source_ref:
    - notes/02_design/2026-04-18_legacy_todoist_wrapper_deprecation_design.md
    - src/services/todoist.js
    - src/services/todoist/client.js
    - src/services/tasks/service.js
    - src/services/tasks/projection.js
  rolling_day: Day3
  due_date: 2026-04-30
  due_type: date
  why_now:
    - deprecated 化の段取りは整理済みだが、削除前には repo 全体 usage と test gate の再確認が必要である
    - architecture cleanup としては次段に置けるが、Phase 0 の主線より後に置くのが自然である
  notes:
    - 今回も即削除しない
    - usage 確認、参照移行要否、test 結果を削除判断の gate とする
  external:
    todoist_task_id: 6gRrVhq59gpX2JjH

## Day4（05/01 金）

- task: issue routing completed condition の継続観測項目を weekly review 向けに整理する
  source_ref:
    - notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md
    - notes/08_analysis/2026-04-21_issue_routing_operations_candidate_rolling_connection_observation.md
    - notes/08_analysis/2026-04-21_issue_routing_keep_future_archive_operational_validity.md
  rolling_day: Day4
  due_date: 2026-05-01
  due_type: date
  why_now:
    - issue routing の completed condition は plan / operations に返したが、単発確認と継続確認を分ける必要がある
    - weekly review で Phase 0 の進捗判断へ返せる形に整理しておく価値がある
  notes:
    - 単発確認済みの項目と、継続観測が必要な項目を分ける
  external:
    todoist_task_id: 6gRrVhrhjC7FgXPq

## Day5（05/02 土）

- task: delta 学習支援システムの fast-track architecture を開発計画に取り込む
  source_ref:
    - notes/02_design/2026-04-27_delta_learning_system_fast_track_architecture.md
    - docs/13_dev_workflow.md
    - docs/15_notes_system.md
    - docs/17_operations_system.md
  rolling_day: Day5
  due_date: 2026-05-02
  due_type: date
  why_now:
    - 2026-08-23 の社会保険労務士試験に向けた期限駆動案件である
    - future に寝かせるには重いが、active Day0 への割り込みではなく、既存 Phase 0 修正後に配置するのが安全である
  notes:
    - まず systems/delta resource layout と MVP 手動運用範囲を固定する
    - 初期 roadmap / plan / operations 作成 task を切る

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
- 削除済みの `config/ai/common_*` / `config/ai/procedures/*` 構造は再作成しない
- ADAM / EVE config は現行 `instruction + knowledge + schema` 構成を前提に整合する
