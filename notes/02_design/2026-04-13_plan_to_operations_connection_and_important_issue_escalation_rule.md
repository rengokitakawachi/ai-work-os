# 2026-04-13 plan_to_operations_connection_and_important_issue_escalation_rule

## 目的

`plan から operations への接続弱化ポイントと重要 issue の埋没防止ルールを design に整理する`
の成果物として、
plan → issue → operations の接続弱化ポイントと、
重要 issue の埋没防止ルールを固定する。

本メモは、
issue routing がまだ完全ではない段階でも、
plan にある重要論点が operations に落ちる最小運用を定義するためのものである。

---

## 結論

問題は次の通りである。

- plan に重要論点がある
- issue には記録される
- しかし operations candidate 化されず、
  active / next に比較対象として上がらない

この状態だと、
operations rolling は
plan を前進させる短期実行順決定として十分に機能しない。

したがって、
issue routing 未完成期の暫定ルールとして、
重要 issue は
「issue に残すだけで終わらせず、
operations candidate 化の要否を明示し、
再評価地点まで決める」
ことを必須にする。

---

## 何が弱いのか

接続の弱点は4段ある。

### 1. plan にあるが、issue に切り出されない

重要論点が plan の本文にだけ残ると、
日々の会話や reroll の比較対象に上がりにくい。

### 2. issue にはなったが、位置づけ判定が止まる

issue に保存しただけで、
design / operations / future のどこへ送るかが未決になる。

### 3. operations candidate 化されない

重要でも、
実行単位に落とされなければ
active / next 比較のレースに乗らない。

### 4. 再評価地点が決まっていない

`あとで見る` だけだと埋もれる。

daily review / weekly review / reroll / 会話中再評価
のどこで見るかが必要である。

---

## なぜ埋もれるのか

主因は次の通り。

- issue を保存しただけで安心しやすい
- next を候補素材ではなく既定順として見てしまいやすい
- operations candidate 化しないと比較対象に上がらない
- issue routing が未完成で、定期棚卸しが弱い

つまり、
`重要かどうか` と
`operations に比較対象として上がるかどうか`
が分離していることが問題である。

---

## 暫定運用の基本原則

issue routing 未完成期は、
重要 issue について次をセットで扱う。

1.
issue として記録する

2.
位置づけを判定する

- design 化候補か
- operations candidate か
- future か
- archive か

3.
operations candidate 化の要否を明示する

4.
再評価地点を明示する

- 今回の reroll
- daily review
- weekly review
- 後段の issue routing review

---

## 重要 issue の最小判定基準

以下のどれかを満たすものは、
`重要 issue` として埋没防止対象にする。

- plan の主要論点に直接接続する
- plan の完了条件に直接効く
- rolling 判断の質を下げる構造問題である
- review / routing / operations の責務境界に関わる
- docs / design / operations のどこにも未反映の重要差分である

---

## operations candidate 化の最小条件

重要 issue は、
以下を満たすなら operations candidate 化する。

- 実行単位に落とせる
- 今この phase で扱う意味がある
- design 化すると前進量が大きい
- active / next と比較する価値がある

例

- `plan から operations への接続弱化ポイントと重要 issue の埋没防止ルールを design に整理する`

これは、
構造問題を design に落とす明確な作業単位であり、
operations candidate として妥当である。

---

## operations candidate 化しない場合

重要 issue でも、
まだ operations candidate にしないことはある。

その場合は、
必ず理由と再評価地点を残す。

### future に送る場合

- phase が早い
- 前提未整備
- まだ論点が粗い

### issue に残す場合

- まだ design に上げる粒度に達していない
- 実行単位化すると premature になる

### design に先に送る場合

- 実行より先に構造整理が必要
- その design を経由しないと operations に落とせない

---

## reroll と review での扱い

### reroll 時

reroll では、
next だけでなく以下を候補素材として見る。

- plan の未充足
- open issue
- design 未反映差分
- next_operations
- future からの再活性化候補

重要 issue が operations candidate 化済みなら、
必ず比較対象に入れる。

### daily review 時

daily review では、
その日に発見された重要 issue について

- issue 化済みか
- candidate 化済みか
- active / next / future のどこに置くか
- 再評価地点があるか

を確認する。

### weekly review 時

weekly review では、
plan と operations の接続弱化を重点確認する。

つまり、
`plan にあるが operations に落ちていない重要論点`
を拾う地点として使う。

---

## 最小フロー

```text
plan で重要論点を確認
↓
issue 化
↓
位置づけ判定
  - design
  - operations candidate
  - future
  - archive
↓
operations candidate 化するなら task 名を作る
↓
reroll / review で active / next と比較する
↓
再評価地点を残す
```

---

## 最小ルール

- plan の重要論点は issue に切り出す
- issue に残しただけで終わらせない
- 重要 issue は位置づけ判定を必須にする
- candidate 化するなら active / next の比較対象に入れる
- candidate 化しないなら理由と再評価地点を残す
- reroll は next の繰り上げではなく、
  plan 前進のための比較として扱う
- weekly review は
  `plan にあるが operations にない重要論点`
  を拾う地点として使う

---

## この整理で防げる誤り

- plan にある重要論点が issue 止まりになる
- issue を保存しただけで満足する
- next にないから比較対象に入らない
- reroll を next 繰り上げとして扱う
- 重要 issue の再評価地点が不明なまま放置される

---

## 判断

plan を前進させるための operations rolling を機能させるには、
`重要 issue を比較レースに乗せる前処理`
が必要である。

そのため、
issue routing 未完成期の暫定原則は次である。

- 重要 issue は issue に残すだけで終わらせない
- 位置づけ判定と candidate 化の要否を明示する
- reroll / review のどこで再評価するかを決める

この整理により、
plan → issue → operations の接続弱化はかなり補正できる。
