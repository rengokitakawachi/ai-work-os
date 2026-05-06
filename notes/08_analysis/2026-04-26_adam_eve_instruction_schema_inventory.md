# 2026-04-26 ADAM / EVE Instruction and Schema Inventory

## 目的

ADAM / EVE の instruction と schema を、再層化に向けて section 単位で分類する。

参照:

- `notes/02_design/2026-04-26_adam_eve_instruction_schema_layering.md`
- `config/ai/adam_instruction.md`
- `config/ai/adam_schema.yaml`
- `config/ai/eve_instruction.md`
- `config/ai/eve_schema.yaml`

---

## 分類先

- core: 常時効く判断原則
- procedure: 状況依存の手順
- schema: tool / API の機械的制約
- knowledge: 背景知識・用語整理
- keep as-is: 現時点で大きく動かさない
- remove / archive candidate: 削除または退避候補

---

# ADAM instruction inventory

## Role

分類:

- core

理由:

- ADAM の人格、任務、出力姿勢を定義している
- 常時効く必要がある

処理:

- core に残す
- 短縮は可能だが削除しない

---

## 最重要原則

分類:

- core

理由:

- docs SSOT、operations 正本、Todoist projection、docs → code 順、service 層集約など、ADAM の判断の根幹である

処理:

- core に残す
- 重複は圧縮する

---

## ツール実行ルール

分類:

- core + procedure

core に残すもの:

- docs / notes / Todoist は Action 経由で扱う
- update 前 read、create 前確認、delete 前影響確認
- 未確認 write 禁止

procedure に移すもの:

- Write Gate の詳細表示項目
- read → 整理 → 事前表示 → write → 保存確認の手順詳細
- Action / API schema 更新時の段階的確認手順

処理:

- core には安全原則だけ残す
- `adam_write_gate.md` と `adam_schema_reflection.md` へ分離する

---

## Docs / Notes / Todoist

分類:

- core + knowledge + procedure

core に残すもの:

- docs は SSOT
- docs 未取得で仕様判断しない
- notes は補助
- Todoist は operations の projection

knowledge に移すもの:

- 保存先一覧
- docs / notes / code の関係説明

procedure に移すもの:

- Todoist projection の具体手順
- Todoist list/create/update の運用手順

処理:

- core には正本関係を残す
- 保存先一覧は knowledge または procedure へ移す

---

## Operations利用ルール

分類:

- core + procedure

core に残すもの:

- operations は短期実行順の正本
- active に入っている task のみ実行対象
- 日中は active の順序と Day 構造を原則維持
- rolling / archive 移動は daily review
- 完了判定と構造変更判定を分ける

procedure に移すもの:

- reroll 前チェック詳細
- Day 容量確認
- daily review 時の active / next / archive 更新手順

処理:

- core には active-first と正本原則を残す
- `adam_operations.md` へ詳細を移す

---

## 一般化した再発防止ゲート

分類:

- core

理由:

- 状態層、completed condition、依存順、単発 / 継続確認の分離は ADAM の判断品質そのもの

処理:

- core に残す
- 4問は圧縮して残す

---

## 自己監査 / 深掘り停止ルール

分類:

- core

理由:

- 局所最適化と本筋逸脱を防ぐ常時判断原則

処理:

- core に残す
- 長いリストは圧縮可能

---

## Review実行ルール

分類:

- procedure

理由:

- review 依頼時だけ必要な詳細手順
- core に全量を置く必要はない

処理:

- `adam_review.md` へ移す
- core には「review は spec を読んで手順・完了条件を固定してから実行する」だけ残す

---

## Flow Control / Routing利用ルール

分類:

- procedure + knowledge

理由:

- routing 時に必要な詳細
- 常時 core ではない

処理:

- `adam_routing.md` へ移す
- routing の概念説明は knowledge にも置ける
- core には「新規候補は即実行せず routing / rolling へ送る」だけ残す

---

## Handover / 再開ルール

分類:

- procedure

理由:

- handover 作成 / 再開時だけ必要

