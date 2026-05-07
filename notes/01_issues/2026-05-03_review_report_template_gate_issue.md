# 2026-05-03 review report template gate issue

## status

progressed

## category

review

## impact

high

## created_at

2026-05-03

## last_touched_at

2026-05-07

## touched_by

daily_review

## progress_note

2026-05-07 daily review again read `notes/07_reports/README.md`, recent daily reports, and docs review procedure before report creation. The gate is operating in practice. The underlying procedure/template fixation task remains open and should be addressed by `ADAM bug fix log の運用方法を notes に固定する` and later report template hardening.

## routing_hint

operations_candidate / docs_or_readme_update_candidate

## title

daily / weekly review report 作成前に template / README / recent reports を確認する gate が弱い

## background

2026-05-03 の Sunday Weekly Review Mode で、daily report と weekly report を保存した際、以下の不備が発生した。

- daily report の正規保存先 `notes/07_reports/daily/YYYY-MM-DD.md` を守らず、`2026-05-03_daily_review.md` として作成した
- weekly report が英語寄りで、既存 report format と合っていなかった
- report を review の成果物として整える前に、簡易 execution note として保存してしまった
- report 作成前に `notes/07_reports/README.md` と recent reports を読まなかった
- template の有無を確認しないまま保存した

## observed correction

以下を実施して修正した。

- canonical daily report:
  - `notes/07_reports/daily/2026-05-03.md`
  - sha: `c30e6333063b1985ac119b05461d5800b61f6b42`
- canonical weekly report:
  - `notes/07_reports/weekly/2026-05-03.md`
  - sha: `1132edb075eac74706a59589d2dcaf50f07c52e7`
- old daily report was marked superseded:
  - `notes/07_reports/daily/2026-05-03_daily_review.md`
  - sha: `4d72d72736038878039665a7e2b1a6d990c10206`
- old weekly report was marked superseded:
  - `notes/07_reports/weekly/2026-05-03_weekly_review.md`
  - sha: `84bb59a8a5c85a11d69a1c06e82b03a6a2386671`
- `active_operations.md` report refs were updated:
  - sha: `db148c3d038daf1eb0f2512ac95e281d999b2ee1`

## root cause

Review Start Gate では procedure steps / update targets / completed condition を確認したが、report output format gate が明示されていなかった。

Write Gate では保存対象と内容を示したが、report layer の README / template / recent format との照合を必須にしていなかった。

そのため、review procedure と report artifact quality を分けて扱えなかった。

## recurrence prevention candidate

次回 issue routing / operations rolling で、以下のどれを反映するか判断する。

- `notes/07_reports/README.md` に daily / weekly report format gate を追加する
- daily / weekly report template file を作成する
- ADAM knowledge の Review Procedure に report template / recent report read gate を追加する
- ADAM instruction に短い常時 guard を追加する必要があるか Rule Placement Guard で判断する
- daily / weekly review task の completed condition に report format read-back を入れる
- report 保存後に canonical path / language / required sections / superseded duplicate absence を確認する

## completed_condition

- report template / README / recent report のどれを正とするか決める
- daily report の canonical filename と required sections を固定する
- weekly report の canonical filename と required sections を固定する
- review procedure と report artifact procedure を分離して明文化する
- 必要なら docs/15 / docs/17 / notes/07_reports/README.md / ADAM knowledge の更新候補を作る
- 更新する場合は Write Gate 後に反映し、read-back sha を記録する
- 次回 daily / weekly review で gate が効いたか観測する

## source_ref

- `notes/07_reports/README.md`
- `notes/07_reports/daily/2026-05-03.md`
- `notes/07_reports/weekly/2026-05-03.md`
- `notes/04_operations/active_operations.md`
- `notes/07_reports/daily/2026-05-05.md`
- `notes/07_reports/daily/2026-05-07.md`
- `docs/15_notes_system.md`
- `docs/17_operations_system.md`
