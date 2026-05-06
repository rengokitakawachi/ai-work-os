# 2026-04-12 conversation_routing_and_execution_governance_report_return_prep

## 目的

conversation routing と execution governance の試験結果を、
report へ返すための整理を行う。

本メモは report 本体ではなく、
日次 / 週次 report に何を返すかを揃えるための準備物とする。

handover は通常返却先ではなく、
引き継ぎ書を作るときのみ使う前提とする。

---

## 結論

返却先は report を優先する。

- 日々の実験結果
- 運用上の意思決定
- 学び
- 未解決
- 次の論点

は daily / weekly report に返す。

handover は、
再開のために要約が必要になったときのみ使う。

---

## 返却対象

### 1. conversation routing 側の成果

- 会話起点の新論点を原則 issue として受ける整理
- operations candidate / dev_memo / design / future への派生条件整理
- operations candidate がある場合は、保存前に placement と rolling 提案を挟む整理
- 会話中に新規候補が出ても、その場で横入り実行しない原則の補強

### 2. execution governance 側の成果

- active-first execution の基本ケース確認
- stale active は reroll と別の「正本修復」として扱う整理
- reroll before execution は毎回ではなく、新規候補発生時の再配置ルールとして扱う整理
- operation rolling は daily review でのみ確定する整理
- 完了判定と構造変更判定を分ける整理
- active に完了 task が残っていても、daily review 前なら未整合としない整理

### 3. operations / review 接続側の成果

- review は report 保存だけで終わらず、operations 更新まで含めて完了とする整理
- weekly review に渡すための完了 task / carry-over / next 直結候補の整理
- execution governance の docs 反映候補を `17_operations_system.md` と `15_notes_system.md` 中心に整理したこと

---

## daily report に返すべき内容

### 返す対象

- その日に確定した運用判断
- 試験運用の結果
- その日に更新した instruction / schema / operations
- 次に見るべき未解決

### すでに返した内容

- 2026-04-08
  - active-first execution 基本ケース
  - stale active 補足ルール
  - conversation 起点の停止ルール
- 2026-04-10
  - review / operations の日中運用原則
  - operations → Todoist projection の境界整理
- 2026-04-11
  - operations 状態判断手順の追加
  - Phase 0 と現行 operations の接続整理

### 今後の daily report で返す候補

- GPT editor 反映 2件の完了
- weekly review 実施結果
- docs 反映差分の確定
- Phase 0 未充足項目の扱い

---

## weekly report に返すべき内容

### 返す対象

- 週の中で確定した execution governance の更新
- plan / operations / review の接続改善
- 次週に持ち越す本質論点
- docs 反映候補と未反映差分

### 今週の主要返却論点

- conversation routing を issue 起点で扱う運用を明文化したこと
- operations の日中運用と review 時運用を分けたこと
- operation rolling は daily review でのみ確定すること
- active に完了 task が残っていても、daily review 前なら許容すること
- Phase 0 と現行 operations の接続を可視化したこと
- execution governance の docs 反映候補を整理したこと

### 次週の重点として返すもの

- `docs/17_operations_system.md`
- `docs/15_notes_system.md`
への反映差分作成

- `intake routing`
- `ADAM 固有 / EVE 共通骨格の分離`
を true gap として扱うかの判断

---

## report に書くときの観点

### 重要な意思決定

- 会話起点の新論点は issue として受ける
- operations candidate は placement 提案を先に行う
- active-first execution は有効
- stale active の整合回復は reroll とは別
- operation rolling は daily review でのみ確定する
- 完了判定と構造変更判定は分ける

### 学び / 気づき

- task 不足より、plan と operations の対応の見えにくさが混乱を生みやすい
- instruction の列挙だけではなく、判断手順の明文化が必要
- report / operations / design の三層で返すと再利用しやすい

### 未解決 / リスク

- intake routing はまだ weak connection
- ADAM 固有 / EVE 共通骨格の分離は未整理
- docs 反映はまだ候補整理までで、本文更新は未着手
- handover 返却と report 返却を混同しない運用の継続が必要

---

## handover に回さないもの

通常時は、以下を handover 返却対象にしない。

- 日々の試験運用メモ
- 週内の小さな判断
- active / next の一時的な位置づけ整理
- docs 候補差分の途中整理

理由

- これらは report と design に残せば十分であり、
  毎回 handover に入れると再開情報が肥大化するため

---

## handover に回す条件

以下の場合のみ、handover に要約する。

- ユーザーが引き継ぎ書を作るよう依頼したとき
- 新しいスレッドへ再開前提の要約が必要なとき
- report / operations / design だけでは再開負荷が高いと判断したとき

---

## 次の返却先

1.
weekly review / weekly report

2.
daily report（必要な日次差分）

3.
docs 差分案

handover は上記の後、
必要時のみ生成する。

---

## 判断

conversation routing と execution governance の試験結果は、
日常運用では report に返すのが正しい。

handover は再開補助の特別用途に限定し、
通常返却先としては扱わない。
