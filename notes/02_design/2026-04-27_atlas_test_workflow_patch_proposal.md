# 2026-04-27 ATLAS Test Workflow Patch Proposal

## Purpose

ATLAS Testing System の最小実体として、GitHub Actions で `npm test` を実行する workflow の差分案を固定する。

本 note は patch proposal であり、`.nvmrc` / `.github/workflows/test.yml` 本体はまだ作成しない。

---

## Source References

- `notes/05_decisions/2026-04-27_atlas_testing_system_name.md`
- `notes/05_decisions/2026-04-27_atlas_minimum_testing_policy.md`
- `notes/05_decisions/2026-04-27_branch_policy_for_atlas_delta.md`
- `notes/02_design/2026-04-21_github_centered_dev_test_workflow_proposal.md`
- `package.json`
- `api/repo-resource.test.js`

---

## Current State

`package.json` currently defines:

```json
{
  "engines": {
    "node": "20.x"
  },
  "scripts": {
    "test": "node --test"
  }
}
```

There is no confirmed `.nvmrc` in the current source references.

There is no confirmed `.github/workflows/test.yml` in the current source references.

ATLAS minimum policy says:

- create `.nvmrc` first
- keep `npm test = node --test`
- initial GitHub Actions should run only `npm test`
- do not add coverage / lint / PR comments yet

---

## Recommended Branch

```text
feature/atlas-test-workflow
```

or, if bundling with the pre-delta foundation work:

```text
feature/atlas-pre-delta-foundation
```

Do not create workflow files directly on `main` until branch target is confirmed.

---

## Patch 1: `.nvmrc`

Create `.nvmrc` at repo root.

```text
20
```

Reason:

- `package.json` already declares `node: 20.x`
- `actions/setup-node@v4` can read `node-version-file: .nvmrc`
- keeps local / CI Node version aligned

Alternative:

```text
20.x
```

Recommendation: use `20` for broad Node 20 LTS compatibility.

---

## Patch 2: `.github/workflows/test.yml`

Create `.github/workflows/test.yml`.

```yaml
name: test

on:
  push:
  pull_request:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version-file: .nvmrc
          cache: npm

      - name: Install dependencies
        run: npm install

      - name: Run tests
        run: npm test
```

---

## Notes on `npm install` vs `npm ci`

Use `npm install` in the first patch if no `package-lock.json` exists.

Use `npm ci` only if `package-lock.json` exists and is maintained.

Follow-up docs/code reality check should confirm whether `package-lock.json` exists.

If `package-lock.json` exists, preferred workflow step becomes:

```yaml
      - name: Install dependencies
        run: npm ci
```

---

## Non-goals for Initial ATLAS Workflow

Do not add yet:

- coverage
- lint
- PR comments
- branch protection
- matrix testing
- scheduled runs
- semantic-release
- GitHub Release automation
- Claude automated PR comments

---

## Verification

After applying this patch on a feature branch:

1. Run local tests:

```bash
npm test
```

2. Push branch and confirm GitHub Actions run:

```text
workflow: test
trigger: push / pull_request
test command: npm test
expected: green
```

3. ATLAS records result as `kind: test_result` in Claude → ADAM handoff surface.

Suggested ATLAS result format:

```markdown
### [YYYY-MM-DD] Claude → ADAM
kind: test_result
status: open
ref: .github/workflows/test.yml, .nvmrc, package.json

## result
pass: N / fail: N / total: N

## fail_detail

## self_assessment
```

---

## Interaction with Branch Policy

This patch is a workflow change, so it should be applied on feature branch.

Main remains Docs-aligned stable version.

Merge to main should occur only after:

- tests are green
- workflow behavior is observed
- docs reflection plan exists or docs are updated
- user approves merge

---

## Interaction with Versioning

Adding ATLAS CI workflow is a new development capability.

Recommended version bump at merge:

```text
minor
```

Rationale:

- Adds CI/testing capability
- Does not break existing API behavior
- Does not change runtime app behavior directly

`VERSION` / `CHANGELOG.md` should be updated only as part of merge-ready branch work, not by this proposal note.

---

## Completed Condition for This Proposal Task

This proposal task is complete when:

- `.nvmrc` content is specified
- `.github/workflows/test.yml` content is specified
- install command rule is stated
- non-goals are stated
- verification steps are stated
- branch / version implications are stated

---

## Status

proposed
