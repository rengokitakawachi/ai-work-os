# 2026-04-16 issue_routing_generated_draft_template

## 目的

issue routing から自動生成される notes draft の
標準形を固定する。

本メモは、
`applyIssueRoutingActionPlan` が生成する
`design / future / archive` 向け draft を、
偶発的な文面ではなく再利用可能なテンプレートとして定義するための design である。

---

## 結論

routing-generated draft の最小標準形は次とする。

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

6.
`background`

7.
`problem`

8.
`direction`

9.
`minimum questions`

10.
`relation to existing design`

11.
`current status`

12.
`decision`

これは design draft に限らず、
future / archive の draft にも流用できる。

ただし、
future / archive では後段セクションを簡略化してよい。

---

## なぜテンプレート化するか

理由は 3 つある。

### 1. 生成品質を安定させるため

1件目の draft がたまたま読めても、
2件目以降で形式が揺れると再利用できない。

そのため、
最低限の見出し構造を固定する必要がある。

### 2. issue 転記で終わらせないため

draft の価値は、
issue の description を貼り付けることではなく、
既存 design や関連 source へ接続された
初期草案を作ることにある。

したがって、
`related context` を標準節として持つ必要がある。

### 3. apply 対象を増やしやすくするため

今は design_updates のみ apply しているが、
将来 future / archive に広げるときも、
同じ骨格を使えた方が安全である。

---

## 各セクションの役割

### 1. source issue

目的

- 元 issue を特定する

最小項目

- issue_id

### 2. source_ref

目的

- 元入力ファイルを示す

最小項目

- idea_log などの入力 source

### 3. routing decision

目的

- なぜこの draft が生成されたかを示す

最小項目

- route_to
- reason
- evaluated_at
- impact_now
- urgency_now
- next_action

### 4. raw summary

目的

- issue description の核を保持する

最小項目

- issue description または summary

### 5. related context

目的

- issue の context に書かれた関連設計や参照先を前段で見せる

最小項目

- context_refs の一覧
- context 本文

### 6. background

目的

- 既存設計や現状との接続を書く

### 7. problem

目的

- 今どこが未整理かを分けて書く

### 8. direction

目的

- 進める方向を構造的に置く

### 9. minimum questions

目的

- 次に詰めるべき論点を列挙する

### 10. relation to existing design

目的

- 既存 design を置き換えるのか、接続するのかを明示する

### 11. current status

目的

- これは初期 draft なのか、統合済み草案なのかを示す

### 12. decision

目的

- 現時点の結論を短く固定する

---

## layer 別の扱い

### design

最も完全な形を使う。

推奨セクション

- source issue
- source_ref
- routing decision
- raw summary
- related context
- background
- problem
- direction
- minimum questions
- relation to existing design
- current status
- decision

### future
n
future は保留レイヤーなので簡略化してよい。

最小で十分なもの

- source issue
- source_ref
- routing decision
- raw summary
- related context
- why deferred
- recheck point
- decision

### archive

archive は退避用なのでさらに簡略化してよい。

最小で十分なもの

- source issue
- source_ref
- routing decision
- raw summary
- related context
- archive reason
- decision

---

## code 側テンプレートとの関係

code 側では、
この design の全セクションを厳密生成する必要はない。

ただし少なくとも、
以下は body builder で安定生成できるべきである。

- source issue
- source_ref
- routing decision
- raw summary
- related context

それ以降の

- background
- problem
- direction
- minimum questions
- relation to existing design
- current status
- decision

は、段階的に enrich してよい。

つまり、
code の最小責務は
「前段 5 セクションを壊さず出すこと」
とするのが自然である。

---

## 現在の位置づけ

現在の routing-generated draft は、
`20260409-015` の design draft 1 件で実例確認済みである。

この 1 件から分かったのは次である。

- related context があると既存 design 接続が見えやすい
- issue description だけでは初期草案として弱い
- 前段 5 セクションは自動生成に向いている
- 後段は issue ごとに多少の差が出てもよい

したがって、
今は「完全自動の完成文書」を目指すより、
「初期草案として十分な標準形」を固定する方がよい。

---

## テンプレート例

### design draft 例

```md
## source issue
- issue_id: ...

## source_ref
- notes/01_issues/idea_log.md

## routing decision
- route_to: design
- reason: ...
- evaluated_at: ...
- impact_now: high
- urgency_now:
- next_action: create_or_update_design

## raw summary
...

## related context
- related_design_a.md
- related_design_b.md

...

## background
...

## problem
...

## direction
...

## minimum questions
...

## relation to existing design
...

## current status
...

## decision
...
```

---

## 判断

routing-generated draft は、
単なる write payload ではなく、
次の議論や統合の起点になる標準草案として扱うのが自然である。

そのため、
テンプレートは次の原則で固定する。

- 前段 5 セクションは標準化する
- related context を必須にする
- 後段は layer と論点に応じて増減を許す
- design は最も厚く、future / archive は簡略化する

この形なら、
自動生成と人手整理の境界を崩さずに、
2件目以降の draft 生成も安定化できる。
