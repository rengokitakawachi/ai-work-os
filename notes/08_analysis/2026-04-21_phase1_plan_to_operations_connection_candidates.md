# 2026-04-21 phase1_plan_to_operations_connection_candidates

## 目的

Phase 1 の各 plan を、
operations にどう接続するかを先に整理する。

本メモは、
plan をそのまま実行対象として扱うのではなく、
どの粒度の operations task に落とすのが自然かを明示し、
次回 reroll や plan 接続時の判断を軽くすることを目的とする。

---

## 参照

- `notes/03_plan/2026-04_phase1_todoist_outlook_foundation.md`
- `notes/03_plan/2026-04_phase1_schedule_proposal_and_outlook_write.md`
- `notes/03_plan/2026-04_phase1_teams_and_obsidian_light_use.md`
- `notes/02_design/2026-04-03_plan_layer_operating_spec.md`
- `notes/02_design/2026-04-06_operations_rolling_generation_and_prioritization_spec.md`
- `notes/04_operations/active_operations.md`

---

## 結論

Phase 1 の plan 群は、
operations へ次の順で接続するのが自然である。

1.  
`2026-04_phase1_todoist_outlook_foundation`
- 読取基盤
- 最優先の前提

2.  
`2026-04_phase1_schedule_proposal_and_outlook_write`
- proposal / approval / write
- foundation の後段

3.  
`2026-04_phase1_teams_and_obsidian_light_use`
- 補助レイヤー
- 中核ループ成立後に接続

したがって、
reroll 時の原則は次である。

- まず foundation plan から operations 候補を切る
- proposal / write は foundation の成立確認後に active 候補化する
- Teams / Obsidian は補助レイヤーとして後置する

---

## plan ごとの位置づけ

### 1. todoist_outlook_foundation

役割:
- Todoist read
- Outlook read
- 空き時間把握

意味:
- EVE が task と schedule を同時参照する最小土台
- 後続 plan の前提条件

operations に落とすときの性格:
- foundation
- 前提固定
- 読取中心

---

### 2. schedule_proposal_and_outlook_write

役割:
- priority rule
- slot matching
- proposal format
- approval
- Outlook write

意味:
- foundation で読める状態になった後に、
  実際に提案して反映する最小ループを成立させる

operations に落とすときの性格:
- foundation 依存
- 実験 / MVP ループ
- 書き込み境界を含む

---

### 3. teams_and_obsidian_light_use

役割:
- Teams notification
- Obsidian light use

意味:
- 中核実行系を補助する周辺レイヤー
- 本格統合ではなく限定利用

operations に落とすときの性格:
- 補助系
- 中核 loop 非依存ではない
- 後段に回しやすい

---

## operations 接続案

### A. foundation plan から切る候補

最初に operations 候補化しやすいのは次である。

1.  
`Todoist 一覧取得 API の確認`

理由:
- 実行単位が明確
- 後続の task / schedule 接続の入口になる

2.  
`Outlook Calendar API の読取条件を整理する`

理由:
- read foundation のもう一方の軸
- calendar source の扱いを先に固定する必要がある

3.  
`空き時間判定ルールの最小仕様を決める`

理由:
- read した予定を usable な slot 情報へ変換する前提
- proposal plan の入力にも直結する

4.  
`Todoist task 属性と空き枠突合に使う最小項目を整理する`

理由:
- priority / due / duration 相当の最小接続点を定義できる
- proposal plan に渡す前段整備になる

---

### B. schedule proposal / write plan から切る候補

foundation 後に切るのが自然な候補は次である。

1.  
`スケジュール案提示フォーマットの最小形を決める`

2.  
`優先順位づけルールの最小仕様を決める`

3.  
`承認フローの最小分岐を決める`

4.  
`Outlook write の最小イベント作成条件を整理する`

注意:
- これらは foundation read が未整理のまま先行すると、
  仮定の上に proposal / write を積むことになる
- したがって reroll 時も foundation task より前に置かない方が自然である

---

### C. Teams / Obsidian plan から切る候補

補助系として後段に置きやすい候補は次である。

1.  
`Teams 通知の最小ユースケースを整理する`

2.  
`通知対象イベントを最小集合に絞る`

3.  
`Obsidian light use の境界を明文化する`

4.  
`Phase1 と Phase3 の Obsidian 境界を整理する`

注意:
- 中核 loop が未成立の段階では優先度を上げにくい
- ただし通知や知識補助の要件が強まった場合は、
  support task として next に保持する価値はある

---

## reroll 時の並べ方の原則

Phase 1 接続時の reroll では、
次の順で candidate を見るのが自然である。

### 第1群: foundation 固定

- Todoist read
- Outlook read
- 空き時間判定
- task / slot 接続項目整理

### 第2群: proposal / approval / write

- priority rule
- proposal format
- approval flow
- Outlook write 条件

### 第3群: support

- Teams notification
- Obsidian light use

この順にする理由は次である。

- 読取基盤なしに proposal は安定しない
- proposal / approval 境界なしに write を先行させるべきではない
- support は中核 loop の後でも価値を失いにくい

---

## operations task 粒度の観点

plan を operations に落とす際は、
1 task = 1つの明確な作業単位を維持する。

したがって、
次のような粗い表現はそのまま active に入れない方がよい。

- `Todoist / Outlook foundation を進める`
- `schedule proposal を実装する`
- `Teams / Obsidian を整える`

代わりに、
以下のような task 単位へ分ける方が自然である。

- `Todoist 一覧取得 API の確認`
- `Outlook Calendar read 条件の整理`
- `空き時間判定ルールの最小仕様化`
- `スケジュール案提示フォーマット整理`
- `承認フロー最小分岐整理`
- `Teams 通知ユースケース整理`

---

## まだ横入り実行しない理由

現時点では、
これらは Phase 1 接続の候補であり、
まだ active に正式投入していない。

したがって今は次を守るのが自然である。

- 会話中にそのまま横入り実行しない
- reroll で active / next / future を決めてから扱う
- foundation 依存を崩さない
- support plan を中核 plan より先に active 化しない

---

## 次に自然な接続

次回この論点を実行段階へ進めるときは、
まず foundation plan の第1群から candidate 化するのが自然である。

具体的には次の順が入り口になりやすい。

1.  
`Todoist 一覧取得 API の確認`

2.  
`Outlook Calendar API の読取条件を整理する`

3.  
`空き時間判定ルールの最小仕様を決める`

4.  
`task / slot 接続に使う最小項目を整理する`

その後に、
proposal / write を次段へ送る。

---

## 判断

Phase 1 の plan 群は、
foundation → proposal/write → support
の依存順が明確である。

したがって、
operations 接続もこの順を崩さない方が自然である。

特に重要なのは次である。

- foundation を先に固定する
- write を proposal / approval 境界より先に置かない
- support を中核 loop より先に置かない
- plan をそのまま task 化せず、実行可能粒度へ割る
