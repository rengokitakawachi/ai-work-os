# 2026-04-28 Phase 0 remaining inventory before Phase 1

## 結論

Phase 1 Todoist / Outlook foundation へ進むことを止める blocker は、現時点ではない。

ただし、Phase 0 の残件はゼロではない。

残件は次の2種類に分ける。

1. Phase 1 開始前に必須ではないが、近く処理すべき docs / operations 整合残件
2. Phase 1 と並行して継続観測すべき operating model 残件

---

## Phase 0 で完了した foundation

### Repo / branch / runtime foundation

- repoResource branch selector
  - main code 確認済み
  - repo schema / runtime-visible schema 確認済み
  - explicit read / write behavior 確認済み

- repoResource branch create
  - runtime-visible schema 確認済み
  - actual branch create behavior 確認済み
  - created branch read-back 確認済み
  - docs/10 反映済み

- ATLAS minimum test workflow
  - `.nvmrc` 作成済み
  - `.github/workflows/test.yml` 作成済み
  - GitHub token に workflow scope 追加済み
  - workflow file read-back 済み

- repoResource bulk files separator
  - comma / newline 両対応実装済み
  - main / feature branch 反映済み
  - runtime-visible behavior 観測済み
  - docs/10 反映済み

### Delta pre-Phase1 detour

- `systems/delta/` MVP resource layout 作成済み
- delta roadmap / plan / operations 作成済み
- delta learning history daily log template 作成済み
- `systems/delta/` code write allowlist 最小追加済み

---

## Phase 1 を止める blocker 判定

### blocker: none

Phase 1 Todoist / Outlook foundation の開始条件は、次の plan 完了条件に向けて作業できる状態である。

- Todoist からタスク一覧を取得できる
- タスクの基本属性を参照できる
- Outlook から予定表を取得できる
- 既存予定から空き時間候補を判定できる
- 次 plan の schedule proposal に進める

現時点で、これらに入る前に必須となる Phase 0 blocker は見当たらない。

branch / test / docs reflection / bulk read / delta detour は、Phase 1 着手を止めない状態まで解消済みである。

---

## Phase 0 残件: 近く処理すべきもの

### 1. docs/05_roadmap.md への Phase 0 位置づけ反映案

Current source:

- notes/02_design/2026-04-25_phase0_positioning_in_roadmap.md
- notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md
- docs/05_roadmap.md

判断:

- Phase 1 開始を止める blocker ではない
- ただし、Phase 0 が common operating model foundation であったことを docs/05 に反映する価値が高い
- docs 直更新ではなく、docs/05 reflection draft を作るのが正しい

Placement:

- next_operations に維持
- Phase 1 着手前または Phase 1 初期に実行してよい

### 2. legacy Todoist wrapper 削除前 gate

Current source:

- notes/02_design/2026-04-18_legacy_todoist_wrapper_deprecation_design.md
- src/services/todoist.js
- src/services/todoist/client.js
- src/services/tasks/service.js
- src/services/tasks/projection.js

判断:

- Phase 1 で Todoist foundation に進むなら、近いうちに再確認が必要
- ただし即削除しない
- usage 確認、参照移行要否、test 結果を gate とする

Placement:

- next_operations に維持
- Phase 1 Todoist foundation の直前または初期 task に近い

---

## Phase 0 残件: 継続観測でよいもの

### 1. issue routing completed condition の weekly review 向け整理

判断:

- Phase 0 operating model の品質向上 task
- Phase 1 を止める blocker ではない
- weekly review で Phase 0 の実運用効果を見るための整理として扱う

Placement:

- next_operations に維持

### 2. ADAM / EVE instruction 再層化後の runtime 反映確認

判断:

- repo 更新と runtime 反映を区別するために必要
- Phase 1 を止める blocker ではない
- EVE runtime 側の確認は、EVE 実行系に入る前後で行う価値がある

Placement:

- next_operations に維持

### 3. intake routing の archive / pending 後処理を実データで再観測

判断:

- operating model の継続観測 task
- Phase 1 を止める blocker ではない

Placement:

- next_operations に維持

---

## Phase 1 entry candidate

次に active へ入れる候補として自然なのは次。

```text
Todoist 一覧取得 API の現状確認と Phase 1 foundation の実装入口を決める
```

理由:

- Phase 1 plan の最初の完了条件は Todoist task list retrieval である
- Outlook は外部 API / 認証設計が絡むため、先に Todoist 側の現状確認を行う方が安全
- ADAM には既に Todoist projection 実績があるため、既存 implementation / wrapper / task service の境界確認から入れる

ただし、直前に `legacy Todoist wrapper 削除前 gate` を吸収して、Todoist foundation の入口 task として扱ってよい。

---

## 推奨判断

Phase 1 へ進む。

ただし Phase 1 の最初の task は、実装直行ではなく、次の確認を含める。

- 現 Todoist service / task service / projection の境界確認
- legacy Todoist wrapper の usage 確認
- Phase 1 で使う Todoist list API の SSOT / implementation / test の確認
- Outlook 読取に入る前の Todoist foundation scope 固定

このため、次の active 候補は次がよい。

```text
Phase 1 Todoist foundation entry: Todoist service 境界と一覧取得 API を確認する
```

---

## Source references

- notes/04_operations/active_operations.md
- notes/04_operations/next_operations.md
- notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md
- notes/03_plan/2026-04_phase1_todoist_outlook_foundation.md
