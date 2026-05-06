# 2026-04-24 pending_tasks_split_reobservation

## 目的

`pending_tasks` 向け split 実装後に、
第一バッチの再観測を行い、

- route
- 1テーマ1メモ
- source_ref
- inbox 後処理
- role boundary

の5観点で、
改善した点と未達を固定する。

---

## 参照

- `notes/08_analysis/2026-04-22_intake_routing_observation_items.md`
- `notes/08_analysis/2026-04-22_intake_routing_first_batch_expectation_observation.md`
- `notes/08_analysis/2026-04-22_intake_routing_first_batch_mechanical_dry_run_observation.md`
- `notes/08_analysis/2026-04-22_pending_tasks_chunking_extension_necessity.md`
- `notes/00_inbox/dev_memo/2026-03-22_09-40-00_pending_tasks.md`
- `src/services/flow-control/adapters.js`
- `src/services/flow-control/intake-routing.js`
- `src/services/flow-control/rules.js`

---

## 前提

2026-04-23 時点で、
`src/services/flow-control/adapters.js` に
`pending_tasks` 専用 split 分岐が追加された。

現行実装の要点は次である。

- `pending_tasks` のときだけ split を試す
- `##` 見出し単位で section を切り出す
- `まとめ` / `summary` は除外する
- split 不成立時は既存 `1ファイル = 1item` にフォールバックする

---

## 観測結果

### 1. route

見立て:
- split 後の各 section item は、いずれも `candidate_type: issue` として生成される
- 現行 `rules.js` では architecture / future 条件に当たらないため、`route_to: issue` / `review_at: daily_review` が自然である

判断:
- **route 妥当性は維持されている**
- split を入れても issue route 自体は壊れていない

補足:
- 今回の主論点は route ではなく粒度であり、その分離は維持できている

---

### 2. 1テーマ1メモ

見立て:
- 旧状態の `1ファイル = 1item` に比べると、見出しごとに分かれることで主題はかなり読みやすくなった
- 少なくとも
  - GPT指示の改善
  - Todoist Action連携
  - Action動作確認
  - archive運用ルール
  - inbox運用実践検証
  - duration設計
  - Outlook連携設計
  - MindMeister連携設計
  は個別論点として切り出せる

一方で、現行実装は `まとめ` しか除外しておらず、
`概要` section も item 化される。

判断:
- **1テーマ1メモ性は明確に改善した**
- ただし **導入・メタ説明を item 化しない** という設計意図までは未達

未達の具体例:
- `## 概要` が issue item として生成される
- これは独立論点ではなく、文書全体の導入説明なので routing ノイズになりうる

---

### 3. source_ref

見立て:
- split 後も各 item は元ファイルの `source_ref` を共有して保持する
- metadata に `section_title` / `section_index` / `split_source` が入るため、出自追跡はむしろ改善している

判断:
- **source_ref の自然さは維持または改善**
- 出力側でのみ出自を持つ構造も崩れていない

---

### 4. inbox 後処理

見立て:
- split 自体は入ったが、`概要` のようなメタ section が残っているため、まだ「役目終了して archive へ送れる」とは言いにくい
- 特に、split 後の元 inbox を archive に移すか pending に残すかの rule は別 task として未整理である

判断:
- **現時点では pending 寄りのまま**
- split 実装だけでは inbox 後処理を close できない

---

### 5. role boundary

見立て:
- 今回の差分は adapter に閉じており、routing / writer / rolling を直接触っていない
- split 後も route 判定は intake routing の範囲に留まり、operations 化や active 化を先取りしていない

判断:
- **role boundary は守られている**
- 粒度改善を adapter だけで扱ったのは妥当

---

## before / after

### before

- `pending_tasks` 全体が 1item
- route は issue で妥当
- ただし複数論点混在が残る
- 1テーマ1メモ性が弱い

### after

- `##` 見出し単位で複数 item 化される
- route は issue のまま維持される
- source_ref は section metadata 付きで追跡しやすくなる
- 各論点の独立性は改善する

### remaining gap

- `概要` のような導入 / メタ説明も item 化される
- 設計で意図した「導入・メタ説明は item にしない」ルールが未反映
- split 後の元 inbox の archive / pending rule は未整理

---

## 結論

`pending_tasks` split 実装後の再観測としては、

- route は維持
- 1テーマ1メモ性は改善
- source_ref は維持または改善
- role boundary は維持

までは成立している。

一方で、
**導入・メタ説明を item 化しない最小除外ルールは未達**
であり、
現行実装は `まとめ` だけを除外して `概要` を通してしまう。

したがって、
次の差分は大きな再設計ではなく、

- `概要` など導入 / メタ section の除外ルールを最小追加するか
- それを設計へ先に戻すか

のどちらかとして扱うのが自然である。

---

## 次にやるべき1つ

- `pending_tasks split で導入 / メタ section を除外する最小ルールを design に戻す`
