# 2026-04-17 quick_win_minimum_input_schema

## 目的

operations reroll の補助軸である `quick_win` を、
どこから入力するかを最小形で固定する。

本メモは、
`ranking.js` に比較軸だけ先に入っている `quick_win` を、
推測ベースで暴れさせず、
明示入力中心で小さく運用開始するための design である。

---

## 結論

`quick_win` は、
**まずは明示入力のみを正として扱う。**

最小入力点は次の 2 つとする。

1.
`active_operations` の task field

2.
`operations_queue` payload

値は次の 3 段階だけを使う。

- `high`
- `medium`
- `low`

未指定は空とし、
加点なしとして扱う。

---

## なぜ明示入力から始めるか

理由は 3 つある。

### 1. 推測判定はぶれやすいから

「すぐ終わる」「軽い回収」は、
本文や why_now から雑に推測すると誤判定しやすい。

### 2. plan を壊さないため

quick win は補助加点であり、
主軸ではない。

入力が曖昧だと、
plan 整合よりも軽作業の偶発加点が勝ちやすくなる。

### 3. 運用しながら学習したいから

まずは明示入力だけで使い始め、
どの場面で `high / medium / low` を付けたくなるかを見た方が、
後から自動推定を入れるより安全である。

---

## 最小 schema

### active_operations

active task では、
オプション項目として次を持てるようにする。

```yaml
quick_win: high
```

例:

```yaml
- task: 小さい naming 修正を反映する
  source_ref:
    - docs/...
  rolling_day: Day2
  why_now:
    - 直前に対象ファイルを開いており低摩擦で終えられる
  quick_win: high
```

### operations_queue payload

queue payload では、
最小で次のどちらかに持てればよい。

```json
{
  "quick_win": "medium"
}
```

または

```json
{
  "candidate_draft": {
    "quick_win": "medium"
  }
}
```

どちらかに入っていればよいが、
読み取り優先は payload root を先にする。

---

## 読み取り優先順位

### active source

active adapter は次の順で読む。

1.
`quick_win` field

2.
未指定なら空

### queue source

queue adapter は次の順で読む。

1.
`payload.quick_win`

2.
`payload.candidate_draft.quick_win`

3.
未指定なら空

---

## 今やらないこと

現段階では次をやらない。

- why_now 文章からの自動推定
- notes 文面からの自動推定
- due_date からの強制 quick_win 推定
- quick_win の数値化
- active / queue 以外の source への拡張

まずは、
**明示入力を受けて ranking に効かせる**
ところまでで十分である。

---

## ranking での位置づけ

quick_win は引き続き、
補助加点として扱う。

主従は次を維持する。

- `plan_alignment` が最重要
- `active_continuity` は軽い補助
- `quick_win` は追加加点

したがって、
quick win だけで plan 直結候補を恒常的に押しのけない。

---

## code 側への含意

最小実装で必要なのは次である。

1.
active adapter が `quick_win` field を読む

2.
queue adapter が payload の `quick_win` を読む

3.
issue routing notes write が queue payload に `quick_win` を渡せるようにする

これで、
ranking.js にすでに入っている `compareQuickWin(...)` が初めて実データで効く。

---

## 判断

`quick_win` は、
まずは明示入力のみを正として扱うのが自然である。

最小入力点は次で十分である。

- active task の `quick_win`
- operations queue payload の `quick_win`

この形なら、
plan を壊さずに quick win を補助加点として使い始められる。
