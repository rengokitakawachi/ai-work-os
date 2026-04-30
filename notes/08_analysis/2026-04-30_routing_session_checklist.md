# 2026-04-30 routing session checklist

## 目的

蓄積情報整理・価値化 routing を実行するための checklist を定義する。

routing は、単なる行き先判定や folder 移動ではない。  
蓄積された inbox / dev memo / issue / design / analysis / web clip / content seed を精査し、chunk 分解・統合・価値化・配置・postprocess を行い、情報の滞留を解消する usecase である。

この checklist は、weekly review または dedicated routing session で使用する。

---

## source_ref

- notes/02_design/2026-04-30_routing_core_concept_redefinition.md
- notes/08_analysis/2026-04-30_phase0_hardening_weekly_readiness_review_draft.md
- notes/08_analysis/2026-04-30_intake_routing_archive_pending_reobservation.md
- notes/08_analysis/2026-04-30_design_routing_candidate_inventory.md
- docs/15_notes_system.md
- docs/17_operations_system.md

---

## routing session の基本姿勢

routing session は、次を目的にする。

- 未整理情報の滞留を解消する
- 情報を chunk / theme に分解する
- 関連情報と結合して価値を高める
- source_ref を残して再利用可能にする
- docs / design / issue / operations candidate / future / archive / content へ送る
- 元 file の postprocess を決める
- archive 判定だけで放置しない

routing session は、pre-routing / triage とは異なる。

pre-routing / triage は会話中や issue 発生時の軽量分類であり、routing session は蓄積情報の整理・価値化・滞留解消である。

---

## 0. session setup

routing session 開始前に確認する。

- [ ] routing 対象範囲を決めた
- [ ] session の目的を1文で書ける
- [ ] weekly review の一部か、dedicated routing session かを決めた
- [ ]対象 layer を決めた
  - [ ] inbox
  - [ ] dev memo
  - [ ] issue
  - [ ] design
  - [ ] analysis
  - [ ] content seed
  - [ ] future / pending
- [ ] physical move を今回行うか、postprocess decision までに留めるかを決めた
- [ ] write が必要な場合は Write Gate を出す方針を確認した

---

## 1. source collection

対象 source を集める。

### inbox

- [ ] notes/00_inbox の滞留 file を確認した
- [ ] raw clip / digest / user memo / imported article を区別した
- [ ] 処理済みっぽい file と未処理 file を分けた
- [ ] 古い file を優先対象に入れた
- [ ] source_ref を派生先に残せるか確認した

### dev memo

- [ ] 開発メモの滞留を確認した
- [ ] 実装判断 / 失敗 / TODO / 設計論点を分けた
- [ ] 他の design / issue / operations と関係するか確認した
- [ ] content seed になりうる学びを確認した

### issue

- [ ] open issue / keep issue / future issue を確認した
- [ ] issue が未処理の溜まり場になっていないか確認した
- [ ] route_to が必要な issue を抽出した
- [ ] completed / archive できる issue を抽出した
- [ ] operations candidate 化できる issue を抽出した

### design

- [ ] design note の滞留を確認した
- [ ] docs 昇格候補を抽出した
- [ ] design retain が妥当なものを抽出した
- [ ] future/design 候補を抽出した
- [ ] archive candidate を抽出した
- [ ] operations candidate 化できるものを抽出した

### analysis

- [ ] analysis note のうち、再利用すべき判断材料を確認した
- [ ] plan / design / operations / content に返すべきものを抽出した
- [ ] observation と decision を分けた
- [ ] completed recognition と継続観測を分けた

### content seed

- [ ] note 記事化できる素材を抽出した
- [ ] 失敗談 / 設計判断 / before-after / 読者への示唆を分けた
- [ ] AI Work OS / ADAM / EVE / DELTA の開発過程として価値があるか確認した
- [ ] notes/09_content に送るべきか判断した

---

## 2. chunk / theme decomposition

対象 source ごとに chunk / theme に分解する。

- [ ] 1 file 1 destination と決めつけていない
- [ ] file を item / chunk / theme に分解した
- [ ] chunk ごとに意味を説明できる
- [ ] chunk ごとに destination を分けられる
- [ ] 重複 chunk を見つけた
- [ ] 他 source と結合できる chunk を見つけた
- [ ] 単独では弱いが、他情報と合わせると価値が出る chunk を見つけた
- [ ] 判断不能 chunk を pending 候補として分けた

chunk 記録形式:

```text
source:
chunk_id:
summary:
related_sources:
candidate_destination:
value_if_combined:
postprocess_note:
```

---

## 3. integration / value-up

分解した chunk を他情報と結合して価値化する。

- [ ] 同じテーマの notes / issues / design / analysis を確認した
- [ ] 重複を統合した
- [ ] 古い情報と新しい情報の関係を確認した
- [ ] external / web 情報は最新性確認が必要か判断した
- [ ] 複数 source をまとめて design note にできるか確認した
- [ ] issue にするべき未解決問題を抽出した
- [ ] operations candidate にできる具体 task を抽出した
- [ ] content seed として読者価値がある形にできるか確認した
- [ ] docs 昇格候補として安定しているか確認した

value-up 記録形式:

```text id="5hlj15"
theme:
combined_sources:
new_value:
destination:
reason:
remaining_uncertainty:
```

---

## 4. destination decision

chunk / theme ごとに destination を決める。

### docs candidate

