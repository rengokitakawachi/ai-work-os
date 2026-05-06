# 2026-05-02 DELTA history daily files design

## purpose

DELTA history の一次記録を月次単一ファイルから日次ファイルへ移行し、L3 問題単位記録・daily review・plan-gap check を軽量かつ安全にするための設計。

---

## source_ref

- notes/01_issues/2026-05-02_delta_history_daily_files_issue.md
- notes/02_design/2026-05-02_delta_v0_6_integrated_operations_upgrade.md
- notes/02_design/2026-05-01_delta_daily_operations_plan_gap_check_design.md
- notes/02_design/2026-05-02_delta_progress_granularity_rule_design.md
- notes/02_design/2026-05-02_delta_recommended_line_generation_design.md
- systems/delta/history/2026-05.md
- systems/delta/operations/active_operations.md

---

## design conclusion

DELTA history の primary source of truth は daily history file とする。

Monthly history は primary record ではなく、daily history から生成・更新される monthly summary view とする。

Review は判断の正本として、history とは別レイヤーに置く。

---

## recommended structure

- systems/delta/history/daily/2026-05-02.md
- systems/delta/history/monthly/2026-05.md
- systems/delta/review/weekly/2026-W18.md
- systems/delta/review/monthly/2026-05.md

---

## responsibility split

### daily history

Primary record of daily actuals.

Records:

- L1 actuals
- L2 actuals
- L3 per-question actuals
- 秒トレ actuals
- study time
- daily observations
- daily decisions
- next action derived from the day
- DELTA_META

Daily history is the source for:

- current_position
- actual_position
- progress granularity normalization
- plan-gap check input
- recommended_lines generation during daily review
- weekly / monthly aggregation

### monthly history

Monthly summary view.

Records:

- daily summaries
- subject progress summary
- L3 progress list
- weak point aggregation
- links to weekly / monthly reviews

Monthly history is rebuildable from daily history.

It is not the source of truth for one-question L3 records.

### review

Judgment record.

Records:

- weekly review
- monthly review
- delay judgment
- plan revision judgment
- operations change reasons

Review is not raw performance history.

---

## write behavior

### one-question L3 record

User input:

- 4-2 不正解 × 2:15

Write target:

- systems/delta/history/daily/2026-05-02.md

Do not write:

- systems/delta/history/monthly/2026-05.md
- systems/delta/history/2026-05.md
- systems/delta/operations/active_operations.md

### daily review

May write:

- systems/delta/history/daily/YYYY-MM-DD.md
- systems/delta/review/weekly/YYYY-Www.md when applicable
- systems/delta/review/monthly/YYYY-MM.md when applicable
- systems/delta/history/monthly/YYYY-MM.md if rebuilding or updating summary
- systems/delta/operations/active_operations.md for next actions / recommended_lines

### operations

Operations is next-action source of truth.

Actual performance records must not be written to operations.

Operations may reference daily history as evidence.

---

## migration policy

1. Keep existing systems/delta/history/2026-05.md
2. Treat existing monthly file as legacy monthly summary during migration
3. From 2026-05-02 onward, use daily files as primary actual record
4. Create systems/delta/history/daily/ as the primary history directory
5. Create systems/delta/history/monthly/ as summary directory
6. Update DELTA instructions and knowledge to treat daily history as primary
7. Monthly summary must be rebuildable from daily history
8. Legacy monthly file may be archived or migrated after daily structure stabilizes

---

## file shape candidate

Daily history file should support append-like small updates.

Candidate sections:

- date
- day_context
- L1_actuals
- L2_actuals
- L3_actuals
- sokutore_actuals
- study_time
- decisions
- next_actions
- DELTA_META

L3 actual item fields:

- subject
- material
- question_id
- result
- mark
- elapsed_time
- understanding
- weak_point
- review_target
- recorded_at

L1 / L2 actual item fields:

- subject
- material
- chapter
- topic
- page_range
- next_start_page
- result
- recorded_at

---

## API / action strategy

Potential dedicated actions:

- read_daily_history
- update_daily_history
- append_daily_event
- read_monthly_summary
- rebuild_monthly_summary
- replace_date_section

Initial judgment:

- Prefer path conventions over new API surface if existing repoResource delta supports safe read / write to systems/delta paths.
- If append is not runtime-confirmed, use read -> full content synthesis -> update for daily file.
- For one-question updates, daily file size is small enough for full replacement.
- Dedicated append_daily_event can be future improvement, not required for first migration.

---

## write scope

Allowed write paths:

- systems/delta/history/daily/*.md
- systems/delta/history/monthly/*.md
- systems/delta/review/weekly/*.md
- systems/delta/review/monthly/*.md
- systems/delta/operations/active_operations.md

Guard:

- Do not write actual performance to operations.
- Do not update monthly summary on every one-question record.
- Do not treat monthly summary as source of truth for plan-gap check if daily history exists.

---

## integration with v0.6

This design belongs in DELTA v0.6 Integrated Operations Upgrade.

Reason:

- plan-gap check needs a lightweight current_position source
- progress granularity needs exact L1/L2 page_range and L3 question_id records
- recommended_lines daily review needs daily actuals
- Todoist projection should project next actions, not history records

Add to v0.6 scope:

- daily history primary source of truth
- monthly history summary view
- review as judgment source
- operations as next-action source

---

## runtime confirmation fixtures

Fixture 1: L3 one-question write

- Input: 4-2 不正解 × 2:15
- Expected write: systems/delta/history/daily/YYYY-MM-DD.md
- Expected no write: monthly summary, operations

Fixture 2: daily review summary

- Input: daily history files exist for multiple days
- Expected: monthly summary can be rebuilt or updated from daily files

Fixture 3: plan-gap check

- Input: daily history has actual_position
- Expected: plan-gap check reads daily history first, not legacy monthly file

---

## completed_condition

This design is complete enough when:

- daily history / monthly summary / review responsibility split is defined
- migration policy is defined
- daily file shape candidate is defined
- write behavior is defined
- API/action strategy is evaluated
- v0.6 integration is decided
- runtime confirmation fixtures are listed

Further work:

- update DELTA v0.6 integrated design
- update active_operations v0.6 task source_ref and completed_condition
- update DELTA instruction / knowledge / schema
- create first daily history file under systems/delta/history/daily/
- create or migrate monthly summary path
