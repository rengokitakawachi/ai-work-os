# 2026-05-02 DELTA progress granularity rule issue

## title

DELTA progress granularity rule が章単位を許してしまい、page_range / question_id へ正規化できていない

## status

open

## category

DELTA / progress tracking / operations generation / plan-gap accuracy

## created_at

2026-05-02

## source_ref

- user request: DELTA progress granularity rule の改良依頼
- notes/01_issues/2026-05-01_delta_daily_operations_plan_gap_check_issue.md
- notes/02_design/2026-05-01_delta_daily_operations_plan_gap_check_design.md
- systems/delta/roadmap/delta_roadmap.md
- systems/delta/plan/2026_sharoushi_exam_plan.md
- systems/delta/operations/active_operations.md
- systems/delta/history/2026-05.md
- notes/02_design/2026-05-02_delta_progress_granularity_rule_design.md

---

## problem

ユーザーは日々の報告で「7章完了」「6章まで」「3章終わり」のように、章単位で伝えることがある。

しかし、DELTA の進捗管理では章単位だけでは不十分。

- L1 / L2 / 基礎講座はページ数で管理する
- L3 / 過去問講座は問題番号で管理する

現在の DELTA は、ユーザーが章で報告した場合、そのまま「7章完了」のように記録しがちである。

---

## impact

章単位のまま記録すると、以下の問題が発生する。

- L1 / L2 の正確な到達ページが曖昧になる
- L3 の演習済み問題番号が曖昧になる
- 次回再開地点が不明確になる
- plan gap check の精度が落ちる
- operations が章単位になり、実行可能性が下がる
- 復習対象の問題番号管理が崩れる
- 週次レビュー / 月次レビューでの進捗集計が粗くなる

---

## root cause

DELTA がユーザー入力の自然表現を、内部進捗管理の SSOT 粒度へ正規化する gate を持っていない。

特に次の区別が弱い。

- user-facing input: 章単位でもよい
- internal progress record: L1 / L2 は page_range、L3 は questions / question_id が SSOT
- operations: 章だけではなく、ページ数または問題番号を含む必要がある
- plan gap check: 章番号ではなく page_range / question_id で比較する必要がある

---

## required rule

DELTA では、ユーザー入力が章単位でも、内部記録では必ず次の粒度に正規化する。

### L1 / L2 / 基礎講座

SSOT はページ数。

必須項目:

- study_type
- subject
- material
- chapter
- topic
- page_range
- actual_scope
- next_start_page
- result

例:

- study_type: L1
- subject: 国民年金法
- chapter: 7章
- topic: 遺族基礎年金
- page_range: P166〜P180
- actual_scope: 7章 遺族基礎年金 P166〜P180 完了
- next_start_page: P181

章番号・章名は補助情報。

進捗判定、再開地点、遅れ検知には page_range を使う。

### L3 / 過去問講座

SSOT は問題番号。

必須項目:

- study_type
- subject
- material
- chapter
- topic
- questions
- actual_scope
- next_question
- review_marks
- weak_points
- next_review_targets
- result

例:

- study_type: L3
- subject: 健康保険法
- chapter: 3章
- actual_scope: Q3-1〜Q3-3
- questions:
  - Q3-1
  - Q3-2
  - Q3-3
- next_question: Q3-4

章番号は補助情報。

復習対象、再開地点、遅れ検知には question_id を使う。

---

## mandatory behavior

1. ユーザーが章で報告しても、DELTA はページ数または問題番号へ変換して記録する
2. 変換できない場合は「章のみ把握・ページ数未確定」「章のみ把握・問題番号未確定」と明示する
3. 不確定なまま確定記録しない
4. L1 / L2 は page_range を必須項目にする
5. L3 は questions / question_id を必須項目にする
6. operations の task も章だけで書かず、ページ数または問題番号を併記する
7. history の actual_scope も章だけで終わらせない
8. next_action も再開地点をページ数または問題番号で出す
9. plan gap check では、章番号ではなく page_range または question_id を使う
10. review では、章単位の完了ではなく、ページ範囲 / 問題番号単位で進捗を集計する

---

## examples

### user input

- 7章完了

### expected DELTA output

- L1: 国民年金法 7章 遺族基礎年金 P166〜P180 完了
- 次回 L1: 8章 P181以降

### user input

- 3章終わり

### expected DELTA output

- L3: 健康保険法 Q3-1〜Q3-4 完了
- 次回 L3: Q4-1以降

---

## uncertainty handling

ページ範囲または問題番号が不明な場合は、推測で確定しない。

例:

- L1: 国民年金法 7章完了。ページ範囲未確定
- L3: 健康保険法 3章完了。問題番号未確定

そのうえで next_action に確認タスクを残す。

- 確認: 国民年金法 7章のページ範囲を確認する
- 確認: 健康保険法 3章の問題番号範囲を確認する

---

## markdown output problem

DELTA から ADAM へ長い依頼文を渡すとき、外側を fenced code block にした状態で、内側に yaml / text / md の fenced block を入れると、Markdown 表示が崩れる。

DELTA には、長い依頼文で nested fenced code block を使わないルールが必要。

採用形式:

- 外側だけ fenced code block を使う場合、内側に三連バッククォートを使わない
- 内側は箇条書きとインデントで表現する
- YAML 風の内容も fenced block ではなくインデント付きリストで表現する
- 長い依頼文では、見出し・箇条書き・インデントのみで表現する

---

## requested fix

DELTA / ADAM の daily operations generation に以下を組み込む。

1. ユーザー入力が章単位かどうかを判定する
2. L1 / L2 ならページ範囲へ変換する
3. L3 なら問題番号へ変換する
4. 変換できない場合は未確定として記録する
5. operations / history / next_action に章だけの表現を残さない
6. plan gap check では page_range / question_id を使う
7. 長文依頼文を出すときは、ネストした fenced code block を使わない

---

## completed_condition

- DELTA progress granularity の SSOT を study_type ごとに定義する
- L1 / L2 の page_range 必須化を instruction / knowledge / schema / operations generation のどこへ反映するか判断する
- L3 の questions / question_id 必須化を instruction / knowledge / schema / operations generation のどこへ反映するか判断する
- chapter-only input の normalization rule を定義する
- page_range / question_id へ変換できない場合の uncertainty handling を定義する
- operations / history / next_action / review / plan gap check の全出力先で章だけを禁止する rule を定義する
- nested fenced code block 禁止 rule を DELTA long-form request output rule として配置する
- 必要なら DELTA instruction / knowledge / schema / operations generator / runtime confirmation task へ反映する

---

## placement judgment

これは DELTA plan-gap check issue の補助ではなく、plan-gap check の精度を成立させる前提条件である。

既存 Day0 task `DELTA daily operations plan-gap check を instruction / knowledge / schema 反映 task に分解する` に統合して扱うべき。

単独で後回しにすると、plan-gap check が章単位の粗い比較に戻るリスクがある。
