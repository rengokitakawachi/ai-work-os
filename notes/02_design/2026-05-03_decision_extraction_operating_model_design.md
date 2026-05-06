# decision extraction operating model design

## date

2026-05-03

## purpose

EVE 前提の decision 抽出履歴モデルを、ADAM で先行試験するための 1テーマ design として整理する。

## source issue

- `20260408-011` EVE 前提の decision 抽出履歴モデルを ADAM で先行試験する必要がある

## source refs

- `notes/02_design/2026-05-03_issue_routing_design_candidate_disposition.md`
- `notes/05_decisions/README.md`
- `docs/15_notes_system.md`
- `docs/17_operations_system.md`

## problem

一般業務では、後から「なぜその判断になったか」「どの前提に基づいたか」「代替案は何だったか」を追えることが重要である。

現在の ADAM では、docs / design / operations / reports / handover などに判断が分散しやすく、意思決定だけを後から抽出する運用が弱い。

EVE に展開する前に、ADAM で最小の decision extraction operating model を試験する必要がある。

## design direction

### 1. decision layer の役割

`notes/05_decisions/` は、会話や作業の全文ログではなく、後から再利用すべき重要判断を抽出する layer とする。

対象は以下。

- 正本構造に関わる判断
- execution / projection / SSOT の境界判断
- issue / design / operations の route 判断
- 仕様変更または instruction 反映が必要な判断
- 将来 EVE に再利用できる operating model 判断

### 2. decision entry の最小項目

- decision_id
- date
- title
- decision
- context
- alternatives_considered
- rationale
- consequences
- source_ref
- follow_up

### 3. extraction timing

decision extraction は、毎回自動で行うものではない。

候補タイミングは以下。

- daily review
- weekly review
- major routing closure
- docs update judgment
- schema / runtime reflection task completion
- handover 作成時

### 4. relation to reports

report は日次・週次の経過記録であり、decision は再利用可能な判断単位である。

report に書かれた判断のうち、将来参照価値が高いものだけ decision に抽出する。

### 5. relation to docs

決定が仕様化された場合、docs が SSOT になる。

その場合 decision は、仕様になった理由・背景・代替案を保持する補助情報となる。

## non-goals

- 会話の全判断をすべて decision 化すること
- report の代替にすること
- docs SSOT を decision に置き換えること
- operations の実行順を decision から決めること

## initial trial cases

ADAM で試験するなら、以下が候補。

- issue は月別分割ではなく 1ファイル運用 + 定期 routing で軽量化する
- Todoist は operations の projection であり正本ではない
- handover は restart entry point であり execution SSOT ではない
- repo schema / runtime-visible schema / actual behavior を区別する

## completed condition for future task

- `notes/05_decisions/` の current structure を確認する
- decision entry template を作る
- 既存の重要判断から 1〜3 件を試験的に抽出する
- docs / reports / operations との source_ref 関係を確認する
- EVE に転用できるか評価する
