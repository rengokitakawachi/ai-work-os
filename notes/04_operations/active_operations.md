# active_operations

## Immediate Gates

通常 Day より前に解消すべき manual / external / runtime reflection gate を置く。

Immediate Gate が未完了の場合、その gate に blocked される active task を実行しない。

Immediate Gate は7日枠に数えない。

- task: ADAM runtime instruction に Day capacity Always-On Rule を反映する
  type: manual_runtime_reflection_gate
  status: complete
  completed: true
  source_ref:
    - config/ai/adam_instruction.md
    - config/ai/adam_knowledge.md
  blocks:
    - 次回以降の daily review / operations reroll の品質保証
  completed_condition:
    - ADAM GPT editor の Instructions に Day capacity Always-On Rule を反映する
    - ADAM GPT editor の Knowledge に最新版 `adam_knowledge.md` を反映する
    - 新しい ADAM runtime で Day capacity rule が確認できる
  why_now:
    - Day capacity は operations rolling / daily review の品質に直結する常時制約である
    - repo 反映済みでも ADAM runtime へ未反映なら、次回 review / reroll で同じ見落としが再発し得る
  notes:
    - repo instruction / knowledge は更新済み
    - ADAM runtime で Day capacity Always-On Rule が確認できた
    - runtime behavior として Day capacity correction 手順も確認できた
    - 反映済み Always-On Rule: `operations rolling / daily review では Day capacity を必ず確認し、task はおおむね 0.5〜1.5h、1 day はおおむね 2h として、明示理由なしに軽すぎる Day を作らない`
  external:
    todoist_task_id: 6gVgm3VxCq82hr2q

- task: DELTA v0.2 read-only Action runtime behavior confirmation
  type: runtime_reflection_gate
  status: complete
  completed: true
  source_ref:
    - systems/delta/config/delta_action_schema_v0.2.yaml
    - api/repo-resource.js
    - src/services/delta-resource.js
    - DELTA GPT Actions runtime test result 2026-04-28
  blocks:
    - DELTA v0.3 history write を repo-resource 統合方式で実装する
  completed_condition:
    - DELTA GPT Actions で `deltaResourceGet` が `/api/repo-resource` 経由で実行できる
    - `resource=delta` / `action=tree` が成功する
    - `resource=delta` / `action=read` が `operations/active_operations.md` を相対パスで読める
    - `resource=delta` / `action=bulk` が `config/delta_instruction.md` と `operations/active_operations.md` を読める
    - `branch=feature/atlas-pre-delta-foundation` が返る
    - `read_only: true` が確認できる
    - write / create / update / delete を実行していない
  notes:
    - 初回 `/api/delta-resource` 方式は Vercel Hobby の Serverless Functions 上限に衝突したため廃止した
    - `api/delta-*` と `api/*.test.js` は main から削除し、Production deploy は Ready に復旧した
    - v0.2 schema は `/api/repo-resource` + `resource=delta` へ差し替え済み
    - 認証 blocker は DELTA GPT Actions に Bearer API Key を設定して解消した
    - runtime test で tree / read / bulk がすべて成功した

---

## Day0（04/29 水）

- task: DELTA Knowledge refresh gate を実行する
  status: complete
  completed: true
  source_ref:
    - systems/delta/config/delta_instruction.md
    - systems/delta/config/delta_schema.yaml
    - systems/delta/roadmap/delta_roadmap.md
    - systems/delta/plan/2026_sharoushi_exam_plan.md
    - systems/delta/operations/active_operations.md
    - systems/delta/history/templates/daily_log_template.md
    - DELTA runtime knowledge confirmation 2026-04-29
  rolling_day: Day0
  due_date: 2026-04-29
  due_type: date
  why_now:
    - DELTA v0.3 runtime reflection 前に、DELTA GPT Knowledge から古い endpoint / 古い schema / 重複 instruction を除去する必要がある
    - フォーサイト教材を追加する前に、Knowledge と Instructions の責務分離を固定する必要がある
    - Day0 の作業量が v0.3 実装単体では軽すぎるため、同一テーマの前提 gate として補充する
  completed_condition:
    - DELTA GPT に入っている Knowledge 一覧を確認する
    - `delta_instruction.md` / `delta_schema.yaml` を Knowledge から外すか、Instructions / field guide 側に寄せる判断を行う
    - 古い `/api/delta-resource` 前提の schema / 説明 / テストログを削除候補にする
    - 残す core knowledge を決める
    - フォーサイト教材の追加分類方針を決める
    - v0.3 runtime reflection を妨げる古い参照前提がない状態にする
  notes:
    - DELTA GPT Knowledge はフォーサイト教材 PDF 20件を参照できている
    - roadmap / plan / operations / history は Knowledge ではなく repo Action で読む前提を runtime が回答できた
    - L3 評価は正答数ではなく理解度主軸であることを runtime が回答できた
    - `delta_instruction.md` と `delta_action_schema_v0.2.yaml` の repo 反映元も更新済み
    - フォーサイト教材は著作物の可能性が高いため、個人学習用・非公開 GPT Knowledge 前提で扱う
  external:
    todoist_task_id: 6gVgm3VQP8GFPwQH

