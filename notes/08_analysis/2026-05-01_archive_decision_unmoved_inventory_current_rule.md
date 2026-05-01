# 2026-05-01 archive decision unmoved inventory current rule

## 目的

routing session の current rule に基づき、archive 判定済み / relocation 候補 / pending / retain / archive candidate を再分類する。

current rule:

- transform: source file を chunk 分解・統合し、新 file を作る。新 file に source_ref を残し、元 file は archive へ移す。
- relocation: existing file の価値を保ったまま、より適切な layer へ移す。
- retain: 現 layer に残す理由を明示する。
- pending: 判断不能理由、解除条件、再評価地点を明示する。
- archive: 役目終了 file を `notes/99_archive/<same-layer>/...` へ移す。

---

## source_ref

- notes/08_analysis/2026-04-30_intake_routing_archive_pending_reobservation.md
- notes/08_analysis/2026-04-30_design_routing_candidate_inventory.md
- notes/08_analysis/2026-04-30_routing_session_checklist.md
- notes/00_inbox/2026-03-23_inbox_web_digest.md
- notes/00_inbox/260322_091234AIエージェントの作り方完全ガイド｜失敗しない開発5ステップと選定方法 ｜SIGNATE総研.md
- notes/00_inbox/ChatGPT Agent（エージェント）とは？背景や使い方を解説！.md
- notes/02_design/2026-03-24_eve_intent_api_mapping.md
- notes/02_design/2026-03-24_notes_delete_api_draft.md
- notes/02_design/2026-03-25_strategy_api_and_tasks_boundary.md
- notes/02_design/2026-03-25_strategy_domain_schema.md

---

## confirmed current source presence

Direct read で以下の current source が元 layer に残っていることを確認した。

### inbox

- `notes/00_inbox/2026-03-23_inbox_web_digest.md`
- `notes/00_inbox/260322_091234AIエージェントの作り方完全ガイド｜失敗しない開発5ステップと選定方法 ｜SIGNATE総研.md`
- `notes/00_inbox/ChatGPT Agent（エージェント）とは？背景や使い方を解説！.md`

### design

- `notes/02_design/2026-03-24_eve_intent_api_mapping.md`
- `notes/02_design/2026-03-24_notes_delete_api_draft.md`
- `notes/02_design/2026-03-25_strategy_api_and_tasks_boundary.md`
- `notes/02_design/2026-03-25_strategy_domain_schema.md`

---

## inventory summary

| id | source | current layer | current routing type | target | physical move | next action |
|---|---|---|---|---|---|---|
| A | `notes/00_inbox/2026-03-23_inbox_web_digest.md` | inbox | archive | `notes/99_archive/00_inbox/2026-03-23_inbox_web_digest.md` | not done | move candidate |
| B | `notes/00_inbox/260322_091234AIエージェントの作り方完全ガイド｜失敗しない開発5ステップと選定方法 ｜SIGNATE総研.md` | inbox | archive | `notes/99_archive/00_inbox/260322_091234AIエージェントの作り方完全ガイド｜失敗しない開発5ステップと選定方法 ｜SIGNATE総研.md` | not done | move candidate |
| C | `notes/00_inbox/ChatGPT Agent（エージェント）とは？背景や使い方を解説！.md` | inbox | split required / pending | split output + pending source | not done | split routing candidate |
| D | `notes/02_design/2026-03-24_eve_intent_api_mapping.md` | design | relocation candidate | `notes/80_future/design/2026-03-24_eve_intent_api_mapping.md` | not done | future/design relocation candidate |
| E | `notes/02_design/2026-03-24_notes_delete_api_draft.md` | design | archive candidate | `notes/99_archive/02_design/2026-03-24_notes_delete_api_draft.md` after diff check | not done | diff check first |
| F | `notes/02_design/2026-03-25_strategy_api_and_tasks_boundary.md` | design | relocation candidate / retain | `notes/80_future/design/2026-03-25_strategy_api_and_tasks_boundary.md` or retain | not done | relocation vs retain decision |
| G | `notes/02_design/2026-03-25_strategy_domain_schema.md` | design | relocation candidate / retain | `notes/80_future/design/2026-03-25_strategy_domain_schema.md` or retain | not done | relocation vs retain decision |

