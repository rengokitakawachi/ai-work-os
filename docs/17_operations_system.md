# 17 Operations System

## 目的

operations を短期実行計画の正本として定義し、
AI Work OS における実行層の基盤を確立する。

---

## 位置づけ

- roadmap は上位方針
- plan は中期計画
- operations は短期実行計画

operations は「今何をやるか」を決定する正本とする。

日中運用では、
`active_operations` を実行対象の正本として扱う。

Todoist など外部 task tool は operations の projection とし、
execution source of truth ではない。

---

## 基本原則

- operations は短期実行順の正本とする
- operations は 7日ローリング計画を持つ
- operations は schedule ではない
- future に operations は置かない
- Outlook は schedule の正本とする
- Todoist は operations の projection とする
- rolling の確定更新は review 地点で行う
- 日中は active の順序と Day 構造を原則維持する
- 完了判定と構造変更判定は分けて扱う
- weekly review で archive_operations の snapshot を保存する
- weekly review では issue routing の要否を必ず確認する
- weekly review は report 作成だけでは完了しない

---

## 構造

operations は以下の構造を持つ。

- active_operations（正本）
- next_operations（近未来候補）
- archive_operations（一時アーカイブ）

---

## active_operations

active_operations は短期実行順の正本とする。

### 7日ローリングモデル

active_operations は以下の構造を持つ。

- Day0（今日）
- Day1（明日）
- Day2
- Day3
- Day4
- Day5
- Day6

### ルール

- 各 Day はタスク順序を持つ
- 時刻は持たない
- 仮配置であり、確定スケジュールではない
- 日付は参考であり拘束ではない
- 日中は active を上から順に実行する
- active に完了認識済み task が残っていても、daily review 前なら許容する
- active に完了 task が残っているだけで未整合としない
- archive への移動や Day 再編成の確定は daily review で行う
- Immediate Gate がある場合は、通常 Day より優先して解消する
- Immediate Gate が未完了の場合、その gate に blocked される active task を実行しない
- active の7日構造より、実行可能性と blocker 解消を優先する

### task 粒度と Day capacity

operations rolling / daily review では Day capacity を確認する。

原則として、

- task はおおむね 0.5〜1.5h
- 1 day はおおむね 2h

として扱う。

明示理由なしに軽すぎる Day を作らない。

後続 task を実行不能にする前提作業は、
通常 Day 枠ではなく Immediate Gate として先頭に置く。

---

## next_operations

next_operations は、
active_operations の次に来る近未来候補を保持する。

### ルール

- active_operations にまだ入れないタスクを格納する
- active の次に来る候補プールとして扱う
- active が実行不能な場合の補充候補プールとして扱う
- daily / weekly review で再評価する
- 補助的な日付情報を持てる
- backlog 化しない
- future の代替にしない
- active_operations に入る前提のものだけを置く

next_operations は operations rolling の candidate source の一つであり、
決定権を持つ正本ではない。

---

## archive_operations

archive_operations は、
今週の完了タスクを一時的に保持する。

### ルール

- 完了タスクを必要に応じて格納する
- daily review または weekly review で扱う
- weekly review で内容を整理せず、そのまま snapshot 保存する
- 保存先は `notes/99_archive/operations/YYYY-MM-DD_weekly_operations.md` とする
- snapshot 保存後は空にする
- 長期履歴の正本は `99_archive` 側とする

---

## ローリング更新

### 日中運用

- active_operations を正本として実行する
- 完了認識や軽い順序調整はありうる
- ただし archive 移動と rolling 確定は行わない

日中に次の active task へ進む前に、
現在の focus が本当に閉じているかを確認する。

特に以下が残る場合は、
active の機械的な次 task より closure action を優先する。

- phase-critical gate
- blocker
- user intent drift
- SSOT inconsistency
- issue routing / design routing / schema reflection の未完 closure

### daily review

daily review は rolling の主要確定地点とする。

daily review では、少なくとも以下を扱う。

- Day0 の実績確認
- 完了 task の archive 移動
- 完了タスクの archive_operations 移動
- 未完了タスクの再配置
- Day1 以降の繰り上げ
- 新しい Day6 の補充
- next_operations の再評価
- active_operations の更新
- Immediate Gate の解消状況確認
- Todoist projection 更新要否の判断

daily review は report 作成だけでは完了しない。

### weekly review

weekly review は rolling の再設計地点とする。

weekly review では、少なくとも以下を扱う。

- 7日構成の再設計
- 優先順位の再構築
- active_operations の再評価
- next_operations の再評価
- archive_operations の snapshot 保存
- future の再活性化候補確認
- design 未反映差分の確認
- issue routing の要否確認
- inbox / issue / design / future / operations の滞留確認
- Todoist projection 更新要否の判断
- active_operations と next_operations の次週前提での再調整

