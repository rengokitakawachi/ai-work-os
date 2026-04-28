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

- date
- subject
- topic
- material
- minutes
- study_type
- result
- comprehension
- quiz_score
- weak_points
- next_review_date
- source_ref

## LearningReview

- date
- review_type
- progress_summary
- comprehension_findings
- weak_points
- plan_adjustments
- next_operations_candidates
- risk_to_exam_date
