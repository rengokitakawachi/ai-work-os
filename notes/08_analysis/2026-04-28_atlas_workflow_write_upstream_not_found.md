# 2026-04-28 ATLAS workflow write upstream not found

## 結論

ATLAS workflow 実装 blocker は、code resource allowlist から GitHub workflow file write 側へ移った。

`.nvmrc` は `feature/atlas-pre-delta-foundation` 上に作成成功した。

一方、`.github/workflows/test.yml` は code resource validation を通過したが、GitHub upstream が 404 を返した。

したがって、現時点で残る blocker は次である。

```text
GitHub token / runtime environment が .github/workflows/* の作成を許可していない可能性がある
```

## 観測

### 成功

```text
repoResourceWrite resource=code action=create file=.nvmrc branch=feature/atlas-pre-delta-foundation
status: CREATED
sha: 209e3ef4b6247ce746048d5711befda46206d235
```

### 失敗

```text
repoResourceWrite resource=code action=create file=.github/workflows/test.yml branch=feature/atlas-pre-delta-foundation
error.code: GITHUB_NOT_FOUND
error.category: upstream
error.step: githubRequest
status: 404
upstream_message: Not Found
```

## 切り分け

- allowlist が原因なら `INVALID_REQUEST: code path not allowed` になる
- 今回は `GITHUB_NOT_FOUND` なので、repo-resource の path validation は通過している
- `.nvmrc` 作成成功により、branch-scoped code create 自体は動作している
- workflow path だけで upstream 404 になるため、GitHub workflow 書き込み権限や GitHub App / token scope の制約が疑わしい

## 判断

Immediate Gate はまだ完了扱いしない。

完了条件のうち `.nvmrc create` は満たしたが、`.github/workflows/test.yml create` が未充足である。

次に必要なのは次のどちらか。

1. GitHub token / Action runtime の workflow write 権限を確認・更新する
2. workflow file 作成だけを人間または別権限経路で実施する

## operations 反映

`active_operations.md` の Immediate Gate notes に以下を反映する。

- allowlist patch は main / feature branch の両方に保存済み
- runtime behavior として `.nvmrc` create は成功
- `.github/workflows/test.yml` は upstream 404 で未作成
- 残 blocker は workflow write permission / runtime environment 側
