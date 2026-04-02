# Handover

## 概要
EVEおよびADAMの指示に対して、Todoist API連携（listTasks / createTask / updateTask）を導入し、
「思考AI」から「実行AI」への移行を行った。
また、EVEは既存タスク取得を優先する構造へ、ADAMは開発タスク記録を可能とする構造へ拡張した。

---

## 成功（Success）
- EVEにTask Retrieval Ruleを導入し、listTasks優先の行動制御を確立
- EVEの指示を軽量化し、経歴をKnowledgeへ分離
- ADAMにTodoist createTask連携を追加（開発タスク記録ルール）
- 旧API削除後も正式API（/api/tasks系）が正常動作
- PowerShellによるAPIテスト（GET / POST / PATCH）成功

---

## 判明事項（Findings）
- スキーマではなく「指示」がAPI実行のトリガーになる
- APIが存在しても、ルールがないと実行されない
- listTasksを最優先にすることでEVEの挙動が大きく改善される
- ADAMにおけるタスク化は「任意」ではなく「条件付き必須」にする必要がある
- GPT指示は長文化するとエラーが発生するため、構造分離が必須

---

## 失敗 / 未解決（Issues）
- ADAMのタスク記録ルールに「強制条件」が不足していた（後で修正）
- GPTsの文字数制限により、EVE経歴を指示内に保持できなかった
- PowerShellでのcurl使用時にHeader形式エラーが発生

---

## 次のアクション（Next Actions）
- ADAMのタスク記録ルールに「必ず記録する条件」を追加
- EVEの実行ログを確認し、listTasksの発火率を検証
- 優先順位ロジックの改善（重要度・期限ベース）
- Todoistラベル設計の標準化

---

## 関連docs
- 03_api_design.md
- 11_doc_style.md

---

## 関連code
- /api/tasks
- /api/tasks/{id}

---

## 関連notes
- notes/exploration/memo/（開発メモ群）
- notes/design/dev_memo.md

---

## 状態サマリ
- API：正常（list / create / update 動作確認済み）
- docs整合：概ね一致
- notesフロー：正常運用

---

## 引き継ぎプロンプト

このhandoverを読み込んで、関連docsを取得し、現状を把握してから作業を再開して
