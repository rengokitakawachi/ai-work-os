# Delta Data Model

## LearningRoadmap

- goal
- exam_date
- target_exam
- target_level
- subjects
- milestones
- risk_areas

## LearningPlan

- period
- focus_subjects
- target_skills
- materials
- weekly_targets
- completion_conditions
- review_cadence

## LearningOperationTask

Base fields:

- task
- source_ref
- rolling_day
- due_date
- due_type
- why_now
- notes
- status
- completed
- external

Delta fields:

- subject
- topic
- material
- study_type
- estimated_minutes
- target_score
- actual_score
- comprehension
- next_review_date
- weak_point_ref

## LearningHistory

LearningHistory is stored in monthly files.

Path:

- `systems/delta/history/YYYY-MM.md`

Format:

- Markdown body for human-readable learning history
- `DELTA_META` YAML block for machine-readable progress tracking
- one section per day in date order

Role separation:

- `operations/active_operations.md` = future execution order / planned work
- `history/YYYY-MM.md` = actual learning results
- `review/` = weekly / monthly review and weak point aggregation

Source of truth by purpose:

- Human-readable source: Markdown body
- Machine aggregation source: `DELTA_META`
- If Markdown and `DELTA_META` conflict, daily review must correct the mismatch

Markdown body fields:

- 実績
- 計画との差分
- 判断
- 弱点
- 次アクション
- メモ

DELTA_META fields:

- date
- day_type
- actual_results
- judgment
- next_action
- source_ref

`actual_results` item fields:

- study_type
- subject
- material
- planned_scope
- actual_scope
- result
- comprehension
- weak_points

Allowed values:

- day_type: `weekday | weekend | holiday | exception`
- study_type: `L1 | L2 | L3 | 秒トレ | review | other`
- result: `complete | partial | skipped`
- comprehension: `high | medium | low | unknown`
- judgment.status: `on_track | slight_delay | delay | overdone`

## LearningReview

- date
- review_type
- progress_summary
- comprehension_findings
- weak_points
- plan_adjustments
- next_operations_candidates
- risk_to_exam_date
