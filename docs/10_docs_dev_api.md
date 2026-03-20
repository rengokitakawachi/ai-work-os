# 10_docs_dev_api

## 目的

本ドキュメントは、AI Work OS における docs 操作用 API の仕様を定義する。

本 API は、docs（SSOT）を取得・更新するための開発基盤である。

---

## 前提 / 定義

docs は GitHub 上で管理する。

AI は docs API を通じてのみ docs を読み書きする。

GitHub URL を直接参照しない。

docs の本文取得は以下の条件を満たした場合に成立する。

- レスポンスが ok: true
- data.content が存在する
- data.content が空ではない

AI にとっての取得成功は、data.content を実際に参照できた状態とする。

docs-read は本文取得の正本 API とする。

docs-bulk は補助取得 API とする。

本文の最終確定には docs-read を使用する。

---

## 基本原則

- docs は API 経由で取得する
- 本文未取得状態で判断・修正しない
- API は薄く保つ
- API は service を呼び出すのみとする
- ロジックは service 層に集約する

---

## 処理（フロー）

### API 一覧

- GET /api/docs
- GET /api/docs-read
- GET /api/docs-bulk
- POST /api/docs-update（予定）

### 実装状況

- GET /api/docs：実装済み
- GET /api/docs-read：実装済み
- GET /api/docs-bulk：実装済み
- POST /api/docs-update：未実装

### docs 一覧取得

エンドポイント

GET /api/docs

概要

docs フォルダ内のファイル一覧を取得する。

レスポンス例

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

### docs 本文取得

エンドポイント

GET /api/docs-read?file=FILENAME

概要

指定した docs ファイルの本文を取得する。

パラメータ

- file  
  対象ファイル名（例：08_dev_config.md）
- refresh（任意）  
  true の場合、キャッシュを使用せず最新を取得する

レスポンス例

  {
    "ok": true,
    "data": {
      "name": "08_dev_config.md",
      "path": "docs/08_dev_config.md",
      "sha": "xxx",
      "content": "Markdown本文",
      "content_length": 1234,
      "fetched_at": "2026-03-20T10:00:00Z",
      "status": "OK"
    }
  }

status 定義

- OK  
  本文取得成功
- EMPTY  
  content が空
- NOT_READY  
  反映遅延などで取得不可
- NOT_FOUND  
  ファイル未存在
- ERROR  
  取得失敗

### docs 一括取得

エンドポイント

GET /api/docs-bulk?files=FILENAME1,FILENAME2,...

概要

指定した複数の docs ファイルを一括取得する。

AI による整合チェック、差分検出、関連 docs の同時参照に使用する。

パラメータ

- files  
  カンマ区切りのファイル名一覧  
  例：03_api_spec.md,04_data_model.md,10_docs_dev_api.md

レスポンス例

  {
    "ok": true,
    "files": [
      {
        "ok": true,
        "file": "03_api_spec.md",
        "name": "03_api_spec.md",
        "path": "docs/03_api_spec.md",
        "sha": "xxx",
        "size": 1234,
        "content": "Markdown本文",
        "content_length": 1234,
        "fetched_at": "2026-03-20T10:00:00Z",
        "status": "OK"
      },
      {
        "ok": false,
        "file": "10_docs_dev_api.md",
        "error": {
          "code": "NOT_FOUND",
          "message": "Document not found"
        }
      }
    ]
  }

用途

- 複数docsの同時参照
- 仕様不整合の検出
- 差分レビュー
- 関連ドキュメントの横断確認

### docs 更新

エンドポイント

POST /api/docs-update（予定）

概要

docs の内容を更新し、GitHub に commit する。

リクエスト例

  {
    "file": "08_dev_config.md",
    "content": "Markdown本文"
  }

処理フロー

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

## ルール（制約・禁止事項）

### service 層

docs API のロジックは service 層に配置する。

対象ファイル

src/services/github-docs.js

service の責務

- GitHub REST API 呼び出し
- 認証処理
- Base64 デコード
- エラーハンドリング

### 認証方式

以下のいずれかで認証を行う。

- Authorization ヘッダー（Bearer）
- x-api-key ヘッダー
- query パラメータ（key）

一致した場合のみアクセスを許可する。

### セキュリティ

- INTERNAL_API_KEY による認証を行う

### エラー仕様

API エラーは以下の形式で返却する。

  {
    "ok": false,
    "error": {
      "code": "ERROR_CODE",
      "message": "説明"
    }
  }

主なエラーコード

- INVALID_REQUEST
- UNAUTHORIZED
- NOT_FOUND
- RATE_LIMIT
- UPSTREAM_TIMEOUT
- UPSTREAM_5XX
- UNKNOWN_ERROR

### 注意事項

- docs は SSOT である
- AI は docs を最優先で参照する
- 本文未取得状態で判断・修正してはならない

---

## 補足

### AI Agent Integration（将来構想）

目的

docs を基点とした自己進化ループを自動化するため、サーバー側に AI エージェントを導入する。

役割

1  
docs の取得

2  
仕様の解析

3  
不整合・不足の検出

4  
修正案の生成

5  
docs-update API による更新

処理フロー

AI Agent
↓
GET /api/docs-bulk
↓
docs 取得（必要ファイル指定）
↓
解析
↓
差分生成
↓
POST /api/docs-update
↓
GitHub commit

利用API

- GET /api/docs-bulk
- GET /api/docs-read
- POST /api/docs-update（予定）

更新ルール

- SSOT は docs のみ
- 差分最小で更新する
- 既存構造を破壊しない
- 未確定事項は更新しない
- notes を優先しない

### 将来の状態

将来的には AI エージェントが API を直接実行し、以下のループを自律的に回す。

読む
↓
理解する
↓
修正する
↓
更新する

### 前提条件

- docs-bulk API の安定稼働
- docs-update API の実装
- 認証（INTERNAL_API_KEY）
- 12_ai_update_policy.md の遵守
