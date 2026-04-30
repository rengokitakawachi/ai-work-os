# 2026-04-30 weekly review routing session integration

## 目的

weekly review に routing session を組み込む設計を整理する。

routing core は、蓄積された未整理情報を精査し、chunk / theme に分解し、関連情報と結合し、docs / design / issue / operations candidate / future / archive / content へ送ることで、情報の滞留を解消し、再利用価値を高める usecase である。

この routing core を実運用で発動させる自然な地点は weekly review である。

---

## source_ref

- notes/02_design/2026-04-30_routing_core_concept_redefinition.md
- notes/08_analysis/2026-04-30_routing_session_checklist.md
- docs/15_notes_system.md
- docs/17_operations_system.md
- notes/08_analysis/2026-04-30_phase0_hardening_weekly_readiness_review_draft.md

---

## 現行 docs 上の位置づけ

docs/15 では、weekly report は roadmap / plan / operations / future の整合確認と方針整理を担う。

docs/17 では、weekly review は rolling の再設計地点であり、7日構成の再設計、優先順位再構築、next_operations 再評価、archive_operations snapshot 保存を担う。

ただし現行 docs では、weekly review に routing session を明示的に含める記述は弱い。

---

## 追加すべき考え方

weekly review は、operations の再設計だけではなく、蓄積情報の滞留を解消する節目でもある。

したがって weekly review は、次を扱う。

1. plan / operations / future の再設計
2. active / next / archive_operations の整理
3. inbox / dev memo / issue / design / analysis の滞留確認
4. routing session による chunk 分解・統合・価値化
5. postprocess decision
6. content seed 抽出
7. operations candidate を rolling へ渡す

---

## weekly review 内の routing session

## 1. routing session input

weekly review で routing session の input として確認するもの。

### notes/00_inbox

- 未整理 web clip
- dev memo
- raw memo
- imported article
- digest file
- 判断済みだが未移動の file

### notes/01_issues

- open issue
- keep issue
- future issue
- closed だが archive 未判断の issue
- operations candidate 化できる issue

### notes/02_design

- docs 昇格候補
- design retain
- future/design 候補
- archive candidate
- operations candidate 化できる design

### notes/08_analysis

- observation note
- decision note
- completed recognition
- 継続観測項目
- plan / design / operations / content に返すべき分析

### notes/09_content

- content seed
- note 記事化候補
- 収益化に向けた素材
- daily review で拾った学び

### notes/80_future

- 再評価地点に来た future item
- phase 移行で戻すべき future item
- まだ future に残すべき item

### archive decision backlog

- archive 判定済みだが未移動の file
- source_ref は残っているが元 file が滞留しているもの
- pending 理由が失効したもの

---

## 2. routing session work

weekly review 内で routing session は次を行う。

### source inspection

- [ ] 対象 source を読む
- [ ] 古いもの、滞留しているものを優先する
- [ ] 未整理と処理済みを分ける
- [ ] source_ref を派生先に残せるか確認する

### chunk / theme decomposition

- [ ] file を chunk / item / theme に分解する
- [ ] 1 file 1 destination と決めつけない
- [ ] chunk ごとに destination を判断する
- [ ] 判断不能 chunk を pending として分ける

### integration / value-up

- [ ] 同テーマの notes / issue / design / analysis を確認する
- [ ] 重複を統合する
- [ ] 複数 source から価値ある theme を作る
- [ ] design / issue / content / operations candidate へ育てる

### destination decision

- [ ] docs candidate
- [ ] design
- [ ] issue
- [ ] operations candidate
- [ ] future
- [ ] archive
- [ ] pending
- [ ] content

### postprocess decision

- [ ] 元 source file を archive するか
- [ ] pending に残すか
- [ ] retain するか
- [ ] future に送るか
- [ ] split required とするか
- [ ] physical move を今回行うか、別 task 化するか

---

## 3. routing session output

weekly review の routing session は、最低限次を出力する。

```text
routing_session_summary:
scope:
processed_sources:
derived_outputs:
operations_candidates:
content_seeds:
archive_decisions:
pending_decisions:
retain_decisions:
split_required:
physical_moves_done:
physical_moves_pending:
remaining_gates:
next_review:
```

---

## 4. weekly review output への接続

routing session の結果は weekly review の各 output へ接続する。

### active_operations / next_operations

