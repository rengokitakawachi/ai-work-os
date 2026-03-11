# AI Work OS Documentation Portal

本リポジトリは、AI を OS のカーネルとし、事務局長の知的生産サイクルを自動化・高度化する個人用ワークシステム「AI Work OS」の設計情報を管理します。

## 1. ドキュメント体系
各詳細仕様は以下のドキュメントを参照してください。

| ファイル | 内容 | 概要 |
| :--- | :--- | :--- |
| [01_Concept](01_concept.md) | 基本思想 | GTD/PKM の導入方針、木下スタイル（装飾制限等） |
| [02_Architecture](02_architecture.md) | システム構造 | 5層レイヤー構造、知識同期（SSOT）のフロー |
| [03_API_Spec](03_api_spec.md) | 技術仕様 | Vercel エンドポイント、認証、疎結合設計の定義 |
| [04_Data_Model](04_data_model.md) | データ定義 | Task/Meeting/Knowledge の JSON/MD 構造 |
| [05_Roadmap](05_roadmap.md) | 開発計画 | 運用フェーズ、未解決課題、将来のレビュー設計 |

## 2. システムの定義
AI を UI とし、人間の仕事を以下の循環（知的生産サイクル）で改善する。
**Knowledge → Strategy → Execution → Review → Improve**

## 3. 基本原則
- **Single Source of Truth (SSOT):** タスクは Todoist、知識は Obsidian (GitHub)。
- **木下スタイル:** プレーンテキスト優先。装飾（太字・記号）は最小限とする。
- **認知負荷の低減:** キャプチャ時の分類は AI が自動推定する。

---
最終更新: 2026-03-11
