# 03_API_Spec: 技術仕様とエンドポイント

# API仕様

AI Work OS の Automation Layer で提供される API 仕様を定義する。

本APIは主に以下の役割を担う。

- タスク管理
- ナレッジ保存
- 会議整理
- 知識検索

---

# 1 共通仕様

- Base URL: https://ai-work-os.vercel.app
- 認証方式: Bearer Token（Vercel環境変数 GITHUB_TOKEN / TODOIST_API_TOKEN 等を使用）
- データ形式: JSON (UTF-8)

---

# 2 Vercel 構成 (vercel.json)

{
  "functions": { "src/api/*.ts": { "runtime": "nodejs20.x" } },
  "rewrites": [{ "source": "/api/:path*", "destination": "/src/api/:path*" }]
}

---

# 3 APIエンドポイント

---

## 3.1 タスク登録 (/api/task/create)

Method: POST

機能  
Todoist にタスクを登録する。

入力例

{
"title": "企画書を確認",
"description": "第2稿",
"due_string": "tomorrow",
"labels": ["AI Work OS"],
"priority": 3
}

必須

title

---

## 3.2 タスク更新 (/api/task/update)

Method: POST

機能  
既存タスクを更新する。

入力例

{
"task_id": "1234567890",
"content": "企画書を最終確認",
"due_string": "next friday",
"labels": ["AI Work OS"],
"priority": 4
}

必須

task_id

更新可能項目

content  
description  
due_string  
labels  
priority

条件  
更新対象フィールドが最低1つ必要

---

## 3.3 タスク一覧取得 (/api/tasks)

Method: GET

機能  
Todoist のタスク一覧を取得する。

クエリ例

/api/tasks?label=AI Work OS&limit=20

パラメータ

label  
ラベルフィルタ

project_id  
プロジェクト

limit  
取得件数

---

## 3.4 会議整理・タスク分解 (/api/meeting/process)

Method: POST

機能  
会議メモから Meeting ノート and 複数の Task を同時生成・処理する。

入力

title  
date  
participants  
raw_text  
project  
work_domain

---

## 3.5 知識検索 (/api/knowledge/search)

Method: GET

機能  
Obsidian 内の過去資産から RAG（検索拡張生成）用のデータを抽出する。

役割  
原則10（ソース駆動型思考）を実現するための基幹エンドポイント。

AI の回答前に本 API を叩き  
Grounding（根拠付け）を行う。

---

## 3.6 資産化フロー実行（将来拡張）

役割  
AI との対話ログから要約を生成し、適切な MOC へのリンクを含めて  
/api/note/save を呼び出す一連のシークエンスを制御する。

---

# 4 Service Layer

外部API通信は Service Layer に集約する。

例

src/services/todoist.js

提供する関数

createTask()  
updateTask()  
listTasks()

API Layer の責務

入力検証  
認証  
Service 呼び出し  
レスポンス整形

Service Layer の責務

外部API通信  
Todoist API 呼び出し  
データ変換

---

# 5 エラーハンドリング

基本方針

入力エラー  
400

HTTPメソッド不正  
405

外部APIエラー  
500

例

{
"ok": false,
"error": "task_id is required"
}

---

# 6 設計方針

AI Work OS の API は以下を原則とする。

責務分離

create  
update  
list

を明確に分ける。

新規作成 API は task_id を受け取らない  
更新 API は task_id を必須とする

これにより

更新が create に流れて  
タスクが複製される事故

を構造的に防ぐ。
