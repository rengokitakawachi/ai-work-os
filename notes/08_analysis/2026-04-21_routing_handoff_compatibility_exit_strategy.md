# 2026-04-21 routing_handoff_compatibility_exit_strategy

## 目的

routing と writing の分離を進めたあと、
`routed_candidates`
および
`routed_design_candidates`
をいつまで互換として残すかの出口戦略を固定する。

本メモは、
新 handoff shape を正本にしつつ、
旧 shape を恒久的な二重系にしないために、
互換の残し方と撤去条件を明示することを目的とする。

---

## 参照

- `notes/02_design/2026-04-20_routing_and_document_writing_separation.md`
- `notes/02_design/2026-04-20_issue_routing_action_plan_handoff_schema.md`
- `notes/02_design/2026-04-17_design_routing_output_schema.md`
- `notes/08_analysis/2026-04-21_issue_routing_first_batch_observation.md`
- `src/services/flow-control/issue-routing.js`
- `src/services/flow-control/design-routing.js`
- `src/services/flow-control/issue-routing-notes-write.js`
- `src/services/flow-control/design-routing-notes-write.js`
- `src/services/flow-control/issue-routing.test.js`
- `src/services/flow-control/design-routing.test.js`

---

## 結論

現時点では、
新 handoff shape を正本とし、
旧 shape は **互換 fallback に限定して残す**
のが自然である。

正本は次である。

- `normalized_items`
- `routing_decisions`
- `action_plan`

旧 shape は次である。

- `routed_candidates`
- `routed_design_candidates`

今後の扱いは次で固定する。

1.  
通常系の code / test / note では、
新 handoff shape を主として扱う

2.  
旧 shape は、
既存呼び出し互換と最小移行安全性のためにだけ残す

3.  
新 shape での呼び出しが主要経路で安定したら、
まず writer fallback を外し、
その後に返り値互換を外す

---

## 現在の状態

### 1. issue routing

現状の正規出力:
- `mode`
- `normalized_items`
- `routing_decisions`
- `action_plan`

互換出力:
- `routed_candidates`

writer:
- `action_plan` を主入力に扱える
- `normalized_items / routing_decisions` を参照できる
- `routedCandidates` は fallback で受ける

test:
- 通常系は新 shape を主入力に使う
- 互換は専用 test に閉じ込めた

---

### 2. design routing

現状の正規出力:
- `mode`
- `normalized_items`
- `routing_decisions`
- `action_plan`

互換出力:
- `routed_design_candidates`

writer:
- `action_plan` を主入力に扱える
- `normalized_items / routing_decisions` を参照できる
- `routedDesignCandidates` は fallback で受ける

test:
- 通常系は新 shape を主入力に使う
- 互換は専用 test に閉じ込めた

---

### 3. intake routing

現状:
- `normalized_items`
- `routing_decisions`
- `grouped`
- `routed_candidates`（互換）

intake はまだ writer を直接持たないが、
handoff の説明軸は新 shape に寄っている。

---

## 新旧 shape の役割分担

### 新 shape

- routing の正規出力
- writer の正規入力
- design note の正規説明
- 通常系 test の前提

### 旧 shape

- 一時的な compatibility view
- 旧呼び出し境界を壊さないための補助
- fallback テスト用
- 調査 / 可視化のための合成済み表示

つまり、
旧 shape は **正規 I/O ではなく、移行用ビュー**
として扱う。

---

## 互換を残す場所

互換を残す場所は、
次の 2 箇所に限定するのが自然である。

### 1. routing 返り値

- `routed_candidates`
- `routed_design_candidates`

意味:
- 呼び出し側がまだ旧 shape を読む可能性に備える
- 移行期間の比較確認に使える

### 2. writer fallback

- `applyIssueRoutingActionPlan({ routedCandidates })`
- `applyDesignRoutingActionPlan({ routedDesignCandidates })`

意味:
- 新 shape が不足した場合の後方互換
- 既存呼び出しの段階的移行を可能にする

これ以外の場所へ、
旧 shape 依存を増やさない方がよい。

