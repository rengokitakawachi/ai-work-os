# 2026-04-29 daily review content draft

## Title idea

完了条件は「作った」ではなく「観測できた」まで見る

## Draft

今日の開発では、いくつかの小さな修正がまとまって、AI Work OS の運用ルールとしてかなり重要な線が見えた。

特に大きかったのは、repo 更新、canonical 更新、runtime 反映、実挙動確認を同一視しないこと。

たとえば bulk read の問題は、最初は「改行区切りが使えない」ように見えた。

でも実際に確認すると、newline separator 自体は動いていた。
問題は、tree が返す `docs/...`、`notes/...`、`systems/delta/...` のような resource-prefixed path を、そのまま read / bulk に渡せないことだった。

つまり、見えていた症状と本当の原因が違った。

ここで重要なのは、issue を閉じる条件を「コードを書いた」ではなく、次まで含めること。

- repo code を修正した
- runtime に反映された
- 実際に bulk が成功した
- 既存の relative path 形式も壊れていない
- DELTA GPT 側の runtime-visible behavior でも成功した

この確認を通して、docs / notes / DELTA の tree path から read / bulk へ直結できるようになった。

もう一つの学びは、docs 更新提案では全文を出すこと。

docs は仕様の正本なので、部分差分だけを出して人間に編集させると、意図しない欠落や解釈ズレが起きやすい。

今回も `docs/05_roadmap.md` の更新提案で同じ種類のミスが再発した。
そのため、ADAM の instruction に「docs 更新提案では、ユーザーが全文不要と明示しない限り、更新後全文を code block で提示する」という guard を追加した。

最終的に `docs/05_roadmap.md` には、Phase 0 が軽い準備ではなく、AI Work OS 全体に共通する operating model foundation であることを反映した。

一方で、`現在地` のような時間で変わる進捗情報は docs から外した。
これは notes / operations / review 側に置くべきだから。

今日の結論はシンプル。

完了とは、ファイルが存在することではない。
コードが入ったことでもない。

正しい層に反映され、runtime で観測でき、次の運用で使える状態になって初めて完了とみなす。

この線引きが、AI Work OS の開発品質をかなり支えている。

## Source refs

- `docs/05_roadmap.md`
- `notes/04_operations/active_operations.md`
- `notes/04_operations/archive_operations_2026-04-29_daily_review_append.md`
- `notes/01_issues/idea_log.md#20260425-030`
- `config/ai/adam_instruction.md`
- `src/services/repo-resource/common.js`
- `src/services/delta-resource.js`
