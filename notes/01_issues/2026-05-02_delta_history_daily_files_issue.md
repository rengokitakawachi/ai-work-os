# 2026-05-02 DELTA history daily files issue

## title

DELTA history が月次単一ファイルのままで、L3 問題単位記録と daily review 運用に対して重くなっている

## status

open

## category

DELTA / history / storage model / daily review / L3 recording

## created_at

2026-05-02

## source_ref

- user request: DELTA history 日次ファイル化の検討・改良依頼
- notes/02_design/2026-05-02_delta_v0_6_integrated_operations_upgrade.md
- notes/02_design/2026-05-01_delta_daily_operations_plan_gap_check_design.md
- notes/02_design/2026-05-02_delta_progress_granularity_rule_design.md
- notes/02_design/2026-05-02_delta_recommended_line_generation_design.md
- systems/delta/history/2026-05.md
- systems/delta/operations/active_operations.md

---

## problem

現在、DELTA history は `systems/delta/history/YYYY-MM.md` の月次ファイルに、1日1セクションで記録している。

しかし L3 過去問演習では、1問ごとに正誤・理解度評価・実測時間を記録するため、月次ファイルを毎回 read / write する処理が重くなっている。

月次ファイルが肥大化すると、1問の記録でも月全体を更新することになり、速度・衝突・破損リスクが上がる。

---

## impacts

- L3 の 1問記録ごとに月次 history 全体を read / write している
- 月末に近づくほどファイルが肥大化する
- 1問単位の更新に対して処理が重い
- 更新失敗時の影響範囲が月全体になる
- 日次レビュー中心の DELTA 運用と、月次単一ファイルが噛み合っていない
- plan-gap check / progress granularity の入力正本が重くなり、v0.6 の運用精度と速度に影響する

---

## requested fix

history の一次記録を月次ファイルから日次ファイルへ変更する。

Recommended structure:

- `systems/delta/history/daily/2026-05-02.md`
- `systems/delta/history/monthly/2026-05.md`
- `systems/delta/review/weekly/2026-W18.md`
- `systems/delta/review/monthly/2026-05.md`

---

## responsibility split

### daily history

日次実績の正本。

Records:

- L1 実績
- L2 実績
- L3 問題番号別実績
- 秒トレ実績
- 勉強時間
- 当日の判断
- 当日の次アクション
- DELTA_META

### monthly history

月次集約ビュー。

Records:

- 日別サマリー
- 科目別進捗
- L3 進捗一覧
- 弱点集約
- 月次レビューへのリンク

Monthly history is not the primary source of truth. It is generated or updated from daily history.

### review

判断の正本。

Records:

- 週次レビュー
- 月次レビュー
- 遅れ判断
- 計画修正判断
- operations 変更理由

---

## expected behavior

User sends:

- `4-2 不正解 × 2:15`

DELTA updates only:

- `systems/delta/history/daily/2026-05-02.md`

DELTA does not update the full monthly history for one question record.

At daily close, weekly review, or monthly review, DELTA may generate or update monthly summary from daily history.

---

## API improvement candidates

Potential actions:

- `read_daily_history`
- `update_daily_history`
- `append_daily_event`
- `read_monthly_summary`
- `rebuild_monthly_summary`
- `replace_date_section`

These may be implemented as dedicated DELTA actions or as profile / path conventions over existing repoResource actions.

---

## write scope

Allowed write scope:

- `systems/delta/history/daily/*.md`
- `systems/delta/history/monthly/*.md`
- `systems/delta/review/weekly/*.md`
- `systems/delta/review/monthly/*.md`
- `systems/delta/operations/active_operations.md`

Important:

- actual performance records are not written to operations
- operations is the source of truth for next actions, not performance history

---

## migration proposal

1. Keep existing `systems/delta/history/2026-05.md`
2. From 2026-05-02 onward, split into daily files
3. Treat existing monthly file as monthly summary
4. Update DELTA instructions so daily history is primary source of truth
5. Monthly summary is rebuildable from daily history

---

## completed_condition

- daily history vs monthly summary responsibility split is defined
- review responsibility is separated from history
- migration path from `systems/delta/history/YYYY-MM.md` to `systems/delta/history/daily/YYYY-MM-DD.md` is defined
- write scope is defined
- actual performance records are explicitly forbidden from operations
- API / action / repoResource path strategy is evaluated
- v0.6 scope inclusion is judged
- DELTA instruction / knowledge / schema / operations generation / runtime confirmation impact is identified

---

## placement judgment

This should be considered part of DELTA v0.6 Integrated Operations Upgrade.

Reason:

- v0.6 requires accurate and lightweight plan-gap check and progress granularity
- daily history is the input source for current position
- if history remains monthly-only, L3 one-question updates stay slow and risky
- daily history supports daily review generated recommended_lines

However, physical migration can be phased inside v0.6 after defining schema and write conventions.
