# Strategy Domain ↔ Todoist Sync Phase1 Design

## 目的

Strategy Domain を正本とし、Todoist との双方向同期の最小構成を構築する。

本 Phase では、同期の成立・安定性・性能を検証する。

---

## スコープ

### 対象

- Strategy Domain（GitHub Markdown）
- Todoist（Execution View）

### 非対象

- MindMeister
- Outlook
- 高度な競合解決
- delete 同期

---

## 全体構造

```text
Strategy API
  ↓
Strategy Domain（GitHub）
  ↓
Projection Service
  ↓
Todoist

Todoist Sync Service
  ↓
Strategy Domain（GitHub）
```

---

## 同期方向

### 1. Domain → Todoist

- node 作成時
- node 更新時
- node 完了時

### 2. Todoist → Domain

- タスク完了
- タスク更新

---

## 同期対象フィールド

### Phase1

- title
- description
- status
- parent-child
- create

### Phase2 以降

- due
- priority
- duration

---

## 投影対象

```text
対象 node:
- type = task
- type = subtask
```

---

## Domain → Todoist

### create 条件

- type in [task, subtask]
- external.todoist_task_id == null

### update 条件

- external.todoist_task_id != null
- title / description / status に変更あり

### close 条件

- status == completed

---

## Todoist → Domain

### 前提

- todoist_task_id により node を特定

### update 対応

- title
- description
- status

---

## 親子関係

- L3 → Todoist task
- L4 → Todoist subtask
- 親の todoist_task_id が存在しない場合は作成を保留

---

## 順序制御

```text
L3 作成
  ↓
todoist_task_id 保存
  ↓
L4 作成
```

---

## 競合処理（簡易）

### 方針

- 最終更新優先（last-write-wins）
- 衝突はログに記録

### 非対応

- フィールド単位のマージ
- ユーザー選択

---

## ループ防止

### 必須

- 同期元フラグを持つ

```text
source = domain | todoist
```

### ルール

- domain → todoist 更新は todoist → domain に戻さない
- todoist → domain 更新は domain → todoist に戻さない

---

## 同期方式

### Phase1

- polling

### 将来

- webhook

---

## エラー処理

- upstream エラーは retryable とする
- 一時的失敗は再試行
- 不整合はログ出力

---

## 観測ポイント

- 同期遅延
- 二重更新
- ループ発生
- 親子不整合
- ID不整合

---

## 成功条件

- 双方向同期が成立する
- 手動操作なしで反映される
- データが破綻しない

---

## 次フェーズ

- MindMeister 連携
- 競合解決高度化
- webhook 化
