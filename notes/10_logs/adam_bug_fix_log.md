# ADAM bug fix log

## 目的

ADAM の運用中に発生した不具合、回帰、修正、再発防止策を集約する。

このログは issue / operations / design / docs の代替ではない。

役割は、同じ失敗を繰り返さないために、
発生事象・原因・修正・残課題・次の反映先を一箇所で追えるようにすることである。

---

## 位置づけ

- layer: `notes/10_logs`
- type: bug / regression / fix record
- source of truth: no
- related SSOT:
  - docs
  - operations
  - issue
  - design
  - config / instruction

---

## 運用ルール

### 記録対象

以下を記録する。

- 以前できていたことが急にできなくなった回帰
- instruction / knowledge 圧縮や再層化で失われた挙動
- review / routing / rolling / handover / report 作成での手順漏れ
- tool call の失敗解釈ミス
- SSOT / projection / view の混同
- report / docs / operations の保存先・形式ミス
- 修正済みだが再発観測が必要なもの

### 記録しないもの

以下はここだけで完結させない。

- 実行が必要なもの
  - issue または operations candidate に送る
- 仕様化が必要なもの
  - design / docs update candidate に送る
- 長期的な改善構想
  - future へ送る

### 1 entry の基本形

```md
### YYYY-MM-DD-NNN title

status:
severity:
category:
observed_at:
reported_by:

symptom:

impact:

root_cause:

fix_applied:

remaining_risk:

recurrence_prevention:

linked_refs:

next_disposition:
```

---

## entries

### 2026-05-03-001 daily / weekly report template and filename regression

status: fixed_with_followup_issue
severity: high
category: review_report_format
observed_at: 2026-05-03
reported_by: user

symptom:

- Sunday Weekly Review Mode の daily / weekly report を保存した際、既存 report format と大きく異なる簡易 report を作成した。
- daily report の正規保存先 `notes/07_reports/daily/YYYY-MM-DD.md` を守らず、`notes/07_reports/daily/2026-05-03_daily_review.md` を作成した。
- weekly report が英語寄りで、週報としての構造が不足していた。

impact:

- review result の品質が落ちた。
- report layer の規約と保存実態がズレた。
- weekly review が report 作成だけでは完了しないという原則と、report artifact quality の区別が弱くなった。

root_cause:

- review procedure の Start Gate では procedure steps / update targets / completed condition を確認したが、report output format gate が明示されていなかった。
- `notes/07_reports/README.md` と recent reports を report 作成前に読まなかった。
- review 実行手順と report artifact 作成手順を分離できていなかった。

fix_applied:

- canonical daily report を作成した。
  - `notes/07_reports/daily/2026-05-03.md`
  - sha: `c30e6333063b1985ac119b05461d5800b61f6b42`
- canonical weekly report を作成した。
  - `notes/07_reports/weekly/2026-05-03.md`
  - sha: `1132edb075eac74706a59589d2dcaf50f07c52e7`
- 旧 daily / weekly report を superseded 化した。
  - `notes/07_reports/daily/2026-05-03_daily_review.md`
  - sha: `4d72d72736038878039665a7e2b1a6d990c10206`
  - `notes/07_reports/weekly/2026-05-03_weekly_review.md`
  - sha: `84bb59a8a5c85a11d69a1c06e82b03a6a2386671`
- `active_operations.md` の report refs を canonical report に差し替えた。
  - sha: `db148c3d038daf1eb0f2512ac95e281d999b2ee1`

remaining_risk:

- report template / recent report read gate が instruction / knowledge / operations completed condition にまだ固定されていない。
- weekly report directory は `notes/07_reports/README.md` 上では「常設運用前」とあり、docs/17 の weekly review 運用との整合更新が必要な可能性がある。

recurrence_prevention:

- report 作成前に `notes/07_reports/README.md`、template、recent report を読む gate を追加する。
- report 保存後に canonical path / language / required sections / duplicate superseded 状態を確認する。

linked_refs:

- `notes/01_issues/2026-05-03_review_report_template_gate_issue.md`
- `notes/07_reports/README.md`
- `notes/07_reports/daily/2026-05-03.md`
- `notes/07_reports/weekly/2026-05-03.md`

next_disposition:

