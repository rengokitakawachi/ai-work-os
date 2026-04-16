# 2026-04-16 issue_routing_postprocess_current_state

## 目的

issue routing 後処理統合の現在地を、
1 枚で把握できる形に整理する。

本メモは、
設計メモ・分析メモ・実装差分が増えた状態で、

- 何が完了したか
- 何が未了か
- 次にどこを進めるべきか

を明確にするための current-state summary である。

---

## 結論

**issue routing 後処理統合は、最小一周がほぼ閉じた。**

現在は次の状態である。

- design
  - apply まで接続済み

- operations
  - queue payload として rolling 前入力まで接続済み

- future
  - dry_run payload は最小 enrich 済み

- archive
  - dry_run payload は最小 enrich 済み

- keep_issue
  - no-op として整理済み

したがって、
保存 / routing / 反映 / rolling の責務分離を保ったまま、
後処理の最小 loop は成立している。

---

## 完了したこと

### 1. 可変評価 schema の end-to-end 接続

以下は routing decision から action plan まで通る。

- `evaluated_at`
- `impact_now`
- `urgency_now`

これらは

- `rules`
- `placement`
- `routed_candidates`
- `buildIssueRoutingActions`

を通って保持される。

### 2. notes write usecase の最小形を固定

`applyIssueRoutingActionPlan` を
notes write の最小 usecase として固定した。

責務は次である。

- `action_plan` を解釈する
- notes draft payload を生成する
- 必要な write を呼ぶ
- 結果を返す

### 3. design_updates の apply

`02_design` への create / update を導入した。

実例として、
`20260409-015`
から design draft を生成し、
`notes/02_design/2026-04-16_20260409-015_tasks_api_execution_projection_redesign.md`
を作成済みである。

### 4. routing-generated draft の標準形固定

draft の標準形を設計として固定した。

共通前段 5 セクションは次である。

- source issue
- source_ref
- routing decision
- raw summary
- related context

code 側でも section builder として明示した。

### 5. future / archive の最小 enrich

future には次を追加した。

- why deferred
- recheck point

archive には次を追加した。

- archive reason

ただし、まだ apply は入れていない。

### 6. operations candidate queue の導入

operations 判定された候補は、
`next_operations` に直接入れず、
`operations candidate queue`
へ入る前提とした。

これは概念層であり、
現段階では return-only payload として扱う。

### 7. queue → rolling 接続

以下を code に追加済み。

- `buildOperationsQueueSourceBundle(...)`
- `generateRollingCandidatesFromQueue(...)`

これにより、
`operations_candidate_writes`
は rolling の前段入力 source として扱える。

---

## 現在の全体像

```text
issue log
↓
issue routing
↓
routed_candidates
↓
action_plan
↓
applyIssueRoutingActionPlan
├─ design_writes      → 02_design apply 可能
├─ operations_candidate_writes → queue payload として rolling へ
├─ future_writes      → dry_run enrich 済み
├─ archive_writes     → dry_run enrich 済み
└─ kept_issues        → no-op
```

operations 経路は次である。

```text
operations_candidate_writes
↓
operations candidate queue payload
↓
buildOperationsQueueSourceBundle(...)
↓
generateRollingCandidates(...)
↓
active / next / future
```

---

## まだ未了のこと

### 1. future / archive の apply

future / archive は
body enrich までは入ったが、
実 write はまだ導入していない。

### 2. design draft の高度化

現在の design apply は、
初期 draft 生成としては十分だが、
既存 design との merge や統合更新までは行わない。

### 3. queue の永続化

operations candidate queue は概念層であり、
まだ notes / DB への保存先は持たない。

### 4. rolling への実データ dry run 実行

adapter と entrypoint は実装したが、
queue payload を使った in-memory rolling dry run の
実実行結果まではまだ確定していない。

### 5. review 接続

issue routing decision を
review 地点でどう再評価するかの接続は、
まだ後段である。

---

## いまやらないこと

現段階では次をやらない。

- `active_operations.md` の直接更新
- `next_operations.md` の直接更新
- issue 本体への毎回 write
- future / archive の即 apply
- queue の永続保存
- delete を使った即時 archive 反映

---

## 現在の評価

現時点の評価は次の通りである。

### 良い点

- 責務分離が維持されている
- design は実 write まで到達した
- operations は queue 経由で rolling に接続できる
- future / archive も payload 形は整った
- code と design の整合が取れている

### 残る薄い未接続

- future / archive apply
- rolling 実 dry run 結果の確認
- review 再評価接続

つまり、
大きな構造問題よりも、
薄い後段接続の残りを詰める段階に入っている。

---

## 次に進むべき1つ

**次にやるべき1つは、queue payload を使った rolling の in-memory dry run を実際に確認すること**
である。

理由は次である。

- design apply はすでに 1 件通っている
- future / archive は急いで apply しなくてよい
- operations 経路は adapter まで実装済み
- したがって、残る重要確認は
  queue → rolling の実際の挙動である

ここを確認すれば、
issue routing 後処理統合の主要 loop は
設計だけでなく挙動面でも閉じられる。

---

## 判断

issue routing 後処理統合は、
最小設計の検討段階を越え、
部分的に実 write / 実装接続まで進んだ。

現時点では、
大きな方針変更よりも

- rolling dry run 実確認
- future / archive apply の要否判断
- review 接続の後段整理

を順に詰めるのが自然である。
