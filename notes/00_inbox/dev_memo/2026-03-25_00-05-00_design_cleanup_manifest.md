# design cleanup manifest (2026-03-25)

## 目的

exploration と design の責務分離を回復する。

現状では design/memo および design/memos に exploration 相当の時系列メモが残っている。

同内容のファイルは exploration/memo 側に存在するため、design 側の重複を削除対象として確定する。

---

## 方針

- exploration/memo を正として残す
- design/memo は全削除対象とする
- design/memos は全削除対象とする
- design 直下の構造化された草案は残す

---

## 削除対象

### design/memo

- notes/design/memo/2026-03-24_07-20-00_api_cleanup_and_alignment.md

### design/memos

- notes/design/memos/2026-03-22_09-40-00_pending_tasks.md
- notes/design/memos/2026-03-22_15-30-00_reflection_design.md
- notes/design/memos/2026-03-22_15-55-00_dev_gpt_todoist_action_alignment.md
- notes/design/memos/2026-03-22_15-58-00_tasks_api_redesign_for_gpt_alignment.md
- notes/design/memos/2026-03-22_16-20-00_phase1_todoist_api_rearchitecture_plan.md
- notes/design/memos/2026-03-22_18-00-00_branch_strategy_future.md
- notes/design/memos/2026-03-22_18-10-00_todoist_api_dev_plan.md
- notes/design/memos/2026-03-23_23-01-22_recommended_direction_and_priority_roadmap.md

---

## 対応先（保持側）

以下は exploration/memo 側に存在するため保持する。

- notes/exploration/memo/2026-03-22_09-40-00_pending_tasks.md
- notes/exploration/memo/2026-03-22_15-30-00_reflection_design.md
- notes/exploration/memo/2026-03-22_15-55-00_dev_gpt_todoist_action_alignment.md
- notes/exploration/memo/2026-03-22_15-58-00_tasks_api_redesign_for_gpt_alignment.md
- notes/exploration/memo/2026-03-22_16-20-00_phase1_todoist_api_rearchitecture_plan.md
- notes/exploration/memo/2026-03-22_18-00-00_branch_strategy_future.md
- notes/exploration/memo/2026-03-22_18-10-00_todoist_api_dev_plan.md
- notes/exploration/memo/2026-03-23_23-01-22_recommended_direction_and_priority_roadmap.md
- notes/exploration/memo/2026-03-24_07-25-00_api_cleanup_and_alignment.md

---

## design に残すもの

以下は docs 直前の草案として残す。

- notes/design/2026-03-23_recommended_direction_and_priority_roadmap.md
- notes/design/2026-03-24_api_spec_cleanup_draft.md
- notes/design/2026-03-24_eve_intent_api_mapping.md
- notes/design/2026-03-24_notes_delete_api_draft.md
- notes/design/phase1_api_spec_draft.md
- notes/design/repo_resource_access.md
- notes/design/dev_memo.md
- notes/design/handover_template.md
- notes/design/README.md

---

## 補足

api_cleanup_and_alignment はファイル名だけ見るとタイムスタンプが 07-20-00 と 07-25-00 で異なるが、design/memo を廃止する方針のため design 側を削除対象に含める。

recommended_direction_and_priority_roadmap は design 直下にも存在するため、時系列メモ版（design/memos 側）のみ削除対象とする。

---

## 次アクション

1
Action の delete 実行レイヤーを修正する

2
本 manifest に従って design/memo と design/memos を削除する

3
削除後に design README / exploration README の責務表現を見直す
