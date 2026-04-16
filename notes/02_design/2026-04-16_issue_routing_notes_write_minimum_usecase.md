# 2026-04-16 issue_routing_notes_write_minimum_usecase

## 目的

issue routing の `action plan` を、
notes 反映へ接続する最小 usecase を固定する。

本メモは、
`notes write` を曖昧な概念のままにせず、
どの入力を受けて、
どこまでを責務とし、
何を返すかを最小構成で定義することを目的とする。

---

## 結論

最小 usecase は次の 1 本とする。

`applyIssueRoutingActionPlan`

この usecase は、

- `routed_candidates`
- `action_plan`
- `source_ref`
- 実行モード

を受け取り、
notes へ反映すべき draft を生成し、
必要な write を実行する。

ただし最小段階では、
いきなり全反映を行わない。

まずは以下だけを対象にする。

1.
`design_updates`

2.
`operations_candidates`

3.
`future_candidates`

4.
`archive_issue`

`keep_issue` は原則 no-op とし、
issue 本体を毎回更新しない。

---

## なぜこの切り方か

理由は 3 つある。

### 1. routing と write を分けるため

issue routing の責務は、
どこへ送るかの判定と
action plan の生成までである。

write まで混ぜると、

- routing 判定
- notes 保存
- エラー処理
- 再試行判断

が 1 箇所に混ざる。

したがって、
write は後段 usecase に分ける必要がある。

### 2. review / rolling と混ざるのを防ぐため

operations への正式配置は rolling の責務である。

したがって、
issue routing 後処理で
`active_operations.md` を直接更新してはいけない。

ここでやるのは、
operations に送る candidate draft の生成までに留める。

### 3. issue 本体を毎回書き換えないため

可変評価 schema の設計では、

- issue = 論点の記録
- routing decision = 最新評価
- action plan = 反映内容

を分けている。

そのため、
`keep_issue` を受けたからといって
issue 本体へ毎回 `impact_now` を書き戻す必要はない。

最小段階では、
`keep_issue` は no-op が自然である。

---

## usecase の位置づけ

層の分離は次の通りとする。

### 1. issue routing

責務

- issue を評価する
- `route_to` を決める
- `routed_candidates` を返す
- `action_plan` を返す

### 2. notes write usecase

責務

- `action_plan` を解釈する
- 書き込み対象の notes path を決める
- create / update の payload を作る
- 必要な write を呼ぶ
- 実行結果をまとめる

### 3. repo-resource notes API

責務

- create / update / delete を実行する

---

## 最小入力

`applyIssueRoutingActionPlan` の最小入力は次とする。

- `routed_candidates`
- `action_plan`
- `mode`
- `source_ref`
- `now`

### routed_candidates

routing decision を含んだ candidate 一覧。

ここから、

- issue_id
- title
- route_to
- reason
- evaluated_at
- impact_now
- urgency_now
- metadata

を参照できる前提とする。

### action_plan

`buildIssueRoutingActions()` の返り値。

対象キー

- `design_updates`
- `operations_candidates`
- `future_candidates`
- `archive_issue`
- `keep_issue`

### mode

最小では次の 2 つを持つ。

- `dry_run`
- `apply`

`dry_run` では payload 生成だけ行い、
実 write はしない。

`apply` で初めて notes create / update を呼ぶ。

### source_ref

入力 issue log や関連 source を保持する。

反映先 draft にも渡す。

### now

時刻依存を固定するための入力。

未指定時は `new Date().toISOString()` でよい。

---

## 最小出力

最小出力は次とする。

- `design_writes`
- `operations_candidate_writes`
- `future_writes`
- `archive_writes`
- `kept_issues`
- `skipped`
- `mode`

各要素は、
「どこへ何を書こうとしたか」
または
「何もしなかったか」
が分かる形を持つ。

---

## 各 action の最小扱い

### 1. keep_issue

最小段階では no-op とする。

理由

- issue は論点記録であり、
  routing のたびに毎回更新しない
- 可変評価は routing decision 側で持てばよい
- issue 本体 write を先に入れると責務が広がりすぎる

返り値には次だけ残す。

- issue_id
- title
- route_to
- reason
- evaluated_at
- impact_now
- urgency_now
- action_type: `keep_issue`
- write_status: `no_op`

### 2. design_updates

`notes/02_design/` に向けた draft を生成する。

最小では、
1 action item = 1 design draft とする。

出力 payload の最小項目

- target_layer: `02_design`
- suggested_file
- title
- source_ref
- derived_from_issue_id
- evaluated_at
- impact_now
- urgency_now
- reason
- body

