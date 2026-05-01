# next_operations

## 概要

active_operations に入らなかった上位候補を保持する。

`next_operations` は、7日ローリングの `active_operations` に入らなかったが、近い将来に進める前提の task を置くレイヤーとする。

---

## 再評価結果（2026-05-01 post-daily-review rolling）

### newly promoted to active_operations

- `DELTA daily operations plan-gap check を instruction / knowledge / schema 反映 task に分解する`

Reason:

- DELTA daily operations 生成が直近反応型になり、長期・中期計画からの逆算が必須プロセスとして働いていない問題が発生した
- DELTA operations の根幹品質に関わり、DELTA foundation / v0.6 projection より前に修正方針を active へ入れる必要がある

### moved back from active_operations to next_operations

- `DELTA v0.6 operations を Todoist execution view へ投影する`

Reason:

- DELTA plan-gap check が未解決のまま projection を進めると、誤った daily operations を Todoist に可視化するリスクがある
- v0.6 projection は重要だが、plan-gap check の設計・反映方針を先に決めるべき

---

## タスク

- task: DELTA v0.6 operations を Todoist execution view へ投影する
  source_ref:
    - notes/02_design/2026-04-30_delta_v0_6_operations_todoist_projection.md
    - systems/delta/operations/active_operations.md
    - systems/delta/roadmap/delta_roadmap.md
    - systems/delta/plan/2026_sharoushi_exam_plan.md
    - src/services/tasks/projection.js
    - config/ai/adam_schema.yaml
    - notes/01_issues/idea_log.md#20260430-031
  why_now:
    - DELTA 日次学習の execution visibility を上げる
    - DELTA operations は due_date / due_type / study_type を持ち、Todoist 投影に適した形になっている
    - ただし plan-gap check 未解決のまま projection すると、甘い operations を external execution view へ投影するリスクがある
  completed_condition:
    - DELTA v0.6 schema proposal を作る
    - `projectTasks` または同等 projection usecase が DELTA active operations を受け取れる
    - dry_run で DELTA operations tasks から Todoist create/update payload が生成される
    - payload description に DELTA 固有 field と `ref: systems/delta/operations/active_operations.md` が入る
    - apply で Todoist task が作成または更新される
    - apply 結果の Todoist task id を DELTA operations へ戻す方法を確認する
    - ADAM active projection が壊れていないことを確認する
    - DELTA GPT runtime-visible schema / behavior を確認する
  notes:
    - preferred direction は既存 `/api/tasks/project` と `src/services/tasks/projection.js` の profile 拡張
    - 新規 API route は増やさない
    - DELTA plan-gap check 修正方針の後に再 active 化する
  external:
    todoist_task_id: 6gWG92hh5RJfg2MH

---

## 参考: 2026-05-01 daily review で promoted 済み

以下は daily review reroll により active_operations へ移動済み。

- `docs/15 / docs/17 に routing core / weekly routing session を反映するか判断する`
- `ChatGPT Agent 外部記事を抽象概念と製品仕様に分割して routing する`
- `notes delete API draft と current repoResourceWrite delete semantics の差分を確認する`
- `DELTA foundation を main に統合する準備をする`
- `ATLAS 関係ファイルを systems/atlas に集約する設計を整理する`

### completed and removed from next

- `archive 判定済み inbox file を archive へ移動する`

Completion evidence:

- `notes/99_archive/00_inbox/2026-03-23_inbox_web_digest.md` created and read-back confirmed
- `notes/99_archive/00_inbox/260322_091234AIエージェントの作り方完全ガイド｜失敗しない開発5ステップと選定方法 ｜SIGNATE総研.md` created and read-back confirmed
- original `notes/00_inbox/2026-03-23_inbox_web_digest.md` deleted and post-delete `NOT_FOUND` confirmed
- original `notes/00_inbox/260322_091234AIエージェントの作り方完全ガイド｜失敗しない開発5ステップと選定方法 ｜SIGNATE総研.md` deleted and post-delete `NOT_FOUND` confirmed
- result recorded in `notes/08_analysis/2026-05-01_archive_decision_unmoved_inventory_current_rule.md`

### captured candidate

- `現在の inbox を一回整理する`
  - source: `notes/01_issues/2026-05-01_inbox_cleanup_once_issue.md`
  - result: active_operations Day4 に配置済み

---

## ルール

- active に入らなかった上位候補を置く
- task / source_ref を必須とする
- why_now / notes / due_date / due_type は必要に応じて持つ
- next は active の次に来る候補プールとして扱う
- 必要に応じて target_date や rolling_day を持ってよい
- daily / weekly review で再評価する
- active_operations に入る前提のものだけを置く
- 会話中に新規タスク候補が発生した場合も、まずは reroll により active / next / future を決める
- backlog 化しない
- 80_future の代替として使わない
- 削除済みの `config/ai/common_*` / `config/ai/procedures/*` 構造は再作成しない
- ADAM / EVE config は現行 `instruction + knowledge + schema` 構成を前提に整合する
- main は Docs-aligned stable version として扱う
- branch は Notes-driven development space として扱う
- merge 時に docs / code / config / operations / version を一致させる
- ATLAS は test / verification / CI review system として扱う
- DELTA v0.3 以降は新規 API route を増やさず、既存 `/api/repo-resource` 統合方式で進める
