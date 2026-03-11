# 04_Data_Model: データ定義とタグ体系

## 1. Task オブジェクト (Execution Layer)
Todoist へ登録されるタスクの基本構造。

```json
{
  "task_id": "string (自動生成)",
  "title": "string (30-120分で完了できる粒度)",
  "duration": "number (想定時間/分)",
  "project": "string (業務分類タグ)",
  "due_date": "date (期限)",
  "status": "open | completed"
}
