# 2026-05-04 Action schema canonical filename rule

## status

completed with follow-up risk

## purpose

ADAM / EVE / DELTA の Action schema 正規ファイル名ルールを確認し、configured GPT Actions に投入する schema と legacy / internal schema を混同しないための guard を固定する。

## confirmed files

### ADAM

Configured GPT Actions 用の repo schema:

- `config/ai/adam_action_schema.yaml`
- sha: `ef97d3c2ebcc0afe18a3dbbab6e9f4a02983f0f0`

Legacy / detailed compatibility schema:

- `config/ai/adam_schema.yaml`
- sha: `cd4c5f51f95f88c20393a8bf9cc66a992c0e0ca0`

Instruction updated:

- `config/ai/adam_instruction.md`
- sha: `ccd50476b175c37adf3a71834c150fd244ca2a2b`

### EVE

Configured GPT Actions 用の repo schema:

- `config/ai/eve_action_schema.yaml`
- sha: `8bbead866bd682f8a996a93e7d4a5dc7d0053de2`

Legacy / duplicate compatibility schema:

- `config/ai/eve_schema.yaml`
- sha: `8bbead866bd682f8a996a93e7d4a5dc7d0053de2`

Observation:

- `eve_action_schema.yaml` and `eve_schema.yaml` have the same sha at this point.
- They are currently duplicate content, but `eve_action_schema.yaml` is the canonical Action schema name.

Instruction updated:

- `config/ai/eve_instruction.md`
- sha: `bb8f1e4721212dd6f46e432acb37c1e797f22f42`

### DELTA

Observed available config files via `repoResourceGet(resource=delta, action=tree, file=config)`:

- `systems/delta/config/delta_action_schema_v0.2.yaml`
- `systems/delta/config/delta_action_schema_v0.3.yaml`
- `systems/delta/config/delta_action_schema_v0.4.yaml`
- `systems/delta/config/delta_action_schema_v0.5.yaml`

Confirmed latest readable DELTA schema:

- `systems/delta/config/delta_action_schema_v0.5.yaml`
- sha: `7395b678a270f3b37eacc2b2ff1729c9ba198d87`

Not found in current repo / delta resource observation:

- `systems/delta/config/delta_action_schema.yaml`
- `systems/delta/config/delta_schema.yaml`
- `systems/delta/config/delta_action_schema_v0.6.yaml`
- `systems/delta/config/delta_instruction.md`

## rule fixed

GPT Actions に投入する正規 schema は `*_action_schema.yaml` とする。

`*_schema.yaml` は内部 schema または legacy互換として扱い、configured Action の正本と混同しない。

Schema-related tasks must distinguish:

- repo schema
- configured Action / tool schema
- runtime-visible schema
- actual behavior

## updates applied

### ADAM instruction

Added the canonical filename guard to `Todoist / Schema / Runtime Guards`.

### EVE instruction

Added the canonical filename guard to `Schema Reflection Guard`.

## remaining risks

- DELTA current repo-visible schema naming is still versioned only, with `delta_action_schema_v0.5.yaml` as the latest confirmed readable file.
- Existing active operations had source references to `systems/delta/config/delta_action_schema.yaml`, `systems/delta/config/delta_schema.yaml`, and `systems/delta/config/delta_action_schema_v0.6.yaml`, but those were not found by current reads.
- This should be treated as a DELTA schema reflection / source_ref cleanup follow-up, not as runtime reflection completed.

## completed condition check

- ADAM / EVE / DELTA canonical Action schema files were checked.
- ADAM canonical: `config/ai/adam_action_schema.yaml`.
- EVE canonical: `config/ai/eve_action_schema.yaml`.
- DELTA confirmed latest readable: `systems/delta/config/delta_action_schema_v0.5.yaml`; unversioned canonical missing.
- `*_action_schema.yaml` vs `*_schema.yaml` rule was added to ADAM / EVE instructions.
- read-back sha was recorded.
- repo config state and configured GPT / runtime-visible schema / actual behavior were not conflated.

## next disposition

- Close the current ADAM/EVE/DELTA action schema naming rule task as repo-instruction guard fixed.
- Add or use a follow-up task for DELTA schema source_ref cleanup / v0.6 reflection if not already active.