---

## 当面の運用ルール

### 1. 新規 code は旧 shape を主入力にしない

新しく追加する usecase / adapter / test は、
次を正本とする。

- `normalized_items`
- `routing_decisions`
- `action_plan`

`routed_candidates`
`routed_design_candidates`
を前提に組まない。

---

### 2. 旧 shape の存在確認は最小限にする

通常系 test では、
旧 shape の存在確認を主目的にしない。

必要なら次だけで十分である。

- route 出力に互換 field が残っている
- fallback テストで writer がまだ受けられる

---

### 3. note でも新 shape を正にする

design / analysis / handover では、
新 shape を正規 handoff として書く。

旧 shape は、
必要なときだけ
「互換用の合成表現」
と明示して書く。

---

### 4. action_plan を主入力とする説明を崩さない

writer は
`action_plan`
を主入力としつつ、
必要に応じて
`normalized_items / routing_decisions`
を参照する。

旧 shape を
「実質の主入力」
に戻さない。

---

## 撤去前提条件

旧 shape を安全に外すための最低条件は次である。

### 条件1
通常系 test が、
旧 shape を渡さずに全て成立している

### 条件2
writer の通常呼び出しが、
`normalized_items / routing_decisions / action_plan`
だけで十分である

### 条件3
design note / analysis / handover が、
新 shape を正として説明している

### 条件4
観測や dry_run 確認で、
旧 shape がないと困る主要ユースケースが残っていない

### 条件5
少なくとも 1 回は、
第一バッチ以後の継続運用観測で
新 shape 前提の経路が安定していることを確認する

---

## 撤去順

撤去は次の順が自然である。

### 第1段
通常系 test から旧 shape 利用を外す
- これはほぼ実施済み

### 第2段
note / handover / analysis で
旧 shape を正規説明から外す
- これはかなり進んでいる

### 第3段
writer fallback を削る
- `routedCandidates`
- `routedDesignCandidates`
の fallback 読みを削る

理由:
- writer は新 shape の主境界であり、
  ここが残ると互換が長引きやすい

### 第4段
routing 返り値から
- `routed_candidates`
- `routed_design_candidates`
を削る

理由:
- 呼び出し側が完全に新 shape に寄ってから外す方が安全

---

## 撤去を急がない理由

現時点で即撤去しない方がよい理由は次である。

1.  
まだ `node test` 実行確認をしていない

2.  
第一バッチ観測は、
schema 分離の確認までは進んだが、
運用経路全体の安定確認はまだ薄い

3.  
intake / issue / design の 3 系統で shape は揃ってきたが、
周辺 adapter まで完全確認したとはまだ言い切れない

したがって、
今は **互換を縮退状態で残す**
のが自然である。

---

## いま削ってはいけないもの

現時点では次をまだ即削除しない。

- `routed_candidates`
- `routed_design_candidates`
- writer 側の fallback lookup
- 互換専用 test

理由:
- 移行途中の回帰確認線としてまだ価値があるため

---

## 先に削ってよいもの

逆に、
先に削ってよいのは次である。

- 通常系 test での旧 shape 明示渡し
- note 上で旧 shape を正規 handoff のように書く表現
- 新規 code での旧 shape 直接依存

これらは既にかなり縮退できている。

---

## 次に自然なアクション

次にやるなら自然なのは次である。

1.  
`node test` を実行して、
新 shape 主経路の回帰確認を行う

2.  
その結果問題がなければ、
writer fallback 撤去を次タスク候補として切る

3.  
その後に、
返り値互換の撤去可否を判定する

---

## 判断

旧 shape は、
もはや正規 handoff ではない。

現在の正本は

- `normalized_items`
- `routing_decisions`
- `action_plan`

である。

したがって、
今後の方針は

- 新 shape を主に使う
- 旧 shape は fallback に閉じ込める
- まず writer fallback を外し、
  最後に返り値互換を外す

で固定するのが自然である。

この順なら、
routing と writing の分離を保ったまま、
安全に compatibility を縮退させられる。
