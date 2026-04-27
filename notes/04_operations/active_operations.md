# active_operations

## Phase 0 位置づけ

### Phase 0 直結 task

- `repoResource branch selector 実装パッチ案を作る`
- `repoResourceGet bulk の files 区切り仕様を branch selector 後に実装する`
- `GitHub Actions / ATLAS test workflow の最小差分を作る`
- `docs と code / operations 実態の差分を棚卸しする`
- `docs 反映案を delta 前環境整備として作る`
- `delta MVP resource layout を作る`

## Day0（04/27 月）

- task: repoResource branch selector 実装パッチ案を作る
  source_ref:
    - notes/02_design/2026-04-27_repo_resource_branch_selector_design.md
    - api/repo-resource.js
    - src/services/repo-resource/common.js
    - src/services/repo-resource/docs.js
    - src/services/repo-resource/notes.js
    - src/services/repo-resource/code.js
    - api/repo-resource.test.js
    - config/ai/adam_schema.yaml
  rolling_day: Day0
  due_date: 2026-04-27
  due_type: date
  why_now:
    - branch selector design は完了したが、現 runtime では branch 指定 write ができないため、main 直書きではなく feature branch 用の実装パッチ案に留める必要がある
    - bulk 実装や ATLAS workflow 作成の前提として、branch selector の具体差分を固定する必要がある
  notes:
    - code 本体はまだ書き換えない
    - common.js / api handler / docs.js / notes.js / code.js / tests / schema の差分案を notes にまとめる
    - repo implementation / repo schema / configured Action / runtime-visible schema / actual behavior の完了層を分ける
  external:
    todoist_task_id: 6gVGJ8WH4Mfj6MCq

## Day1（04/28 火）

- task: repoResourceGet bulk の files 区切り仕様を branch selector 後に実装する
  source_ref:
    - notes/01_issues/idea_log.md
    - docs/10_repo_resource_api.md
    - api/repo-resource.js
    - api/repo-resource.test.js
  rolling_day: Day1
  due_date: 2026-04-28
  due_type: date
  why_now:
    - delta 前環境整備として、関連 docs / notes / code の一括読取の摩擦を下げる必要がある
    - ただし code change のため branch selector パッチ案の後に進める
  notes:
    - parseFilesParam を comma / newline 両対応にする
    - node --test の回帰テストを追加する
    - schema / runtime tool schema 反映は別 task とする
  external:
    todoist_task_id: 6gRrVhjP6j8M66Jq

- task: GitHub Actions / ATLAS test workflow の最小差分を作る
  source_ref:
    - notes/05_decisions/2026-04-27_atlas_testing_system_name.md
    - notes/05_decisions/2026-04-27_atlas_minimum_testing_policy.md
    - package.json
    - api/repo-resource.test.js
  rolling_day: Day1
  due_date: 2026-04-28
  due_type: date
  why_now:
    - ATLAS の最小実体として、PR / branch 単位で npm test を確認できる line が必要である
    - ATLAS から .nvmrc を先に作る提案があったため、workflow 差分案に .nvmrc を含める必要がある
  notes:
    - まず .nvmrc と .github/workflows/test.yml の差分案を作る
    - coverage / lint / PR comments は後段に分ける
  external:
    todoist_task_id: 6gVG3qGGxMrvRcFH

## Day2（04/29 水）

- task: docs と code / operations 実態の差分を棚卸しする
  source_ref:
    - docs/10_repo_resource_api.md
    - docs/13_dev_workflow.md
    - docs/15_notes_system.md
    - docs/17_operations_system.md
    - notes/04_operations/active_operations.md
    - notes/05_decisions/2026-04-27_atlas_testing_system_name.md
  rolling_day: Day2
  due_date: 2026-04-29
  due_type: date
  why_now:
    - 実態が docs より進んでいるため、delta 開発前に docs / code / operations のズレを明示する必要がある
  notes:
    - docs 直更新ではなく notes/08_analysis か notes/02_design に差分棚卸しを作る
    - branch / ATLAS / bulk / versioning / systems/delta の不足を中心に見る
  external:
    todoist_task_id: 6gVG3qQXWf5V3Qfq

## Day3（04/30 木）

- task: docs 反映案を delta 前環境整備として作る
  source_ref:
    - notes/02_design/2026-04-21_github_centered_dev_test_workflow_proposal.md
    - notes/05_decisions/2026-04-27_atlas_testing_system_name.md
    - docs/10_repo_resource_api.md
    - docs/13_dev_workflow.md
  rolling_day: Day3
  due_date: 2026-04-30
  due_type: date
  why_now:
    - 差分棚卸し後、確定可能な範囲を docs 反映案として notes/02_design に落とす必要がある
  notes:
    - docs 本体は人間判断前提のため直接更新しない
    - branch / ATLAS / bulk separator / versioning / delta precondition を反映候補にする
  external:
    todoist_task_id: 6gVG3qMfWpqJ7P6q

## Day4（05/01 金）

- task: delta MVP resource layout を作る
  source_ref:
    - notes/02_design/2026-04-27_delta_learning_system_fast_track_architecture.md
    - docs/13_dev_workflow.md
    - docs/15_notes_system.md
    - docs/17_operations_system.md
  rolling_day: Day4
  due_date: 2026-05-01
  due_type: date
  why_now:
    - 環境整備後に delta 初期運用へ戻る
    - delta は 2026-08-23 社労士試験に向けた期限駆動案件であり、resource layout 固定は依然として必要である
  notes:
    - systems/delta/ docs / roadmap / plan / operations / history / review / resources / config の最小構成を作る
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
- merge 時に docs / code / config / operations / version を一致させる
- delta 開発前に branch selector / ATLAS / bulk / docs 実態差分の環境整備を優先する
