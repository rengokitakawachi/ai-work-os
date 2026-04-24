# 2026-04-24 pending_tasks_intro_and_meta_section_exclusion_rule

## 目的

`pending_tasks` split 実装後の再観測で見えた
「導入 / メタ section まで item 化される」
という未達に対して、
最小除外ルールを固定する。

本メモの目的は、
大きな再設計ではなく、
adapter に入れる次の差分を小さく限定することにある。

---

## 現象

`pending_tasks` 向け split では
`1見出し = 1item`
の基本方針は機能した。

しかし現行実装は
`まとめ` / `summary`
しか除外しておらず、
`## 概要`
のような導入 section も item 化される。

これは独立論点ではなく、
文書全体の説明であることが多いため、
routing 上のノイズになりやすい。

---

## なぜ必要か

`pending_tasks` split の主目的は、
複数論点混在を減らし、
1テーマ1メモに近づけることである。

そのため、
独立論点ではない導入 / メタ説明まで item 化すると、
次の不利益が出る。

- issue item 数だけ増える
- 1テーマ1メモ性が下がる
- route は issue のままでも粒度ノイズが残る
- 後段 review / writing の扱いやすさが落ちる

したがって、
導入 / メタ section を除外する最小ルールは必要である。

---

## 結論

`pending_tasks` split では、
独立論点ではない導入 / メタ section を
item 化しない。

第一段階では、
次を除外対象として固定する。

- `概要`
- `まとめ`
- `summary`

---

## 最小ルール

### 除外対象

次の section title は、
第一段階では split item にしない。

- `概要`
- `まとめ`
- `summary`

比較は normalize 後に行う。

### normalize 方針

- 前後空白を削る
- 小文字化する
- 日本語 title はそのまま比較する

### 除外理由

- `概要` は文書全体の導入であり、独立 task / issue ではないことが多い
- `まとめ` / `summary` は既出内容の要約であり、独立論点ではない
- 最小 split の目的は論点分離であり、導入抽出や要約抽出ではない

---

## 除外しないもの

第一段階では、
次は除外対象に広げない。

- `状態`
- `内容`
- `詳細`
- 各具体タスク見出し

理由は、
ここまで広げると
導入除外ではなく本文構造の意味解釈に入るためである。

今回は
「独立論点ではない section title を最小限で落とす」
ところまでに留める。

---

## adapter への最小反映

adapter 側では、
`isExcludedPendingTasksSection(title)` の判定に
`概要`
を追加すればよい。

つまり差分は、
大きな parser 変更ではなく
除外 title の最小追加で閉じる。

---

## 期待効果

この差分により、

- `概要` が issue item にならない
- task / issue 候補数のノイズが減る
- `pending_tasks` split の 1テーマ1メモ性がさらに上がる
- route correctness と粒度改善の分離を維持したまま前進できる

---

## 完了条件

- `概要` / `まとめ` / `summary` を除外対象として説明できる
- adapter の次差分が `isExcludedPendingTasksSection` の最小更新で済む
- `pending_tasks` split 再観測で見つかった未達を design に返せている
- 次 task を実装差分として小さく定義できる

---

## 次に落とす作業

- `pending_tasks split で 概要 を除外する最小差分を実装する`
- 実装後に `pending_tasks` 再観測を軽く再確認する
