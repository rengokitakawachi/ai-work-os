# AI Work OS

AIを中核UIとし、知識、戦略、実行、レビューを統合する個人用ワークシステム。

## プロジェクト概要
本プロジェクトは、事務局長の業務効率を最大化し、AIを思考のパートナーとして活用するための統合基盤「AI Work OS」を構築するものです。
Todoistによるタスク管理、Obsidianによるナレッジ管理、そしてそれらを仲介するVercel APIによって構成されます。

## ドキュメント一覧
システム設計の詳細については、以下の各ドキュメントを参照してください。

- [01_Concept](docs/01_concept.md): 基本理念、仕事の循環、9つの原則
- [02_Architecture](docs/02_architecture.md): 5層レイヤー構造、システム構成、同期フロー
- [03_API_Spec](docs/03_api_spec.md): 技術仕様、APIエンドポイント詳細、認証方式
- [04_Data_Model](docs/04_data_model.md): データ定義、SSOT（正本）の分離、タグ体系
- [05_Roadmap](docs/05_roadmap.md): 開発マイルストーン、レビュー設計、未解決課題
- [06_Obsidian_Design](docs/06_obsidian_design.md): Vaultフォルダ構造、MOC設計、テンプレート定義
- [07_External_Integration](docs/07_external_integration.md): Outlook/Teams連携方針、セキュリティ
- [08_Dev_Config](docs/08_dev_config.md): Vercel構成、環境変数設定、ディレクトリ構造

## 現在の開発状況
Phase 1: Prototype / MVP 開発中
- [x] 概念設計とアーキテクチャの確定
- [x] Vercel API 経由での Todoist タスク登録（POST /api/task/create）
- [ ] Todoist タスクの読み取り・一覧取得（GET /api/task/list）

## 運用ルール
1. 原則として太字や過度な装飾を排したプレーンテキストで管理する。
2. 情報の正本（SSOT）を常に意識し、データの重複を避ける。
3. AIとの対話を通じて、知識を戦略に変え、具体的な実行（Next Action）へ繋げる。