---

## item A: inbox web digest

### source

`notes/00_inbox/2026-03-23_inbox_web_digest.md`

### current routing type

archive

### reason

- already digest-like source
- chunk / theme 分解済み
- source_ref が analysis note に残っている
- major chunks are already routed to design / future / archive decisions
- pending 理由を1文で説明できない

### current rule judgement

clear archive decision.

routing session 内で archive move してよい。

### destination

`notes/99_archive/00_inbox/2026-03-23_inbox_web_digest.md`

### physical move

not done.

### next action

`archive 判定済み inbox file を archive へ移動する` task で move する。

---

## item B: SIGNATE AI agent article

### source

`notes/00_inbox/260322_091234AIエージェントの作り方完全ガイド｜失敗しない開発5ステップと選定方法 ｜SIGNATE総研.md`

### current routing type

archive

### reason

- chunk / theme 分解済み
- design / future / content route が説明済み
- source_ref が analysis note に残っている
- AI agent 導入一般論として抽出済み
- pending 理由がない

### current rule judgement

clear archive decision.

routing session 内で archive move してよい。

### destination

`notes/99_archive/00_inbox/260322_091234AIエージェントの作り方完全ガイド｜失敗しない開発5ステップと選定方法 ｜SIGNATE総研.md`

### physical move

not done.

### next action

`archive 判定済み inbox file を archive へ移動する` task で move する。

---

## item C: ChatGPT Agent article

### source

`notes/00_inbox/ChatGPT Agent（エージェント）とは？背景や使い方を解説！.md`

### current routing type

split required / pending

### reason

- abstract agent / autonomous OS concept is reusable as design / content seed
- product-specific details, plan, limitation, feature claims are time-sensitive
- official OpenAI confirmation is required before using product-specific statements as specification or recommendation
- source should not be archived as a whole until split is complete

### split proposal

#### transform output candidate

new file candidate:

`notes/09_content/2026-05-01_ai_agent_autonomous_os_concept_seed.md`

source_ref:

- `notes/00_inbox/ChatGPT Agent（エージェント）とは？背景や使い方を解説！.md`
- `notes/08_analysis/2026-04-30_intake_routing_archive_pending_reobservation.md`

content:

- autonomous agent as OS metaphor
- tool use / planning / execution concept
- human review / security / limit awareness as article material

#### pending / future candidate

new future or issue candidate:

`ChatGPT Agent product-specific claims official source check`

scope:

- product availability
- plan limits
- feature scope
- official OpenAI help / release notes check

### physical move

not done.

### next action

`ChatGPT Agent 外部記事を抽象概念と製品仕様に分割して routing する`

---

## item D: EVE Intent API Mapping Draft

### source

`notes/02_design/2026-03-24_eve_intent_api_mapping.md`

### current routing type

relocation candidate

### reason

- file value remains high as future EVE runtime design material
- not archive: EVE runtime reflection and Todoist behavior may reuse it
- not current active design: current active focus is ADAM Phase 0 hardening / routing / operations
- future/design is more appropriate than active design layer if no immediate EVE execution is planned

### proposed destination

`notes/80_future/design/2026-03-24_eve_intent_api_mapping.md`

### relocation metadata

If relocated, add or preserve metadata:

```markdown
## routing note

- routed_at: 2026-05-01
- from: notes/02_design/2026-03-24_eve_intent_api_mapping.md
- reason: EVE runtime / Todoist intent mapping is valuable, but current active phase is ADAM routing / operations hardening.
- recheck: EVE runtime reflection / EVE Todoist behavior confirmation
```

### physical move

not done.

### next action

Relocation can be handled in a dedicated design relocation task or weekly routing session.

---

## item E: notes delete API draft

### source

`notes/02_design/2026-03-24_notes_delete_api_draft.md`

### current routing type

archive candidate

### reason

- likely superseded by current repoResourceWrite delete behavior
- old path structure appears in draft
- delete semantics are safety-critical
- archive should not happen until docs / schema / runtime diff is confirmed

### proposed destination after confirmation

`notes/99_archive/02_design/2026-03-24_notes_delete_api_draft.md`

