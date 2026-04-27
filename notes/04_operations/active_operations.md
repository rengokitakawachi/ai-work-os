# active_operations

## Phase 0 位置づけ

### Phase 0 直結 task

- `feature branch target を確定し、branch 開発開始手順を固定する`
- `repoResource branch selector を feature branch へ実装する`
- `ATLAS test workflow を feature branch へ実装する`
- `repoResourceGet bulk の files 区切り仕様を branch selector 後に実装する`
- `docs 反映案を merge 準備として作る`
- `delta MVP resource layout を feature branch で作る`

## Day0（04/27 月）

- task: feature branch target を確定し、branch 開発開始手順を固定する
  source_ref:
    - notes/05_decisions/2026-04-27_branch_policy_for_atlas_delta.md
    - notes/02_design/2026-04-27_repo_resource_branch_selector_patch_proposal.md
    - notes/02_design/2026-04-27_atlas_test_workflow_patch_proposal.md
  rolling_day: Day0
  due_date: 2026-04-27
  due_type: date
  why_now:
    - 運用順は branch で開発し、main 統合時に docs と合わせる形が正しい
    - 現 runtime は branch 指定 write を持たないため、実装前に feature branch target と適用方法を確定する必要がある
  notes:
    - 推奨 target は feature/atlas-pre-delta-foundation または feature/repo-resource-branch-selector
    - ADAM runtime が branch 指定できない間は main に code/workflow/schema を書かない
    - 選択肢は GITHUB_BRANCH を feature branch に向ける、人間が patch を適用する、branch selector 実装後に runtime schema refresh する、のいずれか

## Day1（04/28 火）

- task: repoResource branch selector を feature branch へ実装する
  source_ref:
    - notes/02_design/2026-04-27_repo_resource_branch_selector_patch_proposal.md
  rolling_day: Day1
  due_date: 2026-04-28
  due_type: date
  why_now:
    - patch proposal は作成済みであり、feature branch target が確認できた段階で実装する必要がある
    - 以後の bulk / ATLAS workflow / delta resource 作成を branch 上で安全に進める前提になる
  notes:
    - implementation / schema / runtime reflection / behavior confirmation を分ける
    - repo schema 更新後も runtime tool schema 反映済みとはみなさない
  external:
    todoist_task_id: 6gVGM8r237XWCrHq

## Day2（04/29 水）

- task: ATLAS test workflow を feature branch へ実装する
  source_ref:
    - notes/02_design/2026-04-27_atlas_test_workflow_patch_proposal.md
    - notes/05_decisions/2026-04-27_atlas_minimum_testing_policy.md
    - package.json
  rolling_day: Day2
  due_date: 2026-04-29
  due_type: date
  why_now:
    - ATLAS workflow patch proposal は作成済みであり、branch 上で .nvmrc / test workflow を実装する必要がある
    - CI は以後の branch 開発の verification gate になる
  notes:
    - .nvmrc と .github/workflows/test.yml を feature branch に作る
    - package-lock.json がないため初期 workflow は npm install を使う
    - coverage / lint / PR comments は後段

## Day3（04/30 木）

- task: repoResourceGet bulk の files 区切り仕様を branch selector 後に実装する
  source_ref:
    - notes/01_issues/idea_log.md
    - docs/10_repo_resource_api.md
    - api/repo-resource.js
    - api/repo-resource.test.js
  rolling_day: Day3
  due_date: 2026-04-30
  due_type: date
  why_now:
    - branch selector 実装後に、bulk 改行区切り対応を branch 上で進める
  notes:
    - parseFilesParam を comma / newline 両対応にする
    - node --test の回帰テストを追加する
    - schema / runtime tool schema 反映は別 task とする
  external:
    todoist_task_id: 6gRrVhjP6j8M66Jq

## Day4（05/01 金）

- task: docs 反映案を merge 準備として作る
  source_ref:
    - notes/08_analysis/2026-04-27_pre_delta_docs_code_operations_gap_inventory.md
    - docs/10_repo_resource_api.md
    - docs/13_dev_workflow.md
    - docs/17_operations_system.md
  rolling_day: Day4
  due_date: 2026-05-01
  due_type: date
  why_now:
    - docs 反映は branch 開発後、main 統合前に行うべきである
    - 棚卸し済み gap を merge gate 用の docs reflection proposal に変換する必要がある
  notes:
    - docs 本体は直接更新しない
    - branch / ATLAS / versioning / branch selector / bulk / day reroll / delta precondition を反映候補にする
  external:
    todoist_task_id: 6gVG3qMfWpqJ7P6q

## Day5（05/02 土）

- task: delta MVP resource layout を feature branch で作る
  source_ref:
    - notes/02_design/2026-04-27_delta_learning_system_fast_track_architecture.md
    - docs/13_dev_workflow.md
    - docs/15_notes_system.md
    - docs/17_operations_system.md
  rolling_day: Day5
  due_date: 2026-05-02
  due_type: date
  why_now:
    - 環境整備後に delta 初期運用へ戻る
    - delta resource は新規 system resource 群のため branch 上で作るのが正しい
  notes:
    - systems/delta/ docs / roadmap / plan / operations / history / review / resources / config の最小構成を作る
    - main 統合時に docs と一致させる
  external:
    todoist_task_id: 6gVFwG3q3hCHcrcH

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
- delta 開発前に branch selector / ATLAS / bulk / docs 実態差分の環境整備を優先する
