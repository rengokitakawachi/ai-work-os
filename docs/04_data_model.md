# 04_Data_Model: データ定義と属性体系

1. SSOT (Single Source of Truth) 責務の分離
情報の「正本」を以下のように定義し、データの重複を避ける。
- 今やること（タスク）: Todoist
- 知識・知見（ナレッジ）: Obsidian
- 予定・アポイント: Outlook
- 技術・設計ドキュメント: GitHub
- 案件進捗（将来）: kintone

2. ER図（関係性）
Project (1) --- (n) Task / Meeting / Knowledge
Meeting (1) --- (n) Task
Review (n) --- (n) Task / Project
Plan (1) --- (n) Project

3. オブジェクト定義

3.1. Task (Execution Layer)
- task_id: 一意のID
- title: タスク名（30-120分の粒度）
- description: 詳細説明
- duration: 想定所要時間
- project: 関連プロジェクト
- due_date: 期限
- status: 状態（open | completed）
- 拡張属性:
  - assignee: 担当者 (@t-kinoshita | @t-niwa)
  - work_domain: 業務分類タグ
  - estimate_minutes: 見積時間
  - actual_minutes: 実績時間
  - source_ref: 参照元ID（Meeting ID等）
  - priority: 優先度（A | B | C）

3.2. Meeting (Knowledge Layer)
- meeting_id: 一意のID
- title: 会議名
- date: 実施日
- participants: 参加者リスト
- summary: 概要要約
- decisions: 決定事項（リスト）
- actions: 発生タスク（リスト）
- related_project: 関連プロジェクト

3.3. Knowledge (Knowledge Layer)
- note_id: 一意のID
- title: 知識タイトル
- moc_ref: 属するMOC（Map of Content）へのリンク（追加）
- source_origin: 情報源（Web, 会議録, AI対話ログ等の参照元）（追加）
- summary: 概要
- key_points: 重要ポイント
- insights: 得られた示唆
- related_projects: 関連プロジェクト
- references: 参照資料
- note_type: 種類（knowledge | strategy | system）

3.4. Review (Review Layer)
- review_id: 一意のID
- type: 種類（daily | weekly | integrated）
- date: 実施日
- problems: 発生した問題
- strategy_issues: 戦略上の課題
- system_issues: システム上の課題
- actions: 改善アクション

3.5. MOC (Knowledge Layer)
- moc_id: 一意のID
- title: トピック名
- hub_links: 関連する知識ノートへのハブリンク
- summary: トピック全体の構造解説

4. タグ体系 (Tagging System)

4.1. 業務分類（組織・プロジェクト属性）
以下のタグを AI が推定し、Todoist のラベルや Obsidian のメタデータとして付与する。
#連合北河内, #北河内労福協, #連合大阪, #大阪労福協, #電機連合, #PGU, #K-Project, #プライベート

4.2. 担当者属性 (Assignee)
文脈から以下の担当者を自動的に assign する。
- @t-kinoshita: 木下
- @t-niwa: 丹羽
