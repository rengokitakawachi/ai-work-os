# 2026-04-17 title_based_plan_linking_expected_hits

## 目的

4/17 に追加した
`plan title` と `candidate title` の近接一致による
`plan_alignment: linked` 補強が、
実際にどの候補へ効きやすいかを整理する。

本メモは、
source_ref だけでは拾えない plan 接続を
どこまで補えるかを、
active / queue / issue の観点で確認するための analysis である。

---

## 結論

現時点で最も効きやすいのは、
**Day0 の `issue routing` 系 active task** である。

一方で、

- `daily review`
- `content 抽出`
- `stale active`
- `05_decisions`

のような候補は、
現在の Phase 0 plan title とは直接の語重なりが弱く、
この最小 title linking だけでは `linked` になりにくい。

つまり、
今回の改善は
**Phase 0 の中心論点に近い task を少し拾いやすくする補強**
としては有効だが、
review 系や周辺整備系を広く拾うものではない。

---

## plan 側の title source

今回の linking で index 化されるのは、
Phase 0 plan の次である。

### 主要論点

- intake routing
- issue routing
- roadmap / plan / operations
- review の責務
- handover と再開
- ADAM と EVE の関係

### 次に落とす作業

- docs/05_roadmap.md に Phase 0 をどう位置づけるか整理する
- intake routing / issue routing の命名と責務を継続確認する
- 直近 issue を plan / operations / dev_memo へどう落とすかの運用を整える
- operations 側でこの plan に紐づく具体タスクを明示する
- 必要なら design へ昇格する論点を切り出す

---

## 効きやすい候補

### 1. Day0

- `issue routing の後処理統合と可変評価 schema の整理を進める`

これは、
plan title の

- `issue routing`
- `intake routing / issue routing の命名と責務を継続確認する`

と語重なりがあるため、
`linked` が乗りやすい。

この候補は、
source_ref に plan file がなくても、
今回の title linking だけで
Phase 0 中核候補として拾いやすくなる。

### 2. queue 側の issue routing 接続修正候補

例えば、

- `issue routing queue payload の metadata を補強する`
- `issue routing 後処理の queue payload を整える`

のような候補も、
`issue routing` との語重なりで `linked` になりやすい。

したがって、
operations_queue の中でも
issue routing 直結の小修正は拾いやすい。

---

## 効きにくい候補

### 1. Day1

- `daily review の出力から content 抽出と operations rolling の接続ルールを design 観点で整理する`

この title は、
plan の `review の責務` とは概念上近いが、
文字列重なりは薄い。

したがって、
現行の最小 title linking では
`linked` が乗らない可能性が高い。

### 2. Day2

- `stale active の整合回復ルールを design に整理する`

これは operations 運用上重要だが、
plan title 側に `stale active` という語がないため、
この最小補強だけでは拾いにくい。

### 3. Day3

- `ADAM で試す 05_decisions の最小運用モデルを design に整理する`

これも Phase 0 の文脈には乗るが、
plan title 側と直接の語重なりが弱い。

### 4. Day4〜Day6

- `scoring knowledge`
- `docs 番号衝突`
- `Phase 1 各 plan と operations 接続案`

このあたりも、
現行 title linking の範囲では
直接拾いにくい。

---

## 何が改善されたか

改善点は明確である。

以前は、
plan file を source_ref に持たない限り
`linked` を取りにくかった。

今は、
少なくとも

- issue routing
- intake routing
- roadmap / plan / operations
- review

のように、
plan title と candidate title の重要語が重なるものは
`linked` を補いやすくなった。

特に、
Phase 0 の中心論点に近い task を
source_ref 依存だけで取りこぼしにくくなったのは大きい。

---

## まだ残る弱さ

### 1. 概念近接は拾えない

`review の責務`
と
`daily review の出力から content 抽出...`
のように、
概念としては近いが文字列が直接重ならないものは弱い。

### 2. token overlap が粗い

いまは薄い語重なりで見るだけなので、
将来的に false positive / false negative は残る。

### 3. 日本語 title の揺れに弱い

言い換えや長い表現の差を吸収する設計ではない。

---

## 現時点の判断

今回の title-based plan linking は、
**Phase 0 のど真ん中にある issue routing 系 task を拾う補強**
としては有効である。

一方で、
review 系・content 系・周辺整備系まで広く拾うにはまだ弱い。

したがって、
今の評価は次が自然である。

- Day0 の本筋候補には効きやすい
- queue の issue routing 直結小修正にも効きやすい
- Day1 以降の周辺候補まではまだ十分拾えない

この段階でも、
plan_alignment の精度は source_ref 依存だけの状態より一段よくなっている。
