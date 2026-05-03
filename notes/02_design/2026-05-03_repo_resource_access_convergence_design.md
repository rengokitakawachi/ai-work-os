# repo resource access convergence design

## date

2026-05-03

## purpose

repo resource access に関する複数の issue routing design candidate を、1テーマの design として整理する。

## source issues

- `20260403-001` legacy docs API と github-docs.js を repo-resource/docs.js に統一する必要がある
- `20260403-002` repo-resource に code bulk 読取が必要

## source refs

- `notes/02_design/2026-05-03_issue_routing_design_candidate_disposition.md`
- `docs/10_repo_resource_api.md`
- `api/repo-resource.js`
- `config/ai/adam_action_schema.yaml`

## problem

repo access 周辺には、legacy docs API、repo-resource docs、code resource allowlist、bulk read、history/show/grep など複数の access path が存在する。

これらを個別に扱うと、docs / notes / code / delta / repo の責務境界、runtime-visible schema、actual behavior、configured Action schema の反映状態が混線する。

特に以下が残論点である。

- legacy docs API と repo-resource docs access の責務整理
- code resource に bulk read を持たせるか
- repo root allowlist をどこまで code resource で許可するか
- docs / notes / code / repo / delta の resource path normalization の一貫性
- schema 更新と runtime-visible schema / actual behavior の区別

## design direction

repo resource access convergence は、単一 API へ無理に集約することではない。

目的は、resource ごとの責務と access path を明確にし、同じ概念を複数経路で矛盾して扱わないことである。

### 1. resource responsibility

- `docs`: 仕様 SSOT の read/write
- `notes`: 開発・運用補助情報の read/write
- `code`: 実装・設定ファイルの restricted read/write
- `repo`: history / show / compare / grep / search など repo-level read-only operation
- `delta`: `systems/delta/` scoped operation

### 2. legacy access handling

legacy docs API / service は、すぐ削除ではなく、repo-resource docs access と責務差分を確認してから deprecated / retained / bridge の判断を行う。

### 3. code bulk handling

code bulk read は有用だが、code resource の allowlist / size limit / file count limit / root file allowlist とセットで設計する。

### 4. root allowlist handling

repo root 全開放は避ける。

許可候補は、test / dependency / workspace 判定に必要な明示ファイルに限定する。

候補:

- `package.json`
- `vitest.config.js`
- `jest.config.js`
- `tsconfig.json`
- `eslint.config.js`
- `pnpm-workspace.yaml`

### 5. reflection layers

以下を必ず分ける。

- repo schema / code state
- configured Action schema
- runtime-visible tool schema
- actual behavior

## non-goals

- すべての access を1つの endpoint に統合すること
- repo root 全開放
- runtime 確認なしに schema 更新だけで完了扱いすること
- legacy API の即時削除

## next handling

この design は、以下の next_operations と接続する。

- `code resource の repo root allowlist 拡張を設計・確認する`
- `repo history / show / grep の docs・schema・runtime reflection 残範囲を再確認する`
- `notes delete API draft と current repoResourceWrite delete semantics の差分を確認する`

## completed condition for future task

- current docs / notes / code / repo / delta access paths を棚卸しする
- legacy docs API の参照箇所を確認する
- code bulk / root allowlist の必要性と安全範囲を判断する
- docs/10_repo_resource_api.md への反映要否を判断する
- runtime-visible schema / actual behavior を分けて確認する
