# 2026-04-27 Branch Selector Main 実装後の Docs / Schema 反映 Gap

## 目的

ユーザー判断により、例外的に `main` へ repoResource branch selector の code 実装を入れた後の、反映層と完了判定を明示する。

---

## 背景

当初の branch policy では、branch selector は feature branch 実装対象だった。

しかしユーザー判断により、次の方針へ変更した。

```text
Mainでbranch selectorを実装する
```

このため、branch selector は main の code behavior として先に進んだ。

---

## 実装済み層

### code behavior

以下は main に更新済み。

- `src/services/repo-resource/common.js`
  - `normalizeBranch()` を追加
  - `getConfig(options)` に request-level branch を追加
  - read / write / tree response に resolved branch を含める
- `src/services/repo-resource/docs.js`
  - list / read / bulk / tree に branch options を伝播
- `src/services/repo-resource/notes.js`
  - tree / read / bulk / create / update / delete に branch options を伝播
- `src/services/repo-resource/code.js`
  - tree / read / bulk / create / update に branch options を伝播
- `api/repo-resource.js`
  - GET query `branch` を validation / dispatch に追加
  - POST body `branch` を validation / dispatch に追加
- `api/repo-resource.test.js`
  - `normalizeBranch()` tests を追加
  - invalid GET / POST branch tests を追加

### repo schema

以下は main に更新済み。

- `config/ai/adam_schema.yaml`
  - `/api/repo-resource` GET parameter に optional `branch` を追加
  - `RepoResourceWriteRequest` に optional `branch` を追加
  - read / tree / bulk / write response schema に `branch` を追加

### runtime-visible schema

新スレッド確認により、runtime-visible tool schema に branch field が見えていることを確認済み。

確認済み項目:

- `repoResourceGet.branch`: visible
- `repoResourceWrite.branch`: visible

---

## 観測済み

`repoResourceGet` の read / bulk response に `branch: main` が返ることを確認した。

これは、少なくとも omitted branch が resolved branch として response に出る behavior が動いていることを示す。

`config/ai/adam_schema.yaml` の保存確認により、repo schema には branch field が反映済みであることを確認した。

`repoResourceGet` に `branch: main` を明示して `api/repo-resource.js` を read し、response に `branch: main` が返ることを確認した。

これにより explicit branch read behavior は確認済みとする。

`repoResourceWrite` に `branch: main` を明示して harmless scoped file を create し、response に `branch: main` が返ることを確認した。

作成後、同 file を `repoResourceGet` で `branch: main` 指定 read し、content と `branch: main` metadata が一致することを確認した。

確認 probe:

```text
file: notes/00_inbox/dev_memo/2026-04-27_branch_selector_write_probe.md
sha: a5b5ba195aaad5c7b32db009482dd8ef84da6641
write response branch: main
read response branch: main
status: CREATED / OK
```

これにより explicit branch write behavior は確認済みとする。

`docs/10_repo_resource_api.md` を read し、branch selector が現行仕様として反映されていることを確認した。

確認済み docs/10 内容:

```text
branch は GitHub branch selector を示す
branch fallback: branch -> GITHUB_BRANCH -> main
branch は repo-resource API の request-level option
branch は docs / notes / code の read 系 action と notes / code の write 系 action に適用
branch は docs の write を許可しない
repo-resource GET action は optional query parameter branch を受け取る
repo-resource POST action は request body に optional branch を受け取る
branch validation rule
resolved branch を data.branch に含める
bulk item に branch を含める
```

確認済み docs sha:

```text
docs/10_repo_resource_api.md: af34295c92210134f824e024c3bec288032bbd02
```

これにより docs reflection は確認済みとする。

---

## configured Action / tool schema

直接観測はできない。

ただし runtime-visible schema に branch field が見えており、actual read / write behavior も確認済みのため、branch selector に関しては実用上 confirmed とする。

---

## 完了判定

branch selector task は、以下の通り完了とする。

```text
code behavior: complete for main implementation
repo schema: complete
runtime-visible schema: complete
explicit branch read behavior: complete
explicit branch write behavior: complete
docs reflection draft: complete
docs reflection: complete
```

---

## 残件

branch selector 自体の残件はない。

別 capability として、repoResource branch create API は次の層が未完了である。

```text
runtime-visible schema: not confirmed
actual branch create behavior: not confirmed
docs reflection: not complete
```
