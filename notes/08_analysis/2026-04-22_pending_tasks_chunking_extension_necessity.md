# 2026-04-22 pending_tasks_chunking_extension_necessity

## 目的

`pending_tasks` に対して、
inbox markdown adapter のチャンク分解拡張が本当に必要かを整理する。

本メモは、

- route の妥当性
- 1テーマ1メモ性
- intake spec との整合
- 最小拡張範囲

を分けて判断し、
次の design task に渡すための前提を固定することを目的とする。

---

## 参照

- `notes/00_inbox/dev_memo/2026-03-22_09-40-00_pending_tasks.md`
- `notes/08_analysis/2026-04-22_intake_routing_first_batch_mechanical_dry_run_observation.md`
- `notes/08_analysis/2026-04-22_intake_inbox_markdown_adapter_minimum_requirements.md`
- `notes/02_design/intake_review_and_source_ref_spec.md`

---

## 結論

`pending_tasks` に対しては、
**チャンク分解拡張は必要**
と判断する。

ただし必要なのは

- inbox 全般の汎用分解機構

ではなく、まず

- `pending_tasks` 型の複数論点入力に限定した最小 split 拡張

である。

理由は、
route の妥当性自体はすでに成立している一方、

- spec は「処理単位はファイルではなくチャンク」と定義している
- `pending_tasks` は明確に複数論点を含む
- 1file = 1item のままだと 1テーマ1メモ性が弱い

ためである。

---

## 現状

### 1. route の妥当性

第一バッチ mechanical dry run では、
`pending_tasks` は

- route_to: `issue`
- reason: `問題として扱う入力のため issue に送る`
- review_at: `daily_review`

となっており、
route 自体は妥当だった。

したがって、
今回の論点は

- issue / design / future の route が間違っている

ではない。

---

### 2. 現在の adapter 粒度

最小 adapter は

- 1ファイル = 1item

で成立させた。

これは第一バッチの最小 route 多様性確認には十分だったが、
`pending_tasks` については 8項目の積み残し論点が 1 item に同居するため、
粒度が粗い。

---

## `pending_tasks` の中身

`pending_tasks` には少なくとも次の論点が含まれる。

1. GPT指示の改善
2. Todoist Action連携
3. Action動作確認
4. archive運用ルールの詳細化
5. inbox運用の実践検証
6. duration設計
7. Outlook連携設計
8. MindMeister連携設計

この 8 件は、
同じ大きなテーマ群に属してはいるが、
少なくとも次の点で異なる。

- 即時性
- 依存順
- 仕様設計か、実装準備か、検証か
- 近い保存先

特に

- `GPT指示の改善`
- `Todoist Action連携`
- `Action動作確認`

は短い依存列をなしており、
一方で

- `Outlook連携設計`
- `MindMeister連携設計`

は将来寄りの別論点である。

したがって、
1 item のまま扱うと

- 1テーマ1メモになりにくい
- 次の routing / design / operations で再分解が必要になる
- intake の入口処理としての価値が弱くなる

---

## spec 整合

`intake_review_and_source_ref_spec.md` では、
次が明記されている。

- inbox は未整理入力であり、複数論点が混在する
- 処理単位はファイルではなくチャンク
- 出力単位は 1テーマ1メモ
- チャンク分解を省略しない

この spec に照らすと、
`pending_tasks` を 1file = 1item のまま維持するのは、
最小観測の暫定措置としては許容できても、
継続運用の本線としては弱い。

つまり、
今回の split 論点は

- nice to have

ではなく、
**spec に近づけるための必要拡張**
と見るのが自然である。

---

## ただし、全面一般化は不要

ここで必要なのは、
全 inbox 一般に対する高機能チャンク分解ではない。

理由:

- `reflection_design` は 1file = 1item で十分だった
- `branch_strategy_future` も 1file = 1item で十分だった
- 粒度問題が強く出たのは `pending_tasks` だけだった

したがって、
次段でやるべきなのは

- inbox 全般の複雑な分解器

ではなく、

- `pending_tasks` 型の複数見出しタスクメモに限定した最小 split ルール

である。

---

## split 拡張の必要性判断

### 必要

理由:
- spec の「処理単位はチャンク」に近づける必要がある
- `pending_tasks` は複数論点を明示的に含む
- 1テーマ1メモ性が弱い
- 後段で再分解するより、intake 入口で最小分解した方が自然

### まだ不要なもの

- 横断ファイル統合
- 自然言語の高度な意味分解
- 全 inbox 一般化
- チャンク単位 source_ref の細粒度化

### 今必要な最小拡張

- `pending_tasks` 型の構造化メモに対する split ルール
- おそらく `## 1. ...` のような上位見出し単位を基準にした item 化
- `まとめ` セクションを item にするかどうかの判断

---

## 次段への接続

次 task は

- `pending_tasks 型複数論点入力の最小 split ルールを design に落とす`

でよい。

その design でまず固定すべきなのは次である。

1.
split 単位は `## 1.〜## 8.` の上位見出しでよいか

2.
各 item に含める本文範囲は
- `### 内容`
- `### 詳細`
- `### 状態`

まででよいか

3.
`## まとめ` は item にしないか、補助情報として扱うか

4.
source_ref は分割後も同一元ファイル 1 本で十分か

---

## 判断

`pending_tasks` については、
route correctness は成立済みである。

しかし、
それだけでは intake spec の

- チャンク単位処理
- 1テーマ1メモ

を満たしたとは言いにくい。

したがって、
**split 拡張は必要**
と判断する。

ただし、
それは inbox 全面再設計ではなく、
まず `pending_tasks` 型入力に限定した最小 split 拡張として進めるのが自然である。
