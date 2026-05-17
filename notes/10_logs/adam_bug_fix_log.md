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
- branch / canonical / runtime の混同
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

### 2026-05-17-007 Bug-log omission after Todoist projection bug

status: fixed_with_monitoring
severity: high
category: bug_log_procedure / operations_rolling
observed_at: 2026-05-17
reported_by: user

symptom:

- ADAM corrected the Todoist stale due-date projection bug but did not immediately record the defect in the ADAM bug fix log.
- After ADAM later logged the Todoist projection bug, the user correctly pointed out that the failure to log it immediately was itself another bug.

impact:

- This violated `notes/10_logs/adam_bug_fix_log_operating_method.md`.
- The omission delayed recurrence-prevention tracking and weakened traceability of the original projection defect.

root_cause:

- ADAM treated the Todoist stale due-date issue as a quick projection correction and did not immediately run the bug-log procedure.
- The correction flow skipped the required sequence: detect ADAM-owned bug → fix immediate symptom → record bug log → decide monitoring / operations / docs / instruction disposition.

fix_applied:

- Created individual log:
  - `notes/10_logs/2026-05-17_adam_bug_log_omission_for_todoist_projection_bug.md`
  - sha: `8b4c92227e22b4c5779199d18f2a0c68bf6f6c2c`
- Updated this consolidated ledger with the current entry.

remaining_risk:

- ADAM may still correct small operational mistakes without logging them if the bug-log step is not treated as part of the correction completed condition.

recurrence_prevention:

- When ADAM detects or is told about an ADAM-owned defect, the correction is not complete until the bug log is created or updated.
- If the bug-log step is missed, that omission must be treated as a separate bug.

linked_refs:

- `notes/10_logs/README.md`
- `notes/10_logs/adam_bug_fix_log_operating_method.md`
- `notes/10_logs/2026-05-17_adam_bug_log_omission_for_todoist_projection_bug.md`
- `notes/10_logs/2026-05-17_adam_todoist_projection_stale_due_date.md`

next_disposition:

- fixed_with_monitoring。
- Monitor during next daily / weekly review and any ADAM-owned bug correction.

---

### 2026-05-17-006 Todoist active projection stale due date after reroute

status: fixed_with_monitoring
severity: high
category: todoist_projection / operations_rolling
observed_at: 2026-05-17
reported_by: user

symptom:

- ADAM Phase 0 priority reroute 後、Todoist に active projection task が期限切れとして残った。
- `現在の inbox を一回整理する` が 2026-05-15 のまま表示された。
- `design routing の最小 fixture を実行する` と `report template / README hardening を実行する` が 2026-05-16 のまま表示された。

impact:

- Todoist は operations の projection であるにもかかわらず、current active intent と異なる overdue view を表示した。
- ユーザーが今日やるべき task を期限切れ task として見ることになり、実行順判断を誤らせるリスクがあった。

root_cause:

- `projectTasks dry_run` が uncompleted removed-active tasks を delete 判定したため、ADAM が安全側で manual close/create/update に切り替えた。
- その際、active に残す / 新たに今日実行対象にする task の due_date を今日の日付へ正規化しなかった。
- active review / reroute 後の Todoist date normalization gate が抜けていた。

fix_applied:

- Todoist due_date を 2026-05-17 に補正した。
  - `現在の inbox を一回整理する` / `6gfxCHWgH4M8755q`
  - `design routing の最小 fixture を実行する` / `6gfxCHphWggvM2MH`
  - `report template / README hardening を実行する` / `6gfxCJ5Gmr25PvRH`
- `notes/04_operations/active_operations.md` の due_date と projection adjustment を更新した。
  - sha: `7b8f6f13dda9707282ae19360b0321be4b15ccb2`
- 個別ログを作成した。
  - `notes/10_logs/2026-05-17_adam_todoist_projection_stale_due_date.md`

remaining_risk:

- manual projection を使う場合、同じ stale due date が再発する可能性がある。
- `projectTasks` の delete / close / defer semantics は別途整理が必要。

recurrence_prevention:

- active tasks を review / reroute した場合、未完了かつ今日実行対象に残す task は今日の日付にする。
- Todoist overdue 表示が current active task に出た場合、projection defect として扱う。
- manual Todoist projection 後は due_date / Today view を確認する。
- `projectTasks dry_run` が uncompleted task removal を delete と判断した場合は apply せず、close / defer semantics を別途判断する。

linked_refs:

- `notes/10_logs/2026-05-17_adam_todoist_projection_stale_due_date.md`
- `notes/04_operations/active_operations.md`
- Todoist task `6gfxCHWgH4M8755q`
- Todoist task `6gfxCHphWggvM2MH`
- Todoist task `6gfxCJ5Gmr25PvRH`

next_disposition:

- fixed_with_monitoring。
- `tasks API 全体を execution projection 前提で再設計する` または次回 weekly review で、delete / close / defer semantics と date normalization を確認する。

---

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

---

### 2026-05-04-004 DELTA action schema canonical misidentified from main-only observation

status: corrected_with_cleanup_blocked
severity: high
category: branch_canonical_confusion
observed_at: 2026-05-04
reported_by: user

symptom:

- DELTA の Action schema canonical を確認する際、main branch の `delta` resource tree だけを見て、`systems/delta/config/delta_action_schema.yaml` が存在しないと判断した。
- 実際には `feature/atlas-pre-delta-foundation` branch に `systems/delta/config/delta_action_schema.yaml` が存在した。
- 同 branch には duplicate として `systems/delta/config/delta_action_schema_v0.6.yaml` も存在し、sha は canonical と同一だった。

impact:

- DELTA canonical schema の認識を誤った。
- active_operations と analysis note に、DELTA unversioned canonical missing という不正確な evidence を残した。
- branch / canonical / runtime を分けるべき task で、branch state を十分に確認できていなかった。