weekly review は report 作成だけでは完了しない。

weekly review で未routed issue がある場合は、
issue routing を実行するか、
active_operations / next_operations に明示的に組み込む。

weekly review で issue routing を実行した場合、
issue routing の completed condition を満たすまで weekly review は完了扱いしない。

### weekly review の issue routing check

weekly review では、以下を確認する。

- `notes/01_issues/idea_log.md` に keep issue 以外が滞留していないか
- `notes/01_issues/` に個別 issue file が残っていないか
- design 化すべき issue が holding file で止まっていないか
- operations candidate が pending のまま残っていないか
- future / archive / design / operations disposition が未完の issue がないか
- operations task が削除済み issue file を source_ref していないか
- operations task が必要な design ref を持っているか
- design から archived original issue を追えるか

### weekly review の operations 組み込み

weekly review は任意実行ではなく、
定期的に active_operations / next_operations へ組み込むべき review usecase とする。

weekly review task が active_operations / next_operations に存在しない場合、
daily review または operations rolling 時に追加要否を判断する。

weekly review task の completed condition には、
issue routing check を含める。

### 例外 reroll

日中に reroll が必要になる場合はある。

ただし、
それは通常運用ではなく整合回復として扱う。

許容する例

- active が壊れている
- active に重複がある
- active が実行不能になっている
- 誤混入 task を除去しないと次へ進めない
- Immediate Gate が後続 task を blocking している
- active_operations が stale で、先頭 task を実行すると不整合が拡大する

この場合のみ、
例外的に reroll を行ってよい。

---

## operations rolling の最小責務

operations rolling は、
`next_operations` の先頭をそのまま繰り上げる処理ではない。

operations rolling は、
roadmap / plan を前進させるために、
候補を比較して短期実行順を決める処理とする。

最小責務は次の通り。

- candidate collection
- normalization
- dependency / blocker gate check
- rule evaluation
- ranking
- placement
- Day capacity check

candidate source の例

- roadmap の主要方針
- plan の主要論点や直近作業
- open issue
- design 未反映差分
- next_operations
- future からの再活性化候補
- review で発見された滞留
- runtime / schema reflection gate

next_operations は candidate source の一つであり、
決定権を持つ正本ではない。

---

## issue / design / operations の参照関係

issue routing から operations へ接続する場合、
原則として次の参照 chain を維持する。

    issue
    → design
    → operations
    → archive

### 原則

- design 化が必要な issue は、まず design file または既存 design に接続する
- operations task は未整理の original issue ではなく、整理済み design file を source_ref する
- design file は archived original issue または routing archive を source_ref する
- original issue は source_ref / routed_to / archive_reason 付きで archive へ送る
- design 不要な one-shot cleanup のみ、operations task が archived issue を直接 source_ref してよい
- next_operations に入れる task も、可能な限り design ref を持たせる

### routing 後の source_ref 確認

issue routing 後は、
operations task が削除済み issue file を source_ref していないか確認する。

削除済み issue file を参照している場合は、
archive ref または design ref に差し替える。

---

## Todoist projection

Todoist は operations の projection とする。

Todoist は execution view であり、
operations の正本ではない。

### projection 原則

- operations が正本
- Todoist は projection
- Todoist 側の状態だけで operations を判断しない
- projection apply 前に previous / current active snapshot を用意する
- dry_run 成功を apply 成功と混同しない
- apply 後は returned Todoist task id を operations に戻す
- projection apply 後は read-back / task status を確認する

### due_date / due_type

Todoist projection では、
operations task の `due_date` / `due_type` を扱いうる。

ただし、
runtime-visible schema に field が見えていることと、
actual create / update behavior で反映されることは別である。

due_date / due_type の actual behavior は regression fixture で確認する。

---

## operations と schedule の分離

operations はスケジュールではない。

- operations = 何を進めるか / どの順で進めるか
- Outlook = いつ実行するか / 何時から何時に置くか

この分離を維持する。

---

## 判断

- operations は短期実行計画の正本とする
- 日中運用と review 時運用を分ける
- 7日ローリングにより柔軟な運用を実現する
- next_operations は近未来候補と補充候補を保持する
- archive_operations により週次履歴を軽量に保存する
- daily review は rolling の主要確定地点とする
- weekly review は rolling の再設計地点とする
- weekly review では issue routing check を必須とする
- weekly review は report 作成だけでは完了しない
- operations rolling は next の繰り上げではなく、候補収集・評価・配置の一体処理とする
- issue / design / operations / archive の ref chain を維持する
- Todoist は operations の projection とする
- Outlook を schedule の正本として分離する
