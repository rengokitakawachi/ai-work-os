# 2026-04-02 Docs 15 Notes System Update Draft

## 目的

`docs/15_notes_system.md` を、現行の notes 運用実態に整合する内容へ更新するための草案を作る。

既存の `15_notes_system.md` は notes の位置づけ自体は正しいが、
ディレクトリ構成と中核レイヤーの説明が古く、現在の repo 上の実態とずれている。

本草案では、notes の役割と原則は維持しつつ、
現行の中核運用レイヤー、補助レイヤー、移行中レイヤーを反映した docs 更新案を整理する。

---

## 背景

現在の `docs/15_notes_system.md` には以下のズレがある。

- ディレクトリ構成が `inbox / exploration / design / decisions / backlog / logs` に留まっている
- `operations` が出てこない
- `handover` が出てこない
- `reports` が出てこない
- `ideas` が出てこない
- `content` が出てこない
- 最重要ファイルが `notes/backlog/dev-backlog.md` 前提になっている
- 実態では backlog より operations が短期実行順の正本に近い

一方で、最近の notes 側の整理では以下が見えている。

- inbox は未整理入力の入口として確立
- design は docs 直前の草案レイヤーとして確立
- operations は短期実行順の正本として確立
- handover は再開時の正本として確立
- reports は daily / monthly の継続運用が成立
- xx_ideas は実態として issue レイヤーに近い移行中フォルダ
- content は運用先行の新レイヤーとして導入済み
- xx_backlog は再整理対象の移行中フォルダ
- exploration は旧構造であり中核主線から外れつつある

そのため、docs 側でも notes の現行構造を反映し直す必要がある。

---

## 更新方針

- notes は SSOT ではない、という原則は維持する
- docs 更新前に design を経由する、という原則も維持する
- ただしディレクトリ構成と主線は現行運用に合わせて更新する
- 番号付き rename の詳細までは docs に書きすぎない
- 現時点の「役割」と「運用上の中核」を優先して記述する
- exploration や xx_backlog は削除ではなく、移行中・再整理対象として位置づける

---

## 反映したいポイント

### 1. 位置づけは維持

- notes は思考レイヤー
- SSOT ではない
- docs へ昇格する前段である

### 2. 基本原則の更新

既存原則に加えて、以下を反映したい。

- 短期実行順の正本は operations とする
- 再開時の正本は handover とする
- 実績と振り返りは reports に残す
- 課題ログは xx_ideas に保持するが、実態として issue レイヤーに近い

### 3. ディレクトリ構成の更新

少なくとも docs には以下を出す。

- inbox
- xx_ideas
- design
- operations
- handover
- reports
- content
- decisions
- analysis
- logs
- archive

exploration と xx_backlog は「移行中 / 再整理対象」として扱う。

### 4. 各レイヤーの役割を更新

特に次を明確化する。

- operations = 短期実行順の正本
- handover = スレッド再開の正本
- reports = daily / monthly の蓄積
- content = 発信用素材の蓄積
- xx_ideas = issue 相当の課題ログを保持する移行中フォルダ

### 5. 最重要ファイルの見直し

`notes/backlog/dev-backlog.md` 単独ではなく、
notes の運用上重要な正本を複数示す形に変える。

候補:
- notes/operations/2026-03-26_short_term_plan.md
- notes/xx_ideas/idea_log.md
- notes/handover/*.md
- notes/reports/daily/*.md

---

## docs/15 修正案

```md
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
短期実行順の正本は operations とする。

6
再開時の正本は handover とする。

7
実績と振り返りは reports に残す。

8
意思決定は decisions に残す。

---

## 中核レイヤー

notes/ の中核レイヤーは以下とする。

- inbox
- xx_ideas
- design
- operations
- handover
- reports
- content

---

## 補助レイヤー

以下は補助または周辺レイヤーとする。

- decisions
- analysis
- logs
- archive

---

## 移行中 / 再整理対象

以下は旧構造または再整理対象とする。

- exploration
- xx_backlog

exploration は旧来の調査・検討レイヤーであり、
現在は中核主線から外れつつある。

xx_backlog は operations との役割を再整理対象とする。

---

## 各ディレクトリの役割

### inbox

未整理入力の入口。

web や dev_memo を含む。

---

### xx_ideas

課題や論点を保持する移行中レイヤー。

実態としては issue レイヤーに近い。

---

### design

仕様草案。
docs 直前の構造整理レイヤー。

---

### operations

短期実行順の正本。

今何をやるかを管理する。

---

### handover

スレッド再開時の正本。

関連 docs / notes / code を読み直す起点になる。

---

### reports

daily / monthly の実績と振り返りを蓄積する。

---

### content

発信用素材、記事ドラフトを蓄積する。

---

### decisions

意思決定ログ。

---

### analysis

横断的な整合確認、分析メモ。

---

### logs

補助ログ、失敗記録。

---

### archive

現役運用から外れた情報の退避先。

---

## 運用上の重要ファイル

- operations 配下の短期実行計画
- xx_ideas/idea_log.md
- handover 配下の最新引き継ぎ書
- reports/daily 配下の日報

---

## 昇格ルール

以下を満たした場合のみ
notes → docs

- 目的が明確
- 責務が明確
- 命名が確定
- 例外が見えている
- 実装方針が説明できる
```

---

## 更新対象の要点

今回の docs 更新で変えるべき主点は以下。

- notes の中核構成を現行実態へ更新する
- operations / handover / reports / xx_ideas / content を反映する
- backlog 単独中心の説明を外す
- exploration を旧主線から外す
- 「正本」の説明を notes 内部でも分離して書く

---

## 影響範囲

- docs/15_notes_system.md

---

## 関連 design

- notes/design/2026-04-02_notes_indexed_structure_spec.md
- notes/design/2026-04-02_notes_current_operating_structure.md
- notes/design/2026-04-02_notes_folder_migration_mapping.md
- notes/design/2026-04-02_notes_readme_update_draft.md

---

## 判断

`docs/15_notes_system.md` は更新対象とする。

特に以下は docs 側で先に整合させる価値が高い。

- operations の位置づけ
- handover の位置づけ
- reports の位置づけ
- xx_ideas の実態的な位置づけ
- content の存在
- exploration / xx_backlog の再整理前提
