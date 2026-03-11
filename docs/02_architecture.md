# 02_Architecture: システム構造と同期フロー

## 1. 5層レイヤー構造 (5-Layer Model)
AI Work OS は、以下の役割分担に基づいて設計されている。

| レイヤー | 役割 | 主要ツール |
| :--- | :--- | :--- |
| **AI Layer** | 思考整理・意思決定支援 | Gemini / ChatGPT |
| **Automation Layer** | システム統合・API 中継 | Vercel (Node.js) |
| **Knowledge Layer** | 知識資産の蓄積 | GitHub / Obsidian |
| **Execution Layer** | タスクの実行管理 | Todoist |
| **Review Layer** | 分析・改善 | AI 分析エンジン |

## 2. 知識の単一ソース (Single Source of Truth: SSOT)
情報の重複や混乱を防ぐため、データの責務を以下のように分離する。
- **動的データ（今やること）:** Todoist を正とする。
- **静的データ（知識・記録）:** Obsidian (GitHub) を正とする。
- **予定・会議:** Outlook を正とする。
- **技術ドキュメント:** GitHub を正とする。

## 3. 知識同期プロトコル (Knowledge Sync)
AI が生成したナレッジ（会議録や戦略）は、以下のルートで事務局長のローカル PC へ届けられる。

1. **AI:** Markdown 形式のドキュメントを生成。
2. **Vercel API:** GitHub API を使用してリポジトリへ Push。
3. **GitHub:** 履歴管理とクラウド上のバックアップを担う。
4. **Obsidian:** ローカル PC の Git プラグインが Pull し、ナレッジベースを更新。

## 4. 設計方針：疎結合 (Loosely Coupled)
AI サービス（Gemini/ChatGPT）が進化しても、バックエンド（Vercel）や各ツール（Todoist/Obsidian）を変更せずに済むよう、各機能を API で分離・接続する。
