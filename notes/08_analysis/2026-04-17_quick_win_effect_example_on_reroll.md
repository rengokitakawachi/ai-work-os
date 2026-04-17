# 2026-04-17 quick_win_effect_example_on_reroll

## 目的

`quick_win` を 1 件だけ明示入力した場合に、
現行 reroll でどう効くかを具体例で固定する。

本メモは、
4/17 時点で code に入れた

- `metadata.quick_win`
- `compareQuickWin(...)`

が、
plan_alignment と active_continuity の後段で
どの程度だけ順位へ影響するかを
過大評価せずに整理するための analysis である。

---

## 前提

現行 `ranking.js` の順序は次である。

1.
`plan_alignment`

2.
`importance`

3.
`active_continuity`

4.
`quick_win`

5.
`source_type`

6.
`review_at`

7.
`title`

したがって、
`quick_win` は

- plan_alignment を越えない
- importance を越えない
- active_continuity も越えない

位置にある。

これは設計意図どおりである。

---

## 仮置きケース

例として、
active の Day1 候補に次を仮置きする。

```yaml
- task: daily review の出力から content 抽出と operations rolling の接続ルールを design 観点で整理する
  quick_win: high
```

ここで期待する意味は、

- すぐ終わる
- 低摩擦で片づく
- 本筋 task の次の接続を軽く整えられる

である。

---

## 何が起きるか

### 1. plan 直結の direct 候補は逆転しない

もし比較相手が

- `plan_alignment: direct`
- `importance: high`

を持つ plan 由来候補なら、
`quick_win: high` があっても逆転しない。

理由:
- quick_win の比較順は 4 番目
- plan_alignment は 1 番目

したがって、
quick win は plan 主軸を壊さない。

### 2. 同じ linked 帯の active 候補どうしでは押し上がる

比較相手が

- どちらも `plan_alignment: linked`
- どちらも `importance: high`
- どちらも `active_continuity: light`

である場合、
`quick_win: high` を持つ側が一段上に来やすい。

つまり、
quick_win は
**同順位帯の active 候補の中で効く**
と考えるのが自然である。

### 3. queue 候補に対しても同順位帯で効く

比較相手が queue 由来で

- `plan_alignment: linked`
- `importance: high`
- active_continuity なし
- `quick_win` なし

なら、
active 側はすでに continuity で少し有利である。

さらに `quick_win: high` があれば、
同順位帯の中で押し上がりやすい。

ただしこれは
active 固定特権ではなく、
linked 帯の中での微調整である。

---

## queue payload に quick_win を付けた場合

operations queue payload に

```json
{
  "quick_win": "medium"
}
```

を付けた場合も、
同じ比較順で効く。

ただし queue は

- `active_continuity` を持たない
- plan_alignment は source_ref 次第で `linked`
- source_type は `operations_queue`

であるため、
active 側と完全同等ではない。

したがって、
queue の quick win は

- active 継続バイアスを超える決定打ではなく
- 同じ queue 帯や linked 帯での補助押し上げ

として理解するのが自然である。

---

## 何を期待しすぎてはいけないか

現段階では次を期待しすぎてはいけない。

- quick_win が plan 直結候補を押しのける
- quick_win だけで Day0 を入れ替える
- quick_win だけで stale 判定の代わりになる
- quick_win が future 判定まで担う

そこまではまだやっていない。

---

## 現段階で期待してよいこと

現段階では次を期待してよい。

- 同順位帯の candidate 比較で少し押し上げる
- active 内の軽作業を適切に浮かせる
- queue 候補の中で「今ついでに終わるもの」を少し上げる
- plan 主軸を壊さずに低摩擦 task を拾う

---

## 判断

`quick_win` は、
現行 code では
**主順位を作る軸ではなく、同順位帯を微調整する軸**
として効く。

これは設計意図と一致する。

したがって、
今の段階では
1 件だけ明示入力しても十分価値があるが、
それは reroll 全体をひっくり返すためではなく、
**plan を壊さない範囲で小さい完了を適切に拾うため**
と理解するのが正しい。
