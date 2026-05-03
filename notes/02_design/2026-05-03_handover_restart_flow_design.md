# handover restart flow design

## date

2026-05-03

## purpose

handover 起点の再開フロー、latest pointer、active_operations 先頭 task の解釈を、1テーマ design として整理する。

## source issues

- `20260408-012` latest handover 起点の次作業選定と active_operations 先頭の解釈ルールを整理する必要がある
- `notes/01_issues/2026-05-03_handover_index_structure_issue.md`

## source refs

- `notes/02_design/2026-05-03_issue_routing_design_candidate_disposition.md`
- `notes/06_handover/handover_template.md`
- `notes/04_operations/active_operations.md`
- `notes/04_operations/next_operations.md`

## problem

再開時に latest handover を読むだけでは、実行対象を確定できない場合がある。

handover は restart entry point であり、execution SSOT ではない。実行対象は必ず `notes/04_operations/active_operations.md` で確認する必要がある。

一方で、handover の Next Actions は active task の未完 closure action を具体化している場合があり、active 先頭 task と粒度が一致しないことがある。

また、handover が増えると一覧取得がレスポンス過大になり、最新 handover の特定自体が不安定になる。

## design direction

### 1. handover の位置づけ

handover は restart entry point とする。

handover から直接実行しない。

再開時は必ず active_operations を読んで、current executable task / closure action を確認する。

### 2. latest pointer

`notes/06_handover/latest.md` は、最新 handover への小さい pointer として使う。

latest.md は全文コピーではない。

推奨形式:

```md
# latest handover pointer

Latest handover:

```text
notes/06_handover/YYYY/MM/<handover_file>.md
```

Execution SSOT:

```text
notes/04_operations/active_operations.md
```

This file is only an index. Do not execute from this pointer directly.
```

### 3. monthly folder

handover は履歴 layer であり増え続けるため、`YYYY/MM/` フォルダは有効である。

ただし最新特定は folder list に依存せず、`latest.md` pointer に依存する。

### 4. resume order

再開時の標準読み順:

1. `notes/06_handover/latest.md`
2. latest が指す handover
3. `notes/04_operations/active_operations.md`
4. source_ref

### 5. active task と handover next action の解釈

handover の next action が active 先頭 task と一致しない場合、以下を確認する。

- handover next action は active task の closure action か
- active task は完了済みだが active_operations が stale か
- handover が古く active_operations の方が新しいか
- blocker / Immediate Gate が残っているか

closure action が残っており、今閉じられる場合は、active の機械的な次 task より closure を優先する。

### 6. completed condition

handover procedure の完了条件には、以下を含める。

- latest pointer を更新する
- handover が execution SSOT ではないことを明記する
- expected resume task を書く
- first read list を書く
- guardrails を書く
- active_operations を必ず再読するよう明記する

## non-goals

- handover を execution SSOT にすること
- handover に active_operations 全文をコピーすること
- latest.md に handover 全文を置くこと
- monthly folder だけで latest detection を解決すること

## connected next task

- `handover latest index と月別フォルダ構成を導入する`

## completed condition for future task

- `notes/06_handover/latest.md` を作成する
- handover folder structure を決める
- existing handover migration 方針を決める
- handover procedure に latest update を組み込むか判断する
- read-back で latest pointer と actual handover path の整合を確認する
