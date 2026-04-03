# 2026-04-03 Docs 10 Repo Resource API Update Draft

## 目的

`docs/10_repo_resource_api.md` を、現行の repo-resource 実装に整合する内容へ更新するための草案を作る。

既存の `10_repo_resource_api.md` は API の基本方針自体は維持できているが、
実装状況、対応 action、notes / code の読取方式に関して、
現在の code 実装との差分が生じている。

本草案では、現行実装との差分を明文化し、
先に docs へ反映すべき内容と、後続で設計すべき内容を切り分ける。

---

## 背景

現在の `docs/10_repo_resource_api.md` には以下のズレがある。

- `notes update` が「整備予定」のままになっている
- `code read / create / update` が「整備予定」のままになっている
- `notes delete` が API 一覧に存在しない
- docs の repo-resource 統合が「移行予定」と書かれているが、実装では `docs list / read / bulk` が利用可能
- `notes bulk` が存在しない
- `code bulk` が存在しない
- notes の path 例が旧構造前提になっている
- code 側には旧 `src/services/github-repo-resource.js` が残っている

一方で、現行の code では以下が存在する。

- `api/repo-resource.js`
- `src/services/repo-resource/docs.js`
- `src/services/repo-resource/notes.js`
- `src/services/repo-resource/code.js`
- `src/services/repo-resource/common.js`

実装されている action は以下である。

- docs
  - list
  - read
  - bulk

- notes
  - tree
  - read
  - create
  - update
  - delete

- code
  - tree
  - read
  - create
  - update

そのため、docs 側でも現実の API 仕様を反映し直す必要がある。

---

## 現行 code 実装の確認結果

### 1. handler

`api/repo-resource.js` では以下の routing が実装されている。

- GET
  - docs: `list / read / bulk`
  - notes: `tree / read`
  - code: `tree / read`

- POST
  - notes: `create / update / delete`
  - code: `create / update`

### 2. docs service

`src/services/repo-resource/docs.js` では以下が実装済み。

- `listDocs`
- `readDoc`
- `bulkReadDocs`

### 3. notes service

`src/services/repo-resource/notes.js` では以下が実装済み。

- `treeNotes`
- `readNote`
- `createNote`
- `updateNote`
- `deleteNote`

### 4. code service

`src/services/repo-resource/code.js` では以下が実装済み。

- `treeCode`
- `readCode`
- `createCode`
- `updateCode`

### 5. 共通 service

`src/services/repo-resource/common.js` では以下が共通化されている。

- `createError`
- `githubRequest`
- `buildDocsPath`
- `buildNotesPath`
- `buildCodePath`
- `getContentFile`
- `putContentFile`
- `deleteContentFile`
- `getRepoTree`
- `formatReadResponse`

---

## docs と code の主な差分

### 1. 実装状況の差分

`docs/10_repo_resource_api.md` では以下が未実装扱いになっている。

- notes の update
- code の read / create / update
- docs の repo-resource 統合

ただし code ではすでに実装済みである。

### 2. action 一覧の差分

docs の統合後 API 一覧には以下がない。

- `POST /api/repo-resource?action=delete&resource=notes`

ただし code では `notes delete` が実装済みである。

### 3. 読取方式の差分

docs では `docs bulk` のみが存在する。

ただし実運用では、notes も複数ファイルを同時に読む需要が高い。

例:
- handover + operations + design の同時読取
- monthly 作成前の日報複数読取
- README + related design の同時読取

そのため `notes bulk` を追加した方が構造的に自然である。

### 4. path 例の差分

docs 内の notes path 例は旧 `design/...` `inbox/...` 前提が残っている。

現行運用は indexed path に移っている。

例:
- `02_design/...`
- `00_inbox/...`
- `04_operations/...`

### 5. code 側不整合

`src/services/repo-resource/notes.js` の delete 許可 prefix は以下である。

- `inbox/`
- `exploration/`
- `logs/`
- `design/`

これは現行 notes path と整合していない。

現行では少なくとも以下に寄せる必要がある。

- `00_inbox/`
- `02_design/`
- `10_logs/`

### 6. 旧実装の残置

