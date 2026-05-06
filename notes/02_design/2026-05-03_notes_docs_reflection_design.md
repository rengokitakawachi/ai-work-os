# notes docs reflection design

## date

2026-05-03

## purpose

notes 構造、docs 反映、reports / content extraction、routing / review terminology の反映判断を、1テーマ design として整理する。

## source issues

- `20260326-003` notesフォルダ構造の責務ベース整理の必要性
- `20260402-001` 新しいnotes構造と日報時のcontent抽出運用をinstructionとdocsへ反映する必要がある
- `20260404-004` docs/15_notes_system.md と docs/16_operations_system.md の operations 定義差を解消する必要がある
- `20260404-005` notes/design に残る intake review など旧用語を routing / review 分離モデルへ統一する必要がある

## source refs

- `notes/02_design/2026-05-03_issue_routing_design_candidate_disposition.md`
- `docs/15_notes_system.md`
- `docs/17_operations_system.md`
- `notes/02_design/2026-04-12_intake_and_issue_routing_minimum_roles.md`
- `notes/02_design/2026-04-12_review_system_and_operations_rolling_connection.md`

## problem

notes 構造、routing / review 用語、operations の説明、reports / content extraction の扱いが、docs / design / instruction の間で部分的にずれうる。

特に以下が論点である。

- notes は責務ベース構造として説明されているか
- issue routing / intake routing / review / operations rolling の境界が docs に反映されているか
- operations の active / next / archive / projection の説明が古いまま残っていないか
- daily report と content extraction の接続が docs/instruction 上で混線していないか
- stale design に残る旧 terminology をどう扱うか

## design direction

### 1. docs が SSOT

最終的な仕様判断は docs に反映する。

notes/design は検討・草案・補助情報であり、docs 反映後は source_ref として扱う。

### 2. notes structure reflection

`docs/15_notes_system.md` は notes の責務構造を説明する中心 docs とする。

反映候補:

- `00_inbox`: 未整理入力
- `01_issues`: routing 前の中間 issue layer
- `02_design`: design / design candidate / disposition
- `03_plan`: 中期計画
- `04_operations`: active / next execution planning
- `05_decisions`: reusable decision log
- `06_handover`: restart entry point
- `07_reports`: daily / weekly / monthly review output
- `08_analysis`: analysis / evidence / fixture result
- `09_content`: externalization / article draft candidate
- `80_future`: future candidate
- `99_archive`: role-ended material

### 3. routing / review terminology

旧 `intake review` のような用語は、次に整理する。

- 未整理入力の保存先判定: `intake routing`
- issue の再配置: `issue routing`
- 進行中資産の見直し: `review`
- active / next の再構成: `operations rolling`

### 4. content extraction

content extraction は daily report の必須処理ではない。

reports の中で外部化価値があるものを見つけた場合に、`09_content` へ候補化する。

ただし content は execution SSOT ではなく、価値化 layer とする。

### 5. docs update handling

docs update は、部分差分ではなく対象 docs の complete proposed content を提示する。

更新後は sha 確認が必要。

## connected active task

この design は active Day4 の以下 task に接続する。

- `docs/15 / docs/17 に routing core / weekly routing session を反映するか判断する`

## non-goals

- 今この design 内で docs 全文を更新すること
- stale design を一括削除すること
- reports と content を同一 layer にすること
- issue routing と review を同じ usecase に戻すこと

## completed condition for future task

- docs/15 / docs/17 を読む
- routing / review / operations rolling の現行説明との差分を列挙する
- docs 更新が必要なら complete proposed content を作る
- stale design について archive / retain / docs source_ref の判断を行う
- instruction 反映が必要なら Rule Placement Guard で判断する
