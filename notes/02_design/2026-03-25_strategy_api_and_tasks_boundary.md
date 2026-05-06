# Strategy API and Tasks API Boundary Design

## 目的

Strategy Domain Schema を前提として、
Strategy API と Tasks API の責務境界を定義する。

Todoist 依存の Tasks API から、
Strategy Domain を中心にした Execution API へ移行するための設計草案とする。

---

## 前提

- Strategy Domain は GitHub 上の Markdown を正本とする
- MindMeister は Strategy View とする
- Todoist は Execution View とする
- 双方向同期は必ず Domain を経由する
- 現行運用の階層は L1..L4 とする

---

## 全体構造

```text
User / AI
  ↓
Strategy API
  ↓
Strategy Domain（GitHub）
  ├ MindMeister Projection
  └ Tasks API / Todoist Projection
```

---

## 基本原則

- 公開 API は外部サービス名ではなく domain 名で定義する
- Strategy と Execution は分離する
- 外部サービス固有仕様は service / adapter に閉じる
- Todoist / MindMeister は投影先であり正本ではない

---

## Strategy API の責務

### 対象

- Strategy Node の作成
- Strategy Node の更新
- Strategy Node の読取
- Strategy Node の完了状態更新
- 親子関係の更新
- MindMeister への投影
- Tasks API へ渡す実行対象ノードの確定

### 非責務

- Todoist への直接登録
- 実行タスクの当日一覧最適化
- 外部サービス固有 ID の直接運用判断

---

## Tasks API の責務

### 対象

- 実行対象ノードの Todoist 投影
- Todoist タスクの取得
- Todoist 完了状態の Domain 反映
- 実行ビューとしての list / update / close

### 非責務

- 戦略構造の作成
- 深い階層構造の編集
- MindMeister ノード操作

---

## ノードの流れ

### Strategy 起点

```text
Strategy API
  ↓
Strategy Domain 更新
  ↓
必要に応じて Todoist 投影
  ↓
Tasks API から参照可能
```

### Todoist 起点

```text
Tasks API
  ↓
Todoist 更新
  ↓
Strategy Domain 更新
  ↓
MindMeister 投影更新
```

---

## 実行対象判定

### 方針

Todoist に投影するのは以下のノードとする。

- type = task
- type = subtask

### 補足

- strategy / initiative は Todoist に投影しない
- task / subtask のみ Execution View に出す

---

## API 構造案

### Strategy API

- POST /api/strategy
- PATCH /api/strategy/:id
- GET /api/strategy
- GET /api/strategy/:id

### Tasks API

- POST /api/tasks
- PATCH /api/tasks/:id
- GET /api/tasks

---

## Tasks API 再定義

### 現在

- Todoist を直接操作する API

### 将来

- Strategy Domain の execution projection を扱う API

### 意味

- create は task / subtask node の作成または投影を意味する
- update は execution view の状態更新を意味する
- list は execution projection 一覧を意味する

---

## 状態更新ルール

### close

- Tasks API で close された場合
- Todoist を完了
- Domain.status を completed に更新
- 全 children completed の場合は親へ伝播
- MindMeister 表示へ反映

---

## 外部 ID 管理

- Domain が todoist_task_id を保持する
- Domain が mindmeister_node_id を保持する
- Tasks API は Domain を経由して外部 ID を参照する

---

## 段階的移行

### Phase 1

- 現行 Tasks API を維持
- Strategy Domain Schema を確定

### Phase 2

- Strategy API を追加
- Tasks API の説明を projection 前提へ更新

### Phase 3

- Todoist 直接操作 API から Domain 経由へ移行
- MindMeister 連携を追加

---

## docs 候補

- 03_api_spec.md
- 新規 docs: strategy_api_spec.md または strategy を 03 に統合
- 07_external_integration.md
- 02_architecture.md

---

## 今後の設計対象

- Strategy API request / response schema
- node validation rule
- projection timing rule
- sync conflict rule
