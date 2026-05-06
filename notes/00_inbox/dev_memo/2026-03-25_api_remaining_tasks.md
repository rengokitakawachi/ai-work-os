# API積み残し整理メモ

## 概要

Repo / Todoist / Docs / Code / Notes API の現状を踏まえた積み残しの整理。

---

## 1. Repo / Docs / Code / Notes API（最優先）

### docs 整合不足

- 10_repo_resource_api.md が現状実装とズレている
- 実装済み内容が「未実装」として記述されている

対象差分

- repo-resource による docs list/read/bulk 実装済み
- notes create/update/delete 実装済み
- code read/create/update 実装済み
- delete（notes/design含む）が未反映

対応

- docs を現状実装に合わせて更新

---

## 2. Repo API エラー構造（auth）

### 問題

internal-auth.js のエラーが簡易形式

不足項目

- category
- step
- resource
- action
- status
- retryable
- request_id

影響

- repo-resource のエラー仕様と不整合

対応

- auth エラーも構造化エラーへ統一
- request_id を handler から伝播

---

## 3. Tasks API 実効パラメータ不足

### create / update

- assignee が assignee_id に変換されていない
- duration_minutes が未使用

### list

仕様

- assignee
- status

実装

- upstream query に未反映

影響

- 入力は受けるが実際の動作に反映されない

対応

- assignee → assignee_id 解決処理追加
- duration の扱い方針決定
- list query に assignee / status を反映

---

## 4. Action 実行レイヤー（delete）

### 状態

- API 側は delete 完成
- Action 実行時に content 空指定が必要

問題

- スキーマと実行仕様が完全一致していない

対応

- content 不要で delete 実行可能に調整

---

## 完了済み（確認）

- notes delete 実装
- design 配下 delete 許可
- repo-resource handler の create/update/delete
- code read/create/update
- 構造化エラー（基本形）
- Todoist 基本 CRUD

---

## 優先順位

1. repo_resource_api.md 更新
2. auth エラー構造統一
3. Tasks API 実効性修正
4. Action delete 調整

---

## 補足

最大のリスクは「仕様と実装のズレの固定化」である。

現段階では実装が先行しているため、
docs を早期に追従させる必要がある。