`src/services/github-repo-resource.js` が repo に残っている。

現行の `src/services/repo-resource/*` と責務が重複しているため、
残置資産として扱うか、削除対象とするかの判断が必要である。

---

## 反映したいポイント

### 1. 実装状況の更新

少なくとも以下は docs 側で実装済みに更新する。

- notes update
- code read
- code create
- code update
- docs repo-resource list / read / bulk

### 2. notes delete の追記

統合後 API 一覧に以下を追加する。

- `POST /api/repo-resource?action=delete&resource=notes`

### 3. notes bulk の追加

統合後 API 一覧に以下を追加する。

- `GET /api/repo-resource?action=bulk&resource=notes&files=FILENAME1,FILENAME2,...`

必要性:
- 実運用上の複数読取需要が高い
- docs / notes / code の読取契約を揃えやすい
- ADAM の再開・差分確認フローと相性が良い

### 4. code bulk の位置づけ

`code bulk` も将来的には追加価値が高い。

候補:
- `GET /api/repo-resource?action=bulk&resource=code&files=FILENAME1,FILENAME2,...`

ただし code はファイルサイズや件数の制約が必要になるため、
notes bulk より後段で導入する。

### 5. path 例の更新

notes 例は現行 path へ合わせる。

例:
- `02_design/new-spec.md`
- `00_inbox/dev_memo/...`
- `04_operations/...`

---

## 推奨判断

### 1. 先に docs へ反映するもの

- 実装状況の更新
- notes delete の追加
- notes path 例の現行化
- notes bulk の追加方針

### 2. docs に書いてよいが、後続実装扱いにするもの

- code bulk の追加方針

### 3. docs ではなく code 側タスクとして扱うもの

- notes delete prefix の現行 path 対応
- 旧 `src/services/github-repo-resource.js` の整理

---

## docs/10 に入れたい更新要点

### 統合後 API 一覧

追加候補:

- GET /api/repo-resource?action=bulk&resource=notes&files=FILENAME1,FILENAME2,...
- POST /api/repo-resource?action=delete&resource=notes
- GET /api/repo-resource?action=bulk&resource=code&files=FILENAME1,FILENAME2,...（後続候補）

### 実装状況

更新候補:

- GET /api/repo-resource?action=list&resource=docs：実装済み
- GET /api/repo-resource?action=read&resource=docs：実装済み
- GET /api/repo-resource?action=bulk&resource=docs：実装済み
- GET /api/repo-resource?action=tree&resource=notes：実装済み
- GET /api/repo-resource?action=read&resource=notes：実装済み
- POST /api/repo-resource?action=create&resource=notes：実装済み
- POST /api/repo-resource?action=update&resource=notes：実装済み
- POST /api/repo-resource?action=delete&resource=notes：実装済み
- GET /api/repo-resource?action=tree&resource=code：実装済み
- GET /api/repo-resource?action=read&resource=code：実装済み
- POST /api/repo-resource?action=create&resource=code：実装済み
- POST /api/repo-resource?action=update&resource=code：実装済み
- GET /api/repo-resource?action=bulk&resource=notes：未実装
- GET /api/repo-resource?action=bulk&resource=code：未実装

---

## 実装タスクとして残すもの

### 1. notes bulk

優先度: 高

理由:
- 再開、差分確認、月報生成などの複数読取需要が高い

### 2. code bulk

優先度: 中

理由:
- 実装と仕様の横断確認で有効
- ただしサイズ制御が必要

### 3. notes delete prefix 修正

優先度: 高

理由:
- 現行 path と delete 許可条件がずれている

### 4. 旧 service の整理

優先度: 中

対象:
- `src/services/github-repo-resource.js`

---

## 影響範囲

- docs/10_repo_resource_api.md
- code/src/services/repo-resource/notes.js
- code/src/services/github-repo-resource.js

---

## 判断

`docs/10_repo_resource_api.md` は更新対象とする。

特に先に整合させる価値が高いのは以下。

- 実装状況の更新
- notes delete の明記
- notes bulk の追加方針
- code bulk の位置づけ整理
- notes path 例の現行化
