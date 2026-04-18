# 2026-04-18 reroll_minimum_dry_run_expected_output_examples

## 目的

Day0 の
`reroll の最小 dry_run 入出力を確認する`
を閉じるために、
plan / active / next / queue を含む最小入力に対して
どのような出力を期待してよいかを固定する。

本メモは、
実行環境がない状態でも
reroll の期待挙動を後から照合できるようにするための design である。

---

## 結論

最小 reroll dry_run では、
次の考え方を固定してよい。

- plan 直結候補は最優先帯に入りやすい
- active 由来候補は continuity 補助を持つが特権ではない
- next は近未来候補であり、active より弱い
- queue は reroll source に入るが、plan や active continuity に自動勝利しない
- future 判定されたものは active / next に入らず deferred へ行く

つまり、
reroll は

```text
active の維持
vs
plan の前進
vs
新規 queue 候補
```

を同じ土俵に乗せる処理であり、
現在 active であることだけでは残留を保証しない。

---

## 前提

current ranking は、
次の順で比較する。

1. `plan_alignment`
2. `importance`
3. `active_continuity`
4. `quick_win`
5. `source_type`
6. `review_at`
7. `title`

したがって、
最重要なのは
`plan_alignment`
である。

---

## 例1: plan と active と queue の競合

### 入力 candidate 群

#### plan

```json
{
  "title": "issue routing 後処理の reroll dry_run 期待挙動を固定する",
  "source_type": "plan",
  "importance": "high",
  "metadata": {
    "plan_alignment": "direct"
  }
}
```

#### active

```json
{
  "title": "reroll の最小 dry_run 入出力を確認する",
  "source_type": "active",
  "importance": "high",
  "metadata": {
    "plan_alignment": "linked",
    "already_active": true,
    "active_continuity": "light"
  }
}
```

#### queue

```json
{
  "title": "issue routing の後処理統合を進める",
  "source_type": "operations_queue",
  "importance": "high",
  "metadata": {
    "generated_from": "issue_routing_queue"
  }
}
```

### 期待順位

```text
1. plan
2. active
3. queue
```

### 理由

- plan は `plan_alignment: direct`
- active は `linked + continuity`
- queue は plan 直結情報も continuity も弱い

### 期待出力

`activeLimit = 2`
なら次を期待してよい。

```json
{
  "active_candidates": [
    "issue routing 後処理の reroll dry_run 期待挙動を固定する",
    "reroll の最小 dry_run 入出力を確認する"
  ],
  "next_candidates": [
    "issue routing の後処理統合を進める"
  ]
}
```

---

## 例2: active continuity が next に勝つ

### 入力 candidate 群

#### active

```json
{
  "title": "reroll の最小 dry_run 入出力を確認する",
  "source_type": "active",
  "importance": "high",
  "metadata": {
    "plan_alignment": "linked",
    "active_continuity": "light"
  }
}
```

#### next

```json
{
  "title": "docs 番号衝突と旧 docs 群の整理方針をメモ化する",
  "source_type": "next",
  "importance": "medium",
  "metadata": {}
}
```

### 期待順位

```text
1. active
2. next
```

### 理由

- importance で active が強い
- 同等帯でも active continuity が next より有利

### 期待出力

`activeLimit = 1`
なら次を期待してよい。

```json
{
  "active_candidates": [
    "reroll の最小 dry_run 入出力を確認する"
  ],
  "next_candidates": [
    "docs 番号衝突と旧 docs 群の整理方針をメモ化する"
  ]
}
```

---

## 例3: queue 候補が active を上回る場合

### 入力 candidate 群

#### active

```json
{
  "title": "補助設計メモを整理する",
  "source_type": "active",
  "importance": "medium",
  "metadata": {
    "plan_alignment": "",
    "active_continuity": "light"
  }
}
```

#### queue

```json
{
  "title": "issue routing 後処理統合の core loop を閉じる",
  "source_type": "operations_queue",
  "importance": "high",
  "metadata": {
    "plan_alignment": "linked"
  }
}
```

### 期待順位

```text
1. queue
2. active
```

### 理由

- queue は `plan_alignment: linked`
- active は plan_alignment が空
- continuity より plan_alignment が先に効く

### 期待出力

`activeLimit = 1`
なら次を期待してよい。

```json
{
  "active_candidates": [
    "issue routing 後処理統合の core loop を閉じる"
  ],
  "next_candidates": [
    "補助設計メモを整理する"
  ]
}
```

---

## 例4: future 判定された queue 候補は deferred へ行く

### 入力 candidate

```json
{
  "title": "Phase 3 knowledge integration の本格設計",
  "source_type": "operations_queue",
  "importance": "high",
  "phase": "phase3",
  "metadata": {
    "generated_from": "issue_routing_queue"
  }
}
```

### 前提

current reroll phase は
`phase0`
とする。

### 期待出力

```json
{
  "active_candidates": [],
  "next_candidates": [],
  "deferred_candidates": [
    "Phase 3 knowledge integration の本格設計"
  ]
}
```

### 理由

- queue に入ったからといって active / next が保証されるわけではない
- current phase とズレる場合は future に落ちうる

---

## 例5: 同率帯では source_type 順が効く

### 入力 candidate 群

#### active

```json
{
  "title": "A active candidate",
  "source_type": "active",
  "importance": "high",
  "metadata": {
    "plan_alignment": "linked",
    "active_continuity": ""
  }
}
```

#### queue

```json
{
  "title": "B queue candidate",
  "source_type": "operations_queue",
  "importance": "high",
  "metadata": {
    "plan_alignment": "linked"
  }
}
```

### 期待順位

```text
1. active
2. queue
```

### 理由

- plan_alignment 同点
- importance 同点
- active_continuity が空でも
  source_type priority では `active` が `operations_queue` より先

---

## Day0 task の閉了条件への含意

この reroll task は、
少なくとも次が固定できれば閉じやすい。

1.
queue は source の1種として reroll に入る

2.
active は reroll source に戻るが特権ではない

3.
plan_alignment が continuity より先に効く

4.
current phase 不一致候補は deferred に落ちうる

5.
`active_candidates / next_candidates / deferred_candidates`
の最小期待出力例が説明できる

ここまで固定できれば、
実行環境がなくても
最小 reroll dry_run の期待挙動は十分明確である。

---

## 判断

reroll の最小 dry_run では、

- plan 直結候補
- active 継続候補
- next 候補
- queue 候補

を同じ土俵に乗せつつ、

- `plan_alignment`
- `importance`
- `active_continuity`

を軸に active / next / deferred を決める、
という理解で固定してよい。

この expected output examples は、
Day0 の reroll task を
「I/O がある」から
「期待挙動まで言える」状態へ進めるための最小設計として十分である。
