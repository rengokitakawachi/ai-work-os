# 2026-05-04 DELTA recovery line calibration fix

## status

completed_repo_config_level

## trigger

DELTA reported a regression in operations generation after the 2026-05-04 daily review.

Generated recommended lines for 2026-05-05 initially softened the recovery target:

- must_line: Q15-1〜Q15-3
- standard_line: Q15-1〜Q15-7
- stretch_line: Q15-1〜Q15-13完了

Plan-aligned lines should be:

- must_line: Q15-1〜Q15-7
- standard_line: Q15-1〜Q15-13完了
- stretch_line: 国民年金法 L3 択一 Q1-1へ着手、可能ならQ1章を進める

## root cause

During operations generation, recovery status did not force `standard_line` to match the plan_anchor expected position.

Observed failure mode:

- must_line drifted toward survival / zero-prevention line
- standard_line became a safe intermediate line
- plan expected position escaped into stretch_line
- roadmap / plan recovery pressure weakened during delayed_but_recovering + recovery_forward

## correct target files

This is not an Action schema issue.

Do not edit `systems/delta/config/delta_action_schema.yaml` for this business rule unless API shape changes are needed.

Correct files:

- `systems/delta/config/delta_instruction.md`
- `systems/delta/config/delta_schema.yaml`
- branch: `feature/atlas-pre-delta-foundation`

## changes applied

### delta_instruction.md

Added `Recovery line calibration` under `Operation Generation Guard`.

Rules added:

- recovery gap statuses / operation modes require standard_line to represent plan_anchor expected_position
- plan expected_position must not appear only in stretch_line
- must_line must be plan_minimum_line, not merely survival_line
- survival_line must be separated when needed
- pre-write validation must reject incomplete operations

Read-back:

- file: `systems/delta/config/delta_instruction.md`
- branch: `feature/atlas-pre-delta-foundation`
- sha: `6f19c48dca47d51e70da099aa9936ee11452d273`

### delta_schema.yaml

Added structured schema support:

- `recovery_line_calibration_guard` to version scope
- `survival_line` and `plan_minimum_line` as operation fields
- recovery line calibration under `OperationGenerationGuard`
- pre-write validation rules under `DailyReviewOperationsUpdate`
- line role definitions under `PlanGapCheck`
- recommended_lines validation rules
- global rules for daily_review / plan_gap / recommended_lines

Read-back:

- file: `systems/delta/config/delta_schema.yaml`
- branch: `feature/atlas-pre-delta-foundation`
- sha: `d902f67ac188bcdba6c3a1b38a3c1dd49faac3ad`

### delta active operations

DELTA had already corrected the immediate 2026-05-05 operations lines and added Plan calibration note.

Confirmed read-back:

- file: `systems/delta/operations/active_operations.md`
- branch: `feature/atlas-pre-delta-foundation`
- sha: `635ac0b6b8b73c6a4a187a3ee60cf0114d0f5b3d`

## completed condition check

- recovery statuses covered:
  - delayed_but_recovering
  - delayed_but_managed
  - recovery_on_track
- recovery operation modes covered:
  - recovery_forward
  - recovery_required
  - compression_required
- standard_line must match plan_anchor expected_position in recovery mode
- stretch_line cannot be the only place containing the plan target
- must_line is plan_minimum_line, not survival_line
- survival_line must be separated when needed
- operations write must be blocked/regenerated when validation fails

## remaining risks

- This is repo config / instruction / schema level only.
- Configured GPT reflection and runtime behavior still need to be confirmed by DELTA runtime.
- Future daily review fixture should test the 2026-05-05-style recovery case.

## next disposition

- Treat this urgent fix as completed at repo config level.
- Runtime-visible DELTA behavior should be confirmed in the next DELTA daily review / operations generation fixture.
- ADAM operations can continue from current active after this interruption.
