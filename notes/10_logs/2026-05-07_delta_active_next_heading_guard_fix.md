# 2026-05-07 DELTA active next heading guard fix

## status

implemented_needs_atlas_test

## summary

ADAM fixed the DELTA operations validator after runtime fixture found that `active_operations.md` accepted an embedded `# Next operations` table variant.

ATLAS remains responsible for testing only.

## bug

Runtime actual behavior fixture on disposable branch showed:

```yaml
active_rejects_embedded_next_operations_table: fail
isolated_retry_with_heading: "# Next operations"
actual: unexpectedly_passed
branch: feature/delta-runtime-fixture-2026-05-07
production_main_damaged: no
```

## cause

The validator used a heading detector that only matched `# Next operations:` with a colon.

```yaml
old_pattern: /#\s*Next operations:/
missed_variants:
  - "# Next operations"
  - "## Next operations"
  - "### Next operations: 2026-05-13〜2026-06-30"
```

## fix

Updated `src/services/delta-operations.js`:

```yaml
sha: cbe7a9160eb7d3f0590f8081ce2ba8e20dbd466e
validator_version: delta_operations_preflight_2026_05_07_active_next_heading_guard
changes:
  - NEXT_OPERATIONS_PATTERN now matches heading levels 1-6
  - colon after Next operations is optional
  - trailing title text after colon is allowed
  - CRLF normalization retained
  - extractDayBlock uses the same heading family for section boundary detection
```

Updated `src/services/delta/operations-split.test.js`:

```yaml
sha: 0c61625e6c7cf67abaef503207ca1d7ad5b91259
added_coverage:
  - "# Next operations"
  - "# Next operations:"
  - "# Next operations: D7 onward"
  - "## Next operations"
  - "### Next operations: 2026-05-13〜2026-06-30"
expected_error: active_operations_must_not_embed_next_operations_table
```

## not yet verified

ADAM has not run local tests in this environment.

ATLAS should test:

```bash
npm test -- src/services/delta/operations-split.test.js
npm test -- src/services/delta/reverse-planning-generator.test.js
npm test
```

After repository tests pass, runtime fixture must be rerun on a clean disposable branch.

## required runtime retest

Before runtime retest, recreate or reset the disposable branch because it was intentionally damaged by the failed guard fixture:

```yaml
branch_to_recreate: feature/delta-runtime-fixture-2026-05-07
source_branch: feature/atlas-pre-delta-foundation or updated main-compatible DELTA fixture source
reason: active_operations.md on that branch was mutated to sha 98435b176fa659039515250cfe5851ee8a1a04f6
```

## judgment

```yaml
implementation_done_by_ADAM: yes
testing_needed_by_ATLAS: yes
DELTA_reverse_planning_gate: keep_open_until_tests_and_runtime_retest_pass
```

## linked refs

- `src/services/delta-operations.js`
- `src/services/delta/operations-split.test.js`
- `notes/10_logs/2026-05-07_delta_runtime_fixture_active_next_guard_failure.md`
- `notes/04_operations/active_operations.md`
