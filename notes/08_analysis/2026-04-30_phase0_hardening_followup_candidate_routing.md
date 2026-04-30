# 2026-04-30 Phase 0 hardening follow-up candidate routing

## 目的

`Phase 0 hardening の follow-up candidate を routing する` の成果物として、Phase 0 hardening で発生した follow-up candidate を一覧化し、active / next / future / archive の行き先を決める。

また、Phase 1 Outlook foundation へ戻す条件を更新する。

---

## source_ref

- notes/02_design/2026-04-29_phase0_hardening_roadmap_reflection_draft.md
- notes/08_analysis/2026-04-28_phase0_remaining_inventory_before_phase1.md
- notes/08_analysis/2026-04-29_phase1_todoist_foundation_entry_boundary_analysis.md
- notes/03_plan/2026-04_phase1_todoist_outlook_foundation.md
- notes/08_analysis/2026-04-30_intake_routing_reobservation_return_to_operations.md
- notes/08_analysis/2026-04-30_design_routing_candidate_inventory.md
- notes/08_analysis/2026-04-30_review_routing_rolling_boundary_examples.md
- notes/04_operations/active_operations.md
- notes/04_operations/next_operations.md

---

## routing procedure 確認

routing は入力を適切な layer へ送る usecase であり、review でも execution でもない。

operations candidate の場合でも、active / next / future の配置は rolling で決める。

この task では、follow-up candidate の行き先を整理する。  
active_operations / next_operations の構造更新は行わない。

---

## 現在の前提

### active 側

active_operations には、Phase 0 hardening の主要 follow-up がすでに入っている。

この会話内で以下は完了扱い可能:

- ADAM instruction 最新変更の runtime 反映確認を行う
- repo history / show / grep の docs 反映案を作る
- issue routing completed condition の継続観測項目を weekly review 向けに整理する
- issue routing completed condition を active / next / future 判断チェックに落とす
- intake routing の archive / pending 後処理を実データで再観測する準備をする
- intake routing の archive / pending 後処理を実データで再観測する
- intake routing 再観測結果を analysis / operations 候補へ返す
- design routing の最小運用ルールを確認する
- design routing 候補を実データから棚卸しする
- daily / weekly review と routing / rolling の責務境界を実例で確認する

ただし、active_operations の構造更新や archive 移動は daily review まで保留する。

### next 側

next_operations にはすでに以下がある。

- repo history / show / grep の docs・schema・runtime reflection を完了する
- DELTA foundation を main に統合する準備をする
- ATLAS 関係ファイルを systems/atlas に集約する設計を整理する
- DELTA v0.6 operations を Todoist execution view へ投影する
- Phase 1 Outlook Calendar API の読取設計を整理する
- legacy Todoist wrapper の削除判断を Phase 1 Todoist foundation 後に行う

この routing では、重複追加を避ける。

---

## candidate routing

## candidate 1: docs/05 Phase 0 roadmap reflection

### source

- notes/02_design/2026-04-29_phase0_hardening_roadmap_reflection_draft.md

### 内容

Phase 0 は軽い準備ではなく、Phase 1 以降を支える common operating model foundation であることを docs/05 に最小反映する候補。

### routing

recommended route:

- future / docs candidate

### 理由

- roadmap reflection draft はすでに作成済み。
- docs/05 本体更新は価値があるが、Phase 1 Outlook read foundation を止める blocker ではない。
- docs update は docs procedure / full content proposal が必要。
- 現時点で active に横入りさせない。

### placement

- future candidate
- weekly review または docs review 時に再評価

---

## candidate 2: issue routing completed condition follow-up

### routing

recommended route:

- archive / completed in this thread
- continuous observation remains in weekly review

### 理由

- checklist draft は作成済み。
- active / next / future 判断チェックも作成済み。
- 単発 task としては完了扱い可能。
- ただし daily / weekly review をまたいでも運用されるかは継続観測対象。

---

## candidate 3: intake routing archive / pending follow-up

### routing

recommended route:

- main observation: archive / completed in this thread
- follow-up A: future / content candidate
- follow-up B: future

### follow-up A

`ChatGPT Agent 外部記事を抽象概念と製品仕様に分割して routing する`

理由:

- ADAM を「自律的に行動する OS」として説明する content seed 価値がある。
- 一方で製品仕様・プラン・利用制限は最新性確認が必要。
- note 記事素材としては有効だが、Phase 1 Outlook へ戻る前の blocker ではない。

### follow-up B

`intake postprocess checklist に外部記事の最新性確認項目を追加する`

理由:

- rule 本体は破綻していない。
- checklist 補強として価値はあるが、即 active 化は不要。

---

## candidate 4: design routing follow-up

### routing

recommended route:

- main observation: archive / completed in this thread
- follow-up candidates: future

### follow-up details

#### 4-A: EVE intent API mapping runtime confirmation

placement:

- future/design
- future operations candidate

#### 4-B: notes delete API draft と current repoResourceWrite delete semantics の差分確認

placement:

- future

#### 4-C: Strategy Domain と current operations / Todoist projection の責務境界を再評価する

placement:

- future/design

---

## candidate 5: review / routing / rolling boundary follow-up

### routing

recommended route:

- completed
- continuous observation in daily / weekly review

理由:

- boundary note は保存済み。
- daily review が report 作成だけではなく、operations / Todoist projection / report / content を含むことを明記した。
- routing は review の代替ではないと整理した。
- rolling は next 繰り上げではないと整理した。

