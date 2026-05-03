# issue routing working split overview

## date

2026-05-03

## purpose

`notes/01_issues/idea_log.md` の恒久分割ではなく、全 issue routing を実行するための一時的な作業分割を作る。

## source

- source file: `notes/01_issues/idea_log.md`
- source sha at split start: `61314c1b60549ad699b3d75770315228275bf905`
- source size at split start: `56038`

## operating decision

恒久運用は `idea_log.md` 1ファイルを維持する。

issue が増えたときの本質的対策は月別分割ではなく、routing により issue から `design / future / operations / archive` へ流し、issue layer に残すべきものだけを残すことである。

## temporary split files

- `notes/08_analysis/2026-05-03_issue_routing_batch_01_foundation.md`
- `notes/08_analysis/2026-05-03_issue_routing_batch_02_operations_routing.md`
- `notes/08_analysis/2026-05-03_issue_routing_batch_03_runtime_delta_future.md`
- `notes/08_analysis/2026-05-03_issue_routing_result.md`

## guardrails

- working split は SSOT ではない
- working split から直接実行しない
- routing decision の evidence としてのみ扱う
- final source of current issues remains `notes/01_issues/idea_log.md`
- routing 後は keep issue だけを `idea_log.md` に残す

## expected next actions

1. batch ごとに provisional route を付ける
2. route_to ごとの件数を出す
3. archive / future / design / operations candidate / keep を整理する
4. Write Gate 後に destination 保存と source cleanup を行う
5. 1ファイル運用の継続可否を評価する