この段階では、
同一論点の統合や既存 design とのマージは必須にしない。

まずは create 前提の draft を安定させる。

### 3. operations_candidates

`active_operations.md` を直接更新しない。

代わりに、
operations rolling に渡すための candidate draft を生成する。

最小では保存先をまだ固定しなくてよいが、
少なくとも次のどちらかに限定する。

- notes/04_operations 配下の candidate draft file
- write はせず return のみで rolling 入力へ渡す

現段階では後者でもよい。

重要なのは、
issue routing 後処理が
`active_operations.md` を直接 mutate しないことである。

### 4. future_candidates

`80_future/issue/` か
`80_future/design/` へ送る draft を生成する。

最小では、
route_to が future のものを
`80_future/issue/` へ送る前提でよい。

design へ再分岐する必要が出たら後段で分ける。

### 5. archive_issue

最小段階では delete しない。

archive 対象 note を生成するに留める。

理由

- issue routing 直後に即 delete すると追跡性が落ちる
- archive は退避であり、削除ではない
- delete 許可範囲や競合処理を早く背負いすぎない方が安全

したがって、
最小案では
`99_archive/issue/` 相当の draft を返す、
または archive write を行う。

---

## suggested_file の最小ルール

ファイル名は完全自動で厳密化しすぎず、
最小では以下でよい。

### design_updates

`02_design/YYYY-MM-DD_<issue_id>_<slug>.md`

### future_candidates

`80_future/issue/YYYY-MM-DD_<issue_id>_<slug>.md`

### archive_issue

`99_archive/issue/YYYY-MM-DD_<issue_id>_<slug>.md`

operations_candidates は、
保存先を確定するまで file を持たなくてよい。

---

## body の最小構成

design / future / archive の body は最小で次を含む。

- title
- source issue
- source_ref
- routing decision
- reason
- evaluated_at
- impact_now
- urgency_now
- next_action
- raw summary or description

これにより、
後から見ても
「なぜこの write が発生したか」を追える。

---

## dry_run と apply の違い

### dry_run

- payload を生成する
- suggested_file を決める
- body を作る
- 実際の create / update はしない
- 結果だけ返す

### apply

- dry_run と同じ payload を作る
- notes API の create / update を呼ぶ
- write 結果の status / sha を返す

最初の実装段階では、
`dry_run` を先に固定するのが自然である。

---

## 最小 I/O 例

### 入力

- issue A
  - route_to: design

- issue B
  - route_to: operations

- issue C
  - route_to: future

- issue D
  - route_to: archive

### 出力

- `design_writes`
  - issue A の design draft

- `operations_candidate_writes`
  - issue B の operations candidate draft

- `future_writes`
  - issue C の future draft

- `archive_writes`
  - issue D の archive draft

- `kept_issues`
  - keep_issue 扱いの issue 一覧

---

## 実装順

### 第1段

`applyIssueRoutingActionPlan` を
`dry_run` のみで実装する。

この段では、

- payload 生成
- suggested_file 決定
- body 生成
- 結果返却

だけ行う。

### 第2段

`design_updates` の apply を入れる。

最初の実 write は
`02_design` の create のみでよい。

### 第3段

`future_candidates` と `archive_issue` の apply を入れる。

### 第4段

operations candidate の保存形式を固定し、
rolling 接続へ進む。

---

## やらないこと

最小段階では次をやらない。

- `active_operations.md` の直接更新
- issue 本体への毎回 write
- review decision 履歴の保存
- 既存 design file との高度な merge
- delete を使った即時除去
- archive と future の複雑な再分岐

---

## 未決定

現時点で未決定なのは次である。

- operations candidate を notes file として保存するか
- design_updates を既存 design に merge するか
- archive の実保存先をどう切るか
- future を issue / design にどう分けるか
- apply 時に create / update をどう判定するか

ただし、
これらは後段でよい。

まずは
`action plan を notes 反映可能な payload に変換する usecase`
を固定することが先である。

---

## 判断

issue routing の `notes write` は、
単なる概念ではなく、
後段 usecase として分けるのが自然である。

最小形は次である。

- usecase 名:
  `applyIssueRoutingActionPlan`

- まずは `dry_run` を固定する

- 対象は
  `design_updates`
  `operations_candidates`
  `future_candidates`
  `archive_issue`

- `keep_issue` は no-op とする

- operations への正式投入は rolling に残し、
  issue routing 後処理では candidate draft までで止める

この形なら、
保存 / routing / 反映 / rolling の責務分離を崩さずに、
notes write 接続を小さく前進できる。
