# Handover Template

## Positioning

This handover is a restart entry point.

This handover is not the execution source of truth.

Execution SSOT is:

```text
notes/04_operations/active_operations.md
```

Do not execute directly from this handover.

On restart, read `active_operations` first and decide the next action from the current canonical state.

---

## 概要

このセッションの目的と到達点を書く。

最低限、次を含める。

- このセッションの目的
- 到達点
- 作成 / 更新した主要ファイル
- operations / runtime / docs / code のどの層に影響したか

---

## 成功（Success）

完了したことを書く。

完了は、ファイル作成だけでなく、必要な観測で閉じる。

例:

- repo 更新済み
- canonical 更新済み
- runtime behavior confirmed
- Todoist projection updated
- docs reflected

---

## 判明事項（Findings）

このセッションで判明した事実や判断を書く。

例:

- 当初仮説と実原因の違い
- docs / notes / code / runtime の境界
- future / next / active の扱い
- 正本と projection の違い

---

## 失敗 / 未解決（Issues）

失敗、未完了、リスク、次回注意点を書く。

最低限、次を分ける。

- このスレッドでのミス
- 未解決の外部確認
- runtime 未確認項目
- next / issue に登録済みだが未実行の候補

---

## Current canonical snapshot

handover 作成時点の参考 snapshot を書く。

ただし、この snapshot は execution SSOT ではない。

最低限、次を含める。

- `active_operations` sha
- Immediate Gates
- current Day0
- expected resume task
- expected resume task の completed_condition
- next active task if useful

---

## First read list

再開時に読む順番を書く。

必ず最初にこれを含める。

1. `notes/04_operations/active_operations.md`
2. `notes/04_operations/next_operations.md`
3. 必要な issue / report / plan / design / docs / code
4. expected resume task の source_ref

---

## Current focus

現在の重点テーマを書く。

例:

- Phase 0 hardening continues
- Current focus is issue routing completion conditions
- Phase 1 is deferred until re-entry criteria is整理済み

---

## 次のアクション（Next Actions）

新スレでの expected next action を書く。

ただし、必ず次を明記する。

```text
Do not execute from this handover without reading active_operations.
```

expected next action は参考情報であり、再開時は必ず `active_operations` を read して確認する。

---

## New candidates routed, not executed

このセッションで発生したが、active に入れていない候補を書く。

最低限、次を含める。

- issue id
- next_operations task 名
- なぜ active に即投入していないか
- 実行してはいけない条件

---

## next_operations snapshot

handover 作成時点の `next_operations` の参考 snapshot を書く。

- `next_operations` sha
- current next order
- candidates only であること
- active_operations に入るまで実行しないこと

---

## 関連docs

関連 docs を列挙する。

---

## 関連code

関連 code / config を列挙する。

---

## 関連notes

関連 notes を列挙する。

---

## 状態サマリ

以下を分けて書く。

- API
- docs整合
- notesフロー
- code / runtime
- Todoist projection

---

## Important guardrails

最低限、次を含める。

- Execute only tasks in `notes/04_operations/active_operations.md`.
- New conversation candidates must be routed before execution.
- Immediate Gates block dependent active tasks until completed.
- Completed condition must close by observation.
- A note / report / diff / code / test / schema file existing is not enough for completion.
- update before write: read target first.
- create before write: check for same or nearby file first.
- write before update: present Write Gate.
- write after update: read-back and confirm sha.
- docs are spec SSOT. Do not make spec decisions without reading docs.
- repo schema / configured Action schema / runtime-visible schema / actual behavior are distinct.
- Runtime behavior tasks are not complete until behavior is observed.
- Todoist is projection, not execution SSOT.
- Handover is restart entry point, not execution SSOT.

---

## Risks / caveats

次スレで誤実行しやすい点を書く。

例:

- stale snapshot risk
- external API 未確認
- next にあるが active ではない候補
- runtime reflection pending
- branch / main integration risk

---

## 引き継ぎプロンプト

次スレに渡す prompt を書く。

必ず次を含める。

```text
この handover を読み込んでください。ただし handover は restart entry point であり execution SSOT ではありません。

最初に notes/04_operations/active_operations.md を読み、Immediate Gates と先頭 task を確認してください。

その後、関連 docs / notes / code を取得し、現状を把握してから、active_operations の先頭 task から作業を再開してください。

handover に書かれた expected resume task は参考情報です。実行判断は必ず active_operations を正としてください。
```

---

## Template use rule

handover 作成前に、必ずこの template を読む。

この template を読まずに handover を作成してはならない。

この template と `adam_knowledge.md` の Handover Procedure が矛盾する場合は、より厳しい方を採用する。
