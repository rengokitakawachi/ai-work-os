# operations candidate disposition after issue routing

## date

2026-05-03

## source

- `notes/01_issues/idea_log.md`
- `notes/08_analysis/2026-05-03_issue_routing_result.md`
- `notes/04_operations/active_operations.md`
- `notes/04_operations/next_operations.md`

## purpose

Issue routing 後に `pending_operations_candidate` として残った12件を、active / next / future / absorbed のどこへ送るか確定する。

This is a closure action for issue routing. It is not a new independent execution task.

## disposition summary

| disposition | count |
|---|---:|
| absorbed_by_active | 4 |
| absorbed_by_existing_next | 3 |
| add_to_next | 4 |
| absorbed_by_existing_system | 1 |
| future | 0 |
| keep_in_issue | 0 |
| total | 12 |

## absorbed_by_active

### 20260414-019

- title: repo の履歴確認 API を issue として検討する必要がある
- disposition: absorbed_by_active
- absorbed_by: `repo history / show / grep の docs・schema・runtime reflection 残範囲を再確認する`
- reason: active Day5 に repo history / show / grep の reflection 残範囲確認 task が存在するため、別 issue として残さず active source context として扱う。

### 20260418-020

- title: operations task の粒度と day 容量モデルを明文化する必要がある
- disposition: absorbed_by_active
- absorbed_by: active_operations rules and Day capacity notes
- reason: active_operations の rules に task 0.5〜1.5h / 1 day おおむね2h / Day capacity check が反映済み。docs 本体反映は Day4 の docs/15 / docs/17 判断 task に接続する。

### 20260419-023

- title: operations 提案時に 1日タスク容量ルールを外して Day が軽すぎる構成を出さないようにする必要がある
- disposition: absorbed_by_active
- absorbed_by: active_operations rules and operations rolling capacity guard
- reason: active_operations rules に Day capacity check が明記されており、実運用 guard として反映済み。別 issue として残すより、daily/rolling 時の checklist で監視する。

### 20260430-031

- title: DELTA v0.6 で operations を Todoist execution view へ投影する
- disposition: absorbed_by_active
- absorbed_by: `DELTA Todoist projection profile を設計・実装する` and `DELTA Todoist dry_run / apply / write-back fixture を実行する`
- reason: active Day2/Day3 に DELTA Todoist projection profile / fixture task が存在するため、別 issue として残さない。

## absorbed_by_existing_next

### 20260418-022

- title: legacy な Todoist service wrapper を deprecated 化して段階的に廃止する必要がある
- disposition: absorbed_by_existing_next
- absorbed_by: next_operations task 3
- reason: next_operations に同一論点が既に存在する。

### 20260430-033

- title: DELTA foundation を main に統合する準備をする
- disposition: absorbed_by_existing_next
- absorbed_by: next_operations task 4
- reason: next_operations に同一論点が既に存在する。

### 20260430-034

- title: ATLAS 関係ファイルを systems/atlas に集約する設計を整理する
- disposition: absorbed_by_existing_next
- absorbed_by: next_operations task 5
- reason: next_operations に同一論点が既に存在する。

## add_to_next

### 20260409-015

- title: tasks API 全体を execution projection 前提で再設計する必要がある
- disposition: add_to_next
- reason: Phase 1 / projection foundation に接続するが、現在の active には独立 task として存在しない。DELTA projection profile / Todoist fixture 後に再評価する next task とする。

### 20260418-021

- title: code resource から repo ルート allowlist を読めるようにする必要がある
- disposition: add_to_next
- reason: runtime/tool capability hardening として実行候補。current active には直接入れず、repo resource hardening の next task とする。

### 20260423-028

- title: Todoist projection で due_date が create payload へ伝播せず新規 task が日付なしで作られる
- disposition: add_to_next
- reason: due_date / due_type は現在 tool schema に見えているが、実運用で create payload へ確実に伝播するかの regression verification が必要。Todoist projection profile / fixture 後に確認する next task とする。

### 20260425-029

- title: ADAM instruction を GPT-5.5 向けに core / procedure / schema へ再層化する必要がある
- disposition: add_to_next
- reason: current active の Action schema naming rule 固定後に接続する instruction refactor 候補。active へ即投入はしないが near-term candidate とする。

## absorbed_by_existing_system

### 20260401-001

- title: operationsからTodoistへのタスク自動作成機能が必要
- disposition: absorbed_by_existing_system
- absorbed_by: existing Todoist projection / projectTasks flow
- reason: operations → Todoist projection は既に実運用され、active task に Todoist task id が戻っている。残る論点は due_date propagation / DELTA projection / tasks API redesign に分解済みであり、元 issue としては保持しない。

## final decision

`idea_log.md` には keep issue のみを残す。

Operations candidate 12件は、active / next / existing system にすべて disposition 済み。`pending_operations_candidate` section は source cleanup 対象とする。
