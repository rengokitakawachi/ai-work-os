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
- notes/08_analysis/2026-04-30_weekly_review_routing_session_integration.md
- notes/02_design/2026-05-01_routing_type_destination_constraints.md
- docs/15_notes_system.md
- docs/17_operations_system.md

---

## routing session の基本姿勢

routing session は、次を目的にする。

- 未整理情報の滞留を解消する
- 情報を chunk / theme に分解する
- 関連情報と結合して価値を高める
- source_ref を残して再利用可能にする
- docs candidate / design / issue / operations candidate / future / archive / content / decision へ送る
- 元 file の postprocess を決める
- archive 判定だけで放置しない

routing session は、pre-routing / triage とは異なる。

pre-routing / triage は会話中や issue 発生時の軽量分類であり、routing session は蓄積情報の整理・価値化・滞留解消である。

routing は「無理に流す」処理ではない。

保持が最適な場合は issue keep / design retain を選んでよい。  
ただし保持する場合は、保持理由、再評価地点、次に見る条件を明示する。

inbox は未整理情報の入口であり保管庫ではない。  
routing 後、inbox はできるだけ空に近い方がよい。

---

## routing session output types

routing session の出力型は次に分ける。

### 1. transform routing

source file から情報を chunk に分解し、関連 chunk を統合し、新しい整理済み file を作る。

標準処理:

1. source file を読む
2. chunk / theme に分解する
3. 関連 source と結合する
4. 新しい整理済み file を作成する
5. 新 file に `source_ref` を入れる
6. 元 source file の役目が終わったら archive へ移す

例:

```text
old:
notes/00_inbox/article_a.md
notes/00_inbox/article_b.md

new:
notes/02_design/2026-04-30_ai_agent_operation_principles.md

archive:
notes/99_archive/00_inbox/article_a.md
notes/99_archive/00_inbox/article_b.md
```

### 2. relocation routing

既存 file の内容価値はそのまま残し、より適切な layer へ移す。

例:

```text
old:
notes/02_design/foo.md

new location:
notes/80_future/design/foo.md
```

relocation は archive ではない。

relocation では、必要に応じて移動先 file に routing metadata を追加する。

```markdown
## routing note

- routed_at: YYYY-MM-DD
- from: <old path>
- reason: <why this layer is more appropriate>
- recheck: <when / where to revisit>
```

### 3. retain routing

現 layer に残す理由が明確な場合、retain とする。

retain は滞留ではなく、意図的な現 layer 維持である。

### 4. pending routing

判断不能理由があり、解除条件と再評価地点がある場合、pending とする。

pending は逃げ場ではない。

### 5. archive routing

役目終了した file を archive へ移す。

archive 先は原則として、`notes/99_archive/<same-layer>/...` とする。

例:

```text
notes/00_inbox/foo.md
→ notes/99_archive/00_inbox/foo.md

notes/02_design/bar.md
→ notes/99_archive/02_design/bar.md

notes/08_analysis/baz.md
→ notes/99_archive/08_analysis/baz.md
```

---

## routing destination constraints quick reference

### destination

routing destination は原則として次を使う。

- issue
- operations candidate
- design
- docs candidate
- future
- decision
- content
- archive

### state / postprocess

以下は destination ではなく state / postprocess として扱う。

- pending
- retain
- relocation
- split required

### analysis

analysis は routing destination ではなく、作業ログである。

### content

content は外部記事要約ではなく、AI Work OS / ADAM / EVE / DELTA の開発・運用から生まれた独自価値のネタ帳である。

### intake routing

- primary: issue / design / future / archive
- allowed: operations candidate / content
- exceptional: docs candidate / decision
- note: inbox は routing 後できるだけ空に近づける

### issue routing

- primary: operations candidate / design / future / archive / issue
- allowed: decision
- exceptional: docs candidate / content
- note: issue を無理に operations / design に送らない。issue keep は正当な destination。

### design routing

- primary: docs candidate / design / future / archive / operations candidate
- allowed: decision / issue / content
- exceptional: none
- note: 今すぐ着手しない design を無理に future へ送らない。design retain は正当な判断。

### routing session

- primary: issue / operations candidate / design / future / archive
- allowed: docs candidate / decision / content
- exceptional: none
- note: routing session は個別 routing の batch ではなく、横断統合 usecase。

---

## 0. session setup

routing session 開始前に確認する。

- [ ] routing 対象範囲を決めた
- [ ] session の目的を1文で書ける
- [ ] weekly review の一部か、dedicated routing session かを決めた
- [ ] 対象 layer を決めた
  - [ ] inbox
  - [ ] dev memo
  - [ ] issue
  - [ ] design
  - [ ] analysis
  - [ ] content seed
  - [ ] future / pending