- task: DELTA v0.3 history write を repo-resource 統合方式で実装する
  status: complete
  completed: true
  source_ref:
    - systems/delta/config/delta_action_schema_v0.3.yaml
    - src/services/delta-history.js
    - api/repo-resource.js
    - systems/delta/history/
  rolling_day: Day0
  due_date: 2026-04-29
  due_type: date
  why_now:
    - v0.2 read-only Action の runtime behavior が confirmed になったため、次の段階である history write に進める
    - Vercel Hobby の function 上限により新規 API route は増やせないため、既存 `/api/repo-resource` に統合する必要がある
  completed_condition:
    - `resource=delta_history` を `/api/repo-resource` POST に追加する
    - 許可 action は `create` / `update` のみに限定する
    - write scope は `systems/delta/history/` の `.md` のみに限定する
    - `operations` write / delete / arbitrary `systems/delta/` write は許可しない
    - schema v0.3 を `/api/repo-resource` 用に更新する
    - 保存後 read-back する
  notes:
    - 新規 API route は作らず、既存 `/api/repo-resource` に統合した
    - `src/services/delta-history.js` を新規作成した
    - `api/repo-resource.js` に `resource=delta` GET と `resource=delta_history` POST を統合した
    - `delta_history` は `create` / `update` のみに限定した
    - write scope は `systems/delta/history/` 配下の `.md` のみに限定した
    - `operations` write / delete / arbitrary `systems/delta/` write は公開していない
    - `systems/delta/config/delta_action_schema_v0.3.yaml` を新規作成した
    - 実装ファイル一式を read-back 済み
  external:
    todoist_task_id: 6gVXWvpPp8vjgF5H

## Day1（04/30 木）

- task: DELTA v0.3 history write runtime reflection を実行する
  status: complete
  completed: true
  source_ref:
    - systems/delta/config/delta_action_schema_v0.3.yaml
    - DELTA GPT Actions
    - systems/delta/history/2026-04.md
    - DELTA v0.3 runtime behavior confirmation 2026-04-29
  rolling_day: Day1
  due_date: 2026-04-30
  due_type: date
  why_now:
    - repo schema / code 保存だけでは runtime-visible schema / actual behavior confirmed にならない
  completed_condition:
    - DELTA GPT Actions に v0.3 schema を設定する
    - invalid path / unsupported action が拒否されることを先に確認する
    - `systems/delta/history/` 配下の controlled history update を1回だけ実行する
    - update 後に v0.2 read-only Action で read-back する
    - `operations` write は実行しない
  notes:
    - DELTA GPT Actions に v0.3 schema を設定した
    - schema description length limit により main の schema description を短縮した
    - Actions schema 再設定後に認証が外れたため、Bearer API Key を再設定した
    - 新規 DELTA chat で `deltaResourceGet` の tree が成功し、read-only Action 復旧を確認した
    - invalid path write は 400 / INVALID_REQUEST で拒否された
    - invalid extension write は 400 / INVALID_REQUEST で拒否された
    - controlled history update は `systems/delta/history/2026-04.md` に限定して成功した
    - read-back で `<!-- DELTA v0.3 runtime write test: ok -->` を確認した
    - returned resource は read が `delta`、write が `delta_history`
    - returned write_scope は `systems/delta/history/*.md`
    - operations write は実行していない
  external:
    todoist_task_id: 6gVXWvxP35M4RQcq

## Day2（05/01 金）

- task: DELTA v0.4 operations write の safety design gate を作る
  source_ref:
    - systems/delta/operations/active_operations.md
    - systems/delta/config/delta_schema.yaml
    - notes/02_design/2026-04-27_delta_learning_system_fast_track_architecture.md
  rolling_day: Day2
  due_date: 2026-05-01
  due_type: date
  blocked_by:
    - DELTA v0.3 history write runtime reflection を実行する
  why_now:
    - v0.4 は active_operations 更新権限を持つため、history write より強い guard が必要である
  completed_condition:
    - v0.4 の write scope を `systems/delta/operations/active_operations.md` のみに限定する方針を固定する
    - full replace / patch / proposed diff のどれで扱うか判断する
    - completed_condition / source_ref / read-back / rollback の確認項目を決める
    - v0.4 実装前の invalid path / unsupported action test を定義する
  notes:
    - まだ operations write は実装しない
  external:
    todoist_task_id: 6gVXWw4QrfRR8pfH

