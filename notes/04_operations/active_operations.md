# active_operations

## Phase 0 位置づけ

### Phase 0 直結 task

- `現 main の docs/code 不一致を分類し、整合修正対象を確定する`
- `main 整合修正案を作る`
- `feature branch target を確定し、branch 開発開始手順を固定する`
- `docs/10 repoResource branch selector reflection を人間が反映し完了確認する`
- `ADAM Action schema 2.2.1 を反映し branch create runtime-visible schema を確認する`
- `repoResource branch create API の actual behavior を確認する`
- `ATLAS test workflow を feature branch へ実装する`

## Day0（04/27 月）

- task: 現 main の docs/code 不一致を分類し、整合修正対象を確定する
  source_ref:
    - notes/08_analysis/2026-04-27_pre_delta_docs_code_operations_gap_inventory.md
    - docs/10_repo_resource_api.md
    - docs/13_dev_workflow.md
    - docs/15_notes_system.md
    - docs/17_operations_system.md
    - api/repo-resource.js
    - api/repo-resource.test.js
    - package.json
  rolling_day: Day0
  due_date: 2026-04-27
  due_type: date
  why_now:
    - main は Docs-aligned stable version であるべきなので、既に main 上で docs/code がずれているなら新規 branch 開発より先に整合回復が必要である
    - ただし notes 上の future/proposal と実装済み code の差分を混同すると、未実装機能を docs に先取り反映してしまう
  notes:
    - gap を current-main mismatch / notes-proposal-only / branch-development-candidate に分類する
    - current-main mismatch だけを main 整合修正候補にする
    - branch / ATLAS / delta の未実装提案は feature branch または merge 準備に残す
  external:
    todoist_task_id: 6gVGQcqVHxFCxQwH

## Day1（04/28 火）

- task: main 整合修正案を作る
  source_ref:
    - notes/08_analysis/2026-04-27_pre_delta_docs_code_operations_gap_inventory.md
    - docs/10_repo_resource_api.md
    - docs/13_dev_workflow.md
    - docs/17_operations_system.md
  rolling_day: Day1
  due_date: 2026-04-28
  due_type: date
  why_now:
    - 分類後、main の docs/code 整合を回復するために必要な最小修正案を作る必要がある
  notes:
    - docs 本体更新か code 修正かを gap ごとに判断する
    - main に実装済みの branch selector は current-main mismatch として docs reflection 対象に含める
    - 未実装の ATLAS workflow / delta は main修正に含めない
  external:
    todoist_task_id: 6gVGQcqRfpP78xVq

## Day2（04/29 水）

- task: feature branch target を確定し、branch 開発開始手順を固定する
  source_ref:
    - notes/05_decisions/2026-04-27_branch_policy_for_atlas_delta.md
    - notes/02_design/2026-04-27_feature_branch_start_procedure.md
    - notes/02_design/2026-04-27_atlas_test_workflow_patch_proposal.md
  rolling_day: Day2
  due_date: 2026-04-29
  due_type: date
  why_now:
    - main 整合回復後、新規開発は branch で進める
    - repoResource branch selector の read / write behavior が確認済みになったため、以後は branch target を明示して安全に code / workflow / schema 変更へ進める
  notes:
    - 推奨 target は feature/atlas-pre-delta-foundation
    - branch-sensitive write の前に、対象 branch と write scope を必ず Write Gate で確認する
    - main に直接 code/workflow/schema を書く例外は user が明示した場合に限る
  external:
    todoist_task_id: 6gVGPq5QM2MG46VH

## Day3（04/30 木）

