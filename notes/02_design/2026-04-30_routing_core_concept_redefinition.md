# 2026-04-30 routing core concept redefinition

## 目的

AI Work OS における routing の中核概念を再定義する。

これまでの Phase 0 hardening では、routing が「issue / candidate が発生した時に行き先を決める処理」に寄りすぎていた。

しかし初期構想では、routing は単なる都度分類ではなく、蓄積された inbox / design / issue / dev memo / web clip などを週次や review の節目で精査し、chunk 分解・統合・価値化・配置・archive / pending 判断を行うことで、情報の滞留をなくす機能である。

この note は、初期構想と現運用を比較し、どちらを AI Work OS の routing 本体に置くべきかを整理する。

---

## source_ref

- notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md
- docs/15_notes_system.md
- docs/17_operations_system.md
- notes/08_analysis/2026-04-30_intake_routing_archive_pending_reobservation.md
- notes/08_analysis/2026-04-30_intake_routing_reobservation_return_to_operations.md
- notes/08_analysis/2026-04-30_design_routing_candidate_inventory.md
- notes/08_analysis/2026-04-30_review_routing_rolling_boundary_examples.md
- notes/08_analysis/2026-04-30_phase0_hardening_weekly_readiness_review_draft.md

---

## 問題意識

現運用では routing が次のように扱われがちだった。

```text
新しい issue / candidate / 会話中の論点が出る
→ その場で design / operations / future / archive へ送る
```

この処理は有効だが、routing の本体としては狭い。

このままだと routing は「交通整理」になり、次の本来価値が弱くなる。

- inbox が増え続けるのを抑制する
- 開発メモが滞留するのを防ぐ
- web 情報を chunk 化して使える知識にする
- design / issue / content / operations へ再利用可能な形で流す
- 関連情報を結合して価値を高める
- 古いファイルを archive / pending / future に整理する
- 情報が活きる OS にする

---

## 比較

## A. 都度 routing / triage 型

### 定義

issue や candidate が発生した時、その場で行き先を決める処理。

例:

- 会話中に新しい task 候補が出た
- issue が作られた
- 作業中に別問題が見つかった
- follow-up candidate が発生した

### 主な出力

- issue
- design
- operations candidate
- future
- archive
- content candidate

### 良い点

- 会話中の新規論点を失わない
- active task への横入りを防げる
- operations candidate を rolling へ渡せる
- 小さな混乱を早く収束できる
- immediate execution と candidate 化を分けられる

### 弱い点

- routing が都度処理に矮小化される
- inbox / design / issue の滞留解消には弱い
- 情報の分解・統合・価値化が薄い
- folder 移動や candidate 判定に寄りやすい
- weekly review で蓄積情報を活かす機能になりにくい

### 位置づけ

これは routing 本体ではなく、pre-routing / triage として扱う。

---

## B. 蓄積情報整理・価値化 routing 型

### 定義

weekly review などの節目で、蓄積された inbox / design / issue / dev memo / web clip / pending などを精査し、chunk / theme に分解し、関連情報と結合し、必要な layer に配置・昇格・保留・archive する機能。

### 主な対象

- notes/00_inbox
- dev memo
- web clip
- notes/01_issues
- notes/02_design
- notes/08_analysis
- pending 状態の入力
- content seed
- future candidate

### 主な処理

1. 読む
2. chunk / item / theme に分解する
3. 重複や関連情報を見つける
4. 他の情報と結合する
5. 情報の意味と価値を高める
6. source_ref を残す
7. destination を決める
8. derived output を作る
9. 元 file の postprocess を決める
10. 必要なら archive / pending / future へ移す

### 主な出力

- design note
- issue
- operations candidate
- future candidate
- archive decision
- pending decision
- content seed
- docs update candidate
- weekly review input

### 良い点

- inbox や開発メモが増え続けるのを防げる
- 情報を「保存」から「活用」へ変換できる
- web 情報や dev memo を他の情報と結合して価値化できる
- design / docs / operations / content へ育てられる
- weekly review の価値が上がる
- AI Work OS の「情報が流れる OS」という思想に合う

