# 10_repo_resource_api.md

## 目的

本ドキュメントは、AI Work OS における repo access API の仕様を定義する。

本 API は、docs（SSOT）の取得、notes の読書き、code の読書きを支える開発基盤である。

現状の docs 専用 API を定義しつつ、将来的な repo-resource 統合方針を定義する。

エラー発生時は、失敗理由だけでなく、失敗箇所、分類、再試行可否を返し、解析しやすい状態を維持する。

---

## 前提 / 定義

docs は GitHub 上で管理する。

docs は SSOT である。

notes は検討メモであり、SSOT ではない。

code は実装資産であり、docs に従属する。

AI は repo access API を経由して docs / notes / code を取得する。

GitHub URL を直接参照しない。

docs の本文取得は以下の条件を満たした場合に成立する。

- レスポンスが ok: true
- data.content が存在する
- data.content が空ではない
- data.status = OK

AI にとっての docs 取得成功は、data.content を実際に参照できた状態とする。

docs-read は本文取得の正本 API とする。

docs-bulk は補助取得 API とする。

本文の最終確定には docs-read を使用する。

docs の更新は本 API の責務に含めない。

docs の修正案は notes/design を経由して人間が判断する。

request_id は 1 リクエスト単位の識別子とする。

error.category はエラー分類を示す。

error.step は失敗した処理段階を示す。

error.retryable は再試行可否を示す。

error.details は解析補助情報を示す。

---

## 基本原則

- docs は API 経由で取得する
- 本文未取得状態で判断・修正しない
- docs は read only とする
- docs の修正案は notes/design に整理する
- notes は補助レイヤーとして扱う
- code は docs に従属する
- API は薄く保つ
- API は service を呼び出すのみとする
- ロジックは service 層に集約する
- resource ごとに権限を分離する
- エラーは構造化して返す
- エラーは解析可能な最小限の文脈を保持する

---

## 処理（フロー）

### 現行 API 一覧

- GET /api/docs
- GET /api/docs-read
- GET /api/docs-bulk

### 統合後 API 一覧

- GET /api/repo-resource?action=list&resource=docs
- GET /api/repo-resource?action=read&resource=docs&file=FILENAME
- GET /api/repo-resource?action=bulk&resource=docs&files=FILENAME1,FILENAME2,...
- GET /api/repo-resource?action=tree&resource=notes
- GET /api/repo-resource?action=read&resource=notes&file=FILENAME
- POST /api/repo-resource?action=create&resource=notes
- POST /api/repo-resource?action=update&resource=notes
- GET /api/repo-resource?action=tree&resource=code
- GET /api/repo-resource?action=read&resource=code&file=FILENAME
- POST /api/repo-resource?action=create&resource=code
- POST /api/repo-resource?action=update&resource=code

### 実装状況

- GET /api/docs：実装済み
- GET /api/docs-read：実装済み
- GET /api/docs-bulk：実装済み
- GET /api/repo-resource?action=tree&resource=notes：実装済み
- GET /api/repo-resource?action=read&resource=notes：実装済み
- POST /api/repo-resource?action=create&resource=notes：実装済み
- docs の repo-resource 統合：移行予定
- notes の update：整備予定
- code の read / create / update：整備予定
- docs の update：当面は実装しない

### resource 定義

### docs

正式仕様を保持する resource とする。

SSOT として扱う。

read only とする。

### notes

未確定情報、設計草案、意思決定ログを保持する resource とする。

補助レイヤーとして扱う。

read / create / update を許可する。

### code

実装資産を保持する resource とする。

docs に従属する。

read / create / update を許可する。

### action 定義

### list

フラットな一覧を取得する。

docs resource に使用する。

### tree

階層構造を含む一覧を取得する。

notes / code resource に使用する。

### read

単一ファイル本文を取得する。

### bulk

複数ファイル本文を一括取得する。

docs resource における関連仕様の同時参照に使用する。

### create

新規ファイルを作成する。

notes / code resource に使用する。

### update

既存ファイルを更新する。

notes / code resource に使用する。

---

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
  },
  "request_id": "REQ_ID"
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
  },
  "request_id": "REQ_ID"
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
  例：03_api_spec.md,04_data_model.md,10_repo_resource_api.md

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
      "file": "10_repo_resource_api.md",
      "error": {
        "code": "NOT_FOUND",
        "message": "Document not found"
      }
    }
  ],
  "request_id": "REQ_ID"
}

