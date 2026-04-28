# Delta Daily Log Template

## Purpose

Delta の日次学習ログを記録するための再利用 template。

月次ログ `systems/delta/history/YYYY-MM.md` に貼り付けて使用する。

---

## Template

```yaml
date: YYYY-MM-DD
day_type: weekday | weekend | holiday | exception
planned_tasks:
  - task:
    source_ref:
actual_results:
  - subject:
    topic:
    material:
    study_type: L1 | L2 | L3 | 秒トレ | review | other
    planned_scope:
    actual_scope:
    minutes:
    result: complete | partial | skipped
    comprehension: high | medium | low | unknown
    quiz_score:
    weak_points:
      -
    next_review_date:
notes:
  energy:
  blockers:
  adjustments:
judgment:
  status: on_track | slight_delay | delay | overdone
  reason:
next_action:
  - task:
    source_ref:
source_ref:
  - systems/delta/plan/2026_sharoushi_exam_plan.md
  - systems/delta/operations/active_operations.md
```

---

## Field guide

### date

学習日。

### day_type

平日、土日祝、例外日を区別する。

### planned_tasks

その日に予定されていた学習 task。

### actual_results

実績。L1 / L2 / L3 / 秒トレを分けて書く。

### result

- complete: 予定範囲を完了
- partial: 一部完了
- skipped: 未実施

### comprehension

- high: 迷いなく説明できる
- medium: 問題演習は可能だが不安が残る
- low: 再学習が必要
- unknown: 未評価

### weak_points

復習や次回 operations に接続できる粒度で書く。

### judgment

当日の結果が計画に対してどうだったかを短く判断する。

### next_action

翌日または次回 review で扱う行動。