### 弱い点

- 都度 triage より重い
- weekly review や dedicated routing session が必要
- chunk 分解・統合・source_ref 管理が必要
- 自動化しすぎると premature archive / premature docs 昇格の危険がある

### 位置づけ

これを AI Work OS の routing 本体とする。

---

## 採用判断

AI Work OS における routing の本体は、B の「蓄積情報整理・価値化 routing」とする。

A の都度 routing は捨てない。  
ただし routing 本体ではなく、pre-routing / triage として補助機能に位置づける。

採用する構造:

```text
routing core:
  蓄積情報を整理・分解・結合・価値化し、滞留を解消する機能

pre-routing / triage:
  会話中や issue 発生時に、新規論点を失わないための軽量分類

rolling:
  routing から出た operations candidate を active / next / future へ配置する機能

review:
  routing session の結果を operations / content / future / archive に反映し、継続観測する機能
```

---

## routing の再定義

AI Work OS における routing は、次のように定義する。

```text
Routing は、蓄積された未整理情報を精査し、
chunk / theme に分解し、関連情報と結合し、
docs / design / issue / operations candidate / future / archive / content へ送ることで、
情報の滞留を解消し、再利用価値を高める usecase である。
```

都度発生した issue や会話中の新規候補に対する軽量分類は、routing 本体ではなく pre-routing / triage として扱う。

---

## routing session の発動条件

routing session は次の場合に発動する。

### 1. weekly review 前後

蓄積した inbox / issue / design / dev memo / analysis / content seed を精査し、滞留を解消する。

### 2. inbox / dev memo が増えてきた時

未整理ファイル数や滞留日数が増えた場合、routing session を行う。

### 3. design / issue が増え、再利用先が曖昧になった時

design retain / future/design / archive / docs candidate / operations candidate を分ける。

### 4. web 情報や開発メモを価値化したい時

単独メモではなく、他の情報と結合して design / content / issue / future へ育てる。

### 5. Phase / plan の節目

Phase 0 hardening から Phase 1 へ戻る前など、蓄積情報を整理して次 phase に持ち越すものを決める。

---

## pre-routing / triage の発動条件

pre-routing / triage は次の場合に発動する。

- 会話中に新しい論点が出た
- issue が新規作成された
- 作業中に follow-up candidate が出た
- active へ横入りしそうな候補が出た
- content seed が見つかった
- future に送るべきか迷う論点が出た

目的は、新規論点を失わず、即実行を防ぐことである。

pre-routing / triage は、原則として物理移動や本格的な結合を行わない。

---

## routing session の completed condition

routing session は、単に行き先を決めただけでは完了しない。

completed condition:

- 対象 source を読んだ
- chunk / item / theme に分解した
- 関連する既存 notes / docs / operations / issues を確認した
- 重複・統合可能性を判断した
- 必要なら derived output を作った
- source_ref を derived output に残した
- destination を決めた
- 元 file の postprocess を決めた
- archive / pending / future / retain の理由を明示した
- physical move が必要なら、別 write task または review action として扱った
- content seed があれば notes/09_content への送付候補として扱った

---

## physical move の扱い

routing は、必ずしも即 physical move を行わない。

ただし routing 本体では、postprocess decision までは必ず行う。

postprocess decision:

- archive
- pending
- retain
- future
- delete candidate
- split required

physical move は次のいずれかで行う。

- routing session の最後に Write Gate 後に実行する
- daily / weekly review の整理 action として実行する
- file move 専用 task として operations candidate 化する

重要:

```text
archive 判定と archive 移動は別。
ただし archive 判定だけで放置し続けると routing の価値が落ちる。
```

---

## folder / layer ごとの扱い

### inbox

inbox は未整理入力の入口であり、保管場所ではない。

routing session で読み、chunk 化し、必要な派生先へ送る。  
source_ref が派生先に残り、元 file を保持する理由がなければ archive 原則。

