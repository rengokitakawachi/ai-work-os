# active_operations

## Immediate Gates

通常 Day より前に解消すべき manual / external / runtime reflection gate を置く。

Immediate Gate が未完了の場合、その gate に blocked される active task を実行しない。

Immediate Gate は7日枠に数えない。

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

- task: DELTA v0.3 history write を repo-resource 統合方式で実装する
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
    - 以前作った `api/delta-history.js` route 方式は function 上限のため使用しない
    - `src/services/delta-history.js` は service 層として再利用してよい
  external:
    todoist_task_id: 6gVXWvpPp8vjgF5H

## Day1（04/30 木）

- task: DELTA v0.3 history write runtime reflection を実行する
  source_ref:
    - systems/delta/config/delta_action_schema_v0.3.yaml
    - DELTA GPT Actions
    - systems/delta/history/2026-04.md
  rolling_day: Day1
  due_date: 2026-04-30
  due_type: date
  blocked_by:
    - DELTA v0.3 history write を repo-resource 統合方式で実装する
  why_now:
    - repo schema / code 保存だけでは runtime-visible schema / actual behavior confirmed にならない
  completed_condition:
    - DELTA GPT Actions に v0.3 schema を設定する
    - invalid path / unsupported action が拒否されることを先に確認する
    - `systems/delta/history/` 配下の controlled history update を1回だけ実行する
    - update 後に v0.2 read-only Action で read-back する
    - `operations` write は実行しない
  notes:
    - runtime reflection は repo schema / configured Action schema / runtime-visible tool schema / actual behavior を分けて観測する
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
    todoist_task_id: 6gVXWw74rqV7H8qH

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
