# 2026-04-17 design_review_vs_design_routing_boundary

## 目的

現行 docs で混線している
`design review`
と
`design routing`
の責務境界を整理する。

本メモは、
あなたが指摘した
「design の中身を精査して Docs に送るか、design に残すかを判定するなら、
それは review ではなく routing ではないか」
という論点を、
docs 基準で整合的に説明できる形へ落とすための design である。

---

## docs 現状

現行 docs では、
design review は review 側に置かれている。

### docs/15_notes_system.md

review の一部として、

- daily review
- weekly review
- monthly review
- design review

が置かれている。

design review の内容は、

- design の継続 / 昇格 / future / archive 判断

となっている。

### docs/05_roadmap.md

review 設計の中で、

- docs に昇格すべき design があるか確認する
- stale / 重複 / 未整理 design を整理する
- future / archive への移動候補を判断する

が design review として定義され、
monthly review の一部として実施すると書かれている。

### docs/13_dev_workflow.md

明示的な design review 記述は薄いが、
基本原則として

- routing と review を混同しない

が置かれている。

---

## 問題

現行の design review 記述には、
次の 2 種類の責務が混ざっている。

### review 的責務

- stale を確認する
- 重複を確認する
- 未整理状態を確認する
- design layer 全体の状態を見る

### routing 的責務

- docs に送る
- design に残す
- future に送る
- archive に送る
- 必要なら operations candidate 化する

このうち後者は、
保存先 / 行き先 / 次レイヤー判定であり、
review より routing に近い。

したがって、
現行 docs のままだと
design だけが
review と routing を混在させている。

---

## 結論

design については、
次の 2 つを分けるのが自然である。

### 1. design review

役割:
- design layer の棚卸し
- stale / 重複 / 未整理の確認
- 継続検討価値の確認
- routing 対象の抽出

### 2. design routing

役割:
- docs に昇格するか
- design に残すか
- future に送るか
- archive に送るか
- operations candidate 化するか

つまり、

```text
review = 状態を見る
routing = 行き先を決める
```

の原則を design にも適用する。

---

## design review の責務

design review は、
次を行う。

- stale な design がないか確認する
- 重複 design がないか確認する
- 未整理の draft が残っていないか確認する
- docs に昇格候補になりうる design を抽出する
- future / archive 候補を抽出する

ここで重要なのは、
**抽出まではするが、最終送付先の確定は design routing に委ねる**
ことである。

---

## design routing の責務

design routing は、
design review や日常運用で抽出された design を評価し、
次のどこへ送るかを決める。

- docs
- design
- future/design
- archive
- operations candidate

このときの判断軸は、
少なくとも次である。

- 仕様として責務・命名が固まっているか
- docs 昇格条件を満たすか
- まだ設計草案段階か
- 将来向けに deferred すべきか
- 役目を終えたか
- 実行候補として operations に落とす価値があるか

---

## なぜ分けるべきか

### 1. routing と review を混同しないため

docs/13_dev_workflow.md の原則に合わせるなら、
design だけ review と routing が混ざっているのは不自然である。

### 2. design から docs への昇格を明確化するため

docs 昇格は
「状態確認」ではなく
「昇格先の判定」
である。

したがって、
review の中に埋めるより routing として切り出した方が構造が明確になる。

### 3. future / archive 送付とも対称にできるため

design を docs に送るか、
future に送るか、
archive に送るかは、
すべてレイヤー移送の判断である。

これは routing と呼ぶ方が一貫する。

---

## monthly review との関係

design review を完全に独立イベントにする必要はない。

自然な運用は次である。

- monthly review の一部として design layer を棚卸しする
- その結果、routing 対象を抽出する
- design routing で docs / design / future / archive / operations candidate を決める

つまり、

```text
monthly review
→ design review
→ design routing
```

の順で扱うのが自然である。

---

## docs 修正方針

### docs/15_notes_system.md

現行:
- review の一部に design review を置く
- 継続 / 昇格 / future / archive 判断まで含める

修正方針:
- review には design review（棚卸し・抽出）のみを書く
- design routing を routing 側へ追加する
- docs / design / future / archive / operations candidate 送付を design routing に寄せる

### docs/13_dev_workflow.md

現行:
- intake routing / issue routing だけが明示
- routing と review を混同しない原則がある

修正方針:
- routing に design routing を追加する
- design review は review フェーズではなく、review 内棚卸しとして位置づける
- review の後、必要に応じて design routing を通す構造を明記する

### docs/05_roadmap.md

現行:
- design review を monthly review の一部として置く
- docs 昇格 / future / archive 判断まで design review に含める

修正方針:
- monthly review の一部として design review を残す
- ただし design review は棚卸しと候補抽出に限定する
- 送付先判定は design routing として分離する

---

## design routing の位置づけ案

routing 群は次になる。

- intake routing
- issue routing
- design routing

review 群は次になる。

- daily review
- weekly review
- monthly review

必要なら、
design review は monthly review の内部サブプロセスとして扱う。

この形なら、
review と routing の責務分離を保ったまま、
現行運用も自然に説明できる。

---

## 判断

あなたの指摘どおり、
design の「Docs に送るか / design に残すか / future / archive に送るか」
の判定は、
review ではなく routing として扱う方が自然である。

したがって最も整合的な整理は次である。

- design review = 棚卸し・整合確認・候補抽出
- design routing = docs / design / future / archive / operations candidate の行き先判定

この分解により、
docs/13 の
「routing と review を混同しない」
原則とも一致する。
