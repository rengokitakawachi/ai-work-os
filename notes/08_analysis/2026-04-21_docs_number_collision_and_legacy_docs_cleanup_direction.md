# 2026-04-21 docs_number_collision_and_legacy_docs_cleanup_direction

## 目的

docs 番号衝突と旧 docs 群の整理方針を、
現行運用に沿って 1 枚にまとめる。

本メモは、
個別 docs をその場しのぎで更新する前に、

- 何が番号衝突なのか
- 何が旧仕様として残っているのか
- どれを現役仕様として更新するのか
- どれを位置づけ明示に留めるのか

を先に固定することを目的とする。

---

## 参照

- `docs/00_docs_index.md`
- `docs/05_roadmap.md`
- `docs/15_notes_system.md`
- `docs/16_governance.md`
- `docs/17_operations_system.md`
- `notes/08_analysis/2026-04-04_repo_readthrough_findings.md`
- `notes/00_inbox/dev_memo/2026-04-04_repo_consistency_check_followup.md`

---

## 結論

現時点の整理方針は次である。

1.  
docs 番号の現行正本は、
repo 実体を基準に
`15_notes_system`
`16_governance`
`17_operations_system`
として扱う

2.  
旧 analysis に残る
「16 系番号衝突」
「docs/16_operations_system.md」
という記述は、
過去時点の観測として扱い、
現時点の repo 正本とは分けて読む

3.  
旧 docs 群は一気に全面書き換えしない。
まずは
`現役仕様`
`将来構想寄り`
`古いが参照価値あり`
に分類する

4.  
直近は、
運用正本と強く接続する docs を優先する。
優先順は
`05_roadmap`
→ `15_notes_system`
→ `17_operations_system` 周辺整合
→ 旧 docs 群の位置づけ明示
が自然である

---

## 現状の番号整理

現行 repo 上の docs 一覧では、
15 以降の番号は次である。

- `15_notes_system.md`
- `16_governance.md`
- `17_operations_system.md`

したがって、
**現在の repo 実体としては番号衝突は解消済み**
とみなすのが自然である。

一方で、
過去 analysis / dev memo には次の表現が残っている。

- `docs/15` と `docs/16` の operations 定義差
- `docs/16_governance.md` と `docs/16_operations_system.md` の番号衝突

これは、
整理途中の時点での観測としては妥当だが、
現時点の repo 正本をそのまま表してはいない。

---

## 本当に残っている問題

番号そのものより大きい問題は、
**旧 docs 群の世界観が現行運用に追いついていないこと**
である。

特に次が大きい。

- `docs/01_concept.md`
- `docs/02_architecture.md`
- `docs/06_obsidian_design.md`
- `docs/07_external_integration.md`
- `docs/08_dev_config.md`
- `docs/13_dev_workflow.md`
- `docs/14_repo_knowledge_architecture.md`

これらは、
番号衝突というより
「古い前提や将来構想が現役仕様のように並んでいる」
ことが問題である。

---

## docs の分類方針

### 1. 現役仕様として更新する docs

現行運用の正本や中核仕様に直結するため、
内容更新を優先してよいもの。

- `docs/05_roadmap.md`
- `docs/15_notes_system.md`
- `docs/16_governance.md`
- `docs/17_operations_system.md`

理由:

- roadmap / notes / governance / operations は
  現在の ADAM 運用の骨格そのものだからである
- handover / operations / review / routing と直接つながる
- instruction と code の解釈基準になりやすい

---

### 2. 現役仕様として残すが、まず位置づけ明示を優先する docs

内容を全面刷新する前に、
「この docs は現行実装そのものではなく、概要または将来像を含む」
と分かるようにした方がよいもの。

- `docs/01_concept.md`
- `docs/02_architecture.md`
- `docs/13_dev_workflow.md`
- `docs/14_repo_knowledge_architecture.md`

理由:

- いずれも repo 全体の見え方に影響する
- ただし現在の notes / operations / routing の整理を直接そのまま反映してはいない
- 一気に全面改稿するより、
  先に位置づけを明示した方が安全である

---

### 3. 将来構想寄りとして扱う候補

現時点の実装や運用の正本ではなく、
過去前提または将来構想の比率が高いもの。

- `docs/06_obsidian_design.md`
- `docs/07_external_integration.md`
- `docs/08_dev_config.md`

理由:

- 現在の repo / code / 運用と距離がある
- obsolete と断定する前に、
  「どの前提時点の文書か」を明示する方がよい
- 直近の運用判断の基準には使わない方が安全である

---

## 15 / 16 / 17 周辺の扱い

### `docs/15_notes_system.md`

現行運用に直結する docs であり、
更新優先度は高い。

主な補正対象:
- `80_future`
- reports 実態
- handover の位置づけ
- operations の現行モデルとの接続

---

### `docs/16_governance.md`

番号自体は現行 repo で確定済みとみなしてよい。

ただし、
governance の中に
review / routing / execution rule のどこまでを持たせるかは
他 docs との境界確認が必要である。

---

### `docs/17_operations_system.md`

現行の短期実行正本として重要であり、
`15_notes_system.md` との整合を優先確認する。

特に確認点は次である。

- active / next / archive の3層
- 日中運用と review 時運用の分離
- operations と schedule の分離

---

## 旧観測メモの読み替えルール

過去の analysis / dev memo で次のような表現があっても、
そのまま現時点の repo 正本とみなさない。

- `docs/16_operations_system.md`
- `16 系番号衝突`
- `standby_operations が現行正本`

これらは、
過去時点の整理途中の観測として読む。

現時点の repo 正本は、
必ず docs 実体と active_operations を基準に再確認する。

---

## 次の実行順

直近の自然な順序は次である。

1.  
`docs/05_roadmap.md` に Phase 0 の位置づけを正式反映する

2.  
`docs/15_notes_system.md` に
現行 notes / future / reports / handover / operations 関係を反映する

3.  
`docs/17_operations_system.md` と
`docs/15_notes_system.md` の相互整合を再確認する

4.  
`docs/01_concept.md`
`docs/02_architecture.md`
`docs/13_dev_workflow.md`
`docs/14_repo_knowledge_architecture.md`
に対して、
現役仕様との距離を明示する整理方針を作る

5.  
`docs/06_obsidian_design.md`
`docs/07_external_integration.md`
`docs/08_dev_config.md`
を将来構想寄り docs として扱うか再判定する

---

## 判断

現時点の論点は、
番号衝突そのものよりも、
**旧 docs 群の位置づけが不明なまま現役 docs と並んでいること**
にある。

したがって、
次の方針が自然である。

- 番号は repo 実体を正とする
- 過去の衝突観測は background として読む
- 現役仕様 docs を先に更新する
- 旧 docs 群は全面改稿ではなく、まず位置づけ整理から入る
