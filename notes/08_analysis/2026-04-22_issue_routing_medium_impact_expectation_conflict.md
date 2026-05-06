# 2026-04-22 issue_routing_medium_impact_expectation_conflict

## 対象

最新 HEAD `caa58ca` に対する正式 test 再実行で発生した `issue-routing.test.js` fail 2件の読み取りを整理する。

---

## 結論

現時点では、`rules.test.js` と `issue-routing.test.js` の間に **medium-impact issue の期待不一致** がある。

したがって、ここで code をさらに直す前に、
まず

- medium-impact architecture issue
- medium-impact operations issue

を issue routing でどこへ送るべきかを固定する必要がある。

---

## 正式 fail

最新 HEAD `caa58ca` の正式結果では、次の 2 件が fail した。

1.
`routeSingleIssueCandidate routes medium-impact architecture issue to design`
- actual: `issue`
- expected: `design`

2.
`routeSingleIssueCandidate routes medium-impact operations issue to operations`
- actual: `issue`
- expected: `operations`

---

## code 構造

`routeSingleIssueCandidate`
は内部で

- `evaluateCandidates`
- `buildPlacementDecisions`

を使う。

`source_type === 'issue'` の candidate は、
最終的に `evaluateIssueCandidate` の判定に従う。

したがって、
`issue-routing.test.js` の medium-impact issue 期待は、
`rules.js` の issue routing 判定と整合している必要がある。

---

## 期待不一致

### A. `rules.test.js`

既存 test:
- `evaluateCandidate keeps non-high-impact open issue in issue`

入力:
- `sourceType: 'issue'`
- `category: 'architecture'`
- `impact_now: 'medium'`

期待:
- `route_to: 'issue'`

### B. `issue-routing.test.js`

既存 test:
- `routeSingleIssueCandidate routes medium-impact architecture issue to design`
- `routeSingleIssueCandidate routes medium-impact operations issue to operations`

入力:
- `source_type: 'issue'`
- `impact: 'medium'`
- `category: 'architecture'` または `operations`

期待:
- `design` または `operations`

---

## 判断

これは単なる実装バグというより、
**test 群の期待がまだ揃っていない** 状態と見るのが自然である。

少なくとも architecture issue については、

- medium-impact でも design へ送るのか
- non-high-impact なら issue に残すのか

が test 間で一致していない。

operations issue についても同様に、

- medium-impact でも operations candidate 化するのか
- non-high-impact なら issue keep を優先するのか

を固定する必要がある。

---

## 次の自然な判断ポイント

1.
issue routing の keep bias は
`non-high-impact なら category より優先`
なのか

2.
architecture / operations category は
`medium-impact でも route を上書きする`
のか

3.
この判断を
- `rules.test.js`
- `issue-routing.test.js`
- 必要なら design / notes

で同じ方針に揃える

---

## 暫定提案

現在の ADAM 運用方針では、
issue routing は

- 振り分け先がまだ自然でなければ issue に残してよい
- active へ急がず、candidate / design / future を慎重に切る

を重視している。

そのため、暫定的には

- non-high-impact issue は keep bias を優先し issue に残す

の方が運用原則には整合しやすい。

ただし、これは architecture / operations category を medium-impact でも送る設計を明示的に否定するものではなく、
最終判断は test と spec の整合確認後に行うべきである。
