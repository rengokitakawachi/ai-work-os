# 2026-04-27 ATLAS Minimum Testing Policy

## Decision

ATLAS Testing System の初期方針は、Claude からの提案を採用し、最小構成から始める。

初期 ATLAS は次を担当する。

1. test_result
2. spec_gap
3. PR review

優先順位は `test_result → spec_gap → PR review` とする。

---

## Source

User pasted Claude / ATLAS response on 2026-04-27.

The response was formatted as a `from-claude.md` entry, but ADAM does not write to `config/ai/from-claude.md` directly because that file is Claude → ADAM surface.

Therefore, ADAM records the accepted operating decision here instead.

Related refs:

- `config/ai/from-claude.md`
- `notes/05_decisions/2026-04-27_atlas_testing_system_name.md`
- `notes/05_decisions/2026-04-27_branch_policy_for_atlas_delta.md`
- `notes/02_design/2026-04-21_github_centered_dev_test_workflow_proposal.md`
- `package.json`
- `.github/workflows/`
- `src/services/repo-resource/`

---

## Confirmed Model

The following model is accepted as sound.

```text
main = Docs-aligned stable
branch = Notes-driven development space
merge = Docs-reconciled and version bumped integration
```

Risk noted by ATLAS:

- merge-time alignment can become subjective unless a verification gate is fixed.

Therefore, ATLAS work must define observable gates before relying on merge judgment.

---

## Minimal GitHub Actions Policy

Initial GitHub Actions workflow should run only `npm test`.

Proposed minimal workflow:

```yaml
name: test
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version-file: .nvmrc
      - run: npm test
```

Accepted additions:

- create `.nvmrc` first
- keep `npm test = node --test`
- do not add coverage / PR comments in the initial ATLAS workflow

---

## Claude / ATLAS Responsibility Order

Initial priority:

```text
1. test_result
2. spec_gap
3. PR review
```

Reasoning:

- `test_result` is mechanical and low judgment cost
- `spec_gap` can block implementation and must be surfaced early
- `PR review` is higher-cost and more subjective, so it can come later

---

## repoResource Branch Selector Test Guidance

Before branch selector implementation, stabilize current shape tests.

ATLAS suggested confirming these current behaviors:

- `readNote(path)` return shape
- `createNote(path, body, message)` return shape
- `updateNote(path, body, message, sha)` return shape
- NOT_FOUND error shape
- sha conflict error shape

ATLAS also identified a spec gap:

- branch selector must explicitly define how to handle three states:
  - `branch = main`
  - `branch = feature branch name`
  - `branch omitted / default`

This is now addressed by `notes/02_design/2026-04-27_repo_resource_branch_selector_design.md`, which defines omitted branch as `GITHUB_BRANCH || main`.

---

## Delta Entry Verification Gate

Before delta development proceeds, the following gate should be satisfied.

1. tests green
   - `npm test` passes
2. spec_gapなし
   - no open `kind: spec_gap` in Claude / ATLAS handoff surface
3. docs alignment
   - implemented behavior is reflected in `docs/` or has a docs reflection plan before merge
4. `.nvmrc` exists
   - CI uses pinned Node version
5. version consistency
   - `package.json` / `VERSION` / planned version scope are consistent before merge

This gate defines the entry condition for delta development after ATLAS / branch / bulk foundation work.

---

## from-claude.md Format Extension

Current `from-claude.md` format is extended for ATLAS responses as follows.

```markdown
### [YYYY-MM-DD] Claude → ADAM
kind: proposal | test_plan | spec_gap | test_result
status: open | resolved | acknowledged
ref: related files / commit

## summary

## recommendations

## risks

## next_test_plan
```

For `kind: test_result`, use:

```markdown
## result
pass: N / fail: N / total: N

## fail_detail

## self_assessment
```

---

## Initial ATLAS Non-goals

Do not implement these in the first ATLAS slice:

- coverage threshold
- PR comments automation
- full PR review automation
- branch protection
- semantic release
- GitHub Release automation

---

## Immediate Follow-up Tasks

1. Create `.nvmrc` before GitHub Actions workflow.
2. Add minimal GitHub Actions workflow running `npm test`.
3. Add current repo-resource shape tests before branch selector behavior tests where practical.
4. Keep branch selector design as implementation prerequisite for bulk code change.
5. Treat delta entry as gated by ATLAS verification gate.

---

## Status

accepted
