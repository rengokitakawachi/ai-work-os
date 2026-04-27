# 2026-04-27 Feature Branch 開始手順

## 目的

pre-delta foundation 作業の feature branch target と開始手順を固定する。

この note は branch 開発開始手順の固定であり、code / workflow / schema 本体はまだ変更しない。

---

## 参照元

- `notes/05_decisions/2026-04-27_branch_policy_for_atlas_delta.md`
- `notes/02_design/2026-04-27_main_alignment_repair_proposal.md`
- `notes/02_design/2026-04-27_repo_resource_branch_selector_patch_proposal.md`
- `notes/02_design/2026-04-27_atlas_test_workflow_patch_proposal.md`
- `notes/04_operations/active_operations.md`

---

## 決定

feature branch target は次とする。

```text
feature/atlas-pre-delta-foundation
```

手動 patch 適用は使わない。

許可する開始経路は次の2つに限定する。

1. 環境変数 `GITHUB_BRANCH` を feature branch に向ける
2. 手動以外の安全な repo / runtime 経路で branch selector を先に実装する

---

## 理由

`feature/atlas-pre-delta-foundation` は `feature/repo-resource-branch-selector` より広いが、現在の active operations の順序に合っている。

この branch には、delta 前提整備として次を一貫して含められる。

1. repoResource branch selector
2. ATLAS 最小 test workflow
3. repoResource bulk newline separator
4. delta MVP resource layout 準備
5. merge 準備時に必要なら VERSION / CHANGELOG 導入

密接に依存する前提整備を細かく分けすぎないため、この foundation branch を採用する。

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

`main` は Docs-aligned stable version として維持する。

小さな notes / design / decision の追加は、計画・判断記録として main に保存してよい。

---

## 現在の runtime 制約

現在の ADAM runtime では、`repoResourceGet` / `repoResourceWrite` に branch selector field が見えていない。

そのため、ADAM は現時点では runtime tool call だけで feature branch を安全に指定して code write できない。

手動 patch 適用は使わないため、以下の非手動経路のいずれかが確認されるまで、ADAM は code / workflow / schema write を進めない。

---

## 開始経路

### Path A: 手動 patch 適用

不採用。

ユーザー判断により、手動 patch 適用は使わない。

---

### Path B: 環境変数で branch target を切り替える

deployment / runtime 環境で `GITHUB_BRANCH` を次に向ける。

```text
feature/atlas-pre-delta-foundation
```

この場合、branch field が runtime schema に無くても、repoResource write は環境変数で指定された branch に向く。

ただし、code / workflow / schema write の前に、ADAM は runtime write 先が `main` ではなく feature branch であることを観測する必要がある。

最小確認:

1. 既知ファイルを read し、response metadata または挙動から想定 branch を確認する
2. response に branch metadata が出ない場合、外部確認後に harmless な branch-scoped verification write だけを行う
3. 意図だけを根拠に branch target を推定しない

---

### Path C: branch selector を先に実装する

手動ではない安全な repo / runtime 経路で repoResource branch selector を先に実装する。

実装後は次を確認する。

1. configured Action / tool schema を refresh する
2. runtime-visible schema に branch field が見えることを確認する
3. branch read behavior を確認する
4. harmless test file または明示 scoped file で branch write behavior を確認する
5. その後、ATLAS / bulk / delta 作業を ADAM runtime から進める

これは長期的には最もきれいな経路だが、最初の branch selector 実装自体を `main` に書かずに進める安全経路が必要である。

---

## 推奨経路

まず Path B を採用する。

条件:

- `GITHUB_BRANCH` を `feature/atlas-pre-delta-foundation` に向けられる
- ADAM がその事実を観測または検証できる

そのうえで、feature branch 上に repoResource branch selector を実装する。

branch selector が runtime-visible になり、read/write behavior が確認できた後、ATLAS workflow / bulk separator / delta resource layout を explicit branch targeting で進める。

---

## 最初の実装 task

最初の実装 task は次のままとする。

```text
repoResource branch selector を feature branch へ実装する
```

理由:

- feature branch への安全な repo read/write を解放する
- bulk separator 実装より前に必要である
- ATLAS / delta resource 変更前の事故リスクを下げる

---

## 完了条件

この branch start task は、次を満たしたら完了とする。

- branch target が `feature/atlas-pre-delta-foundation` に固定されている
- 手動 patch 適用を使わないことが明示されている
- main 直接 write 禁止対象が明示されている
- 非手動の開始経路が整理されている
- 次の実装 task が repoResource branch selector と明示されている
