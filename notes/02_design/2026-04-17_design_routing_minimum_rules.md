# 2026-04-17 design_routing_minimum_rules

## 目的

`routeDesignCandidates`
が使う最小 rule 群を、
code-ready な形で固定する。

本メモは、
design candidate を

- `docs`
- `design`
- `future`
- `archive`
- `operations`

のどこへ送るかを、
曖昧な総合判断ではなく
**優先順を持つ rule 評価**
として整理することを目的とする。

---

## 結論

最小段階では、
次の順で route を判定する。

1.
`archive`

2.
`future`

3.
`docs`

4.
`operations`

5.
`design`

つまり、

```text
archive
→ future
→ docs
→ operations
→ design
```

の順で最初に当たった route を採用する。

`design` は fallback とする。

---

## なぜこの順か

### 1. archive は最優先で除外判定だから

役目を終えた design は、
他の候補として比較しない方が自然である。

したがって、
obsolete / duplicate / merged / superseded は
最初に archive 判定する。

### 2. future は現時点で扱わない判定だから

将来向けで、
今は active な routing 比較に乗せるべきでない design は、
早めに future へ退避した方がよい。

### 3. docs は昇格先なので高い優先度を持つから

docs_ready な design を、
operations 候補や retain と競合させるより、
まず docs 候補として扱う方が自然である。

### 4. operations は docs の代替ではないから

execution value が高くても、
docs_ready なら docs 候補が優先である。

したがって、
operations は docs 判定の後に置く。

### 5. design retained は fallback だから

まだ草案段階で、
archive / future / docs / operations のどれにも当たらないものを
`design`
へ残すのが自然である。

---

## rule 0: 入力正規化

判定前に少なくとも次を正規化する。

- `maturity_now`
- `execution_value_now`
- `docs_ready_now`
- `reason`
- `review_at`
- `metadata`

参照優先順位は次とする。

1.
routing decision

2.
default assessment

3.
未設定

未設定の場合は保守的に `design` retained へ寄せる。

---

## rule 1: archive 判定

次のいずれかを満たせば `archive`。

- `maturity_now = superseded`
- `reason` に `obsolete / duplicate / merged / superseded` 相当がある
- `metadata.superseded_by` がある

### 返り値

- `route_to: archive`
- `next_action: archive_design`

### 意味

これは
「役目終了」
の除外判定である。

---

## rule 2: future 判定

archive でなく、
次のいずれかを満たせば `future`。

- `review_at = weekly_review` または `monthly_review` で、今すぐ扱わないことが明確
- `reason` に `later / future / deferred / phase later` 相当がある
- `metadata.related_plans` や phase 文脈から、現 phase 外が明確

### 返り値

- `route_to: future`
- `next_action: create_future_design_draft`

### 意味

これは
「将来再評価」
の退避判定である。

---

## rule 3: docs 判定

archive / future でなく、
次を満たせば `docs`。

- `docs_ready_now = true`
- `maturity_now = ready`

加えて、
少なくとも reason で次が説明できることが望ましい。

- 目的が明確
- 責務が明確
- 命名が固まっている
- 例外が見えている
- 実装方針が説明できる

### 返り値

- `route_to: docs`
- `next_action: prepare_docs_candidate`

### 意味

これは
「docs 昇格候補」
の判定である。

---

## rule 4: operations 判定

archive / future / docs でなく、
次を満たせば `operations`。

- `execution_value_now = high` または `medium`
- 実装 / 調査 / 接続作業として rolling 比較に載せる価値がある

追加で、
次のいずれかがあると自然である。

- plan / current active に近い
- design から実行タスクへ落としやすい
- 低摩擦で小さく前進できる

### 返り値

- `route_to: operations`
- `next_action: enqueue_operations_candidate`

### 意味

これは
「実行候補化」
の判定である。

ただし docs_ready の代替ではない。

---

## rule 5: design retained

上記どれにも当たらなければ `design`。

典型は次である。

- `maturity_now = draft`
- `maturity_now = maturing`
- `docs_ready_now = false`
- `execution_value_now` が低い、または未設定

### 返り値

- `route_to: design`
- `next_action: keep_design`

### 意味

これは
「まだ設計草案として保持する」
の fallback である。

---

## tie-break の考え方

最小段階では、
複数 route を score で競わせない。

優先順で最初に当たったものを採用する。

理由:
- まずは解釈の一貫性が重要だから
- 複数軸の重みづけを早く入れすぎないため

---

## route ごとの例

### archive

- 旧 design が新 design に吸収された
- duplicate な draft が残っている

### future

- Phase 2 以降で扱う設計
- 今月は触らないが monthly review で再評価したい

### docs

- 責務と命名が固まり、docs へ昇格してよい設計

### operations

- 設計はまだ docs 昇格には早いが、実装・調査 task として落としたい

### design

- まだ考え中の草案
- 境界未確定の設計メモ

---

## code 側への含意

最小実装では、
`routeDesignCandidate(candidate)`
のような関数で十分である。

流れは次でよい。

1.
normalize evaluation fields

2.
if archive → return archive decision

3.
if future → return future decision

4.
if docs → return docs decision

5.
if operations → return operations decision

6.
return design decision

この形なら、
後で各 rule を個別関数へ分けやすい。

---

## issue routing との関係

issue routing は issue / design / operations / future / archive / keep_issue を扱うが、
design routing では

- docs
- design
- future
- archive
- operations

を扱う。

違いはあるが、

- archive を除外系 rule として先に見る
- future を退避系 rule として先に見る
- fallback を keep 系にする

という構造は揃えられる。

---

## 判断

`routeDesignCandidates`
の最小 rule 設計としては、

```text
archive
→ future
→ docs
→ operations
→ design
```

の優先順で判定するのが自然である。

この順なら、
役目終了・将来送り・docs 昇格・実行候補化・草案保持
の責務が混ざりにくく、
code へも素直に落としやすい。
