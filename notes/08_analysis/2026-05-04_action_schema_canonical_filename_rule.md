# 2026-05-04 Action schema canonical filename rule

## status

completed with corrected DELTA branch observation

## purpose

ADAM / EVE / DELTA の Action schema 正規ファイル名ルールを確認し、configured GPT Actions に投入する schema と legacy / internal schema を混同しないための guard を固定する。

## correction note

Initial DELTA observation was incomplete because it checked `main` branch only.

Correct DELTA canonical file exists on `feature/atlas-pre-delta-foundation`:

- `systems/delta/config/delta_action_schema.yaml`
- sha: `1c332448ef03065150a088d9b2bcfc4bc30f4e50`

The previous statement that DELTA unversioned canonical schema was missing is wrong when considering the active DELTA feature branch.

## confirmed files

### ADAM

Configured GPT Actions 用の repo schema:

- `config/ai/adam_action_schema.yaml`
- branch: `main`
- sha: `ef97d3c2ebcc0afe18a3dbbab6e9f4a02983f0f0`

Legacy / detailed compatibility schema:

- `config/ai/adam_schema.yaml`
- branch: `main`
- sha: `cd4c5f51f95f88c20393a8bf9cc66a992c0e0ca0`

Instruction updated:

- `config/ai/adam_instruction.md`
- branch: `main`
- sha: `ccd50476b175c37adf3a71834c150fd244ca2a2b`

### EVE

Configured GPT Actions 用の repo schema:

- `config/ai/eve_action_schema.yaml`
- branch: `main`
- sha: `8bbead866bd682f8a996a93e7d4a5dc7d0053de2`

Legacy / duplicate compatibility schema:

- `config/ai/eve_schema.yaml`
- branch: `main`
- sha: `8bbead866bd682f8a996a93e7d4a5dc7d0053de2`

Observation:

- `eve_action_schema.yaml` and `eve_schema.yaml` have the same sha at this point.
- They are currently duplicate content, but `eve_action_schema.yaml` is the canonical Action schema name.

Instruction updated:

- `config/ai/eve_instruction.md`
- branch: `main`
- sha: `bb8f1e4721212dd6f46e432acb37c1e797f22f42`

### DELTA

Canonical configured GPT Actions schema:

- `systems/delta/config/delta_action_schema.yaml`
- branch: `feature/atlas-pre-delta-foundation`
- sha: `1c332448ef03065150a088d9b2bcfc4bc30f4e50`

Duplicate versioned schema with identical sha:

- `systems/delta/config/delta_action_schema_v0.6.yaml`
- branch: `feature/atlas-pre-delta-foundation`
- sha: `1c332448ef03065150a088d9b2bcfc4bc30f4e50`

Internal DELTA schema:

- `systems/delta/config/delta_schema.yaml`
- branch: `feature/atlas-pre-delta-foundation`
- sha: `da786bae2fb04c526434fa405e96172e151d184339463783`

DELTA instruction:

- `systems/delta/config/delta_instruction.md`
- branch: `feature/atlas-pre-delta-foundation`
- sha: `89993692fb03220a64d54c145e30eb6880f0c668`

Main branch observation:

- `main` currently exposes only older DELTA action schema files up to `delta_action_schema_v0.5.yaml` via `delta` resource tree.
- Therefore branch must be stated whenever judging DELTA schema state.

## rule fixed

GPT Actions に投入する正規 schema は `*_action_schema.yaml` とする。

`*_schema.yaml` は内部 schema または legacy互換として扱い、configured Action の正本と混同しない。

Schema-related tasks must distinguish:

- repo schema
- configured Action / tool schema
- runtime-visible schema
- actual behavior
- branch / canonical repo state

## updates applied

### ADAM instruction

Added the canonical filename guard to `Todoist / Schema / Runtime Guards`.

### EVE instruction

Added the canonical filename guard to `Schema Reflection Guard`.

### DELTA repo state

No DELTA file content update was required to identify the canonical file.

Attempted cleanup:

- target: `systems/delta/config/delta_action_schema_v0.6.yaml`
- branch: `feature/atlas-pre-delta-foundation`
- reason: duplicate of canonical `delta_action_schema.yaml`
- result: not deleted
- error: `ACTION_NOT_SUPPORTED` from repoResourceWrite delete for `resource=code`

## remaining risks

- `systems/delta/config/delta_action_schema_v0.6.yaml` remains present as a duplicate of canonical `delta_action_schema.yaml` because delete was not supported by the current tool route.
- Main branch is behind DELTA feature branch. Do not infer DELTA current configured schema from main-only observation.
- Configured GPT reflection / runtime-visible schema / actual behavior still require runtime observation and must not be inferred from repo file state alone.

## completed condition check

- ADAM / EVE / DELTA canonical Action schema files were checked.
- ADAM canonical: `config/ai/adam_action_schema.yaml` on main.
- EVE canonical: `config/ai/eve_action_schema.yaml` on main.
- DELTA canonical: `systems/delta/config/delta_action_schema.yaml` on `feature/atlas-pre-delta-foundation`.
- `*_action_schema.yaml` vs `*_schema.yaml` rule was added to ADAM / EVE instructions.
- read-back sha was recorded.
- repo config state, branch state, configured GPT / runtime-visible schema / actual behavior were not conflated after correction.

## next disposition

- Keep the current ADAM/EVE/DELTA action schema naming rule task closed at repo-instruction guard level.
- Track duplicate DELTA versioned schema deletion as a cleanup item if delete support becomes available or manual repo cleanup is performed.
- DELTA runtime reflection remains under DELTA schema reflection task.
