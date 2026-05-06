# Tasks API Alignment Design

## 目的

Tasks API における docs と code の不整合を解消し、service 層の責務を明確化する。

---

## 対象

- POST /api/tasks
- PATCH /api/tasks/:id
- GET /api/tasks

---

## 現状の問題

### 1. 実効しないパラメータ

- assignee
- duration_minutes
- list の assignee

validate / normalize は存在するが、service で使用されていない。

---

### 2. 仕様未確定

#### assignee

- 現在: "@name" 形式
- 問題: Todoist は assignee_id を要求
- 不足: name → id 解決仕様

---

## 設計方針

### 原則

- API は構造を受けるのみ
- 変換は service 層に集約
- 外部依存仕様は service に閉じる

---

## パラメータ別方針

### duration_minutes

#### 方針

- service で Todoist の duration に変換

#### 変換

- duration_minutes → duration

#### 対応

- create / update 両方で対応

---

### list の assignee

#### 方針

- 一旦未対応とする

#### 理由

- Todoist 側の filtering が assignee_id ベース
- name ベースではフィルタ不可

#### 対応

- docs から削除 or 未対応明記

---

### assignee

#### 方針

段階的対応

---

#### Phase1（現実対応）

- API では受け取るが無視する
- docs に未対応を明記

---

#### Phase2（将来）

- name → assignee_id 解決 service を導入

必要要素

- ユーザー対応表（name → id）
- キャッシュ or 設定ファイル

---

## service 層責務

追加責務

- duration 変換

将来責務

- assignee 解決

---

## docs 変更方針

### 03_api_spec.md

- assignee → 未対応明記
- duration_minutes → 実装済みに合わせる
- list assignee → 削除 or 制限明記

---

## 実装方針

変更箇所

- src/services/tasks/service.js
  - duration 対応追加

- src/services/todoist/client.js
  - duration パラメータ受け取り確認

---

## 非対象

- assignee 解決ロジック実装
- Todoist ユーザー同期

---

## 結論

- duration は実装対応
- assignee は仕様保留
- list assignee は削除または未対応

これにより docs / code の整合を回復する