## Day3（05/02 土）

- task: DELTA v0.4 operations write を repo-resource 統合方式で実装する
  source_ref:
    - api/repo-resource.js
    - src/services/delta-history.js
    - systems/delta/operations/active_operations.md
  rolling_day: Day3
  due_date: 2026-05-02
  due_type: date
  blocked_by:
    - DELTA v0.4 operations write の safety design gate を作る
  why_now:
    - DELTA が学習 history だけでなく operations も更新できると、学習運用の closed loop に近づく
  completed_condition:
    - 新規 API route を増やさず `/api/repo-resource` に統合する
    - write scope は `systems/delta/operations/active_operations.md` のみに限定する
    - history write と operations write の resource / action を混同しない
    - schema v0.4 を作成または更新する
    - read-back する
  notes:
    - v0.3 runtime behavior confirmed 前に実行しない
  external:
    todoist_task_id: 6gVXWw2WcrQ8pc7H

## Day4（05/03 日）

- task: DELTA v0.4 operations write runtime reflection を実行する
  source_ref:
    - DELTA GPT Actions
    - systems/delta/operations/active_operations.md
  rolling_day: Day4
  due_date: 2026-05-03
  due_type: date
  blocked_by:
    - DELTA v0.4 operations write を repo-resource 統合方式で実装する
  why_now:
    - operations write は DELTA の実行正本に触れるため、実装保存では完了扱いにできない
  completed_condition:
    - DELTA GPT Actions に v0.4 schema を設定する
    - invalid path / unsupported action が拒否される
    - controlled operations update を1回だけ実行する
    - read-back で expected diff を確認する
    - unexpected write scope がないことを確認する
  notes:
    - 失敗時は v0.4 を disabled に戻す
  external:
    todoist_task_id: 6gVXWw74rqV7H

## Day5（05/04 月）

- task: Phase 1 Todoist foundation entry: Todoist service 境界と一覧取得 API を確認する
  source_ref:
    - notes/08_analysis/2026-04-28_phase0_remaining_inventory_before_phase1.md
    - notes/03_plan/2026-04_phase1_todoist_outlook_foundation.md
    - notes/02_design/2026-04-18_legacy_todoist_wrapper_deprecation_design.md
    - src/services/todoist.js
    - src/services/todoist/client.js
    - src/services/tasks/service.js
    - src/services/tasks/projection.js
  rolling_day: Day5
  due_date: 2026-05-04
  due_type: date
  why_now:
    - DELTA の急ぎ対応後、Phase 1 Todoist / Outlook foundation に戻る
    - Phase 1 の最初の完了条件は Todoist task list retrieval である
    - Outlook 読取へ入る前に、既存 Todoist service / task service / projection / legacy wrapper の境界確認を行う方が安全である
  completed_condition:
    - current Todoist service / task service / projection responsibilities are mapped
    - legacy wrapper usage is checked
    - Phase 1 list retrieval entry point is fixed
    - next implementation task is proposed or routed
  notes:
    - legacy Todoist wrapper 削除前 gate をこの entry task に吸収してよい
  external:
    todoist_task_id: 6gVVg84rHJc5CMpq

## Day6（05/05 火）

- task: docs/05_roadmap.md への Phase 0 位置づけ反映案を作る
  source_ref:
    - notes/02_design/2026-04-25_phase0_positioning_in_roadmap.md
    - notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md
    - docs/05_roadmap.md
  rolling_day: Day6
  due_date: 2026-05-05
  due_type: date
  why_now:
    - Phase 0 の foundation 位置づけは design / plan / operations に反映済みで、docs/05 reflection draft へ進める価値がある
    - DELTA / Phase 1 の前提として、roadmap 上の Phase 0 の意味を明確化しておくと後続判断が安定する
  completed_condition:
    - docs/05 を再取得する
    - Phase 0 positioning の反映差分案を notes/design として作る
    - docs 直更新は人間判断に回す
  notes:
    - docs/10 branch create reflection や delta 前環境整備の docs 反映案と混線させない
  external:
    todoist_task_id: 6gVXWw9XGv6MJvfH

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
- operations rolling / daily review では Day capacity を必ず確認し、task はおおむね 0.5〜1.5h、1 day はおおむね 2h として、明示理由なしに軽すぎる Day を作らない
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
