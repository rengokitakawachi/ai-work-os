# 2026-05-02 DELTA v0.6 integrated operations upgrade

## purpose

DELTA v0.6 を、daily operations generation の品質改善、daily history primary source of truth 化、Todoist projection を一括で扱う integrated operations upgrade として再定義する。

---

## source_ref

- notes/02_design/2026-05-01_delta_daily_operations_plan_gap_check_design.md
- notes/02_design/2026-05-02_delta_progress_granularity_rule_design.md
- notes/02_design/2026-05-02_delta_recommended_line_generation_design.md
- notes/02_design/2026-05-02_delta_history_daily_files_design.md
- notes/02_design/2026-04-30_delta_v0_6_operations_todoist_projection.md
- notes/01_issues/2026-05-01_delta_daily_operations_plan_gap_check_issue.md
- notes/01_issues/2026-05-02_delta_progress_granularity_rule_issue.md
- notes/01_issues/2026-05-02_delta_recommended_line_generation_issue.md
- notes/01_issues/2026-05-02_delta_history_daily_files_issue.md
- systems/delta/roadmap/delta_roadmap.md
- systems/delta/plan/2026_sharoushi_exam_plan.md
- systems/delta/operations/active_operations.md
- systems/delta/history/2026-05.md

---

## conclusion

DELTA v0.6 は、次を含む一括 upgrade とする。

1. daily operations generation intelligence
2. daily history primary source of truth
3. Todoist execution view projection

分けるより、v0.6 を「正しい実績を軽量に記録し、正しい operations を生成し、それを execution view に投影する」単位として扱う方が実運用価値が高い。

---

## version name

DELTA v0.6 Integrated Operations Upgrade

---

## v0.6 scope

### 1. plan-gap check

DELTA daily operations generation は、直近反応型ではなく、roadmap / plan / operations / daily history から逆算する。

Required behavior:

- roadmap を読む
- plan を読む
- active_operations を読む
- latest daily history を読む
- plan 上の期待到達点を抽出する
- daily history 上の現在地を抽出する
- gap_status を判定する
- operation_mode を決める
- survival_line と plan_minimum_line を分ける
- 甘い必達ラインを検知し、必要なら引き上げる

### 2. progress granularity

DELTA progress SSOT は study_type ごとに固定する。

- L1 / L2: page_range / next_start_page
- L3: questions / question_id / next_question
- chapter は補助情報

Required behavior:

- chapter-only input を内部正本にしない
- page_range / question_id に変換する
- 変換不能なら未確定として記録する
- confirmation next_action を残す
- operations / daily history / review / plan-gap check で章だけの表現を使わない

### 3. recommended_lines

Recommended lines は daily review で生成し、active_operations に保存する。

Required behavior:

- fixed_at を持つ
- plan_anchor を持つ
- current_position / expected_position を持つ
- gap_status / operation_mode を持つ
- must_line / standard_line / stretch_line / defer を持つ
- recompute_triggers を持つ
- 日中の「今日の推奨ラインは？」では saved recommended_lines を提示する
- 原則として日中再計算しない
- explicit recompute trigger がある場合だけ再計算する

### 4. daily history primary source of truth

DELTA history の一次記録は daily file とする。

Required structure:

- systems/delta/history/daily/YYYY-MM-DD.md
- systems/delta/history/monthly/YYYY-MM.md
- systems/delta/review/weekly/YYYY-Www.md
- systems/delta/review/monthly/YYYY-MM.md

Required behavior:

- L3 1問記録は daily history のみを更新する
- monthly history は daily history から生成・更新される summary view とする
- review は判断の正本として history と分離する
- operations は次アクションの正本であり、実績は書かない
- plan-gap check は daily history を current_position の primary source とする
- legacy `systems/delta/history/YYYY-MM.md` は移行中の monthly summary / legacy source として扱う

### 5. Todoist projection

DELTA active_operations を Todoist execution view に投影する。

Required behavior:

- DELTA operations を正本とし、Todoist は projection とする
- due_date / due_type を Todoist due に反映する
- subject / study_type / material / topic / recommended_lines summary を description に反映する
- source_ref は systems/delta を維持する
- dry_run と apply を分ける
- apply 後の todoist_task_id を DELTA operations に戻す方法を確認する
- ADAM active projection を壊さない

