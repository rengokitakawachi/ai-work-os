# 2026-04-16 operations_candidate_queue_to_rolling_io

## 目的

issue routing 後処理が返す
`operations candidate queue payload`
を、
operations rolling がどう受け取るかを定義する。

本メモは、
queue を概念層として固定したうえで、
rolling 側がそれを candidate source として読める
最小 I/O を設計することを目的とする。

---

## 結論

rolling は、
queue payload を
**candidate source の1種**
として読む。

最小接続は次である。

```text
issue routing
↓
operations_candidate_writes
↓
queue payload
↓
rolling source bundle
↓
normalization
↓
ranking
↓
placement
↓
active / next / future
```

つまり、
queue payload は
rolling の前段入力であり、
まだ operations 正本 task ではない。

---

## queue payload の位置づけ

queue payload は、
issue routing が
`route_to: operations`
と判定した結果である。

ここで保持するものは、

- operations 候補として扱う理由
- source_ref
- 可変評価
- task draft

である。

ここではまだ、

- rolling_day
- active / next の配置
- future 送付
- due_date の確定

は決めない。

---

## rolling が受け取る最小入力

rolling 側は、
queue payload から最低限次を読めればよい。

- task
- source_ref
- why_now
- notes
- reason
- evaluated_at
- impact_now
- urgency_now
- generated_from_issue_id

実装上は、
`candidate_draft` を主に使い、
不足する項目を queue payload 本体から補う。

---

## queue payload の最小形

最小 payload 例は次である。

```json
{
  "target_layer": "04_operations",
  "title": "issue routing の後処理統合を進める",
  "derived_from_issue_id": "20260412-016",
  "route_to": "operations",
  "reason": "operations 系 issue のため、rolling 候補へ送る",
  "evaluated_at": "2026-04-16T00:00:00Z",
  "impact_now": "high",
  "urgency_now": "",
  "action_type": "operations_candidate",
  "write_status": "draft_only",
  "candidate_draft": {
    "task": "issue routing の後処理統合を進める",
    "source_ref": [
      "notes/01_issues/idea_log.md"
    ],
    "notes": [
      "generated_from_issue:20260412-016"
    ]
  }
}
```

---

## rolling candidate への変換

queue payload は、
rolling 内で次のように candidate へ正規化する。

### queue payload から読むもの

- `candidate_draft.task`
  → candidate.title または task

- `candidate_draft.source_ref`
  → candidate.source_ref

- `candidate_draft.notes`
  → candidate.metadata.notes

- `reason`
  → candidate.why_now の補助

- `impact_now`
  → candidate.importance の補助

- `urgency_now`
  → candidate.urgency の補助

- `derived_from_issue_id`
  → candidate.metadata.generated_from_issue_id

### 変換後 candidate の最小像

```json
{
  "title": "issue routing の後処理統合を進める",
  "candidate_type": "operations",
  "source_ref": [
    "notes/01_issues/idea_log.md"
  ],
  "importance": "high",
  "urgency": "",
  "why_now": [
    "operations 系 issue のため、rolling 候補へ送る"
  ],
  "metadata": {
    "generated_from": "issue_routing_queue",
    "generated_from_issue_id": "20260412-016",
    "evaluated_at": "2026-04-16T00:00:00Z",
    "notes": [
      "generated_from_issue:20260412-016"
    ]
  }
}
```

---

## なぜ rolling_day を持たせないか

rolling_day は placement 後に決まる。

queue payload は placement 前の候補なので、
ここで rolling_day を持たせると
責務が前倒しになる。

したがって、
queue payload では rolling_day を持たない。

rolling_day は
rolling 出力で初めて付与する。

---

## operations task schema との整合

operations task schema では、
正本 task の必須項目は

- task
- source_ref
- rolling_day

である。

queue payload は正本 task ではないため、
ここでは

- task
- source_ref
- why_now / notes の補助
- 可変評価と reason

までを持てば十分である。

つまり、

- queue payload
  = pre-task candidate

- active / next task
  = placed task

である。

---

## ranking との整合

queue payload から得られる
`impact_now`
`urgency_now`
`reason`
は、
ranking の補助情報として扱える。

ただし、
これだけで順位を確定しない。

operations rolling spec の原則どおり、
ranking は

- helper scoring
- 文脈
- ADAM の判断

で行う。

queue payload は
ranking の入力情報を増やすが、
ranking 自体を置き換えない。

---

## future 判定との整合

queue payload が operations に来たからといって、
必ず active / next に入るわけではない。

rolling 側では引き続き、

- 前提条件待ち
- premature
- phase 不一致
- 実行粒度不足

を見て、
future へ送ることができる。

これは current spec と一致する。

つまり、

- issue routing では operations 候補
- rolling では future へ送付

は両立する。

---

## 現段階の実装方針

現段階では、
queue payload は return-only でよい。

rolling への接続は、
次のどちらかで実装できる。

### 1. in-memory 接続

issue routing の返り値を
そのまま rolling に渡す。

### 2. 永続化後接続

将来 queue 層を保存した場合、
rolling がそこから読む。

現段階では 1 で十分である。

---

## 最小 I/O 例

### 入力

- `operations_candidate_writes`
  - 3 件

### rolling 入口

- `buildOperationsQueueSourceBundle(queuePayloads)`

### 出力

- candidate 3 件
- ranking 後に
  - active: 1
  - next: 1
  - future: 1

のように振り分け可能

重要なのは、
queue payload の時点では
まだ `active / next / future`
が決まっていないことである。

---

## code 側への含意

後続 code 実装で必要なのは、
少なくとも次である。

1.
queue payload 配列から
rolling source bundle を作る関数

2.
queue payload を
operations candidate へ変換する adapter

3.
`impact_now / urgency_now / reason`
を helper scoring 補助へ落とすルール

ただし、
今すぐ全部入れなくてよい。

まずは I/O を固定し、
次段で adapter を追加するのが自然である。

---

## 判断

operations candidate queue payload は、
operations rolling が読む
**前段入力 source**
として扱うのが自然である。

最小接続は次で十分である。

- queue payload は return-only
- rolling はそれを source の1種として読む
- queue payload では rolling_day を持たない
- placement 後に active / next task へ変換する

この形なら、
issue routing → queue → rolling → active/next/future
の流れがきれいにつながり、
現行 spec と整合したまま実装を前進できる。
