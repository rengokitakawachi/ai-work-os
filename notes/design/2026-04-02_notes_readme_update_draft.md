# 2026-04-02 Notes README Update Draft

## 目的

notes/README.md を、現行の notes 運用実態に整合する入口文書へ更新する。

旧 README には exploration と backlog を中心とした古い流れが残っているため、
現在の実運用に合わせて、中核レイヤー、基本フロー、運用原則を再定義する。

---

## 背景

現行の notes/README.md には以下のズレがある。

- 基本フローが `inbox → exploration → design → docs` になっている
- operations、handover、reports、ideas、content が主要レイヤーとして反映されていない
- backlog が「次にやること」の代表として書かれているが、短期実行順の正本は operations に寄っている
- 未整理開発メモの入口が exploration 前提になっており、実態の inbox/dev_memo とずれている

一方、現在の実運用では以下が成立している。

- inbox が未整理入力の入口
- design が docs 直前の草案レイヤー
- operations が短期実行順の正本
- handover が再開時の正本
- reports が daily / monthly の蓄積レイヤー
- ideas は実態として issue レイヤーに近い
- content が発信用素材のレイヤーとして導入済み

---

## 更新方針

- README は「現行の実態」を案内する入口文書として扱う
- 理想構造や将来 rename の詳細は書きすぎない
- ただし notes 構造再編が進行中であることは短く触れる
- docs より前に置かれる補助レイヤーであることを明確にする
- 差分最小ではなく、入口文書として読みやすい形へ整理する

---

## 反映したいポイント

### 1. 位置づけ

- notes は思考レイヤー
- SSOT ではない
- 正式仕様は docs
- code は docs に従属

### 2. 中核レイヤー

README で少なくとも以下を案内する。

- inbox
- ideas
- design
- operations
- handover
- reports
- content

### 3. 基本フロー

旧 flow ではなく、現行主線に合わせて以下へ寄せる。

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

### 4. 補助レイヤー

- decisions
- analysis
- logs
- archive

は補助レイヤーとして短く触れる。

### 5. 移行中レイヤー

- exploration は旧構造であり縮小・移行対象
- backlog は再整理対象

と簡潔に書く。

---

## README 修正案

```md
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
```

---

## 影響範囲

- notes/README.md

---

## 関連 design

- notes/design/2026-04-02_notes_indexed_structure_spec.md
- notes/design/2026-04-02_notes_current_operating_structure.md
- notes/design/2026-04-02_notes_folder_migration_mapping.md

---

## 判断

notes/README.md は更新対象とする。

更新の主眼は以下。

- 旧主線の置き換え
- 現行中核レイヤーの案内
- 補助レイヤーと移行中レイヤーの切り分け
- operations / handover / reports / content の反映
