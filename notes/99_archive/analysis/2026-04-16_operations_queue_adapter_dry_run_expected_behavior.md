# 2026-04-16 operations_queue_adapter_dry_run_expected_behavior

## 目的

issue routing 由来の operations candidate queue payload を
rolling に渡したときの
最小 dry run 想定を具体化する。

本メモは、
新規実装した

- `buildOperationsQueueSourceBundle(...)`
- `generateRollingCandidatesFromQueue(...)`

が、設計意図どおり
operations 候補を rolling 前入力として扱えるかを
設計レベルで確認するための analysis である。

---

## 入力

対象は `idea_log` から operations に route された次の 3 件。

- `20260412-016`
- `20260412-017`
- `20260414-018`

これらは `applyIssueRoutingActionPlan(dry_run)` の
`operations_candidate_writes` に入る想定である。

---

## queue payload の想定

各 payload は少なくとも次を持つ。

- `title`
- `derived_from_issue_id`
- `reason`
- `evaluated_at`
- `impact_now`
- `urgency_now`
- `candidate_draft.task`
- `candidate_draft.source_ref`
- `candidate_draft.notes`

この payload はまだ

- `rolling_day`
- `active / next / future`

を持たない。

---

## adapter 後の candidate 想定

`buildOperationsQueueSourceBundle(...)` により、
各 payload は operations candidate に変換される。

変換後の最小形は次である。

- `title`
- `candidate_type: operations`
- `source_ref`
- `importance`
- `urgency`
- `why_now`
- `metadata.generated_from: issue_routing_queue`
- `metadata.generated_from_issue_id`
- `metadata.evaluated_at`
- `metadata.notes`

ここで重要なのは、
queue payload が rolling candidate へ正規化され、
既存 rolling パイプラインにそのまま流せることである。

---

## rolling 文脈上の想定

現在の `active_operations.md` では、
Day0〜Day6 がすでに埋まっている。

また `next_operations.md` は空である。

したがって、
queue 由来 3 件を rolling に渡した場合、
少なくとも次の 2 パターンがありうる。

### パターンA

- active: 既存上位 task を維持
- next: queue 由来の一部または全部が入る
- future: 条件不足のものが送られる

### パターンB

- active: queue 由来高優先 task が食い込む
- 既存の一部が next へ押し出される
- 残りは future に送られる

どちらになるかは、
ranking / helper scoring / phase 文脈次第であり、
queue payload の存在だけでは確定しない。

これは設計意図どおりである。

---

## この dry run で確認できること

### 1. queue payload は rolling 入力になれる

return-only で終わらず、
実際に rolling source bundle の1種として扱える。

### 2. queue payload は next を直接汚染しない

issue routing の段階では `next_operations` を更新せず、
rolling 後にのみ `next` が決まる。

### 3. operations 候補でも future へ送られうる

issue routing 時点で operations 候補でも、
rolling で

- premature
- phase 不一致
- 実行粒度不足

などにより future へ送られる余地が残る。

これは current spec と一致する。

---

## 今の段階で十分な確認点

現段階では、
次が満たされれば十分である。

- queue payload を bundle 化できる
- bundle から candidate 化できる
- rolling に渡せる
- `active / next / future` の判定を rolling に残せる

つまり、
まだ必要なのは
**実配置結果の固定** ではなく、
**入力から rolling へ流せることの確認**
である。

---

## 判断

queue adapter の実装により、
issue routing 由来の operations 候補は
設計どおり rolling 前入力として扱える状態になった。

特に重要なのは次の 3 点である。

- queue payload は candidate source へ変換できる
- `next_operations` を直接更新しない
- 最終配置は rolling に残せる

この形なら、
issue routing → queue → rolling の接続は
最小段階として十分成立している。
