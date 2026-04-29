# Handover: Phase 0 Hardening Restart

## Restart entry point

This handover is a restart entry point.
It is not the execution source of truth.

Execution source of truth:

```text
notes/04_operations/active_operations.md
```

Projection:

```text
Todoist
```

Do not execute from this handover without reading `active_operations`.

---

## First read

再開時は、必ず以下を読む。

```text
1. notes/04_operations/active_operations.md
2. notes/04_operations/next_operations.md
3. config/ai/adam_instruction.md
4. config/ai/adam_knowledge.md
5. docs/05_roadmap.md
6. notes/02_design/2026-04-29_phase0_hardening_roadmap_reflection_draft.md
```

DELTA 関連を確認する場合のみ読む。

```text
systems/delta/config/delta_action_schema_v0.5.yaml
systems/delta/history/2026-04.md
systems/delta/operations/active_operations.md
```

---

## Current focus

現在の主軸は **Phase 0 hardening**。

ただし、その前に Immediate Gate として以下が残っている。

```text
ADAM handover trigger Always-On Rule を instruction / knowledge / runtime に反映する
```

現状:

```text
repo instruction update: complete
repo knowledge update: complete
ADAM GPT editor reflection: user says reflected
runtime behavior confirmation: this handover creation is the confirmation candidate
```

再開時は、必ず `active_operations` を読み、Immediate Gate の状態を確認する。

---

## Recently completed

完了済み。

```text
- DELTA v0.3 history write completed / runtime behavior confirmed
- DELTA v0.4 operations write completed / runtime behavior confirmed
- DELTA v0.5 history write recovery completed / runtime behavior confirmed
- Phase 1 Todoist foundation entry completed
- Phase 0 roadmap reflection draft completed
- Phase 0 hardening 用 operations rolling completed
- ADAM handover trigger rule repo update completed
```

重要な作成・更新済みファイル。

```text
systems/delta/config/delta_action_schema_v0.5.yaml
notes/02_design/2026-04-29_phase0_hardening_roadmap_reflection_draft.md
notes/08_analysis/2026-04-29_phase1_todoist_foundation_entry_boundary_analysis.md
config/ai/adam_instruction.md
config/ai/adam_knowledge.md
```

---

## Expected resume task

Expected current first task:

```text
ADAM handover trigger Always-On Rule を instruction / knowledge / runtime に反映する
```

This is only an expected resume task.
It is not the execution source of truth.

再開時は、この handover ではなく `notes/04_operations/active_operations.md` を読んで確認すること。

この handover 出力・保存が期待条件を満たしていれば、次にやることは以下。

```text
1. active_operations.md を読む
2. ADAM handover trigger gate を complete に更新する
3. Todoist task 6gVjjP88XJg63pRH を close する
4. 保存確認する
```

その後に Phase 0 hardening の Day0 へ進む。

---

## Phase 0 hardening next tasks

Immediate Gate 完了後の次候補は active_operations の Day0。

```text
docs/05 Phase 0 hardening reflection の本体反映可否を判断する
```

続く Day0 task。

```text
issue routing completed condition の継続観測項目を weekly review 向けに整理する
```

---

## Guardrails

```text
- docs は仕様 SSOT
- docs 未取得で仕様判断しない
- notes は補助情報
- operations は短期実行順の正本
- Todoist は operations の projection
- handover は restart entry point であり execution source of truth ではない
- 実行対象は active_operations に入っている task のみ
- 新規候補は即実行せず routing / rolling で active / next / future を決める
- Immediate Gate が未完了なら、それに blocked される active task を実行しない
- write 前は Write Gate を出す
- write 後は保存確認する
- repo schema / configured Action / runtime-visible schema / actual behavior を混同しない
```

---

## Do not do

```text
- この handover を実行正本として扱わない
- Todoist を正本として扱わない
- active_operations を読まずに次 task を実行しない
- handover 内の expected task を最新正本として断定しない
- Phase 1 Outlook 実装へ勝手に進まない
```

---

## Restart instruction

新スレでは、まずこう進める。

```text
ADAM、handover から再開します。

この handover は restart entry point であり、execution source of truth ではありません。
まず notes/04_operations/active_operations.md を読んで、現在の Immediate Gate と次の実行対象を確認してください。
```
