# Operations → Todoist One-Way Projection Prototype Design

## 目的

ADAM が管理する operations 正本を、
Todoist の execution view へ片方向で投影する
最小プロトタイプ仕様を定義する。

今回の目的は、
「今の task を Todoist 上で見えるようにし、
ADAM が operations を更新した結果として
Todoist 側にも create / update / close / delete を反映できる状態」
を最小構成で成立させることにある。

---

## 位置づけ

これは ADAM 用のプロトタイプ仕様である。

将来の EVE 一般業務系では、
Todoist と domain / strategy / operations 相当の正本との
双方向同期が必要になる可能性が高い。

ただし今回の仕様はそこまで扱わない。

今回の設計は、
将来の双方向同期方針を否定するものではなく、
プロトタイプ段階における責務制約を切り出したものである。

---

## 基本原則

- operations を短期実行順の正本とする
- Todoist は execution view とする
- ADAM が operations 正本を更新する主体とする
- Todoist 側の更新を operations 正本へ自動反映しない
- 今回は片方向 projection とする
- projection の対象操作は create / update / close / delete とする
- Todoist の変更前に現状 task を先に参照する
- 同名 task は operations / Todoist の双方で許可する
- 上書き対象の主識別子は `external.todoist_task_id` とする
- 外部サービス固有仕様は service / adapter に閉じる

---

## 今回の対象

### 対象操作

- create
- update
- close
- delete

### 対象データ

- active_operations にある task
- title
- 補助 description
- date
- deadline
- status 相当情報
- source_ref の要約または参照情報
- projection 識別子

### 対象範囲方針

今回のプロトタイプでは、
投影対象を `active_operations` の task に限定する。

`next_operations` は今回の投影対象に含めない。

理由は以下。

- まずは軽く始める方が安全
- active は実行対象として意味が明確
- next まで含めると投影量と更新頻度が増える
- create / update / close / delete の基本挙動確認を先に優先する

---

## 今回の非対象

- Todoist → operations の自動反映
- 双方向同期
- webhook / polling による逆方向同期
- 高度な競合解決
- 親子関係の高度対応
- priority / duration の完全同期
- ユーザーが Todoist 側で行った更新の正本反映
- operations 全層の自動一括投影
- next_operations の task 投影

---

## 責務境界

### operations 側の責務

- 正本 task の保持
- task の順序決定
- task の内容更新
- 完了判定
- 投影対象 task の決定
- task が持つ date / deadline 情報の保持
- Todoist との対応情報を task の `external` に保持する

### ADAM の責務

- operations 正本を更新する
- 必要に応じて Todoist への投影を指示する
- create / update / close / delete のどれを行うか決める
- 片方向制約を維持する

### Todoist 側の役割

- execution view
- 実行しやすい一覧表示先
- 必要最小限の外部実行面

### service / adapter 側の責務

- Todoist API パラメータへの変換
- 変更前の Todoist 現状参照
- 外部 ID 管理
- 二重作成防止
- update / close / delete 実行
- エラー処理
- Todoist 固有仕様の吸収

---

## 一文定義

operations → Todoist projection とは、
ADAM が更新した operations 正本の task を、
Todoist execution view に
片方向で create / update / close / delete 反映することである。

---

## 最小データモデル

### OperationTask の最小 shape

projection service が扱う `OperationTask` は、
現行の `active_operations.md` の task shape を基準にし、
projection に必要な最小項目だけを前提にする。

```ts
type OperationTask = {
  task: string
  source_ref: string[]
  rolling_day: string
  why_now?: string[]
  notes?: string[]
  due_date?: string
  due_type?: "date" | "deadline"
  external?: {
    todoist_task_id?: string
  }
}
```

### 必須項目

- `task`
- `source_ref`
- `rolling_day`

### 任意項目

- `why_now`
- `notes`
- `due_date`
- `due_type`
- `external.todoist_task_id`

### 採用理由

- 現行 operations の実体にそのまま接続しやすい
- payload 生成に必要な情報を満たす
- projection 用の追加項目を最小に抑えられる
- code 実装時の parse / normalize を過剰に複雑化しない