- [ ] routing type / destination constraints を確認した
- [ ] routing output type を使う方針を確認した
  - [ ] transform
  - [ ] relocation
  - [ ] retain
  - [ ] pending
  - [ ] archive
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
- [ ] routing 後に inbox を空に近づける方針を確認した
- [ ] pending として残す場合、未処理理由 / 解除条件 / 再評価地点を持てるか確認した

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
- [ ] design 化できる issue を抽出した
- [ ] issue keep が妥当なものを抽出した
- [ ] issue keep の場合、保持理由 / 再評価地点 / 次に見る条件を明示できるか確認した

### design

- [ ] design note の滞留を確認した
- [ ] docs 昇格候補を抽出した
- [ ] design retain が妥当なものを抽出した
- [ ] future/design へ relocation すべきものを抽出した
- [ ] archive candidate を抽出した
- [ ] operations candidate 化できるものを抽出した
- [ ] issue 化すべき未解決問題を抽出した
- [ ] content seed になりうる独自価値を抽出した
- [ ] 今すぐ着手しないだけで future に送っていないか確認した
- [ ] design retain の場合、保持理由 / 再評価地点 / 次に見る条件を明示できるか確認した

### analysis

- [ ] analysis note のうち、再利用すべき判断材料を確認した
- [ ] plan / design / operations / content に返すべきものを抽出した
- [ ] observation と decision を分けた
- [ ] completed recognition と継続観測を分けた
- [ ] analysis を final destination として扱っていないか確認した

### content seed

- [ ] note 記事化できる素材を抽出した
- [ ] 失敗談 / 設計判断 / before-after / 読者への示唆を分けた
- [ ] AI Work OS / ADAM / EVE / DELTA の開発過程として価値があるか確認した
- [ ] 外部記事要約だけを content として扱っていないか確認した
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
- [ ] transform routing が必要な chunk を抽出した
- [ ] relocation routing で十分な file を抽出した
- [ ] issue keep / design retain が最適な chunk を無理に流していないか確認した

chunk 記録形式:

```text
source:
chunk_id:
summary:
related_sources:
candidate_destination:
value_if_combined:
routing_output_type:
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
- [ ] AI Work OS 由来の独自価値として content seed にできるか確認した
- [ ] docs 昇格候補として安定しているか確認した
- [ ] transform routing で作る新 file の destination を決めた
- [ ] new file に含める source_ref を決めた

value-up 記録形式:

```text
theme:
combined_sources:
new_value:
destination:
reason:
remaining_uncertainty:
```

---

## 4. destination decision

chunk / theme / file ごとに destination を決める。

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
- [ ] design retain する場合、保持理由と再評価地点が明確

### issue

- [ ] 未解決問題である
- [ ] completed condition を作れる、または issue keep 理由を説明できる
- [ ] design / operations / future に送る前に問題として保持すべき
- [ ] issue が溜まり場にならないよう route point を持てる
- [ ] issue keep する場合、保持理由と再評価地点が明確

### operations candidate

- [ ] 0.5〜1.5h 程度の task shape にできる
- [ ] completed condition を観測で閉じられる
- [ ] active / next / future の配置を rolling で比較する価値がある
- [ ] 即 active 化していない

### future / relocation

- [ ] 今は扱わない理由がある
- [ ] phase 不一致 / 前提待ち / 優先度待ちが説明できる
- [ ] 再評価地点がある
- [ ] archive ではない
- [ ] existing file をそのまま future/design などへ移す方が自然か判断した
- [ ] relocation metadata が必要か判断した
- [ ] 単に今着手しないだけで future に送っていないか確認した

### archive

- [ ] 役目終了が明確
- [ ] source_ref が派生先に残っている
- [ ] 元 file を残す必要が弱い
- [ ] pending 理由を1文で説明できない
- [ ] archive destination が `notes/99_archive/<same-layer>/...` で決まっている
- [ ] routing session 内で physical move してよいか判断した
- [ ] archive 前に必要情報が適切な destination へ移ったか確認した

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
- [ ] AI Work OS / ADAM / EVE / DELTA の開発・運用から生まれた独自価値である
- [ ] 外部記事や design 内容の単なる要約ではない
- [ ] notes/09_content に送る候補として扱う

destination 記録形式:

```text
chunk_or_theme_or_file:
routing_output_type:
destination:
reason:
source_ref:
completed_condition_or_recheck:
```

---

## 5. output creation

routing session で作る output を決める。

### transform output

- [ ] 新 file の destination を決めた
- [ ] 新 file の title / filename を決めた
- [ ] 新 file の目的を明記した
- [ ] 新 file に `source_ref` を入れた
- [ ] chunk / theme の統合結果を入れた
- [ ] 元 source file の postprocess を決めた
- [ ] 元 source file が archive 対象なら archive destination を決めた

transform output 記録形式:

```text
new_file:
source_ref:
combined_chunks:
new_value:
old_files_postprocess:
archive_destinations:
```

### relocation output

- [ ] existing file の価値をそのまま保つ方がよい
- [ ] 現 layer より適切な destination layer がある
- [ ] archive ではなく relocation である
- [ ] relocation destination を決めた
- [ ] 必要なら routing metadata を追加する
- [ ] old path と new path を記録する

relocation output 記録形式:

```text
old_file:
new_file:
reason:
recheck:
metadata_added:
```

---

## 6. postprocess decision

元 source file ごとに postprocess を決める。

postprocess options:

- archive
- pending
- retain
- relocate
- split required
- delete candidate

### archive

- [ ] 主要 chunk が派生先へ送られた
- [ ] source_ref が派生先に残っている
- [ ] 元 file を inbox / dev memo / design / analysis に残す理由がない
- [ ] archive 移動先が `notes/99_archive/<same-layer>/...` で明確
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

### relocate

- [ ] existing file をそのまま別 layer に移す方が自然
- [ ] relocation destination が明確
- [ ] archive ではない理由が明確
- [ ] recheck point がある

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

```text
source_file:
postprocess:
reason:
physical_move_now:
next_action:
```

---

## 7. physical move / write handling

routing session で write / move が必要な場合の扱い。

- [ ] write 前に対象を read した
- [ ] create 前に同名・近接ファイルを確認した
- [ ] update は full replacement と理解している
- [ ] append に `<<APPEND>>` を使っていない
- [ ] transform output の新 file を作る場合、source_ref を入れた
- [ ] relocation の場合、old path / new path / reason / recheck を記録した
- [ ] archive の場合、destination は原則 `notes/99_archive/<same-layer>/...` とした
- [ ] archive / move / delete 前に影響範囲を確認した
- [ ] Write Gate を出した
- [ ] write 後に read-back / sha 確認した
- [ ] physical move できない場合、move candidate として記録した

注意:

```text
archive 判定と archive 移動は別。
ただし archive 判定だけで放置し続けると、routing の滞留解消価値が落ちる。

