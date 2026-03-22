# Phase1 API Spec Draft

## 前提
- Phase1ではGPTが知能的処理を担う
- APIは構造化入力のみ受ける
- serviceは検証と外部連携のみ

---

## createTask
POST /api/tasks

### Request
```
{
  "title": "string",
  "description": "string",
  "due_string": "string",
  "labels": ["string"],
  "priority": number,
  "duration_minutes": number,
  "subtasks": ["string"]
}
```

### Notes
- titleは必須
- subtasksは親タスク作成後にserviceで展開

---

## listTasks
GET /api/tasks

### Query
- project_id
- section_id
- parent_id
- label
- status
- cursor
- limit

---

## updateTask
PATCH /api/tasks/:id

### Request
```
{
  "title": "string",
  "description": "string",
  "due_date": "string",
  "priority": number,
  "labels": ["string"],
  "status": "open | closed"
}
```

### Notes
- status=closedで完了
- close専用APIは廃止

---

## 移行方針（概要）
- 旧APIは新serviceを呼ぶラッパーに変更
- 段階的に廃止
