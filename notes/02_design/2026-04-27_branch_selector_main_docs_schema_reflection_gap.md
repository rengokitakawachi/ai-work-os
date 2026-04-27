# 2026-04-27 Branch Selector Main 実装後の Docs / Schema 反映 Gap

## 目的

ユーザー判断により、例外的に `main` へ repoResource branch selector の code 実装を入れた後の、未反映層を明示する。

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
  - schema version を `2.1.6` から `2.2.0` に更新
  - `/api/repo-resource` GET parameter に optional `branch` を追加
  - `RepoResourceWriteRequest` に optional `branch` を追加
  - read / tree / bulk / write response schema に `branch` を追加

---

## 観測済み

`repoResourceGet` の read / bulk response に `branch: main` が返ることを確認した。

これは、少なくとも omitted branch が resolved branch として response に出る behavior が動いていることを示す。

`config/ai/adam_schema.yaml` の保存確認により、repo schema には branch field が反映済みであることを確認した。

---

## 未完了層

### configured Action / tool schema

未反映。

repo schema を更新しても、configured Action が refresh されるまでは runtime tool schema へ反映済みとはみなさない。

### runtime-visible schema

未反映。

現在の ADAM runtime tool schema では `repoResourceGet` / `repoResourceWrite` に branch field はまだ見えていない。

### actual explicit branch behavior

未確認。

runtime tool schema に branch field が見えていないため、ADAM から explicit branch read/write をまだ実行できない。

---

## docs gap

`docs/10_repo_resource_api.md` はまだ branch selector を仕様として定義していない。

main code が branch selector を実装したため、docs 反映案が必要である。

ただし docs は API 上 read-only であり、docs 本体更新は人間判断を経由する。

---

## 次の最小 action

1. `docs/10_repo_resource_api.md` の更新案を notes/02_design に作る
2. configured Action を refresh する
3. runtime-visible schema に branch field が見えることを確認する
4. explicit branch read behavior を確認する
5. explicit branch write behavior を harmless scoped file で確認する

---

## 完了判定

branch selector task は、以下を分けて判定する。

```text
code behavior: complete for main implementation
repo schema: complete
configured Action schema: not complete
runtime-visible schema: not complete
explicit branch behavior: not complete
docs reflection: not complete
```
