# 2026-04-18 score_driven_operations_ranking_minimum_model

## 目的

operations rolling の優先順位づけを、
将来的に score 主導へ寄せていくための最小モデルを定義する。

本メモは、

- score を単なる補助メモで終わらせない
- ただし今すぐ 1 本の点数だけで全決定しない
- knowledge 蓄積と相性のよい形へ段階移行する

ことを目的とする。

---

## 結論

最小モデルでは、
優先順位づけを次の 3 層に分ける。

```text
1. gate
2. score
3. override
```

### 1. gate

まず、
その候補が現在の operations ranking 対象に入るかを判定する。

### 2. score

gate を通った候補に対して、
比較可能な要素を score 化し、
原則として score 順に並べる。

### 3. override

ただし、
現段階では例外的な人間判断や運用上の明示補正を許す。

この形により、

- knowledge の蓄積先を score に寄せられる
- future 判定や phase 不一致を score に無理に押し込まなくて済む
- 完全自動化前でも移行しやすい

---

## なぜ 1 本の score にしないか

1 本の score にすべてを押し込む案は美しい。

しかし現時点では、
少なくとも次が混ざる。

- 実行対象かどうか
- 今やるべきか
- active continuity をどこまで見るか
- future に送るべきか
- 例外的 override が必要か

これをいきなり単一 score に押し込むと、

- meaning が曖昧になる
- score が高いのに future に落とす例外が増える
- 説明可能性が下がる

したがって最小段階では、

- gate = 対象判定
- score = 優先順位比較
- override = 明示例外

を分ける方が強い。

---

## 全体フロー

```text
candidate collection
↓
normalization
↓
gate evaluation
↓
score calculation
↓
score ranking
↓
override check
↓
placement
```

---

## 1. gate

gate は、
その候補を「今の ranking 対象」に入れてよいかを決める。

### gate で見るもの

- current phase に合っているか
- 前提条件が最低限そろっているか
- 実行粒度に落ちているか
- premature すぎないか

### gate の出力

- `eligible`
- `deferred`
- `blocked`

### 意味

- `eligible`
  - score ranking に進む

- `deferred`
  - future 側へ送る

- `blocked`
  - 今は ranking 対象にしない

この段階では、
まだ順位は決めない。

---

## 2. score

gate を通った候補だけに score を付与する。

最小モデルでは、
score は 1 本の合計値として返してよい。

ただし、
内訳は保持する。

### 最小 score 要素

- `plan_alignment_score`
- `blocker_release_score`
- `quick_win_score`
- `urgency_score`
- `importance_score`
- `continuity_score`

### 追加候補

- `dependency_readiness_score`
- `execution_clarity_score`
- `learning_value_score`

---

## 最小 score の考え方

### plan_alignment_score

上位 plan / phase にどれだけ直結するか。

### blocker_release_score

後続 task や主要フローの詰まりを解消するか。

### quick_win_score

短時間で一区切りつき、前進量が出るか。

### urgency_score

時間的・順序的に遅らせにくいか。

### importance_score

全体前進に与える影響が大きいか。

### continuity_score

すでに active / 進行中の流れを保つ価値があるか。

---

## score の原則

### 原則1

score は単なるメモではなく、
**優先順位を決める主材料**
として扱う。

### 原則2

ただし、
内訳を必ず保持する。

理由:
- 後から改善しやすい
- knowledge 蓄積しやすい
- 説明可能性を保てる

### 原則3

score の重みは、
最初から厳密固定しない。

まずは暫定重みとし、
実運用から補正する。

---

## 3. override

override は、
score 順だけでは不自然な場合の明示補正である。

### override を許す例

- 直前の会話文脈で順序補正が必要
- score では拾いにくい運用違和感がある
- stale active 修復を先にやる必要がある
- 明確な依存制約がある

### override の原則

- 常用しない
- 理由を残す
- 何を押し上げ / 押し下げたかを明記する

つまり、
override は hidden judgment ではなく、
**記録される例外**
である。

---

## knowledge 蓄積との関係

このモデルが knowledge 蓄積と親和性が高い理由は、
次の通りである。

### 1. 迷いを score 要素へ還元できる

たとえば、

- なぜ A を B より先にしたか
- なぜ quick_win を負かしたか
- なぜ continuity を軽く見たか

を、
score 内訳や override 理由として残せる。

### 2. 比較理由が蓄積される

単なる順位結果ではなく、

- どの要素が効いたか
- どの要素が効かなかったか

を後から比較できる。

### 3. 将来の自動化に接続しやすい

最終的に

- score 計算の改善
- weight 調整
- comparator の安定化

へ進みやすい。

---

## 最小 schema

ranking 対象 candidate は少なくとも次を持つ。

- `gate_status`
- `score_total`
- `score_breakdown`
- `override_applied`
- `override_reason`

### score_breakdown 例

```json
{
  "plan_alignment_score": 5,
  "blocker_release_score": 3,
  "quick_win_score": 2,
  "urgency_score": 2,
  "importance_score": 4,
  "continuity_score": 1
}
```

---

## ranking の最小ルール

最小では、
次でよい。

1.
`gate_status = eligible` のものだけを並べる

2.
`score_total` 降順で並べる

3.
同点なら
- `plan_alignment_score`
- `importance_score`
- `continuity_score`
- title

の順で tie-break する

4.
override があれば記録つきで補正する

---

## placement との関係

placement は
score 順の結果を受けて行う。

```text
上位から active に入れる
↓
残り上位を next に置く
↓
gate で落ちたものは future / blocked に回す
```

---

## いま固定すること

- gate / score / override の3層
- score は優先順位の主材料に寄せる
- gate は score 前に処理する
- override は例外として記録付きで許す
- score 内訳を保持する

---

## まだ固定しないこと

- 各 score 要素の正式な重み
- 数値レンジの厳密仕様
- score_total の算出式
- override の厳密な許可条件
- code 実装への即反映

まずは概念モデルを固定する。

---

## 現時点の判断

現段階では、

- score を単なる補助メモのままにせず
- かといって 1 本の点数に全責務を押し込まず
- gate / score / override に分けて段階移行する

のが最も自然である。

この形なら、
あなたの言う

`様々な要素から score を算出し、優先順位を score 主導で決める`

方向へ進みながら、
説明可能性と運用安定性を両立できる。

---

## 一文定義

operations ranking は、まず gate で現在の候補集合を決め、その上で score を主材料として並べ、必要最小限の override を記録付きで許す 3層モデルへ移行する。
