# Handover

## 概要
本セッションでは、docs を API 経由で取得し、AI Work OS の仕様全体を理解した。
その結果、docs 内に旧 docs API（/api/docs 系）が残存しており、repo-resource API との不整合が存在することを特定した。

---

## 成功（Success）
- docs 一覧取得および全関連 docs の取得完了
- 00_docs_index.md を起点とした読取順序の遵守
- 全 docs の構造・役割・設計原則の把握
- repo-resource API を基準とした現在の仕様理解の確立
- 旧 API 記述の存在箇所の特定

---

## 判明事項（Findings）
- docs は SSOT であり、仕様判断の唯一の根拠である
- docs 取得は repo-resource API を使用するのが実運用ルール
- 旧 docs API（/api/docs, /api/docs-read, /api/docs-bulk）が複数 docs に残存している
- 10_repo_resource_api.md は旧 API と統合 API の両方を記述する移行ドキュメントである
- 03_api_spec.md に誤参照（10_docs_dev_api.md）が存在する

---

## 失敗 / 未解決（Issues）
- docs 内 API 記述が統一されていない
- repo-resource を正とする明確な統一状態になっていない
- どの docs をどの粒度で修正するか未確定
- 10_repo_resource_api.md の「移行表現」をどう扱うか未設計

---

## 次のアクション（Next Actions）
- 修正対象 docs を確定する
  - 00_docs_index.md
  - 03_api_spec.md
  - 08_dev_config.md
  - 11_doc_style.md
  - 12_ai_update_policy.md
  - 13_dev_workflow.md
  - 16_governance.md
- 各 docs を再取得し差分確認を行う
- repo-resource API を基準に修正案を作成する
- 10_repo_resource_api.md を基準ドキュメントとして整合を取る
- 修正案を notes/design に整理する

---

## 関連docs
- 00_docs_index.md
- 03_api_spec.md
- 08_dev_config.md
- 10_repo_resource_api.md
- 11_doc_style.md
- 12_ai_update_policy.md
- 13_dev_workflow.md
- 16_governance.md

---

## 関連code
- なし

---

## 関連notes
- notes/design/handover_template.md

---

## 状態サマリ
- API：移行途中（旧 docs API と repo-resource が混在）
- docs整合：不整合あり（API記述の二重化）
- notesフロー：正常（handover 作成・保存完了）

---

## 引き継ぎプロンプト

このhandoverを読み込んで、関連docsを取得し、現状を把握してから作業を再開して
