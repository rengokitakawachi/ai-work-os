# 2026-04_phase1_todoist_outlook_foundation

## phase

Phase 1: Prototype / MVP

## 位置づけ

EVE の最小実行系を成立させるための最初の plan。

Phase 1 の中で、
Todoist の一覧取得、
Outlook 予定表の読取、
空き時間把握の土台を先に成立させることを目的とする。

本 plan は、
後続の
「スケジュール案提示」
「承認後の Outlook 書き込み」
「Teams 通知」
へ進む前提となる foundation とする。

---

## 目的

Todoist と Outlook を接続し、
EVE が実行タスクと予定状況を同時に把握できる状態を作る。

---

## 背景

Phase 1 では、
まず EVE の最小実行系を成立させる必要がある。

そのためには、
タスクの一覧取得と、
Outlook 上の予定確認が先に成立していなければならない。

スケジュール案提示や Outlook 書き込みはその次段階であり、
本 plan ではそこに進む前提となる読取基盤を優先する。

---

## スコープ

この plan で扱うもの

- Todoist タスクの一覧取得
- Todoist タスク状態の基本把握
- Outlook 予定表の読取
- Outlook 上の既存予定把握
- 空き時間把握のための基礎ロジック整理
- EVE が「タスク」と「予定」を同時参照できる状態の成立

この plan で扱わないもの

- スケジュール案の最終提示 UX
- 承認フロー
- Outlook への予定書き込み
- Teams への通知自動化
- GitHub 正本との同期
- Obsidian の本格連携

---

## 完了条件

- Todoist からタスク一覧を取得できる
- タスクの基本属性を EVE が参照できる
- Outlook から予定表を取得できる
- 既存予定から空き時間候補を判定できる
- 「どの時間帯にタスクを入れられそうか」を内部的に判断できる
- 次の plan でスケジュール案提示に進める

---

## 主要論点

### 1. Todoist 一覧取得の粒度

- open のみ取得するか
- project / label / section で絞るか
- priority や due をどう扱うか

### 2. Outlook 予定の扱い

- どのカレンダーを正本とするか
- 終日予定をどう扱うか
- 仮予定や private な予定をどう扱うか

### 3. 空き時間判定

- 何分以上を空き枠とみなすか
- 移動や休憩のバッファをどう入れるか
- 当日と翌日以降でルールを変えるか

### 4. タスクと予定の接続方法

- Todoist 側 priority をどう使うか
- due date と Outlook の空き枠をどう突き合わせるか
- 手動調整を前提にするか

---

## 現時点の仮方針

- Todoist は execution task の取得元とする
- Outlook は schedule の正本とする
- まずは read 中心で成立させる
- 書き込みは次 plan に分離する
- 空き時間判定は単純なルールから始める

---

## 関連 docs

- docs/05_roadmap.md

---

## 関連 design

- notes/02_design/2026-03-25_strategy_todoist_sync_phase1.md
- notes/02_design/2026-03-25_tasks_api_alignment_design.md
- notes/02_design/2026-04-03_plan_layer_operating_spec.md

---

## 関連 operations

- notes/04_operations/2026-03-26_short_term_plan.md

---

## 次に落とす作業

- Todoist 一覧取得 API の確認
- Outlook Calendar API の読取設計
- 空き時間判定ルールの最小仕様化
- タスク優先順位と空き枠突合の仮ロジック整理

---

## 次 plan 候補

- 2026-04_phase1_schedule_proposal_and_outlook_write.md
- 2026-04_phase1_teams_and_obsidian_light_use.md
