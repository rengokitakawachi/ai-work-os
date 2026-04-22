# route_validity_should_be_separated_from_chunk_granularity

- intake routing では、まず `issue / design / future` の route correctness が成立しているかを確認する
- `pending_tasks` のような複数論点入力は、route の妥当性が通っていても 1テーマ1メモ性が弱いことがある
- したがって、`route の妥当性確認` と `入力粒度の改善` は別論点として扱う方が安全である
- 最小 adapter は `1ファイル = 1item` でもよく、まず mechanical dry run を通して route 多様性を確認できればよい
- 粒度改善はその後段で、対象を `pending_tasks` 型に限定して split ルールを設計するのが小さく安全
