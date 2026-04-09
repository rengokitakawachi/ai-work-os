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

### operations 側で必要な情報

各 task に対して、少なくとも以下を扱える必要がある。

- logical_task_key
- title
- notes または description 生成元
- source_ref
- status
- external.todoist_task_id（未設定可）

### 補足

初期段階では、
`logical_task_key` は
task title と source_ref の組み合わせ、
あるいは別途安定 ID を持つ方法を比較対象とする。

ただし title だけに依存すると
rename 時に二重作成リスクがあるため、
永続的には title 単独判定を避ける。

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
operations task に `external.todoist_task_id` がある場合は
既存 Todoist task を更新対象とみなす

2.  
ID がない場合は、
暫定的に logical_task_key に基づく照合を行う

3.  
照合で既存 task が見つかれば ID を回収する

4.  
見つからなければ create する

### 方針

- まずは `todoist_task_id` を最優先キーとする
- 暫定照合は補助であり、恒久キーの代替にしない
- 二重作成が起きた場合はログで検知できるようにする

---

## description 方針

Todoist に送る description は最小構成とする。

含める候補:

- operations 上の notes 要約
- source_ref の抜粋
- rolling_day
- 正本参照が notes/04_operations にあることの明記

ただし、
長すぎる source_ref 全文をそのまま送らず、
実行時に必要な最小情報へ圧縮する。

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
todoist_task_id 未設定確認
↓
Todoist create
↓
todoist_task_id 保存

### update

operations 更新
↓
差分判定
↓
Todoist update
↓
必要に応じて同期ログ更新

### close

operations で完了
↓
todoist_task_id 確認
↓
Todoist close
↓
必要に応じて projection 状態更新

---

## API / 実装の含意

実装時は、
Todoist 固有仕様を service / adapter に閉じる。

想定される責務は以下。

- projection service
- Todoist client
- operations task → Todoist payload 変換
- todoist_task_id 保存箇所の決定
- create / update / close の分岐

今回の design では、
具体 API 形状までは固定しない。

まずは
「どういう制約で何を反映するか」
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

- logical_task_key をどう安定化させるか
- todoist_task_id を operations のどこに保持するか
- description の最小フォーマット
- active のみ投影するか、選択投影も許すか
- projection 実行タイミングを手動にするか、半自動にするか

---

## 次に落とす作業

- external.todoist_task_id の保持位置を決める
- operations task から Todoist payload への変換項目を確定する
- create / update / close の最小 service インターフェースを切る
- 手動実行フローで 1 task 投影を試す