### dev memo

dev memo は粗い観測や開発メモの一時置き場。

一定期間ごとに routing session で精査し、issue / design / operations candidate / content seed / archive に送る。

### issue

issue は未処理問題の置き場であり、溜め続ける場所ではない。

issue routing では、plan / operations candidate / design / future / archive / keep を決める。

### design

design は docs 直前の構造整理レイヤー。

design routing では、docs 昇格 / design retain / future-design / archive / operations candidate を判断する。

### analysis

analysis は観測結果や判断材料の置き場。

weekly review で再利用し、必要なら plan / design / operations candidate / content seed へ戻す。

### content

content は将来 note 記事化・収益化を目指すためのネタ帳。

routing session では、作業ログ・失敗・設計判断・before/after・読者への示唆を content seed として抽出する。

---

## 現在の notes の再位置づけ

### 有効なもの

次は routing session の部品として有効。

- intake routing archive / pending reobservation
- design routing candidate inventory
- review routing rolling boundary examples
- phase0 hardening weekly readiness review draft

### triage 寄りのもの

次は routing 本体というより pre-routing / operations candidate triage に近い。

- phase0 hardening follow-up candidate routing
- 会話中に出た新規候補の active / next / future 判定
- issue 発生直後の軽量分類

### 修正が必要な理解

以前の説明:

```text
routing = 行き先を決める
```

修正後:

```text
routing = 情報を活かせる形へ変換し、行き先を決め、滞留を解消する
```

---

## operations / review への影響

### operations

routing session から出た operations candidate は、即 active 化しない。  
operations rolling で active / next / future へ配置する。

### daily review

daily review では当日の実績整理に加え、content seed 抽出と軽い postprocess action を扱える。  
ただし本格 routing session は weekly review 側が自然。

### weekly review

weekly review では、routing session を強く組み込む。

weekly review の routing-related responsibilities:

- inbox / dev memo の滞留確認
- issue / design / analysis の滞留確認
- archive 判定済みだが未移動のものを確認
- pending 理由が有効か確認
- content seed を抽出・整理
- routing から operations candidate を作る
- future / archive / retain を更新する

---

## 今後の task candidate

### 1. routing session checklist を作る

目的:

蓄積情報整理・価値化 routing の実行 checklist を作る。

completed condition:

- inbox / dev memo / issue / design / analysis / content seed の確認項目を作る
- chunk 分解 / 統合 / source_ref / postprocess / physical move の checklist を作る
- weekly review で使える形式にする

placement:

- active candidate

理由:

routing の本体定義を修正したため、実運用 checklist へ落とす必要がある。

---

### 2. weekly review procedure に routing session を組み込む

目的:

weekly review が report 作成や operations 再設計だけでなく、蓄積情報の routing session を含むようにする。

completed condition:

- weekly review の input に inbox / dev memo / issue / design / analysis / content seed を追加する
- weekly review の output に archive move / pending decision / content seed / operations candidate を追加する
- operations / content / archive との接続を整理する

placement:

- active or next candidate

理由:

routing を本体定義に戻すなら、weekly review 側の procedure も更新が必要。

---

### 3. archive 判定済みファイルの未移動一覧を作る

目的:

routing で archive 判定したが物理移動していない file / task / note を一覧化する。

completed condition:

- archive 判定済み item を抽出する
- physical move 済み / 未済みを分ける
- move すべきもの、retain すべきもの、review 待ちを分ける

placement:

- next candidate

理由:

routing は判定だけで終わると滞留解消機能にならない。  
ただし物理移動は安全確認が必要なため、別 task とする。

---

## 判断

AI Work OS の routing 本体は、蓄積情報の整理・分解・結合・価値化・配置・滞留解消機能として定義する。

都度発生する issue / conversation / follow-up candidate の分類は、routing 本体ではなく pre-routing / triage として扱う。

この再定義により、routing は単なるフォルダ移動でも、単なる issue 処理でもなく、情報を活かすための中核装置になる。
