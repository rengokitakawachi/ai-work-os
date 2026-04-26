# 2026-04-26 ADAM / EVE Instruction and Schema Layering Design

## 目的

ADAM と EVE の instruction / schema を、GPT-5.5 向けに同時整備するための共通方針を固定する。

既存の `2026-04-26_adam_instruction_gpt55_layering.md` は ADAM 単体の前提固定だったが、EVE も同時に扱う場合は、共通 core と人格別差分を分けて設計する必要がある。

---

## 外部前提

OpenAI 公式 release notes では、GPT-5.5 は複雑な目標理解、ツール利用、出力確認、長いタスク遂行、コード・調査・文書作成などの professional work に強いモデルとして説明されている。

この前提から、ADAM / EVE では次を採用する。

- 長い手順を常時 instruction に詰め込まず、常時判断原則と状況依存 procedure を分ける
- tool / API の機械的制約は schema に寄せる
- runtime 反映確認は completed condition から外さない
- ADAM と EVE の役割差は残す
- 共通 operating model は共有するが、正本の違いは混ぜない

---

## 現状の差分

### ADAM

ADAM は開発コントローラーであり、仕様整合と実装品質を最大化する。

正本関係:

- docs: 仕様 SSOT
- operations: 短期実行順の正本
- Todoist: operations の projection
- code: 実装実態
- notes: 補助情報

特徴:

- docs / notes / code / operations を横断して扱う
- review / routing / handover / write gate / schema runtime reflection を制御する
- repo / canonical / runtime の状態層分離が重要
- API schema 更新後の runtime tool schema 確認が重要

---

### EVE

EVE は AI Work OS の運用人格であり、ユーザーの知的生産と日常実行を支援する。

正本関係:

- Todoist: タスク状態の正本
- operations: 実行順を補助的に確認する参照先

特徴:

- 既存タスク整理では Todoist API を先に使う
- Task / Project / Knowledge を clarify する
- Task のみ Todoist に登録する
- EVE に不要な開発管理機能を持ち込まない
- ADAM のように docs / code / operations を主制御しない

---

## 共通化するもの

ADAM と EVE に共通して持たせるべきものは次である。

### 1. Conversation Core

- 短く構造的に答える
- 先に結論、次に理由
- 推測で穴埋めしない
- API で取得できる情報を人に聞かない
- 何を正本としているかを明示する
- completed condition を観測で閉じる
- 書き込み前に対象確認を行う

### 2. Tool Use Core

- 必要な情報は Action / API で確認する
- Todoist 関連は Todoist API を使う
- repo 関連は repoResource API を使う
- schema 更新と runtime 反映を同一視しない
- dry_run がある場合は apply 前に dry_run で確認する

### 3. Layering Principle

- core: 常時効く判断原則
- procedure: 状況依存の手順
- schema: 機械的制約
- knowledge: 背景知識

---

## 共通化しないもの

次は混ぜない。

### 正本の違い

ADAM:

- operations が短期実行順の正本
- Todoist は projection

EVE:

- Todoist がタスク状態の正本
- operations は補助参照

この違いは core instruction で明示的に分ける。

---

### 責務の違い

ADAM:

- 開発制御
- docs / notes / code / operations の整合
- review / routing / handover の制御
- schema runtime reflection の確認

EVE:

- タスク整理
- 今日の実行支援
- Task / Project / Knowledge の clarify
- Todoist 登録 / 更新 / 完了

EVE に ADAM の開発管理機能を持ち込まない。

---

## 推奨ファイル構成

### 共通 layer

- `config/ai/common_core.md`
- `config/ai/common_tool_use.md`
- `config/ai/common_schema_reflection.md`

### ADAM layer

- `config/ai/adam_instruction.md`
- `config/ai/adam_knowledge.md`
- `config/ai/adam_schema.yaml`
- `config/ai/procedures/adam_review.md`
- `config/ai/procedures/adam_routing.md`
- `config/ai/procedures/adam_operations.md`
- `config/ai/procedures/adam_write_gate.md`
- `config/ai/procedures/adam_handover.md`

### EVE layer

- `config/ai/eve_instruction.md`
- `config/ai/eve_schema.yaml`
- `config/ai/procedures/eve_task_clarify.md`
- `config/ai/procedures/eve_task_retrieval.md`
- `config/ai/procedures/eve_task_update.md`

---

## ADAM schema 方針

ADAM schema は、repo / notes / docs / Todoist projection を扱うため広い。

維持するもの:

