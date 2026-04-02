# 2026-03-27 README Alignment Update

## 目的

README.md を現行 docs と整合させる。

旧 API 表記を解消し、docs 全体への導線を更新する。

---

## 背景

README.md には旧 API 表記が残っている。

- POST /api/task/create
- GET /api/task/list

一方で現行仕様は 03_api_spec.md にて以下を定義している。

- POST /api/tasks
- PATCH /api/tasks/:id
- GET /api/tasks

また、README.md の docs 一覧は 08 までしか案内しておらず、現行 docs 構成と不整合がある。

---

## 更新方針

- 構造は維持する
- 差分最小で更新する
- 現行 docs に準拠する
- README を入口文書として再整備する
- 実装状況と API 仕様を混同しない

---

## 変更点

### API 表記

以下を更新する。

- POST /api/task/create → POST /api/tasks
- GET /api/task/list → GET /api/tasks

あわせて以下を追加する。

- PATCH /api/tasks/:id

### docs 一覧

README.md の docs 一覧を 16_governance.md まで含む現行構成へ更新する。

追加対象

- 00_docs_index.md
- 09_troubleshooting.md
- 10_repo_resource_api.md
- 11_doc_style.md
- 12_ai_update_policy.md
- 13_dev_workflow.md
- 14_repo_knowledge_architecture.md
- 15_notes_system.md
- 16_governance.md

### 現在の開発状況

README.md の「現在の開発状況」は 05_roadmap.md に整合するよう調整する。

- Phase 1: Prototype / MVP
- 概念設計とアーキテクチャは完了
- Todoist タスク登録は実装済み
- Todoist タスクの読み取り・一覧取得は未完了

### 運用ルール

README.md は入口文書として、docs / notes / code の責務分離と docs 優先の原則を短く案内する。

---

## README 修正案

```md
# AI Work OS

AIを中核UIとし、知識、戦略、実行、レビューを統合する個人用ワークシステム。

## プロジェクト概要
本プロジェクトは、業務効率を最大化し、AIを思考のパートナーとして活用するための統合基盤「AI Work OS」を構築するものです。
Todoistによるタスク管理、Obsidianによるナレッジ管理、そしてそれらを仲介するVercel APIによって構成されます。

## ドキュメント一覧
システム設計の詳細については、以下の各ドキュメントを参照してください。

- [00_docs_index](00_docs_index.md): docs 全体の構造、読取順序、取得ルール
- [01_concept](01_concept.md): 基本理念、仕事の循環、原則
- [02_architecture](02_architecture.md): 5層レイヤー構造、システム構成、同期フロー
- [03_api_spec](03_api_spec.md): API仕様、エンドポイント、エラー仕様
- [04_data_model](04_data_model.md): データ定義、SSOT の分離、タグ体系
- [05_roadmap](05_roadmap.md): 開発マイルストーン、レビュー設計、未解決課題
- [06_obsidian_design](06_obsidian_design.md): Vault 構造、MOC 設計、テンプレート定義
- [07_external_integration](07_external_integration.md): 外部サービス連携方針、セキュリティ
- [08_dev_config](08_dev_config.md): 開発環境、環境変数、ディレクトリ構造
- [09_troubleshooting](09_troubleshooting.md): 既知トラブルと再発防止策
- [10_repo_resource_api](10_repo_resource_api.md): repo access API の仕様
- [11_doc_style](11_doc_style.md): docs の記述ルール
- [12_ai_update_policy](12_ai_update_policy.md): AI の docs 更新ルール
- [13_dev_workflow](13_dev_workflow.md): 開発フローと役割分担
- [14_repo_knowledge_architecture](14_repo_knowledge_architecture.md): repo 全体の知識化アーキテクチャ
- [15_notes_system](15_notes_system.md): notes レイヤーの運用設計
- [16_governance](16_governance.md): 統治ルールと禁止事項

## 現在の開発状況
Phase 1: Prototype / MVP 開発中
- [x] 概念設計とアーキテクチャの確定
- [x] Vercel API 経由での Todoist タスク登録の実装
- [ ] Todoist タスクの読み取り・一覧取得の実装

主要 API 仕様
- POST /api/tasks
- PATCH /api/tasks/:id
- GET /api/tasks

## 運用ルール
1. docs を SSOT とする。
2. notes は検討メモであり、SSOT ではない。
3. code は docs に従属する。
4. 仕様変更は docs を起点に行う。
5. AI は docs を API 経由で取得してから判断する。
```

---

## 影響範囲

- docs/README.md

---

## 取得済み docs

- docs/README.md
- docs/00_docs_index.md
- docs/01_concept.md
- docs/02_architecture.md
- docs/03_api_spec.md
- docs/05_roadmap.md
- docs/10_repo_resource_api.md
- docs/11_doc_style.md
- docs/13_dev_workflow.md
- docs/16_governance.md

---

## 判断

README.md の差分は以下に絞られる。

- 旧 API 表記の更新
- docs 一覧の拡充
- 開発状況の docs 整合化
- 運用ルールの最小追記

README.md は更新対象とする。

修正は notes/design を経由したうえで、人間判断で docs へ反映する。
