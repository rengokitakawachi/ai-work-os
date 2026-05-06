# Handover: Main Alignment / Branch Foundation / ATLAS / Delta Precondition

## 概要

この handover は、重くなったスレッドから新スレッドへ移行するための restart entry point である。

今回のセッションでは、delta 開発へ進む前に、以下の前提整備が必要であると判断した。

- 現 main の docs/code 整合回復
- branch 開発運用の固定
- ATLAS Testing System の命名と最小方針固定
- repoResource branch selector の設計 / patch proposal
- ATLAS GitHub Actions workflow の patch proposal
- docs / code / operations 実態差分の棚卸し

最終的な次アクションは、`active_operations` の先頭 task である。

```text
現 main の docs/code 不一致を分類し、整合修正対象を確定する
```

handover は restart entry point であり、execution source of truth ではない。
再開時は、この handover 単独ではなく、必ず `notes/04_operations/active_operations.md` を読むこと。

---

## 成功（Success）

- `ATLAS Testing System` の名称を決定し、decision に保存した。
- ATLAS 最小方針を Claude / ATLAS 応答に基づいて decision 化した。
- branch 運用を `Docs-aligned main / Notes-driven branch / Versioned merge` model として decision 化した。
- repoResource branch selector の設計 note を作成した。
- repoResource branch selector の実装 patch proposal を作成した。
- ATLAS test workflow の patch proposal を作成した。
- delta 前の docs / code / operations 差分棚卸し analysis を作成した。
- active_operations を複数回 reroll し、最終的に「現 main 整合回復を新規 branch 開発より先に置く」順序へ修正した。
- Todoist projection も最新 active に同期済み。

保存済みの主要成果物:

```text
notes/05_decisions/2026-04-27_atlas_testing_system_name.md
notes/05_decisions/2026-04-27_atlas_minimum_testing_policy.md
notes/05_decisions/2026-04-27_branch_policy_for_atlas_delta.md
notes/02_design/2026-04-27_repo_resource_branch_selector_design.md
notes/02_design/2026-04-27_repo_resource_branch_selector_patch_proposal.md
notes/02_design/2026-04-27_atlas_test_workflow_patch_proposal.md
notes/08_analysis/2026-04-27_pre_delta_docs_code_operations_gap_inventory.md
notes/04_operations/active_operations.md
```

---

## 判明事項（Findings）

### 1. main / branch / merge の運用モデル

採用済みモデル:

```text
main = Docs-aligned stable version
branch = Notes-driven development space
merge = Docs-reconciled and version bumped integration
```

意味:

- main は docs と一致している安定版である。
- 新規開発は feature branch で行う。
- branch では notes/design/analysis が先行してよい。
- main へ統合するときに docs / code / config / operations / version を一致させる。
- ただし、現 main に既に docs/code 不一致がある場合は、新規 branch 開発より先に main 整合回復を優先する。

### 2. ATLAS の位置づけ

ATLAS は Claude による test / verification / CI review system。

初期責務の優先順:

```text
1. test_result
2. spec_gap
3. PR review
```

初期 ATLAS workflow 方針:

- `.nvmrc` を作る
- GitHub Actions は `npm test` のみ
- `npm test = node --test` を維持
- coverage / lint / PR comments / branch protection は後段

### 3. repoResource branch selector

現 runtime では `repoResourceGet` / `repoResourceWrite` に branch field がなく、ADAM は会話中に branch を指定して read/write できない。

実装基盤には `GITHUB_BRANCH || main` があるが、runtime-visible schema では branch selector が未反映。

branch selector 実装は以下の層を分ける必要がある。

```text
1. repo implementation
2. repo schema
3. configured Action / tool schema
4. runtime-visible tool schema
5. actual branch read/write behavior
```

repo schema を更新しても runtime schema 反映済みとはみなさない。

### 4. docs/code gap の扱い

`notes/08_analysis/2026-04-27_pre_delta_docs_code_operations_gap_inventory.md` には多数の gap があるが、すべてが current-main mismatch ではない。

次スレッドでは必ず以下に分類する。

```text
current-main mismatch
  main 上で docs と code が実際にずれているもの
  → main 整合回復対象

notes-proposal-only
  notes / decision / proposal が先行しているが、code はまだ変わっていないもの
  → docs に先取り反映しない

branch-development-candidate
  新規開発として feature branch で扱うべきもの
  → branch target 確定後に実装
```

---

## 失敗 / 未解決（Issues）

- 現 main の docs/code 不一致はまだ分類されていない。
- `notes/08_analysis/2026-04-27_pre_delta_docs_code_operations_gap_inventory.md` の gap は整理済みだが、current-main mismatch / notes-proposal-only / branch-development-candidate へまだ分解されていない。
- `main 整合修正案` はまだ未作成。
- feature branch target はまだ未確定。
- ADAM runtime は branch 指定 write がまだできない。
- repoResource branch selector は design / patch proposal までで、実装は未着手。
- ATLAS workflow は patch proposal までで、`.nvmrc` / `.github/workflows/test.yml` は未作成。
- bulk separator 実装は未着手。
- delta MVP resource layout は未着手。
- docs 本体への反映はまだしていない。

---

## 次のアクション（Next Actions）

最優先は `active_operations` の先頭 task。

