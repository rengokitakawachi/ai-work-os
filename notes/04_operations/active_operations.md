# active_operations

## Immediate Gates

通常 Day より前に解消すべき manual / external / runtime reflection gate を置く。

Immediate Gate が未完了の場合、その gate に blocked される active task を実行しない。

Immediate Gate は7日枠に数えない。

- task: code resource write allowlist に ATLAS workflow 用 root / workflow path を追加する
  type: implementation_gate
  status: complete
  completed: true
  source_ref:
    - notes/02_design/2026-04-18_code_resource_repo_root_allowlist_access_design.md
    - notes/02_design/2026-04-27_atlas_test_workflow_patch_proposal.md
    - notes/08_analysis/2026-04-28_atlas_workflow_write_upstream_not_found.md
    - src/services/repo-resource/common.js
    - api/repo-resource.test.js
  blocks:
    - ATLAS test workflow を feature branch へ実装する
    - repoResourceGet bulk の files 区切り仕様を branch selector 後に実装する
    - delta MVP resource layout を feature branch で作る
  completed_condition:
    - branch `feature/atlas-pre-delta-foundation` 上で code resource が `.nvmrc` を create できる
    - branch `feature/atlas-pre-delta-foundation` 上で code resource が `.github/workflows/test.yml` を create できる
    - allowlist 拡張は必要最小限で、docs write 権限や任意 root write を拡張しない
  notes:
    - allowlist patch は main / feature branch の両方に保存済み
    - `src/services/repo-resource/common.js` に `.nvmrc` と `.github/workflows/` の最小 allowlist patch を保存済み
    - `api/repo-resource.test.js` に ATLAS workflow path allowlist test を保存済み
    - `.nvmrc` create succeeded on feature branch; sha `209e3ef4b6247ce746048d5711befda46206d235`
    - `.github/workflows/test.yml` create succeeded on feature branch after token workflow scope update; sha `08895ad5e9a4ab7a72f3d3fe3aaa4cf4e2030bd7`
    - read-back confirmed both files with status OK
  external:
    todoist_task_id: 6gVHhg3XfmHG2gwH

---

## Phase 0 位置づけ

### Phase 0 直結 task

- `ATLAS test workflow を feature branch へ実装する`
- `repoResourceGet bulk の files 区切り仕様を branch selector 後に実装する`
- `docs/10 repoResource branch create reflection を runtime確認後に人間判断へ回す`
- `delta MVP resource layout を feature branch で作る`
- `delta 社労士試験向け initial roadmap / plan / operations を作る`
- `delta learning history daily log template を作る`
- `Phase 1 Todoist / Outlook foundation へ進む前の Phase 0 残件を棚卸しする`

## Day0（04/28 火）

- task: ATLAS test workflow を feature branch へ実装する
  status: complete
  completed: true
  source_ref:
    - notes/02_design/2026-04-27_atlas_test_workflow_patch_proposal.md
    - notes/05_decisions/2026-04-27_atlas_minimum_testing_policy.md
    - package.json
  rolling_day: Day0
  due_date: 2026-04-28
  due_type: date
  notes:
    - `.nvmrc` は feature branch に作成済み
    - `.github/workflows/test.yml` は feature branch に作成済み
    - read-back OK
  external:
    todoist_task_id: 6gVGPq8f5mWXJxmH

## Day1（04/29 水）

- task: repoResourceGet bulk の files 区切り仕様を branch selector 後に実装する
  status: complete
  completed: true
  source_ref:
    - notes/01_issues/idea_log.md
    - docs/10_repo_resource_api.md
    - notes/08_analysis/2026-04-28_repo_resource_bulk_newline_runtime_reflection_gap.md
    - api/repo-resource.js
    - api/repo-resource.test.js
  rolling_day: Day1
  due_date: 2026-04-29
  due_type: date
  notes:
    - parseFilesParam を comma / newline 両対応にする patch は feature branch と main の両方に保存済み
    - runtime-visible tool で newline separated files が複数 files として bulk read されることを確認済み
    - runtime observation request_id: `f04668a3-f53f-4449-8b33-7e870c1ce4a0`
  external:
    todoist_task_id: 6gRrVhjP6j8M66Jq

