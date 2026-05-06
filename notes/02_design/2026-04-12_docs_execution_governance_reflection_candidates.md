# 2026-04-12 docs_execution_governance_reflection_candidates

## 目的

execution governance の試験運用結果を踏まえ、
docs へ反映すべき候補を整理する。

本メモは docs 更新そのものではなく、
docs 反映前の design 整理として扱う。

---

## 前提

今回の整理元は以下。

- `config/ai/adam_instruction.md`
- `notes/02_design/2026-04-03_review_system_operating_spec.md`
- `notes/04_operations/active_operations.md`
- `notes/04_operations/next_operations.md`
- `notes/04_operations/archive_operations.md`
- `notes/04_operations/2026-04-12_weekly_review_prep.md`

確認対象 docs は以下。

- `docs/13_dev_workflow.md`
- `docs/15_notes_system.md`
- `docs/17_operations_system.md`

---

## 結論

docs 反映候補はある。

ただし、
すぐに docs へ上げてよいものと、
まだ design / review で様子を見るべきものを分ける必要がある。

現時点では、
以下を docs 反映候補として扱う。

1.
operations の日中運用と review 時運用の分離

2.
完了判定と構造変更判定の分離

3.
active / next / archive の役割と、
daily review / weekly review での扱いの明確化

4.
weekly review 前提で archive snapshot を扱う流れの補強

一方で、
以下はまだ docs に上げない。

- ADAM 固有の会話上制御文言
- GPT editor 前提の外部操作
- 一時的な task 名や具体 Day 配置
- `Phase 0 直結 / 補助` の運用表現そのもの

---

## docs ごとの反映候補

### 1. `docs/13_dev_workflow.md`

#### 反映候補

- docs / notes / code だけでなく、
  operations を短期実行正本として読む前提を少し強める
- review は report 保存だけで終わらず、
  operations 更新まで含めて完了とする点を明確化する
- 会話中の execution と review 時の更新を分ける前提を補強する

#### 具体論点

- `notes → docs → code` だけでなく、
  日中運用では `operations` が実行順正本であること
- review 系依頼では、
  spec 読取 → 手順確認 → 更新対象確認 → 完了条件確認
  を先に行う点
- report は結果物であり、
  review 本体ではない点

#### 優先度

- 中

#### 理由

- 開発フロー docs として、
  review 実行の完了条件を少し補強した方が整合がよい
- ただし operations 詳細を書きすぎると 17 と責務が重なるため、
  13 では原則だけに留める

---

### 2. `docs/15_notes_system.md`

#### 反映候補

- `04_operations` の説明に、
  日中運用と review 時運用の違いを補強する
- `06_handover` と `04_operations` の読み順の実運用を軽く補足する
- `07_reports` について、
  report は review の結果物である点を明確化する

#### 具体論点

- `04_operations`
  - active には完了認識済み task が daily review まで残りうる
  - archive への移動と rolling 確定は review 時に行う
- `06_handover`
  - 再開入口ではあるが、短期実行順正本は operations である
- `07_reports`
  - report 保存だけでは review 完了ではない

#### 優先度

- 高

#### 理由

- notes レイヤー説明として、
  現在の実運用との差分が最も出やすいのが 15
- execution governance の試験運用結果は、
  notes 構造と運用原則の接点に最も現れている

---

### 3. `docs/17_operations_system.md`

#### 反映候補

- operations の日中運用ルールを補強する
- 完了 task が daily review まで active に残ってよい点を明文化する
- weekly review の役割として、
  archive snapshot 保存と next 再評価をより明確にする

#### 具体論点

- 日中運用
  - active の順序と Day 構造を原則維持する
  - 会話中は完了認識や軽い並び替えはありうる
  - ただし archive 移動と rolling 確定は daily review で行う
- 状態判断
  - 完了判定と構造変更判定は分ける
  - active に完了 task が残っているだけで未整合としない
- weekly review
  - archive_operations の snapshot 保存
  - active / next の次週再設計
  - next の再評価

#### 優先度

- 高

#### 理由

- 今回の execution governance 変更の本体は 17 に最も近い
- 誤解が起きた論点も、
  operations 状態判断と review 境界に集中していた

---

## まだ docs に上げないもの

### ADAM 固有の instruction 文言

以下は docs ではなく instruction / design に留める。

- `Operations状態判断手順` の全文表現
- `運用モード → 完了状態 → 構造変更要否` の回答順
- GPT editor 前提の操作
- 会話内での細かな自己チェック表現

理由

- docs は共通骨格を定義する層であり、
  ADAM 固有の応答制御を直接書く場所ではないため

---

### Phase 0 固有の一時整理

以下も docs にはまだ上げない。

- `Phase 0 直結 task / 補助 task` の分類表現
- 特定 task 名ベースの運用整理
- 一時的な weekly review 準備メモの内容そのもの

理由

- これらは plan / operations の運用状況に依存するため
- docs に上げるにはまだ具体的すぎるため

---

## 推奨反映順

1.
`docs/17_operations_system.md`

2.
`docs/15_notes_system.md`

3.
`docs/13_dev_workflow.md`

理由

- execution governance の中核は 17
- notes レイヤー整合は 15
- 開発フロー全体への反映は 13 の順が自然

---

## 次の作業

1.
`docs/17_operations_system.md` の差分案を作る

2.
`docs/15_notes_system.md` の差分案を作る

3.
必要最小限で `docs/13_dev_workflow.md` の差分案を作る

4.
人間判断後に docs へ反映する

---

## 判断

現時点で docs 反映候補として最も価値が高いのは、
`17_operations_system.md` と `15_notes_system.md` である。

`13_dev_workflow.md` は補強候補ではあるが、
まずは operations と notes の実運用差分を優先して詰める方がよい。
