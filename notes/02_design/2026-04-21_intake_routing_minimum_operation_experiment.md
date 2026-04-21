# 2026-04-21 intake_routing_minimum_operation_experiment

## 目的

intake routing の完成を、
「コードがあること」ではなく
「実際に運用して効果が見えること」
で判定するため、最小運用実験の入力候補と観測項目を固定する。

---

## 前提

Phase 0 plan における intake routing は、
未整理入力の入口処理であり、
issue / design / future / archive への安全な振り分けを担う。

また docs と既存 design では、
intake routing は次を含むと整理されている。

- inbox / 関連入力読取
- チャンク分解
- テーマ統合
- 1テーマ1メモ生成
- source_ref 付与
- 保存先判定
- inbox 後処理

したがって、
intake routing の完成条件は
単純な `route_to` 返却だけでは足りない。

---

## 結論

intake routing の最小運用実験は、
次の 3 系統を観測できる構成で始めるのが自然である。

1.
問題として扱う入力
→ issue

2.
構造整理が必要な入力
→ design

3.
今は扱わない入力
→ future

archive は、
未整理入力または派生メモの役目終了が明確なときに
追加観測対象とする。

つまり第一段階では、
まず
`issue / design / future`
の 3 分岐と
source_ref / inbox 後処理の自然さを観測し、
その後に archive 条件を追加確認するのが安全である。

---

## intake routing の完成条件（最小版）

intake routing は、
次を満たしたときに完成へ近いとみなす。

- 実際の inbox 入力を読んで routing できる
- issue / design / future への送付結果が実運用で確認できる
- source_ref が派生メモ側に自然に残る
- inbox 後処理として `archive / 残す` の判断ができる
- 会話起点 issue routing と役割差が説明できる
- 観測結果をもとに routing 判定軸や後処理ルールを修正できる

補足:
- archive は第一実験で必須ではない
- ただし後処理判断として、いつ archive へ移すかは観測項目に含める

---

## 現時点で未達のもの

現行 code / notes の範囲では、
次はまだ未達である。

1.
実 inbox 入力を使った最小運用実験が未実施

2.
source_ref の実運用観測が未記録

3.
inbox 後処理
- archive に移す
- pending として残す
の観測が未記録

4.
intake routing と issue routing の境界を、
運用例ベースで説明する記録が不足

---

## 最小実験の入力候補

第一バッチでは、
次のような入力を用意するのが自然である。

### 1. issue 観測用

条件:
- 未整理入力だが、中心は「問題提起」
- まだ解決策の構造整理は主ではない
- 今の phase 内で扱う価値がある

期待 route:
- `issue`

観測したい点:
- issue 化が自然か
- 1テーマ1メモ化したときに論点が崩れないか

---

### 2. design 観測用

条件:
- 未整理入力だが、中心は「構造整理 / 仕様草案」
- 問題提起よりも設計整理の性格が強い
- 今の phase 内で扱う価値がある

期待 route:
- `design`

観測したい点:
- design と issue の境界が自然か
- source_ref を持った派生 design メモとして読めるか

---

### 3. future 観測用

条件:
- 論点自体はある
- ただし今は phase 不一致、前提未整備、または優先度が低い

期待 route:
- `future`

観測したい点:
- keep ではなく future に送る理由が説明可能か
- 直接 active に戻さず再 routing 前提で扱えるか

---

### 4. archive / pending 後処理観測用

条件:
- 入力ファイル全体として役目終了が明確
  または
- 判断困難で pending として残す方が自然

期待:
- inbox 後処理として
  `archive` へ移す、または `残す`

観測したい点:
- routing と後処理を分けて説明できるか
- 無理由で inbox に残していないか

---

## 観測項目

### A. route 判定

各入力について確認する。

- `route_to`
- `reason`
- `review_at`

観点:
- issue / design / future の判定が直感に反していないか
- 理由文が運用上説明可能か

### B. 派生メモの成立性

- 1テーマ1メモになっているか
- 単体で読めるか
- source_ref が自然に残るか

### C. source_ref

- 出力側にのみ付与されているか
- 参照元が追跡可能か

### D. inbox 後処理

- archive に移すべきか
- pending として残すべきか
- その理由が説明可能か

### E. role boundary

- intake routing が issue routing の代替になっていないか
- intake が「入口処理」に留まっているか
- operations や review を背負っていないか

---

## 実験手順

1.
実 inbox 入力または inbox 相当の入力束を選ぶ

2.
チャンク分解 / テーマ統合の前提で intake routing を行う

3.
issue / design / future の route 結果を確認する

4.
派生メモと source_ref の自然さを確認する

5.
inbox 後処理として
`archive / 残す`
の判断を記録する

6.
観測結果を analysis に返す

---

## 今回やらないこと

この段階では、
次はまだ行わない。

- docs への即反映
- issue routing と統合した一括実装
- active_operations への無条件横入り
- intake routing から operations 直結の運用

まずは、
入口処理として成立しているかを最小観測する。

---

## 次に自然なタスク

1.
`intake routing の第一バッチ候補を整理する`

2.
`intake routing の観測項目を analysis に落とす`

3.
必要なら
`docs/05_roadmap.md` の Phase 0 現在地へ返す

---

## 判断

intake routing は、
現時点で骨格設計はあるが、
運用完成条件と最小実験はまだ十分固定されていなかった。

したがって、
次は
`issue / design / future`
の 3 分岐と
source_ref / inbox 後処理を確認する
最小運用実験から始めるのが自然である。