### physical move

not done.

### next action

`notes delete API draft と current repoResourceWrite delete semantics の差分を確認する`

---

## item F: Strategy API and Tasks API Boundary Design

### source

`notes/02_design/2026-03-25_strategy_api_and_tasks_boundary.md`

### current routing type

relocation candidate / retain

### reason

- design is valuable for future Strategy Domain / projection architecture
- not archive
- may conflict with current operations model if treated as current design
- future/design may be more accurate if Strategy Domain is not current phase
- retain is also possible if this remains a reference for current projection boundaries

### proposed destination if relocated

`notes/80_future/design/2026-03-25_strategy_api_and_tasks_boundary.md`

### relocation metadata

```markdown
## routing note

- routed_at: 2026-05-01
- from: notes/02_design/2026-03-25_strategy_api_and_tasks_boundary.md
- reason: Strategy API / Tasks API boundary is future architecture material and should be revisited when Strategy Domain returns to scope.
- recheck: Phase 1+ Strategy Domain / projection redesign
```

### current decision

review wait.

Do not move immediately because this note may still inform Todoist projection and SSOT / projection separation.

---

## item G: Strategy Domain Schema Design

### source

`notes/02_design/2026-03-25_strategy_domain_schema.md`

### current routing type

relocation candidate / retain

### reason

- design is valuable for future domain / projection architecture
- not archive
- current operations model is active_operations based, not Strategy Domain based
- moving to future/design is likely correct, but should be paired with item F

### proposed destination if relocated

`notes/80_future/design/2026-03-25_strategy_domain_schema.md`

### relocation metadata

```markdown
## routing note

- routed_at: 2026-05-01
- from: notes/02_design/2026-03-25_strategy_domain_schema.md
- reason: Strategy Domain schema is future architecture material and should be revisited with Strategy API / projection redesign.
- recheck: Phase 1+ Strategy Domain / projection redesign
```

### current decision

review wait.

Do not move separately from item F.

---

## physical move status

### move now candidate

These can be moved by a dedicated archive move task:

1. `notes/00_inbox/2026-03-23_inbox_web_digest.md`
2. `notes/00_inbox/260322_091234AIエージェントの作り方完全ガイド｜失敗しない開発5ステップと選定方法 ｜SIGNATE総研.md`

### split before move

1. `notes/00_inbox/ChatGPT Agent（エージェント）とは？背景や使い方を解説！.md`

### diff check before archive

1. `notes/02_design/2026-03-24_notes_delete_api_draft.md`

### relocation review wait

1. `notes/02_design/2026-03-24_eve_intent_api_mapping.md`
2. `notes/02_design/2026-03-25_strategy_api_and_tasks_boundary.md`
3. `notes/02_design/2026-03-25_strategy_domain_schema.md`

---

## completed condition

対象 task:

`archive 判定済み未移動一覧を current rule に合わせて作る`

completed condition:

- archive decision / archive candidate / pending / relocation / retain を分ける
- physical move 済み / 未済みを分ける
- move すべきもの、retain すべきもの、review 待ちを分ける
- archive 先を同等 layer 構造で提案する
- この task で移動するか、別 file move task に送るか判断する

対応:

- archive / archive candidate / pending / split required / relocation candidate / retain を分けた。
- direct read で対象が元 layer に残っていることを確認した。
- physical move はすべて not done と明示した。
- move now candidate と review wait を分けた。
- archive destination は `notes/99_archive/<same-layer>/...` 原則で提案した。
- この task では move せず、別 archive move / split / diff check / relocation task に送ると判断した。

---

## judgment

Current clear archive move targets are two inbox files:

1. `notes/00_inbox/2026-03-23_inbox_web_digest.md`
2. `notes/00_inbox/260322_091234AIエージェントの作り方完全ガイド｜失敗しない開発5ステップと選定方法 ｜SIGNATE総研.md`

The ChatGPT Agent external article should be split before archive.

The notes delete API draft should not be archived until current docs / schema / runtime diff is confirmed.

The EVE intent mapping and Strategy Domain design files are not archive targets. They are relocation candidates, primarily to `notes/80_future/design/`, but the Strategy pair should be moved together only after a relocation review decision.
