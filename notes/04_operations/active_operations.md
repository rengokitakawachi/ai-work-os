# active_operations

## Immediate Gates

通常 Day より前に解消すべき manual / external / runtime reflection gate を置く。

Immediate Gate が未完了の場合、その gate に blocked される active task を実行しない。

Immediate Gate は7日枠に数えない。

- task: ADAM Action schema 2.2.2 を configured Action schema に反映する
  type: manual_gate
  source_ref:
    - config/ai/adam_schema.yaml
    - notes/02_design/2026-04-27_repo_resource_branch_create_api_design.md
  blocks:
    - repoResource branch create API の actual behavior を確認する
    - ATLAS test workflow を feature branch へ実装する
    - repoResourceGet bulk の files 区切り仕様を branch selector 後に実装する
    - delta MVP resource layout を feature branch で作る
  why_now:
    - repo schema 2.2.2 は repository に保存済みであり、ユーザーにより ADAM configured Action schema へ反映済みである
    - runtime-visible schema に `resource=repo` / `action=create_branch` / `from_branch` が見えるまで branch create actual behavior を確認できない
    - branch create actual behavior が未確認だと feature branch を作成できず、以後の branch 作業が止まる
  completed_condition:
    - ADAM configured Action schema に `config/ai/adam_schema.yaml` version 2.2.2 が反映されている
    - runtime-visible `repoResourceWrite.resource` に `repo` が見える
    - runtime-visible `repoResourceWrite.action` に `create_branch` が見える
    - runtime-visible `repoResourceWrite` に `from_branch` が見える
  notes:
    - repo schema file 更新だけでは complete としない
    - configured Action schema 反映はユーザー報告により完了
    - runtime-visible schema は新スレッドまたは schema refresh 後に観測する

---

## Phase 0 位置づけ

### Phase 0 直結 task

- `現 main の docs/code 不一致を分類し、整合修正対象を確定する`
- `main 整合修正案を作る`
- `feature branch target を確定し、branch 開発開始手順を固定する`
- `repoResource branch create API の actual behavior を確認する`
- `ATLAS test workflow を feature branch へ実装する`
- `repoResourceGet bulk の files 区切り仕様を branch selector 後に実装する`
- `docs/10 repoResource branch create reflection を runtime確認後に人間判断へ回す`

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
  status: complete
  completed: true
  why_now:
    - main は Docs-aligned stable version であるべきなので、既に main 上で docs/code がずれているなら新規 branch 開発より先に整合回復が必要である
    - current-main mismatch / notes-proposal-only / branch-development-candidate の分類を更新済みである
  notes:
    - current-main mismatch は repoResource branch selector docs reflection のみと判定済み
    - branch / ATLAS / delta の未実装提案は feature branch または merge 準備に残す
  external:
    todoist_task_id: 6gVGQcqVHxFCxQwH

## Day1（04/28 火）

- task: main 整合修正案を作る
  source_ref:
    - notes/02_design/2026-04-27_main_alignment_repair_proposal.md
    - notes/02_design/2026-04-27_docs_10_repo_resource_branch_selector_update_draft.md
    - docs/10_repo_resource_api.md
  rolling_day: Day1
  due_date: 2026-04-28
  due_type: date
  status: complete
  completed: true
  why_now:
    - 分類後、main の docs/code 整合を回復するために必要な最小修正案を作る必要があった
  notes:
    - docs/10 branch selector reflection draft を完成形として更新済み
    - 未実装の ATLAS workflow / delta は main 修正に含めない
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
  status: complete
  completed: true
  why_now:
    - main 整合回復後、新規開発は branch で進める
    - repoResource branch selector の read / write behavior が確認済みになったため、以後は branch target を明示して安全に code / workflow / schema 変更へ進める
  notes:
    - target は feature/atlas-pre-delta-foundation に固定済み
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
  status: complete
  completed: true
  why_now:
    - branch selector は main に例外実装済みであり、code behavior / repo schema / runtime-visible schema / explicit read / explicit write behavior まで確認済みである
    - docs/10_repo_resource_api.md は branch selector を仕様として定義済みであることを確認した
  notes:
    - docs/10 read-back confirmed
    - docs sha: af34295c92210134f824e024c3bec288032bbd02
    - branch selector docs reflection は complete
  external:
    todoist_task_id: 6gVGM8r237XWCrHq

## Day4（05/01 金）

- task: repoResource branch create API の actual behavior を確認する
  source_ref:
    - notes/02_design/2026-04-27_repo_resource_branch_create_api_design.md
    - notes/02_design/2026-04-27_feature_branch_start_procedure.md
    - config/ai/adam_schema.yaml
    - api/repo-resource.js
    - src/services/repo-resource/repo.js
  rolling_day: Day4
  due_date: 2026-05-01
  due_type: date
  blocked_by:
    - ADAM Action schema 2.2.2 runtime-visible schema confirmation
  why_now:
    - branch create code behavior と repo schema は complete だが、actual branch create behavior は未確認である
    - feature/atlas-pre-delta-foundation が作成されるまで、ATLAS workflow を feature branch に実装できない
  notes:
    - Immediate Gate の runtime-visible schema complete 後に実行する
    - `repoResourceWrite resource=repo action=create_branch branch=feature/atlas-pre-delta-foundation from_branch=main` を実行する
    - その後 `repoResourceGet resource=code action=read file=package.json branch=feature/atlas-pre-delta-foundation` で read-back する
    - 完了条件は branch create response と read-back の両方で観測する

## Day5（05/02 土）

- task: ATLAS test workflow を feature branch へ実装する
  source_ref:
    - notes/02_design/2026-04-27_atlas_test_workflow_patch_proposal.md
    - notes/05_decisions/2026-04-27_atlas_minimum_testing_policy.md
    - package.json
  rolling_day: Day5
  due_date: 2026-05-02
  due_type: date
  blocked_by:
    - repoResource branch create API の actual behavior を確認する
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

## Day6（05/03 日）

- task: repoResourceGet bulk の files 区切り仕様を branch selector 後に実装する
  source_ref:
    - notes/01_issues/idea_log.md
    - docs/10_repo_resource_api.md
    - api/repo-resource.js
    - api/repo-resource.test.js
  rolling_day: Day6
  due_date: 2026-05-03
  due_type: date
  blocked_by:
    - repoResource branch create API の actual behavior を確認する
    - ATLAS test workflow を feature branch へ実装する
  why_now:
    - branch selector の read / write behavior が確認済みになったため、bulk 改行区切り対応を branch 上で進められる
    - ATLAS workflow が入った後に実装することで回帰確認しやすくなる
  notes:
    - branch create actual behavior と ATLAS workflow の後に実行する
    - parseFilesParam を comma / newline 両対応にする
    - node --test の回帰テストを追加する
    - schema / runtime tool schema 反映は別 task とする
  external:
    todoist_task_id: 6gRrVhjP6j8M66Jq

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
- delta 開発前に branch selector / branch create / ATLAS / bulk / docs 実態差分の環境整備を優先する