- repoResourceGet / repoResourceWrite
- listTasks / createTask / updateTask
- projectTasks
- OperationTaskSchema
- due_date / due_type
- dry_run / apply

改善候補:

- repoResourceGet bulk の `files` 区切り仕様を明確化する
- separator handling を schema description と実装で揃える
- runtime tool schema 反映確認を completed condition に含める

---

## EVE schema 方針

EVE schema は Todoist task management に絞る。

維持するもの:

- listTasks
- createTask
- updateTask

見直すもの:

- `listTasks.status` が `open` のみになっているが、完了済み確認や close 後確認をするなら `closed` も必要か再評価する
- `createTask` に `project_id` がないため、EVE が project を指定して task 作成する必要があるなら追加候補にする
- `UpdateTaskRequest.due_date` はあるが、create 側は `due_string` なので、EVE の自然文登録方針と整合しているか確認する
- error response schema が薄いため、失敗時の説明品質を上げるなら補強候補にする

ただし、EVE に ADAM の repoResource / projectTasks を持たせない。

---

## Instruction 再層化方針

### ADAM instruction

ADAM は以下に圧縮する。

- role
- SSOT / docs driven
- operations 正本
- Todoist projection
- repo / canonical / runtime 分離
- completed condition gate
- active-first execution
- write gate の最小原則
- procedure 参照ルール

詳細な daily review / routing / handover / schema reflection は procedure へ移す。

---

### EVE instruction

EVE は以下に圧縮する。

- role
- Todoist 正本
- Task / Project / Knowledge clarify
- Task のみ Todoist 登録
- 既存タスク整理では listTasks を先に使う
- operations は補助参照
- 簡潔な出力
- EVE に開発管理機能を持ち込まない
- procedure 参照ルール

詳細な Task retrieval / create / update / done 手順は procedure へ移す。

---

## 実行順

### Step 1: Inventory

ADAM / EVE の現行 instruction と schema を section 単位で分類する。

分類先:

- core
- procedure
- schema
- knowledge
- keep as-is
- remove / archive candidate

### Step 2: Common layer 設計

ADAM / EVE 共通 core を作る。

ただし、正本の違いは共通化しない。

### Step 3: Procedure 設計

ADAM procedure と EVE procedure を分ける。

ADAM:

- review
- routing
- operations
- write gate
- handover
- schema reflection

EVE:

- clarify
- retrieval
- create
- update / close

### Step 4: Schema 差分整理

ADAM schema:

- bulk files separator issue を後続で扱う

EVE schema:

- project_id 要否
- closed status 要否
- error response 要否
- create / update の date field 整合

### Step 5: repo 更新

- common files 作成
- procedure files 作成
- ADAM instruction 圧縮
- EVE instruction 圧縮
- 必要な schema 更新

### Step 6: runtime 反映確認

repo 更新後、ADAM / EVE それぞれで runtime 反映を確認する。

completed condition は次を含む。

- repo 更新済み
- GPT editor / Action 再反映済み
- runtime tool schema 上で更新内容が見える
- ADAM / EVE の実運用で新ルールが効く

---

## active operations への反映方針

現在の active task `ADAM instruction を GPT-5.5 向けに core / procedure / schema へ再層化する方針を design に落とす` は、ADAM 単体 design まで完了済みである。

ユーザー要望により、次の task は `ADAM / EVE instruction と schema の section inventory を作る` に差し替えるのが自然である。

その後に `repoResourceGet bulk の files 区切り仕様を整理する` へ進む。

理由:

- EVE も同時に扱うなら、ADAM の rewrite だけ先に進めると二重作業になる
- 共通 core / procedure の切り出しは、ADAM / EVE を同時に見た方が安全である
- EVE schema の範囲は ADAM より狭いため、先に境界を固定すべきである

---

## completed condition

この design は次を満たしたら成立とみなす。

- ADAM / EVE の正本差分が明示されている
- 共通化するもの / しないものが分離されている
- instruction / procedure / schema / knowledge の役割が定義されている
- ADAM schema と EVE schema の扱い差が整理されている
- 次 task が `ADAM / EVE instruction と schema の section inventory` として切れる

---

## 判断

ADAM と EVE の instruction / schema は同時整備してよい。

ただし、共通化しすぎない。

ADAM は docs / operations / code の開発制御人格である。
EVE は Todoist を正本にした実行支援人格である。

共通化するのは、会話品質、tool use、layering 原則まで。
正本、責務、手順、schema 範囲は人格別に分ける。
