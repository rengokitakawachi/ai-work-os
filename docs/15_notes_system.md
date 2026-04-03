# 15 Notes System

## 目的

未確定情報、課題、設計草案、運用記録を管理し、
docs への昇格を制御する。

---

## 位置づけ

notes は思考レイヤーである。

SSOT ではない。

正式仕様は docs に置く。

---

## 基本原則

1
notes は正本ではない。

2
未確定情報は notes に書く。

3
いきなり docs を書かない。

4
docs 更新前に design を経由する。

5
短期実行順の正本は 04_operations とする。

6
再開時の正本は 06_handover とする。

7
実績と振り返りは 07_reports に残す。

8
意思決定は 05_decisions に残す。

---

## ディレクトリ構成

notes/
README.md
00_inbox/
01_issues/
02_design/
03_plan/
04_operations/
05_decisions/
06_handover/
07_reports/
08_analysis/
09_content/
10_logs/
99_archive/

---

## 中核レイヤー

notes/ の中核レイヤーは以下とする。

- 00_inbox
- 01_issues
- 02_design
- 03_plan
- 04_operations
- 06_handover
- 07_reports
- 09_content

---

## 補助レイヤー

以下は補助または周辺レイヤーとする。

- 05_decisions
- 08_analysis
- 10_logs
- 99_archive

---

## 各ディレクトリの役割

### 00_inbox

未整理入力の入口。

web や dev_memo を含む。

---

### 01_issues

課題や論点を保持するレイヤー。

issue 相当の課題ログを集約する。

---

### 02_design

仕様草案。

docs 直前の構造整理レイヤー。

---

### 03_plan

一定期間の重点テーマを整理するレイヤー。

phase と operations の中間に位置する。

---

### 04_operations

短期実行順の正本。

今何をやるかを管理する。

---

### 05_decisions

意思決定ログ。

---

### 06_handover

スレッド再開時の正本。

関連 docs / notes / code を読み直す起点になる。

---

### 07_reports

daily / monthly の実績と振り返りを蓄積する。

---

### 08_analysis

横断的な整合確認や分析を行うレイヤー。

---

### 09_content

将来の記事執筆や発信のための素材、ネタ、記事ドラフトを蓄積するレイヤー。

日々の設計、実装、振り返りから、
あとで記事化できる論点や学びを保存する。

---

### 10_logs

補助ログ、失敗記録。

---

### 99_archive

現役運用から外れた情報の退避先。

---

## 運用上の重要ファイル

- 04_operations 配下の短期実行計画
- 01_issues/idea_log.md
- 06_handover 配下の最新引き継ぎ書
- 07_reports/daily 配下の日報

---

## 昇格ルール

以下を満たした場合のみ
notes → docs

- 目的が明確
- 責務が明確
- 命名が確定
- 例外が見えている
- 実装方針が説明できる
