# ADAM bug fix log operating method

status: active_operating_rule
created_at: 2026-05-11
source_ref:
  - notes/10_logs/README.md
  - notes/10_logs/adam_bug_fix_log.md
  - notes/01_issues/2026-05-03_review_report_template_gate_issue.md
  - notes/01_issues/2026-05-03_routing_maturity_gap_intake_design_issue.md
  - docs/15_notes_system.md

---

## Purpose

`adam_bug_fix_log.md` is a consolidation ledger for ADAM's own bugs, regressions, fixes, and recurrence-prevention notes.

It is not a source of truth for execution order, specification, or runtime behavior.

Its purpose is to make repeated failures visible and to connect each failure to the correct next disposition.

---

## Layer responsibility

```yaml
layer: notes/10_logs
role: auxiliary log / bug-regression ledger
ssot: false
execution_ssot: notes/04_operations/active_operations.md
spec_ssot: docs
runtime_truth: observed runtime behavior / fixture result
```

The bug fix log can collect evidence, but it does not replace:

- `active_operations.md` for execution order
- `01_issues` for unresolved issue routing
- `02_design` for structure / spec design
- `docs` for stable specification
- runtime fixture result for behavior confirmation

---

## What must be recorded

Record an entry when ADAM itself caused, missed, or corrected any of the following:

- controller judgment regression
- Immediate Gate miss
- review / routing / rolling / handover / report procedure miss
- report path / report format regression
- source-of-truth confusion
- branch / canonical / runtime / configured GPT confusion
- tool result misread
- delete / write / read-back claim not supported by tool result
- runtime fixture result misclassified as repo/config reflection
- recurring review / daily-weekly mode mistake
- instruction compression or knowledge placement regression
- issue routing completed-condition miss

---

## What should not stop at the bug fix log

The log is not the final destination when action is still required.

```yaml
needs_execution:
  route_to: operations_candidate
needs_spec_or_rule:
  route_to: issue_or_design_or_docs_update_candidate
needs_runtime_confirmation:
  route_to: runtime_fixture_or_immediate_gate
needs_long_term_tracking:
  route_to: future_or_issue
already_fixed_but_watch_needed:
  keep_status: fixed_with_monitoring
```

If a bug entry points to required work, that work must appear in operations, issue, design, docs update candidate, or future. A log-only note is not completion evidence.

---

## Entry status taxonomy

Use one of these statuses unless a more precise status is justified.

```yaml
open:
  meaning: issue observed, no fix or disposition completed
triaged:
  meaning: root cause or next route identified, not fixed
fix_in_progress:
  meaning: fix started, not confirmed
fixed_repo_only:
  meaning: repo/config/docs changed, runtime or behavior not confirmed
fixed_runtime_pending:
  meaning: runtime reflection or behavior fixture still required
actual_behavior_confirmed:
  meaning: behavior confirmed by runtime fixture or direct observation
fixed_with_followup_issue:
  meaning: immediate symptom fixed, follow-up issue remains
fixed_with_monitoring:
  meaning: fixed but review should watch for recurrence
absorbed_into_operations:
  meaning: actionable part is in active/next operations
superseded:
  meaning: replaced by another log/issue/design entry
wont_fix:
  meaning: explicitly decided not to fix, with reason
```

---

## Required fields per entry

```md
### YYYY-MM-DD-NNN title

status:
severity:
category:
observed_at:
reported_by:

symptom:

impact:

root_cause:

fix_applied:

remaining_risk:

recurrence_prevention:

linked_refs:

next_disposition:
```

Minimum acceptable entry for fast logging:

```md
### YYYY-MM-DD-NNN title

status:
severity:
category:
observed_at:
reported_by:

symptom:
impact:
next_disposition:
linked_refs:
```

Fast entries must be expanded during daily / weekly review if they remain relevant.

---

## Individual logs vs consolidated ledger

Individual log files under `notes/10_logs/YYYY-MM-DD_*.md` may hold detailed incident evidence.

`adam_bug_fix_log.md` should not duplicate every detail. It should summarize:

- what happened
- why it matters
- status
- recurrence-prevention lesson
- linked individual logs
- where the actionable follow-up lives

