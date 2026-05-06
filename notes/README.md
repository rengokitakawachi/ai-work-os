# notes

## 目的

notes は、未確定情報、課題、設計草案、運用記録を扱う思考レイヤーである。

iPhone やブラウザから蓄積した入力、会話由来の開発メモ、
設計草案、短期実行順、振り返り、引き継ぎを一時的かつ構造的に保持し、
docs へ昇格する前段を支える。

---

## 位置づけ

- notes は SSOT ではない
- 正式仕様は docs に置く
- code は docs に従属する
- notes は docs 直前の思考・整理・運用レイヤーとして扱う

---

## 現在の中核レイヤー

### 00_inbox

未整理入力の入口。

- web
- dev_memo

を主に扱う。

### 01_issues

課題や論点を蓄積するレイヤー。

現状は `idea_log.md` を中心に運用している。

### 02_design

仕様草案と構造整理のレイヤー。

docs 直前の整理を行う。

### 03_plan

一定期間で進める重点テーマを整理するレイヤー。

phase と operations の中間に位置する。

### 04_operations

短期実行順の正本。

今何を進めるかを管理する。

### 06_handover

スレッド再開時の正本。

関連 docs / notes / code を読み直す起点になる。

### 07_reports

daily / monthly の実績と振り返りを蓄積する。

### 09_content

発信用素材や記事ドラフトを蓄積する。

---

## 基本フロー

```text
input
↓
00_inbox
↓
01_issues または 02_design
↓
03_plan
↓
04_operations
↓
実行
↓
07_reports
↓
必要に応じて 06_handover
```

補助的に 05_decisions、08_analysis、09_content、10_logs、99_archive が接続する。

---

## 補助レイヤー

### 05_decisions

意思決定理由を保持する。

### 08_analysis

横断的な整合確認や分析を行う。

### 10_logs

補助ログや失敗記録を保持する。

### 99_archive

現役運用から外れた情報を退避する。

---

## 移行中のレイヤー

### exploration

旧構造の調査・検討レイヤー。

現在は中核主線ではなく、縮小・移行対象として扱う。

### backlog

旧来の backlog レイヤー。

現在の短期実行順の正本は 04_operations に寄っているため、再整理対象とする。

---

## 運用原則

- 未整理入力はまず 00_inbox に入れる
- 未確定のまま docs に書かない
- 仕様草案は 02_design に集約する
- 重点テーマは 03_plan で整理する
- 近々やることは 04_operations を正本とする
- 再開時は 06_handover を起点に読む
- 実績は 07_reports に残す
- 発信用素材は 09_content に蓄積する
- notes の内容は必要に応じて docs に昇格させる