### 想定 shape

```yaml
- task: operations → Todoist 片方向 projection プロトタイプの最小仕様を design に整理する
  source_ref:
    - notes/03_plan/2026-04_phase1_todoist_outlook_foundation.md
  rolling_day: Day0
  why_now:
    - いまの task を Todoist で見える化する価値が大きい
  notes:
    - operations が正本
    - Todoist は execution view
  due_date: 2026-04-10
  due_type: date
  external:
    todoist_task_id:
```

### 方針

- `todoist_task_id` は operations task 本文の `external` に保持する
- create 後の update / close / delete は `external.todoist_task_id` を主キーとして扱う
- `due_date` は task 個別に date または deadline を表現する最小項目とする
- `due_type` は `date` と `deadline` のどちらへ投影するかを決める
- 今回のプロトタイプでは `external` を最小に保ち、補助状態は持たない
- 将来の EVE でも operations と Todoist task 管理が密接につながる前提を優先する

### 補足

可読性は多少落ちるが、
今回の operations は人間向け読み物ではなく短期実行正本であるため、
外部 ID を近接保持する不利益は限定的とみなす。

rolling 時の追従更新コストはあるが、
現段階では致命的ではなく、
別 state 管理による分散参照コストより許容しやすい。

---

## external 最小化方針

今回の `external` は
`todoist_task_id` のみを持つ。

持たないもの:

- projection_status
- last_projected_at

理由は以下。

- create / update / close / delete の最小プロトタイプ成立に不要
- Todoist task ID があれば対象特定は十分できる
- 補助状態を先に持つと schema と更新処理が重くなる
- 必要になった時点で後から追加しても破綻しにくい

---

## payload 最小仕様

今回のプロトタイプでは、
Todoist へ送る payload は最小構成に絞る。

採用する項目:

- content
- description
- date
- deadline

今回見送る項目:

- priority
- labels
- duration
- parent_id

### content 方針

`content` には operations の `task` をそのまま使う。

これは Todoist 上の主表示項目であり、
最も重要な識別面でもある。

### description 方針

`description` には、
operations 上の補足情報を短く圧縮して入れる。

最小フォーマットは以下とする。

```text
why_now: <1行要約>
notes: <先頭1〜2項目を短く要約>
source_ref: <主要1〜2件>
ref: notes/04_operations/<file>
```

### description 生成ルール

- `why_now` があれば先頭に 1 行で入れる
- `notes` は長文を避け、先頭 1〜2 件だけを短く入れる
- `source_ref` は全文列挙せず、主要 1〜2 件だけを入れる
- 最後に正本参照先として operations ファイルを明記する
- 文字数が長くなりすぎる場合は `notes` より `why_now` を優先する

### date / deadline 方針

Todoist の `date` と `deadline` は分けて扱う。

- `date`:
  その task をいつ実行するか
- `deadline`:
  その task をいつまでに終えるか

operations → Todoist 変換では、
以下の優先順で扱う。

1.
`task.due_date` があり `task.due_type = date` の場合は
Todoist `date` に入れる

2.
`task.due_date` があり `task.due_type = deadline` の場合は
Todoist `deadline` に入れる

3.
task 個別の `due_date` がない場合は、
Day 見出しの暦日を Todoist `date` に入れる

4.
date と deadline が両方必要な場合は、
Day 見出し日付を `date`、
task 個別 `due_date + due_type = deadline` を `deadline` に入れる

5.
どちらも情報がない場合は、
Todoist 側の日付を触らない

### Day 日付の扱い

operations は Day 見出しに暦日を持つ。

例:

- `Day0（04/10 金）`
- `Day1（04/11 土）`

projection 実行前に operations 正本を読み、
各 task の `rolling_day` と Day 見出しを対応づけて、
その暦日を task の既定 `date` 候補として使う。

つまり、
Day 日付は operations に存在しており、
projection 側がそれを Todoist `date` に変換して反映する。

### 例

