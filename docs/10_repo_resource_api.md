# 10_repo_resource_api.md

## 目的

本ドキュメントは、AI Work OS における repo access API の仕様を定義する。

本 API は、docs（SSOT）の取得、notes の読書き、code の読書き、repository-level operation を支える開発基盤である。

現状の docs 専用 API を定義しつつ、repo-resource 統合方針と現行実装状態を定義する。

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

docs の修正案は notes/02_design を経由して人間が判断する。

branch は GitHub branch selector を示す。

branch が省略された場合は、環境変数 GITHUB_BRANCH を使用する。

GITHUB_BRANCH も未設定の場合は main を使用する。

branch は repo-resource API の request-level option とする。

branch は docs / notes / code の read 系 action と notes / code の write 系 action に適用する。

branch は docs の write を許可するものではない。

repo は repository-level operation を扱う resource とする。

repo resource は docs / notes / code の file access とは分離する。

現行の repo resource は branch create のみを許可する。

branch create は repository-level ref mutation であり、docs / notes / code の read / write 権限を拡張しない。

branch create における branch は target branch を示す。

branch create における from_branch は source branch を示す。

from_branch が省略された場合は main を使用する。

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
- docs の修正案は notes/02_design に整理する
- notes は補助レイヤーとして扱う
- code は docs に従属する
- API は薄く保つ
- API は service を呼び出すのみとする
- ロジックは service 層に集約する
- resource ごとに権限を分離する
- repo resource は repository-level operation のみを扱う
- repo resource は docs / notes / code の file path を扱わない
- branch create は feature/* branch の作成に限定する
- branch create は branch delete / PR creation / merge / force update を含まない
- エラーは構造化して返す
- エラーは解析可能な最小限の文脈を保持する
- branch selector は request-level option とする
- branch selector は docs / notes / code の参照先 branch を切り替える
- branch selector は write 権限を拡張しない
- docs は branch selector 使用時も read only とする

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
- GET /api/repo-resource?action=bulk&resource=notes&files=FILENAME1,FILENAME2,...
- POST /api/repo-resource?action=create&resource=notes
- POST /api/repo-resource?action=update&resource=notes
- POST /api/repo-resource?action=delete&resource=notes
- GET /api/repo-resource?action=tree&resource=code
- GET /api/repo-resource?action=read&resource=code&file=FILENAME
- GET /api/repo-resource?action=bulk&resource=code&files=FILENAME1,FILENAME2,...
- POST /api/repo-resource?action=create&resource=code
- POST /api/repo-resource?action=update&resource=code
- POST /api/repo-resource?action=create_branch&resource=repo

すべての repo-resource GET action は optional query parameter branch を受け取る。

例

- GET /api/repo-resource?action=read&resource=code&file=api/repo-resource.js&branch=feature/example
- GET /api/repo-resource?action=tree&resource=notes&branch=feature/example

repo-resource POST action は request body に optional branch を受け取る。

例

```json
{
  "file": "02_design/example.md",
  "content": "# example",
  "branch": "feature/example"
}
```

repo create_branch action は request body に target branch と optional source branch を受け取る。

例

```json
{
  "branch": "feature/example",
  "from_branch": "main",
  "message": "create feature branch"
}
```

### 実装状況

- GET /api/docs：実装済み
- GET /api/docs-read：実装済み
- GET /api/docs-bulk：実装済み
- GET /api/repo-resource?action=list&resource=docs：実装済み
- GET /api/repo-resource?action=read&resource=docs：実装済み
- GET /api/repo-resource?action=bulk&resource=docs：実装済み
- GET /api/repo-resource?action=tree&resource=notes：実装済み
- GET /api/repo-resource?action=read&resource=notes：実装済み
- GET /api/repo-resource?action=bulk&resource=notes：実装済み
- POST /api/repo-resource?action=create&resource=notes：実装済み
- POST /api/repo-resource?action=update&resource=notes：実装済み
- POST /api/repo-resource?action=delete&resource=notes：実装済み
- GET /api/repo-resource?action=tree&resource=code：実装済み
- GET /api/repo-resource?action=read&resource=code：実装済み
- GET /api/repo-resource?action=bulk&resource=code：実装済み
- POST /api/repo-resource?action=create&resource=code：実装済み
- POST /api/repo-resource?action=update&resource=code：実装済み
- POST /api/repo-resource?action=create_branch&resource=repo：実装済み
- repoResource branch selector：main code / repo schema / runtime-visible schema / explicit read-write behavior 確認済み
- repoResource branch create：main code / repo schema / runtime-visible schema / actual create behavior / read-back 確認済み
- repoResource bulk files separator：comma / newline 両対応を実装済み、runtime-visible behavior 確認済み
- docs の update：当面は実装しない

### resource 定義

### docs

正式仕様を保持する resource とする。

SSOT として扱う。

read only とする。

### notes

未確定情報、設計草案、意思決定ログを保持する resource とする。

補助レイヤーとして扱う。

read / create / update / delete を許可する。

### code

実装資産を保持する resource とする。

docs に従属する。

read / create / update を許可する。

### repo

repository-level operation を保持する resource とする。

現行では branch create のみを許可する。

repo resource は file path を扱わない。

repo resource は docs / notes / code の read / write 権限を拡張しない。

branch create は GitHub ref creation を service 層で実行する。

branch delete、branch rename、force update、PR creation、merge automation は現行範囲に含めない。

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

docs / notes / code における関連仕様や関連実装の同時参照に使用する。

files parameter は comma 区切りと newline 区切りの両方を受け付ける。

例

```text
03_api_spec.md,04_data_model.md,10_repo_resource_api.md
```

または

```text
03_api_spec.md
04_data_model.md
10_repo_resource_api.md
```

comma と newline が混在してもよい。

### create

新規ファイルを作成する。

notes / code resource に使用する。

### update

既存ファイルを更新する。

notes / code resource に使用する。

### delete

既存ファイルを削除する。

notes resource に使用する。

### create_branch

GitHub branch を作成する。

repo resource に使用する。

feature branch 作成のみを対象とする。

`branch` は作成する target branch を示す。

`from_branch` は source branch を示す。

`from_branch` が省略された場合は `main` を使用する。

`message` は operation trace として扱う。

create_branch は file content を作成・更新・削除しない。

### branch

GitHub branch selector を示す optional parameter とする。

GET action では query parameter として受け取る。

POST action では request body field として受け取る。

branch が指定された場合、GitHub read / write / tree operation は指定 branch を対象にする。

branch が省略された場合、環境変数 GITHUB_BRANCH を使用する。

GITHUB_BRANCH も未設定の場合、main を使用する。

branch は以下の場合に invalid とする。

- .. を含む
- / で始まる
- / で終わる
- \ を含む
- // を含む
- .lock で終わる
- 空白または Git ref として危険な記号を含む

invalid branch の場合は INVALID_REQUEST を返す。

branch selector と branch create の `branch` は文脈により意味が異なる。

read / write / tree action における `branch` は対象 Git branch selector である。

repo create_branch action における `branch` は作成する target branch である。

repo create_branch action の source branch は `from_branch` で指定する。

---

### docs 一覧取得

エンドポイント

GET /api/docs

概要

docs フォルダ内のファイル一覧を取得する。

レスポンス例

```json
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
```

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

```json
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
```

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
  comma 区切りまたは newline 区切りのファイル名一覧
  例：03_api_spec.md,04_data_model.md,10_repo_resource_api.md

レスポンス例

```json
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
```

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

GET /api/repo-resource?action=bulk&resource=notes&files=FILENAME1,FILENAME2,...

概要

指定した複数の notes ファイルを一括取得する。

files は comma 区切りまたは newline 区切りを受け付ける。

用途

- handover と operations の同時読取
- related design の同時読取
- reports の複数参照
- README と関連メモの横断確認
- intake review や review system における複数メモの同時参照

### notes 作成

エンドポイント

POST /api/repo-resource?action=create&resource=notes

概要

notes 配下に新規ファイルを作成する。

リクエスト例

```json
{
  "file": "02_design/new-spec.md",
  "content": "# title"
}
```

branch 指定例

```json
{
  "file": "02_design/new-spec.md",
  "content": "# title",
  "branch": "feature/example"
}
```

### notes 更新

エンドポイント

POST /api/repo-resource?action=update&resource=notes

概要

notes 配下の既存ファイルを更新する。

リクエスト例

```json
{
  "file": "02_design/new-spec.md",
  "content": "# updated title"
}
```

branch 指定例

```json
{
  "file": "02_design/new-spec.md",
  "content": "# updated title",
  "branch": "feature/example"
}
```

### notes 削除

エンドポイント

POST /api/repo-resource?action=delete&resource=notes

概要

notes 配下の既存ファイルを削除する。

branch 指定例

```json
{
  "file": "02_design/new-spec.md",
  "branch": "feature/example"
}
```

補足

delete は全レイヤーに許可しない。

現行の delete 許可範囲は以下とする。

- 00_inbox/
- 01_issues/
- 02_design/
- 03_plan/
- 04_operations/
- 05_decisions/
- 08_analysis/
- 09_content/

以下は delete 非許可とする。

- 06_handover/
- 07_reports/
- 10_logs/
- 99_archive/

### code 読取

エンドポイント

GET /api/repo-resource?action=tree&resource=code

概要

code 配下の階層一覧を取得する。

GET /api/repo-resource?action=read&resource=code&file=FILENAME

概要

指定した code ファイルの本文を取得する。

GET /api/repo-resource?action=bulk&resource=code&files=FILENAME1,FILENAME2,...

概要

指定した複数の code ファイルを一括取得する。

files は comma 区切りまたは newline 区切りを受け付ける。

補足

現時点で実装済みである。

将来的には件数とサイズの制御を追加してよい。

### code 作成

エンドポイント

POST /api/repo-resource?action=create&resource=code

概要

code 配下に新規ファイルを作成する。

リクエスト例

```json
{
  "file": "src/services/example.js",
  "content": "export function example() {}"
}
```

branch 指定例

```json
{
  "file": "src/services/example.js",
  "content": "export function example() {}",
  "branch": "feature/example"
}
```

### code 更新

エンドポイント

POST /api/repo-resource?action=update&resource=code

概要

code 配下の既存ファイルを更新する。

リクエスト例

```json
{
  "file": "src/services/example.js",
  "content": "export function example() { return true; }"
}
```

branch 指定例

```json
{
  "file": "src/services/example.js",
  "content": "export function example() { return true; }",
  "branch": "feature/example"
}
```

### repo branch 作成

エンドポイント

POST /api/repo-resource?action=create_branch&resource=repo

概要

GitHub branch を作成する。

現行では `feature/` で始まる target branch のみ作成できる。

branch create は repository-level mutation であり、docs / notes / code の file access とは分離する。

リクエスト例

```json
{
  "branch": "feature/example",
  "from_branch": "main",
  "message": "create feature branch"
}
```

パラメータ

- branch
  作成する target branch。必須。
- from_branch
  source branch。任意。省略時は main。
- message
  operation trace。任意。

成功レスポンス例

```json
{
  "ok": true,
  "data": {
    "branch": "feature/example",
    "from_branch": "main",
    "source_sha": "SOURCE_COMMIT_SHA",
    "ref": "refs/heads/feature/example",
    "status": "CREATED"
  },
  "request_id": "REQ_ID"
}
```

validation

- branch は必須
- branch は `feature/` で始まる必要がある
- branch は `main` にできない
- branch は from_branch と同一にできない
- branch / from_branch は Git ref として危険な文字列を含められない

主なエラー

- INVALID_REQUEST
  branch missing / invalid branch / non-feature branch / target equals source
- NOT_FOUND
  from_branch が存在しない
- ALREADY_EXISTS
  target branch が既に存在する
- GITHUB_ERROR
  GitHub ref create response が不正

非対象

- branch delete
- branch rename
- force update ref
- pull request creation
- merge automation
- branch protection operation

### repo-resource レスポンス

repo-resource の read / tree / write response は、resolved branch を data.branch に含める。

bulk response では、各 file item に branch を含める。

branch が省略された場合も、実際に使用された branch を返す。

例

```json
{
  "ok": true,
  "data": {
    "name": "repo-resource.js",
    "path": "api/repo-resource.js",
    "sha": "xxx",
    "branch": "main",
    "content": "...",
    "content_length": 1234,
    "fetched_at": "2026-04-27T00:00:00Z",
    "status": "OK"
  },
  "request_id": "REQ_ID"
}
```

repo create_branch response では、data.branch は作成された target branch を示す。

repo create_branch response では、data.from_branch に source branch を含める。

repo create_branch response では、data.source_sha に source branch の commit SHA を含める。

repo create_branch response では、data.ref に作成された Git ref を含める。

### docs 修正フロー

AI は docs を直接更新しない。

修正が必要な場合は以下の順で処理する。

AI
↓
GET /api/docs-read
↓
差分生成
↓
notes/02_design に草案整理
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
- notes は read / create / update / delete
- code は read / create / update
- repo は create_branch のみ

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
- GitHub ref creation

### 認証方式

以下のいずれかで認証を行う。

- Authorization ヘッダー（Bearer）
- x-api-key ヘッダー
- query パラメータ（key）

INTERNAL_API_KEY が未設定の場合は認証をスキップする。

一致した場合のみアクセスを許可する。

認証失敗時は以下を返す。

```json
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
```

### セキュリティ

- INTERNAL_API_KEY による認証を行う
- docs は GitHub 上の正本を参照する
- GitHub URL を直接参照しない
- resource 外のパスを許可しない
- details には秘密情報を含めない
- branch は path ではないが、Git ref として検証する
- branch validation は service 層の GitHub operation 前に実行する
- branch validation 失敗時は GitHub API を呼ばない
- branch selector は resource ごとの権限を変更しない
- repo create_branch は feature/* target branch のみ許可する
- repo create_branch は main を target にできない
- repo create_branch は source branch と同一 target を作成できない
- repo create_branch は GitHub ref 作成のみを行い、file content は変更しない
- repo create_branch は branch delete / merge / PR 作成を含まない

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
- repo は file path を扱わない

### エラー仕様

API エラーは以下の形式を基本とする。

```json
{
  "ok": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "説明",
    "category": "validation | auth | routing | service | upstream | config | internal",
    "step": "失敗箇所",
    "resource": "docs | notes | code | repo",
    "action": "list | tree | read | bulk | create | update | delete | create_branch",
    "status": 400,
    "retryable": false,
    "details": {},
    "request_id": "REQ_ID"
  }
}
```

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
  対象 resource を示す。例: docs | notes | code | repo
- action
  対象 action を示す。例: list | tree | read | bulk | create | update | delete | create_branch
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
- bulkReadNotes
- createNote
- updateNote
- deleteNote
- readCode
- bulkReadCode
- createCode
- updateCode
- createBranch

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
- docs の修正案は notes/02_design を経由する
- notes を正本として扱わない

### docs 更新禁止事項

- docs を API から直接更新すること
- docs 未取得で修正案を出すこと
- notes のみを根拠に docs を確定すること
- 推測で docs を補完すること

### notes 更新ルール

- notes は補助レイヤーとして扱う
- notes/02_design を docs 直前の草案レイヤーとする
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

現状は docs 専用 API と repo-resource の主要機能が実装済みである。

到達形は repo-resource を統合 Access Layer とし、docs / notes / code / repo を一貫した方式で扱う構成とする。

ただし docs は SSOT として read only を維持する。

### branch selector の反映層

repoResource branch selector は複数層で確認する。

- code behavior
- repo schema
- configured Action / tool schema
- runtime-visible schema
- actual branch read behavior
- actual branch write behavior

schema file の更新と runtime tool schema 反映は区別する。

configured Action / tool schema は直接観測できない場合がある。

runtime-visible schema と actual branch read / write behavior が確認できた場合、ADAM runtime からの実用上の branch selector 動作は確認済みとして扱う。

### branch create の反映層

repoResource branch create は複数層で確認する。

- code behavior
- repo schema
- configured Action / tool schema
- runtime-visible schema
- actual branch create behavior
- created branch read-back behavior

schema file の更新と runtime tool schema 反映は区別する。

runtime-visible schema と actual branch create / read-back behavior が確認できた場合、ADAM runtime からの実用上の branch create 動作は確認済みとして扱う。

### notes/02_design 連携

docs に不整合や不足を見つけた場合、AI は notes/02_design に草案を整理する。

notes/02_design は docs 直前の草案レイヤーとする。

意思決定が必要な場合は notes/05_decisions に記録する。

### repo-resource との関係

repo-resource は docs / notes / code / repo の統合 Access Layer とする。

ただし、SSOT は docs のみとする。

docs は read only とし、人間判断によってのみ更新する。

repo resource は repository-level operation のための補助 resource とし、docs / notes / code の file access とは責務を分離する。

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
notes/02_design への整理

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
notes/02_design へ整理
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
- GET /api/repo-resource?action=bulk&resource=notes&files=...
- POST /api/repo-resource?action=create&resource=notes
- POST /api/repo-resource?action=update&resource=notes
- POST /api/repo-resource?action=delete&resource=notes
- GET /api/repo-resource?action=tree&resource=code
- GET /api/repo-resource?action=read&resource=code&file=...
- GET /api/repo-resource?action=bulk&resource=code&files=...
- POST /api/repo-resource?action=create&resource=code
- POST /api/repo-resource?action=update&resource=code
- POST /api/repo-resource?action=create_branch&resource=repo

### 将来の状態

将来的には AI が docs と code を取得し、仕様と実装のズレを検出する。

ただし docs の最終更新判断は人間が行う。

エラーは request_id を軸に追跡可能な状態を維持する。

repo resource は必要に応じて拡張し得るが、branch delete / PR creation / merge automation / force update は現行範囲に含めない。

### 前提条件

- docs-bulk API の安定稼働
- repo-resource の docs 統合
- code bulk API の実装
- repo create_branch API の実装
- 認証（INTERNAL_API_KEY）
- 11_doc_style.md の遵守
- 15_notes_system.md の設計に従った design 経由
