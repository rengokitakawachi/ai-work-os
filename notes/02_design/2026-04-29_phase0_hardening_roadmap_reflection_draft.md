# 2026-04-29 Phase 0 Hardening Roadmap Reflection Draft

## 結論

`docs/05_roadmap.md` の Phase 0 は大筋で正しい。

ただし、Phase 0 hardening の観点では、次の2点を少し強めるのが自然である。

1. Phase 0 は Phase 1 前の軽い準備ではなく、Phase 1 以降の実行系 plan 群を支える foundation phase である
2. Phase 0 の完了判定は、機能や code の存在ではなく、運用可能な common operating model として説明・再利用できることに置く

この note は `docs/05_roadmap.md` へ返すための reflection draft であり、docs 本体の直接更新ではない。

---

## Source references

- `docs/05_roadmap.md`
- `docs/15_notes_system.md`
- `docs/17_operations_system.md`
- `notes/02_design/2026-04-25_phase0_positioning_in_roadmap.md`
- `notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md`
- `notes/08_analysis/2026-04-28_phase0_remaining_inventory_before_phase1.md`

---

## Current roadmap state

`docs/05_roadmap.md` already defines Phase 0 as:

```text
Phase 0: Common Operating Model Foundation
```

It already states that Phase 0 is for arranging an operating model common to AI Work OS before advancing EVE execution capabilities.

It also already connects Phase 1 to the common skeleton built in Phase 0.

Therefore, the correct action is not to add a new phase.

The correct action is a minimal clarification.

---

## Why hardening is needed now

Phase 0 has moved from design-only to operational use.

Observed progress includes:

- operations are treated as short-term execution SSOT
- active_operations is used as the daytime execution source
- Todoist is treated as projection / execution view, not SSOT
- routing and review are separated
- operations rolling is not just next item promotion, but candidate collection / evaluation / placement
- handover is a restart entry point, not an execution source
- repo schema, configured Action schema, runtime-visible schema, and actual behavior are distinguished
- DELTA v0.3 / v0.4 confirmed runtime reflection has strengthened the observation-based completion model

Because of this, Phase 0 is no longer only a planning theme. It is the common operating model foundation now being hardened through use.

---

## Minimal docs/05 reflection points

### 1. Purpose section

Current meaning is correct.

Add nuance:

- Phase 0 fixes the common operating model before Phase 1 adds EVE execution integrations
- ADAM is the development/control surface used to extract this common model
- The target is not ADAM-specific process optimization, but a reusable AI Work OS operating model

Proposed wording:

```text
Phase 0 は、ADAM の開発運用を通じて、AI Work OS 全体に共通する routing / planning / review / handover / 正本管理の operating model を固定する foundation phase とする。

この phase の目的は、ADAM 固有の開発支援ルールを増やすことではなく、Phase 1 以降の EVE 実行系 plan 群を安全に乗せられる共通骨格を抽出し、運用可能な形にすることである。
```

### 2. Phase 0 position section

Current roadmap already says Phase 0 is a foundation phase.

Strengthen the distinction from light preparation.

Proposed wording:

```text
この phase は、Phase 1 を始める前の軽い準備ではない。

Phase 1 以降で Todoist / Outlook / Teams / Obsidian などの実行系・外部接続を安全に進めるために、AI Work OS 全体に共通する operating model を固定する foundation phase である。
```

### 3. Phase 0 completion image

Current completion image lists responsibility separation and skeleton readiness.

Add observation-based completion.

Proposed wording:

```text
Phase 0 の完了は、個別機能や code 差分の存在だけでは判定しない。

intake routing / issue routing / design routing / operations rolling / review / handover / 正本と view の分離が、実運用の中で説明可能であり、ADAM 以外にも展開できる common operating model として再利用可能であることを重視する。
```

### 4. Current state section

Current roadmap says Phase 0 is in progress and Phase 1 plan groups are prepared.

Update nuance:

- Phase 0 is in hardening
- Phase 1 has begun at the Todoist foundation entry level
- Outlook read and later execution integrations should proceed after Phase 0 hardening points are reflected or routed

Proposed wording:

```text
現在は Phase 0 の主要構造が運用段階に入り、Phase 0 hardening を進めている。

Phase 1 は Todoist foundation entry まで着手済みだが、Outlook 読取以降の実行系拡張は、Phase 0 の routing / review / operations / 正本関係の hardening と並行して進める。
```

---

## What should stay out of docs/05

Do not put the following details into roadmap directly:

- issue routing の個別 completed condition 全文
- intake routing の細かい archive / pending 後処理
- daily review / reroll の細かい gate
- DELTA v0.3 / v0.4 の実装詳細
- active_operations の具体的な Day 配置

These belong to plan / design / operations / report layers.

Roadmap should retain only the upper-level meaning.

---

## Recommended docs/05 update shape

Use minimal diff.

Recommended target sections:

1. `## 目的`
2. `### Phase 0: Common Operating Model Foundation`
   - 目的
   - 位置づけ
   - 完了イメージ
3. `## 現在地`

Do not rewrite all roadmap phases.

---

## Phase 0 hardening follow-up candidates

After this roadmap reflection draft, the next Phase 0 hardening candidates are:

1. issue routing completed condition を weekly review 向けに整理する
2. intake routing の archive / pending 後処理を実データで再観測する
3. design routing の最小運用ルールを確認する
4. daily review / weekly review / routing / rolling の責務境界を実例ベースで確認する

These should be routed through operations rolling before execution.

---

## Decision

Proceed with Phase 0 hardening.

The roadmap reflection should be minimal and should clarify foundation meaning, not expand roadmap detail.

Recommended next step:

```text
Human review: docs/05_roadmap.md へ上記最小差分を反映するか判断する。
```
