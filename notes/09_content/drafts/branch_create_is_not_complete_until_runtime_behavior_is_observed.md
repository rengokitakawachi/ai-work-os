# Branch create is not complete until runtime behavior is observed

repo schema を更新しても、実運用上の capability が増えたとは限らない。

今日の進捗で一番大きかったのは、`repoResource branch create API` を、単なる設計や schema 更新ではなく、actual behavior として確認できたことだった。

確認した層は次の通り。

- runtime-visible schema に `resource=repo` / `action=create_branch` / `from_branch` が見える
- `feature/atlas-pre-delta-foundation` を main から作成できる
- 作成後の branch から `package.json` を read-back できる

これで初めて、branch create は「実装済み」ではなく「使える」と言える。

同時に、次の blocker も見えた。

ATLAS workflow を作るには `.nvmrc` と `.github/workflows/test.yml` が必要だが、code resource write allowlist はまだその path を許可していなかった。

つまり、branch が作れるようになっただけでは、CI 実装までは進めない。

ここで重要なのは、blocker を失敗として扱うのではなく、operations の Immediate Gate として構造化すること。

後続作業を止める前提条件は、通常 Day task の中に埋めず、先頭 gate に置く。

これにより、次回再開時にやるべきことは明確になる。

```text
code resource write allowlist に ATLAS workflow 用 root / workflow path を追加する
```

実装の完成条件は、ファイルがあることではない。

観測で閉じること。

そして観測で見つかった blocker は、次の実行順へ戻すこと。
