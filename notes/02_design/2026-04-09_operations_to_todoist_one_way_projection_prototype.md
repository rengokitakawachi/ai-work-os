# Operations → Todoist One-Way Projection Prototype Design

## 目的

ADAM が管理する operations 正本を、
Todoist の execution view へ片方向で投影する
最小プロトタイプ仕様を定義する。

今回の目的は、
「今の task を Todoist 上で見えるようにし、
ADAM が operations を更新した結果として
Todoist 側にも create / update / close を反映できる状態」
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
- projection の対象操作は create / update / close とする
- 外部サービス固有仕様は service / adapter に閉じる

---

## 今回の対象

### 対象操作

- create
- update
- close

### 対象データ

- active_operations にある task
- 必要に応じて明示的に選択された task
- title
- 補助 description
- status 相当情報
- source_ref の要約または参照情報
- projection 識別子

---

## 今回の非対象

- Todoist → operations の自動反映
- 双方向同期
- webhook / polling による逆方向同期
- delete 同期
- 高度な競合解決
- 親子関係の高度対応
- due / priority / duration の完全同期
- ユーザーが Todoist 側で行った更新の正本反映
- operations 全層の自動一括投影

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
- create / update / close のどれを行うか決める
- 片方向制約を維持する

### Todoist 側の役割

- execution view
- 実行しやすい一覧表示先
- 必要最小限の外部実行面

### service / adapter 側の責務

- Todoist API パラメータへの変換
- 外部 ID 管理
- 二重作成防止
- update / close 実行
- エラー処理
- Todoist 固有仕様の吸収

---

## 一文定義

operations → Todoist projection とは、
ADAM が更新した operations 正本の task を、
Todoist execution view に
片方向で create / update / close 反映することである。

---

## 最小データモデル

### operations task 本文で必要な情報

今回のプロトタイプでは、
Todoist との対応情報を別 state に分離せず、
operations task 本文に近接して保持する。

各 task に対して、少なくとも以下を扱える必要がある。

- task
- source_ref
- rolling_day
- status 相当情報
- notes または description 生成元
- external.todoist_task_id（未設定可）

### 想定 shape

```yaml
- task: operations → Todoist 片方向 projection プロトタイプの最小仕様を design に整理する
  source_ref:
    - notes/03_plan/2026-04_phase1_todoist_outlook_foundation.md
  rolling_day: Day0
  notes:
    - operations が正本
  external:
    todoist_task_id:
```

### 方針

- `todoist_task_id` は operations task 本文の `external` に保持する
- create 後の update / close は `external.todoist_task_id` を主キーとして扱う
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

- create / update / close の最小プロトタイプ成立に不要
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

- projection 対象 task である
- external.todoist_task_id が未設定
- Todoist 側に既存対応がない

### update 条件

- external.todoist_task_id が設定済み
- title / description / status に変更がある
- close 条件に該当しない

### close 条件

- operations 側で task が完了扱いになった
- external.todoist_task_id が設定済み

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

## 処理フロー

### create

operations 更新
↓
投影対象判定
↓
`external.todoist_task_id` 未設定確認
↓
Todoist create
↓
`external.todoist_task_id` 保存

### update

operations 更新
↓
差分判定
↓
Todoist update

### close

operations で完了
↓
`external.todoist_task_id` 確認
↓
Todoist close

---

## operations に external を持つ理由

今回の方針では、
operations と Todoist task 管理は将来 EVE で密接につながる前提を取る。

そのため、
`todoist_task_id` を別管理にせず、
operations task 本文に持たせる方が自然である。

理由は以下。

- task と外部 Todoist task の対応が一箇所で見える
- create 後の update / close 判定が単純になる
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
- create / update / close の分岐

今回の design では、
具体 API 形状までは固定しない。

まずは
「どういう制約で何を反映するか」
と
「外部IDをどこに持つか」
を先に固定する。

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

- operations task を Todoist に create できる
- operations 更新を Todoist に update できる
- operations 完了を Todoist に close できる
- 二重作成を最低限防げる
- Todoist を正本にしない運用が維持できる
- 将来の双方向同期方針と矛盾しない

---

## 未決事項

- active のみ投影するか、選択投影も許すか
- projection 実行タイミングを手動にするか、半自動にするか

---

## 次に落とす作業

- operations task から Todoist payload への変換項目を確定する
- create / update / close の最小 service インターフェースを切る
- 手動実行フローで 1 task 投影を試す
