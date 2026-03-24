# Handover

## 概要
Todoist API（tasks系）の設計・実装・テスト・GPTスキーマ統合まで完了。EVE/ADAM両方で新APIへ移行し、認証問題も解決。

---

## 成功（Success）
- POST /api/tasks 実装・テスト完了
- GET /api/tasks 実装・テスト完了
- PATCH /api/tasks/:id 実装・テスト完了
- status=closed による完了処理確認
- validate / dispatch / service 層の分離成功
- request_id を含むエラー構造の統一
- EVEスキーマ更新完了
- ADAMスキーマ更新完了
- GPT Actions 認証設定問題の特定と解決

---

## 判明事項（Findings）
- OpenAPIのsecurity設定だけでは認証は送信されない
- GPT Actionsは認証設定UIでトークン入力が必須
- securitySchemesは1つのみ対応（複数不可）
- PowerShellのcurlは実質Invoke-WebRequestであり罠が多い
- WindowsではInvoke-RestMethodが最も安定
- API設計はdocs準拠で完全に一致させる必要あり

---

## 失敗 / 未解決（Issues）
- 旧API（/api/task系）がまだ残存
- 旧APIのラッパー化未対応
- 不要エンドポイント削除未実施

---

## 次のアクション（Next Actions）
- 旧API（task系）を新APIへ委譲（ラッパー化）
- 不要APIの削除
- docs更新（API正式確定反映）
- GPT運用テスト（EVE実行確認）

---

## 関連docs
- docs/03_api_spec.md

---

## 関連code
- api/tasks/index.js
- api/tasks/[id].js
- src/services/tasks/*

---

## 関連notes
- notes/design/memos/2026-03-22_18-10-00_todoist_api_dev_plan.md

---

## 状態サマリ
- API：完成
- docs整合：ほぼ一致
- notesフロー：designまで完了

---

## 引き継ぎプロンプト

このhandoverを読み込んで、関連docsを取得し、現状を把握してから作業を再開して
