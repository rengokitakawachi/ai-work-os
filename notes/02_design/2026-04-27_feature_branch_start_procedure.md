# 2026-04-27 Feature Branch 開始手順

## 目的

pre-delta foundation 作業の feature branch target と開始手順を固定する。

この note は branch 開発開始手順の固定であり、code / workflow / schema 本体はまだ変更しない。

---

## 参照元

- `notes/05_decisions/2026-04-27_branch_policy_for_atlas_delta.md`
- `notes/02_design/2026-04-27_main_alignment_repair_proposal.md`
- `notes/02_design/2026-04-27_branch_selector_main_docs_schema_reflection_gap.md`
- `notes/02_design/2026-04-27_docs_10_repo_resource_branch_selector_update_draft.md`
- `notes/02_design/2026-04-27_atlas_test_workflow_patch_proposal.md`
- `notes/04_operations/active_operations.md`

---

## 決定

feature branch target は次とする。

```text
feature/atlas-pre-delta-foundation
```

手動 patch 適用は使わない。

以後の code / workflow / schema / delta resource 作成は、原則として explicit branch selector で `feature/atlas-pre-delta-foundation` を指定して実行する。

---

## 現在の前提

repoResource branch selector は、ユーザー判断により例外的に `main` に実装済みである。

確認済み層:

```text
code behavior: complete for main implementation
repo schema: complete
runtime-visible schema: complete
explicit branch read behavior: complete
explicit branch write behavior: complete
docs reflection draft: complete
docs reflection: not complete
```

したがって、旧手順で想定していた「ADAM runtime から branch を指定できない」制約は解消済みである。

ただし、docs/10 の branch selector reflection は未完了であり、main は完全な docs-aligned stable state ではない。

---

## 理由

`feature/atlas-pre-delta-foundation` は、delta 前提整備を一貫して扱う foundation branch として適切である。

この branch には、次を含める。

1. ATLAS 最小 test workflow
2. repoResource bulk newline separator
3. delta MVP resource layout 準備
4. merge 準備時に必要なら VERSION / CHANGELOG 導入
5. docs reflection / merge reconciliation の差分整理

repoResource branch selector 自体は main に例外実装済みであるため、この branch の最初の実装対象からは外す。

---

## main branch ルール

次は `main` に直接反映しない。

- application code 変更
- API behavior 変更
- runtime schema 変更
- GitHub Actions workflow 変更
- `.nvmrc`
- `VERSION`
- `CHANGELOG.md`
- `systems/delta/` resource layout

`main` に直接反映してよいものは、原則として次に限る。

- conversation-driven operations update
- notes decision / design / report の小さな追加
- handover など再開入口の保存
- user が明示的に main 更新を許可した軽微変更

---

## branch-sensitive write rule

branch-sensitive write の前には必ず Write Gate を出す。

Write Gate では次を明示する。

- target branch
- resource
- file path
- action
- write scope
- expected impact
- rollback / revert 方針

code / workflow / schema / delta resource write では、原則として次を指定する。

```text
branch: feature/atlas-pre-delta-foundation
```

branch 指定なしで code / workflow / schema / delta resource を write しない。

main へ直接 write する例外は、user が明示した場合に限る。

---

## 開始前確認

feature branch 上で最初の destructive ではない確認を行う。

推奨確認:

1. `repoResourceGet` に `branch: feature/atlas-pre-delta-foundation` を指定して既知 file を read する
2. branch が存在しない場合は、GitHub API から NOT_FOUND / upstream error が返る可能性がある
3. branch が未作成なら、ADAM runtime だけでは branch create API を持たないため、人間が branch を作るか、別途 branch creation capability を設計する
4. branch が存在する場合のみ、feature branch への code / workflow write に進む

---

## 最初の実装 task

最初の実装 task は次とする。

```text
ATLAS test workflow を feature branch へ実装する
```

対象 branch:

```text
feature/atlas-pre-delta-foundation
```

最小変更:

```text
.nvmrc
.github/workflows/test.yml
```

理由:

- repoResource branch selector はすでに main 実装・runtime確認済みである
- ATLAS workflow は以後の branch 開発の verification gate になる
- bulk separator / delta resource layout の前に CI の最小線を置くのが安全である

---

## 完了条件

この branch start task は、次を満たしたら完了とする。

- branch target が `feature/atlas-pre-delta-foundation` に固定されている
- 手動 patch 適用を使わないことが明示されている
- main 直接 write 禁止対象が明示されている
- branch-sensitive write rule が明示されている
- branch selector が runtime 上で read / write 確認済みであることが反映されている
- 次の実装 task が ATLAS test workflow と明示されている
