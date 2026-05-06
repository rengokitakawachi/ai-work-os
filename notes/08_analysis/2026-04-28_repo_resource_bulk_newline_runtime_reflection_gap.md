# 2026-04-28 repoResource bulk newline runtime reflection gap

## 結論

`repoResourceGet bulk` の `files` 改行区切り対応は、feature branch には実装 patch を保存済みだが、ADAM runtime-visible behavior にはまだ反映されていない。

したがって Day1 は「branch implementation saved」までは完了したが、actual runtime behavior は未完了である。

## 実装済み patch

branch:

```text
feature/atlas-pre-delta-foundation
```

updated:

```text
api/repo-resource.js
sha: 5791dbab8d3734130f31712e20c2b97dcf6beedc
```

変更内容:

```js
.split(/[\n,]+/)
```

により、comma と newline の両方を files separator として扱う。

updated test:

```text
api/repo-resource.test.js
sha: 14dc5d950270559780d8c9efdf2541a11655fce8
```

追加した確認:

- newline separated files を validation が受け入れる
- mixed comma and newline separated files を validation が受け入れる

## runtime 観測

ADAM runtime-visible tool で以下を実行した。

```json
{
  "action": "bulk",
  "resource": "code",
  "files": "api/repo-resource.js\napi/repo-resource.test.js",
  "branch": "feature/atlas-pre-delta-foundation"
}
```

結果:

```text
ok: true
file: "api/repo-resource.js\napi/repo-resource.test.js"
error.code: NOT_FOUND
```

## 判断

runtime tool はまだ旧実装の comma-only parser を使っている。

feature branch の実装 patch は保存済みだが、runtime-visible behavior は未反映である。

## 次の扱い

この差分を完了扱いするには、少なくとも次のいずれかが必要。

1. feature branch を main/deployed runtime に反映し、bulk newline behavior を再観測する
2. runtime reflection を別 task として分離し、この task は branch implementation saved として扱う

現時点では Day1 の完了条件を観測で閉じきれていない。
