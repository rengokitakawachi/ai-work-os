# 2026-04-04 docs 05 roadmap phase0 update draft

## 目的

`docs/05_roadmap.md` に Phase 0 を正式反映するための更新草案を作る。

現在は、

- `notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md`
- `notes/04_operations/2026-03-26_short_term_plan.md`

が Phase 0 前提で動いている一方、
`docs/05_roadmap.md` は Phase 1 開始のままであり、
roadmap → plan → operations の階層にねじれがある。

本草案では、差分最小で Phase 0 を追加し、
上位計画の整合を回復する。

---

## 更新方針

- 既存の Phase 1〜4 の並びは維持する
- その手前に Phase 0 を追加する
- roadmap の対象を EVE 単体ではなく、AI Work OS / EVE の段階整理として読めるよう最小修正する
- 現在の plan / operations と整合する記述だけを追加する
- 未確定な projection 詳細まではこの更新で広げない

---

## 反映ポイント

### 1. 目的の修正

現行

- 本ドキュメントは、EVE システムの上位開発計画を定義する。

更新案

- 本ドキュメントは、AI Work OS / EVE の上位開発計画を定義する。

意図

- Phase 0 は EVE 実行系の前段にある共通 operating model foundation であるため、EVE 単体の roadmap と読むとズレる
- ただし、以降の Phase 1〜4 は EVE 実行系の段階として残す

---

### 2. 前提 / 定義への追加

追加案

- Phase 0 は、EVE の実行系機能を本格的に前進させる前に、AI Work OS 全体に共通する operating model を整備する段階とする。
- Phase 1 以降は、Phase 0 の共通骨格の上で EVE の実行系と外部接続を前進させる段階とする。

---

### 3. 開発フェーズに Phase 0 を追加

追加セクション案

### Phase 0: Common Operating Model Foundation

目的

ADAM の開発を通じて、
AI Work OS 全体に共通する operating model を整備する。

範囲

- intake routing の位置づけ整理
- issue routing の位置づけ整理
- roadmap / plan / operations の3階層整理
- routing と review の責務分離
- handover を入口にした再開構造の整理
- docs / notes / code / operations の正本関係整理
- ADAM 固有要素と EVE 共通骨格の分離整理

位置づけ

この phase は、
EVE の実行系機能を本格的に進める前に、
AI Work OS 全体に共通する operating model を定義する foundation phase とする。

Phase 1 以降の EVE 実行系 plan 群は、
この共通骨格の上で進める。

完了イメージ

- intake routing / issue routing / roadmap / plan / operations / review の責務分離が説明できる
- ADAM 固有要素と EVE に展開できる共通骨格を分けて説明できる
- handover を入口にした再開構造が整理されている
- Phase 1 の EVE 実行系 plan を支える上位骨格が整っている

現在の plan

- notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md

---

### 4. Phase 1 の位置づけの補足

補足案

- この phase は、Phase 0 で整備した共通骨格の上で、EVE の最小実行系を成立させる段階とする。

意図

- Phase 0 と Phase 1 の前後関係を明示する

---

### 5. 現在の進捗認識の修正

更新案

### Phase 0

進行中。

以下は整理・plan 化済み。

- ADAM / EVE 共通 operating model の plan 化
- operations の Phase 0 前提更新
- routing / planning / review の責務分離整理

対象 plan

- notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md

### Phase 1

準備進行中。

以下は plan 化済み。

- Todoist / Outlook foundation
- schedule proposal / Outlook write
- Teams / Obsidian light use

意図

- 現時点では Phase 1 実装というより、Phase 1 の plan 群が準備済みという表現が自然

---

## 最小差分の考え方

この更新では以下は変えない。

- Phase 1〜4 の大枠
- Todoist / Outlook / Teams / Obsidian / MindMeister の位置づけ
- review セクションの大枠
- 未解決課題一覧

まずは Phase 0 不在という上位整合のねじれを解消することを優先する。

---

## 関連

- docs/05_roadmap.md
- notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md
- notes/04_operations/2026-03-26_short_term_plan.md
- notes/02_design/2026-04-03_plan_layer_operating_spec.md
- notes/02_design/2026-04-03_review_system_operating_spec.md