routing session 内で archive decision が clear なものは、Write Gate 後に archive へ移してよい。
迷うもの、確認 gate が残るもの、delete が絡むものは pending / candidate として残す。
```

---

## 8. outputs

routing session の出力は最低限次を含む。

- [ ] routing session summary
- [ ] processed sources
- [ ] chunk / theme decomposition
- [ ] integration / value-up result
- [ ] routing output type decisions
- [ ] transform outputs
- [ ] relocation outputs
- [ ] destination decisions
- [ ] postprocess decisions
- [ ] operations candidates
- [ ] content seeds
- [ ] archive / pending / retain / relocation / split required 一覧
- [ ] physical move done / not done
- [ ] remaining gates
- [ ] next review point

summary format:

```text
routing_session:
scope:
processed_sources:
transform_outputs:
relocation_outputs:
operations_candidates:
content_seeds:
archive_decisions:
pending_decisions:
retain_decisions:
physical_moves:
remaining_gates:
next_review:
```

---

## 9. weekly review integration

weekly review で routing session を使う場合、次を確認する。

- [ ] inbox / dev memo の滞留が減った
- [ ] issue / design / analysis の滞留が減った
- [ ] archive 判定済み未移動が減った
- [ ] issue keep の理由と再評価地点が明示された
- [ ] design retain の理由と再評価地点が明示された
- [ ] pending 理由が更新された
- [ ] content seed が抽出された
- [ ] transform output が作成された
- [ ] relocation output が記録された
- [ ] operations candidate が rolling に渡された
- [ ] future / archive / retain が更新された
- [ ] source_ref が残っている
- [ ] physical move が必要なら Write Gate 付きで扱った

---

## completed condition

この checklist update の completed condition:

- routing session の出力型を transform / relocation / retain / pending / archive に分ける
- transform では新 file 作成・source_ref・old file archive を標準処理として明記する
- relocation では existing file を別 layer へ移す条件を明記する
- archive 先は原則 `notes/99_archive/<same-layer>/...` とする rule を明記する
- routing type / destination constraints を quick reference として明記する
- inbox は routing 後できるだけ空に近い方がよいと明記する
- issue keep / design retain は正当な判断と明記する
- content は本システム由来の独自価値に限定すると明記する
- analysis は routing destination ではないと明記する
- 更新後 read-back / sha を確認する

対応:

- routing session output types section を追加した。
- transform routing の標準処理を追加した。
- relocation routing と routing metadata を追加した。
- archive same-layer rule を追加した。
- routing destination constraints quick reference を追加した。
- inbox / issue / design / analysis / content の実行チェックを補強した。
- output creation section を追加した。
- physical move / write handling に transform / relocation / same-folder archive rule を追加した。

---

## 判断

この checklist により、routing core concept は実運用へ落とせる状態に近づいた。

routing session は、単なる行き先判定ではなく、transform / relocation / retain / pending / archive を使い分けながら、情報を価値化し、滞留を解消する usecase として扱う。

ただし routing は「無理に流す」処理ではない。  
issue keep / design retain は正当な判断である。

一方で inbox は未整理情報の入口であり、routing 後はできるだけ空に近づける。

次に必要なのは、docs/15 / docs/17 への安定仕様反映判断、または adam_knowledge.md の Routing Procedure への最新 constraints 反映である。
