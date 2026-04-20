# 2026-04-12 intake_and_issue_routing_minimum_roles

## 目的

ADAM 開発を前に進めるため、
`intake routing` と `issue routing` の最小責務を固定する。

本メモは、
routing を review や operations から分離しつつ、
最小運用で崩れない形を定義することを目的とする。

---

## 結論

routing は2段で考える。

1.
`intake routing`
= 未整理入力を構造化して、
issue / design / future / archive に振り分ける処理

2.
`issue routing`
= issue を起点に、
plan / operations / design / future / archive へ再配置する処理

さらに、
routing は振り分けて終わりではない。

routing 後は、
振り分けたファイルに対して必要な処理を行い、
役目が終わったものは archive へ移し、
判断に迷うものは先送りして残す。

重要なのは、
issue routing は**無理に issue から振り分けなくてよい**ことである。
送付先がまだ自然でなければ、
その issue は issue のまま残してよい。

---

## 位置づけ

### intake routing

未整理入力の入口処理。

対象

- `00_inbox`
- 必要に応じて `80_future/inbox`

役割

- チャンク分解
- テーマ統合
- 1テーマ1メモ化
- source_ref 付与
- 保存先判定
- routing 後処理

出力先

- `01_issues`
- `02_design`
- `80_future`
- `99_archive`

### issue routing

issue の再配置処理。

対象

- `01_issues`
- 会話起点で仮置きされた issue
- 必要に応じて future/issue から戻したもの

役割

- issue の粒度再確認
- 1論点1issue への分解 / 統合
- 送付先判定
- operations candidate / design / future への派生
- plan 接続判断
- routing 後処理

出力先

- `01_issues`（keep / 保留）
- `02_design`
- `03_plan`
- `04_operations`（candidate 経由）
- `80_future`
- `99_archive`

---

## intake routing の最小責務

### 入力

- inbox の未整理入力
- 関連ファイル群
- source 群の集合

### やること

1.
未整理入力を読む

2.
チャンクに分解する

3.
テーマごとに統合する

4.
1テーマ1メモを作る

5.
source_ref を付与する

6.
保存先を判定する

7.
routing 後の処理を行う

### 保存先判定の最小ルール

- 問題として扱う
  → issue

- 設計として扱う
  → design

- 今は扱わない
  → future

- 役目終了
  → archive

### routing 後の処理

routing 後は、
振り分けたファイルに対して必要な処理を行う。

その後、
元の未整理入力について次を判断する。

- 役目が終わった
  → archive に移す

- まだ判断に迷う
  → 先送りして残す

### やらないこと

- operations の順位決定
- review の代替
- active への直接投入
- issue を飛ばして execution すること

---

## issue routing の最小責務

### 入力

- issue
- 会話起点で抽出された新論点
- future/issue の再活性化対象

### やること

1.
issue の粒度を確認する

2.
1論点1issue に分解 / 統合する

3.
今どこへ送るべきかを判定する

4.
必要に応じて以下を派生させる

- design
- operations candidate
- future
- archive
- plan 接続候補

5.
routing 後の処理を行う

### 送付先判定の最小ルール

- 解決策の構造化が必要
  → design

- 一定期間の重点テーマとして保持したい
  → plan

- 実行可能粒度で短期実行順に入れられる
  → operations candidate

- 今は早い / 前提未整備
  → future

- 役目終了
  → archive

- まだ振り分け先が自然でない
  → issue に残す

### routing 後の処理

routing 後は、
送った先のファイルを必要に応じて更新する。

そのうえで、
元の issue について次を判断する。

- 役目終了
  → archive に移す

- まだ保持した方がよい
  → 残す

- 判断に迷う
  → 先送りして残す

- 振り分け先がまだ自然でない
  → issue のまま残す

### やらないこと

- active への無条件横入り
- rolling を飛ばした operations 確定
- review の代替
- inbox の再構造化

---

