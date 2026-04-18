# 2026-04-18 issue_routing_background_consolidated

## reference map

### consolidated_from

- `notes/02_design/2026-04-13_plan_to_operations_connection_and_important_issue_escalation_rule.md`
- `notes/02_design/2026-04-14_issue_routing_end_state_first_and_incremental_implementation.md`

### current_primary_refs

- `notes/02_design/2026-04-15_issue_routing_variable_assessment_schema.md`
- `notes/02_design/2026-04-16_issue_routing_notes_write_minimum_usecase.md`
- `notes/02_design/2026-04-16_issue_routing_operations_candidate_queue.md`
- `notes/02_design/2026-04-16_operations_candidate_queue_to_rolling_io.md`
- `notes/08_analysis/2026-04-18_issue_routing_recent_analysis_consolidated.md`
- `notes/08_analysis/2026-04-18_issue_routing_background_consolidated.md`

### archive_destination

- `notes/99_archive/design/2026-04-13_plan_to_operations_connection_and_important_issue_escalation_rule.md`
- `notes/99_archive/design/2026-04-14_issue_routing_end_state_first_and_incremental_implementation.md`

---

## 目的

issue routing の背景原則として分散していた
初期 design を、
現時点の再利用価値に沿って 1 枚へ統合する。

本メモは、
現在も有効な背景知識を残しつつ、

- end-state first / incremental 実装方針
- plan → issue → operations 接続弱化の問題意識
- 重要 issue の埋没防止
- current core design へどう吸収されたか

を 1 枚で追えるようにすることを目的とする。

---

## 結論

issue routing は、
現在の core design がかなり揃っている。

したがって、
4/13〜4/14 の初期 design は
現役仕様そのものではなく、
**current core design へ至る背景原則**
として読む位置づけになっている。

現在の中心は次である。

- 可変評価の分離
- action plan → notes write usecase
- operations candidate queue
- queue → rolling 接続
- postprocess の current state

---

## end-state first / incremental の背景

4/14 時点で固定していた中心原則は次である。

```text
end-state first
implementation incremental
```

つまり、

1. 最終形態の schema と責務を先に固定する
2. 実装は段階化して進める
3. 各段で dry_run 可能な状態を保つ

という方針である。

ここでの重要点は、
big bang 実装を避けつつ、
完成形を後回しにしないことだった。

reference:
- source: `notes/02_design/2026-04-14_issue_routing_end_state_first_and_incremental_implementation.md`
- current_primary_refs:
  - `notes/02_design/2026-04-15_issue_routing_variable_assessment_schema.md`
  - `notes/02_design/2026-04-16_issue_routing_notes_write_minimum_usecase.md`

---

## plan → issue → operations 接続弱化の問題意識

4/13 時点での根本問題は次だった。

- plan に重要論点がある
- issue には記録される
- しかし operations candidate 化されず、比較対象に上がらない

この問題意識から、
重要 issue については

- issue に残すだけで終わらせない
- 位置づけ判定を行う
- operations candidate 化の要否を明示する
- 再評価地点まで決める

という暫定原則が導かれた。

reference:
- source: `notes/02_design/2026-04-13_plan_to_operations_connection_and_important_issue_escalation_rule.md`
- current_primary_refs:
  - `notes/02_design/2026-04-16_issue_routing_operations_candidate_queue.md`
  - `notes/02_design/2026-04-16_operations_candidate_queue_to_rolling_io.md`

---

## 重要 issue の埋没防止が current design にどう吸収されたか

初期 design では、
「重要 issue を candidate 化するか、しないなら再評価地点を残す」
が中心だった。

現在はそれが次へ分解吸収されている。

### 1. 可変評価は routing decision に持つ

- `impact_now`
- `urgency_now`
- `evaluated_at`

これにより、
重要度判断を issue 本体の固定値に閉じ込めずに済む。

### 2. action plan で後処理を明示する

- `design_updates`
- `operations_candidates`
- `future_candidates`
- `archive_issue`
- `keep_issue`

これにより、
「保存しただけで止まる」を避けやすい。

### 3. operations 候補は queue に送る

candidate 化したとしても、
`next_operations` に直接入れず、
rolling 前入力 source として扱う。

### 4. 再評価は review 接続に残す

初期 design の
「再評価地点を決める」は、
現在は review 接続の未了として後段に残っている。

reference:
- source:
  - `notes/02_design/2026-04-13_plan_to_operations_connection_and_important_issue_escalation_rule.md`
  - `notes/02_design/2026-04-14_issue_routing_end_state_first_and_incremental_implementation.md`
- current_primary_refs:
  - `notes/02_design/2026-04-15_issue_routing_variable_assessment_schema.md`
  - `notes/02_design/2026-04-16_issue_routing_notes_write_minimum_usecase.md`
  - `notes/02_design/2026-04-16_issue_routing_operations_candidate_queue.md`
  - `notes/08_analysis/2026-04-18_issue_routing_recent_analysis_consolidated.md`

---

## いま再利用価値が高い背景知見

### 1. 保存だけでは前進しない

重要 issue は issue に保存しただけで終わらせない。

### 2. 位置づけ判定が必要

重要 issue には少なくとも

- design
- operations candidate
- future
- archive

のどこかを与える必要がある。

### 3. operations candidate 化と next 直入れは別

candidate 化しても、
正式配置は rolling に残す。

### 4. 再評価地点を持たない issue は埋もれやすい

これは今後も review 接続で回収すべき重要知見である。

### 5. end-state first と incremental は両立させる

schema と責務を先に固定し、
write と review 接続は段階実装にする。

---

## いま背景化してよいもの

今回統合した 2 本は、
次の理由で background へ寄せてよい。

### 2026-04-13 plan_to_operations_connection_and_important_issue_escalation_rule

- 問題意識として重要
- ただし current 実装の直接仕様ではなく、
  queue / review 接続へ吸収されている

### 2026-04-14 issue_routing_end_state_first_and_incremental_implementation

- 実装哲学として重要
- ただし current core schema の直接仕様ではなく、
  方針メモとして読む位置づけになった

---

## archive した元ファイル

今回の統合により、
次の originals は archive に移した。

- `notes/99_archive/design/2026-04-13_plan_to_operations_connection_and_important_issue_escalation_rule.md`
- `notes/99_archive/design/2026-04-14_issue_routing_end_state_first_and_incremental_implementation.md`

現役参照は、
まず current core design 群とこの consolidated note を見ればよい。

---

## 現時点の判断

issue routing 周辺は、
大きな方針不足よりも
背景ファイルの分散整理が主要課題になっている。

したがって現段階では、

- current core design を現役のまま残し
- 初期方針メモは background として archive へ退避し
- 現役参照を core design + consolidated note に寄せる

のが自然である。
