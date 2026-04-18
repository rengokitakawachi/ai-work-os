# 2026-04-18 operations_reroll_scoring_recent_knowledge_consolidated

## reference map

### consolidated_from

- `notes/00_inbox/dev_memo/2026-04-06_manual_rolling_round1_notes.md`
- `notes/00_inbox/dev_memo/2026-04-06_operations_rolling_gap_and_direction.md`
- `notes/08_analysis/2026-04-17_reroll_dry_run_expected_behavior_with_active_plan_queue.md`
- `notes/08_analysis/2026-04-18_reroll_minimum_dry_run_io_confirmation.md`

### promoted_to_design

- `notes/02_design/2026-04-06_operations_rolling_generation_and_prioritization_spec.md`
- `notes/02_design/2026-04-16_operations_ranking_priority_axes.md`
- `notes/02_design/2026-04-16_active_operations_as_reroll_candidate_source.md`
- `notes/02_design/2026-04-18_scoring_knowledge_accumulation_policy.md`
- `notes/02_design/2026-04-18_score_driven_operations_ranking_minimum_model.md`

### current_primary_refs

- `notes/08_analysis/2026-04-18_operations_reroll_scoring_recent_knowledge_consolidated.md`
- `notes/02_design/2026-04-06_operations_rolling_generation_and_prioritization_spec.md`
- `notes/02_design/2026-04-16_operations_ranking_priority_axes.md`
- `notes/02_design/2026-04-16_active_operations_as_reroll_candidate_source.md`
- `notes/02_design/2026-04-18_scoring_knowledge_accumulation_policy.md`
- `notes/02_design/2026-04-18_score_driven_operations_ranking_minimum_model.md`

### archive_destination

- `notes/99_archive/dev_memo/2026-04-06_manual_rolling_round1_notes.md`
- `notes/99_archive/dev_memo/2026-04-06_operations_rolling_gap_and_direction.md`
- `notes/99_archive/analysis/2026-04-17_reroll_dry_run_expected_behavior_with_active_plan_queue.md`
- `notes/99_archive/analysis/2026-04-18_reroll_minimum_dry_run_io_confirmation.md`

---

## 目的

operations / reroll / scoring 周辺で分散していた
recent dev_memo と analysis を、
現時点の再利用価値に沿って 1 枚へ統合する。

本メモは、
現在も有効な知見を残しつつ、

- operations の再定義
- manual rolling で得た観測
- reroll dry_run の current code 接続
- scoring / ranking の現時点の意味

を 1 枚で追えるようにすることを目的とする。

---

## 結論

operations / reroll / scoring 周辺は、
すでにかなり整理されている。

現時点の主要整理は次である。

- operations
  - 「並べるもの」ではなく「生成される短期実行正本」
- reroll
  - plan / active / next / queue を同じ土俵に乗せる比較処理
- active
  - 固定結果ではなく reroll candidate source に戻る
- scoring
  - 歴史的には補助材料として扱ってきた
  - 現在は gate / score / override の3層モデルへ寄せ始めている

したがって、
大きな構造未解決よりも、
知見の所在分散を減らし、
どの design がどの観測から来たかを追いやすくする段階に入っている。

---

## operations の出発点

4/6 時点の根本問題は次だった。

- 生成規律が弱い
- plan から自然に落ちてくる感覚が弱い
- 実行結果が plan / roadmap に返らない
- issue / dev_memo / 会話が優先順位付きで反映されない

この問題意識から、
operations は次のように再定義された。

```text
operations
= 上位計画を実行に落とし、
  実行結果で上位を更新する短期実行正本
```

ここが現在の design 群の出発点である。

reference:
- source: `notes/00_inbox/dev_memo/2026-04-06_operations_rolling_gap_and_direction.md`
- promoted_to: `notes/02_design/2026-04-06_operations_rolling_generation_and_prioritization_spec.md`

---

## manual rolling 1周目で得た観測

手動 rolling 1周目で重要だったのは、
順位結果そのものより比較時の学びである。

特に残すべき観測は次である。

### 1. 重要かどうかより、今の並びでどちらが先かを問うと決めやすい

これは relative ranking の運用感として重要である。

### 2. scoring は当初、迷いを言語化する補助として有効だった

この時点では、
score は最終決定ルールというより、
比較理由を見える化する補助として使われていた。

### 3. active / next の境界は固定条件ではなく相対順位で決める方が自然

これは現在の rolling / placement design と一致する。

### 4. plan 直結の塊を先に通し、scoring knowledge は後順位だった

この観測により、
scoring knowledge は
「本筋実装を塞がない範囲で育てる」
扱いが自然だと分かった。

reference:
- source: `notes/00_inbox/dev_memo/2026-04-06_manual_rolling_round1_notes.md`
- promoted_to:
  - `notes/02_design/2026-04-18_scoring_knowledge_accumulation_policy.md`
  - `notes/02_design/2026-04-18_score_driven_operations_ranking_minimum_model.md`

---

## そこから design に昇格したもの

manual rolling や gap memo から、
少なくとも次が design へ昇格した。

- `2026-04-06_operations_rolling_generation_and_prioritization_spec.md`
- `2026-04-16_operations_ranking_priority_axes.md`
- `2026-04-16_active_operations_as_reroll_candidate_source.md`
- `2026-04-18_scoring_knowledge_accumulation_policy.md`
- `2026-04-18_score_driven_operations_ranking_minimum_model.md`

