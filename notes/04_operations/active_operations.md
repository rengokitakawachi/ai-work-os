# active_operations

## Immediate Gates

通常 Day より前に解消すべき manual / external / runtime reflection gate を置く。

Immediate Gate が未完了の場合、その gate に blocked される active task を実行しない。

Immediate Gate は7日枠に数えない。

- task: code resource write allowlist に ATLAS workflow 用 root / workflow path を追加する
  type: implementation_gate
  source_ref:
    - notes/02_design/2026-04-18_code_resource_repo_root_allowlist_access_design.md
    - notes/02_design/2026-04-27_atlas_test_workflow_patch_proposal.md
    - src/services/repo-resource/common.js
    - api/repo-resource.test.js
  blocks:
    - ATLAS test workflow を feature branch へ実装する
    - repoResourceGet bulk の files 区切り仕様を branch selector 後に実装する
    - delta MVP resource layout を feature branch で作る
  why_now:
    - `feature/atlas-pre-delta-foundation` は作成済みで read-back も確認済みである
    - ATLAS workflow 実装で `.nvmrc` 作成を試みたが、runtime の code write allowlist が `.nvmrc` と `.github/workflows/` を許可しておらず `INVALID_REQUEST: code path not allowed` で停止した
    - ATLAS workflow は後続 branch 開発の verification gate であり、allowlist を先に整備しないと Day0 以降が実行不能になる
  completed_condition:
    - branch `feature/atlas-pre-delta-foundation` 上で code resource が `.nvmrc` を create できる
    - branch `feature/atlas-pre-delta-foundation` 上で code resource が `.github/workflows/test.yml` を create できる
    - allowlist 拡張は必要最小限で、docs write 権限や任意 root write を拡張しない
  notes:
    - 対象 branch は `feature/atlas-pre-delta-foundation`
    - main に直接 workflow / schema / code を書かない
    - `src/services/repo-resource/common.js` に `.nvmrc` と `.github/workflows/` の最小 allowlist patch を保存済み
    - `api/repo-resource.test.js` に ATLAS workflow path allowlist test を保存済み
    - saved branch code sha: common.js `f393d94f3d5ed6353c487948ddd784846f4ccedb`, repo-resource.test.js `cb3b3651d14f4d79a72f45c7f65d819e7d70248c`
    - runtime behavior は未反映で、`.nvmrc` create は引き続き `INVALID_REQUEST: code path not allowed` を返した
    - 次に必要なのは、allowlist patch を runtime-visible behavior に反映する手順の確定である
  external:
    todoist_task_id: 6gVHhg3XfmHG2gwH

---

## Phase 0 位置づけ

### Phase 0 直結 task

- `ATLAS test workflow を feature branch へ実装する`
- `repoResourceGet bulk の files 区切り仕様を branch selector 後に実装する`
- `docs/10 repoResource branch create reflection を runtime確認後に人間判断へ回す`
- `delta MVP resource layout を feature branch で作る`

## Day0（04/28 火）

- task: ATLAS test workflow を feature branch へ実装する
  source_ref:
    - notes/02_design/2026-04-27_atlas_test_workflow_patch_proposal.md
    - notes/05_decisions/2026-04-27_atlas_minimum_testing_policy.md
    - package.json
  rolling_day: Day0
  due_date: 2026-04-28
  due_type: date
  blocked_by:
    - code resource write allowlist に ATLAS workflow 用 root / workflow path を追加する
  why_now:
    - feature branch `feature/atlas-pre-delta-foundation` は作成済みで read-back も確認済みである
    - ATLAS workflow patch proposal は作成済みであり、branch 上で `.nvmrc` / `.github/workflows/test.yml` を実装する必要がある
    - CI は以後の branch 開発の verification gate になる
  notes:
    - `.nvmrc` と `.github/workflows/test.yml` を feature branch に作る
    - package-lock.json がないため初期 workflow は npm install を使う
    - coverage / lint / PR comments は後段
    - 2026-04-27 に実行着手したが、code write allowlist により blocked となった
    - 2026-04-28 に allowlist patch は feature branch へ保存済みだが、runtime behavior は未反映
  external:
    todoist_task_id: 6gVGPq8f5mWXJxmH

## Day1（04/29 水）