```text
why_now: いまの task を Todoist で見える化する価値が大きい
notes: operations が正本 / create・update・close を含む
source_ref: notes/03_plan/2026-04_phase1_todoist_outlook_foundation.md, notes/02_design/2026-03-25_strategy_api_and_tasks_boundary.md
ref: notes/04_operations/active_operations.md
```

### 見送る理由

- `priority`:
  operations 側に安定した優先度 schema がまだない

- `labels`:
  現時点では execution view の最小成立に不要

- `duration`:
  今回の投影目的に対して優先度が低い

- `parent_id`:
  親子関係の高度対応は今回の非対象

### create 先 project 方針

今回のプロトタイプでは、
Todoist task の create 先 project を指定できるようにする。

一般の tasks API では `project_id` を create input として受け取れる。

operations projection では、
operations task 本文に project を持たせず、
projection 実行コンテキストから `project_id` を渡す。

`project_id` は ADAM 専用の概念ではない。
これは execution projection の投影先 Todoist project を指定するための汎用入力である。

現段階では ADAM 運用で先に使うが、
将来は EVE を含む他の execution view にも適用する。

### 採用理由

- 開発コントローラー task と一般 task の混入を避けられる
- operations task 本文へ project 固有設定を埋め込まない
- 投影先 project の切替を実行側設定で扱える
- 将来 EVE 側で execution view を分離する考え方とも整合する

---

## 投影前の事前参照

Todoist の task を変更する前に、
先に対象 project の現状 task を参照して把握する。

### 目的

- 上書き対象を誤らない
- 二重作成を減らす
- Todoist 側の現状と operations 側の想定差分を確認する
- date / deadline の現在値も比較対象に含める

### 手順

1.
projection target project を決める

2.
Todoist の現状 task を `listTasks(project_id=...)` で取得する

3.
operations 側 task と Todoist 側 task を対応づける

4.
create / update / close / delete / noop を判定する

5.
差分がある task のみ反映する

### 原則

- 変更前の Todoist 参照を省略しない
- `external.todoist_task_id` がある task も、更新前に現状を再参照する
- 事前参照は projection service の責務に含める

---

## projection 対象判定

### create 条件

- active_operations に存在する task である
- projection 対象 task である
- `external.todoist_task_id` が未設定
- Todoist 側に既存対応がない

### update 条件

- active_operations に存在する task である
- `external.todoist_task_id` が設定済み
- content / description / date / deadline / status に変更がある
- close / delete 条件に該当しない

### close 条件

- 前回は active に存在した
- 今回は active から外れた
- かつ operations 上で完了扱いになった
- `external.todoist_task_id` が設定済み

### delete 条件（現行プロトタイプ）

- 前回は active に存在した
- 今回は active から外れた
- operations 上で完了扱いではない
- `external.todoist_task_id` が設定済み

### 補足

現行プロトタイプでは、
Todoist の execution view は active を映す面として扱う。

そのため、
完了以外の理由で active から外れた task も、
Todoist 上では削除対象とする。

### 将来運用への拡張方針

将来、投影対象を `active + next` に広げた場合は
以下のルールへ拡張する。

- active + next から外れたら delete
- active ⇔ next の移動では delete しない
- 完了して外れた場合は close を優先する

---

## 同名 task 許容方針

operations では同名 task を許容する。

Todoist 側にも、
同名 task が複数存在しうる。

そのため、
`task` 文字列だけで task を一意識別する設計にはしない。

### 原則

- 同名 task が複数あっても、そのまま Todoist に反映する
- 同名だからといって 1 件にまとめない
- 既存 Todoist task が operation の同じ task であれば上書きする
- 「同じ task」判定の主キーは `external.todoist_task_id` とする

### 初回 create

- `external.todoist_task_id` がない task は create 候補とする
- 同名 task が複数あっても、対応 ID がなければそれぞれ別 task として create しうる
- create 後は返却された Todoist task ID をそれぞれの operations task に保存する

### 2回目以降の update

- `external.todoist_task_id` があれば、その Todoist task を更新対象とする
- 他に同名 task が存在しても影響しない
- 上書き対象の識別は task 名ではなく対応済み ID に依存する