root_cause:

- main branch observation と active DELTA feature branch observation を混同した。
- DELTA が feature branch 上で進んでいることを、schema canonical 判断時の required branch check として扱わなかった。
- user が示した file name を再確認する前に、main-only observation を強く結論化した。

fix_applied:

- `feature/atlas-pre-delta-foundation` の DELTA config tree を確認した。
- canonical DELTA schema を修正確認した。
  - `systems/delta/config/delta_action_schema.yaml`
  - branch: `feature/atlas-pre-delta-foundation`
  - sha: `1c332448ef03065150a088d9b2bcfc4bc30f4e50`
- duplicate versioned file を確認した。
  - `systems/delta/config/delta_action_schema_v0.6.yaml`
  - branch: `feature/atlas-pre-delta-foundation`
  - sha: `1c332448ef03065150a088d9b2bcfc4bc30f4e50`
- analysis note を修正した。
  - `notes/08_analysis/2026-05-04_action_schema_canonical_filename_rule.md`
  - sha: `257f8ff04f69c8f8cd13db55ee7049f9a633fdd2`

remaining_risk:

- `systems/delta/config/delta_action_schema_v0.6.yaml` は duplicate だが、tool route が delete を support せず未削除。
- active_operations の completed evidence も DELTA branch observation に合わせて修正が必要。
- configured GPT reflection / runtime-visible schema / actual behavior は別途確認が必要。

recurrence_prevention:

- schema canonical 判断では branch を必ず明示する。
- main / feature branch / configured GPT / runtime-visible schema を同一視しない。
- user が具体 file 名を提示した場合、branch search / tree / direct read を先に行う。
- cleanup delete が tool 非対応の場合、削除済みとして扱わず、manual cleanup または follow-up task に送る。

linked_refs:

- `notes/08_analysis/2026-05-04_action_schema_canonical_filename_rule.md`
- `notes/04_operations/active_operations.md`
- `systems/delta/config/delta_action_schema.yaml`
- `systems/delta/config/delta_action_schema_v0.6.yaml`

next_disposition:

- active_operations の evidence を修正する。
- duplicate file cleanup は delete support または manual repo cleanup が可能になった時点で実行する。

---

### 2026-05-04-005 DELTA recovery line calibration guard missing

status: fixed_repo_config_runtime_pending
severity: high
category: delta_operations_generation_regression
observed_at: 2026-05-04
reported_by: DELTA via user

symptom:

- 2026-05-04 daily review 後の DELTA operations rolling で、2026-05-05 Day0 の国民年金法 L3 選択問題ラインが plan より甘く生成された。
- 初回生成では `standard_line` が Q15-1〜Q15-7 となり、plan 上の当日達成目標である Q15-1〜Q15-13完了が `stretch_line` に逃げた。

impact:

- `delayed_but_recovering` / `recovery_forward` 状態なのに、standard_line が plan achievement line ではなく安全側の中間ラインになった。
- roadmap / plan の回復圧力が operations に反映されにくくなった。
- DELTA が「実行可能そうな軽い計画」を出し、計画整合の標準ラインを弱めるリスクが出た。

root_cause:

- recovery 系 status / mode の時に `standard_line` を `plan_anchor.expected_position` へ一致させる制約が instruction / schema に明示されていなかった。
- `must_line` と `survival_line` の役割が曖昧で、must_line がゼロ回避寄りに落ちた。
- operations write 前に、plan target が stretch_line へ逃げていないか検証する pre-write guard が不足していた。

fix_applied:

- DELTA repo config level で修正した。
  - `systems/delta/config/delta_instruction.md`
  - branch: `feature/atlas-pre-delta-foundation`
  - sha: `6f19c48dca47d51e70da099aa9936ee11452d273`
- DELTA internal schema に構造化した。
  - `systems/delta/config/delta_schema.yaml`
  - branch: `feature/atlas-pre-delta-foundation`
  - sha: `d902f67ac188bcdba6c3a1b38a3c1dd49faac3ad`
- evidence note を作成した。
  - `notes/08_analysis/2026-05-04_delta_recovery_line_calibration_fix.md`
  - sha: `1586b7c3ab6ce534b6eec3678046d8e147198851`
- DELTA active operations の即時修正は DELTA 側で反映済みであることを read-back した。
  - `systems/delta/operations/active_operations.md`
  - branch: `feature/atlas-pre-delta-foundation`
  - sha: `635ac0b6b8b73c6a4a187a3ee60cf0114d0f5b3d`

remaining_risk:

- repo config / instruction / schema level の修正であり、configured GPT reflection / runtime-visible behavior は未確認。
- 次の DELTA runtime fixture で、同種 recovery case が正しく生成されるか確認が必要。

recurrence_prevention:

- recovery 系 status / mode では `standard_line` を plan_anchor expected_position に一致させる。
- plan expected_position を stretch_line のみに置かない。
- must_line は survival_line ではなく plan_minimum_line として扱う。
- survival_line が必要な場合は must_line と分離する。
- operations write 前に line calibration validation を実施し、不一致なら incomplete として再生成する。

linked_refs:

- `notes/08_analysis/2026-05-04_delta_recovery_line_calibration_fix.md`
- `notes/04_operations/active_operations.md`
- `systems/delta/config/delta_instruction.md`
- `systems/delta/config/delta_schema.yaml`
- `systems/delta/operations/active_operations.md`

next_disposition:

- `notes/04_operations/active_operations.md` の `DELTA write resource schema reflection gate を整理する` に runtime fixture condition として接続する。
- DELTA configured GPT reflection / runtime-visible schema / actual behavior を確認するまで runtime completed とは扱わない。
