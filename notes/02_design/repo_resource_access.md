# ファイル名
notes/design/repo_resource_access.md

---

# Repo Resource Access 共通仕様 初期設計案

## 目的

本設計案は
AI Work OS において
docs / notes / code へのアクセスを
共通仕様で扱うための基礎方針を定義する。

本仕様の目的は
対象ごとの役割差を維持しつつ
AI からの読取と更新の操作モデルを統一することである。

---

## 前提

対象リソースは以下の 3 種とする。

- docs
- notes
- code

それぞれの役割は異なる。

### docs

正式仕様
SSOT

### notes

思考レイヤー
未確定情報
検討材料

### code

実装実体
docs との整合確認対象

---

## 基本方針

役割は分ける

読み方と更新方法はできるだけ揃える

AI は resource を意識して対象を切り替えるが
API 契約は共通化する

---

## 操作分類

共通操作は以下の 2 系統に分ける。

### 1 読み取り系

- tree
- read
- bulk

### 2 書き込み系

- create
- append
- update

---

## resource 一覧

対象 resource は以下とする。

- docs
- notes
- code

---

## 共通 API 命名方針

### 一覧取得

GET /api/{resource}
または
GET /api/{resource}-tree

### 単体取得

GET /api/{resource}-read?file=...

### 複数取得

GET /api/{resource}-bulk?files=...

### 新規作成

POST /api/{resource}-create

### 追記

POST /api/{resource}-append

### 上書き更新

POST /api/{resource}-update

---

## 読み取り系 共通仕様

### tree

目的

- 対象一覧の把握
- path の探索
- 関連ファイルの確認
- AI が読取可能範囲を把握するための入口

レスポンス例

{
  "ok": true,
  "data": {
    "resource": "notes",
    "items": [
      {
        "name": "2026-03-20-idea.md",
        "path": "notes/inbox/2026-03-20-idea.md",
        "sha": "xxx",
        "size": 1234,
        "type": "file"
      }
    ],
    "count": 1
  }
}

---

### read

目的

- 単一ファイルの本文取得
- AI による原文参照
- 更新前確認

クエリ

- file
- refresh（任意）

refresh の意味

- true の場合はキャッシュを使わず最新を取得する

レスポンス例

{
  "ok": true,
  "data": {
    "resource": "notes",
    "name": "2026-03-20-idea.md",
    "path": "notes/inbox/2026-03-20-idea.md",
    "sha": "xxx",
    "content": "Markdown本文",
    "content_length": 1234,
    "fetched_at": "2026-03-20T12:00:00Z",
    "status": "OK"
  }
}

---

### bulk

目的

- 複数ファイルの同時取得
- 関連情報の横断確認
- 差分検討用の参照

クエリ

- files
- refresh（任意）

レスポンス例

{
  "ok": true,
  "files": [
    {
      "ok": true,
      "resource": "notes",
      "file": "inbox/2026-03-20-idea.md",
      "name": "2026-03-20-idea.md",
      "path": "notes/inbox/2026-03-20-idea.md",
      "sha": "xxx",
      "size": 1234,
      "content": "Markdown本文",
      "content_length": 1234,
      "fetched_at": "2026-03-20T12:00:00Z",
      "status": "OK"
    }
  ]
}

---

## 書き込み系 共通仕様

### create

目的

- 新規ファイルを作成する

用途

- notes/inbox への capture 保存
- notes/exploration の新規作成
- notes/design の仕様草案作成

リクエスト例

{
  "file": "inbox/2026-03-20-idea.md",
  "content": "# Capture\n\n..."
}

レスポンス例

{
  "ok": true,
  "data": {
    "resource": "notes",
    "file": "inbox/2026-03-20-idea.md",
    "path": "notes/inbox/2026-03-20-idea.md",
    "sha": "xxx",
    "status": "CREATED"
  }
}

---

### append

目的

- 既存ファイル末尾に追記する

用途

- notes/backlog/dev-backlog.md への追記
- notes/logs へのログ追記
- 短い capture の追加

リクエスト例

{
  "file": "backlog/dev-backlog.md",
  "content": "\n- notes-read API 設計\n"
}

レスポンス例

{
  "ok": true,
  "data": {
    "resource": "notes",
    "file": "backlog/dev-backlog.md",
    "path": "notes/backlog/dev-backlog.md",
    "sha": "xxx",
    "status": "APPENDED"
  }
}

---

### update

目的

- 既存ファイルを全文上書きする

用途

- notes/design の整形更新
- docs の差分最小更新
- 将来的な code 更新

リクエスト例

{
  "file": "design/repo_resource_access.md",
  "content": "全文",
  "base_sha": "xxx"
}

