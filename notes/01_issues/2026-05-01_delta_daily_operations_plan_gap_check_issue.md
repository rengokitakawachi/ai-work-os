# 2026-05-01 DELTA daily operations plan-gap check issue

## title

DELTA daily operations 生成で plan-gap check が必須化されていない

## status

open

## category

DELTA / operations generation / planning integrity

## created_at

2026-05-01

## source_ref

- user analysis: DELTA 2026-05-02 daily operation proposal failure
- systems/delta/roadmap/delta_roadmap.md
- systems/delta/plan/2026_sharoushi_exam_plan.md
- systems/delta/operations/active_operations.md
- systems/delta/history/2026-05.md
- notes/02_design/2026-05-01_delta_daily_operations_plan_gap_check_design.md

---

## problem

DELTA の本来の特徴は、長期・中期計画をもとに daily operations を作ることにある。

しかし 2026-05-02 の予定提示時に、DELTA は最初に以下の甘いラインを提示した。

```text
必達ライン: 秒トレ40問 + 健康保険法 L3 Q3-4を1問でも進める
```

これは直近の疲労・実績だけを見るなら安全だが、GW 全体計画から見ると不適切だった。

GW 計画では、2026-05-02 時点で本来は健康保険法 Q9-1〜Q11最後までに入っている想定だった。

一方、実績は 2026-05-01 終了時点で健康保険法 Q3-3 までだった。

つまり大幅に遅れており、2026-05-02 は通常日ではなくリカバリー日として扱うべきだった。

---

## observed actual

### actual_as_of_2026-05-01

```yaml
L3: 健康保険法 Q3-1〜Q3-3
秒トレ: 40問完了
L1: 国民年金法 173ページまで
L2: 進捗なし
```

### plan_target_by_2026-05-02

```yaml
2026-04-29: 健康保険法 Q1-1〜Q2
2026-04-30: 健康保険法 Q3-1〜Q4途中
2026-05-01: 健康保険法 Q4残り〜Q7最後
2026-05-02: 健康保険法 Q9-1〜Q11最後
2026-05-03: 健康保険法 ×・△ 回収 → 国民年金法へ
```

### expected_judgment

```yaml
gap_status: delayed
operation_mode: recovery_required
必達: Q3-4〜Q4-5
標準: Q3-4〜Q4-10
余力: Q7の最後まで
後回し: 国民年金法 L2
```

---

## issues

### A. 直近実績だけを見て、長期・中期計画との差分を見ていない

DELTA は history の現在地を確認していたが、plan の GW 予定と照合できていなかった。

現在地 Q3-3 は 2026-05-02 前夜として大幅遅れだが、最初の提案ではこの遅れが反映されなかった。

### B. 最低ラインを心理的安全ラインとして出してしまった

DELTA は最低ラインを「疲れていても最低これだけやればゼロではない」という意味で提示した。

しかし学習 OS 上の最低ラインは、本来「計画崩壊を防ぐために最低限必要なライン」であるべき。

今回なら Q3-4 だけでは遅れを縮めず、むしろ遅れを固定化する。

### C. operations が plan から独立してしまっている

active_operations には 2026-05-02 について「健康保険法 L3 Q3以降を進める」とだけあり、具体的な到達目標が弱い。

一方 plan には「2026-05-02: 健康保険法 択一 Q9-1〜Q11最後まで」という中期目標がある。

operations が plan の具体到達地点を参照していないため、daily action が「今日やること」だけになり、計画全体との接続が弱くなった。

### D. 差分検知が出力前の必須チェックになっていない

DELTA は plan / operations / history を読むことはできている。

しかし、次アクション提示前に必ず以下を計算するルールがない。

- plan 上の今日時点の期待到達点
- history 上の現在地
- 遅れ幅
- 明日の必要リカバリー量
- 最低ラインが遅れを縮めるかどうか

---

## root cause

Daily operations generator が「逆算型」ではなく「直近反応型」になっている。

現在の挙動:

```text
直近実績を見る
→ 明日できそうなことを出す
→ 最低・標準・余力を作る
```

本来の挙動:

```text
長期目標を見る
→ 中期計画を見る
→ 今日時点の期待到達点を見る
→ 実績との差分を見る
→ 遅れを判定する
→ 明日の必要到達点を逆算する
→ 最低・標準・余力を作る
```

---

## requested fix

DELTA daily operations generation を次のように修正する。

1. daily operations 生成前に roadmap / plan / operations / latest history を必ず読む
2. plan 上の期待到達点と history 上の現在地を比較する
3. `gap_status` を `ahead / on_track / delayed / critical_delay` で判定する
4. `delayed` 以上なら `operation_mode` を `recovery_required` にする
5. 必達ラインは `survival_line` ではなく `plan_minimum_line` を提示する
6. active_operations の各 Day に `plan_anchor / actual_position / gap_status / recovery_required` を持たせる
7. 提示する必達ラインが遅れを縮めない場合は、甘い判断として自動で引き上げる
8. 明日の予定出力テンプレートに「現在地 / 計画上の本来位置 / 差分 / 方針 / 必達 / 標準 / 余力 / 後回し」を必須化する

---

## expected behavior

2026-05-01 終了時点のように、plan では 2026-05-02 に Q9-1〜Q11最後、actual では Q3-3 の場合、DELTA は以下を出す。

```yaml
gap_status: delayed
operation_mode: recovery_required
必達: Q3-4〜Q4-5
標準: Q3-4〜Q4-10
余力: Q7の最後まで
後回し: 国民年金法 L2
```

---

## completed_condition

- DELTA daily operations generation の current implementation / prompt / instruction / operations schema を確認する
- roadmap / plan / active_operations / latest history の read が生成前必須になっているか確認する
- plan target と actual position の gap 判定手順を設計する
- `survival_line` と `plan_minimum_line` を分離する
- `gap_status` / `operation_mode` / `recovery_required` の enum または構造を定義する
- active_operations に `plan_anchor / actual_position / gap_status / recovery_required` を持たせるか判断する
- 出力テンプレートを固定する
- 甘い判断検知 rule を定義する
- 必要なら DELTA instruction / knowledge / schema / operations generation code へ反映する
- runtime behavior confirmation で、同種ケースに対して recovery_required が出ることを確認する

---

## placement judgment

これは active 外の新規 issue であり、即実行しない。

ただし DELTA operations の根幹品質に関わるため、次回 operations rolling で `DELTA foundation` / `DELTA v0.6 operations projection` より前に置くか優先度比較する。
