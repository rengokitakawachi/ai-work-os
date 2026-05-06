# 2026-04-25 daily_review_reroll_candidate_source_minimum_check

## 目的

daily review reroll で、
`current active` だけを見て active / next を更新してしまうのを防ぐため、
最小チェックを固定する。

本メモの目的は、
reroll 前に candidate source を fail-closed で確認する運用を、
小さく明示することである。

---

## 背景

operations の docs と review spec では、
rolling は候補比較によって短期実行順を決める処理であり、
daily review では少なくとも次を candidate source として確認する必要がある。

- plan
- open issue
- next_operations
- current active

しかし実運用では、
その時点で見えている current active や会話中の近接論点だけで reroll したくなることがある。

この状態では、

- plan 由来の直近作業が落ちる
- open issue が埋もれる
- next_operations の繰り上げ候補が見落とされる
- reroll completeness が説明できない

という問題が出る。

---

## docs 整合

`docs/17_operations_system.md` では、
operations rolling の candidate source 例として次が明示されている。

- plan の主要論点や直近作業
- open issue
- design 未反映差分
- next_operations
- future からの再活性化候補

また `notes/02_design/2026-04-03_review_system_operating_spec.md` では、
daily review の candidate source として少なくとも次を確認すると整理している。

- plan
- open issue
- next_operations
- current active

したがって、
現時点の最小チェックとしては
この4つを mandatory source とするのが自然である。

---

## 結論

daily review reroll 前には、
少なくとも次の 4 source を確認したことを明示する。

- plan
- open issue
- next_operations
- current active

この 4 source のうち 1つでも未確認なら、
reroll は完了扱いにしない。

つまり、
**candidate source 未確認の reroll は fail-closed で停止する**
を最小ルールとする。

---

## 最小チェック

### 1. review モード明示

最初に、
今回が daily review であることを明示する。

### 2. candidate source 列挙

reroll 前に、
今回確認する source を明示する。

最低限:

- plan
- open issue
- next_operations
- current active

### 3. source 確認済み判定

各 source について、
少なくとも読取済みであることを確認する。

### 4. reroll 実施

4 source 確認後にのみ reroll する。

### 5. fail-closed

次の場合は reroll 完了扱いにしない。

- source の列挙がない
- 4 source の一部が未確認
- active_operations だけ更新して next_operations を未更新のまま終える
- reroll 未実施のまま daily report だけ保存する

---

## 出力上の最小明示

daily review 開始時には、
少なくとも次をコードブロックで出す。

- 今回の手順
- 更新対象
- 完了条件
- review モード
- candidate source
- reroll 実施有無

これにより、
review 本体と report 保存だけの状態を区別しやすくする。

---

## なぜ 4 source で始めるか

本来の candidate source は、
将来的に design 未反映差分や future 再活性化候補まで広がりうる。

ただし第一段階では、
運用負荷を上げすぎずに再発防止を効かせるため、
まずは daily review spec で既に強く必要とされている 4 source に限定する。

- plan
- open issue
- next_operations
- current active

この 4 source を mandatory にするだけでも、
current active 偏重 reroll はかなり防げる。

---

## 期待効果

このチェックにより、

- reroll completeness を説明できる
- plan / issue / next の埋没を防ぎやすい
- active のみを見た局所最適 rerollを減らせる
- daily review の completed condition を report 保存と切り分けやすくなる

---

## 完了条件

- reroll 前の mandatory source が 4つ固定されている
- source 未確認なら fail-closed で止まると説明できる
- daily review 開始時に何を明示すべきか固定できる
- reroll 完了と report 保存を区別できる
- 次 task を instruction 反映確認へ自然に接続できる

---

## 次に落とす作業

- `ADAM の instruction へ daily review reroll gate 反映を確認する`
- 必要なら `design 未反映差分` と `future 再活性化候補` を candidate source に含める拡張を後段で検討する