処理:

- `adam_handover.md` へ移す
- core には「handover は入口であり正本ではない」だけ残す

---

## 出力 / 課題整理

分類:

- core + procedure

core に残すもの:

- docs 未取得なら仕様判断を停止
- 推測で穴埋めしない

procedure に移すもの:

- idea capture の保存手順
- 課題整理の情報収集 → 構造化 → 提案 → 承認 → 保存

処理:

- core と `adam_routing.md` / `adam_write_gate.md` に分ける

---

# ADAM schema inventory

## repoResourceGet / repoResourceWrite

分類:

- schema + procedure

維持:

- action enum
- resource enum
- file / files fields
- create / update / delete rules

見直し:

- `files` 区切り仕様の description が不足
- 改行区切り / カンマ区切り / JSON array の扱いを仕様化する必要がある

後続:

- `repoResourceGet bulk の files 区切り仕様を整理する`

---

## listTasks / createTask / updateTask

分類:

- schema

維持:

- Todoist projection / task operation に必要

見直し:

- ADAM は Todoist を正本にしないため、instruction 側で projection 原則を維持する

---

## projectTasks

分類:

- schema + procedure

維持:

- target
- mode
- previous_active_tasks
- current_active_tasks
- OperationTaskSchema
- due_date / due_type
- completed
- external.todoist_task_id

注意:

- schema 更新後も runtime schema 反映確認が必要
- dry_run → apply の手順は procedure に置く

---

# EVE instruction inventory

## Role

分類:

- core

理由:

- EVE の人格、任務、出力姿勢を定義している

処理:

- core に残す
- 生年月日や ADAM の双子設定は tone / personality として残してよいが、長文化しない

---

## EVE の役割

分類:

- core

理由:

- 情報整理、戦略の行動化、タスク整理という責務定義

処理:

- core に残す

---

## 最重要原則

分類:

- core

理由:

- Todoist を正本、operations を補助参照とする EVE 固有の最重要差分

処理:

- core に残す
- ADAM の operations 正本原則と混ぜない

---

## Core Principles

分類:

- core + procedure

core に残すもの:

- 出力は短く構造的
- 1タスクは30〜120分
- Next Action は動詞から始める
- GTD の Capture / Clarify / Organize
- EVE に不要な機能を持たせない

procedure に移すもの:

- Next Action 分解手順
- GTD 処理手順の詳細

---

## Clarify Rule

分類:

- core + procedure

core に残すもの:

- Task / Project / Knowledge に分類する
- Task のみ Todoist 登録

procedure に移すもの:

- 追加 / 登録 / タスク / Todoist を意図シグナルとする詳細
- clarify の判定例

保存先候補:

- `config/ai/procedures/eve_task_clarify.md`

---

## Task Retrieval Rule

分類:

- core + procedure

core に残すもの:

- 既存タスク整理では listTasks を先に使う
- API で取得できる情報は人に聞かない

procedure に移すもの:

- 対象意図一覧
- listTasks 後の整理手順

保存先候補:

- `config/ai/procedures/eve_task_retrieval.md`

---

## Operations 参照ルール

分類:

- core

理由:

- EVE と ADAM の正本差分を守る安全柵

処理:

- core に残す
- 「operations は主軸ではない」を明確に残す

---

## Intent → API

分類:

- procedure + schema

理由:

- intent と API の対応は task handling procedure で参照すればよい
- API の field / enum は schema 側にある

処理:

- `eve_task_retrieval.md` / `eve_task_update.md` へ移す

---

## Execution

分類:

- procedure

理由:

- 整理 / 作成 / 更新 / 完了の詳細手順

処理:

- `eve_task_retrieval.md`
- `eve_task_create.md`
- `eve_task_update.md`
  に分離する

---

## 出力ルール

分類:

- core + procedure

core に残すもの:

- 返答は短め
- 必要最小限

procedure に移すもの:

- 全文出力要求時の詳細扱い

---

## 禁止

分類:

- core

理由:

- EVE の暴走防止と責務境界

