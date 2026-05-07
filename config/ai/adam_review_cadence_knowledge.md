# ADAM Review Cadence Knowledge

## purpose

This file supplements `config/ai/adam_instruction.md` with detailed review cadence procedures.

The GPT instruction body must stay under 8,000 characters. Keep detailed procedures here, not in the GPT instruction field.

---

## Daily Issue Touch During Rolling Procedure

Daily issue touch is a lightweight status update during daily review. It is not full issue routing.

### Trigger

During daily review, when ADAM reads issues as operations rolling candidate sources, ADAM should touch only the issues that are directly relevant to that daily review.

### Scope

Do not inspect every issue from zero every day.

Touch only:

- issues linked from today's active tasks
- issues read as rolling candidates
- issues linked to designs updated today
- new issues raised in the conversation
- issues already marked blocked / needs_routing / close_candidate

### Fields

Use these fields where useful:

- `status`: open / progressed / needs_routing / blocked / close_candidate / closed
- `last_touched_at`
- `touched_by`: daily_review
- `progress_note`
- `routing_hint`: design / operations / future / archive / keep
- `source_ref`

### Boundaries

- Daily issue touch is not issue routing.
- Daily review may mark obviously completed issues as `closed` or `close_candidate`.
- Full design / operations / future / archive disposition should normally wait for weekly review or explicit issue routing.
- The goal is to make weekly issue routing easier by keeping issue status fresh.

---

## Sunday Weekly Review Mode

Weekly review is normally triggered by the Sunday daily review request in Asia/Tokyo.

### Trigger rule

If the user requests daily review and the current date in Asia/Tokyo is Sunday, ADAM should automatically enter Sunday Weekly Review Mode.

### Order

1. Daily Close
   - confirm today's execution
   - confirm completed tasks
   - perform necessary daily issue touch
   - save daily report

2. Weekly Review
   - snapshot archive_operations
   - check issue routing need
   - check inbox / issue / design / future / operations stagnation
   - redesign active_operations and next_operations
   - decide Todoist projection need

3. Projection
   - update operations first
   - project to Todoist once after the combined review

### Double-run prevention

On Sunday, do not run operations reroll / Todoist projection once for daily review and again for weekly review.

Daily close should not finalize active / next reroll or Todoist projection. Weekly review finalizes rolling and projection once.

### Missed weekly review

If Sunday weekly review cannot be completed, the next daily review should treat overdue weekly review as an Immediate Gate.

---

## Weekly Review Issue Routing Check

Weekly review should use daily issue touch results as input.

Check:

- closed / close_candidate / needs_routing / blocked issues
- whether `idea_log.md` contains only keep issues
- whether individual issue files remain in `notes/01_issues/`
- whether design candidates are stuck in holding files
- whether operations candidates are still pending
- whether future / archive / design / operations disposition is unfinished
- whether operations source_ref points to deleted issue files
- whether operations tasks have design refs where needed
- whether design can trace archived original issue

If issue routing runs during weekly review, weekly review is not complete until issue routing closure and reference chain guards are satisfied.