用途

- 複数docsの同時参照
- 仕様不整合の検出
- 差分レビュー
- 関連ドキュメントの横断確認

### notes 読取

エンドポイント

GET /api/repo-resource?action=tree&resource=notes

概要

notes 配下の階層一覧を取得する。

GET /api/repo-resource?action=read&resource=notes&file=FILENAME

概要

指定した notes ファイルの本文を取得する。

### notes 作成

エンドポイント

POST /api/repo-resource?action=create&resource=notes

概要

notes 配下に新規ファイルを作成する。

リクエスト例

{
  "file": "design/new-spec.md",
  "content": "# title"
}

### notes 更新

エンドポイント

POST /api/repo-resource?action=update&resource=notes

概要

notes 配下の既存ファイルを更新する。

リクエスト例

{
  "file": "design/new-spec.md",
  "content": "# updated title"
}

### code 読取

エンドポイント

GET /api/repo-resource?action=tree&resource=code

概要

code 配下の階層一覧を取得する。

GET /api/repo-resource?action=read&resource=code&file=FILENAME

概要

指定した code ファイルの本文を取得する。

### code 作成

エンドポイント

POST /api/repo-resource?action=create&resource=code

概要

code 配下に新規ファイルを作成する。

リクエスト例

{
  "file": "src/services/example.js",
  "content": "export function example() {}"
}

### code 更新

エンドポイント

POST /api/repo-resource?action=update&resource=code

概要

code 配下の既存ファイルを更新する。

リクエスト例

{
  "file": "src/services/example.js",
  "content": "export function example() { return true; }"
}

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

### エラー処理フロー

API はエラー発生時に以下の順で処理する。

validation
↓
routing
↓
service
↓
upstream
↓
normalize
↓
response / log

handler は request_id を生成する。

service は createError により構造化エラーを生成する。

レスポンスは normalizeError により統一形式へ変換する。

サーバー側は request_id を含むログを出力する。

### 統合方針

現状の docs 専用 API は段階的に repo-resource へ統合する。

統合後も docs は read only とする。

docs / notes / code を同一 Access Layer で扱う。

ただし、resource ごとの権限は分離する。

- docs は read only
- notes は read / create / update
- code は read / create / update

---

## ルール（制約・禁止事項）

### API 層

API 層は薄く保つ。

API 層は以下のみを担当する。

- CORS 処理
- 認証処理
- method 判定
- resource 判定
- action 判定
- リクエスト検証
- service 呼び出し
- レスポンス整形
- request_id 付与
- エラー正規化

### service 層

repo access API のロジックは service 層に配置する。

service の責務

- GitHub REST API 呼び出し
- 認証処理
- Base64 encode / decode
- エラーハンドリング
- resource ごとのパス解決
- 本文取得結果の整形
- 構造化エラー生成

### 認証方式

以下のいずれかで認証を行う。

- Authorization ヘッダー（Bearer）
- x-api-key ヘッダー
- query パラメータ（key）

INTERNAL_API_KEY が未設定の場合は認証をスキップする。

一致した場合のみアクセスを許可する。

認証失敗時は以下を返す。

{
  "ok": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Unauthorized",
    "category": "auth",
    "step": "auth",
    "resource": "",
    "action": "",
    "status": 401,
    "retryable": false,
    "details": {},
    "request_id": "REQ_ID"
  }
}

### セキュリティ

- INTERNAL_API_KEY による認証を行う
- docs は GitHub 上の正本を参照する
- GitHub URL を直接参照しない
- resource 外のパスを許可しない
- details には秘密情報を含めない

### CORS

以下を許可する。

- Access-Control-Allow-Origin: *
- Access-Control-Allow-Headers: Content-Type, Authorization, x-api-key
- Access-Control-Allow-Methods: GET, POST, OPTIONS

OPTIONS リクエストは本文処理を行わず終了する。

### パス検証

以下を禁止する。

- 空の file
- .. を含む path
- resource 外への path 指定
- 先頭 / を含む path

resource ごとの基底パスに固定する。

- docs は docs/
- notes は notes/
- code は code 用の許可パス

### エラー仕様

API エラーは以下の形式を基本とする。

{
  "ok": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "説明",
    "category": "validation | auth | routing | service | upstream | config | internal",
    "step": "失敗箇所",
    "resource": "docs | notes | code",
    "action": "list | tree | read | bulk | create | update",
    "status": 400,
    "retryable": false,
    "details": {},
    "request_id": "REQ_ID"
  }
}

