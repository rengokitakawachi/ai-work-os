# 2026-05-02 DELTA recommended line generation issue

## title

DELTA recommended line generation が日中の都度再見積もりになっており、daily review 固定運用になっていない

## status

open

## category

DELTA / daily review / operations generation / recommended lines

## created_at

2026-05-02

## source_ref

- user request: DELTA recommended line generation の設計修正依頼
- notes/01_issues/2026-05-01_delta_daily_operations_plan_gap_check_issue.md
- notes/02_design/2026-05-01_delta_daily_operations_plan_gap_check_design.md
- notes/01_issues/2026-05-02_delta_progress_granularity_rule_issue.md
- notes/02_design/2026-05-02_delta_progress_granularity_rule_design.md
- systems/delta/roadmap/delta_roadmap.md
- systems/delta/plan/2026_sharoushi_exam_plan.md
- systems/delta/operations/active_operations.md
- systems/delta/history/2026-05.md
- notes/02_design/2026-05-02_delta_recommended_line_generation_design.md

---

## problem

現在の DELTA は、ユーザーが日中に「今日の推奨ラインは？」と聞くたびに、その場で plan / operations / history を読み、推奨ラインを再見積もりする挙動になっている。

これは設計として不適切。

推奨ラインは 1 日の中で頻繁に変わるものではなく、daily review 時に長期・中期計画と当日実績を照合して、翌日分を確定すべき。

---

## expected design

DELTA / ADAM の特徴は、長期・中期計画から daily operations を生成すること。

したがって、推奨ラインは次のタイミングで作成する。

1. 一日の終わりに daily review を実施する
2. roadmap / plan / operations / history を読む
3. plan 上の本来位置と history 上の現在地を比較する
4. gap_status を判定する
5. 翌日の operation_mode を決める
6. 翌日の必達・標準・余力ラインを決める
7. active_operations に保存する

---

## required behavior

### 1. recommended_lines are generated during daily review

翌日の recommended_lines を daily review の出力として生成する。

含める項目:

- fixed_at
- plan_anchor
- current_position
- expected_position
- gap_status
- operation_mode
- must_line
- standard_line
- stretch_line
- defer
- recompute_triggers

### 2. recommended_lines are stored in active_operations

active_operations の Day task に recommended_lines を持たせる。

これにより、日中の推奨ライン回答は operations SSOT を参照するだけでよくなる。

### 3. daytime response does not recompute by default

ユーザーが日中に「今日の推奨ラインは？」と聞いた場合、DELTA はその場で新規見積もりをしない。

正しい応答:

- active_operations に保存済みの recommended_lines を読む
- それをそのまま提示する
- 必要に応じて現在の進捗との差分だけ補足する

### 4. recomputation is allowed only by explicit trigger

推奨ラインを日中に再計算してよいのは、以下の場合に限る。

- ユーザーが「今日のラインを組み直して」と明示した
- 急な仕事や体調不良など、前提条件が変わった
- 実績が標準ラインを大きく超え、次のライン設定が必要になった
- 必達ライン未達が確実になり、サバイバルラインへの切替が必要になった

---

## example recommended_lines

- fixed_at: 2026-05-01 daily review
- plan_anchor: GW L3集中期間
- current_position: 健康保険法 L3 Q3-4
- expected_position: 健康保険法 L3 Q9-1〜Q11最後
- gap_status: delayed
- operation_mode: recovery
- must_line:
  - 秒トレ40問
  - 健康保険法 L3 Q4-1〜Q4-5
- standard_line:
  - 秒トレ40問
  - 健康保険法 L3 Q4-1〜Q4-10
- stretch_line:
  - 健康保険法 L3 Q7の最後まで
- defer:
  - 国民年金法 L2
- recompute_triggers:
  - 体調不良
  - 急な仕事
  - 予定変更
  - ユーザーが再見積もりを依頼
  - 実績が推奨ラインを大きく超過
  - 実績が必達ラインに大きく届かない

---

## expected response

ユーザーが「今日の推奨ラインは？」と聞いた場合:

- DELTA は active_operations の recommended_lines を参照する
- その場で新規見積もりをしない
- 「今日の推奨ラインは、昨日のデイリーレビューで確定した以下です」と答える

例:

- 必達: 健康保険法 L3 Q4-1〜Q4-5 + 秒トレ40問
- 標準: 健康保険法 L3 Q4-1〜Q4-10 + 秒トレ40問
- 余力: 健康保険法 L3 Q7の最後まで
- 後回し: 国民年金法 L2

---

## impact if not fixed

推奨ラインを毎回再見積もりすると、以下の問題が起きる。

- 回答の一貫性が落ちる
- ユーザーが学習開始前に迷う
- operations が正本として機能しない
- 長期・中期計画から daily operations を作るという DELTA / ADAM の価値が弱まる
- その場の文脈に引っ張られて甘い判断や過剰な判断が起きる

---

## completed_condition

- recommended_lines の生成タイミングを daily review に固定する
- recommended_lines の保存先を active_operations にするか、別 artifact + active_operations summary にするか判断する
- 日中の「今日の推奨ラインは？」への応答ルールを定義する
- recompute_triggers を定義する
- recompute しない通常回答と、recompute する例外回答を分ける
- plan-gap check / progress granularity rule と統合する
- DELTA instruction / knowledge / schema / operations generation / daily review procedure / runtime confirmation のどこへ反映するかを層分離する

---

## placement judgment

これは DELTA plan-gap check と progress granularity の後続補助ではなく、recommended_lines を operations SSOT に固定するための中核ルールである。

既存 Day0 task `DELTA daily operations plan-gap check / progress granularity を instruction / knowledge / schema 反映 task に分解する` に統合して扱うべき。

単独で後回しにすると、日中の都度再見積もりが継続し、operations が正本として機能しにくくなる。
