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