処理:

- core に残す
- 重複は圧縮する

---

## Tone

分類:

- core

理由:

- 常時応答姿勢

処理:

- core に残す

---

# EVE schema inventory

## listTasks

分類:

- schema

現状:

- project_id / section_id / parent_id / label / status / cursor / limit
- status enum は `open` のみ

見直し候補:

- 完了済み確認や close 後確認を EVE が行うなら `closed` を追加する
- ただし通常整理は open で足りるため、追加は completed condition を明確にしてから行う

---

## createTask

分類:

- schema

現状:

- title required
- description
- due_string
- labels
- priority
- subtasks

見直し候補:

- project_id がない
- section_id がない
- EVE がプロジェクト指定で登録する必要があるなら project_id を追加する
- ADAM 側 CreateTaskRequest には project_id があるため差分がある

---

## updateTask

分類:

- schema

現状:

- title
- description
- due_date
- labels
- priority
- status open / closed

見直し候補:

- due_string と due_date の使い分けを instruction / procedure で明確化する
- close 後の確認を listTasks status closed と接続するか検討する

---

## Error response

分類:

- schema

現状:

- response schema が薄い

見直し候補:

- ErrorResponse / ErrorObject を ADAM schema と揃えるか検討する
- EVE の簡潔な失敗報告に必要な範囲だけ補強する

---

# 共通 layer inventory

## common_core.md 候補

入れるもの:

- 先に結論、次に理由
- 短く構造的に答える
- API で確認できることを人に聞かない
- 推測で仕様や状態を補完しない
- 正本を明示する
- completed condition は観測で閉じる
- repo 更新 / runtime 反映を同一視しない

入れないもの:

- ADAM の docs SSOT
- ADAM の operations 正本
- EVE の Todoist 正本
- routing / review の詳細手順

---

## common_tool_use.md 候補

入れるもの:

- 必要な情報は API / Action で確認する
- 書き込み前に対象を確認する
- dry_run がある場合は apply 前に dry_run する
- schema 更新後は runtime 反映を確認する

入れないもの:

- ADAM 固有の repoResource usage 詳細
- EVE 固有の task clarify 詳細

---

## common_schema_reflection.md 候補

入れるもの:

- repo schema 更新
- GPT Action / runtime schema 再反映
- runtime tool schema 上の field 確認
- 実動 dry_run / apply 確認

注意:

- ADAM は projectTasks / repoResource を含む
- EVE は Todoist task API に限定する

---

# 後続 task

## 1. 共通 core / tool use / schema reflection の draft を作る

対象:

- `config/ai/common_core.md`
- `config/ai/common_tool_use.md`
- `config/ai/common_schema_reflection.md`

---

## 2. ADAM procedure draft を作る

対象:

- `config/ai/procedures/adam_review.md`
- `config/ai/procedures/adam_routing.md`
- `config/ai/procedures/adam_operations.md`
- `config/ai/procedures/adam_write_gate.md`
- `config/ai/procedures/adam_handover.md`
- `config/ai/procedures/adam_schema_reflection.md`

---

## 3. EVE procedure draft を作る

対象:

- `config/ai/procedures/eve_task_clarify.md`
- `config/ai/procedures/eve_task_retrieval.md`
- `config/ai/procedures/eve_task_create.md`
- `config/ai/procedures/eve_task_update.md`

---

## 4. instruction 圧縮案を作る

対象:

- `config/ai/adam_instruction.md`
- `config/ai/eve_instruction.md`

---

## 5. schema 差分 task を分離する

ADAM:

- repoResourceGet bulk files separator を整理する

EVE:

- project_id 要否
- status closed 要否
- error response 要否
- due_string / due_date 整合

---

# 判断

ADAM / EVE の instruction と schema は同時整備するが、同一化しない。

共通化するのは会話品質、tool use、layering、schema reflection 原則までである。

正本、責務、procedure、schema 範囲は人格別に分ける。

この inventory により、次は共通 core と procedure draft 作成へ進める。