---

## sequencing inside v0.6

v0.6 は一括 version だが、実行順は固定する。

1. storage / record source rules
   - daily history primary source of truth
   - monthly summary view
   - review judgment layer
2. operations generation rules
   - plan-gap check
   - progress granularity
   - recommended_lines
3. operations schema / active_operations shape
4. runtime confirmation fixtures
5. Todoist projection profile
6. dry_run
7. apply
8. write-back todoist_task_id

Reason:

- plan-gap check と recommended_lines は daily actuals を前提にするため、history source split を先に定義する
- projection は generated operations の見える化であり、operations generation rules が先に安定している必要がある
- ただし version としては同じ v0.6 に含める

---

## out of scope

- Todoist を DELTA operations の正本にする
- Todoist から DELTA history を自動生成する
- Outlook / calendar 連携
- 学習教材 mapping の完全自動化
- monthly review 全自動集計
- append 専用 action の必須実装

---

## version boundary

### v0.5まで

- DELTA read / bulk / history write / operations update の foundation
- DELTA GPT runtime behavior の基本確認

### v0.6

- Daily history primary source of truth
- Daily operations generation quality
- Progress normalization
- Recommended lines fixation
- Todoist execution projection

### v0.7以降候補

- review automation
- monthly progress analytics
- calendar integration
- adaptive replanning
- weak point recovery automation
- dedicated append_daily_event action

---

## implementation targets

1. DELTA instruction
   - v0.6 operating rules
   - daily history as primary history source
   - daily review generated recommended_lines
   - no chapter-only operations
   - no daytime recompute by default
   - Todoist is projection

2. DELTA knowledge
   - daily history procedure
   - plan-gap procedure
   - progress normalization procedure
   - recommended_lines procedure
   - projection procedure
   - runtime confirmation fixtures

3. DELTA schema
   - daily history paths
   - plan_anchor
   - actual_position
   - gap_status
   - operation_mode
   - recovery_required
   - page_range / next_start_page
   - questions / next_question
   - recommended_lines
   - external.todoist_task_id

4. code / service layer
   - repoResource delta path allowlist for daily / monthly / review paths
   - projectTasks or projection service profile for DELTA
   - description generation for DELTA
   - dry_run / apply behavior
   - write-back path

5. operations
   - update systems/delta/operations/active_operations.md shape
   - add recommended_lines
   - add precise progress units
   - retain source_ref to roadmap / plan / daily history

6. history / review
   - create daily history path
   - keep or migrate legacy monthly file
   - create monthly summary path
   - create review weekly / monthly path when needed

7. runtime confirmation
   - L3 one-question daily history write
   - monthly summary no-write on one-question record
   - 2026-05-02 delayed case
   - 7章完了 normalization
   - 3章終わり normalization
   - recommended_lines recall
   - explicit recompute
   - Todoist dry_run
   - Todoist apply
   - write-back todoist_task_id

---

## completed_condition

DELTA v0.6 is complete when:

- daily history is defined as primary source of truth
- monthly history is defined as summary view
- review is defined as judgment layer
- one-question L3 write targets daily history only
- plan-gap check is reflected in DELTA instruction / knowledge / schema or generator
- progress granularity is reflected in DELTA instruction / knowledge / schema or generator
- recommended_lines are generated in daily review and stored in active_operations
- daytime recommended line recall does not recompute by default
- DELTA operations task shape supports precise progress units and recommended_lines
- Todoist projection dry_run works for DELTA operations
- Todoist projection apply creates or updates tasks
- Todoist task ids can be written back or write-back limitation is explicitly recorded
- ADAM projection remains intact
- runtime confirmation fixtures are recorded

---

## routing decision

- type: operations candidate / active integrated scope
- version: DELTA v0.6
- active task should include daily history file split as part of integrated v0.6 scope
- previous `DELTA v0.6 operations Todoist projection` next task should be merged into the same v0.6 scope, not kept as an independent later version

---

## note

Todoist projection is not deprioritized. It remains in v0.6, but its implementation comes after daily history source split and operations generation correctness within the same version.
