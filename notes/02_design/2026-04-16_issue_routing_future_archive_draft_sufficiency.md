# 2026-04-16 issue_routing_future_archive_draft_sufficiency

## 目的

issue routing から生成される
future / archive draft について、
現行の section builder で十分かどうかを先に定義する。

本メモは、
code を先に広げる前に、
future / archive が design draft と同じ前段 5 セクションで成立するか、
追加で必要な後段節が何かを最小化して固定するための design である。

---

## 結論

**前段 5 セクションは future / archive でもそのまま共通で使える。**

共通前段は次とする。

1.
`source issue`

2.
`source_ref`

3.
`routing decision`

4.
`raw summary`

5.
`related context`

その上で、
future と archive は後段を 1〜2 節だけ追加すれば十分である。

- future:
  `why deferred`
  `recheck point`

- archive:
  `archive reason`

つまり、
code 側は当面、
前段 5 セクションの共通 builder だけで十分であり、
future / archive の追加節は後段 enrich として扱ってよい。

---

## なぜ共通でよいか

理由は 3 つある。

### 1. future / archive でも追跡したい情報は同じだから

future / archive でも最低限必要なのは、

- 何の issue か
- どの source から来たか
- なぜこの routing になったか
- issue の核は何か
- 関連 context は何か

である。

これは design draft と同じである。

### 2. future / archive は議論文書ではなく状態記録に近いから

design は後続議論の起点なので、
background / problem / direction などの厚い後段が要る。

しかし future / archive は、
まずは「なぜ今は active でないか」
または
「なぜ退避対象なのか」
が分かれば足りる。

### 3. code の責務を増やしすぎないため

現段階で future / archive 用に
別 builder を厚く作ると、
まだ apply していない層のために責務が先行拡大する。

いま必要なのは、
十分条件の固定であって、
実装の肥大化ではない。

---

## future の十分条件

future draft は、
次が読めれば十分である。

### 必須

- source issue
- source_ref
- routing decision
- raw summary
- related context

### 最小追加

- why deferred
- recheck point

### why deferred に書くもの

最小では次のどちらかで足りる。

- reason の再表現
- 今は active / operations に入れない理由

例:

- 現時点では優先度が不足している
- phase が合っていない
- 前提条件待ちである

### recheck point に書くもの

最小では次のいずれかでよい。

- `daily_review`
- `weekly_review`
- `monthly_review`
- reroll

これは既存 routing / review の vocabulary に合わせる。

---

## archive の十分条件

archive draft は、
次が読めれば十分である。

### 必須

- source issue
- source_ref
- routing decision
- raw summary
- related context

### 最小追加

- archive reason

### archive reason に書くもの

最小では次のいずれかでよい。

- closed で役目を終えた
- 別論点へ置き換えられた
- 保持価値はあるが active/future ではない

archive は議論再開の起点ではなく、
追跡可能な退避記録であるため、
これ以上の厚さは不要である。

---

## future layer spec との整合

`2026-04-03_future_layer_operating_spec.md` では、
future は

- 今は active にしない
- operations に入らない
- しかし将来扱う可能性がある

要素を置く時間軸レイヤーとされている。

この定義に照らすと、
future draft に必要なのは
「何を deferred したか」と
「いつ再評価するか」である。

したがって、
future の後段は
`why deferred` と `recheck point` で足りる。

---

## archive の位置づけ

archive は
完了・置換・役目終了後の退避先である。

そのため archive draft は、
将来の設計議論よりも

- 何を退避したか
- なぜ退避したか

が分かれば十分である。

よって、
archive の後段は `archive reason` のみで成立する。

---

## code 側への含意

現時点で code 側は、
前段 5 セクションの builder を持っている。

これは future / archive に対しても十分である。

したがって、
次の方針が自然である。

1.
共通前段 5 セクションはそのまま維持する

2.
future / archive の追加節は、
apply 導入時に最小 enrich として足す

3.
今の段階では future / archive の専用厚手 builder は作らない

---

## 今やらないこと

現段階では次をやらない。

- future / archive の実 write 導入
- future / archive の merge ルール設計
- future/issue と future/design の自動分岐精緻化
- archive と delete の接続

まずは、
**現行 section builder で十分である**
という設計判断を固定することが先である。

---

## 判断

future / archive draft は、
前段 5 セクションを design draft と共通化してよい。

不足するのは layer 固有の最小 1〜2 節だけである。

- future:
  `why deferred`
  `recheck point`

- archive:
  `archive reason`

したがって、
今の code 構造は過不足なく、
次は future / archive を実装するより先に、
必要最小限の enrich 項目だけを後段追加できる形で保つのが自然である。