Use individual logs for detailed validator / runtime / repo evidence.

Use `adam_bug_fix_log.md` as the index of ADAM-owned regressions and recurrence-prevention themes.

---

## Review rules

### Daily review

During daily review, check the bug fix log if any of the following occurred that day:

- ADAM made or corrected an operational mistake
- ADAM changed active / archive / Todoist because of a mistake
- user challenged ADAM's procedure, source, date, or gate judgment
- runtime fixture / validator work exposed a guardrail or regression
- a report / routing / rolling / handover issue was touched

Daily review must decide for each relevant bug/log:

```yaml
close_now: true_or_false
needs_operations: true_or_false
needs_issue_or_design: true_or_false
needs_docs_or_instruction: true_or_false
needs_monitoring: true_or_false
```

### Weekly review

During weekly review, check:

- open / triaged entries
- fixed_with_monitoring entries
- entries linked to active issue / design / operations tasks
- instruction / docs reflection candidates
- repeated categories across the week

Weekly review should not re-route every log from scratch. It should identify recurring patterns and route only those needing action.

---

## Rule placement judgment

When a bug reveals recurrence risk, decide where the prevention belongs:

```yaml
one_time_correction:
  place: log_only_or_archive
procedure_miss:
  place: knowledge_or_report_readme_or_operations_completed_condition
always_on_behavior:
  place: instruction_candidate
stable_system_rule:
  place: docs_or_design_then_docs
runtime_behavior:
  place: service_validator_and_runtime_fixture
execution_order:
  place: active_operations_or_next_operations
```

Do not put stable execution-critical rules only in logs.

---

## Current consolidation decisions as of 2026-05-11

### 2026-05-04 ADAM Immediate Gate judgment miss

Decision:

- keep individual log file
- summarize in `adam_bug_fix_log.md`
- already reflected into ADAM instruction
- no new active task required unless recurrence occurs

Linked ref:

- `notes/10_logs/2026-05-04_adam_immediate_gate_judgment_miss.md`

### 2026-05-05 DELTA reverse-planning gate misjudgment

Decision:

- keep individual log file
- summarize in `adam_bug_fix_log.md`
- actionable DELTA reverse-planning gate is already completed and archived
- remaining lesson should be monitored during closure judgment

Linked ref:

- `notes/10_logs/2026-05-05_adam_delta_reverse_planning_gate_misjudgment.md`

### 2026-05-05 handover latest detection failure

Decision:

- keep as individual log and maintain as next/future operations candidate
- do not close until latest pointer / index mechanism is implemented

Linked ref:

- `notes/10_logs/2026-05-05_adam_handover_latest_detection_failure.md`

### 2026-05-06 repo history integrity incident

Decision:

- keep individual log as incident evidence
- summary can live in `adam_bug_fix_log.md` only as branch/history integrity lesson
- no new active task now; follow-up items remain in operations/future as appropriate

Linked ref:

- `notes/10_logs/2026-05-06_repo_history_integrity_incident_after_atlas_recovery.md`

### 2026-05-09 / 2026-05-11 DELTA validator logs

Decision:

- keep individual logs as validator evidence
- do not fully duplicate into `adam_bug_fix_log.md`
- summarize as recurrence-prevention themes:
  - do not encode dated fixtures as validator rules
  - distinguish layer-specific special-day capability from all-or-nothing availability
  - require question index evidence for L3 operations
  - require runtime behavior confirmation before closure

Linked refs:

- `notes/10_logs/2026-05-09_delta_next_operations_dynamic_d7_validator_fix.md`
- `notes/10_logs/2026-05-09_delta_special_day_l3_unavailable_guard.md`
- `notes/10_logs/2026-05-11_delta_l3_question_index_runtime_fixture.md`

---

## Completion condition for the active task

The active task `ADAM bug fix log の運用方法を notes に固定する` is complete when:

- `notes/10_logs/README.md` points to this operating method
- this operating method defines log role, status taxonomy, review triggers, and disposition rules
- current relevant individual logs are classified
- `adam_bug_fix_log.md` is not treated as execution SSOT
- active_operations records closure evidence
- Todoist projection is updated or the task is closed manually if appropriate
