# 06_Obsidian_Design: 知識ベースの構造とテンプレート

1. Vault フォルダ構造
Obsidian 内の整合性を保つため、以下のフォルダ構成を正とする。
- 00_Inbox: 未整理情報の一時保管
- 10_Plans: 年次・四半期・月次の計画
- 20_Projects: プロジェクト別ノート
- 30_Meetings: 会議録
- 40_Knowledge: 知識・知見（MOC含む）
- 45_Strategy: 戦略ノート
- 50_Reviews: 日報・週報・統合レビュー
- 60_System: システム運用ノウハウ・仕様書
- 90_Archive: 完了・終了済み

2. MOC (Map of Content) 設計
主要トピックごとに目次ノートを作成し、知識を構造化する。AI が新規知識を生成する際、関連する MOC への追記を提案することで、情報の孤立（サイロ化）を防ぐ。
- 交通政策MOC
- 労働政策MOC
- 地域政策MOC
- AI運用MOC

3. 主要テンプレート定義

3.1. Knowledge テンプレート
---
type: knowledge
domain: 
project: 
date: YYYY-MM-DD
moc_ref: 
source_origin: 
tags: []
---
# タイトル
## 概要
## 重要ポイント
## 示唆
## 関連

3.2. Meeting テンプレート
---
type: meeting
domain: 
project: 
date: YYYY-MM-DD
participants: []
tags: []
---
# 会議名
## 概要
## 決定事項
## Next Action

3.3. Weekly / Integrated Review テンプレート
---
type: integrated-review
date: YYYY-MM-DD
week: 
tags: []
---
# 統合レビュー
## 今週の問題
## 戦略問題
## システム問題
## 来週の重点
## システム改善案

4. AI対話ログの資産化フロー
AI との対話から得られた洞察（Insights）を資産化する手順：
1. AI が対話の内容を要約し、重要な示唆を抽出する。
2. 既存知識への追記か新規作成かを AI が判定する。
3. 関連する MOC を特定し、リンクを自動生成する。
4. GitHub API（api/note-save.js）を経由して、Obsidian 内の指定フォルダへ自動保存する。
