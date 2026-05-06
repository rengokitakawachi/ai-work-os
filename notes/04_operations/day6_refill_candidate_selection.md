# 2026-04-12 day6_refill_candidate_selection

## 目的

`Day6 補充候補を reroll 観点で選定する`
の成果物として、
次の 7日枠に入れる候補を比較し、
補充案を 1 件に絞る。

本メモは daily review / weekly review で
active_operations を再編するときの判断材料とする。

---

## 結論

Day6 補充の第一候補は、

- `review system と operations rolling の接続ルールを design 観点で確認する`

とする。

次点候補は、

- `Phase 0 完了条件に対する未充足項目を洗い出す`

とする。

---

## 比較対象

### next_operations 上位候補

1.
`review system と operations rolling の接続ルールを design 観点で確認する`

2.
`Phase 0 完了条件に対する未充足項目を洗い出す`

3.
`docs / notes / instruction の operations 周辺未反映差分を一覧化する`

4.
`latest handover 起点の次作業選定と active_operations 先頭の解釈ルールを整理する`

### plan 側の次作業候補

- `intake routing / issue routing の命名と責務を継続確認する`
- `直近 issue を plan / operations / dev_memo へどう落とすかの運用を整える`
- `operations 側でこの plan に紐づく具体タスクを明示する`

---

## 評価軸

- Phase 0 直結度
- execution governance との接続度
- 今の active / next 整理との連続性
- weekly review に返しやすいか
- 1 task として扱いやすいか

---

## 候補評価

### 1. `review system と operations rolling の接続ルールを design 観点で確認する`

評価

- Phase 0 直結度: 高
- execution governance 接続度: 高
- 連続性: 高
- weekly review 接続: 高
- 粒度安定性: 高

判断

- conversation routing
- active-first execution
- daily review 固定の rolling
- report は review の結果物である
という今回の整理を、
review spec と operations rolling の接続としてまとめ直せる

補充候補として最も自然

---

### 2. `Phase 0 完了条件に対する未充足項目を洗い出す`

評価

- Phase 0 直結度: 高
- execution governance 接続度: 中
- 連続性: 高
- weekly review 接続: 高
- 粒度安定性: 高

判断

- Phase 0 の残差分確認として重要
- ただし、
  review と operations の接続整理を先に行った方が
  未充足評価の基準が安定する

第一候補の次点

---

### 3. `docs / notes / instruction の operations 周辺未反映差分を一覧化する`

評価

- Phase 0 直結度: 中
- execution governance 接続度: 中
- 連続性: 中
- weekly review 接続: 中
- 粒度安定性: 高

判断

- 重要だが、
  docs 候補整理が終わった直後にやるより、
  review / Phase 0 残差分確認のあとで十分

---

### 4. `latest handover 起点の次作業選定と active_operations 先頭の解釈ルールを整理する`

評価

- Phase 0 直結度: 中
- execution governance 接続度: 中
- 連続性: 中
- weekly review 接続: 中
- 粒度安定性: 中

判断

- 再開品質には重要
- ただし handover は通常返却先ではない前提に整理し直したため、
  今の優先度は一段下がる

---

### 5. plan 側の未 task 化候補

評価

- Phase 0 直結度: 高
- execution governance 接続度: 低〜中
- 連続性: 中
- weekly review 接続: 中
- 粒度安定性: 低

判断

- 論点としては重要
- ただし現時点では operations task としての粒度がまだ粗い
- reroll 補充候補としては、
  既存の next_operations 上位 task を優先する方が安全

---

## 採用案

### 第一候補

- `review system と operations rolling の接続ルールを design 観点で確認する`

採用理由

- execution governance の試験結果を、
  review system 側へ返す最後の接続点として価値が高い
- weekly review とも直結する
- 既存 next の最上位であり、reroll 観点でも無理がない

### 次点候補

- `Phase 0 完了条件に対する未充足項目を洗い出す`

採用理由

- 第一候補を終えたあとに、
  その結果を使って Phase 0 の残差分を確認する流れが自然

---

## 今回採用しないもの

- `docs / notes / instruction の operations 周辺未反映差分を一覧化する`
- `latest handover 起点の次作業選定と active_operations 先頭の解釈ルールを整理する`
- plan 側の未 task 化候補

理由

- いずれも重要ではあるが、
  Day6 補充としては一段後ろでよい
- 既存 next の Phase 0 直結 task を先に消化する方が、
  weekly review との整合がよい

---

## weekly review での使い方

weekly review で active / next を再設計する際は、
Day6 補充候補として以下の順で扱う。

1.
`review system と operations rolling の接続ルールを design 観点で確認する`

2.
`Phase 0 完了条件に対する未充足項目を洗い出す`

3.
`docs / notes / instruction の operations 周辺未反映差分を一覧化する`

---

## 判断

現時点の reroll 観点では、
Day6 補充は新規 candidate を起こすよりも、
既存 next の最上位にある
Phase 0 直結 task を採用する方が自然である。

したがって、
Day6 補充の第一候補は
`review system と operations rolling の接続ルールを design 観点で確認する`
とする。
