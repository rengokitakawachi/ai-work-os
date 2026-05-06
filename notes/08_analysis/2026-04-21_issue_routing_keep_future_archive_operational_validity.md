# 2026-04-21 issue_routing_keep_future_archive_operational_validity

## 目的

issue routing における
`keep / future / archive`
の使い分けが、
運用上も破綻しないかを整理する。

本メモは、
第一バッチと第二バッチの観測結果をもとに、
各 route の役割差、再評価地点、
実運用上の自然さを 1 枚に固定するための analysis である。

---

## 参照

- `notes/08_analysis/2026-04-21_issue_routing_first_batch_observation.md`
- `notes/08_analysis/2026-04-21_issue_routing_first_batch_reobservation_after_gate_adjustment.md`
- `notes/08_analysis/2026-04-21_issue_routing_second_batch_dry_run_observation.md`
- `notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md`
- `notes/02_design/2026-04-20_issue_routing_minimum_operation_experiment.md`
- `src/services/flow-control/rules.js`

---

## 結論

現行 rules と今回の batch 観測に基づく限り、
`keep / future / archive`
の役割差は次のように整理すると自然である。

- `keep`
  = 現 phase 内で保持するが、
    まだ送付先を強く決めない保留レイヤー

- `future`
  = 今は扱わないが、
    将来また評価する前提で保持する deferred レイヤー

- `archive`
  = 役目終了として再評価対象から外す終了レイヤー

この 3 層は、
役割差として十分に説明可能であり、
今回の観測範囲では破綻していない。

ただし、
`future` と `keep` の境界は
運用説明を明示しないと混線しやすいため、
再評価地点の固定が重要である。

---

## 役割差

### 1. keep

意味:
- 今の phase 対象内
- open のまま保持する
- ただし design / operations / future / archive へはまだ強く送らない

典型条件:
- status: `open`
- category が弱い
- impact が high ではない

今回の代表例:
- `20260421-025`

実運用上の自然さ:
- 弱い issue をいきなり別送付先へ流さず、
  issue log に残して再評価できる
- keep は「未処理の溜まり場」ではなく、
  軽い保留レイヤーとして使うのが自然

再評価地点:
- `daily_review`
  が基本で自然

理由:
- open のまま現在進行形の論点であるため
- 完全に将来送りではないため

---

### 2. future

意味:
- 今は扱わない
- ただし将来また評価する前提で保持する
- keep よりも「今やらない理由」が強い

典型条件:
- status が `open` 以外
- または phase 不一致

今回の代表例:
- `20260421-026`

実運用上の自然さ:
- `deferred / pending / blocked` のような issue を
  keep に残すより分かりやすい
- 「保留」ではなく「今は対象外」という意味を表現できる

再評価地点:
- `weekly_review`
  が自然

理由:
- 今この日次運用で毎日見直す必要は薄い
- 状態変化や phase 変化を待って再評価する方が自然

---

### 3. archive

意味:
- 終了済み
- 再評価対象から外す
- keep や future と違って、継続前提を持たない

典型条件:
- status: `closed`
- 役目終了が明確

今回の代表例:
- `20260421-027`

実運用上の自然さ:
- 終了済み論点が issue log に残り続けない
- future のような「後でまた見る」意味も持たない

再評価地点:
- 基本は不要
- 必要なら daily review で archive 移送確認のみ

理由:
- 実質的に close 扱いだから
- 継続運用ではなく終了管理の層だから

---

## 境界が混線しやすい点

### keep と future

最も混線しやすいのはここである。

区別は次で固定するのが自然である。

- `keep`
  = open のまま現 phase 内で保留
- `future`
  = 今は対象外、または前提待ちで deferred

つまり、
「まだ open で、今期の論点として残す」のが keep、
「今は扱わない」のが future である。

---

### future と archive

ここは比較的明確である。

- `future`
  = 将来再評価する
- `archive`
  = 終了済みで再評価前提を持たない

したがって、
closed issue を future に入れるのは不自然である。

---

### keep と archive

ここも比較的明確である。

- `keep`
  = open のまま残す
- `archive`
  = closed として終える

したがって、
closed なのに keep に残る挙動は避けたい。

---

## batch 観測との対応

### 第一バッチ補正前
- `issue` に偏った
- keep が強すぎた

### 第一バッチ補正後
- design / operations は回復
- keep の強すぎ問題は緩和

### 第二バッチ
- `issue / future / archive` を比較できる入力が揃った
- 各 route の役割差を説明できる状態になった

この流れから、
現時点では
`keep / future / archive`
の役割差は運用上も十分説明可能と整理できる。

---

## 現時点の妥当性判断

### keep
- 妥当
- ただし category 弱 / medium issue に限定して残すのが自然

### future
- 妥当
- non-open または phase 不一致の受け皿として自然

### archive
- 妥当
- closed / 役目終了の明確な受け皿として自然

総合判断:
- 3 層とも現時点では破綻していない
- 問題は層の存在ではなく、
  それぞれをどう説明するかにある

---

## まだ残る注意点

### 1. keep の濫用

keep が広がりすぎると、
第一バッチ補正前と同じく
送付先へ流れない構造に戻る。

したがって、
keep は「弱い issue の保留」に留める方がよい。

### 2. future の説明不足

future は、
単なる後回しではなく
「今は対象外 / 前提待ち」の意味で使う必要がある。

この説明がないと、
keep との差が曖昧になる。

### 3. archive の premature 使用

status だけで閉じていても、
内容上まだ論点が残るなら archive は premature になる。

archive は
「役目終了が明確」
を条件にすべきである。

---

## 次に自然なタスク

1.
issue routing の完成条件観測として、
この妥当性整理を active_operations に反映する

2.
補助確認として
`node --test`
を行う

3.
必要なら
queue → rolling adapter の最小実装論点へ進む

---

## 判断

今回の batch 観測を踏まえると、
`keep / future / archive`
は、
役割差と再評価地点を明示すれば
運用上破綻しない。

したがって、
issue routing の完成条件にある
「keep / archive / defer の判断が、運用上も破綻しない」
については、
少なくとも設計観測レベルでは
成立にかなり近づいたと判断してよい。
