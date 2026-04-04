# 2026-04-04 Repo Readthrough Findings

## 目的

docs / notes / code を横断読取した結果、
現時点で対応が必要な論点を整理する。

本メモは、
上位整合、仕様と実装の差分、
放置されている運用ズレ、
優先的に手を入れるべき箇所を明確にするための監査メモである。

---

## 結論

大きく見ると、
現在の repo は

- plan / operations / instruction / issue 側ではかなり前進している
- しかし docs の一部が旧い世界観のまま残っている
- notes の補助レイヤーにも移行途中のズレがある

という状態である。

最優先は、
`docs/05_roadmap.md` に Phase 0 を正式反映し、
Phase 0 → Phase 1 の上位整合を固めること。

その次に、
旧 docs 群、notes / reports 周辺、routing 系 design のズレを整理する必要がある。

---

## 優先度 High

### 1. `docs/05_roadmap.md` に Phase 0 が未反映

現状

- `notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md` は存在する
- `notes/04_operations/2026-03-26_short_term_plan.md` も Phase 0 前提で更新済み
- しかし `docs/05_roadmap.md` には開発フェーズが Phase 1 から始まっている

問題

- roadmap → plan → operations の階層がねじれている
- 日々の開発原則と上位 docs が一致していない
- 今の ADAM 開発の意味づけが docs 上で欠落している

対応

- `docs/05_roadmap.md` に Phase 0 を正式追加する
- Phase 0 = Common Operating Model Foundation として位置づける
- Phase 1 以降との前後関係を整理する

---

### 2. `docs/15_notes_system.md` が現行運用に追いついていない

現状

- instruction では `80_future` が導入済み前提
- design でも `80_future` の運用仕様が存在する
- しかし `docs/15_notes_system.md` の構成には `80_future` がない
- weekly report の保存ルールが instruction にはあるが、`notes/07_reports/weekly/` は未実体化

問題

- notes system docs と instruction / design / 実運用がずれている
- future 運用の正本が docs 側に未昇格
- report 構造の説明が不完全

対応

- `docs/15_notes_system.md` に `80_future` を反映する
- future の役割を active / archive との違い込みで反映する
- weekly report レイヤーの扱いを明文化する
- 必要なら `notes/07_reports/weekly/README.md` を実体化する

---

### 3. docs の旧仕様群が現行運用より古い

特にズレが大きい候補

- `docs/01_concept.md`
- `docs/02_architecture.md`
- `docs/06_obsidian_design.md`
- `docs/07_external_integration.md`
- `docs/08_dev_config.md`
- `docs/09_troubleshooting.md`
- `docs/13_dev_workflow.md`
- `docs/14_repo_knowledge_architecture.md`

観察

- `02_architecture.md` は旧 5-layer / Obsidian Vault 構造が中心
- `06_obsidian_design.md` も旧 Vault 構造前提
- `07_external_integration.md` は Teams 実装時期などが `05_roadmap.md` とズレる
- `08_dev_config.md` は `src/types/` など現行 tree にない構成を含む
- `13_dev_workflow.md` は notes/design への流れはあるが、現在の indexed notes / plan / operations / handover 運用を十分に反映していない
- `14_repo_knowledge_architecture.md` は将来構想寄りで、現行 repo-resource 実装との距離が大きい

問題

- docs を読んだだけでは現在の運用と実装が見えにくい
- 新しい骨格整理が docs 全体へ波及していない

対応

- 旧 docs 群を「現行仕様」「将来構想」「履歴的記録」に分類し直す
- 現行仕様として残すものは更新する
- 将来構想寄りのものは位置づけを明示する
- obsolete に近いものは最小限の整理方針を作る

---

## 優先度 Medium

### 4. routing 系 design が current model に追いついていない

対象候補

- `notes/02_design/standard_development_flow_v2.md`
- `notes/02_design/classification_and_routing_spec.md`
- `notes/02_design/intake_review_and_source_ref_spec.md`

