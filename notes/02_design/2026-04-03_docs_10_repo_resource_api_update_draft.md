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

- `code bulk` が統合後 API 一覧にはある一方で、実装状況と code 読取節では未実装扱いのまま残っている
- docs の repo-resource 統合や notes / code の対応 action の一部が、過去の実装状況を引きずった表現のまま残っている
- notes の path 例や delete 許可範囲など、現行運用を明文化した方がよい箇所がある
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
  - bulk
  - create
  - update
  - delete

- code
  - tree
  - read
  - bulk
  - create
  - update

そのため、docs 側でも現実の API 仕様を反映し直す必要がある。

---

## 現行 code 実装の確認結果

### 1. handler

`api/repo-resource.js` では以下の routing が実装されている。

- GET
  - docs: `list / read / bulk`
  - notes: `tree / read / bulk`
  - code: `tree / read / bulk`

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
- `bulkReadNotes`
- `createNote`
- `updateNote`
- `deleteNote`

### 4. code service

`src/services/repo-resource/code.js` では以下が実装済み。

- `treeCode`
- `readCode`
- `bulkReadCode`
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

`docs/10_repo_resource_api.md` では以下が未実装または表現不一致の状態で残っている。

- `GET /api/repo-resource?action=bulk&resource=code`
- code 読取節の `code bulk`
- docs / notes / code の一部実装状況表現

ただし code ではすでに実装済みである。

### 2. 一覧と本文の差分

統合後 API 一覧には `code bulk` が書かれているが、
実装状況には未実装と書かれ、
さらに code 読取節でも未実装と書かれている。

つまり docs 内部で自己矛盾が起きている。

### 3. path 例と運用表現の差分

docs 内の notes path 例や delete 許可範囲は、
現行運用をそのまま明文化した方が読み手にとって分かりやすい。

例:

- `02_design/...`
- `00_inbox/...`
- `04_operations/...`

### 4. 旧実装の残置

`src/services/github-repo-resource.js` が repo に残っている。

現行の `src/services/repo-resource/*` と責務が重複しているため、
残置資産として扱うか、削除対象とするかの判断が必要である。

---

## 反映したいポイント

### 1. 実装状況の更新

少なくとも以下は docs 側で実装済みに更新する。

- GET /api/repo-resource?action=bulk&resource=code
- code 読取節の `code bulk`
- docs / notes / code の各 action の現行実装状況

### 2. code bulk の位置づけ更新

`code bulk` はもはや「後続候補」ではなく、
実装済みの read 系 action である。

したがって docs では、

- 統合後 API 一覧
- 実装状況
- code 読取節
- AI Agent Integration の利用 API
- 前提条件

の各所を整合させる必要がある。

### 3. notes 運用表現の更新

notes の path 例は現行 path へ合わせる。

例:

- `02_design/new-spec.md`
- `00_inbox/dev_memo/...`
- `04_operations/...`

### 4. delete 許可範囲の明文化維持

notes delete は危険なため全レイヤー許可ではない。

現行の許可範囲を docs にそのまま保持する価値がある。

---

## 推奨判断

### 1. 先に docs へ反映するもの

- `code bulk` を実装済みへ更新
- code 読取節の補足から「未実装」表現を削除
- docs / notes / code の action 一覧と実装状況を現行実装へ合わせる
- notes path 例の現行化
- notes delete 許可範囲の明文化

### 2. docs に書いてよいが、別タスク管理にするもの

- `code bulk` の件数制御やサイズ制御
- 旧 `src/services/github-repo-resource.js` の整理
- さらに細かい auth / refresh / base_sha の統一整理

### 3. docs ではなく code / issue 側タスクとして扱うもの

- 旧 service の整理
- bulk 件数上限の導入
- 大型ファイル読取時の制御方針

---

## docs/10 に入れたい更新要点

### 統合後 API 一覧

維持 / 整合対象:

- GET /api/repo-resource?action=bulk&resource=notes&files=FILENAME1,FILENAME2,...
- POST /api/repo-resource?action=delete&resource=notes
- GET /api/repo-resource?action=bulk&resource=code&files=FILENAME1,FILENAME2,...

### 実装状況

更新候補:

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
- docs の update：当面は実装しない

---

## 最小テスト結果

`code bulk` について、最小実用範囲のテストとデバッグを実施した。

### 正常系

- `api/repo-resource.js`
- `src/services/repo-resource/code.js`

をまとめて取得できた。

### 混在系

- 存在する file
- 存在しない file

を混在させた場合、
既存 file は `ok: true`、
欠落 file は `ok: false / NOT_FOUND` で返った。

### 不正 path 系

`docs/13_dev_workflow.md` を `resource=code` の bulk に混ぜた場合、
`ok: false / INVALID_REQUEST / code path not allowed` で返った。

### 入力不足系

`files` 未指定では 400 / INVALID_REQUEST / files required となった。

### 判断

今回の最小テスト範囲では、
`code bulk` は期待動作を満たしており、
追加修正は不要だった。

---

## 実装タスクとして残すもの

### 1. bulk 件数 / サイズ制御

優先度: 中

理由:
- `code bulk` は実装済みだが、
  将来的には大量ファイルや大型ファイルに対する制御が必要になる

### 2. 旧 service の整理

優先度: 中

対象:
- `src/services/github-repo-resource.js`

### 3. auth / refresh / 共通契約の細部整理

優先度: 中

理由:
- repo-resource 全体の契約をさらに揃える余地がある

---

## 影響範囲

- docs/10_repo_resource_api.md
- api/repo-resource.js
- src/services/repo-resource/code.js
- src/services/github-repo-resource.js

---

## 判断

`docs/10_repo_resource_api.md` は更新対象とする。

特に先に整合させる価値が高いのは以下。

- `code bulk` の実装済み反映
- docs 内の自己矛盾の解消
- action 一覧と実装状況の一致
- code 読取節の整合化
- notes path / delete 運用表現の維持整理
