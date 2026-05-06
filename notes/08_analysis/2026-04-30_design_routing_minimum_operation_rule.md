# 2026-04-30 design routing minimum operation rule

## 目的

`design routing の最小運用ルールを確認する` の成果物として、design layer の routing 判定軸を整理する。

特に次を分ける。

- docs 昇格
- design retain
- future/design
- archive
- operations candidate

また、design routing が review の代替ではないことを確認する。

---

## source_ref

- docs/15_notes_system.md
- notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md
- notes/04_operations/active_operations.md

---

## 前提

docs/15 によれば、notes は思考・運用レイヤーであり、SSOT ではない。

正式仕様は docs に置く。

design は docs 直前の構造整理レイヤーであり、実装より先に構造整理が必要な論点を保持する。

design routing は、design を評価し、次のいずれかへ送る判定である。

- docs
- design
- future/design
- archive
- operations candidate

review は進行中資産の更新を担い、routing の代替ではない。

---

## design routing の基本判断

design routing は、design note を読んで次を判断する usecase とする。

1. docs 昇格できるか
2. design に残すべきか
3. future/design へ送るべきか
4. archive してよいか
5. operations candidate 化すべきか

design routing は、保存先や次処理を決める routing であり、daily / weekly review の代替ではない。

---

## route: docs

### 判定

docs へ昇格するのは、次を満たす場合に限る。

- 目的が明確
- 責務が明確
- 命名が確定
- 例外が見えている
- 実装方針または運用方針が説明できる
- 安定仕様として扱える
- docs 側の既存仕様と矛盾しない
- docs 更新後に実装 / operations / runtime へ影響がある場合、その follow-up を説明できる

### 注意

- notes から直接 docs を書き換えない。
- docs 更新前に対象 docs を読む。
- docs 更新 proposal では、ユーザーが全文不要と明示しない限り、更新後全文を提示する。
- docs は仕様 SSOT であり、design はその前段である。

---

## route: design retain

### 判定

design に残すのは、次の場合。

- 論点は有効だが、まだ仕様化には早い
- 目的や責務は見えているが、例外が未整理
- 実装方針が未確定
- 複数案比較が残っている
- docs へ昇格すると premature specification になる
- 今は operations candidate 化するほど実行可能ではない

### 注意

design retain は放置ではない。

残す場合は、次のいずれかを明示する。

- 次に確認する論点
- docs 昇格条件
- future/design へ送る条件
- archive 条件
- operations candidate 化条件

---

## route: future/design

### 判定

future/design へ送るのは、次の場合。

- 論点は有効だが、現 phase 対象外
- 前提となる docs / code / runtime / external condition が未整備
- 今扱うと active の焦点を壊す
- 将来の phase では再評価価値がある
- weekly / monthly review など再評価地点を持てる

### 注意

future/design は archive ではない。

将来再評価するため、次を残す。

- なぜ今やらないか
- いつ / 何をきっかけに再評価するか
- どの docs / plan / operations と関係するか

---

## route: archive

### 判定

archive してよいのは、次の場合。

- 役目終了が明確
- docs / design / operations / future へ必要な知見が移送済み
- 再評価前提を持たない
- 置換済みまたは重複済み
- 現行仕様・現行設計と矛盾し、復帰可能性が低い

### 注意

archive は premature に使わない。

内容上まだ論点が残る場合は、archive ではなく design retain / future/design / operations candidate を検討する。

---

## route: operations candidate

### 判定

operations candidate 化するのは、次の場合。

- design note から具体的な実行 task が切り出せる
- 0.5〜1.5h 程度の task shape にできる
- completed condition を観測で閉じられる
- active / next / future の配置を rolling で比較する価値がある
- docs / code / runtime / operations の整合回復に効く
- 後続 task を実行可能にする前提作業である

### 注意

operations candidate は即 active 化ではない。

candidate は rolling で比較し、active / next / future のどこへ置くか判断する。

特に、会話中に design から実行候補が出ても、active に横入りさせない。

---

## design routing と review の違い

### design routing

- design note の行き先を決める
- docs / design / future/design / archive / operations candidate へ分類する
- routing 結果と follow-up state を明示する
- routing usecase であり、review ではない

### review

- 進行中資産を見直す
- daily / weekly / monthly の文脈で operations / plan / future を調整する
- report は review の結果物であり、review そのものではない
- review は routing の代替ではない

---

## 最小 checklist

design routing 実行時は次を確認する。

- [ ] 対象 design note を読んだ
- [ ] docs 昇格条件を満たすか確認した
- [ ] design retain なら、残す理由と次確認点を明示した
- [ ] future/design なら、今やらない理由と再評価地点を明示した
- [ ] archive なら、役目終了または置換済みを確認した
- [ ] operations candidate なら、task shape と completed condition を作れるか確認した
- [ ] operations candidate を即 active 化していない
- [ ] design routing を review の代替として扱っていない

---

## completed condition 対応

対象 task:

`design routing の最小運用ルールを確認する`

completed condition:

- docs / design / future/design / archive / operations candidate の判定軸を確認する
- docs 昇格条件と design retain 条件を分ける
- design routing が review の代替ではないことを確認する

対応:

- route 先ごとの判定軸を整理した。
- docs 昇格条件と design retain 条件を分離した。
- design routing と review の違いを明示した。

---

## 判断

design routing の最小運用ルールは、現行 docs/15 と Phase 0 plan の範囲で説明可能である。

現時点で docs 更新は不要。

次の active task では、実データから design routing 候補を棚卸しし、この判定軸が実例で破綻しないか確認する。
