# 2026-04-30 intake routing archive pending reobservation preparation

## 目的

`intake routing の archive / pending 後処理を実データで再観測する準備をする` の成果物として、実データ再観測の対象、観測項目、想定 routing / postprocess を整理する。

この note は準備メモであり、実際の intake routing apply、派生メモ保存、file move はまだ行わない。

---

## source_ref

- notes/02_design/2026-04-26_intake_inbox_postprocess_general_rule.md
- notes/02_design/intake_review_and_source_ref_spec.md
- notes/04_operations/active_operations.md

---

## 前提

source_ref から確認した rule:

- intake routing の処理単位は file ではなく chunk / item / theme。
- 出力は 1テーマ1メモ。
- source_ref は派生メモ側に残す。
- routing 済みの元 inbox file は archive 原則。
- pending は例外であり、保留理由を1文で説明できる場合だけ許可。
- 判断可能なものを pending に逃がさない。
- future から active へ直接移動しない。再活性化時は intake routing を再実行する。

補足:

- `repoResourceGet(resource=repo, action=tree)` は runtime 未対応だった。
- `repoResourceGet(resource=notes, action=list)` も未対応だった。
- 代替として `repoResourceGet(resource=repo, action=grep)` で `notes/00_inbox` 配下を確認した。
- search / list / tree 失敗や grep 0件を対象不在の証明とは扱わない。

---

## 観測対象候補

### 対象A

file:

`notes/00_inbox/2026-03-23_inbox_web_digest.md`

理由:

- すでに digest / 要約 / 記事別整理 / 仕分け結果を含む。
- 複数記事・複数テーマを含み、chunk / theme 分解の観測に向く。
- 「すでに整理済みに見える元 file」を archive 原則で扱えるか確認しやすい。
- source_ref を派生メモに残せば、inbox に残す理由は弱い可能性が高い。

想定:

- postprocess 候補: archive
- ただし、既存の派生メモ有無は別途確認が必要。

---

### 対象B

file:

`notes/00_inbox/260322_091234AIエージェントの作り方完全ガイド｜SIGNATE総研.md`

理由:

- 単一記事だが、AIエージェント設計・導入・運用改善など複数論点を含む。
- AI Work OS の design / future / content 素材に分けられる可能性がある。
- chunk 分解が成立するか観測しやすい。

想定:

- postprocess 候補: archive
- pending 条件: 分解すべき論点が多すぎて今回 routing 範囲を絞れない場合のみ。

---

### 対象C

file:

`notes/00_inbox/ChatGPT Agent（エージェント）とは？背景や使い方を解説！.md`

理由:

- ChatGPT Agent / 外部ツール連携 / スライド・スプレッドシート生成 / スケジュール管理など、AI Work OS に関連する論点がある。
- current runtime / tools / product 情報の鮮度確認が必要になりうるため、pending 条件を観測しやすい。
- 古い記事や外部情報の場合、内容をそのまま docs 化せず future / content / issue に分ける判断が必要。

想定:

- postprocess 候補: pending または archive
- pending 理由例: 最新性確認が必要で、routing 判断に必要な前提情報が不足しているため。

---

## archive / pending / keep 観測項目

### archive 判定

対象 file は次を満たす場合、archive 扱いへ寄せる。

- [ ] chunk / item / theme への分解が成立した
- [ ] 主要論点の route または保持先を説明できる
- [ ] 派生メモに source_ref を残せる
- [ ] 元 file を inbox に残さなくても後続判断に支障がない
- [ ] pending 理由を1文で説明できない

### pending 判定

対象 file は次のいずれかがある場合のみ pending とする。

- [ ] chunk 分解が成立していない
- [ ] テーマ境界が曖昧である
- [ ] route / 保存先判断が未了である
- [ ] 情報不足により判断不能である
- [ ] 元 file を参照しながら追加分解する予定がある
- [ ] pending 理由を1文で説明できる

### keep 判定

intake routing では、元 inbox file の keep は原則使わない。

ただし、次の場合は実質 pending として扱う。

- [ ] 未処理部分が残っている
- [ ] 判断不能な chunk が残っている
- [ ] 追加分解予定がある
- [ ] source_ref だけでは追跡不十分である

### 禁止

- [ ] 処理済み file を無理由で inbox に残さない
- [ ] 判断可能なものを pending に逃がさない
- [ ] source_ref が成立しているのに inbox 保持を既定にしない
- [ ] future から active へ直接移動しない

---

## 実行前の想定 routing / postprocess

### 対象A

file:

`notes/00_inbox/2026-03-23_inbox_web_digest.md`

想定 chunk:

- AIエージェント設計原則
- Obsidian / inbox 運用
- DESIGN.md 的レイヤー
- AI Work OS への示唆
- 対応不要記事の整理

想定 destination:

- design: AI Work OS 設計原則に関わるもの
- future: 今すぐ扱わない web 整理素材
- archive: 対応不要または役目終了部分
- content: 将来の記事素材になるもの

想定 postprocess:

archive

archive 理由:

digest と仕分けが成立しており、派生メモに source_ref を残せば元 file を inbox に残す必要は弱い。

---

### 対象B

file:

`notes/00_inbox/260322_091234AIエージェントの作り方完全ガイド｜SIGNATE総研.md`

想定 chunk:

- AIエージェント開発手順
- ナレッジ準備
- ワークフローと権限設計
- 運用改善
- 導入事例

想定 destination:

- design: agent workflow / permission / knowledge preparation
- future: 現 phase では扱わない実装・導入一般論
- content: 記事素材
- archive: 重複または一般論として役目終了の部分

想定 postprocess:

archive

pending にする条件:

テーマが多く、今回の観測で chunk 分解を完了できない場合のみ pending。

---

### 対象C

file:

`notes/00_inbox/ChatGPT Agent（エージェント）とは？背景や使い方を解説！.md`

想定 chunk:

- ChatGPT Agent の位置づけ
- 外部ツール連携
- スライド / スプレッドシート生成
- スケジュール管理
- AI Work OS への示唆

想定 destination:

- design: tool integration / schedule operation に関わるもの
- future: ChatGPT Agent 活用検討
- content: 解説記事素材
- issue: 現行 runtime / product 情報との差分確認が必要な場合

想定 postprocess:

pending または archive

pending 理由候補:

記事内容の最新性確認が必要で、routing 判断に必要な前提情報が不足しているため。

archive にできる条件:

最新性確認が不要な抽象論点だけを抽出し、source_ref を残せる場合。

---

## completed condition 対応

この preparation task の completed condition:

- 観測対象の inbox / dev_memo / pending_tasks 型入力を選定する
- archive / pending / keep の観測項目を定義する
- 実行前に想定される送付先と後処理条件を整理する

対応:

- 観測対象の inbox 型入力を選定した。
- archive / pending / keep の観測項目を定義した。
- 実行前に想定される送付先と後処理条件を整理した。

---

## 次 task への引き渡し

次の active task:

`intake routing の archive / pending 後処理を実データで再観測する`

次 task では、今回選定した対象から実際に chunk / theme 分解し、route 結果と postprocess 結果を分けて記録する。

実行時の注意:

- 実 routing と file move を混同しない。
- postprocess 判断は archive / pending / keep を分ける。
- archive 扱いは、ただちに物理移動することを意味しない。
- write が必要な場合は Write Gate を出す。
- append が必要でも `<<APPEND>>` は使わず、read → 全文合成 → update で行う。
