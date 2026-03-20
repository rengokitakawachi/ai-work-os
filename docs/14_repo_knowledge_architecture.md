# 14 Repo Knowledge Architecture

## 目的

GitHubリポジトリ全体を
AIが「読む」から「理解する」状態へ進化させる

---

## 対象

・docs
・code
・config
・テンプレート

---

## 全体構造

GitHub
↓
Vercel API
↓
Index / Search
↓
AI Work OS

---

## 構成レイヤー

### 1 Source

GitHub（SSOTの実体）

---

### 2 Access Layer

Vercel API

・docs-read
・code-read
・repo-tree
・diff-read

---

### 3 Index Layer

・チャンク分割
・メタデータ付与
・Embedding生成

保存

Postgres + pgvector

---

### 4 Search Layer

ハイブリッド検索

#### Exact Search

・ファイル名
・関数名
・パス

#### Semantic Search

・自然文検索
・設計意図検索

---

### 5 Reasoning Layer

AIは必ず

1 原文取得
2 関連コード取得
3 必要なら差分取得

を行う

---

## Phase構成

### Phase1

docs API（既存）

---

### Phase2

・code-read API
・repo-tree API

---

### Phase3

全文インデックス化

---

### Phase4

自動同期

・GitHub Webhook
・差分更新
・Vercel Cron

---

## 更新フロー

GitHub push
↓
Webhook
↓
差分取得
↓
再インデックス

---

## 目的の本質

・仕様と実装のズレ検出
・自然文検索の実現
・差分追跡
・根拠ベース回答
