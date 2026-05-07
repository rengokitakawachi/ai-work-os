# 2026-05-07 DELTA runtime fixture active/next guard failure

## status

open_runtime_guard_bug_confirmed

## severity

critical

## summary

DELTA actual behavior fixture was run on disposable branch `feature/delta-runtime-fixture-2026-05-07`.

Result: runtime write surface works, branch safety worked, `next_operations.md` period block guard works, and valid no-op update works. However, the required active split guard failed: `active_operations.md` accepted content containing a `# Next operations` table.

Therefore the DELTA reverse-planning gate remains open.

## branch safety

```yaml
target_branch: feature/delta-runtime-fixture-2026-05-07
wrote_to_main: no
branch_specified_on_every_write: yes
production_main_damaged: no
```

Disposable branch damage occurred as expected from the failed guard:

```yaml
file: systems/delta/operations/active_operations.md
branch: feature/delta-runtime-fixture-2026-05-07
original_sha: 9616669037822b3cbcca3c4dd29518b7f686e49a
resulting_sha_after_failed_guard: 98435b176fa659039515250cfe5851ee8a1a04f6
```

## read-only checks

```yaml
roadmap_read: pass
plan_read: pass
latest_daily_history_read: pass
active_operations_read: pass
next_operations_read: pass
```

## negative fixture 1: active rejects embedded Next operations table

```yaml
expected: reject
actual: fail_unexpected_pass
first_attempt:
  result: DELTA_OPERATIONS_PREFLIGHT_FAILED
  errors:
    - missing_roadmap_read_evidence_in_content
    - missing_existing_active_or_next_operations_read_evidence_in_content
    - missing_special_days_evidence_in_content
    - missing_user_capacity_evidence_in_content
    - missing_completed_scope_evidence
    - missing_Day1 through missing_Day6
    - missing_next_operations_ref
    - missing_active_day6_next_connection
isolated_retry:
  D0_to_D6_present: yes
  embedded_next_operations_table_present: yes
  expected_preflight_error: active_operations_must_not_embed_next_operations_table
  actual: unexpectedly_passed
```

Judgment:

```yaml
active_operations_embedded_next_guard: broken_in_runtime
runtime_actual_behavior_requirement: not_satisfied
```

Likely implementation cause to inspect:

```yaml
candidate_file: src/services/delta-operations.js
candidate_pattern: NEXT_OPERATIONS_PATTERN
suspected_issue: pattern may only detect '# Next operations:' with colon and miss '# Next operations' without colon
```

## negative fixture 2: next rejects period block rows

```yaml
expected: reject
actual: pass_rejected
error_code: DELTA_OPERATIONS_PREFLIGHT_FAILED
errors:
  - next_operations_period_block_rows_forbidden:1
  - missing_next_operations_start_date:2026-05-13
  - missing_next_operations_target_date:2026-06-30
  - missing_active_next_connection_first_row
file_damaged: no
next_operations_sha_after_rejection: 2f3ff6409ce033e02e7bde0771882d7b417774dd
```

## positive fixture: valid no-op update with read_evidence

```yaml
expected: pass
actual: pass
updated_file: systems/delta/operations/next_operations.md
resulting_sha: 2f3ff6409ce033e02e7bde0771882d7b417774dd
preflight_ok: yes
file_content_changed_materially: no
```

## judgment

```yaml
runtime_visible_schema: confirmed
branch_write_behavior: confirmed
next_operations_period_block_guard: confirmed
valid_noop_update_with_read_evidence: confirmed
active_operations_embedded_next_guard: failed
DELTA_reverse_planning_gate: keep_open
```

## required next action

1. Reset or recreate disposable fixture branch before retesting.
2. Fix validator so active_operations.md rejects embedded `# Next operations` table variants.
3. Add / update test coverage for at least:
   - `# Next operations`
   - `# Next operations:`
   - `## Next operations`
   - `# Next operations: D7...`
4. Re-run repository tests.
5. Re-run DELTA runtime fixture on disposable branch.

## linked refs

- `src/services/delta-operations.js`
- `systems/delta/config/delta_action_schema.yaml`
- `notes/10_logs/2026-05-07_delta_runtime_reflection_blocked_actual_behavior_unconfirmed.md`
- `notes/04_operations/active_operations.md`