## conversation routing との関係

会話起点の新論点は、
原則 issue として受ける。

したがって、
conversation routing は独立レイヤーではあるが、
出力は issue routing に接続する。

整理すると、

- inbox 起点
  → intake routing
  → issue / design / future / archive

- 会話起点
  → conversation routing
  → issue
  → issue routing

この構造にすると、
conversation routing は
「新しい issue を作る入口」として理解できる。

---

## review との境界

routing は、
進行中資産の見直しではなく、
保存先 / 接続先の判定と初期処理を担う。

review は、
進行中資産の進捗確認・整合確認・見直しを担う。

したがって、

- routing
  - どこへ送るかを決める
  - 振り分けた先の初期処理を行う

- review
  - 進行中のものをどう更新するか決める

と分ける。

### routing がやらないこと

- 完了 task の archive 移動確定
- active / next / archive の全面更新
- daily / weekly review の代替

### review がやらないこと

- inbox のチャンク分解
- issue の初回課題定義
- 未整理入力の保存先判定

---

## operations との境界

operations は短期実行順の正本であり、
routing はその前段である。

routing がやるのは
`operations candidate` まで。

operations へ正式に入るには、
rolling を通す。

したがって、

- issue routing
  → operations candidate 生成

- operations rolling
  → ranking / placement
  → active / next 出力

と分ける。

---

## future との境界

future は、
今は扱わないが将来扱う可能性があるものを置く。

routing は future への送付判断を行う。

ただし、
future から active へ直接戻さない。

future の再活性化は、

- intake routing 再実行
または
- issue routing / weekly review での再判定

を通す。

---

## archive との境界

archive は役目終了後の保存先であり、
routing でも review でも送付先になりうる。

ただし理由は異なる。

- routing で archive
  = 未整理入力や issue が役目終了した

- review で archive
  = 完了した運用資産を退避する

---

## 最小運用ルール

### intake routing

- 処理単位はチャンク
- 出力単位は 1テーマ1メモ
- inbox を直接編集しない
- source_ref は出力側にのみ付与する
- routing 後に元入力を
  `archive に移す / 保留で残す`
  のどちらかにする

### issue routing

- 1論点1issue を守る
- issue を起点に派生させる
- operations 化する前に粒度を整える
- active に入れる前に rolling を通す
- 振り分け先がまだ自然でなければ、無理に issue から移さない
- routing 後に元 issue を
  `archive / 残す / 保留`
  のどれかにする

### 共通

- routing と review を混同しない
- routing は保存先判定と初期処理
- review は進行中資産の更新
- operations は execution 正本
- 判断に迷うときは無理に閉じず、先送りして残す

---

## ADAM 開発にとっての意味

この最小整理により、
ADAM では次が安定する。

- 未整理入力をどう受けるか
- 会話起点の新論点をどこへ置くか
- issue を plan / operations / design にどう送るか
- routing 後に元ファイルをどう扱うか
- review に何を背負わせないか

つまり、
ADAM 側の operating model を進めるうえで、
routing 側の弱点を最小形で補える。

---

## 次の論点

1.
`docs/05_roadmap.md` に Phase 0 を正式反映する差分を作る

2.
issue routing を operations generation / placement とどう接続するかを
もう一段だけ具体化する

3.
必要なら `standard_development_flow_v2.md` と
`intake_review_and_source_ref_spec.md` の用語をこの整理へ寄せる

---

## 判断

ADAM 開発を先に進める前提では、
まず以下だけ固定すれば十分である。

- intake routing は未整理入力を構造化する
- issue routing は issue を再配置する
- 振り分け先がまだ自然でなければ issue のまま残してよい
- routing 後は振り分けた先を処理する
- 役目終了なら archive に移す
- 迷うなら先送りして残す
- review は進行中資産を更新する
- operations は execution 正本である

この整理で、
Phase 0 の routing 側はかなり前進したとみなせる。
