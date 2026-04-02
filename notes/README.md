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

### inbox

未整理入力の入口。

- web
- dev_memo

を主に扱う。

### ideas

課題や論点を蓄積するレイヤー。

現状は idea_log を中心に運用しているが、実態としては issue レイヤーに近い。

### design

仕様草案と構造整理のレイヤー。

docs 直前の整理を行う。

### operations

短期実行順の正本。

今何を進めるかを管理する。

### handover

スレッド再開時の正本。

関連 docs / notes / code を読み直す起点になる。

### reports

daily / monthly の実績と振り返りを蓄積する。

### content

発信用素材や記事ドラフトを蓄積する。

---

## 基本フロー

```text
input
↓
inbox
↓
ideas または design
↓
operations
↓
実行
↓
reports
↓
必要に応じて handover
```

補助的に decisions、analysis、logs、archive が接続する。

---

## 補助レイヤー

### decisions

意思決定理由を保持する。

### analysis

横断的な整合確認や分析を行う。

### logs

補助ログや失敗記録を保持する。

### archive

現役運用から外れた情報を退避する。

---

## 移行中のレイヤー

### exploration

旧構造の調査・検討レイヤー。

現在は中核主線ではなく、縮小・移行対象として扱う。

### backlog

旧来の backlog レイヤー。

現在の短期実行順の正本は operations に寄っているため、再整理対象とする。

---

## 運用原則

- 未整理入力はまず inbox に入れる
- 未確定のまま docs に書かない
- 仕様草案は design に集約する
- 近々やることは operations を正本とする
- 再開時は handover を起点に読む
- 実績は reports に残す
- content は完成より継続を優先する
- notes の内容は必要に応じて docs に昇格させる