routing session から出た operations candidate は、weekly review / rolling で active / next / future に配置する。

注意:

- routing session から active へ直行しない
- rolling で dependency / blocker / priority / Day capacity を確認する

### archive_operations

完了 task や archive decision は、weekly review で archive_operations snapshot または archive layer へ送る。

注意:

- archive 判定と物理移動は別
- physical move には Write Gate が必要

### notes/80_future

今は扱わないが再評価価値があるものを送る。

必要事項:

- なぜ今やらないか
- 再評価地点
- 関連 source_ref

### notes/09_content

将来 note 記事化・収益化できる素材を送る。

対象例:

- 設計判断
- 失敗談
- before / after
- 読者への示唆
- AI Work OS / ADAM / EVE / DELTA の開発過程
- routing / review / rolling の運用知見

### notes/99_archive

役目終了した source を送る。

条件:

- chunk / theme が派生先へ送られている
- source_ref が残っている
- 元 file を残す理由がない
- pending 理由がない

---

## 5. weekly review completed condition への追加

weekly review の completed condition に routing session を追加する。

追加案:

```text id="02gkos"
- inbox / dev memo / issue / design / analysis の滞留を確認する
- routing session を実行し、chunk 分解・統合・destination・postprocess を記録する
- archive 判定済み未移動を確認する
- pending 理由を再評価する
- content seed を notes/09_content 候補として抽出する
- routing から出た operations candidate を rolling へ渡す
```

---

## 6. daily review との分担

### daily review

daily review は軽い整理を扱う。

- 当日の実績確認
- completed task 確認
- active / next / archive_operations 更新
- daily report
- content seed の軽い抽出
- 目立つ archive / pending candidate の記録

daily review では、重い routing session は原則行わない。

### weekly review

weekly review は本格 routing session を扱う。

- 蓄積情報の棚卸し
- chunk 分解
- 統合・価値化
- archive / pending / future の整理
- content seed の集約
- operations candidate の rolling 接続

---

## 7. docs / procedure 反映候補

この設計は、将来的に次へ反映する価値がある。

### docs/15_notes_system.md

反映候補:

- weekly review は routing session を含む
- routing は蓄積情報の整理・価値化・滞留解消 usecase
- inbox は保管場所ではなく、routing session により後続 layer へ流す
- content seed は weekly review で抽出・整理する

### docs/17_operations_system.md

反映候補:

- weekly review の input に routing session output を追加する
- operations candidate は routing session から流入し、rolling で active / next / future に配置する
- archive decision と physical move を分ける

### adam_knowledge.md

反映候補:

- weekly review procedure に routing session step を追加する
- routing session checklist を procedure として参照する
- review と routing の違いを保ちながら、weekly review 内で routing session を呼び出す構造にする

### adam_instruction.md

現時点では直接追加不要。

理由:

- instruction には既に review / routing / rolling を混同しない rule と Proactive Focus Completion Guard がある。
- routing core の詳細は knowledge / docs / checklist 側に置く方が適切。
- ただし、routing を単なる都度 triage と誤認する再発が続く場合は instruction 反映を検討する。

---

## 8. remaining gates

この note 作成後に残る gate:

1. docs/15 への反映要否を判断する
2. docs/17 への反映要否を判断する
3. adam_knowledge.md の weekly review procedure 更新要否を判断する
4. archive 判定済み未移動一覧を作る
5. 実際の weekly review で routing session を試行する

---

## completed condition

対象 task:

`weekly review procedure に routing session を組み込む`

completed condition:

- weekly review の input に inbox / dev memo / issue / design / analysis / content seed を追加する
- weekly review の output に archive move / pending decision / content seed / operations candidate を追加する
- operations / content / archive との接続を整理する

対応:

- weekly review input に routing session 対象 layer を追加した。
- weekly review output に archive / pending / retain / split / content seed / operations candidate を追加した。
- operations / content / archive との接続を整理した。
- docs / procedure 反映候補を整理した。

---

## 判断

weekly review は、operations 再設計だけでなく、蓄積情報の routing session を発動する主要地点として扱うべきである。

これにより、routing は都度 issue 処理ではなく、滞留した情報を活かす装置として運用できる。

次に必要なのは、archive 判定済み未移動一覧の作成、または docs/15 / docs/17 / knowledge への反映判断である。
