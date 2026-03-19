# 10_docs_dev_api.md

## 概要

本ドキュメントは、AI Work OS における docs 操作用 API の仕様を定義する。

本 API は、docs（SSOT）を取得・更新するための開発基盤である。

---

## 基本方針

docs は GitHub 上で管理する。

AI は docs API を通じてのみ docs を読み書きする。

GitHub URL を直接参照してはならない。

---

## API 一覧

GET /api/docs  
GET /api/docs-read  
POST /api/docs-update（予定）

---

## docs 一覧取得

GET /api/docs

### 概要

docs フォルダ内のファイル一覧を取得する。

### レスポンス例

{
  "ok": true,
  "data": {
    "items": [
      {
        "name": "01_concept.md",
        "path": "docs/01_concept.md",
        "sha": "xxx"
      }
    ],
    "count": 1
  }
}

---

## docs 本文取得

GET /api/docs-read?file=FILENAME

### 概要

指定した docs ファイルの本文を取得する。

### パラメータ

file  
対象ファイル名（例：08_dev_config.md）

### レスポンス例

{
  "ok": true,
  "data": {
    "name": "08_dev_config.md",
    "path": "docs/08_dev_config.md",
    "sha": "xxx",
    "content": "Markdown本文"
  }
}

---

## docs 更新（予定）

POST /api/docs-update

### 概要

docs の内容を更新し、GitHub に commit する。

### リクエスト例

{
  "file": "08_dev_config.md",
  "content": "Markdown本文"
}

### 処理フロー

AI  
↓  
docs-read  
↓  
差分生成  
↓  
docs-update  
↓  
GitHub commit

---

## service 層

docs API のロジックは service 層に配置する。

対象ファイル

src/services/github-docs.js

---

## service の責務

GitHub REST API 呼び出し

認証処理

Base64 デコード

エラーハンドリング

---

## 設計原則

API は薄く保つ

API は service を呼び出すのみとする

ロジックは service 層に集約する

---

## セキュリティ

必要に応じて INTERNAL_API_KEY による認証を行う

---

## 注意事項

docs は SSOT である

AI は docs を最優先で参照する

docs の更新は 12_ai_update_policy.md に従う
