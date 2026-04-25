# active_operations

## Phase 0 位置づけ

### Phase 0 直結 task

- `直近 issue を plan / operations / dev_memo へどう落とすかの運用を整える`
- `intake routing の inbox 後処理 rule を一般化する`
- `ADAM instruction を GPT-5.5 向けに core / procedure / schema へ再層化する方針を design に落とす`

### 補助 task

- `pending_tasks 元 inbox を archive 扱いへ寄せてよいかを実運用上確認する`
- `repoResourceGet bulk の files 区切り仕様を整理する`
- `docs/05_roadmap.md への Phase 0 位置づけ反映案を作る`
- `legacy Todoist wrapper の削除前 gate を repo 全体で再確認する`

## Day0（04/26 日）

- task: 直近 issue を plan / operations / dev_memo へどう落とすかの運用を整える
  source_ref:
    - notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md
    - notes/01_issues/idea_log.md
    - notes/04_operations/active_operations.md
  rolling_day: Day0
  due_date: 2026-04-26
  due_type: date
  why_now:
    - 2026-04-25 に issue `20260425-029` と `20260425-030` が追加され、直近 issue をどの層へ送るかの運用確認が必要になった
    - issue routing の completed condition を plan / operations に返した後、実際の open issue を placement 判断へつなげる段として自然である
  notes:
    - issue を即 active 化せず、plan / operations / dev_memo / future のどこに落とすかを判定する
    - high impact の instruction 再層化 issue と medium impact の bulk API issue を比較対象に含める
  external:
    todoist_task_id: 6gRfFPxvWQ72HmMq

- task: pending_tasks 元 inbox を archive 扱いへ寄せてよいかを実運用上確認する
  source_ref:
    - notes/00_inbox/dev_memo/2026-03-22_09-40-00_pending_tasks.md
    - notes/02_design/2026-04-24_pending_tasks_split_postprocess_archive_pending_rule.md
    - notes/08_analysis/2026-04-24_pending_tasks_split_reconfirmation_after_intro_exclusion.md
  rolling_day: Day0
  due_date: 2026-04-26
  due_type: date
  why_now:
    - design 上は archive 寄りと整理できたため、daily review 後の実運用確認として閉じる価値がある
    - inbox 後処理 rule の一般化に入る前に、元 inbox の扱いを単発確認しておく必要がある
  notes:
    - source_ref が残っていることを前提に、元 inbox を archive 扱いに寄せてよいか確認する
    - これは rule 固定後の runtime 側確認として扱う

- task: intake routing の inbox 後処理 rule を一般化する
  source_ref:
    - notes/02_design/intake_review_and_source_ref_spec.md
    - notes/02_design/2026-04-24_pending_tasks_split_postprocess_archive_pending_rule.md
    - notes/04_operations/active_operations.md
  rolling_day: Day0
  due_date: 2026-04-26
  due_type: date
  why_now:
    - pending_tasks で固めた archive / pending 判定を、intake 全体の後処理 rule に返す段として自然である
    - Phase 0 の intake routing 運用可能性を高めるため、個別例から一般 rule へ上げる必要がある
  notes:
    - 原則 archive、未判断が残るときだけ pending の線を一般化する
    - source_ref 維持と元 inbox の扱いを同時に確認する

## Day1（04/27 月）

- task: ADAM instruction を GPT-5.5 向けに core / procedure / schema へ再層化する方針を design に落とす
  source_ref:
    - notes/01_issues/idea_log.md
    - config/ai/adam_instruction.md
    - config/ai/adam_schema.yaml
  rolling_day: Day1
  due_date: 2026-04-27
  due_type: date
  why_now:
    - issue `20260425-029` は high impact で、現行 instruction の肥大化と GPT-5.5 向け最適化に関わる
    - ただし即 rewrite ではなく、core / procedure / schema の分離方針を design に落としてから進める必要がある
  notes:
    - ルール削除ではなく層分離として扱う
    - runtime instruction 変更前に、保持すべき拘束ルールと外出し可能な手順を分類する

## Day2（04/28 火）