```text
現 main の docs/code 不一致を分類し、整合修正対象を確定する
```

実行手順:

1. `notes/04_operations/active_operations.md` を読む。
2. `notes/08_analysis/2026-04-27_pre_delta_docs_code_operations_gap_inventory.md` を読む。
3. 関連 docs / code を読む。
4. gap を以下3分類へ分ける。
   - current-main mismatch
   - notes-proposal-only
   - branch-development-candidate
5. current-main mismatch だけを main 整合修正候補にする。
6. 次 task `main 整合修正案を作る` へ進む。

注意:

- branch / ATLAS / delta の未実装 proposal を、現 main の docs/code 不一致と混同しない。
- 未実装機能を docs に先取り反映しない。
- code / workflow / schema の新規開発は feature branch target が確定するまで実行しない。

---

## 最新 active_operations

最新確認時点:

```text
notes/04_operations/active_operations.md
sha: 93b35af69c705fb682e2a16d31fbe44f482faf22
```

active 先頭:

```text
task: 現 main の docs/code 不一致を分類し、整合修正対象を確定する
todoist_task_id: 6gVGQcqVHxFCxQwH
```

active 順序:

```text
1. 現 main の docs/code 不一致を分類し、整合修正対象を確定する
2. main 整合修正案を作る
3. feature branch target を確定し、branch 開発開始手順を固定する
4. repoResource branch selector を feature branch へ実装する
5. ATLAS test workflow を feature branch へ実装する
6. repoResourceGet bulk の files 区切り仕様を branch selector 後に実装する
7. delta MVP resource layout を feature branch で作る
```

---

## 関連docs

再開時に読むべき docs:

```text
docs/10_repo_resource_api.md
docs/13_dev_workflow.md
docs/15_notes_system.md
docs/17_operations_system.md
```

判断上の注意:

- docs は仕様 SSOT。
- docs 未取得で仕様判断しない。
- docs と notes が矛盾する場合は docs を正とする。
- ただし active task は「現 main の docs/code 不一致分類」なので、docs と現 code の実差分を観測することが主目的。

---

## 関連code

再開時に読むべき code:

```text
api/repo-resource.js
api/repo-resource.test.js
src/services/repo-resource/common.js
src/services/repo-resource/docs.js
src/services/repo-resource/notes.js
src/services/repo-resource/code.js
package.json
config/ai/adam_schema.yaml
config/ai/from-claude.md
```

現時点の注意:

- `.nvmrc` は未確認 / 未作成。
- `.github/workflows/test.yml` は未確認 / 未作成。
- `package-lock.json` は未確認 / 未存在扱いで ATLAS proposal は `npm install` を選んでいる。
- branch selector は runtime-visible schema に未反映。

---

## 関連notes

最重要:

```text
notes/04_operations/active_operations.md
notes/08_analysis/2026-04-27_pre_delta_docs_code_operations_gap_inventory.md
notes/05_decisions/2026-04-27_branch_policy_for_atlas_delta.md
```

ATLAS:

```text
notes/05_decisions/2026-04-27_atlas_testing_system_name.md
notes/05_decisions/2026-04-27_atlas_minimum_testing_policy.md
notes/02_design/2026-04-27_atlas_test_workflow_patch_proposal.md
```

repoResource branch selector:

```text
notes/02_design/2026-04-27_repo_resource_branch_selector_design.md
notes/02_design/2026-04-27_repo_resource_branch_selector_patch_proposal.md
```

delta:

```text
notes/02_design/2026-04-27_delta_learning_system_fast_track_architecture.md
```

previous related handover:

```text
notes/06_handover/2026-04-27_delta_learning_system_fast_track_handover.md
```

---

## 状態サマリ

- API：repoResource branch selector は未実装。bulk 改行区切りも未実装。現在の runtime tool では branch 指定 write はできない。
- docs整合：現 main に docs/code 不一致がある可能性があり、分類が次 task。notes proposal を docs に先取り反映しないこと。
- notesフロー：ATLAS / branch / delta 関連の decision / proposal は保存済み。handover は restart entry point であり正本ではない。
- operations：最新 active は main docs/code 整合分類を先頭にしている。Todoist projection も反映済み。
- Todoist：active 先頭 `現 main の docs/code 不一致を分類し、整合修正対象を確定する` の task id は `6gVGQcqVHxFCxQwH`。

---

## 再開時の禁止事項

- handover だけを読んで実行判断しない。
- active_operations を読まずに次アクションを決めない。
- docs 未取得で仕様判断しない。
- notes proposal を current docs/code mismatch とみなさない。
- branch target 未確定のまま code / workflow / schema を main に書かない。
- `config/ai/*_schema.*` 更新だけで runtime-visible schema 反映済みとみなさない。
- `config/ai/common_*` / `config/ai/procedures/*` の削除済み構造を再作成しない。

---

## 引き継ぎプロンプト

新スレッドでは、以下を貼って開始する。

```text
ADAM restart / handover。
`notes/06_handover/2026-04-27_main_alignment_and_branch_foundation_handover.md` を読み、関連 docs / notes / code と最新 `notes/04_operations/active_operations.md` を取得して、active 先頭から続けて。

最初にやることは、現 main の docs/code 不一致を current-main mismatch / notes-proposal-only / branch-development-candidate に分類し、main 整合修正対象を確定すること。
```
