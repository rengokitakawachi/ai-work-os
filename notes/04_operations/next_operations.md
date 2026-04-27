# next_operations

## 概要

active_operations に入らなかった上位候補を保持する。

`next_operations` は、
7日ローリングの `active_operations` に入らなかったが、
近い将来に進める前提の task を置くレイヤーとする。

---

## 再評価結果（2026-04-27 branch/version policy reroll）

### active へ移した task

- `repoResource branch selector の設計 / 差分案を作る`
- `ATLAS testing system の最小方針を固定する`
- `repoResourceGet bulk の files 区切り仕様を branch selector 後に実装する`
- `GitHub Actions / ATLAS test workflow の最小差分を作る`
- `docs と code / operations 実態の差分を棚卸しする`
- `docs 反映案を delta 前環境整備として作る`
- `delta MVP resource layout を作る`

理由

- `Docs-aligned main / Notes-driven branch / Versioned merge` model を採用した
- bulk 実装も code change であり、branch selector の設計なしに main 直書きへ戻すべきではない
- versioning は merge 境界の問題として docs / code / operations 整合と一緒に扱う

---

## タスク

- task: delta 社労士試験向け initial roadmap / plan / operations を作る
  source_ref:
    - notes/02_design/2026-04-27_delta_learning_system_fast_track_architecture.md
  why_now:
    - delta resource layout の次に、2026-08-23 から逆算した実運用開始可能な roadmap / plan / operations が必要である
  notes:
    - 初期 roadmap、2026_sharoushi_exam_plan、delta active_operations の最小草案を作る
    - 最初は API 完成を待たず GitHub markdown と ChatGPT UI の手動運用を前提にする
    - delta MVP resource layout 完了後に active へ戻す
  external:
    todoist_task_id: 6gVFwG4QgQgQ2HJq

- task: delta learning history daily log template を作る
  source_ref:
    - notes/02_design/2026-04-27_delta_learning_system_fast_track_architecture.md
  why_now:
    - delta は学習履歴を GitHub に保存する前提であり、日次ログ template がないと実運用を開始しにくい
  notes:
    - date / subject / topic / material / minutes / study_type / result / comprehension / quiz_score / weak_points / next_review_date / source_ref を含める
    - delta resource layout / initial roadmap の後に active へ戻す
  external:
    todoist_task_id: 6gVFwG9QGC326H4H

- task: Phase 1 Todoist / Outlook foundation へ進む前の Phase 0 残件を棚卸しする
  source_ref:
    - notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md
    - notes/03_plan/2026-04_phase1_todoist_outlook_foundation.md
    - notes/04_operations/active_operations.md
    - notes/04_operations/next_operations.md
  why_now:
    - ATLAS / branch selector / versioning / bulk / docs 整合 / delta を含めて Phase 0 / Phase 1 の境界が変わったため、残件と移行条件の棚卸しが必要である
  notes:
    - active の delta 前環境整備が一段落した後に実行する
  external:
    todoist_task_id: 6gRrVj47fCPCq8gH

- task: docs/05_roadmap.md への Phase 0 位置づけ反映案を作る
  source_ref:
    - notes/02_design/2026-04-25_phase0_positioning_in_roadmap.md
    - notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md
    - docs/05_roadmap.md
  why_now:
    - Phase 0 の foundation 位置づけは design に整理済みで、docs 反映案へ進める価値がある
    - ただし delta 前環境整備の docs 反映案と統合して扱う方が安全である
  notes:
    - docs 直更新ではなく、差分案を先に作る
    - active Day3 の docs 反映案 task と統合される可能性がある

- task: legacy Todoist wrapper の削除前 gate を repo 全体で再確認する
  source_ref:
    - notes/02_design/2026-04-18_legacy_todoist_wrapper_deprecation_design.md
    - src/services/todoist.js
    - src/services/todoist/client.js
    - src/services/tasks/service.js
    - src/services/tasks/projection.js
  why_now:
    - deprecated 化の段取りは整理済みだが、削除前には repo 全体 usage と test gate の再確認が必要である
  notes:
    - 今回も即削除しない
    - usage 確認、参照移行要否、test 結果を削除判断の gate とする
    - ATLAS test workflow 整備後に実行する方が安全である

- task: issue routing completed condition の継続観測項目を weekly review 向けに整理する
  source_ref:
    - notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md
    - notes/08_analysis/2026-04-21_issue_routing_operations_candidate_rolling_connection_observation.md
    - notes/08_analysis/2026-04-21_issue_routing_keep_future_archive_operational_validity.md
  why_now:
    - issue routing の completed condition は plan / operations に返したが、単発確認と継続確認を分ける必要がある
    - weekly review で Phase 0 の進捗判断へ返せる形に整理しておく価値がある
  notes:
    - 単発確認済みの項目と、継続観測が必要な項目を分ける

- task: ADAM / EVE instruction 再層化後の runtime 反映確認 task を作る
  source_ref:
    - notes/02_design/2026-04-26_adam_eve_instruction_schema_layering.md
    - config/ai/adam_instruction.md
    - config/ai/eve_instruction.md
    - config/ai/adam_knowledge.md
    - config/ai/eve_knowledge.md
    - config/ai/adam_schema.yaml
    - config/ai/eve_schema.yaml
  why_now:
    - instruction / knowledge 再層化は repo 更新だけでは完了しないため、ADAM / EVE それぞれの runtime 反映確認を後段 task として分ける必要がある
  notes:
    - completed condition は runtime 上で新 instruction / knowledge / schema scope が観測できること
    - ADAM と EVE は別 runtime として確認する

- task: intake routing の archive / pending 後処理を実データで再観測する
  source_ref:
    - notes/02_design/2026-04-26_intake_inbox_postprocess_general_rule.md
    - notes/02_design/intake_review_and_source_ref_spec.md
  why_now:
    - 一般化した rule が、pending_tasks 以外でも破綻しないかを確認する必要がある
  notes:
    - 単発確認ではなく、継続観測 task として扱う

---

## ルール

- active に入らなかった上位候補を置く
- task / source_ref を必須とする
- why_now / notes / due_date / due_type は必要に応じて持つ
- next は active の次に来る候補プールとして扱う
- 必要に応じて target_date や rolling_day を持ってよい
- daily / weekly review で再評価する
- active_operations に入る前提のものだけを置く
- 会話中に新規候補が発生した場合も、まずは reroll により active / next / future を決める
- backlog 化しない
- 80_future の代替として使わない
- 削除済みの `config/ai/common_*` / `config/ai/procedures/*` 構造は再作成しない
- ADAM / EVE config は現行 `instruction + knowledge + schema` 構成を前提に整合する
- main は Docs-aligned stable version として扱う
- branch は Notes-driven development space として扱う
- merge 時に docs / code / config / operations / version を一致させる
- ATLAS は test / verification / CI review system として扱う
- delta 開発前に branch selector / ATLAS / bulk / docs 実態差分の環境整備を優先する
