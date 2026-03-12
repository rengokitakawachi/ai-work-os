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
主要トピックごとに目次ノートを作成し、知識を構造化する。
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
