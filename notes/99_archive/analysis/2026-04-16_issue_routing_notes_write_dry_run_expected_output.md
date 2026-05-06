# 2026-04-16 issue_routing_notes_write_dry_run_expected_output

## 目的

`applyIssueRoutingActionPlan(dry_run)` を
`notes/01_issues/idea_log.md` に対して適用したときの
想定出力を具体化する。

本メモは、
実データに対して

- どの issue がどこへ route されるか
- action plan が何件ずつ出るか
- notes write payload が何件ずつ生成されるか

を確認するための分析メモである。

---

## 入力

対象は `notes/01_issues/idea_log.md` に入っている次の 5 件。

1.
`20260409-015`
- category: architecture
- impact: high
- status: open

2.
`20260412-016`
- category: operations
- impact: high
- status: open

3.
`20260412-017`
- category: operations
- impact: high
- status: open

4.
`20260414-018`
- category: operations
- impact: high
- status: open

5.
`20260414-019`
- category: architecture
- impact: medium
- status: open

---

## route 判定

### 20260409-015

- category: architecture
- impact_now: high
- status: open

結果

- route_to: `design`
- keep_issue_open: true
- next_action: `create_or_update_design`

### 20260412-016

- category: operations
- impact_now: high
- status: open

結果

- route_to: `operations`
- keep_issue_open: true
- next_action: `generate_operations_candidate`

### 20260412-017

- category: operations
- impact_now: high
- status: open

結果

- route_to: `operations`
- keep_issue_open: true
- next_action: `generate_operations_candidate`

### 20260414-018

- category: operations
- impact_now: high
- status: open

結果

- route_to: `operations`
- keep_issue_open: true
- next_action: `generate_operations_candidate`

### 20260414-019

- category: architecture
- impact_now: medium
- status: open

結果

- route_to: `issue`
- keep_issue_open: true
- next_action: `keep_issue_open`

補足

この issue は architecture だが、
`impact_now !== high` 判定が先に効くため、
design へは送られず issue に残る。

---

## action plan 想定件数

`buildIssueRoutingActions()` の想定出力件数は次の通り。

- keep_issue: 5
- archive_issue: 0
- design_updates: 1
- operations_candidates: 3
- future_candidates: 0
- skipped: 0

内訳

### keep_issue

- 20260409-015
- 20260412-016
- 20260412-017
- 20260414-018
- 20260414-019

### design_updates

- 20260409-015

### operations_candidates

- 20260412-016
- 20260412-017
- 20260414-018

### future_candidates

- なし

### archive_issue

- なし

---

## applyIssueRoutingActionPlan(dry_run) 想定出力

### 1. design_writes

件数: 1

対象

- 20260409-015

想定内容

- target_layer: `02_design`
- suggested_file:
  `02_design/2026-04-16_20260409-015_tasks-api-全体を-execution-projection-前提で再設計する必要がある.md`
- derived_from_issue_id: `20260409-015`
- impact_now: `high`
- urgency_now: `""`
- write_status: `dry_run`

### 2. operations_candidate_writes

件数: 3

対象

- 20260412-016
- 20260412-017
- 20260414-018

想定内容

- target_layer: `04_operations`
- write_status: `draft_only`
- candidate_draft を保持
- `active_operations.md` は直接更新しない

### 3. future_writes

件数: 0

理由

- future 判定された issue が無いため

### 4. archive_writes

件数: 0

理由

- archive 判定された issue が無いため

### 5. kept_issues

件数: 5

対象

- 全 5 件

想定内容

- issue_id
- title
- route_to
- reason
- evaluated_at
- impact_now
- urgency_now
- action_type
- write_status: `no_op`

ここで重要なのは、
`20260414-019` も
`impact_now: medium` を保持したまま
`kept_issues` に残ることである。

### 6. skipped

件数: 0

---

## 重要確認点

### 1. 可変評価は kept_issues でも保持される

`20260414-019` は
design に行かず issue に残るが、
その場合でも

- `evaluated_at`
- `impact_now: medium`
- `urgency_now`

が payload に残る。

したがって、
「進める issue だけ評価が残る」のではなく、
「保留 issue にも評価文脈が残る」
構造になっている。

### 2. operations は candidate draft までで止まる

operations 系 3 件は
`operations_candidate_writes` に入るが、
この段階では `active_operations.md` を直接更新しない。

これは design で決めた
「正式投入は rolling を通す」
原則に沿っている。

### 3. design はまず 1 issue 1 draft で生成される

20260409-015 は
architecture / high / open のため
design_updates に入り、
まずは 1 issue 1 draft の payload が返る。

この時点では
既存 design との merge までは行わない。

---

## この dry_run で言えること

`applyIssueRoutingActionPlan(dry_run)` は、
少なくとも `idea_log` の現行 5 件に対して、
次の期待を満たす想定である。

- route 判定結果に応じた payload を生成できる
- design / operations / keep_issue を分離できる
- issue 本体を毎回更新しない
- operations を直接 active に書き込まない
- medium impact の keep_issue にも評価文脈を残せる

---

## 次に確認すべきこと

apply へ進む前に、
次を詰める必要がある。

1.
design_updates の create / update 判定をどうするか

2.
operations_candidate_writes を
return のみで扱うか、
notes/04_operations 配下へ保存するか

3.
future / archive の保存先ディレクトリを
現行 notes 構造にどう合わせるか

4.
実 write 時の衝突処理をどうするか

---

## 判断

`idea_log` を対象にした dry_run 想定では、
`applyIssueRoutingActionPlan` の最小設計は自然である。

特に重要なのは次の 2 点である。

- `20260409-015` が design draft 1件になること
- `20260414-019` が medium impact のまま keep_issue no-op に残ること

この形なら、
次は `design_updates` の apply を最初の実 write 対象として進めるのが自然である。
