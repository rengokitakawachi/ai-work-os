# 2026-04-22 intake_routing_first_batch_candidate_set

## 目的

intake routing の第一バッチで使う入力候補を、
実 inbox / inbox 相当入力から整理し、
`issue / design / future`
の 3 分岐を最小で観測できる構成を固定する。

---

## 参照

- `notes/02_design/2026-04-21_intake_routing_minimum_operation_experiment.md`
- `notes/02_design/intake_review_and_source_ref_spec.md`
- `notes/02_design/2026-04-12_intake_and_issue_routing_minimum_roles.md`
- `notes/00_inbox/README.md`
- `notes/00_inbox/dev_memo/2026-03-22_09-40-00_pending_tasks.md`
- `notes/00_inbox/dev_memo/2026-03-22_15-30-00_reflection_design.md`
- `notes/00_inbox/dev_memo/2026-03-22_18-00-00_branch_strategy_future.md`
- `notes/00_inbox/dev_memo/2026-03-24_11-10-00_repo_resource_next_actions.md`
- `notes/00_inbox/2026-03-23_inbox_web_digest.md`

---

## 結論

第一バッチは、次の 3 件で始めるのが自然である。

1.
`notes/00_inbox/dev_memo/2026-03-22_09-40-00_pending_tasks.md`
→ `issue` 観測用

2.
`notes/00_inbox/dev_memo/2026-03-22_15-30-00_reflection_design.md`
→ `design` 観測用

3.
`notes/00_inbox/dev_memo/2026-03-22_18-00-00_branch_strategy_future.md`
→ `future` 観測用

この 3 件なら、
intake routing の最小完成条件である

- 問題として扱う入力
- 構造整理が必要な入力
- 今は扱わない入力

を、比較的素直に観測できる。

---

## 選定理由

### 1. issue 観測用

対象:
`2026-03-22_09-40-00_pending_tasks.md`

内容の性格:
- 積み残しタスク整理
- 未対応の実行候補
- 運用上の論点が複数ある

期待 route:
- `issue`

理由:
- 中心は「今後対応が必要な問題・作業候補」であり、
  まず問題として扱うのが自然
- 現時点でそのまま design 草案にするより、
  issue として受けて論点整理する方が入口処理として安全
- 複数論点を含むため、
  チャンク分解 / 1テーマ1メモ化の観測にも向く

観測したい点:
- 複数の積み残しタスクを issue 側へ自然に切れるか
- 1テーマ1メモ化したときに source_ref が破綻しないか

---

### 2. design 観測用

対象:
`2026-03-22_15-30-00_reflection_design.md`

内容の性格:
- reflection 機能の将来設計メモ
- API 案、データ構造、実装フェーズを含む
- 問題提起より設計整理が中心

期待 route:
- `design`

理由:
- 中心は課題提示ではなく、明確に構造整理と仕様草案
- intake routing の `設計として扱う` 条件に最も素直に合う
- 将来の design note へ昇格する入力として典型例になる

観測したい点:
- design と issue の境界が自然に引けるか
- source_ref を持った派生 design メモとして読めるか

---

### 3. future 観測用

対象:
`2026-03-22_18-00-00_branch_strategy_future.md`

内容の性格:
- branch ベース開発への将来移行方針
- 現在は main 直開発継続
- 移行タイミングは将来条件付き

期待 route:
- `future`

理由:
- 内容自体は明確だが、今すぐ着手対象ではない
- 「将来やる可能性があるが現時点では扱わない」の定義に合う
- future へ送る理由を説明しやすい

観測したい点:
- keep ではなく future に送る理由が自然に書けるか
- 直接 active へ戻さず、再 routing 前提で保持できるか

---

## 予備候補

第一バッチの主候補は上の 3 件で十分だが、
追加観測や差し替え候補として次も有力である。

### A. `2026-03-24_11-10-00_repo_resource_next_actions.md`

性格:
- 具体的な docs 整合 / auth / AI利用ルール設計 / 差分検出の次アクション整理

見立て:
- `issue` または `design` の境界比較に使える

使いどころ:
- 第一バッチで issue が弱いと感じた場合の差し替え候補
- action list と設計整理の混在例として有用

### B. `2026-03-23_inbox_web_digest.md`

性格:
- 複数記事を横断要約し、共通原則と推奨アクションまで整理した digest

見立て:
- `design` 寄りだが、knowledge / design 境界も含むためやや重い

使いどころ:
- 第一バッチではなく第二バッチ以降の複数チャンク統合観測向き
- source_ref 多点付与と digest 型入力の扱いを見るのに有用

---

## 推奨構成

第一バッチの最小構成は次を推奨する。

1.
`2026-03-22_09-40-00_pending_tasks.md`
- issue 観測用

2.
`2026-03-22_15-30-00_reflection_design.md`
- design 観測用

3.
`2026-03-22_18-00-00_branch_strategy_future.md`
- future 観測用

理由:
- 3 分岐が明確
- 役割差を説明しやすい
- input の性格差が大きく、比較観測に向く
- いずれも inbox / inbox 相当の未整理資産として扱いやすい

---

## 実施時の注意

- intake routing は入口処理であり、review や operations を背負わせない
- 1件1件を即保存する前に、チャンク分解 / 1テーマ1メモの前提で観測する
- source_ref は出力側にのみ付与する
- 元入力の inbox 後処理は、`archive / 残す` を分けて記録する

---

## 次に自然なタスク

1.
`intake routing の観測項目を analysis に落とす`

2.
必要なら、第一バッチ観測用の実行テンプレートを 1 枚にする

3.
その後、第一バッチを実際に routing して observation を記録する

---

## 判断

第一バッチ候補整理としては、

- issue: `pending_tasks`
- design: `reflection_design`
- future: `branch_strategy_future`

の 3 件で始めるのが最も自然である。

この構成なら、
intake routing の最小完成条件である
`issue / design / future`
の 3 分岐を、
実 inbox / inbox 相当入力で比較しやすい。
