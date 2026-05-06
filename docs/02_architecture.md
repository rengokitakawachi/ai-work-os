# 02_Architecture: システム構造と同期フロー

## 1. 5層レイヤー構造 (5-Layer Model)
AI Work OS は、以下の役割分担に基づいて設計されている。UI は交換可能とする疎結合設計。

レイヤー | 役割 | 主要ツール
--- | --- | ---
AI Layer | 思考整理・意思決定支援 | Gemini / ChatGPT
Automation Layer | システム統合・API 中継 | Vercel (Node.js)
Knowledge Layer | 知識資産の蓄積 | GitHub / Obsidian
Execution Layer | タスクの実行管理 | Todoist
Review Layer | 分析・改善 | AI 分析エンジン

## 2. システム構成図
ユーザー ↔ AI UI (Gemini/ChatGPT) ↔ Vercel API
  ├ Task API ↔ Todoist
  ├ Note API ↔ GitHub ↔ Obsidian
  └ Meeting API ↔ GitHub ↔ Obsidian

## 3. 知識の単一ソース (Single Source of Truth: SSOT)
データの責務を以下のように分離する。
- 動的データ（今やること）: Todoist を正とする。
- 静的データ（知識・記録・戦略・レビュー）: Obsidian (GitHub) を正とする。
- 予定・会議: Outlook を正とする。
- 技術ドキュメント・仕様書: GitHub を正とする。
- 案件進捗: kintone (将来)

## 4. Obsidian Vault 構造
- 00_Inbox: 未整理情報
- 10_Plans: 計画
- 20_Projects: プロジェクト別ノート
- 30_Meetings: 会議録
- 40_Knowledge: 知識・知見（MOC含む）
- 45_Strategy: 戦略ノート
- 50_Reviews: 日報・週報・統合レビュー
- 60_System: システム運用ノウハウ
- 90_Archive: 完了済み

## 5. 知識同期プロトコル (Knowledge Sync)
1. AI: Markdown 形式のドキュメントを生成。
2. Vercel API: GitHub API を使用してリポジトリへ Push。
3. GitHub: 履歴管理とバックアップ。
4. Obsidian: ローカル PC の Git プラグインが Pull し同期。

## 6. 設計方針：疎結合 (Loosely Coupled)
AI サービスが進化しても、バックエンドや各ツールを変更せずに済むよう、各機能を API で分離・接続する。
