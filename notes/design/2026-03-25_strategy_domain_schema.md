# Strategy Domain Schema Design

## 目的

Strategy Domain のデータ構造を定義し、
MindMeister（Strategy View）および Todoist（Execution）との双方向連携を安全に成立させる。

---

## 前提

- Strategy Domain は GitHub 上の Markdown を正本とする
- Obsidian は編集 UI
- MindMeister は俯瞰ビュー
- Todoist は実行ビュー
- 同期は必ず Domain を経由する

---

## Node Schema

```yaml
id: string                # 一意識別子
level: number             # 1..5（現行運用は1..4）
type: string              # strategy | initiative | task | subtask

title: string             # 表示名

description: string       # 詳細説明（任意）

parent_id: string | null  # 親ノードID
children_ids: string[]    # 子ノードID

status: string            # not_started | in_progress | completed

external:
  todoist_task_id: string | null
  mindmeister_node_id: string | null
```

---

## Level定義

```text
L1 戦略
L2 施策
L3 実行項目
L4 サブタスク
L5 拡張予約（未使用）
```

---

## Node Type

```text
strategy    = L1
initiative  = L2
task        = L3
subtask     = L4
```

制約:
- level と type は対応すること

---

## 階層制約

### Schema
- level は 1..5 を許可

### 現行運用
- level は 1..4 のみ許可
- L5 は予約

---

## 親子関係

- parent_id により単一親を持つ
- children_ids により子を列挙
- 循環参照は禁止

---

## Todoist 投影ルール

### 対象
- type = task, subtask のみ

### マッピング

```text
Domain.title       → content
Domain.description → description
Domain.status      → completed
```

### 階層
- L3 → 親タスク
- L4 → サブタスク

---

## MindMeister 投影ルール

### 対象
- 全ノード

### マッピング

```text
Domain.title  → node text
Domain.status → icon / style
```

### 階層
- parent_id に基づきツリー構築

---

## 完了状態伝播ルール

- leaf ノード完了 → 当該ノードのみ completed
- 全 children completed → 親を completed にする

---

## 制約

- 無制限階層は禁止
- 現行は L4 まで
- L5 は将来拡張

---

## 例

```yaml
id: strat_001
level: 1
type: strategy

title: 働く人支援強化

description: 全体戦略

parent_id: null
children_ids:
  - strat_002

status: not_started

external:
  todoist_task_id: null
  mindmeister_node_id: "mm_001"
```

---

## 今後

- validation 設計
- API設計（/strategy）
- Tasks API 再定義
