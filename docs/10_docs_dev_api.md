# 10_docs_dev_api

## 目的

本ドキュメントは、AI Work OS における docs 取得 API の仕様を定義する。

本 API は、docs（SSOT）を取得し、notes/design への昇格判断を支える開発基盤である。

---

## 前提 / 定義

docs は GitHub 上で管理する。

docs は SSOT である。

notes は検討メモであり、SSOT ではない。

AI は docs を API 経由で取得する。

GitHub URL を直接参照しない。

docs の本文取得は以下の条件を満たした場合に成立する。

- レスポンスが ok: true
- data.content が存在する
- data.content が空ではない
- data.status = OK

AI にとっての取得成功は、data.content を実際に参照できた状態とする。

docs-read は本文取得の正本 API とする。

docs-bulk は補助取得 API とする。

本文の最終確定には docs-read を使用する。

docs の更新は本 API の責務に含めない。

docs の修正案は notes/design を経由して人間が判断する。

---

## 基本原則

- docs は API 経由で取得する
- 本文未取得状態で判断・修正しない
- docs は read only とする
- docs の修正案は notes/design に整理する
- API は薄く保つ
- API は service を呼び出すのみとする
- ロジックは service 層に集約する

---

## 処理（フロー）

### API 一覧

- GET /api/docs
- GET /api/docs-read
- GET /api/docs-bulk

### 実装状況

- GET /api/docs：実装済み
- GET /api/docs-read：実装済み
- GET /api/docs-bulk：実装済み
- POST /api/docs-update：当面は実装しない

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

### docs 修正フロー

AI は docs を直接更新しない。

修正が必要な場合は以下の順で処理する。

AI
↓
GET /api/docs-read
↓
差分生成
↓
notes/design に草案整理
↓
人間レビュー
↓
docs 反映

### repo-resource 統合方針

docs 取得 API は将来的に repo-resource へ統合する。

統合後も docs は read only とする。

想定する取得系 action は以下とする。

- list
- read
- bulk

例

- GET /api/repo-resource?action=list&resource=docs
- GET /api/repo-resource?action=read&resource=docs&file=10_docs_dev_api.md
- GET /api/repo-resource?action=bulk&resource=docs&files=10_docs_dev_api.md,11_doc_style.md

notes および code の write 系 action とは責務を分離する。

---

## ルール（制約・禁止事項）

### service 層

docs API のロジックは service 層に配置する。

service の責務

- GitHub REST API 呼び出し
- 認証処理
- Base64 デコード
- エラーハンドリング
- docs パス解決
- 本文取得結果の整形

### 認証方式

以下のいずれかで認証を行う。

- Authorization ヘッダー（Bearer）
- x-api-key ヘッダー
- query パラメータ（key）

INTERNAL_API_KEY が未設定の場合は認証をスキップする。

一致した場合のみアクセスを許可する。

### セキュリティ

- INTERNAL_API_KEY による認証を行う
- docs は GitHub 上の正本を参照する
- GitHub URL を直接参照しない

### CORS

以下を許可する。

- Access-Control-Allow-Origin: *
- Access-Control-Allow-Headers: Content-Type, Authorization, x-api-key
- Access-Control-Allow-Methods: GET, POST, OPTIONS

OPTIONS リクエストは本文処理を行わず終了する。

### エラー仕様

API エラーは以下の形式を基本とする。

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

### docs 取得ルール

- docs は SSOT である
- AI は docs を最優先で参照する
- 本文未取得状態で判断・修正してはならない
- docs 修正前に必ず docs-read を実行する
- docs の修正案は notes/design を経由する
- notes を正本として扱わない

### docs 更新禁止事項

- docs を API から直接更新すること
- docs 未取得で修正案を出すこと
- notes のみを根拠に docs を確定すること
- 推測で docs を補完すること

---

## 補足

### notes/design 連携

docs に不整合や不足を見つけた場合、AI は notes/design に草案を整理する。

notes/design は docs 直前の草案レイヤーとする。

意思決定が必要な場合は notes/decisions に記録する。

### repo-resource との関係

将来的には repo-resource が docs / notes / code の統合 Access Layer となる。

ただし、resource ごとの権限は分離する。

- docs は read only
- notes は read / create / update
- code は read / create / update

SSOT は docs のみとする。

### AI Agent Integration

目的

docs を基点とした仕様理解と不整合検出を安定化する。

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
notes/design への整理

処理フロー

AI Agent
↓
GET /api/docs-bulk
↓
docs 取得
↓
解析
↓
差分生成
↓
notes/design へ整理
↓
人間レビュー
↓
docs 反映

利用API

- GET /api/docs
- GET /api/docs-read
- GET /api/docs-bulk

### 将来の状態

将来的には AI が docs と code を取得し、仕様と実装のズレを検出する。

ただし docs の最終更新判断は人間が行う。

### 前提条件

- docs-bulk API の安定稼働
- notes の create / update API の整備
- code の read / create / update API の整備
- 認証（INTERNAL_API_KEY）
- 11_doc_style.md の遵守
- 15_notes_system.md の設計に従った design 経由
