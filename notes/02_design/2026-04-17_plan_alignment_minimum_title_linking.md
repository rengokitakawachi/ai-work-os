# 2026-04-17 plan_alignment_minimum_title_linking

## 目的

`plan_alignment` の粗さを、
小さく安全に改善する。

本メモは、
現状の

- `plan` source なら `direct`
- `source_ref` に `03_plan` があれば `linked`

だけでは弱いので、
plan title と candidate title の近さを使った
最小補強を定義するための design である。

---

## 結論

最小改善として、
**plan の主要論点 / 次に落とす作業の title と、candidate title の近接一致**
を見て `plan_alignment: linked` を補う。

ただし、
これは意味理解ではなく
**文字列近接による薄い補強**
に留める。

---

## 何を改善したいか

現状は、
plan alignment が次の2段階しかない。

- `direct`
- `linked`（source_ref に `03_plan` がある）

このため、
実際には plan の主要論点に近い task でも、
source_ref に plan file が入っていなければ
`linked` にならない。

特に、

- active task
- operations_queue candidate
- issue candidate

でこの取りこぼしが起こりやすい。

---

## 最小改善案

plan bundle を作るときに、
次を title index として保持する。

- `主要論点` の title 群
- `次に落とす作業` の title 群

そのうえで、
non-plan candidate について
次を確認する。

- candidate title と plan title に十分な語の重なりがあるか

十分近い場合は、
`plan_alignment: linked` を補う。

---

## 近接判定の原則

高度な意味推論はやらない。

最小段階では、
次のような薄い判定でよい。

- title を軽く正規化する
- 記号を落とす
- 2文字以上の token を取る
- token の重なりが一定以上なら linked とみなす

例えば、

- `issue routing の後処理統合と可変評価 schema の整理を進める`
- `issue routing`

のように、
重要語が重なる場合は linked とみなしうる。

---

## やりすぎない条件

次はやらない。

- embedding 的な意味類似
- 日本語の高度な形態素解析
- fuzzy match の過剰導入
- score による複雑な連続値評価

理由:
- いま欲しいのは最小補強だから
- 誤判定で plan を過剰に広げたくないから

---

## 優先順位

plan_alignment の決定順は次とする。

1.
`source_type: plan`
→ `direct`

2.
`source_ref` に `03_plan` がある
→ `linked`

3.
plan title index と candidate title が十分近い
→ `linked`

4.
それ以外
→ 空

つまり、
既存判定を壊さずに、
3番目の薄い補強だけを足す。

---

## code 側の最小含意

最小実装で必要なのは次である。

1.
plan bundle 作成時に `plan_titles` を保持する

2.
rolling source bundle 組成時に、
plan title index を他 bundle に渡す

3.
active / issue / queue / next item の
`plan_alignment` が空のときだけ、
title 近接で `linked` を補う

---

## 判断

`plan_alignment` の最小改善としては、
**plan title と candidate title の近接一致を使って linked を補う**
のが自然である。

この形なら、
source_ref 依存だけでは拾えない plan 接続を少し補える一方、
設計全体を重くせずに済む。
