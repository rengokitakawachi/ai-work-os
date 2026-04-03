# 2026-04-02 Docs 15 Notes System Update Draft

## 目的

`docs/15_notes_system.md` を、現行の notes 運用実態に整合する内容へ更新するための草案を作る。

既存の `15_notes_system.md` は notes の位置づけ自体は正しいが、
ディレクトリ構成と中核レイヤーの説明が古く、現在の repo 上の実態とずれている。

本草案では、notes の役割と原則は維持しつつ、
現行の中核運用レイヤーと補助レイヤーを反映した docs 更新案を整理する。

---

## 背景

現在の `docs/15_notes_system.md` には以下のズレがある。

- ディレクトリ構成が `inbox / exploration / design / decisions / backlog / logs` に留まっている
- `operations` が出てこない
- `handover` が出てこない
- `reports` が出てこない
- `issues` が出てこない
- `content` が出てこない
- `analysis` や `archive` が出てこない
- 最重要ファイルが `notes/backlog/dev-backlog.md` 前提になっている
- 実態では backlog より operations が短期実行順の正本に近い

一方で、最近の notes 側の整理では以下が見えている。

- `00_inbox` は未整理入力の入口として確立
- `01_issues` は課題ログの正式受け先として運用開始
- `02_design` は docs 直前の草案レイヤーとして確立
- `03_plan` は一定期間の重点テーマ整理レイヤーとして導入
- `04_operations` は短期実行順の正本として確立
- `06_handover` は再開時の正本として確立
- `07_reports` は daily / monthly の継続運用が成立
- `08_analysis` は横断的な整合確認や分析を行うレイヤーとして運用されている
- `09_content` は将来の記事執筆や発信のための素材、ネタ、記事ドラフトを蓄積する運用先行レイヤーとして導入済み
- `05_decisions` `10_logs` `99_archive` も repo 上に存在している
- `exploration` と `backlog` は repo から削除済みである

そのため、docs 側でも notes の現行構造を反映し直す必要がある。

---

## 更新方針

- notes は SSOT ではない、という原則は維持する
- docs 更新前に design を経由する、という原則も維持する
- ただしディレクトリ構成と主線は現行運用に合わせて更新する
- 番号付き構造はすでに design / README / operations に反映されているため、docs 側でも最小限で反映する
- 現時点の「役割」と「運用上の中核」を優先して記述する
- docs には理想構造ではなく、現時点の実在パスと運用責務を書く

---

## 反映したいポイント

### 1. 位置づけは維持

- notes は思考レイヤー
- SSOT ではない
- docs へ昇格する前段である

### 2. 基本原則の更新

既存原則に加えて、以下を反映したい。

- 短期実行順の正本は `04_operations` とする
- 再開時の正本は `06_handover` とする
- 実績と振り返りは `07_reports` に残す
- 課題ログは `01_issues` に残す
- 発信用素材は `09_content` に蓄積する

### 3. ディレクトリ構成の更新

少なくとも docs には以下を出す。

- `00_inbox`
- `01_issues`
- `02_design`
- `03_plan`
- `04_operations`
- `05_decisions`
- `06_handover`
- `07_reports`
- `08_analysis`
- `09_content`
- `10_logs`
- `99_archive`

### 4. 各レイヤーの役割を更新

特に次を明確化する。

- `04_operations` = 短期実行順の正本
- `06_handover` = スレッド再開の正本
- `07_reports` = daily / monthly の蓄積
- `08_analysis` = 横断的な整合確認や分析を行うレイヤー
- `09_content` = 将来の記事執筆や発信のための素材、ネタ、記事ドラフトを蓄積するレイヤー
- `01_issues` = 課題ログの正式受け先
- `99_archive` = 非アクティブ情報の退避先

### 5. 最重要ファイルの見直し

`notes/backlog/dev-backlog.md` 単独ではなく、
notes の運用上重要な正本を複数示す形に変える。

候補:
- `notes/04_operations/2026-03-26_short_term_plan.md`
- `notes/01_issues/idea_log.md`
- `notes/06_handover/*.md`
- `notes/07_reports/daily/*.md`

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
短期実行順の正本は 04_operations とする。

6
再開時の正本は 06_handover とする。

7
実績と振り返りは 07_reports に残す。

8
意思決定は 05_decisions に残す。

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
```

---

## 更新対象の要点

今回の docs 更新で変えるべき主点は以下。

- notes の中核構成を現行実態へ更新する
- `01_issues` `03_plan` `04_operations` `06_handover` `07_reports` `09_content` を反映する
- `05_decisions` `08_analysis` `10_logs` `99_archive` を補助レイヤーとして反映する
- backlog 単独中心の説明を外す
- 「正本」の説明を notes 内部でも分離して書く
- `09_content` の目的を外部発信・記事化のための素材蓄積として明記する

---

## 影響範囲

- docs/15_notes_system.md

---

## 関連 design

- notes/02_design/2026-04-02_notes_indexed_structure_spec.md
- notes/02_design/2026-04-02_notes_current_operating_structure.md
- notes/02_design/2026-04-02_notes_folder_migration_mapping.md
- notes/02_design/2026-04-02_notes_readme_update_draft.md

---

## 判断

`docs/15_notes_system.md` は更新対象とする。

特に以下は docs 側で先に整合させる価値が高い。

- `01_issues` の位置づけ
- `03_plan` の位置づけ
- `04_operations` の位置づけ
- `06_handover` の位置づけ
- `07_reports` の位置づけ
- `08_analysis` の位置づけ
- `09_content` の目的と存在
