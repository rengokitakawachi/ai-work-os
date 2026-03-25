# Handover

## 概要
Repo / Todoist / Docs / Code / Notes API の実装整理と整合確認を行い、構造的な完成度を高めた。
特に notes delete を含む repo-resource API の実装が前進し、設計と実装の乖離が可視化された状態。

---

## 成功（Success）
- repo-resource API に delete（notes）を実装
- design 配下を含む delete 運用を確認
- exploration / design の責務分離を完了
- 古い開発メモを exploration/memo に移動
- API 実装差分を整理し、積み残しを明確化

---

## 判明事項（Findings）
- docs（10_repo_resource_api.md）が実装に追従していない
- auth エラーが構造化されていない
- Tasks API に実効しないパラメータが存在
- Action レイヤーと API 仕様に微妙なズレがある（delete）

---

## 失敗 / 未解決（Issues）
- repo_resource_api.md が古い状態のまま
- internal-auth のエラー形式が未整備
- Tasks API の assignee / duration / list query が未完全
- delete 実行時の content 仕様が完全一致していない

---

## 次のアクション（Next Actions）
- repo_resource_api.md を現行実装に合わせて更新
- internal-auth のエラー構造を repo-resource と統一
- Tasks API の実効パラメータ修正（assignee / duration / list）
- Action の delete 実行仕様を調整

※ 詳細は以下の開発メモを参照
- notes/exploration/memo/2026-03-25_api_remaining_tasks.md

---

## 関連docs
- docs/10_repo_resource_api.md
- docs/03_api_spec.md
- docs/13_dev_workflow.md
- docs/15_notes_system.md
- docs/16_governance.md

---

## 関連code
- api/repo-resource.js
- src/services/repo-resource/*
- src/services/internal-auth.js
- src/services/tasks/*
- src/services/todoist/*

---

## 関連notes
- notes/exploration/memo/2026-03-25_api_remaining_tasks.md

---

## 状態サマリ
- API：主要機能は完成、細部未整合あり
- docs整合：未追従（要更新）
- notesフロー：整理完了

---

## 引き継ぎプロンプト

このhandoverを読み込んで、関連docsを取得し、現状を把握してから作業を再開して