項目定義

- code
  エラーコードを示す
- message
  人が読める概要を示す
- category
  エラー分類を示す
- step
  失敗した処理段階を示す
- resource
  対象 resource を示す
- action
  対象 action を示す
- status
  HTTP ステータスを示す
- retryable
  再試行可否を示す
- details
  解析補助情報を示す
- request_id
  ログと照合するための識別子を示す

details の例

- field
- missing
- github_path
- upstream_status
- upstream_message
- method
- file
- files_count

主なエラーコード

- INVALID_REQUEST
- UNAUTHORIZED
- NOT_FOUND
- RATE_LIMIT
- UPSTREAM_TIMEOUT
- UPSTREAM_5XX
- METHOD_NOT_ALLOWED
- RESOURCE_NOT_SUPPORTED
- ACTION_NOT_SUPPORTED
- CONFIG_ERROR
- GITHUB_ERROR
- GITHUB_NOT_FOUND
- GITHUB_UNAUTHORIZED
- GITHUB_RATE_LIMIT
- ALREADY_EXISTS
- CONFLICT
- UNKNOWN_ERROR

category 定義

- validation
  入力不正
- auth
  認証失敗
- routing
  method / resource / action の不一致
- service
  service 層の処理失敗
- upstream
  GitHub API など外部依存の失敗
- config
  環境変数など設定不備
- internal
  想定外の内部失敗

step の例

- auth
- handler
- validateGet
- validatePost
- dispatchGet
- dispatchPost
- githubRequest
- readDoc
- bulkReadDocs
- readNote
- createNote
- updateNote
- readCode
- createCode
- updateCode

retryable の原則

- validation は false
- auth は false
- routing は false
- config は false
- upstream timeout は true
- upstream 5xx は true
- rate limit は true
- not found は false
- conflict は false

### ログ仕様

サーバー側はエラー発生時に構造化ログを出力する。

ログには以下を含める。

- request_id
- method
- resource
- action
- code
- message
- category
- step
- status
- retryable
- details

cause が存在する場合は、内部ログにのみ保持する。

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

### notes 更新ルール

- notes は補助レイヤーとして扱う
- notes/design を docs 直前の草案レイヤーとする
- notes の構造を壊さない
- docs と矛盾する場合は docs を正とする

### code 更新ルール

- code は docs に従属する
- code の変更は docs との整合を前提とする
- 大規模な一括書き換えを避ける
- 危険な操作は段階的に導入する

---

## 補足

### 現状と到達形

現状は docs 専用 API と notes の一部機能が実装済みである。

到達形は repo-resource を統合 Access Layer とし、docs / notes / code を一貫した方式で扱う構成とする。

### notes/design 連携

docs に不整合や不足を見つけた場合、AI は notes/design に草案を整理する。

notes/design は docs 直前の草案レイヤーとする。

意思決定が必要な場合は notes/decisions に記録する。

### repo-resource との関係

repo-resource は docs / notes / code の統合 Access Layer とする。

ただし、SSOT は docs のみとする。

docs は read only とし、人間判断によってのみ更新する。

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

6
code との整合確認

7
失敗時の解析可能なエラー記録

処理フロー

AI Agent
↓
GET /api/docs-bulk
↓
docs 取得
↓
GET /api/repo-resource?action=read&resource=code&file=...
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
↓
code 反映

利用API

- GET /api/docs
- GET /api/docs-read
- GET /api/docs-bulk
- GET /api/repo-resource?action=tree&resource=notes
- GET /api/repo-resource?action=read&resource=notes&file=...
- POST /api/repo-resource?action=create&resource=notes
- POST /api/repo-resource?action=update&resource=notes
- GET /api/repo-resource?action=tree&resource=code
- GET /api/repo-resource?action=read&resource=code&file=...
- POST /api/repo-resource?action=create&resource=code
- POST /api/repo-resource?action=update&resource=code

### 将来の状態

将来的には AI が docs と code を取得し、仕様と実装のズレを検出する。

ただし docs の最終更新判断は人間が行う。

エラーは request_id を軸に追跡可能な状態を維持する。

### 前提条件

- docs-bulk API の安定稼働
- repo-resource の docs 統合
- notes の update API の整備
- code の read / create / update API の整備
- 認証（INTERNAL_API_KEY）
- 11_doc_style.md の遵守
- 15_notes_system.md の設計に従った design 経由