---

## 二重作成防止

最小段階では以下の順で扱う。

1.
operations task の `external.todoist_task_id` がある場合は
既存 Todoist task を更新対象とみなす

2.
ID がない場合は、
事前参照した Todoist task の中から
同名かつ description 上の正本参照が一致する候補を補助的に探す

3.
候補が 1 件に定まる場合のみ
その ID を `external.todoist_task_id` に保存して update 対象へ昇格する

4.
候補がない場合は create する

5.
候補が複数で曖昧な場合は
安全側で create する

### 方針

- 最優先キーは `external.todoist_task_id` とする
- 同名 task 許容のため、task 名だけでは上書き対象を決めない
- 補助照合は初回 create 時の限定的手段とする
- rename に弱い補助照合へ依存し続けない
- 二重作成が起きた場合はログで検知できるようにする

---

## 更新主体の制約

今回のプロトタイプでは、
operations 正本の更新主体は ADAM に限定する。

つまり、

- ADAM が operations を更新する
- その結果として Todoist へ投影する

のであって、

- Todoist 側の変更を契機に operations を更新する

ことはしない。

この制約により、
正本の所在を曖昧にせずにプロトタイプを成立させる。

---

## 半自動実行方針

今回の projection 実行タイミングは半自動とし、
主トリガーは operations rolling とする。

意味は以下。

- ADAM が operations rolling を行う
- active_operations が更新される
- rolling 後の active task に対して projection 条件を判定する
- 条件を満たす場合は、そのまま続けて Todoist に create / update / close / delete を反映する

これは完全自動同期ではない。

- Todoist 側の変更を監視しない
- 外部起点の逆流はしない
- ADAM が rolling を通して operations 正本を更新した文脈の中でのみ投影する

### 採用理由

- active の確定点が rolling だから
- create / update / close / delete 判定を一箇所に集約できる
- active のみ対象なら誤投影範囲も限定できる
- 日常運用の区切りとして分かりやすい
- まずは最小の実運用価値を早く出せる

---

## 処理フロー

### create

operations rolling
↓
active 更新
↓
Todoist 現状参照
↓
投影対象判定
↓
`external.todoist_task_id` 未設定確認
↓
Todoist create
↓
`external.todoist_task_id` 保存

### update

operations rolling
↓
active 更新
↓
Todoist 現状参照
↓
差分判定
↓
Todoist update

### close

operations rolling
↓
Todoist 現状参照
↓
前回 active と今回 active を比較
↓
active から外れた task を確認
↓
その task が operations 上で完了扱いなら
Todoist close

### delete

operations rolling
↓
Todoist 現状参照
↓
前回 active と今回 active を比較
↓
active から外れた task を確認
↓
その task が operations 上で未完了なら
Todoist delete

---

## 最小 service interface（repo 接続版）

今回の projection service は、
現状 repo の tasks API / service / Todoist client に接続できる形で切る。

方針は以下。

- projection 判定ロジックは新しい projection service に置く
- Todoist API 呼び出しは既存 `src/services/todoist/client.js` を土台にする
- close は独立ロジックとして考えるが、client interface は現状互換で `updateTask(..., { completed: true })` を使う
- delete は現状 client にないため、最小追加として定義する
- create 先 project は `project_id` として create payload に流せるようにする

### 層構成

```text
operations rolling
  ↓
projection service
  ↓
tasks service / todoist client
  ↓
Todoist API
```

### projection service の役割

- rolling 前後の active 差分を受ける
- projection 前に Todoist 現状 task を取得する
- task ごとの action を判定する
- Todoist payload を組み立てる
- Todoist 実行結果を operations task の `external.todoist_task_id` に反映する
- 必要に応じて `project_id` を create payload に付与する
- operations の日付情報を Todoist `date` / `deadline` に変換する

### projection service の最小 entrypoint

```ts
projectActiveOperations(params: {
  previousActiveTasks: OperationTask[]
  currentActiveTasks: OperationTask[]
  currentTodoistTasks?: TodoistTask[]
  rollingDayDates?: Record<string, string>
}): Promise<ProjectionExecutionResult[]>
```