- [ ] 安定仕様として扱える
- [ ] docs 既存仕様と矛盾しない
- [ ] design より docs が適切
- [ ] docs 更新対象が明確
- [ ] docs update proposal guard が必要と判断した

### design

- [ ] 構造整理が必要
- [ ] docs 昇格にはまだ早い
- [ ] 責務や例外を整理する価値がある
- [ ] future/design より現 phase に近い

### issue

- [ ] 未解決問題である
- [ ] completed condition を作れる
- [ ] design / operations / future に送る前に問題として保持すべき
- [ ] issue が溜まり場にならないよう route point を持てる

### operations candidate

- [ ] 0.5〜1.5h 程度の task shape にできる
- [ ] completed condition を観測で閉じられる
- [ ] active / next / future の配置を rolling で比較する価値がある
- [ ] 即 active 化していない

### future

- [ ] 今は扱わない理由がある
- [ ] phase 不一致 / 前提待ち / 優先度待ちが説明できる
- [ ] 再評価地点がある
- [ ] archive ではない

### archive

- [ ] 役目終了が明確
- [ ] source_ref が派生先に残っている
- [ ] 元 file を残す必要が弱い
- [ ] pending 理由を1文で説明できない
- [ ] physical move の要否を判断した

### pending

- [ ] 判断不能な理由を1文で説明できる
- [ ] 追加確認が必要
- [ ] 最新性確認が必要
- [ ] chunk 分解が未完
- [ ] 再評価地点がある

### content

- [ ] 将来 note 記事化できる
- [ ] 収益化を見据えた読者価値がある
- [ ] 設計判断 / 失敗 / before-after / 示唆がある
- [ ] notes/09_content に送る候補として扱う

destination 記録形式:

```text id="ciyg1i"
chunk_or_theme:
destination:
reason:
source_ref:
completed_condition_or_recheck:
```

---

## 5. postprocess decision

元 source file ごとに postprocess を決める。

postprocess options:

- archive
- pending
- retain
- future
- split required
- delete candidate

### archive

- [ ] 主要 chunk が派生先へ送られた
- [ ] source_ref が派生先に残っている
- [ ] 元 file を inbox / dev memo に残す理由がない
- [ ] archive 移動先が明確
- [ ] physical move を今回するか、review action に送るかを決めた

### pending

- [ ] pending 理由を1文で書ける
- [ ] 何を確認すれば pending 解除できるか明確
- [ ] 再評価地点がある
- [ ] pending が逃げになっていない

### retain

- [ ] 現 layer に残す理由がある
- [ ] 次に確認する論点が明確
- [ ] 滞留ではなく意図的 retain である

### split required

- [ ] 1 file 内に複数 theme が残っている
- [ ] 派生 note 作成が必要
- [ ] split 後の source_ref 方針がある

### delete candidate

- [ ] 重複または不要である
- [ ] archive ではなく delete する理由がある
- [ ] delete 前に対象と影響範囲確認が必要
- [ ] Write Gate が必要

postprocess 記録形式:

```text id="k44dnw"
source_file:
postprocess:
reason:
physical_move_now:
next_action:
```

---

## 6. physical move / write handling

routing session で write / move が必要な場合の扱い。

- [ ] write 前に対象を read した
- [ ] create 前に同名・近接ファイルを確認した
- [ ] update は full replacement と理解している
- [ ] append に `<<APPEND>>` を使っていない
- [ ] archive / move / delete 前に影響範囲を確認した
- [ ] Write Gate を出した
- [ ] write 後に read-back / sha 確認した
- [ ] physical move できない場合、move candidate として記録した

注意:

```text id="xexqk1"
archive 判定と archive 移動は別。
ただし archive 判定だけで放置し続けると、routing の滞留解消価値が落ちる。
```

---

## 7. outputs

routing session の出力は最低限次を含む。

- [ ] routing session summary
- [ ] processed sources
- [ ] chunk / theme decomposition
- [ ] integration / value-up result
- [ ] destination decisions
- [ ] postprocess decisions
- [ ] operations candidates
- [ ] content seeds
- [ ] archive / pending / retain / split required 一覧
- [ ] physical move done / not done
- [ ] remaining gates
- [ ] next review point

summary format:

```text id="wqm85o"
routing_session:
scope:
processed_sources:
derived_outputs:
operations_candidates:
content_seeds:
archive_decisions:
pending_decisions:
physical_moves:
remaining_gates:
next_review:
```

---

## 8. weekly review integration

weekly review で routing session を使う場合、次を確認する。

- [ ] inbox / dev memo の滞留が減った
- [ ] issue / design / analysis の滞留が減った
- [ ] archive 判定済み未移動が減った
- [ ] pending 理由が更新された
- [ ] content seed が抽出された
- [ ] operations candidate が rolling に渡された
- [ ] future / archive / retain が更新された
- [ ] source_ref が残っている
- [ ] physical move が必要なら Write Gate 付きで扱った

---

## completed condition

この checklist の completed condition:

- inbox / dev memo / issue / design / analysis / content seed の確認項目を作る
- chunk 分解 / 統合 / source_ref / postprocess / physical move の checklist を作る
- weekly review で使える形式にする

対応:

- 各 layer の確認項目を作成した。
- chunk 分解 / 統合 / destination / postprocess / physical move の checklist を作成した。
- weekly review integration section を作成した。

---

## 判断

この checklist により、routing core concept は実運用へ落とせる状態に近づいた。

次に必要なのは、weekly review procedure へ routing session を組み込むこと、または archive 判定済み未移動一覧を作ることである。
