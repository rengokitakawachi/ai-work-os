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
- due / priority / duration の完全同期
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
  external:
    todoist_task_id:
```

### 方針

- `todoist_task_id` は operations task 本文の `external` に保持する
- create 後の update / close / delete は `external.todoist_task_id` を主キーとして扱う
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

今回見送る項目:

- priority
- due
- labels
- deadline
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

- `due` / `deadline`:
  operations 上の日付と Todoist の due / deadline semantics がまだ一致していない

- `labels`:
  現時点では execution view の最小成立に不要

- `duration`:
  今回の投影目的に対して優先度が低い

- `parent_id`:
  親子関係の高度対応は今回の非対象

---

## projection 対象判定

### create 条件

- active_operations に存在する task である
- projection 対象 task である
- external.todoist_task_id が未設定
- Todoist 側に既存対応がない

### update 条件

- active_operations に存在する task である
- external.todoist_task_id が設定済み
- title / description / status に変更がある
- close / delete 条件に該当しない

### close 条件

- 前回は active に存在した
- 今回は active から外れた
- かつ operations 上で完了扱いになった
- external.todoist_task_id が設定済み

### delete 条件（現行プロトタイプ）

- 前回は active に存在した
- 今回は active から外れた
- operations 上で完了扱いではない
- external.todoist_task_id が設定済み

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

## 二重作成防止

最小段階では以下の順で扱う。

1.
operations task の `external.todoist_task_id` がある場合は
既存 Todoist task を更新対象とみなす

2.
ID がない場合は、
暫定的に task title と source_ref を用いて既存 task を照合する

3.
照合で既存 task が見つかれば
その ID を `external.todoist_task_id` に保存する

4.
見つからなければ create する

### 方針

- 最優先キーは `external.todoist_task_id` とする
- title / source_ref 照合は初回 create 時の補助に留める
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
差分判定
↓
Todoist update

### close

operations rolling
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
- task ごとの action を判定する
- Todoist payload を組み立てる
- Todoist 実行結果を operations task の `external.todoist_task_id` に反映する

### projection service の最小 entrypoint

```ts
projectActiveOperations(params: {
  previousActiveTasks: OperationTask[]
  currentActiveTasks: OperationTask[]
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
}): {
  action: "create" | "update" | "close" | "delete" | "noop"
  reason: string
}
```

```ts
buildProjectionPayload(task: OperationTask): {
  content: string
  description: string
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
    ]
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
    taskKey: "operations → Todoist 片方向 projection プロトタイプの最小仕様を design に整理する",
    todoistTaskId: "1001",
    applied: true,
    reason: "todoist_task_id があり、notes に変更があるため"
  },
  {
    action: "create",
    taskKey: "Phase 0 plan に対する現行 operations の接続を見直す",
    todoistTaskId: "1004",
    applied: true,
    reason: "active に新規追加され、todoist_task_id が未設定のため"
  },
  {
    action: "update",
    taskKey: "手動 rolling 1周目で迷った点を抽出し、program に寄せる責務候補を整理する",
    todoistTaskId: "1002",
    applied: true,
    reason: "todoist_task_id があり、rolling_day / notes に変更があるため"
  },
  {
    action: "delete",
    taskKey: "旧 active task の未完了サンプル",
    todoistTaskId: "1003",
    applied: true,
    reason: "active から外れ、完了扱いではないため"
  }
]
```

#### 補足

- `taskKey` は初期段階では task 文字列をそのまま使う
- rename に弱いため、将来は安定 key へ移行余地がある
- close 例は、active から外れた task が完了扱いになった場合に `action: "close"` へ分岐する

### 既存 repo に合わせた Todoist client interface

現状 code を踏まえると、
Todoist client の最小 interface は以下とする。

```ts
createTask(input: {
  content: string
  description: string
}): Promise<{ id: string }>
```

```ts
updateTask(
  todoistTaskId: string,
  input: {
    content?: string
    description?: string
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

### interface 方針

- projection service は action 判定に責務集中する
- tasks API は薄いままにする
- Todoist 固有の request shape は client に閉じる
- repo 既存の `createTask / updateTask / listTasks` 命名は尊重する
- delete のみ最小追加で拡張する

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
- due / priority / duration などの完全対応は今回の非対象とする

---

## 成功条件

- active_operations の task を Todoist に create できる
- active_operations の更新を Todoist に update できる
- active_operations の完了を Todoist に close できる
- active から外れた未完了 task を Todoist から delete できる
- 二重作成を最低限防げる
- Todoist を正本にしない運用が維持できる
- 将来の双方向同期方針と矛盾しない

---

## 次に落とす作業

- `src/services/todoist/client.js` に必要な最小追加差分を確認する
- active の 1 task で rolling 起点の半自動投影を試す