### ProjectionExecutionResult

```ts
type ProjectionExecutionResult = {
  action: "create" | "update" | "close" | "delete" | "noop"
  taskKey: string
  todoistTaskId?: string
  applied: boolean
  reason: string
}
```

### projection service の内部補助関数

```ts
decideProjectionAction(params: {
  previousTask?: OperationTask
  currentTask?: OperationTask
  currentTodoistTask?: TodoistTask
}): {
  action: "create" | "update" | "close" | "delete" | "noop"
  reason: string
}
```

```ts
buildProjectionPayload(task: OperationTask, context: {
  rollingDayDate?: string
}): {
  content: string
  description: string
  due_string?: string
  deadline_date?: string
}
```

```ts
applyTodoistTaskId(params: {
  task: OperationTask
  todoistTaskId: string
}): OperationTask
```

### projectActiveOperations の入出力例

以下は、rolling 前後の active 差分から
`create / update / close / delete`
を判定する 1 ケース例である。

#### previousActiveTasks

```ts
const previousActiveTasks: OperationTask[] = [
  {
    task: "operations → Todoist 片方向 projection プロトタイプの最小仕様を design に整理する",
    source_ref: [
      "notes/03_plan/2026-04_phase1_todoist_outlook_foundation.md"
    ],
    rolling_day: "Day0",
    why_now: [
      "いまの task を Todoist で見える化する価値が大きい"
    ],
    notes: [
      "operations が正本",
      "Todoist は execution view"
    ],
    external: {
      todoist_task_id: "1001"
    }
  },
  {
    task: "手動 rolling 1周目で迷った点を抽出し、program に寄せる責務候補を整理する",
    source_ref: [
      "notes/00_inbox/dev_memo/2026-04-06_manual_rolling_round1_notes.md"
    ],
    rolling_day: "Day0",
    notes: [
      "迷いの多い判断点を収集する"
    ],
    external: {
      todoist_task_id: "1002"
    }
  },
  {
    task: "旧 active task の未完了サンプル",
    source_ref: [
      "notes/04_operations/active_operations.md"
    ],
    rolling_day: "Day0",
    notes: [
      "次の rolling で active から外れる想定"
    ],
    external: {
      todoist_task_id: "1003"
    }
  }
]
```

#### currentActiveTasks

```ts
const currentActiveTasks: OperationTask[] = [
  {
    task: "operations → Todoist 片方向 projection プロトタイプの最小仕様を design に整理する",
    source_ref: [
      "notes/03_plan/2026-04_phase1_todoist_outlook_foundation.md"
    ],
    rolling_day: "Day0",
    why_now: [
      "いまの task を Todoist で見える化する価値が大きい"
    ],
    notes: [
      "operations が正本",
      "Todoist は execution view",
      "delete 条件まで整理した"
    ],
    external: {
      todoist_task_id: "1001"
    }
  },
  {
    task: "Phase 0 plan に対する現行 operations の接続を見直す",
    source_ref: [
      "notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md"
    ],
    rolling_day: "Day1",
    why_now: [
      "直近作業が Phase 0 完了条件へどう効くかを再確認する必要がある"
    ],
    notes: [
      "plan と operations の対応を揃える"
    ],
    due_date: "2026-04-11",
    due_type: "date"
  },
  {
    task: "手動 rolling 1周目で迷った点を抽出し、program に寄せる責務候補を整理する",
    source_ref: [
      "notes/00_inbox/dev_memo/2026-04-06_manual_rolling_round1_notes.md"
    ],
    rolling_day: "Day1",
    notes: [
      "迷いの多い判断点を収集する",
      "観察結果を追加した"
    ],
    external: {
      todoist_task_id: "1002"
    }
  }
]
```

#### 判定結果

