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

## Current state snapshot

Snapshot at handover update time:

```text
active_operations.md sha: 152e03cd1c38d6c69a28f21427f61ae3a0b7c18d
next_operations.md sha: 0355d986a96e4a7c7a8abd5a6f69128201935e06
handover file sha before this update: 4804a79d9e5cb48f29d36e8983b31d8e0bf94baf
```

Active Immediate Gates at handover time:

```text
complete:
- DELTA v0.5 write schema で history write を復旧する
- ADAM runtime instruction に Day capacity Always-On Rule を反映する
- DELTA v0.2 read-only Action runtime behavior confirmation

not complete:
- ADAM handover trigger Always-On Rule を instruction / knowledge / runtime に反映する
```

Current active Day0 after Immediate Gate:

```text
- docs/05 Phase 0 hardening reflection の本体反映可否を判断する
- issue routing completed condition の継続観測項目を weekly review 向けに整理する
```

Current next_operations retained items:

```text
- Phase 1 Outlook Calendar API の読取設計を整理する
- legacy Todoist wrapper の削除判断を Phase 1 Todoist foundation 後に行う
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

## This thread actions

このスレッドで実施した主な内容は以下。

### Phase 0 hardening への戻し

```text
- Phase 1 Outlook 実装へ進む前に、Phase 0 hardening を優先する判断を行った
- docs/05 roadmap reflection draft を作成済みであることを確認した
- Phase 0 hardening 用に active_operations を reroll した
- Phase 1 Outlook Calendar API 読取設計は next_operations に残した
```

### DELTA v0.5 history write recovery

```text
- DELTA v0.4 では history write が runtime 上使えないように見える問題を確認した
- server code では delta_history create / update が残っていることを確認した
- 原因は v0.4 schema の operationId / description が operations write に寄りすぎていたことと判断した
- systems/delta/config/delta_action_schema_v0.5.yaml を作成した
- DELTA GPT Actions に v0.5 schema を反映した後、runtime test を実施した
- deltaWrite が runtime-visible であることを確認した
- resource=delta_history の controlled history update が成功した
- invalid history path / invalid extension / unsupported operations create が拒否された
- read-back で history 追記を確認した
- DELTA v0.5 history write recovery gate を complete に更新した
- Todoist task 6gVjpcRR45RcpQqH を close した
```

### ADAM handover trigger correction

```text
- handover trigger 欠落が同種ミス2回目であることを確認した
- 原因は、新スレ / 引き継ぎ書を handover procedure request として扱う trigger が runtime instruction 上弱かったことと判断した
- config/ai/adam_instruction.md に Handover Trigger Guard を追加した
- config/ai/adam_knowledge.md の Handover Procedure を強化した
- active_operations に Immediate Gate `ADAM handover trigger Always-On Rule を instruction / knowledge / runtime に反映する` を追加した
- ユーザーが ADAM GPT editor へ instruction / knowledge を反映した
- 現スレッドで handover を作成し、repo に保存した
```

### Handover write correction

```text
- 最初は handover をチャット上に出力しただけで repo に保存しなかった
- ユーザー指摘により、修正後ルールでは handover を notes/06_handover に作成すべきだったと判断した
- notes/06_handover/2026-04-29_phase0_hardening_restart_handover.md を作成した
- 保存確認済み
```

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
- Handover file saved to notes/06_handover
```

重要な作成・更新済みファイル。

```text
systems/delta/config/delta_action_schema_v0.5.yaml
notes/02_design/2026-04-29_phase0_hardening_roadmap_reflection_draft.md
notes/08_analysis/2026-04-29_phase1_todoist_foundation_entry_boundary_analysis.md
notes/06_handover/2026-04-29_phase0_hardening_restart_handover.md
config/ai/adam_instruction.md
config/ai/adam_knowledge.md
```

---

## Current risks / caveats

```text
- ADAM handover trigger gate is not yet complete in active_operations.
- This handover is a confirmation candidate, but gate close must still be done by reading active_operations in the next thread.
- Do not treat this handover as canonical completion state.
- Phase 1 Outlook work is intentionally retained in next_operations, not active.
- DELTA v0.5 is confirmed for history write, but DELTA learning content itself should still be handled through DELTA operations/history SSOT.
- Todoist is projection only; close/open state must not override operations.
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

## Source references

```text
notes/04_operations/active_operations.md
notes/04_operations/next_operations.md
notes/06_handover/2026-04-29_phase0_hardening_restart_handover.md
notes/02_design/2026-04-29_phase0_hardening_roadmap_reflection_draft.md
notes/08_analysis/2026-04-29_phase1_todoist_foundation_entry_boundary_analysis.md
config/ai/adam_instruction.md
config/ai/adam_knowledge.md
systems/delta/config/delta_action_schema_v0.5.yaml
systems/delta/config/delta_action_schema_v0.4.yaml
api/repo-resource.js
src/services/delta-history.js
src/services/delta-operations.js
```

---

## Restart instruction

新スレでは、まずこう進める。

```text
ADAM、handover から再開します。

この handover は restart entry point であり、execution source of truth ではありません。
まず notes/04_operations/active_operations.md を読んで、現在の Immediate Gate と次の実行対象を確認してください。
```