- task: repoResourceGet bulk の files 区切り仕様を整理する
  source_ref:
    - notes/01_issues/idea_log.md
    - docs/10_repo_resource_api.md
    - config/ai/adam_schema.yaml
    - api/repo-resource.js
  rolling_day: Day2
  due_date: 2026-04-28
  due_type: date
  why_now:
    - issue `20260425-030` は daily review 中にも再発し、handover / 関連ファイル確認の効率と信頼性に影響する
    - 改修前に、カンマ区切り / 改行区切り / schema 記述 / error message のどこを正すか整理する必要がある
  notes:
    - まず仕様整理に留める
    - repo schema 更新と runtime tool schema 反映確認は別状態として扱う

## Day3（04/29 水）

- task: docs/05_roadmap.md への Phase 0 位置づけ反映案を作る
  source_ref:
    - notes/02_design/2026-04-25_phase0_positioning_in_roadmap.md
    - notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md
    - docs/05_roadmap.md
  rolling_day: Day3
  due_date: 2026-04-29
  due_type: date
  why_now:
    - 2026-04-25 に Phase 0 の foundation 位置づけは design に整理済みで、次は docs 反映案へ進める
    - docs 本体更新は人間判断前提のため、まず反映案を作るのが安全である
  notes:
    - docs 直更新ではなく、差分案を先に作る
    - Phase 1 へ入る前の foundation として位置づける

## Day4（04/30 木）

- task: legacy Todoist wrapper の削除前 gate を repo 全体で再確認する
  source_ref:
    - notes/02_design/2026-04-18_legacy_todoist_wrapper_deprecation_design.md
    - src/services/todoist.js
    - src/services/todoist/client.js
    - src/services/tasks/service.js
    - src/services/tasks/projection.js
  rolling_day: Day4
  due_date: 2026-04-30
  due_type: date
  why_now:
    - deprecated 化の段取りは整理済みだが、削除前には repo 全体 usage と test gate の再確認が必要である
    - architecture cleanup としては次段に置けるが、Phase 0 の主線より後に置くのが自然である
  notes:
    - 今回も即削除しない
    - usage 確認、参照移行要否、test 結果を削除判断の gate とする

## Day5（05/01 金）

- task: issue routing completed condition の継続観測項目を weekly review 向けに整理する
  source_ref:
    - notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md
    - notes/08_analysis/2026-04-21_issue_routing_operations_candidate_rolling_connection_observation.md
    - notes/08_analysis/2026-04-21_issue_routing_keep_future_archive_operational_validity.md
  rolling_day: Day5
  due_date: 2026-05-01
  due_type: date
  why_now:
    - issue routing の completed condition は plan / operations に返したが、単発確認と継続確認を分ける必要がある
    - weekly review で Phase 0 の進捗判断へ返せる形に整理しておく価値がある
  notes:
    - 単発確認済みの項目と、継続観測が必要な項目を分ける

## Day6（05/02 土）

- task: Phase 1 Todoist / Outlook foundation へ進む前の Phase 0 残件を棚卸しする
  source_ref:
    - notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md
    - notes/03_plan/2026-04_phase1_todoist_outlook_foundation.md
    - notes/04_operations/active_operations.md
    - notes/04_operations/next_operations.md
  rolling_day: Day6
  due_date: 2026-05-02
  due_type: date
  why_now:
    - Phase 0 の複数運用改善が進んだため、Phase 1 へ進む前に残件と移行条件を確認する必要がある
  notes:
    - intake / issue / design routing、review、Todoist projection の残件を並べる
    - Phase 1 に入れるものと、Phase 0 に残すものを分ける

---

## ルール

- 実行対象は active_operations に入っている task のみとする
- 実行は上から順に行う
- Day は仮配置であり固定日付ではない
- 日付と曜日は人間可読性のために付与する
- 日付表示は daily review 時に更新する
- active_operations の各 task は task / source_ref / rolling_day を必須で持つ
- why_now / notes / due_date / due_type は必要に応じて持つ
- operations は候補を優先順位で並べ、7日枠に入るものを active_operations とする
- active に入らなかった上位候補を next_operations に置く
- スコアは補助であり、決定ではない
- 会話中に新規タスク候補が発生した場合は、先に operations rolling を行う
- 新規候補は active / next / future のどこに置くか決めてから扱う
- reroll 前に active 外タスクを実行しない
- 未完了タスクは翌日以降へ移動する
- 完了タスクは必要に応じて archive_operations に移す
- Phase 0 中は Flow Control / routing / operations の実運用整合を優先する
- 直近の daily review rolling では、intake routing の後処理一般化と直近 issue の placement 運用を優先候補として扱う