```ts
const result: ProjectionExecutionResult[] = [
  {
    action: "update",
    taskKey: "1001",
    todoistTaskId: "1001",
    applied: true,
    reason: "todoist_task_id があり、notes に変更があるため"
  },
  {
    action: "create",
    taskKey: "create:Day1:Phase 0 plan に対する現行 operations の接続を見直す",
    todoistTaskId: "1004",
    applied: true,
    reason: "active に新規追加され、todoist_task_id が未設定のため"
  },
  {
    action: "update",
    taskKey: "1002",
    todoistTaskId: "1002",
    applied: true,
    reason: "todoist_task_id があり、rolling_day / notes に変更があるため"
  },
  {
    action: "delete",
    taskKey: "1003",
    todoistTaskId: "1003",
    applied: true,
    reason: "active から外れ、完了扱いではないため"
  }
]
```

#### 補足

- `taskKey` は update / close / delete では `todoist_task_id` を優先する
- create 前の一時 key は `create:<rolling_day>:<task>` のような補助形式でよい
- 同名 task 許容のため、`task` 文字列単独を安定 key としては使わない
- projection target project を指定する場合は `context.project_id` または `context.todoistProjectId` を create 時に渡す

### 既存 repo に合わせた Todoist client interface

現状 code を踏まえると、
Todoist client の最小 interface は以下とする。

```ts
createTask(input: {
  content: string
  description: string
  project_id?: string
  due_string?: string
  deadline_date?: string
}): Promise<{ id: string }>
```

```ts
updateTask(
  todoistTaskId: string,
  input: {
    content?: string
    description?: string
    due_string?: string
    deadline_date?: string
    completed?: true
  }
): Promise<unknown>
```

```ts
listTasks(input: {
  project_id?: string
  section_id?: string
  parent_id?: string
  label?: string
  cursor?: string
  limit?: number
}): Promise<unknown>
```

```ts
deleteTask(todoistTaskId: string): Promise<void>
```

### close の扱い

現状 repo では close 専用 client は持たず、
`updateTask(todoistTaskId, { completed: true })`
で Todoist close endpoint を叩く構造になっている。

そのため、projection service 側では action を `close` として扱ってよいが、
client 呼び出しは現状互換で行う。

### client 実装差分の最小整理

現状の `src/services/todoist/client.js` を読む限り、
projection プロトタイプのために必要な追加差分は小さい。

すでに満たしている点:

- `createTask(input, context)` がある
- `updateTask(taskId, input, context)` がある
- `updateTask(..., { completed: true })` により close を実行できる
- `listTasks(input, context)` がある
- `todoistRequest()` と共通エラー正規化がある

最小追加が必要な点:

- `deleteTask(taskId, context)` がない
- `createTask` の input に `project_id` を通す必要がある
- `createTask / updateTask` の input に `due_string / deadline_date` を通す必要がある

### client 差分方針

- `deleteTask` は `client.js` に直接追加する
- `createTask` は `project_id` を受け取れるようにする
- `createTask / updateTask` は `due_string / deadline_date` を受け取れるようにする
- 既存の `todoistRequest` / `createError` / `normalizeTodoistError` を再利用する
- close を独立関数へ分けるのは今回必須ではない
- projection service は既存 `createTask / updateTask / listTasks` に接続し、delete のみ新設利用する

### interface 方針

- projection service は action 判定に責務集中する
- tasks API は薄いままにする
- Todoist 固有の request shape は client に閉じる
- repo 既存の `createTask / updateTask / listTasks` 命名は尊重する
- delete のみ最小追加で拡張する
- create 先 project の選択は input または projection context で扱う

---

## instruction / Action 統合方針

今回の projection は、
ADAM が既存 `createTask` / `updateTask` Action を
task ごとに直接連打して扱うのではなく、
専用 projection Action から呼ぶ前提で整理する。

理由は以下。

- operations → Todoist projection は複数 task の差分判定を含む
- create / update / close / delete を task 単位で都度手書きすると責務が崩れる
- dry-run と apply を分けたい
- projection target project の指定を一箇所で扱いたい

### 最小 Action イメージ

```ts
projectOperationsToTodoist({
  target: "active",
  mode: "dry_run" | "apply",
  project_id?: string
})
```

