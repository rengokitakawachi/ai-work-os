# 2026-04-12 review_system_and_operations_rolling_connection

## 目的

review system と operations rolling の接続ルールを整理し、
execution governance の試験運用結果を
review system 側へ返せる形にする。

本メモでは、
daily review / weekly review / 日中運用
の3地点で rolling をどう扱うかを明確にする。

---

## 結論

operations rolling は、
常時実行する処理ではなく、
review 地点を中心に使う。

整理すると以下。

- 日中運用
  - active を正本として実行する
  - 完了認識や軽い並び替えはありうる
  - ただし archive 移動と rolling 確定はしない

- daily review
  - rolling の主要確定地点
  - 完了 task の archive 移動
  - 未完了 task の繰越判断
  - 明日の実行順調整
  - active / next の更新
  をまとめて行う

- weekly review
  - rolling の再設計地点
  - roadmap / plan / operations の整合を確認し、
    次週の active / next / archive の再構成へ返す

したがって、
rolling は
「日中に常時回すもの」ではなく、
「review 地点で確定し、日中はその結果に従って実行するもの」
と捉えるのが正しい。

---

## review system 側の前提

### daily review

daily review は、
その日の実績を確認し、
翌日の実行順へ反映する review である。

ここで行うもの

- 完了 task の archive 移動
- 未完了 task の繰越判断
- 明日の実行順調整
- operations 更新
- daily report 保存

つまり、
短期実行順の確定更新地点である。

### weekly review

weekly review は、
roadmap / plan / operations の整合を確認し、
次週方針へつなぐ review である。

ここで行うもの

- 週の進捗確認
- plan と operations の接続見直し
- active / next の再設計
- 必要なら plan の継続 / 分割 / 完了 / defer / 新規化
- weekly report 保存

つまり、
rolling の上位再設計地点である。

---

## operations rolling 側の前提

operations rolling は以下の一体処理である。

- candidate collection
- normalization
- generation 条件確認
- decomposition
- helper scoring
- ranking
- placement
- active / next / archive 出力

この中で、
実運用上の重要点は次の3つ。

1.
ranking は相対順位で決める

2.
placement により
active / next / archive を出力する

3.
出力は上位計画から生成されるが、
実行結果は上位へ返す

---

## 接続ルール

### 1. 日中運用と rolling を分ける

日中運用では、
active_operations を正本として上から実行する。

日中にやってよいこと

- active task の進行
- 完了認識
- active 内の軽い優先順位変更
- 実行不能判定
- 必要時の candidate 比較メモ作成

日中にやってはいけないこと

- archive 移動の確定
- daily review の代替としての full reroll
- Day 再編成の確定
- review を飛ばした active / next / archive の全面更新

理由

- rolling の確定地点を review に限定しないと、
  実行と見直しの境界が崩れるため

---

### 2. daily review は rolling の主要確定地点

daily review では、
日中に蓄積した完了認識・未完了・実行不能・候補比較を受けて、
active / next / archive を更新する。

ここで確定するもの

- 完了 task の archive 移動
- 未完了 task の繰越
- active の翌日順序
- next の繰り上げ
- 必要な reroll

したがって、
daily review は
「rolling を正式に反映する地点」
とみなすのがよい。

---

### 3. weekly review は rolling の再設計地点

weekly review は、
daily review 群の結果を集約し、
plan / roadmap との整合から
次週の active / next を見直す地点である。

daily review との違いは、
次の通り。

- daily review
  - 短期実行順の調整

- weekly review
  - 短期実行順の設計方針自体の見直し

したがって、
weekly review では
placement の前提となる重点や候補群の見直しが中心になる。

---

### 4. 例外 reroll は「active が壊れたとき」に限定する

日中でも reroll が必要になる例外はある。

ただし、
それは通常運用ではなく、
整合回復である。

例

- active が完了済み task だけになった
- active に重複がある
- task が実行不能で構造上詰んでいる
- 誤混入 task を削除しないと次へ進めない

この場合のみ、
例外的に reroll を行ってよい。

ただしその場合も、

- 何が壊れていたか
- なぜ例外か
- どの候補を補充したか

を notes に残す。

---

## 実運用で固定された解釈

今回の試験運用で固定できた点は以下。

### 完了判定と構造変更判定は分ける

- task が完了した
- active から外す
- archive に移す

は同時ではない。

日中は
「完了認識済みだが active に残る」
状態がありうる。

構造変更は review で確定する。

### report は review の結果物である

daily / weekly report を保存しただけでは、
review 完了ではない。

operations 更新まで含めて review 完了とみなす。

### next は reroll 時の補充プールである

next_operations は backlog ではない。

active が実行不能になった場合や、
review 地点で active を組み直す場合の
近未来候補プールとして扱う。

---

## 接続図

```text
日中運用
↓
active を正本として実行
↓
完了認識 / 実行不能 / 候補比較を蓄積
↓
daily review
↓
rolling 確定
↓
active / next / archive 更新
↓
daily report

その蓄積
↓
weekly review
↓
plan / operations / roadmap 整合確認
↓
次週の rolling 再設計
↓
weekly report
```

---

## docs 反映候補

この接続ルールは、
主に以下へ反映候補となる。

- `docs/17_operations_system.md`
- `docs/15_notes_system.md`

補助的に、
- `docs/13_dev_workflow.md`
にも review 完了条件として反映余地がある。

---

## 判断

review system と operations rolling の接続は、
以下で整理できる。

- 日中は execution
- daily review は rolling の主要確定地点
- weekly review は rolling の再設計地点
- 例外 reroll は整合回復時のみ

この整理により、
execution governance と review system の境界は
かなり明確になった。
