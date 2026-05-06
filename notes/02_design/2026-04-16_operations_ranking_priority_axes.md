# 2026-04-16 operations_ranking_priority_axes

## 目的

operations reroll において、
何を優先順位評価の主軸にするかを固定する。

本メモは、
current active / next / plan / issue / queue 由来候補を
同じ比較土俵に乗せる際に、

- plan整合
- active維持
- quick win

をどう主従づけるかを明文化するための design である。

---

## 結論

優先順位評価の基本は次とする。

### 最重要

- `plan_alignment`

### 補助だが重要

- `active_continuity`
- `phase_fit`
- `why_now_strength`

### 補助加点

- `quick_win`
- `context_match`
- `low_switch_cost`

つまり、

**plan に沿っているか**
を最上位に置いたうえで、

- 既存 active であること
- 今すぐ終わること
- 今の文脈で低摩擦に進められること

を補助評価として使う。

---

## 何を防ぎたいか

この設計で防ぎたい失敗は 2 つある。

### 1. plan を無視した場当たり運用

quick win や思いつきタスクが
常に plan 直結 task を押しのける状態は避ける。

### 2. active の固定化

すでに active にいるというだけで
stale な task が居座り続ける状態も避ける。

したがって、
必要なのは

- plan優先
- ただし active も少し守る
- quick win も適切に拾う

というバランスである。

---

## 評価軸の主従

### 1. plan_alignment

最重要軸とする。

見るもの

- 上位 plan に直結しているか
- 現 phase の重点に沿っているか
- いま進めると上位構造が前進するか

これは reroll の基準線であり、
他の加点より強く扱う。

### 2. active_continuity

補助だが重要な軸とする。

意味

- 既存 active に入っている task を
  無意味に頻繁入れ替えしないための補正

ただし、
固定特権ではない。

plan 不整合や stale 化が強ければ落ちうる。

### 3. phase_fit

補助だが重要な軸とする。

意味

- 今の phase に合っているか
- premature ではないか
- future に送るべきではないか

これは plan_alignment と近いが、
phase の整合に焦点を当てた補助軸である。

### 4. why_now_strength

補助だが重要な軸とする。

意味

- 今やる理由が説明できるか
- blocker 除去や接続価値があるか
- review / routing の文脈で「今」が成立しているか

### 5. quick_win

補助加点とする。

意味

- すぐ終わる
- すぐ片づく
- 小さな完了が次の重い task の摩擦を下げる

重要なのは、
quick win は plan を逆転する主軸ではなく、
同等帯の候補を押し上げる加点であること。

### 6. context_match

補助加点とする。

意味

- いま開いている文脈でそのまま進められる
- 参照 source がすでに揃っている
- 認知切替コストが低い

### 7. low_switch_cost

補助加点とする。

意味

- 文脈切替が少ない
- 今のセッションで処理しやすい
- 小さい摩擦で前進できる

これは context_match に近いが、
認知負荷や切替コストをより直接扱う。

---

## active をどう扱うか

active は、
無条件維持ではない。

扱いは次とする。

- 同じ比較土俵に乗せる
- 既存 active であることは metadata として保持する
- ranking では軽い維持補正を与える
- ただし plan直結の強い新規候補が来れば押し出されうる

つまり、

```text
same table
+ light continuity bias
```

である。

これにより、

- 毎回の総入れ替えを避ける
- stale active を落とせる
- 新規の強い候補が食い込める

の3つを両立する。

---

## quick win をどう扱うか

quick win は、
評価してよい。

理由

- 2〜10分で終わる回収は実務上価値がある
- 文脈負債やノイズを減らせる
- 重い本筋 task の摩擦を下げる

ただし、位置づけは次である。

- 主軸ではない
- plan_alignment を恒常的に逆転しない
- 同順位帯の候補比較で効きやすい

つまり、

**「早く終わるから最優先」ではなく、
「plan を壊さない範囲で少し押し上げる」**
である。

---

## 最小 helper scoring 項目

ranking 補助として少なくとも次を持てるようにする。

- `plan_alignment`
- `active_continuity`
- `phase_fit`
- `why_now_strength`
- `quick_win`
- `context_match`
- `low_switch_cost`

ただし、
これらは数値スコアで固定決定しない。

あくまで相対順位の判断材料である。

---

## candidate source 別の含意

### active_operations

- `active_continuity` を持つ
- 既存配置の継続価値を少し持つ
- ただし stale なら落ちうる

### next_operations

- すでに上位候補である
- ただし active_continuity は持たない
- plan_alignment と why_now の再比較対象

### plan / issue / design

- plan_alignment の強さを持ちやすい
- 新規でも強い根拠があれば active に食い込める

### operations_queue

- issue routing 由来の operations 候補
- まずは why_now / importance / urgency を持つ
- active 既存ではないので continuity 補正はない

---

## ranking の原則

原則は次とする。

1.
plan_alignment を最重要とする

2.
active_continuity は軽い補助に留める

3.
quick_win は補助加点として使う

4.
phase_fit と why_now_strength を見て
future 送りや順位調整を行う

5.
最終順位は ADAM が相対順位で決める

---

## 禁止事項

次は避ける。

- quick_win だけで上位 plan task を恒常的に押しのける
- active だからという理由だけで居座らせる
- score の合計だけで機械的に決める
- phase 不一致候補を無理に active に残す
- 同じ候補を reroll ごとに不安定に上下させる

---

## code 側への含意

将来的に ranking 補助を厚くする場合、
最低限必要なのは次である。

- active source adapter で `already_active` を持つ
- queue / plan / next / issue で source ごとの差を保持する
- quick_win / context_match / low_switch_cost の入力元を決める

ただし現段階では、
まず設計上の主従を固定することが先である。

---

## 判断

operations reroll の優先順位は、

- plan整合を最重要
- active維持は軽い補助
- quick win は追加の補助加点

とするのが自然である。

この形なら、

- plan を主軸に維持できる
- active の安定性を保てる
- すぐ終わる小タスクも適切に拾える

ため、
実運用に耐える ranking 方針として妥当である。