## Day2（04/30 木）

- task: docs/10 repoResource branch create reflection を runtime確認後に人間判断へ回す
  status: complete
  completed: true
  source_ref:
    - notes/02_design/2026-04-27_repo_resource_branch_create_api_design.md
    - notes/02_design/2026-04-28_docs_10_repo_resource_branch_create_update_draft.md
    - docs/10_repo_resource_api.md
    - config/ai/adam_schema.yaml
    - api/repo-resource.js
    - src/services/repo-resource/repo.js
  rolling_day: Day2
  due_date: 2026-04-30
  due_type: date
  notes:
    - docs/10 反映案を notes/02_design に完成形で作成済み
    - 人間判断により docs/10 本体へ反映済み
    - docs/10 read-back OK; sha `b38d43cee3dee5f08ff98e75fe8a63e262a3de2e`
  external:
    todoist_task_id: 6gVHhc493Rj8WhFq

## Day3（05/01 金）

- task: delta MVP resource layout を feature branch で作る
  status: complete
  completed: true
  source_ref:
    - notes/02_design/2026-04-27_delta_learning_system_fast_track_architecture.md
    - docs/13_dev_workflow.md
    - docs/15_notes_system.md
    - docs/17_operations_system.md
    - systems/delta/docs/00_delta_index.md
    - systems/delta/config/delta_schema.yaml
  rolling_day: Day3
  due_date: 2026-05-01
  due_type: date
  notes:
    - `systems/delta/` の最小 resource layout を `feature/atlas-pre-delta-foundation` 上に作成済み
    - 作成済み: docs / roadmap / plan / operations / history / review / resources / config
    - `systems/delta/` tree read-back confirmed
    - code resource allowlist に `systems/delta/` を最小追加済み。`systems/` 全体は許可していない
  external:
    todoist_task_id: 6gVFwG3q3hCHcrcH

## Day4（05/02 土）

- task: delta 社労士試験向け initial roadmap / plan / operations を作る
  status: complete
  completed: true
  source_ref:
    - notes/02_design/2026-04-27_delta_learning_system_fast_track_architecture.md
    - systems/delta/roadmap/delta_roadmap.md
    - systems/delta/plan/2026_sharoushi_exam_plan.md
    - systems/delta/operations/active_operations.md
  rolling_day: Day4
  due_date: 2026-05-02
  due_type: date
  notes:
    - ユーザー提供の `DELTA initial roadmap / plan / operations` を入力素材として反映済み
    - `systems/delta/roadmap/delta_roadmap.md` 更新済み; sha `e380c644bb9e7e66c7989a9531cc97c60f108abb`
    - `systems/delta/plan/2026_sharoushi_exam_plan.md` 更新済み; sha `bebb6263999a3c44e0b171422f25019c67307315`
    - `systems/delta/operations/active_operations.md` 更新済み; sha `bbcab07659cbee696ae8b0c41ea36477d3532e11`
    - read-back confirmed roadmap / plan / operations with status OK
  external:
    todoist_task_id: 6gVHhgP4WjXwfJJq

## Day5（05/03 日）

- task: delta learning history daily log template を作る
  status: complete
  completed: true
  source_ref:
    - notes/02_design/2026-04-27_delta_learning_system_fast_track_architecture.md
    - systems/delta/history/2026-04.md
    - systems/delta/history/templates/daily_log_template.md
    - systems/delta/docs/03_delta_data_model.md
    - systems/delta/plan/2026_sharoushi_exam_plan.md
  rolling_day: Day5
  due_date: 2026-05-03
  due_type: date
  notes:
    - `systems/delta/history/2026-04.md` を日次学習ログ構造へ更新済み; sha `9edbcb2bda09f3107446eaf3b0a35b128b2d4214`
    - `systems/delta/history/templates/daily_log_template.md` を再利用 template として作成済み; sha `72ad4e4ed7cba4f6bd6f86fcd67a49c582534384`
    - 2026-04-27 baseline entry と 2026-04-28 planned entry を月次ログに作成済み
    - read-back confirmed monthly history and daily template with status OK
  external:
    todoist_task_id: 6gVHhgq3qgMWh9jq