- task: repoResourceGet bulk の files 区切り仕様を branch selector 後に実装する
  source_ref:
    - notes/01_issues/idea_log.md
    - docs/10_repo_resource_api.md
    - api/repo-resource.js
    - api/repo-resource.test.js
  rolling_day: Day1
  due_date: 2026-04-29
  due_type: date
  blocked_by:
    - ATLAS test workflow を feature branch へ実装する
  why_now:
    - branch selector の read / write behavior が確認済みになったため、bulk 改行区切り対応を branch 上で進められる
    - ATLAS workflow が入った後に実装することで回帰確認しやすくなる
  notes:
    - parseFilesParam を comma / newline 両対応にする
    - node --test の回帰テストを追加する
    - schema / runtime tool schema 反映は別 task とする
  external:
    todoist_task_id: 6gRrVhjP6j8M66Jq

## Day2（04/30 木）

- task: docs/10 repoResource branch create reflection を runtime確認後に人間判断へ回す
  source_ref:
    - notes/02_design/2026-04-27_repo_resource_branch_create_api_design.md
    - docs/10_repo_resource_api.md
    - config/ai/adam_schema.yaml
    - api/repo-resource.js
    - src/services/repo-resource/repo.js
  rolling_day: Day2
  due_date: 2026-04-30
  due_type: date
  why_now:
    - branch create API は runtime-visible schema と actual branch create behavior まで確認済みになった
    - docs/10 には branch create 仕様がまだ反映されていないため、docs/code/schema 整合のために reflection 案が必要である
  notes:
    - docs 直更新ではなく、docs/10 反映案を notes/02_design に完成形で出す
    - branch selector docs reflection とは別 task として扱う
  external:
    todoist_task_id: 6gVHhc493Rj8WhFq

## Day3（05/01 金）

- task: delta MVP resource layout を feature branch で作る
  source_ref:
    - notes/02_design/2026-04-27_delta_learning_system_fast_track_architecture.md
    - docs/13_dev_workflow.md
    - docs/15_notes_system.md
    - docs/17_operations_system.md
  rolling_day: Day3
  due_date: 2026-05-01
  due_type: date
  blocked_by:
    - ATLAS test workflow を feature branch へ実装する
    - repoResourceGet bulk の files 区切り仕様を branch selector 後に実装する
  why_now:
    - 環境整備後に delta 初期運用へ戻る
    - delta resource は新規 system resource 群のため branch 上で作るのが正しい
  notes:
    - systems/delta/ docs / roadmap / plan / operations / history / review / resources / config の最小構成を作る
    - main 統合時に docs と一致させる
  external:
    todoist_task_id: 6gVFwG3q3hCHcrcH

## Day4（05/02 土）

- task: delta 社労士試験向け initial roadmap / plan / operations を作る
  source_ref:
    - notes/02_design/2026-04-27_delta_learning_system_fast_track_architecture.md
  rolling_day: Day4
  due_date: 2026-05-02
  due_type: date
  blocked_by:
    - delta MVP resource layout を feature branch で作る
  why_now:
    - delta resource layout の次に、2026-08-23 から逆算した実運用開始可能な roadmap / plan / operations が必要である
  notes:
    - 初期 roadmap、2026_sharoushi_exam_plan、delta active_operations の最小草案を作る
    - 最初は API 完成を待たず GitHub markdown と ChatGPT UI の手動運用を前提にする
  external:
    todoist_task_id: 6gVHhgP4WjXwfJJq

## Day5（05/03 日）

- task: delta learning history daily log template を作る
  source_ref:
    - notes/02_design/2026-04-27_delta_learning_system_fast_track_architecture.md
  rolling_day: Day5
  due_date: 2026-05-03
  due_type: date
  blocked_by:
    - delta MVP resource layout を feature branch で作る
  why_now:
    - delta は学習履歴を GitHub に保存する前提であり、日次ログ template がないと実運用を開始しにくい
  notes:
    - date / subject / topic / material / minutes / study_type / result / comprehension / quiz_score / weak_points / next_review_date / source_ref を含める
  external:
    todoist_task_id: 6gVHhgq3qgMWh9jq

## Day6（05/04 月）

- task: Phase 1 Todoist / Outlook foundation へ進む前の Phase 0 残件を棚卸しする
  source_ref:
    - notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md
    - notes/03_plan/2026-04_phase1_todoist_outlook_foundation.md
    - notes/04_operations/active_operations.md
    - notes/04_operations/next_operations.md
  rolling_day: Day6
  due_date: 2026-05-04
  due_type: date
  why_now:
    - ATLAS / branch selector / versioning / bulk / docs 整合 / delta を含めて Phase 0 / Phase 1 の境界が変わったため、残件と移行条件の棚卸しが必要である
  notes:
    - active の delta 前環境整備が一段落した後に実行する
  external:
    todoist_task_id: 6gVHhhGXGmcpRfRq

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
