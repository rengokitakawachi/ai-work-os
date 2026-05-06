# Strategy Domain 設計方針メモ（2026-03-25）

## 背景

AI Work OS において、Todoist（Execution）と MindMeister（Strategy View）を連携させるため、Strategy Domain の設計方針を検討した。

---

## 結論

Strategy Domain は以下の方針で設計する。

### 1. 正本

- Strategy Domain の正本は GitHub 上の Markdown とする
- Obsidian はローカル編集・閲覧 UI とする
- MindMeister は俯瞰ビューとして扱う
- Todoist は実行ビューとして扱う

```text
Strategy Domain（GitHub）
  ↓
MindMeister（俯瞰）
Todoist（実行）
```

---

### 2. データモデル

- 1ファイル1テーマ
- ノード単位で ID を持つ
- 親子関係は metadata（id/parent）で管理
- 人間可読性のためにリンク（[[...]]）も併用

---

### 3. 外部連携

- Strategy 側に外部IDを保持する

```yaml
external:
  todoist_task_id: "..."
  mindmeister_node_id: "..."
```

---

### 4. 階層設計

#### Schema

- level は 1..5 を表現可能とする

#### 運用制約（現行）

- level は 1..4 のみ使用
- L5 は将来拡張用として予約

```text
L1 戦略
L2 施策
L3 実行項目
L4 サブタスク
L5 予約
```

---

### 5. 重要原則

- Domain は外部ツールに依存しないが、投影可能性を優先する
- MindMeister と Todoist の双方向同期を成立させるため、構造の乖離を防ぐ
- 無制限階層は採用しない

---

### 6. 同期モデル

- 双方向直接同期は行わない
- 必ず Strategy Domain を経由する

```text
MindMeister → Domain → Todoist
Todoist → Domain → MindMeister
```

---

### 7. 今後の設計対象

- Strategy Domain Schema 定義
- ノード種別設計
- Todoist 投影ルール
- 完了状態伝播ルール

---

## 補足

本設計は「MindMeister = タスク構造ビュー」「Todoist = 実行管理」を成立させるための基盤となる。
