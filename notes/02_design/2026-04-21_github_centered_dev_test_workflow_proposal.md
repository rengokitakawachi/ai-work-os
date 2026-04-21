# 2026-04-21 github_centered_dev_test_workflow_proposal

## 目的

Claude から提案された
GitHub 中心の開発・テスト連携フローを、
現時点では運用変更ではなく
design 論点として整理する。

本メモは、
dialogue 分割対応とは切り分けて、
提案1 を open のまま保持しつつ、
現行 docs との整合差分と
採用条件を明確にすることを目的とする。

---

## 参照

- `config/ai/from-claude.md`
  - 元提案本文の確認用
- `config/ai/from-adam.md`
  - ADAM の初回判断確認用
- `docs/13_dev_workflow.md`
  - 現行の人間 / AI / 外部操作責務の正本確認用
- `docs/16_governance.md`
  - docs 更新と最終判断の統治前提確認用
- `notes/02_design/standard_development_flow_v2.md`
  - 既存の開発フロー設計との近接確認用
- `notes/02_design/2026-03-27_standard_development_flow_automation.md`
  - 自動化方向の既存検討との重複確認用

---

## 対象提案

対象は
`workflow-restructure-01`
のうち、
GitHub 中心ワークフロー提案である。

提案概要は次である。

- ADAM が feature branch を切る
- ADAM が PR を作成する
- CI がテストを自動実行し、PR に結果を記録する
- Claude が PR review を行う
- User は merge 判断に集中する

提案2 の
`from-adam.md / from-claude.md` 分割は
別論点として扱い、
本メモでは扱わない。

---

## 結論

現時点の判断は次である。

- 方向性は妥当
- ただし即運用移行はしない
- proposal は open のまま維持する
- 先に notes/design で再設計を固定する

つまり、
本提案は
**採用候補ではあるが、
現行正本ルールに対して未整合箇所を持つため、
即時運用変更にはしない**
という扱いにする。

---

## なぜ即移行しないか

### 1. 現行 docs と外部操作責務がずれる

`docs/13_dev_workflow.md`
では、
人間の役割として次が定義されている。

- 意思決定
- 最終判断
- docs 反映
- 実装の実行
- 外部環境の操作

このため、
「ADAM が標準的に branch 作成・PR 作成を行う」
をそのまま現行運用にすると、
外部環境操作の責務とずれる。

---

### 2. docs 更新は人間判断前提で固定されている

`docs/13_dev_workflow.md`
と
`docs/16_governance.md`
の両方で、
docs 更新と最終判断は人間前提になっている。

GitHub workflow を強く前に出す場合でも、
次の境界を崩してはいけない。

- docs は人間判断で反映する
- AI は notes/design までを主責務とする
- 外部環境操作を既定責務として一般化しない

---

### 3. 今の主タスクは flow-control の分離完了である

現時点の本筋は、
routing / writing の責務分離、
compatibility 縮退、
flow-control の整合回復にある。

このタイミングで
開発ワークフロー全体を変えると、
本筋の観測対象と運用変更が混ざりやすい。

したがって、
今は design 論点として止める方が安全である。

---

## 提案の良い点

即採用しないが、
提案自体には価値がある。

### 1. User 仲介コストを下げる方向性

現状は、
User が AI 間の受け渡し役になりやすく、
認知コストが高い。

PR / CI / review を中心に置く発想は、
この負荷を下げる方向として妥当である。

### 2. テスト結果の標準化

CI にテストを寄せると、
結果記録と再確認線が一定化しやすい。

これは、
Claude のテスト担当境界とも相性がよい。

### 3. AI 間ファイル分離と整合しやすい

今回適用済みの

- `config/ai/from-adam.md`
- `config/ai/from-claude.md`

という分離運用とは、
PR ベース運用の方が構造的には相性がよい。

---

## 未整合な論点

採用前に整理が必要な論点は次である。

### 1. branch / PR 作成を誰の標準責務にするか