## Day6（05/04 月）

- task: Phase 1 Todoist / Outlook foundation へ進む前の Phase 0 残件を棚卸しする
  status: complete
  completed: true
  source_ref:
    - notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md
    - notes/03_plan/2026-04_phase1_todoist_outlook_foundation.md
    - notes/04_operations/active_operations.md
    - notes/04_operations/next_operations.md
    - notes/08_analysis/2026-04-28_phase0_remaining_inventory_before_phase1.md
  rolling_day: Day6
  due_date: 2026-05-04
  due_type: date
  why_now:
    - ATLAS / branch selector / versioning / bulk / docs 整合 / delta を含めて Phase 0 / Phase 1 の境界が変わったため、残件と移行条件の棚卸しが必要である
    - delta MVP resource layout / initial plan / learning history template が完了した
  notes:
    - Phase 1 を止める blocker は現時点ではない
    - Phase 0 残件は、近く処理すべき docs / operations 整合残件と、Phase 1 と並行する継続観測残件に分離した
    - 棚卸し note を作成済み; sha `32ac334de76c2c60620fcab439b1be2e0158599f`
  external:
    todoist_task_id: 6gVHhhGXGmcpRfRq

## Day7（05/05 火）

- task: Phase 1 Todoist foundation entry: Todoist service 境界と一覧取得 API を確認する
  source_ref:
    - notes/08_analysis/2026-04-28_phase0_remaining_inventory_before_phase1.md
    - notes/03_plan/2026-04_phase1_todoist_outlook_foundation.md
    - notes/02_design/2026-04-18_legacy_todoist_wrapper_deprecation_design.md
    - src/services/todoist.js
    - src/services/todoist/client.js
    - src/services/tasks/service.js
    - src/services/tasks/projection.js
  rolling_day: Day7
  due_date: 2026-05-05
  due_type: date
  why_now:
    - Phase 0 / delta 前環境整備が完了し、Phase 1 Todoist / Outlook foundation へ進む blocker がない
    - Phase 1 の最初の完了条件は Todoist task list retrieval である
    - Outlook 読取へ入る前に、既存 Todoist service / task service / projection / legacy wrapper の境界確認を行う方が安全である
  notes:
    - legacy Todoist wrapper 削除前 gate をこの entry task に吸収してよい
    - docs / plan / code / test を読む
    - 実装直行ではなく、境界確認と Phase 1 で使う Todoist list API の入口固定を完了条件にする
  external:
    todoist_task_id: 6gVVg84rHJc5CMpq

---

## ルール

- 実行対象は active_operations に入っている task のみとする
- 実行は上から順に行う
- Immediate Gate が未完了の場合、その gate に blocked される active task を実行しない
- Immediate Gate は通常 Day 枠に数えない
- active の7日構造より、実行可能性と blocker 解消を優先する
- 後続 task を実行不能にする前提作業は、通常 Day 枠ではなく Immediate Gate として先頭に置く
- Day は仮配置であり固定日付ではない
- 日付と曜日は人間可読性のために付与する
- 日付表示は daily review 時に更新する
- active_operations の各 task は task / source_ref / rolling_day を必須で持つ
- why_now / notes / due_date / due_type は必要に応じて持つ
- blocked_by / blocks は依存関係を構造化するために必要に応じて持つ
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
- main は Docs-aligned stable version として扱う
- branch は Notes-driven development space として扱う
- branch で開発し、main 統合時に docs / code / config / operations / version を一致させる
- 現 main に docs/code 不一致がある場合は、新規 branch 開発前に整合回復を優先する
