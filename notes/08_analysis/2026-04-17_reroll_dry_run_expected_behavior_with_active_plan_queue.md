# 2026-04-17 reroll_dry_run_expected_behavior_with_active_plan_queue

## 目的

`active / plan / operations_queue`
を同じ土俵に乗せた reroll の dry run について、
現行 code を読んだうえでの想定挙動を固定する。

本メモは、
4/17 時点で追加した

- active source adapter
- item source_ref 保持
- plan_alignment / active_continuity / quick_win の最小 helper 比較

が、reroll にどう効くかを整理するための analysis である。

---

## 結論

現行 code では、
`generateRollingCandidatesFromNotes(...)` に

- Phase 0 plan
- current active_operations
- operations queue payload
- next_operations（現状空）

を渡した場合、
**plan 直結候補が上位に来やすく、同等帯では active 継続候補が queue 候補よりやや有利**
になる想定である。

ただし、
これはまだ

- 最小 helper 比較
- source_type と metadata による弱い優先づけ

の段階であり、
高度な reroll ではない。

---

## いま ranking に入っている比較順

現行 `ranking.js` の順序は次である。

1.
`plan_alignment`

2.
`importance`

3.
`active_continuity`

4.
`quick_win`

5.
`source_type`

6.
`review_at`

7.
`title`

このため、
少なくとも設計で意図した主従に近い形にはなった。

---

## source ごとの現状

### 1. plan

`buildPlanSourceBundle(...)` では、
plan 由来 item に

- `metadata.plan_alignment: direct`
- `importance: high`

が入る。

したがって、
plan 由来候補は最上位帯に来やすい。

### 2. active

`buildActiveOperationsSourceBundle(...)` では、
active 由来 item に

- `metadata.active_continuity: light`
- `metadata.plan_alignment`
  - source_ref に `03_plan` があれば `linked`

が入る。

つまり、
active task は

- plan 接続があれば `linked`
- active 継続補正があれば `light`

として比較土俵に戻る。

### 3. operations_queue

`buildOperationsQueueSourceBundle(...)` では、
queue payload に

- `metadata.plan_alignment`
  - source_ref に `03_plan` があれば `linked`
- `importance`
  - `impact_now`
 由来

が入る。

ただし、
active_continuity は持たない。

したがって、
同じ `linked`・同じ importance であれば、
active 候補が queue 候補より少し上に来やすい。

### 4. next

現在の `next_operations.md` は空であるため、
今回の dry run では実質影響しない。

---

## normalize の補正が効く点

今回の補正により、
normalized candidate は

- bundle 側 source_ref
- item 側 source_ref

をマージして保持する。

これは重要である。

これがないと、
active や queue が持っていた本来の task-level source_ref が落ち、
`plan_alignment: linked`
の推定も崩れやすかった。

現時点では、
少なくとも
**task が本来どの note / code / plan に接続していたか**
を reroll candidate 側へ残せるようになった。

---

## 想定される上位の並び

Phase 0 plan と current active の関係から、
最上位帯は次の順になりやすい。

### 第1帯

- plan 由来の `issue routing`
- plan 由来の `routing / review / operations` 骨格整理に直結する task

理由:

- `plan_alignment: direct`
- `importance: high`

を持つため。

### 第2帯

- current Day0 の `issue routing の後処理統合...`
- そのほか active の中で `03_plan` へ接続するもの

理由:

- `plan_alignment: linked`
- `active_continuity: light`

を持ちうるため。

### 第3帯

- operations queue 由来候補
- issue routing 由来 operations 候補

理由:

- source_ref に plan 接続があれば `linked`
- ただし active_continuity は持たないため、
  active と同等帯なら一段不利になりやすい。

### 第4帯

- next 候補
- plan 接続の弱い issue 候補

ただし、現時点では next は空である。

---

## この dry run で分かること

### 1. active は固定結果ではなく reroll 比較対象になった

以前は active が入力にいなかったため、
reroll は新規候補中心になりやすかった。

今は active も source の1種であり、
残すか落とすかを同じ土俵で比較できる。

### 2. plan を最上位に置く最小形は入った

plan 由来 item が `direct` を持つため、
少なくとも source_type だけよりは
設計意図に近い順位づけができる。

### 3. active continuity は light bias として効く

active 継続補正は、
plan を逆転する強さではなく、
同等帯比較で少し効く形になっている。

これは意図どおりである。

---

## まだ弱い点

### 1. plan_alignment が粗い

現状は

- `plan` source → `direct`
- source_ref に `03_plan` を含む → `linked`

だけである。

つまり、
本当に plan の主要論点に直結するかの意味理解はまだ弱い。

### 2. quick_win は受け皿だけで実データ未投入

`ranking.js` に比較軸はあるが、
現行 adapter ではほぼ `metadata.quick_win` が入らない。

したがって、
現時点の reroll で quick win は実質効いていない。

### 3. future 送り判定はまだ薄い

`rules.js` は
phase 不一致以外では、
operations candidate を比較的素直に operations へ通す。

したがって、
active stale や premature を十分に落とすほどの評価はまだない。

---

## 現時点の判断

4/17 時点の reroll は、
少なくとも次の段階まで進んだ。

- plan / active / queue を同じ土俵に乗せられる
- plan が最上位に来やすい
- active continuity が light bias として効く
- source_ref の文脈落ちが補正された

一方で、
まだ本格 reroll と言うには次が不足している。

- plan_alignment の精度
- quick_win の実入力
- stale / premature の future 判定

したがって、
**今の reroll は「設計方針に沿った最小 helper 付き reroll」までは到達した**
と評価するのが自然である。

---

## 次にやるべき1つ

次にやるべき1つは、
**quick_win を最小 schema として active / queue candidate に入れる入力点を決めること**
である。

理由:

- plan_alignment は最小形が入った
- active_continuity も light bias として入った
- 残る補助軸の中で、
  実運用価値に対して未接続なのが quick_win だから

ここを入れると、
「plan を壊さない範囲で、すぐ終わる task を少し押し上げる」
が初めて code 上でも実際に効き始める。