### 最小入力

- `target`:
  現行プロトタイプでは `"active"` 固定

- `mode`:
  - `dry_run`
  - `apply`

- `project_id`:
  投影先 Todoist project を指定するための任意入力。
  未指定時は Action 実装側の既定値または context 設定を使う。

### 最小出力

```ts
{
  ok: true,
  data: {
    target: "active",
    mode: "dry_run" | "apply",
    results: ProjectionExecutionResult[]
  }
}
```

### 役割分離

- instruction:
  ADAM が「operations を Todoist に投影する」と判断する層
- Action:
  projection 実行の入口
- projection service:
  create / update / close / delete の差分判定と実行
- Todoist client:
  外部 API 呼び出し

### 現段階の位置づけ

現時点では
`src/services/tasks/projection.js`
が service 実装の下請け層であり、
専用 Action 本体はまだ未実装である。

そのため、次段では
この service を呼ぶ専用 Action を追加し、
ADAM instruction からはその Action を使う形へ寄せる。

### createTask Action との関係

既存 `createTask` Action は残す。

ただし ADAM の operations projection では、
原則として既存 `createTask` を task ごとに直叩きせず、
専用 projection Action を優先する。

既存 `createTask` は、

- 単発 Todoist task 作成
- 手動補助操作
- projection 以外の通常 task 作成

に使う。

---

## operations に external を持つ理由

今回の方針では、
operations と Todoist task 管理は将来 EVE で密接につながる前提を取る。

そのため、
`todoist_task_id` を別管理にせず、
operations task 本文に持たせる方が自然である。

理由は以下。

- task と外部 Todoist task の対応が一箇所で見える
- create 後の update / close / delete 判定が単純になる
- 別 state ファイルとの突合が不要になる
- EVE へ移植する際のモデル連続性が高い
- operations を execution 正本として扱う考えと整合しやすい

---

## API / 実装の含意

実装時は、
Todoist 固有仕様を service / adapter に閉じる。

想定される責務は以下。

- projection service
- Todoist client
- operations task → Todoist payload 変換
- operations task 内 `external.todoist_task_id` の読取 / 書込
- create / update / close / delete の分岐
- projection target project としての `project_id` 受渡し
- date / deadline 変換
- projection 前の Todoist 現状参照
- projection 専用 Action の入口

今回の段階では、
tasks API 全体の再設計は行わず、
operations projection を差し込める最小 interface を先に固定する。

---

## 既存 design との関係

### 2026-03-25_strategy_todoist_sync_phase1.md との関係

- 将来の双方向同期方針は有効
- 今回はその前段のプロトタイプ制約を切り出したもの
- 将来はこの design を上位仕様へ統合または置換する

### 2026-03-25_strategy_api_and_tasks_boundary.md との関係

- Todoist を execution view とする考え方を継承する
- 外部サービス固有仕様を service / adapter に閉じる原則も継承する
- ただし今回の正本は strategy domain ではなく、ADAM が扱う operations 正本である

### 2026-03-25_tasks_api_alignment_design.md との関係

- Todoist 固有変換を service 層へ寄せる原則を継承する
- priority / duration の完全対応は今回の非対象とする
- date / deadline と事前参照は今回の projection 拡張要件として追加する

---

## 成功条件

- active_operations の task を Todoist に create できる
- active_operations の更新を Todoist に update できる
- active_operations の完了を Todoist に close できる
- active から外れた未完了 task を Todoist から delete できる
- projection target project を指定して Todoist に create できる
- projection 前に Todoist 現状 task を参照できる
- operations の date / deadline を Todoist に反映できる
- 同名 task を許容したまま Todoist に create / update できる
- 専用 projection Action から dry-run / apply を呼び分けられる
- 二重作成を最低限防げる
- Todoist を正本にしない運用が維持できる
- 将来の双方向同期方針と矛盾しない

---

## 次に落とす作業

- projection 前の Todoist 現状参照を service に追加する
- date / deadline の payload 変換を service / client に追加する
- active の 1 task で date / deadline を含む dry-run を試す