- task: docs/10 repoResource branch selector reflection を人間が反映し完了確認する
  source_ref:
    - notes/02_design/2026-04-27_branch_selector_main_docs_schema_reflection_gap.md
    - notes/02_design/2026-04-27_docs_10_repo_resource_branch_selector_update_draft.md
    - notes/02_design/2026-04-27_main_alignment_repair_proposal.md
    - docs/10_repo_resource_api.md
  rolling_day: Day3
  due_date: 2026-04-30
  due_type: date
  why_now:
    - branch selector は main に例外実装済みであり、code behavior / repo schema / runtime-visible schema / explicit read / explicit write behavior まで確認済みである
    - docs/10_repo_resource_api.md はまだ branch selector を仕様として定義していないため、docs 本体への人間反映と完了確認が必要である
  notes:
    - ADAM は docs 本体を API から直接更新しない
    - 人間が docs/10 に branch selector reflection を反映する
    - ADAM は反映後に docs/10 を read して、branch selector の docs reflection complete を確認する
    - update proposal は現行 docs とマージした complete proposed content を code block で出す
  external:
    todoist_task_id: 6gVGM8r237XWCrHq

## Day4（05/01 金）

- task: ADAM Action schema 2.2.1 を反映し branch create runtime-visible schema を確認する
  source_ref:
    - config/ai/adam_schema.yaml
    - notes/02_design/2026-04-27_repo_resource_branch_create_api_design.md
    - api/repo-resource.js
    - src/services/repo-resource/repo.js
  rolling_day: Day4
  due_date: 2026-05-01
  due_type: date
  why_now:
    - repo schema は 2.2.1 に更新済みだが、configured Action schema / runtime-visible schema への反映は人間作業と新 runtime 観測が必要である
    - runtime-visible schema に `resource=repo` / `action=create_branch` / `from_branch` が見えるまで actual branch create behavior は確認できない
  notes:
    - ユーザーが ADAM の Action schema に `config/ai/adam_schema.yaml` version 2.2.1 を反映する
    - 新スレッドまたは schema refresh 後に runtime-visible tool schema を確認する
    - 完了条件は repoResourceWrite で `resource=repo`, `action=create_branch`, `from_branch` が見えること
    - repo schema file 更新だけでは completed としない

## Day5（05/02 土）

- task: repoResource branch create API の actual behavior を確認する
  source_ref:
    - notes/02_design/2026-04-27_repo_resource_branch_create_api_design.md
    - notes/02_design/2026-04-27_feature_branch_start_procedure.md
    - config/ai/adam_schema.yaml
    - api/repo-resource.js
    - src/services/repo-resource/repo.js
  rolling_day: Day5
  due_date: 2026-05-02
  due_type: date
  why_now:
    - branch create code behavior と repo schema は complete だが、actual branch create behavior は未確認である
    - feature/atlas-pre-delta-foundation が作成されるまで、ATLAS workflow を feature branch に実装できない
  notes:
    - runtime-visible schema complete 後に実行する
    - `repoResourceWrite resource=repo action=create_branch branch=feature/atlas-pre-delta-foundation from_branch=main` を実行する
    - その後 `repoResourceGet resource=code action=read file=package.json branch=feature/atlas-pre-delta-foundation` で read-back する
    - 完了条件は branch create response と read-back の両方で観測する

## Day6（05/03 日）

- task: ATLAS test workflow を feature branch へ実装する
  source_ref:
    - notes/02_design/2026-04-27_atlas_test_workflow_patch_proposal.md
    - notes/05_decisions/2026-04-27_atlas_minimum_testing_policy.md
    - package.json
  rolling_day: Day6
  due_date: 2026-05-03
  due_type: date
  why_now:
    - ATLAS workflow patch proposal は作成済みであり、branch 上で .nvmrc / test workflow を実装する必要がある
    - CI は以後の branch 開発の verification gate になる
    - feature branch が存在し、branch-scoped write が可能になった後に実行する必要がある
  notes:
    - .nvmrc と .github/workflows/test.yml を feature/atlas-pre-delta-foundation に作る
    - package-lock.json がないため初期 workflow は npm install を使う
    - coverage / lint / PR comments は後段
  external:
    todoist_task_id: 6gVGPq8f5mWXJxmH

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
- main は Docs-aligned stable version として扱う
- branch は Notes-driven development space として扱う
- branch で開発し、main 統合時に docs / code / config / operations / version を一致させる
- 現 main に docs/code 不一致がある場合は、新規 branch 開発前に整合回復を優先する
- delta 開発前に branch selector / branch create / ATLAS / bulk / docs 実態差分の環境整備を優先する