つまり originals は、
いまや正本そのものではなく、
current design の背景観測として読む位置づけになっている。

---

## reroll の current code 接続

4/18 時点で確認できた reroll 最小 I/O は次である。

```text
plan / issue / active / next / operations_queue
↓
buildRollingSourceBundles(...)
↓
generateRollingCandidates(...)
↓
{
  active_candidates,
  next_candidates,
  operations_candidates,
  deferred_candidates,
  skipped_candidates,
}
```

ここで重要なのは次である。

### 1. queue は source の1種として扱える

issue routing 由来の operations candidate queue payload は、
rolling 前入力として code 上つながっている。

### 2. active は reroll candidate source に戻る

active task は metadata を持って
reroll の比較土俵へ戻る。

### 3. ranking は active 特権ではない

少なくとも current code では、
`plan_alignment`
が最優先であり、
active は continuity 補助に留まる。

### 4. reroll の返り値 shape は最小形として成立している

`active_candidates / next_candidates / deferred_candidates`
まで見える。

reference:
- source:
  - `notes/08_analysis/2026-04-17_reroll_dry_run_expected_behavior_with_active_plan_queue.md`
  - `notes/08_analysis/2026-04-18_reroll_minimum_dry_run_io_confirmation.md`
- promoted_to:
  - `notes/02_design/2026-04-16_active_operations_as_reroll_candidate_source.md`
  - `notes/02_design/2026-04-18_score_driven_operations_ranking_minimum_model.md`

---

## 4/17 時点の reroll 想定挙動

active / plan / operations_queue を同時に入れた最小 dry_run では、
次が期待されていた。

### 最上位帯
- plan 直結候補

### 次帯
- plan 接続を持つ current active
- active_continuity を持つ候補

### その次
- operations_queue 由来候補

これは現在の ranking 主従と整合している。

- plan_alignment が最重要
- active_continuity は light bias
- quick_win は補助加点

reference:
- source: `notes/08_analysis/2026-04-17_reroll_dry_run_expected_behavior_with_active_plan_queue.md`
- related_design:
  - `notes/02_design/2026-04-16_operations_ranking_priority_axes.md`
  - `notes/02_design/2026-04-16_active_operations_as_reroll_candidate_source.md`

---

## current の弱い点

現時点でもなお薄い点は次である。

### 1. plan_alignment の意味解像度はまだ粗い

いまは
- direct
- linked
程度の最小段階である。

### 2. quick_win はまだ実入力が薄い

軸はあるが、実際の candidate へ十分入っていない。

### 3. reroll の repo 実体 dry_run は未確認

設計・code 照合は進んだが、
実コマンド実行での結果確認はまだ残る。

### 4. candidate から notes 正本 task へ戻す後段は別問題として残る

reroll 出力は candidate 配列であり、
`active_operations.md / next_operations.md`
への writer 確認とは分かれている。

reference:
- source: `notes/08_analysis/2026-04-18_reroll_minimum_dry_run_io_confirmation.md`

---

## scoring の意味の変化

historical には、
scoring は
「迷いを言語化する補助」
として扱われていた。

しかし現在は、
そこから一歩進めて、

```text
gate
↓
score
↓
override
```

の3層モデルへ寄せ始めている。

重要なのは、
昔のメモが間違っていたのではなく、
段階が変わったことだという点である。

### 以前
- score は補助材料
- relative ranking が主

### 現在の最小モデル
- gate で対象集合を決める
- score を優先順位の主材料に寄せる
- override を記録付き例外として許す

したがって、
古い dev_memo は
現在の score-driven model の否定ではなく、
その前段観測として読むのが正しい。

reference:
- source:
  - `notes/00_inbox/dev_memo/2026-04-06_manual_rolling_round1_notes.md`
  - `notes/00_inbox/dev_memo/2026-04-06_operations_rolling_gap_and_direction.md`
- promoted_to:
  - `notes/02_design/2026-04-18_scoring_knowledge_accumulation_policy.md`
  - `notes/02_design/2026-04-18_score_driven_operations_ranking_minimum_model.md`

---

## いま再利用価値が高い知見

### 1. operations は生成されるもの
これは current design の土台。

### 2. active は candidate source に戻る
reroll を next 繰り上げにしないために重要。

### 3. plan_alignment を最上位に置く
場当たり運用防止の主軸。

### 4. active continuity は軽い補助
active の固定化を防ぎつつ安定性を持たせる。

### 5. scoring knowledge は、まず迷いと比較理由から育てる
これは今後も有効。

### 6. score 主導へ進むなら gate / score / override に分ける
単一 score へ無理に押し込まない。

---

## archive した元ファイル

今回の統合により、
次の originals は archive に移した。

- `notes/99_archive/dev_memo/2026-04-06_manual_rolling_round1_notes.md`
- `notes/99_archive/dev_memo/2026-04-06_operations_rolling_gap_and_direction.md`
- `notes/99_archive/analysis/2026-04-17_reroll_dry_run_expected_behavior_with_active_plan_queue.md`
- `notes/99_archive/analysis/2026-04-18_reroll_minimum_dry_run_io_confirmation.md`

現役参照は、
まずこの consolidated note と現行 design 群を見ればよい。

---

## 現時点の判断

operations / reroll / scoring 周辺は、
設計そのものより
知見の所在整理が主要課題になっている。

したがって現段階では、

- originals を background として archive へ退避し
- 現役参照を consolidated note + current design に寄せる

のが自然である。
