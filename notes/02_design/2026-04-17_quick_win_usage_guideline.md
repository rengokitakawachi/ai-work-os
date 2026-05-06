# 2026-04-17 quick_win_usage_guideline

## 目的

`quick_win` を、
active_operations と operations_queue で
どう使うかの運用基準を固定する。

本メモは、
quick_win が便利だからといって濫用され、
plan 主軸や active continuity を壊さないように、
付与条件と禁止条件を先に決めるための design である。

---

## 結論

`quick_win` は、
**「短時間で終わる」だけでは付けない。**

次の 3 条件のうち、
少なくとも 2 つを満たす場合にだけ付与してよい。

- 低時間
- 低摩擦
- 接続価値

つまり、

- すぐ終わる
- いまの文脈のまま進められる
- 次の本筋 task を少し軽くする

のうち 2 つ以上があるときに、
quick_win を使う。

---

## quick_win の意味

quick_win は単なる speed ではない。

意味は次である。

- 小さく終わる
- 今やる摩擦が低い
- 終えることで次の重い task が少し楽になる

したがって、
「短いが文脈が切れるだけの task」は
quick_win としない。

---

## 付けてよい条件

### high

次の 3 つをすべて満たすとき。

- 2〜10分程度で終わる見込み
- いま開いている source / 文脈でそのまま進められる
- 終えると本筋 task の摩擦やノイズが明確に減る

例:

- 直前に開いている file の naming 修正
- いま見ている design に 1 節だけ追記して構造を閉じる
- queue payload に必要最小 metadata を追加して reroll 比較を成立させる

### medium

次の 3 つのうち 2 つを満たすとき。

- 15分前後で終わる見込み
- 文脈切替が小さい
- 次の task の前提整理や接続整理になる

例:

- active task の why_now を少し整えて reroll 比較しやすくする
- analysis 1枚を増やして論点の迷いを減らす
- code の小さな adapter を 1 つ追加する

### low

quick_win として残すほどではないが、
補助的に軽作業性を示したいとき。

ただし low は乱用しやすいので、
原則として多用しない。

迷う場合は未指定の方がよい。

---

## 付けてはいけないケース

次には付けない。

- 単に短いだけで文脈切替が大きい
- plan 主軸と無関係な小仕事
- 本筋を避けるための逃げタスク
- 実際は重いのに、軽く見積もっているもの
- stale task を無理に温存したいだけのもの
- review / routing / design の責務を混ぜるための場当たり作業

つまり、
quick_win は
「気分よく片づく」
ではなく、
**「主軸を壊さずに小さく前進する」**
ためにだけ使う。

---

## active_operations での使い方

active では、
次のときだけ `quick_win` を付けてよい。

- すでに active にある task のサブ性質として、
  今この文脈で軽く終えられる部分が明確なとき
- reroll で同順位帯比較が発生しそうなとき
- 本筋 task の前に片づけると摩擦が減ると説明できるとき

ただし、
active Day0 の本丸 task 自体を
安易に quick_win 化しない。

本丸はあくまで plan_alignment / why_now で評価する。

---

## operations_queue での使い方

queue では、
次のときだけ `quick_win` を付けてよい。

- issue routing 由来だが、すぐ終わる接続修正である
- rolling に載せる価値はあるが、重い task ではない
- active continuity はないが、今ついでに拾う価値がある

queue の quick_win は、
active continuity の代替ではない。

つまり、

- active にいるから有利
- queue だが quick_win で少し浮く

は別物として扱う。

---

## daily review でのルール

daily review では、
quick_win を新規に付ける場合、
理由を 1 行で説明できることを条件にする。

例:

- 直前の review 出力にそのまま追記できるため低摩擦
- いま開いている file 群のまま 10 分で終えられるため
- 本筋 task 前のノイズ除去になるため

説明できない場合は付けない。

---

## issue routing でのルール

issue routing では、
operations candidate に quick_win を付けてよいが、
次を守る。

- reason と両立すること
- impact_now を上書きしないこと
- plan_alignment の代替にしないこと

つまり、
quick_win は
「今ついでに終わる」
を示すだけであり、
「重要だから上げる」
を示すものではない。

---

## 運用上の原則

原則は次とする。

1.
未指定をデフォルトにする

2.
迷ったら付けない

3.
high は少数に限定する

4.
plan_alignment と why_now を先に考える

5.
quick_win は同順位帯の微調整に使う

---

## code 側への含意

現行 code では、
quick_win は明示入力だけを受ける。

したがって運用上重要なのは、
どこで値を書くかよりも、
**どんなときに書いてよいか**
を守ることである。

将来、自動推定を入れるとしても、
この運用基準を先に持っておく必要がある。

---

## 判断

quick_win は有効だが、
乱用すると plan 主軸を壊しやすい。

したがって、
まずは

- 低時間
- 低摩擦
- 接続価値

の 3 条件中 2 条件以上を満たす場合だけ付ける
という運用にするのが自然である。

この形なら、
plan を壊さず、
小さい完了を適切に拾う補助軸として使える。
