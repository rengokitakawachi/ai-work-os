# 2026-04-18 reroll_minimum_dry_run_io_confirmation

## 目的

Day0 の
`reroll の最小 dry_run 入出力を確認する`
に対して、
既存 design と current code がどこまで一致しているかを
1 枚で確認する。

本メモは、

- reroll の入口
- source bundle の扱い
- queue / active の扱い
- reroll の返り値
- 現時点の未充足

を明確にし、
Day0 task の閉了条件を具体化するための analysis である。

---

## 結論

current code では、
reroll の最小 dry_run はすでに次の形で呼べる。

```text
plan / issue / active / next / operations_queue
↓
buildRollingSourceBundles(...)
↓
generateRollingCandidates(...)
↓
{
  active_candidates,
  next_candidates,
  operations_candidates,
  deferred_candidates,
  skipped_candidates,
}
```

したがって、
**queue と active を含む reroll の最小 I/O は code 上つながっている。**

一方で、
現時点では

- in-memory dry_run の実行結果そのもの
- candidate ごとの期待順位の確認
- active/next を notes 正本 task へ戻す後段確認

はまだ未了である。

---

## current code の入口

reroll 入口は 2 つある。

### 1. `generateRollingCandidatesFromNotes(...)`

入力:

- `planContent`
- `issueLogContent`
- `activeOperationsContent`
- `nextOperationsContent`
- `operationsQueuePayloads`
- `phase`
- `activeLimit`

ここで
`buildRollingSourceBundles(...)`
を使って source bundle 群を作り、
`generateRollingCandidates(...)`
へ渡す。

### 2. `generateRollingCandidatesFromQueue(...)`

入力:

- `operationsQueuePayloads`
- `phase`
- `activeLimit`

queue 単独で reroll 候補化するときの最小入口である。

---

## source bundle の current 実装

### plan

`buildPlanSourceBundle(...)`
が

- 主要論点
- 次に落とす作業

から candidate を作る。

### issue

`buildIssueSourceBundle(...)`
が
open / high issue を candidate 化する。

### active

`buildActiveOperationsSourceBundle(...)`
が active task を reroll candidate に戻す。

ここで重要なのは、
active 由来 candidate が

- `generated_from: active_operations`
- `already_active: true`
- `existing_rolling_day`
- `active_continuity: light`

を metadata に持つことである。

### next

`buildNextOperationsSourceBundle(...)`
が next を candidate 化する。

### operations_queue

`buildOperationsQueueSourceBundle(...)`
が queue payload を candidate に変換する。

ここでは

- `candidate_draft.task`
- `candidate_draft.source_ref`
- `reason`
- `impact_now`
- `urgency_now`

などを candidate へ写す。

---

## reroll 本体の current 挙動

`generateRollingCandidates(...)`
の流れは次である。

```text
collectCandidates
↓
normalizeCandidates
↓
evaluateCandidates
↓
buildPlacementDecisions
↓
merge candidate + decision
↓
route_to ごとに分岐
↓
splitRankedCandidates
```

ここでの重要点は、
reroll は最初から active/next を直接作るのではなく、
まず各 candidate を

- `operations`
- `future / design / issue`
- `skipped`

へ分けること。

その後、
`operations` に残った候補だけを ranking し、
`active_candidates / next_candidates`
へ切る。

---

## reroll の current 返り値

current code の最小返り値は次である。

```json
{
  "active_candidates": [],
  "next_candidates": [],
  "operations_candidates": [],
  "deferred_candidates": [],
  "skipped_candidates": []
}
```

### 意味

- `operations_candidates`
  - placement decision 上 `route_to: operations` になった候補全体

- `active_candidates`
  - operations 候補を ranking した上位 `activeLimit` 件

- `next_candidates`
  - active に入らなかった残り

- `deferred_candidates`
  - `future / design / issue` に送られた候補

- `skipped_candidates`
  - decision が無い、または route 不明の候補

---

## ranking の current rule

`splitRankedCandidates(...)` は `rankOperationsCandidates(...)` を使う。

比較順は次である。

1.
`plan_alignment`

2.
`importance`

3.
`active_continuity`

4.
`quick_win`

5.
`source_type`

6.
`review_at`

7.
`title`

このため、
active は candidate source に戻されるが、
`plan_alignment`
より優先されるわけではない。

一方で、
同等帯なら
`active_continuity: light`
が軽い維持補正になる。

---

## design と code の一致点

今回確認できた一致点は次である。

### 1. queue は source の1種

`operations_candidate_queue_to_rolling_io`
で定義した通り、
queue payload は rolling 前の source として扱われている。

### 2. active は reroll candidate source に戻る

`active_operations_as_reroll_candidate_source`
で定義した通り、
active 由来 candidate は metadata を持って reroll 土俵へ戻る。

### 3. active 特権ではない

ranking は
`plan_alignment`
を最優先にしており、
active は continuity 補助に留まる。

### 4. reroll の返り値は active/next/future に近い形を持つ

ただし current code では
future は `deferred_candidates`
として返っており、
notes 正本の `future` へ apply する後段ではない。

---

## current の未充足

### 1. 実際の dry_run 結果未確認

code はつながっているが、
この環境ではコマンド実行ができず、

- 実入力を流した結果
- 想定どおりの active/next 分岐

はまだ未確認である。

### 2. candidate 例ごとの期待順位未固定

queue / active / plan / next が同時に入ったとき、
どの候補が上位に来るかの example matrix はまだ固定していない。

### 3. reroll 出力から notes 正本へ戻す後段未確認

`generateRollingCandidates(...)`
の返り値は candidate 配列であり、
まだ `active_operations.md / next_operations.md`
の task schema へ戻す writer とは別である。

---

## Day0 task の閉了に必要な最小確認

この task を閉じるために必要なのは、
少なくとも次である。

1.
queue を source として reroll へ入れられる

2.
active を source として reroll へ戻せる

3.
返り値が
`active_candidates / next_candidates / deferred_candidates`
を持つことを確認できる

4.
ranking 上、
active continuity が最優先ではなく
`plan_alignment`
が最優先であることを確認できる

ここまでは、
設計と code の照合で確認できた。

残るのは
**実入力を流した dry_run 結果確認**
である。

---

## 判断

Day0 の
`reroll の最小 dry_run 入出力を確認する`
については、
現時点で

- design
- adapter
- orchestration
- ranking
- reroll output shape

の整合は確認できた。

したがって、
この task の次の自然な一手は、

**queue / active / next / plan を含むサンプル入力に対する期待出力例を 1 枚の analysis に落とすこと**
である。

それができれば、
実行環境がない状態でも Day0 task の閉了条件をかなり具体化できる。
