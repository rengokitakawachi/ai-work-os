# Manual Rolling Round 1 Notes

## 概要

operations rolling の新ルールに基づき、
手動で候補を並べ、7日枠で切る 1周目を実施した記録。

目的は、正しい順位を永久固定することではなく、
現時点の優先順位づけと迷いポイントを観測することにある。

---

## 候補一覧

1. active_operations を新しい rolling ルールで再構築する
2. next_operations を上位候補で再構成する
3. routing / rolling の共通基盤を定義した design と instruction の整合を確認する
4. future_layer_operating_spec に残る旧用語と旧フローを現行モデルへ修正する
5. standard_development_flow_v2 を routing / review 分離前提に更新する
6. operations_generation_rules を Flow Control と ranking model に合わせて更新する
7. classification_and_routing_spec の扱いを決める
8. scoring knowledge の蓄積方針を dev_memo か design に整理する
9. 手動 rolling 1周目で迷った点を抽出し、program に寄せる責務候補を整理する
10. weekly review 前提で、active / next / archive の更新準備をする

---

## 相対順位

### active に入れる順位

1. active_operations を新しい rolling ルールで再構築する
2. next_operations を上位候補で再構成する
3. routing / rolling の共通基盤を定義した design と instruction の整合を確認する
4. future_layer_operating_spec に残る旧用語と旧フローを現行モデルへ修正する
5. standard_development_flow_v2 を routing / review 分離前提に更新する
6. operations_generation_rules を Flow Control と ranking model に合わせて更新する
7. classification_and_routing_spec の扱いを決める

### next に送る順位

8. scoring knowledge の蓄積方針を dev_memo か design に整理する
9. 手動 rolling 1周目で迷った点を抽出し、program に寄せる責務候補を整理する
10. weekly review 前提で、active / next / archive の更新準備をする

---

## 判断理由

### 1〜3 を最上位に置いた理由

- rolling の実体を新ルールに合わせることが最優先
- active / next の現物を揃えないと後続設計が実運用に接続しない
- Flow Control / routing / rolling の整合が取れていないと、design 更新の基準がぶれる

### 4〜6 を続けて置いた理由

- design に残る旧用語 / 旧フローが routing 実用化の障害になっている
- future / standard flow / generation rules は相互依存が強く、同じ塊として進める方がよい
- operations_generation_rules は rolling の中核設計に直結するため高順位

### 7 を active の最後に置いた理由

- classification_and_routing_spec は重要だが、
  先に current model を主要 design に反映してから判断した方が精度が高い
- 今すぐ更新すべきか、future / archive に回すべきかの判定材料が、
  4〜6 を進めた後の方が揃う

### 8〜10 を next に送った理由

- scoring knowledge は重要だが、まず rolling と routing の基本整合を進めた後の方が具体化しやすい
- program 責務抽出は、1周目の手動運用結果を踏まえた方が良い
- weekly review 準備は review 側の責務に近く、今すぐ active に入れる必要は低い

---

## 迷いログ

### 迷い1
operations_generation_rules を 4 や 5 より先に置くか迷った。

理由:
- rolling 中核なので高順位に見える
- ただし future_layer / standard_flow の旧表現が残っていると、
  generation rules の更新基準も揺れやすい

現時点判断:
- 旧表現修正を先に進めてから generation rules に入る方が崩れにくい

### 迷い2
scoring knowledge を active に入れるか迷った。

理由:
- 将来価値は高い
- しかし、今は routing / rolling 実用化の障害除去が先

現時点判断:
- next で保持し、主要整合が進んだ後に取り組む

### 迷い3
classification_and_routing_spec をすぐ future / archive に回すか迷った。

理由:
- 旧構造が残っている可能性が高い
- ただし current model へ更新できるなら価値がある

現時点判断:
- まず「扱い判断」を active に置く
- 更新か退避かは後で確定する

---

## 今回の学び

- 「重要かどうか」より「今の並びでどちらが先か」を問うと決めやすい
- scoring は決定ルールではなく、迷いを言語化する補助として有効
- active / next の境界は固定条件ではなく、現時点の相対順位で決める方が自然
- program 化すべき責務は、手動で迷った箇所から抽出するのがよい

---

## 次に見るべき点

- future_layer / standard_flow / operations_generation_rules の更新順は妥当か
- classification_and_routing_spec を更新すべきか退避すべきか
- scoring knowledge をいつ active に繰り上げるか
- program に寄せる責務候補をどの粒度で切るか