---

## candidate 6: ADAM / EVE instruction 再層化後の runtime 反映確認

### routing

recommended route:

- active retain

理由:

- active_operations Day4 以降にすでに存在する。
- ADAM 側の一部はこの会話で runtime-visible schema / behavior scope が確認済み。
- EVE 側はまだ runtime reflection の最小確認 prompt / 完了条件整理が残る。
- EVE 実行系に戻る前後で確認価値がある。

---

## candidate 7: Phase 0 hardening weekly readiness review draft

### routing

recommended route:

- active retain

理由:

- active_operations にすでに存在する。
- この会話で多数の hardening task が完了扱い可能になったため、readiness review draft の価値は高い。
- daily review / weekly review の content seed 抽出にも接続する。

---

## candidate 8: Phase 1 re-entry criteria

### routing

recommended route:

- active retain

理由:

- active_operations Day6 にすでに存在する。
- Phase 1 Todoist foundation は確認済みであり、次の自然な実装候補は Outlook Calendar read foundation。
- ただし active は Phase 0 readiness / runtime reflection を経て、re-entry criteria で戻し方を明確化する順序が自然。

---

## candidate 9: Phase 1 Outlook Calendar API read design

### routing

recommended route:

- next retain

理由:

- next_operations にすでに存在する。
- Phase 1 Todoist foundation entry は完了し、Outlook read foundation へ進める状態。
- ただし Phase 0 hardening の re-entry criteria 整理後に active 化する方が安全。

---

## candidate 10: legacy Todoist wrapper deletion gate

### routing

recommended route:

- next retain

理由:

- next_operations にすでに存在する。
- deletion は usage / tests / replacement path が揃ってから判断する。
- Outlook read foundation の直前 blocker ではない。

---

## active / next / future / archive summary

### active retain

- ADAM / EVE instruction 再層化後の runtime 反映確認 task を作る
- EVE runtime reflection の最小確認プロンプトと完了条件を整理する
- Phase 0 hardening weekly readiness review draft を作る
- Phase 1 re-entry criteria を Phase 0 hardening 結果から整理する

### next retain

- Phase 1 Outlook Calendar API の読取設計を整理する
- legacy Todoist wrapper の削除判断を Phase 1 Todoist foundation 後に行う
- repo history / show / grep の docs・schema・runtime reflection を完了する
- DELTA foundation を main に統合する準備をする
- ATLAS 関係ファイルを systems/atlas に集約する設計を整理する
- DELTA v0.6 operations を Todoist execution view へ投影する

### future candidates

- docs/05 Phase 0 roadmap reflection
- ChatGPT Agent 外部記事を抽象概念と製品仕様に分割して routing する
- intake postprocess checklist に外部記事の最新性確認項目を追加する
- EVE intent API mapping runtime confirmation
- notes delete API draft と current repoResourceWrite delete semantics の差分確認
- Strategy Domain と current operations / Todoist projection の責務境界を再評価する

### archive / completed recognition

- issue routing completed condition follow-up
- intake routing archive / pending reobservation main observation
- design routing minimum rule / candidate inventory main observation
- review / routing / rolling boundary note

---

## Phase 1 Outlook へ戻す条件

### 現在の判断

Phase 1 Outlook read foundation へ戻ること自体を止める blocker はない。

Todoist foundation entry は確認済みであり、次の自然な実装候補は Outlook Calendar read foundation。

ただし、次を満たしたうえで戻るのが安全である。

### re-entry conditions

- Phase 0 hardening の主要 observation notes が保存済みである
- issue / intake / design / review boundary の completed condition が、この会話内で完了扱い可能である
- ADAM / EVE runtime reflection の残範囲が明示されている
- Phase 0 hardening weekly readiness review draft が作られている
- Phase 1 re-entry criteria note で、Outlook read foundation へ戻す判断軸が明示されている
- active_operations / next_operations の更新は daily review / reroll で行う
- Outlook read foundation は next_operations から active 化する

### Outlook read foundation の次 task 候補

`Phase 1 Outlook Calendar API の読取設計を整理する`

candidate completed condition:

- current Outlook-related code / config / docs を棚卸しする
- calendar read endpoint または missing endpoint を特定する
- required auth model を確認する
- event response shape を提案する
- free/busy calculation prerequisites を列挙する
- 次の implementation task を routing する

---

## next_operations へ即書き込むか

現時点では書き込まない。

理由:

- この task は routing であり、rolling ではない。
- 既存 next_operations に主要候補はすでに存在する。
- 新規候補は future candidate として analysis に残せば足りる。
- active / next / future の構造更新は daily review / reroll で行う。

---

## completed condition 対応

対象 task:

`Phase 0 hardening の follow-up candidate を routing する`

completed condition:

- hardening で発生した候補を一覧化する
- active / next / future / archive の行き先を決める
- Phase 1 Outlook へ戻す条件を更新する

対応:

- Phase 0 hardening follow-up candidate を10件整理した。
- active retain / next retain / future / archive-completed recognition に分類した。
- Phase 1 Outlook read foundation へ戻す条件を更新した。
- next_operations への即書き込みは行わず、daily review / reroll へ渡すと判断した。

---

## 判断

`Phase 0 hardening の follow-up candidate を routing する` は、この note の保存により完了扱い可能。

次に進むべき active task は、`ADAM / EVE instruction 再層化後の runtime 反映確認 task を作る`。
