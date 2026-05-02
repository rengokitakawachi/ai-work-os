# next_operations

## 概要

active_operations に入らなかった上位候補を保持する。

`next_operations` は、7日ローリングの `active_operations` に入らなかったが、近い将来に進める前提の task を置くレイヤーとする。

---

## 再評価結果（2026-05-02 DELTA v0.6 integrated scope update）

### integrated into active_operations

以下は独立 next task ではなく、active Day0 の `DELTA v0.6 Integrated Operations Upgrade` scope に吸収した。

- `DELTA v0.6 operations を Todoist execution view へ投影する`

Reason:

- DELTA v0.6 は、operations generation quality と Todoist projection を一括で扱う integrated operations upgrade とする
- Todoist projection は後回しではなく v0.6 scope に含める
- ただし実行順は、plan-gap check / progress granularity / recommended_lines の反映方針を先に固定し、その後 projection を実装・確認する
- projection は generated operations の見える化であり、operations generation correctness の後に実行する

### active v0.6 scope

Active task:

- `DELTA v0.6 Integrated Operations Upgrade を instruction / knowledge / schema / projection 反映 task に分解する`

Included scope:

- plan-gap check
- progress granularity
- recommended_lines daily-review fixation
- Todoist execution view projection

---

## タスク

現在、active_operations に入らなかった近未来候補はなし。

新規候補が発生した場合は、daily / weekly review または operations rolling で active / next / future を比較する。

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
