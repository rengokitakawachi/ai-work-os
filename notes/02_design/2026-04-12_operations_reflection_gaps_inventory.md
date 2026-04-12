# 2026-04-12 operations_reflection_gaps_inventory

## 目的

`docs / notes / instruction の operations 周辺未反映差分を一覧化する`
の成果物として、
operations 周辺の未反映差分を横断で整理する。

本メモでは、
docs / notes / instruction / design / 現行運用
の差を見て、
どこに何が未反映かを固定する。

---

## 結論

未反映差分は主に
`docs/15_notes_system.md`
と
`docs/17_operations_system.md`
に集中している。

加えて、
routing 後処理の運用は design まで上がったが、
docs 側にはまだ反映されていない。

優先度は次の通り。

1.
`docs/17_operations_system.md`

2.
`docs/15_notes_system.md`

3.
`docs/13_dev_workflow.md`

---

## 差分サマリ

### A. `docs/17_operations_system.md` の未反映差分

現行 docs の状態

- operations は 7日ローリングとして説明されている
- active / next / archive の3構造はある
- daily review / weekly review の大枠はある

未反映

1.
日中運用と review 時運用の分離

- 日中は active を正本として実行する
- archive 移動や rolling 確定は daily review でのみ行う
- 完了認識と構造変更判定は分ける

2.
例外 reroll の条件

- active が壊れている
- 重複している
- 実行不能
- 誤混入 task を除去しないと進めない

などの整合回復時のみ日中 reroll を許可する

3.
active に完了 task が残っていてよい点

- daily review 前なら許容
- active に残っているだけで未整合としない

4.
next_operations の意味

- 単なる backlog ではない
- active 補充や review 時再設計の候補プール

判断

- `docs/17` は operations の実運用本体に対する差分が最も大きい
- 最優先反映対象

---

### B. `docs/15_notes_system.md` の未反映差分

現行 docs の状態

- notes 構造は概ね現行に近い
- 04_operations / 06_handover / 07_reports / 80_future は記載済み

未反映

1.
`04_operations` の日中運用 / review 時運用の違い

- active には完了認識済み task が daily review まで残りうる
- archive 移動と rolling 確定は review 時に行う

2.
`06_handover` の位置づけ補強

- handover は再開入口
- ただし短期実行順の正本は operations

3.
`07_reports` の位置づけ補強

- report は review の結果物
- 保存だけでは review 完了ではない
- operations 更新まで含めて review 完了

4.
routing 後処理未反映

- routing 後は振り分けた先を処理する
- 役目終了なら archive
- 判断に迷うなら先送りして残す

判断

- notes レイヤー説明として現行運用との差が出やすい
- `docs/17` の次に反映すべき

---

### C. `docs/13_dev_workflow.md` の未反映差分

現行 docs の状態

- 開発フローの大枠はある
- notes / design / docs / code の流れは見える

未反映

1.
operations を短期実行順正本として読む前提の補強

2.
review は report 保存だけで終わらない点

3.
日中 execution と review 時更新の分離

4.
routing 後処理の軽い補足

判断

- 補強価値はある
- ただし operations 詳細は 17 に寄せる方が責務分離上よい

---

### D. instruction 側で先行し、docs 未反映の差分

1.
Operations状態判断手順

- 運用モード
- 完了状態
- 構造変更要否

の順で見る

2.
日中運用中の禁止 / 許容の整理

3.
conversation routing 原則

- 会話中に新規候補が出ても横入り実行しない
- issue 起点で受ける
- active / next / future を先に提案する

4.
routing と review の責務分離

判断

- すべてを docs に上げる必要はない
- ADAM 固有制御文言は instruction に留める
- ただし共通骨格部分は docs に昇格できる

---

### E. design まで上がったが docs 未反映の差分

1.
`review_system_and_operations_rolling_connection`

- daily review は rolling の主要確定地点
- weekly review は rolling の再設計地点
- 例外 reroll は整合回復時のみ

2.
`intake_and_issue_routing_minimum_roles`

- intake routing は未整理入力を構造化
- issue routing は issue を再配置
- routing 後は振り分けた先を処理する
- 役目終了なら archive
- 迷うなら先送りして残す

3.
`docs_execution_governance_reflection_candidates`

- docs 反映順
- まだ docs に上げないもの
- ADAM 固有文言の docs 非昇格判断

---

## docs へ上げてよい差分

### 上げてよい

- 日中運用と review 時運用の分離
- 完了判定と構造変更判定の分離
- next_operations は backlog ではない
- report は review の結果物
- handover は再開入口、operations は短期実行順正本
- routing と review の責務分離
- routing 後処理
  - 役目終了なら archive
  - 迷うなら残す

### まだ docs に上げない

- Operations状態判断手順の回答順そのもの
- ADAM 固有の会話制御文言
- GPT editor 前提の操作
- 特定 task 名や Day 配置
- 例外 reroll の具体事例列挙の細部

---

## 推奨反映順

1.
`docs/17_operations_system.md`

理由

- execution governance の差分本体がここに集まるため

2.
`docs/15_notes_system.md`

理由

- notes 構造と実運用の差を埋める必要があるため

3.
`docs/13_dev_workflow.md`

理由

- 全体フローの補強としては有効だが後順位でよい

---

## 次にやるべきこと

1.
`docs/17_operations_system.md` の差分案を作る

2.
`docs/15_notes_system.md` の差分案を作る

3.
必要なら `docs/13_dev_workflow.md` を補強する

---

## 判断

operations 周辺の未反映差分は、
単発の表現ズレではなく、

- execution governance
- review 接続
- routing 後処理
- handover / reports の位置づけ

の未昇格差分である。

したがって、
次は `docs/17` と `docs/15`
を順に更新するのが自然である。
