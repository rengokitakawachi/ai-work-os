# 04_Data_Model: データ定義と属性体系

## 1. Task オブジェクト (Execution Layer)
Todoist へ登録・管理される動的データの構造。

```json
{
  "task_id": "string",
  "title": "string (30-120分で完了できる粒度)",
  "description": "string (詳細メモ)",
  "duration": 60,
  "project": "string (業務分類タグ)",
  "due_date": "date (YYYY-MM-DD)",
  "tags": ["string"],
  "assignee": "t-kinoshita | t-niwa",
  "status": "open | completed"
}
```

## 2. Meeting / Knowledge オブジェクト (Knowledge Layer)
Obsidian (Markdown) で蓄積される知見の構造。

### 2.1. Meeting (会議録)
AI が会議ログを解析し、以下の形式で構造化する。
```json
{
  "meeting_id": "string",
  "title": "string",
  "date": "date",
  "participants": ["string"],
  "summary": "string",
  "decisions": ["string"],
  "actions": ["task_id"]
}
```

### 2.2. Knowledge (ナレッジ資産)
最終的に Obsidian へ保存される Markdown ファイルの形式。
```markdown
---
note_id: "string"
title: "string"
date: "YYYY-MM-DD"
tags: ["#組織名", "#プロジェクト名"]
related_tasks: ["task_id"]
summary: "string"
---
# Title
## Key Points
## Insights
## References
```

## 3. タグ体系 (Tagging System)
AI は以下の属性を自動判定・付与する。

### 3.1. 組織属性
- `#連合北河内`
- `#北河内労福協`
- `#連合大阪`
- `#大阪労福協`
- `#電機連合`
- `#PGU`

### 3.2. プロジェクト属性
- `#K-Project`
- `#3rd交通政策WS`
- `#プライベート`

### 3.3. 担当者属性 (Assignee)
- `@t-kinoshita` (木下)
- `@t-niwa` (丹羽)

## 4. SSOT (Single Source of Truth) 責務の分離
情報の「正本」を以下のように定義する。
- **今やること（タスク）:** Todoist
- **知識・知見（ナレッジ）:** Obsidian
- **予定・アポイント:** Outlook
- **技術・設計ドキュメント:** GitHub
- **案件進捗（将来）:** kintone