- issue routing / operations rolling で、report template gate を instruction / knowledge / README / operations completed condition のどこに固定するか判断する。

---

### 2026-05-03-002 plan-driven discovery gap for Phase 0 routing maturity

status: captured_in_issue_and_next_operations
severity: high
category: plan_to_operations_governance
observed_at: 2026-05-03
reported_by: user

symptom:

- Phase 0 plan に intake routing / issue routing / design routing / テストシステムが重点テーマとして明記されていた。
- issue routing は運用段階に入りつつある一方、intake routing / design routing は maturity gap が残っていた。
- しかし ADAM が自律的にその差分を issue / operations candidate に落とせていなかった。

impact:

- ADAM の中核責務である「roadmap / plan と現状を比較し、課題を整理して必要 task に落とす」動きが弱くなった。
- active-first execution に寄り、plan-driven discovery が不足した。

root_cause:

- plan を candidate source として読むことと、plan の未充足テーマを issue / operations candidate 化することが別 gate として固定されていなかった。
- Phase 0 routing maturity matrix が operations 上の常設 check になっていなかった。

fix_applied:

- routing maturity gap issue を作成した。
  - `notes/01_issues/2026-05-03_routing_maturity_gap_intake_design_issue.md`
  - sha: `d9cb25985ad14b0421b45c7f454eb49d95873bf3`
- next_operations の最上位候補に以下を追加した。
  - `Phase 0 routing maturity matrix を作り、plan-driven discovery gate を整理する`
  - `notes/04_operations/next_operations.md`
  - sha: `49d44090d2e19c41418bf58e8975c7e7a405ca52`

remaining_risk:

- まだ active_operations には入っていない。
- plan-driven discovery gate は design / docs / knowledge / operations completed condition のどこに置くか未確定。

recurrence_prevention:

- weekly review / operations rolling で roadmap / plan の各重点テーマについて maturity / 未充足 completed condition / issue化要否 / operations candidate化要否 / disposition を必ず判定する。
- `Phase 0 routing maturity matrix` を作成し、routing maturity の差分を可視化する。

linked_refs:

- `notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md`
- `notes/01_issues/2026-05-03_routing_maturity_gap_intake_design_issue.md`
- `notes/04_operations/next_operations.md`

next_disposition:

- 次回 rolling で active 化を判断する。

---

### 2026-05-03-003 instruction compression may have weakened previously stable behavior

status: open
severity: high
category: instruction_compression_regression
observed_at: 2026-05-03
reported_by: user

symptom:

- 以前はできていた運用が、急にできなくなることが増えている。
- 例として、daily / weekly report template の無視が発生した。
- ADAM instruction を 8,000 字以内に収めるために切り詰めた影響で、以前の明示的 guard が失われた可能性がある。

impact:

- review / routing / operations / report 作成など、ADAM の基本運用品質が不安定になる。
- knowledge に移した手順や圧縮したルールが runtime behavior として十分に効かない可能性がある。

root_cause:

- 未確定。
- 仮説として、instruction 圧縮により always-on guard と procedure detail の境界が弱くなった可能性がある。
- knowledge に置いた procedure が、必要な場面で必ず参照されるとは限らない。

fix_applied:

- この bug fix log を作成し、回帰・不具合・修正履歴の集約場所を設けた。

remaining_risk:

- instruction / knowledge / operations completed condition のどこに再発防止 guard を置くべきか未整理。
- 圧縮により失われた具体 guard の棚卸しは未実施。

recurrence_prevention:

- ADAM instruction 圧縮後の regression inventory を作る。
- runtime behavior として必ず守るべき always-on guard を instruction に戻すか判断する。
- procedure detail は knowledge に置きつつ、各 procedure の Start Gate に first-read targets を明示する。
- 重大な guard は operations task の completed_condition にも入れる。

linked_refs:

- `config/ai/adam_instruction.md`
- `config/ai/adam_knowledge.md`
- `notes/01_issues/2026-05-03_review_report_template_gate_issue.md`
- `notes/01_issues/2026-05-03_routing_maturity_gap_intake_design_issue.md`

next_disposition:

- issue 化または existing issue への吸収を判断する。
- `ADAM instruction を GPT-5.5 向けに core / procedure / schema へ再層化する` task と接続する可能性が高い。
