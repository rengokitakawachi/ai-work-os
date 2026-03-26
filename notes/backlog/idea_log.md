# Idea / Issue Log (Backlog)

## 目的

日々の開発・運用で気づいた課題・違和感・改善案・アイデアを、粒度に関係なく記録する。

本ログは「機能開発の種」を蓄積するためのものとする。

---

## 基本方針

- 粒度は問わない（小さな違和感も記録する）
- 解決策が未整理でもよい
- 重複を恐れない
- 思考のスピードを優先する

---

## 運用ルール

- 気づいた時点で即記録する
- 定期的に review し、開発計画へ昇格させる
- 計画へ昇格したものはリンクを貼る
- 解決済みでも履歴として残す

---

## フォーマット

```text
- id: YYYYMMDD-XXX
- title:
- category: bug | ux | api | sync | architecture | ops | idea
- description:
- context:
- impact: low | medium | high
- candidate_solution:
- related:
- status: open | in_review | planned | done
- created_at:
```

---

## エントリ

### 2026-03-26

- id: 20260326-001
  title: docs と design のズレ検知が手動
  category: architecture
  description: docs と notes/design の差分検知が人依存になっている
  context: docs更新前にズレを見落とすリスクあり
  impact: high
  candidate_solution: 差分検出ツール or チェックリストの導入
  related: 13_dev_workflow.md
  status: open
  created_at: 2026-03-26

- id: 20260326-002
  title: Todoist reverse sync のイベント取得方式未確定
  category: sync
  description: polling と webhook の選択が未確定
  context: Phase1ではpolling想定だが将来設計未固定
  impact: medium
  candidate_solution: Phase1はpolling、Phase2でwebhook設計
  related: strategy_todoist_sync_phase1
  status: open
  created_at: 2026-03-26

---

## 昇格ルール

- status = planned に変更されたものは、
  overall_development_plan または streams に反映する

- 反映時は該当ドキュメントへのリンクを追加する

---

## 次アクション

- 週次で backlog review を行う
- high impact のものから優先順位付けする