候補は次の 3 パターンである。

- 人間のみ
- ADAM 補助付きだが最終実行は人間
- 特定条件下で ADAM 実行可

現行 docs は
実質的に「人間のみ」に寄っている。

ここを変えるなら、
workflow docs 側の整理が必要である。

---

### 2. CI 結果をどこまで正本として扱うか

CI は
実行結果の記録には向くが、
仕様正本にはならない。

したがって、
CI を導入しても
次は維持する必要がある。

- SSOT は docs
- review 結果やテスト結果は補助情報
- merge 判断は人間

---

### 3. Claude の権限境界との整合

現在の ADAM → Claude の運用では、
Claude の通常 write 権限は限定的である。

PR review を Claude の標準責務にするなら、
次を明確にする必要がある。

- review コメントだけか
- CI 設定追加まで含むか
- test workflow 更新まで含むか
- production code への write とどう分けるか

この判断は、
現行 docs の人間責務・外部操作境界を崩さないことを上位条件に、
User の最終判断で固定するのが自然である。

---

### 4. operations との接続

この提案は
「開発実行フロー」の再設計であり、
operations の短期実行順正本とは別軸である。

そのため、
採用する場合でも
次を分けて扱う必要がある。

- operations は何を今やるかの正本
- GitHub workflow はどう実装・確認・レビューするかの実行路

---

## 採用するなら先に固定すべきこと

本提案を将来採用するなら、
最低限次を先に固定する必要がある。

### 1. workflow の責務表

- ADAM
- Claude
- CI
- User

の責務を、
「提案」ではなく
固定表として定義する。

---

### 2. 外部環境操作の例外条件

現行 docs では
外部環境操作は人間責務である。

これに例外を設けるなら、
少なくとも次を固定する。

- どの操作まで許可するか
- どの条件なら AI 実行可か
- どこから先は必ず人間判断か

---

### 3. CI の最小責務

CI が最小で何をするかを分ける。

候補:

- `node --test`
- coverage 計測
- PR comment 出力
- failure summary 出力

最初から広げず、
最小責務に留める方が自然である。

---

### 4. notes / docs / PR の役割境界

導入しても、次の関係は崩さない。

- docs = SSOT
- notes/design = docs 直前草案
- PR = 実装差分とレビュー単位
- CI = 実行結果記録

---

## 現時点でやらないこと

本 proposal が open の間は、
次を既定運用としては採用しない。

- ADAM の branch / PR 作成を標準化する
- CI 導入を本筋タスクへ横入りさせる
- PR review を Claude の標準フローとして固定する
- docs 未更新のまま workflow 変更を既定運用とみなす

---

## 今回適用済みで切り分けるもの

今回すでに進めてよいと判断したのは、
提案2 のみである。

適用済み:
- `config/ai/from-adam.md`
- `config/ai/from-claude.md`
- `config/ai/dialogue.md` の archive 化

これは
「対話ファイル運用の責務分離」であり、
GitHub workflow 本体の採用とは分けて扱う。

---

## 次の判断ポイント

将来この proposal を再開するなら、
次を確認するのが自然である。

以下は順不同であり、
特に外部環境操作の責務例外は早めに固定すべき論点である。

1.
flow-control 本筋の整合回復が一段落しているか

2.
`node --test` を含む最小 test line が安定しているか

3.
CI を導入する目的が
「仕様判断」ではなく
「回帰確認と結果記録」に限定されているか

4.
外部環境操作の責務例外を
notes/design 上で先に固定したか

5.
必要なら docs 更新候補へ上げる準備ができているか

---

## 判断

GitHub 中心ワークフロー提案は、
中長期的には有望である。

ただし現時点では、
現行 docs に対して
責務境界の未整合を含む。

したがって、
今の自然な扱いは次である。

- proposal は open 維持
- notes/design に整理して保留
- 本筋の flow-control 改善を優先
- 必要になった時点で workflow 再設計として再開する
