# 2026-04-21 issue_routing_medium_impact_keep_bias_adjustment

## 目的

issue routing 第一バッチ観測で見えた
`medium impact issue が keep に寄りすぎる`
問題を、
次の code 補正前に design として固定する。

本メモは、
現行 `rules.js` の判定順が
architecture / operations issue の route 多様性を潰している点を整理し、
最小差分でどこを直すかを明確にすることを目的とする。

---

## 参照

- `notes/08_analysis/2026-04-21_issue_routing_first_batch_observation.md`
- `notes/02_design/2026-04-20_issue_routing_minimum_operation_experiment.md`
- `notes/02_design/2026-04-20_issue_routing_action_plan_handoff_schema.md`
- `src/services/flow-control/rules.js`
- `src/services/flow-control/issue-routing.js`

---

## 結論

現行の主問題は、
`impact != high`
を category 判定より先に評価していることである。

その結果、
次のような issue でも

- category: `architecture`
- category: `operations`

impact が `medium`
であるだけで
先に `route_to: issue`
へ吸われる。

したがって、
最小差分の補正方針は次にするのが自然である。

1.  
`status` 系の gate はそのまま先に残す

2.  
`category === architecture`
と
`category === operations`
の判定を、
`impact != high` gate より前へ出す

3.  
それ以外の issue に対してのみ、
`impact != high` の keep gate を適用する

つまり、
**medium impact でも category が明確な issue は、
design / operations 候補として先に評価する**
方針を採る。

---

## 現行挙動

現行 `rules.js` の issue 判定は概ね次順で動く。

1.  
`status === closed`
→ `archive`

2.  
`status !== open`
→ `future`

3.  
`impactNow && impactNow !== 'high'`
→ `issue`

4.  
`category === 'architecture'`
→ `design`

5.  
`category === 'operations'`
→ `operations`

6.  
その他
→ `issue`

この順のため、
`architecture` と `operations`
の category 判定は、
medium impact issue ではほぼ到達しない。

---

## 第一バッチで起きたこと

対象 issue:

- `20260418-022`
  - category: `architecture`
  - impact: `medium`

- `20260419-023`
  - category: `operations`
  - impact: `medium`

結果:

- 両方とも `route_to: issue`
- 理由は
  `high impact ではないため、issue に残して再評価する`

つまり、
今回の route 多様性不足は
母集団不足だけでなく、
**impact gate の位置が強すぎる**
ことでも説明できる。

---

## 何が問題か

### 1. category の意味が route に反映されない

issue log 上で
`architecture`
または
`operations`
と分類していても、
medium impact というだけで keep になる。

これでは、
issue routing が
category を route 判断軸として十分使えていない。

### 2. 第一バッチ観測の完成条件に届きにくい

本来観測したかったのは次である。

- design 送付
- operations 候補化
- keep との差
- action_plan の route 多様性

しかし現行 gate のままだと、
medium impact issue は keep に偏るため、
送付先遷移そのものが観測しにくい。

### 3. keep が強すぎて「保留」しか返らない

`route_to: issue`
を正規結果として持つこと自体は正しい。

ただし、
architecture / operations のように
ある程度 route 意図が明確な issue まで
一律 keep に落とすのは強すぎる。

---

## 補正候補

### 案A
`impact != high` gate を完全に削除する

利点:
- route 多様性は増えやすい

欠点:
- keep の役割が薄くなりすぎる
- 現行の保留レイヤーが弱くなる

判断:
- 今回の最小差分としてはやりすぎ

---

### 案B
`architecture / operations` だけを
impact gate より前に判定する

利点:
- 最小差分
- 既存 category の意味を活かせる
- keep gate 自体は残せる
- 第一バッチ対象の改善に直接効く

欠点:
- category 未設定 issue の扱いは変わらない
- category の質に依存する

判断:
- 今回の第一候補

---

### 案C
impact と category の組み合わせで
score 的に判定する

利点:
- 柔軟
- 将来的には自然

欠点:
- 今回は設計過多
- 最小差分ではない
- rules.js の現行構造より重い

判断:
- 今回は採らない

---

## 採用する補正方針

今回は
**案B**
を採る。

具体的には、
issue 判定順を次へ変える。

1.  
`status === closed`
→ `archive`

2.  
`status !== open`
→ `future`

3.  
`category === 'architecture'`
→ `design`

4.  
`category === 'operations'`
→ `operations`

5.  
`impactNow && impactNow !== 'high'`
→ `issue`

6.  
その他
→ `issue`

この順なら、

- architecture / operations は
  medium impact でも route 候補化される
- keep gate は
  category が弱い issue に残せる
- 変更範囲は rules.js の issue 判定順だけに近い

---

## この補正で期待する変化

### 20260418-022

現状:
- `issue`

期待:
- `design`

### 20260419-023

現状:
- `issue`

期待:
- `operations`

### その他 medium impact issue

期待:
- category が弱ければ引き続き `issue`
- つまり keep 自体は残る

---

## やらないこと

今回の補正では次をやらない。

- scoring 化
- impact / urgency の全面見直し
- `plan` route の追加評価
- `future / archive` 条件の再定義
- action_plan schema の変更
- writer 側の変更

今回は
**issue 判定順の最小差分補正**
に限定する。

---

## code 変更対象

主対象は次である。

- `src/services/flow-control/rules.js`

確認対象は次である。

- `src/services/flow-control/issue-routing.test.js`
- 必要なら第一バッチ観測用の dry_run 結果

---

## 再観測ポイント

補正後は次を再確認する。

1.  
`20260418-022`
が `design` へ行くか

2.  
`20260419-023`
が `operations` へ行くか

3.  
理由文が自然か

4.  
`action_plan`
に design_updates / operations_candidates が現れるか

5.  
keep が完全に消えず、
category 不明 issue の保留レイヤーが残っているか

---

## 判断

今回の問題は、
medium impact issue の存在そのものではない。

主問題は、
`impact != high`
gate が category 判定より先に走ることで、
architecture / operations issue の route 意図を潰している点にある。

したがって、
次の最小補正が自然である。

- status gate は維持
- architecture / operations 判定を先に出す
- impact keep gate はその後ろへ下げる

この形なら、
keep を残しつつ
第一バッチ観測で必要な route 多様性を回復しやすい。