観察

- `standard_development_flow_v2.md` は intake review 中心で、現在整理した `intake routing / issue routing / review / flow check` まで反映していない
- `classification_and_routing_spec.md` は `notes/knowledge` `notes/issues` など現行 notes 構造にない保存先を含む
- `intake_review_and_source_ref_spec.md` は source_ref 仕様として有効だが、routing terminology への更新余地がある

問題

- いまの共通骨格の整理と、既存 design が二重状態になっている
- 後で instructions / docs に昇格させる際のノイズになる

対応

- `review` と `routing` を分けた現行モデルへ寄せる
- 保存先を現行 indexed notes 構造に合わせる
- `flow check` の位置づけを後段として接続する

---

### 5. `notes/07_reports/README.md` が古い

現状

- `notes/07_reports/README.md` には `notes/reports/` と書かれている
- 実体は `notes/07_reports/daily` と `notes/07_reports/monthly`

問題

- README が移行途中のまま残っている

対応

- `notes/07_reports/README.md` を現行構造へ更新する
- daily / weekly / monthly の扱いを整理する

---

### 6. issue から plan / operations / dev_memo への落とし込み運用は未固定

現状

- issue 追加は進んでいる
- plan と operations も整ってきた
- ただし issue routing の運用ルールは docs / design で未固定

問題

- issue が蓄積される一方で、どの条件で plan / operations / dev_memo に送るかが明文化不足

対応

- issue routing の最小ルールを design として整理する
- operations generation rules と接続する

---

### 7. `flow check` と `dashboard` は論点化済みだが設計未着手

現状

- issue と dev memo には記録済み
- ただし design / operations への正式反映は未着手

対応

- Phase 0 の中で扱うか、future に送るかを判断する
- まず `flow check` の最小検知観点だけでも整理する

---

## 優先度 Low

### 8. `03_api_spec.md` と `04_data_model.md` は大枠は使えるが、現行モデルとの再整備余地がある

観察

- tasks API 自体は現行実装と概ね整合している
- ただし全体の planning / notes / routing / review モデルとはまだ接続が弱い
- `04_data_model.md` は EVE 全体のオブジェクト定義としては残せるが、今の Phase 0 / Phase 1 の実態とは距離がある

対応

- 先に roadmap / notes / workflow / docs legacy を整理する
- その後に API / data model を再接続する

---

## code 側の重要観察

### 1. `notes bulk` は実装済み

確認済み

- `src/services/repo-resource/notes.js`
- `api/repo-resource.js`
- `docs/10_repo_resource_api.md`

### 2. `code bulk` は未実装

確認済み

- `src/services/repo-resource/code.js`
- `api/repo-resource.js`
- `docs/10_repo_resource_api.md`

### 3. docs access は二系統のまま

確認済み

- legacy: `api/docs.js`, `api/docs-read.js`, `api/docs-bulk.js`, `src/services/github-docs.js`
- repo-resource: `src/services/repo-resource/docs.js`, `api/repo-resource.js`

対応

- issue `20260403-001` の通り、統一方針の確定が必要

---

## 推奨順

1. `docs/05_roadmap.md` に Phase 0 を反映する
2. `docs/15_notes_system.md` に `80_future` と reports 実態を反映する
3. `notes/07_reports/README.md` を現行構造へ更新する
4. 旧 docs 群の棚卸しメモを作る
5. issue routing の最小運用ルールを design 化する
6. `flow check` の最小検知観点を design 化する
7. code bulk / docs access 統合など実装基盤論点へ戻る

---

## 判断

現時点では、
個別実装を前に進めるよりも、
上位 docs と現行運用のねじれを先に解消した方がよい。

特に、

- roadmap の Phase 0
- notes system の future / reports
- 旧 docs 群の整理

は、今の骨格開発の前提整備として優先度が高い。
