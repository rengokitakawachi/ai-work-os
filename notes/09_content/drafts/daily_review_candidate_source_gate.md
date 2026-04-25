# daily review must start from candidate sources

daily review is not just a report-writing step.

In AI Work OS, daily review is the point where execution state becomes canonical again.
That means it has to check more than the current active list.

The minimum candidate sources are:

- plan
- open issue
- next_operations
- current active

This prevents a common failure mode:
continuing only from the visible active tasks and missing newly discovered issues, deferred candidates, or higher-level plan requirements.

The key distinction is this:

- active_operations is the execution source of truth during the day
- daily review is the rolling point where the execution source of truth is rebuilt
- Todoist is only the projection after operations has been updated

A report alone does not complete a review.
A review is complete only after operations, projection, report, and content have all been updated.
