# 2026-04-25 phase0_positioning_in_roadmap

## 目的

`docs/05_roadmap.md` における Phase 0 の位置づけを、
現行 docs / plan / operations の整合に沿って整理する。

本メモの目的は、
roadmap 本文をすぐ大きく書き換えることではなく、
次に docs へ返すべき意味づけを明確にすることである。

---

## 参照

- `docs/05_roadmap.md`
- `docs/13_dev_workflow.md`
- `docs/17_operations_system.md`
- `notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md`
- `notes/02_design/2026-04-03_plan_layer_operating_spec.md`

---

## 現状認識

`docs/05_roadmap.md` には、
すでに Phase 0 を

- Common Operating Model Foundation
- EVE の実行系機能を本格的に進める前段
- AI Work OS 全体に共通する operating model の整備段階

として置いている。

したがって、
現在必要なのは
Phase 0 を新設することではなく、
**その意味をもう一段明確にすること**
である。

---

## plan 側で強まった点

`2026-04_phase0_adam_to_eve_common_operating_model.md` まで含めると、
Phase 0 の意味は次のように読める。

- ADAM の個別最適ルール整備ではない
- AI Work OS 全体へ展開できる共通骨格づくりである
- routing / planning / review / handover / canonical layering の分離整理である
- Phase 1 の EVE 実行系 plan 群を安全に乗せる foundation plan である
- 完了判定は「コードがある」ではなく、運用して効果が見えることに置く

このうち、roadmap 本文でまだ弱いのは特に次である。

1.
Phase 0 は「前準備」ではなく
**Phase 1 以降の前提を固定する foundation**
であること

2.
完了判定は実装有無ではなく
**運用可能な operating model として説明できること**
にあること

3.
ADAM は実験対象であり、
目的は ADAM 固有運用ではなく
**EVE / AI Work OS 共通骨格の抽出**
であること

---

## 結論

roadmap における Phase 0 は、
次のように理解するのが最も自然である。

### 1. 位置づけ

Phase 0 は、
Phase 1 を始める前に行う「軽い準備」ではない。

Phase 1 以降の実行系 plan 群を支えるために、
AI Work OS 全体に共通する
routing / planning / review / handover / canonical layering
の operating model を固定する
**foundation phase**
である。

### 2. 主体

Phase 0 は ADAM の開発を通じて進める。

ただし主語は ADAM 固有機能ではなく、
ADAM を使って
EVE / AI Work OS に展開できる共通骨格を抽出することにある。

### 3. 完了判定

Phase 0 の完了は、
個別機能やコード差分の存在だけでは判定しない。

- routing と review の責務分離
- roadmap / plan / operations の階層運用
- handover を入口にした再開構造
- docs / notes / code / operations の正本関係

が、実運用の中で説明可能かつ再利用可能な operating model として成立していることを重視する。

### 4. Phase 1 との接続

Phase 1 は Todoist / Outlook / Teams などの
EVE 実行系を前進させる段階である。

そのため roadmap 上では、
Phase 0 を
**Phase 1 の直前にある foundation phase**
として明確に読み取れるようにしておくのが自然である。

---

## roadmap に返すなら強めたい文脈

docs/05_roadmap.md に返すなら、
次の文脈を少し強めると自然である。

- Phase 0 は共通 operating model foundation である
- ADAM はその foundation を抽出するための開発対象である
- Phase 1 の EVE 実行系はこの foundation の上で進める
- 完了は機能数ではなく、運用可能な骨格成立で判定する

---

## docs 本文にすぐ入れなくてよいこと

この時点では、
次を roadmap に細かく書き込みすぎない方がよい。

- issue routing の個別完成条件
- intake routing の詳細挙動
- daily review reroll gate の細部
- 具体的な active_operations の並び

これらは plan / design / operations 側に留め、
roadmap では上位意味だけを持つ方が整合的である。

---

## 最小差分で docs に返すなら

返すべき差分は大きく 2 点で十分である。

1.
Phase 0 の位置づけ説明に
`Phase 1 以降の plan 群を支える foundation phase`
の意味を少し強く出す

2.
Phase 0 の完了イメージに
`運用可能な operating model として説明できること`
を少し強く出す

---

## 判断

現行 roadmap は大筋で正しい。

ただし、
plan 側まで含めると、
Phase 0 は

- 前準備
ではなく
- 共通骨格を固定する foundation phase

としての意味がより強い。

したがって、
次に docs/05_roadmap.md へ返すなら、
新しい phase を追加するのではなく、
**Phase 0 の foundation 性と完了判定の意味を補強する最小差分**
が最も自然である。
