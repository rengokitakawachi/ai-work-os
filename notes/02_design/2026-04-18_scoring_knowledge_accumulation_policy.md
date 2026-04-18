# 2026-04-18 scoring_knowledge_accumulation_policy

## 目的

operations rolling における scoring knowledge を、

- どの段階では dev_memo に残すか
- どの条件で design に昇格するか

の観点から整理する。

本メモは、
score を決定ルールとして固定しすぎず、
一方で毎回の迷いを散逸させないための
最小運用方針を定義することを目的とする。

---

## 結論

scoring knowledge は、
最初から design の固定ルールにしない。

まずは
**手動 rolling や実運用で生じた迷い・観察・比較理由を dev_memo に残し、
反復して再利用されるものだけを design に昇格する**
方針を採る。

つまり、

- dev_memo = 生の観察と迷い
- design = 再利用価値が確認できた scoring rule

と分ける。

---

## 前提

`2026-04-06_operations_rolling_generation_and_prioritization_spec.md`
では、

- `plan_link`
- `blocker`
- `quick_win`
- `dependency`
- `urgency`
- `importance`
- `why_now`

を helper scoring として持つ。

ただし同 spec は、
**スコアは補助であり決定ではない**
ことを明示している。

この原則は維持する。

---

## なぜ固定しすぎないか

理由は 3 つある。

### 1. 文脈依存が強い

同じ `quick_win` でも、

- plan 直結 task が詰まっている時
- 依存解消が先の時
- active continuity を重く見る時

では意味が変わる。

### 2. まだ観測が少ない

現段階では、
手動 rolling と最小 dry_run 確認は進んだが、
長期反復で「この観点は常に効く」と言えるほどの観測は蓄積していない。

### 3. score を決定化すると責務を誤る

score は優先順位の説明補助であり、
最終決定者ではない。

score を固定ルール化しすぎると、
relative ranking や ADAM 判断の余地を潰しやすい。

---

## dev_memo に残すもの

以下は dev_memo に残す。

### 1. その回の迷い

例:

- `operations_generation_rules を 4 や 5 より先に置くか迷った`
- `scoring knowledge を active に入れるか迷った`

### 2. 比較理由

例:

- `重要かどうか` より `今の並びでどちらが先か` で決めやすかった
- `quick_win` より `plan_link` を優先した

### 3. まだ一般化できない観察

例:

- 今回は C案件でも active に入りうる感触があった
- active continuity が効いたが、常にそうとは言えない

### 4. 例外的な事情

例:

- 会話コンテキスト上、着手障壁の低さを強く見た
- stale active 回復を先に見る必要があった

---

## design に昇格するもの

以下を満たすものは design に昇格してよい。

### 条件1

複数回の rolling / reroll で再利用された

### 条件2

個別事例ではなく、
比較的一般化して説明できる

### 条件3

他の判断者が見ても再利用価値がある

### 条件4

operations ranking / placement の理解を安定させる

---

## design に昇格しやすい類型

### 1. 優先順位軸そのもの

例:

- `plan_alignment を最優先に置く`
- `active continuity は補助であり特権ではない`

### 2. tie-break の考え方

例:

- 同等帯なら active continuity を軽く見る
- 同率帯では source_type 順を補助に使う

### 3. future 判定と scoring の境界

例:

- phase mismatch は ranking 前に deferred へ落とす

### 4. task 粒度との関係

例:

- quick_win は task 粒度が適切であることを前提に見る

---

## design に上げない方がよいもの

以下は design に上げない。

- 1回しか起きていない迷い
- 当日の会話事情に強く依存する判断
- 説明可能だが再利用価値が低い比較
- 相対順位そのもの

たとえば、

- 今回 A を B より先にした

だけでは knowledge にならない。

必要なのは、

- なぜその比較軸が有効だったか
- 別回でも使えそうか

である。

---

## 保存フロー

最小では次の順で扱う。

```text
manual rolling / reroll 実施
↓
迷い・比較理由を dev_memo に残す
↓
複数回再利用されたものを抽出
↓
design へ昇格
↓
必要なら code / docs に反映
```

この順なら、
観測不足の段階で premature に固定しにくい。

---

## 具体的な運用ルール

### ルール1

rolling 実施時に迷いが出たら、
順位結果そのものより
**比較理由** を残す。

### ルール2

`score が高いから採用した`
で終わらせず、

- 何と比較して
- どの観点が効いて
- 何を押し下げたか

を言語化する。

### ルール3

2回以上再利用された比較軸は、
design 昇格候補として扱う。

### ルール4

score の数値化や重み固定は後段でよい。

現段階では、
意味づけと使い方の安定化を優先する。

---

## code との関係

code 側では helper scoring や ranking comparator を持てるが、
その値や順序を
すぐ knowledge の正本にしない。

正しくは、

- code = 現時点の実装形
- design = 再利用可能な運用原則
- dev_memo = 生観測

である。

したがって、
実装に comparator が入っていても、
その妥当性観測は引き続き必要である。

---

## docs との関係

docs に上げるのは、
以下が確認できた後でよい。

- 再利用回数が十分ある
- 例外条件が見えている
- docs に固定しても運用を硬直させない

現段階では、
scoring knowledge は docs より前に
`dev_memo → design`
で育てるのが自然である。

---

## 今回の判断

現時点では、
scoring knowledge について固定すべきなのは

- score は補助であり決定ではない
- 迷いと比較理由は dev_memo に残す
- 再利用された比較軸だけを design に昇格する

までで十分である。

数値化や重み固定、
docs 反映はまだ早い。

---

## 一文定義

scoring knowledge は、まず手動 rolling の迷いと比較理由を dev_memo に蓄積し、複数回再利用された比較軸だけを design に昇格することで育てる。