レスポンス例

{
  "ok": true,
  "data": {
    "resource": "notes",
    "file": "design/repo_resource_access.md",
    "path": "notes/design/repo_resource_access.md",
    "sha": "yyy",
    "previous_sha": "xxx",
    "status": "UPDATED"
  }
}

---

## append と update の使い分け

### append

短い追記向き

特徴

- 全文再生成不要
- capture やログ向き
- 軽量で事故が少ない

### update

全文整形向き

特徴

- 構造を整える更新に向く
- base_sha による整合確認が可能
- docs 更新の基本手段とする

---

## 共通取得成功条件

AI が本文取得成功と判定する条件は以下とする。

- ok = true
- data.content が存在する
- data.content が空ではない
- status = OK

bulk の場合は
各 file 要素について同じ条件で判定する。

---

## 共通エラー形式

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
- ALREADY_EXISTS
- CONFLICT
- RATE_LIMIT
- UPSTREAM_TIMEOUT
- UPSTREAM_5XX
- UNKNOWN_ERROR

---

## 共通更新原則

### 1 base_sha

update は base_sha を受け取れるようにする

目的

- 競合検知
- 更新前提の明示
- 誤上書き防止

### 2 refresh

read と bulk は refresh=true に対応する

目的

- 更新直前の最新化
- キャッシュ不整合回避

### 3 path 基準

file は resource 配下の相対 path とする

例

docs
- 10_docs_dev_api.md

notes
- inbox/2026-03-20-idea.md

code
- src/services/github-docs.js

---

## resource ごとの制約

### docs

役割

- 正式仕様
- SSOT

許可操作

- tree
- read
- bulk
- update

原則

- create は慎重運用
- append は原則使わない
- update 前に read?refresh=true を行う
- base_sha を必須に近い扱いとする
- 差分最小で更新する

---

### notes

役割

- 思考レイヤー
- 蓄積と整理

許可操作

- tree
- read
- bulk
- create
- append
- update

原則

- create を多用する
- append を多用する
- update で整理する
- 軽量入力を優先する
- 1入力 1ファイルを基本とする

---

### code

役割

- 実装実体
- docs との整合確認対象

許可操作

初期段階では以下のみ

- tree
- read
- bulk

原則

- まず read only
- update は後段で別設計
- いきなり自動上書きしない

---

## AI の利用フロー

### docs を更新する場合

tree
↓
read
↓
関連 bulk
↓
必要なら refresh read
↓
update

### notes を整理する場合

tree
↓
read
↓
必要なら bulk
↓
append または update

### code を参照する場合

tree
↓
read
↓
必要なら bulk

---

## notes 運用との接続

本共通仕様は
notes の以下の流れを支える。

inbox
↓
exploration
↓
design
↓
docs

### inbox

- create 中心
- capture の入口

### exploration

- create と update
- 機能検討の整理

### design

- update 中心
- docs 直前の仕様草案

### backlog / logs

- append を活用
- 軽量更新を優先

---

## 実装順の推奨

### Phase 1

共通仕様を notes/design に確定する

### Phase 2

notes-tree
notes-read
notes-bulk
notes-create
notes-append
notes-update

### Phase 3

既存 docs API を共通仕様に寄せる

### Phase 4

code-tree
code-read
code-bulk

### Phase 5

docs-update を共通契約で整備する

### Phase 6

必要に応じて code update を別設計する

---

## 決めておくべき論点

今後の確定が必要な論点は以下とする。

- tree と list の命名をどちらに寄せるか
- create を docs に許可するか
- append の対象を notes のみに制限するか
- update の base_sha を resource ごとに必須化するか
- code update をいつ解禁するか
- move や delete を共通仕様に含めるか

---

## 現時点の推奨判断

現時点では以下を推奨する。

- 一覧取得は tree に寄せる
- docs は update 中心
- notes は create / append / update を許可
- code は当面 read only
- update は base_sha を受け取る
- refresh は read と bulk の共通機能にする

---

## この設計の狙い

本設計の狙いは以下である。

- docs / notes / code を同じ操作モデルで扱えるようにする
- AI の読取判断を単純化する
- notes の蓄積と整理を API で支える
- docs の厳格運用を維持する
- code 参照を後から安全に追加できるようにする

---

## まとめ

分けるべきもの

- 役割
- 制約
- 更新厳格度

揃えるべきもの

- API 契約
- 取得成功条件
- レスポンス形式
- refresh
- base_sha の考え方

この共通仕様を先に設計することで
notes access の追加と
その次の code access を
無理なく同じ枠組みに載せることができる
