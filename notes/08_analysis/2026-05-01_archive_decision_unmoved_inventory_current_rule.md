# 2026-05-01 archive decision unmoved inventory current rule

## 目的

routing session の current rule に基づき、archive 判定済み / relocation 候補 / pending / retain / archive candidate を再分類し、clear archive decision の物理移動結果を記録する。

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
- notes/99_archive/00_inbox/2026-03-23_inbox_web_digest.md
- notes/99_archive/00_inbox/260322_091234AIエージェントの作り方完全ガイド｜失敗しない開発5ステップと選定方法 ｜SIGNATE総研.md
- notes/00_inbox/ChatGPT Agent（エージェント）とは？背景や使い方を解説！.md
- notes/02_design/2026-03-24_eve_intent_api_mapping.md
- notes/02_design/2026-03-24_notes_delete_api_draft.md
- notes/02_design/2026-03-25_strategy_api_and_tasks_boundary.md
- notes/02_design/2026-03-25_strategy_domain_schema.md

---

## archive move execution result

### moved to archive

以下2件は archive copy 作成後、archive read-back を確認し、元 `notes/00_inbox` file を delete した。

1. `notes/00_inbox/2026-03-23_inbox_web_digest.md`
   - archive: `notes/99_archive/00_inbox/2026-03-23_inbox_web_digest.md`
   - archive sha: `b8f30d21928fe381d2c1dfe9bc2b367f6354af6c`
   - original delete status: `DELETED`
   - delete commit: `03556686007f1a499209d681021d7dc221670889`

2. `notes/00_inbox/260322_091234AIエージェントの作り方完全ガイド｜失敗しない開発5ステップと選定方法 ｜SIGNATE総研.md`
   - archive: `notes/99_archive/00_inbox/260322_091234AIエージェントの作り方完全ガイド｜失敗しない開発5ステップと選定方法 ｜SIGNATE総研.md`
   - archive sha: `e61b1eedd8da08ed174f1ced47eaac28a584482d`
   - original delete status: `DELETED`
   - delete commit: `6b3cf6b8cd7cd1359ae2b00c15607efbe4f57ddb`

### verification

Post-move verification:

- original `notes/00_inbox/2026-03-23_inbox_web_digest.md`: `NOT_FOUND`
- original `notes/00_inbox/260322_091234AIエージェントの作り方完全ガイド｜失敗しない開発5ステップと選定方法 ｜SIGNATE総研.md`: `NOT_FOUND`
- archive `notes/99_archive/00_inbox/2026-03-23_inbox_web_digest.md`: `OK`
- archive `notes/99_archive/00_inbox/260322_091234AIエージェントの作り方完全ガイド｜失敗しない開発5ステップと選定方法 ｜SIGNATE総研.md`: `OK`

### tool behavior note

`repoResourceWrite(resource=notes, action=delete)` は `file` に `notes/` prefix を付けると validation error になる。

正しい指定:

```text
00_inbox/<filename>.md
```

観測された allowed prefixes:

```text
00_inbox/
01_issues/
02_design/
03_plan/
04_operations/
05_decisions/
08_analysis/
09_content/
```

---

## current inventory summary

| id | source | current routing type | target / current state | physical move | next action |
|---|---|---|---|---|---|
| A | `notes/00_inbox/2026-03-23_inbox_web_digest.md` | archive | moved to `notes/99_archive/00_inbox/2026-03-23_inbox_web_digest.md` | done | none |
| B | `notes/00_inbox/260322_091234AIエージェントの作り方完全ガイド｜失敗しない開発5ステップと選定方法 ｜SIGNATE総研.md` | archive | moved to `notes/99_archive/00_inbox/260322_091234AIエージェントの作り方完全ガイド｜失敗しない開発5ステップと選定方法 ｜SIGNATE総研.md` | done | none |
| C | `notes/00_inbox/ChatGPT Agent（エージェント）とは？背景や使い方を解説！.md` | split required / pending | split output + pending source | not done | split routing candidate |
| D | `notes/02_design/2026-03-24_eve_intent_api_mapping.md` | relocation candidate | `notes/80_future/design/2026-03-24_eve_intent_api_mapping.md` candidate | not done | future/design relocation candidate |
| E | `notes/02_design/2026-03-24_notes_delete_api_draft.md` | archive candidate | `notes/99_archive/02_design/2026-03-24_notes_delete_api_draft.md` after diff check | not done | diff check first |
| F | `notes/02_design/2026-03-25_strategy_api_and_tasks_boundary.md` | relocation candidate / retain | `notes/80_future/design/2026-03-25_strategy_api_and_tasks_boundary.md` or retain | not done | relocation vs retain decision |
| G | `notes/02_design/2026-03-25_strategy_domain_schema.md` | relocation candidate / retain | `notes/80_future/design/2026-03-25_strategy_domain_schema.md` or retain | not done | relocation vs retain decision |

---

## remaining routing cleanup gates

### split before move

1. `notes/00_inbox/ChatGPT Agent（エージェント）とは？背景や使い方を解説！.md`

Reason:

- abstract agent / autonomous OS concept is reusable as design / content seed
- product-specific details, plan, limitation, feature claims are time-sensitive
- official OpenAI confirmation is required before using product-specific statements as specification or recommendation
- source should not be archived as a whole until split is complete

Next task candidate:

`ChatGPT Agent 外部記事を抽象概念と製品仕様に分割して routing する`

---

### diff check before archive

1. `notes/02_design/2026-03-24_notes_delete_api_draft.md`

Reason:

- likely superseded by current repoResourceWrite delete behavior
- old path structure appears in draft
- delete semantics are safety-critical
- archive should not happen until docs / schema / runtime diff is confirmed

Next task candidate:

`notes delete API draft と current repoResourceWrite delete semantics の差分を確認する`

---

### relocation review wait

1. `notes/02_design/2026-03-24_eve_intent_api_mapping.md`
2. `notes/02_design/2026-03-25_strategy_api_and_tasks_boundary.md`
3. `notes/02_design/2026-03-25_strategy_domain_schema.md`

Reason:

- these are not archive targets
- EVE intent mapping is a future EVE runtime design candidate
- Strategy pair should be relocated or retained together after relocation review

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
- clear archive decision の2件は routing closure action として physical move まで完了した。
- archive copy read-back、original delete、post-move verification を実施した。
- remaining gates を split / diff check / relocation review に分けた。

---

## judgment

Current clear archive move targets are now resolved.

Moved:

1. `notes/00_inbox/2026-03-23_inbox_web_digest.md`
2. `notes/00_inbox/260322_091234AIエージェントの作り方完全ガイド｜失敗しない開発5ステップと選定方法 ｜SIGNATE総研.md`

Remaining routing cleanup is not immediate archive move:

- ChatGPT Agent external article: split required / pending
- notes delete API draft: diff check before archive
- EVE / Strategy design files: relocation candidate / retain review
