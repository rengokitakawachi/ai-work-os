# 2026-04_phase0_adam_to_eve_common_operating_model

## phase

Phase 0: Common Operating Model Foundation

## 位置づけ

EVE の実行系機能を本格的に前進させる前に、
ADAM の開発を通じて AI Work OS 全体に共通する operating model を整備するための plan。

本 plan では、
ADAM 向けの開発支援ルールを個別最適で増やすのではなく、
将来的に EVE の一般業務フローにも展開できる共通骨格として、

- intake routing
- issue routing
- roadmap / plan / operations
- review
- handover
- 正本と view の分離

を整理し、崩れにくい基盤を作ることを目的とする。

本 plan は、
Phase 1 の EVE 実行系 plan 群の手前に置く foundation plan とする。

---

## 目的

ADAM の開発を通じて、
AI Work OS 全体に共通する routing / planning / review の骨格を定義し、
今後の EVE 展開や運用機能追加の土台を整える。

---

## 背景

ここまでの整理で、
今の ADAM 開発は単なる開発支援機能の追加ではなく、
AI Work OS 全体に効く共通オペレーティングモデルの原型を作っていると見た方が自然だと分かってきた。

特に重要なのは、
review に何でも背負わせずに、

- 未整理入力をどう受けるか
- issue をどう保持するか
- issue をどこへ送るか
- 上位計画から短期実行順へどう落とすか
- 進捗や整合をどう見直すか

を分離することである。

この骨格が固まると、
ADAM の開発運用だけでなく、
将来的に EVE の一般業務フローにも同じ構造を持たせやすくなる。

---

## スコープ

この plan で扱うもの

- intake routing の位置づけ整理
- issue routing の位置づけ整理
- roadmap / plan / operations の3階層整理
- routing と review の責務分離
- handover を入口にした再開構造の整理
- SSOT / docs / notes / code / operations の正本関係整理
- ADAM 固有レイヤーと EVE 共通骨格の分離整理
- 共通 operating model としての意味づけ整理

この plan で扱わないもの

- Todoist / Outlook / Teams の個別接続実装そのもの
- Outlook 書き込みや schedule proposal の詳細実装
- Obsidian の本格連携
- EVE 一般業務版の詳細 schema 確定
- 高度な UI / app layer の設計
- code bulk など個別 API 論点の実装詳細そのもの

---

## 完了条件

- ADAM 開発の中で整備している骨格が、個別機能ではなく共通 operating model として説明できる
- intake routing / issue routing / planning / review の責務分離が説明できる
- roadmap / plan / operations の3階層が、短期・中期・上位計画として安定して説明できる
- ADAM 固有要素と EVE に展開できる共通骨格を分けて説明できる
- 直近の operations が、この plan を前進させる具体作業として読める状態になる
- 必要に応じて後続 design や docs 更新へつなげられる

---

## 主要論点

### 1. intake routing

- 未整理入力をどう受けるか
- issue / dev_memo / future / archive のどこへ送るか
- intake review ではなく routing として捉える方がよいか

### 2. issue routing

- issue を plan / operations / design / future にどう送るか
- issue は溜める場所、routing は流す場所として分離できるか
- 課題収集モードの後段に routing を置けるか

### 3. roadmap / plan / operations

- 上位計画、中位計画、短期実行順をどう分離するか
- operations のみを実行正本として扱えるか
- 一般業務版 EVE にも展開可能な planning model として見られるか

### 4. review の責務

- routing と review をどう分けるか
- daily / weekly / monthly review を何のために使うか
- review を進捗・整合・見直しに限定できるか

### 5. handover と再開

- handover を入口として使い、
  その後 docs / operations の正本へどう戻るか
- 再開品質を安定化する構造として成立しているか

### 6. ADAM と EVE の関係

- どこまでが ADAM 固有か
- どこからが共通骨格か
- EVE に展開するとき、どのレイヤーをそのまま使えるか

---

## 現時点の仮方針

- まず ADAM 側で共通骨格を整える
- routing と review は分離する
- roadmap / plan / operations の3階層を planning の中核にする
- handover は再開入口、docs は仕様正本、operations は短期実行順正本とする
- EVE への展開は意識するが、今は深掘りしすぎない
- docs 更新や repo-resource 周辺の直近整合を先に進める

---

## 関連 docs

- docs/05_roadmap.md
- docs/15_notes_system.md
- docs/10_repo_resource_api.md

---

## 関連 design

- notes/02_design/2026-03-28_standard_development_flow_routing_table.md
- notes/02_design/standard_development_flow_v2.md
- notes/02_design/2026-04-03_plan_layer_operating_spec.md
- notes/02_design/2026-04-03_review_system_operating_spec.md
- notes/02_design/2026-04-03_future_layer_operating_spec.md

---

## 関連 issue

- notes/01_issues/idea_log.md
  - 20260327-003
  - 20260403-003
  - 20260403-004

---

## 関連 dev memo

- notes/00_inbox/dev_memo/2026-03-27_15-35-00_adam_to_eve_workflow_expansion_idea.md
- notes/00_inbox/dev_memo/2026-04-03_eve_general_work_planning_layers_light_memo.md
- notes/00_inbox/dev_memo/2026-04-03_adam_eve_routing_and_planning_core_model.md

---

## 関連 operations

- notes/04_operations/2026-03-26_short_term_plan.md

---

## 次に落とす作業

- docs/05_roadmap.md に Phase 0 をどう位置づけるか整理する
- intake routing / issue routing の命名と責務を継続確認する
- 直近 issue を plan / operations / dev_memo へどう落とすかの運用を整える
- operations 側でこの plan に紐づく具体タスクを明示する
- 必要なら design へ昇格する論点を切り出す

---

## 次 plan 候補

- 2026-04_phase1_todoist_outlook_foundation.md
- 2026-04_phase1_schedule_proposal_and_outlook_write.md
- 2026-04_phase1_teams_and_obsidian_light_use.md
