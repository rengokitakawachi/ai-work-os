# 2026-04-18 decisions_minimum_operating_model_for_adam

## 目的

`notes/05_decisions/` を、
単なる「意思決定ログ」説明から、
ADAM で試験運用できる最小モデルへ引き上げる。

本メモは、

- 何を decision として残すか
- どこから抽出するか
- どう参照を持つか
- issue / design / operations / dev_memo とどう違うか

を最小で固定することを目的とする。

---

## 結論

ADAM における decision は、

**複数の候補や判断余地があった中で、
どの方針を採るかを決めた記録**

として扱う。

最小運用では、
decision は次の性質を持つ。

- 正本仕様ではない
- issue でも design でもない
- ただし後から「なぜそうなったか」を追う参照ハブになる
- 1 decision = 1つの判断単位

---

## 位置づけ

### issue

- 何が問題か
- 何を課題として扱うか

### design

- どう解くか
- どんな構造 / ルールにするか

### operations

- 今なにを実行するか

### dev_memo

- 観察・仮説・比較材料

### decision

- どの案を採ったか
- なぜその案にしたか
- 何を見送ったか

したがって、
decision は

```text
問題の定義でもなく
解決策本文でもなく
実行順そのものでもない
```

が、
それらをつなぐ「判断の記録」である。

---

## 何を decision として残すか

以下を満たすものを decision として残す。

### 条件

1.
複数の選択肢や進め方がありえた

2.
その中から 1つを採用した

3.
後から理由を参照する価値がある

4.
以後の design / operations / docs に影響する

### 例

- `routing と review を分離する`
- `operations candidate は next ではなく queue に送る`
- `active は reroll candidate source に戻す`
- `task 粒度は 0.5〜1.5h を目安にする`

### decision にしなくてよいもの

- 単発の状態報告
- 明らかな誤字修正
- 比較も迷いもない mechanical な追記
- その日だけ意味がある会話断片

---

## source として見る場所

最小運用では、
decision 抽出元を次に限定する。

- `01_issues`
- `02_design`
- `04_operations`
- `00_inbox/dev_memo`
- 会話中に明示された採用判断

必要なら補助的に次も参照する。

- `07_reports/daily`
- `docs`

ただし docs は仕様正本なので、
docs 本文そのものを decision layer の代替にはしない。

---

## 最小 schema

1 decision は少なくとも次を持つ。

- `decision_id`
- `title`
- `decided_at`
- `status`
- `summary`
- `adopted`
- `why`
- `source_ref`
- `related_refs`

必要に応じて次を持てる。

- `alternatives_considered`
- `impact_scope`
- `supersedes`
- `superseded_by`
- `notes`

---

## 各項目の意味

### decision_id

一意識別子。

最小では日付 + 連番でよい。

### title

判断内容を一文で表す。

例:
- `operations candidate は next ではなく queue に送る`

### decided_at

その判断を採った時点。

### status

最小では次でよい。

- `active`
- `superseded`

### summary

何を決めたかの短い要約。

### adopted

採用した案や方針。

### why

なぜその案にしたか。

### source_ref

その判断が形成された一次ソース。

### related_refs

影響先や関連物。

---

## source_ref と related_refs の使い分け

### source_ref

判断の根拠になったもの。

例:

- issue
- design
- dev_memo
- 会話範囲

### related_refs

判断の影響先・参照先。

例:

- operations task
- docs section
- report
- 後続 design

この分離により、
「何から決まったか」と
「どこへ効いたか」を分けて追える。

---

## 1 decision の粒度

原則として、
1 decision = 1つの判断単位とする。

### 分けるべき場合

- 採用した方針が別々に覆りうる
- 影響先が大きく異なる
- 理由が別である

### まとめてよい場合

- 同じ判断の言い換え
- 1つの判断の補足条件
- 一体でしか説明できない採用方針

---

## 保存単位

最小運用では、
`05_decisions` は

**1 decision 1 file**

とするのが自然である。

理由:

- 参照しやすい
- superseded 関係を持ちやすい
- source_ref / related_refs を個別に持てる

ファイル名の最小案:

`notes/05_decisions/YYYY-MM-DD_<slug>.md`

---

## decision を作るタイミング

最小運用では、
毎回自動抽出しない。

次のどちらかで作る。

### 1. 会話中に明示的に重要判断が出たとき

### 2. design 化の過程で、
「この判断自体を後で追いたい」
と分かったとき

つまり、
最初は selective capture でよい。

---

## docs との関係

docs は SSOT である。

したがって、

- decision は docs の代わりにならない
- docs に書くべき仕様は docs に書く
- decision は「なぜそうしたか」を補助する

つまり、

```text
仕様の正本 = docs
判断の履歴 = decisions
```

である。

---

## design との関係

design は構造化された解決策であり、
decision はその途中や節目の採用判断である。

したがって、

- design が長くなりすぎるとき
- 比較したが本文に全部書かない方がよいとき
- 後で方針変更を追いたいとき

に decision へ切り出す価値がある。

---

## operations との関係

operations task そのものを decision にしない。

ただし、

- active を candidate source に戻す
- Day は箱として扱う
- next は projection 対象かどうか

のように、
operations 運用ルールを変える判断は
operation ではなく decision として残す価値が高い。

---

## 最小テンプレート

```md
# <title>

- decision_id:
- decided_at:
- status:

## summary

## adopted

## why

## source_ref
- 

## related_refs
- 

## alternatives_considered
- 
```

---

## ADAM での当面運用

当面は次の運用で十分である。

1.
重要な採用判断が出たら、
まず issue / design / operations を正しく保存する

2.
そのうえで、
後から理由追跡価値が高いものだけ
`05_decisions` に切り出す

3.
`05_decisions` は網羅性より再利用価値を優先する

4.
EVE 本実装前の試験運用として、
相互参照と superseded 関係を観察する

---

## まだ固定しないこと

現段階では次を固定しない。

- 自動抽出ルール
- どの review で decision を見直すか
- decision と docs 差分の自動リンク
- DB 化や集約 index
- decision history の履歴多層化

まずは

- 何を decision とするか
- 最小 schema
- source_ref / related_refs
- 1 decision 1 file

だけを固定する。

---

## 判断

ADAM における `05_decisions` の最小運用モデルは、

- 重要な採用判断だけを selective に残す
- 1 decision 1 file とする
- source_ref と related_refs を分ける
- docs の代替ではなく判断履歴として使う

で始めるのが自然である。

この形なら、
過剰な仕組み化を避けつつ、
EVE で必要になる decision 履歴モデルの手触りを
ADAM 上で先行検証できる。
