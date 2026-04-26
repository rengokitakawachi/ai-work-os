# 2026-04-26 ADAM Instruction GPT-5.5 Layering Design

## 目的

ADAM instruction を GPT-5.5 向けに再調整するため、
現行 instruction を `core / procedure / schema` の3層へ再分解する方針を固定する。

この design は、即 rewrite ではなく、
どの情報をどの層へ移すべきかを決める前提固定 task である。

---

## 外部前提

OpenAI 公式情報では、GPT-5.5 は複雑な目標理解、ツール利用、出力確認、長いタスク遂行、プロフェッショナルワークに強いモデルとして説明されている。

また OpenAI API の model comparison では、GPT-5.5 は function calling / structured outputs を supported features として持つ。

この前提から、ADAM では次を採用する。

- 長い手順を常時 instruction に詰め込むより、成功条件と判断原則を core に残す
- 状況依存の手順は procedure spec へ分離する
- 入出力制約や enum / required は schema 側へ寄せる
- runtime で観測すべき completed condition は削らず、層を分けて保持する

---

## 現状の問題

`config/ai/adam_instruction.md` は、重要な運用ルールを保持している一方で、次の情報が同じ層に混在している。

- ADAM の役割
- SSOT / docs / operations の最重要原則
- write gate
- Todoist projection 原則
- operations 利用ルール
- completed condition 判断ゲート
- daily review 手順
- flow control / routing ルール
- handover ルール
- 出力形式ルール
- 保存先ルール
- runtime schema 反映確認ルール

これにより、次のリスクがある。

- 常時読むべき core と、状況依存の procedure が区別されない
- instruction が長くなり、重要度の差が見えにくい
- schema で縛れる制約まで自然文 instruction に残る
- review / routing / write などの手順が互いに干渉しやすい
- 新しい rule を追加するたびに core が肥大化する

---

## 再層化の結論

ADAM instruction は次の3層へ分ける。

1. Core Instruction
2. Procedure Specs
3. Structured Outputs / API Schema

加えて、背景説明は `adam_knowledge.md` に残す。

---

## 1. Core Instruction

### 目的

常時効くべき判断原則だけを置く。

### 残すもの

- Role
- 最重要原則
- SSOT は docs
- docs → code の順で判断
- operations は短期実行順の正本
- Todoist は operations の projection
- 推測で仕様を補完しない
- 小さく安全に前進する
- API は薄く、ロジックは service 層に集約する
- repo / canonical / runtime を分ける
- completed condition は観測で閉じる
- active 外 task を勝手に実行しない
- write 前に read / 事前表示 / write / 保存確認する

### 残さないもの

- daily review の詳細手順全文
- issue routing の細かい分岐表
- handover template 的な詳細手順
- Todoist API schema の enum / field 説明
- 長い保存先一覧の詳細

### 判断

Core は、ADAM がどの場面でも外してはいけない安全柵に限定する。

---

## 2. Procedure Specs

### 目的

状況依存の手順を、必要な場面だけ参照するレイヤーに分ける。

### 分離候補

- review procedure
  - daily review
  - weekly review
  - monthly review
- routing procedure
  - intake routing
  - issue routing
  - design routing
  - conversation routing
- operations procedure
  - reroll
  - active / next / archive 更新
  - Todoist projection
- write procedure
  - read → 整理 → 事前表示 → write → 保存確認
- handover procedure
  - template read
  - handover 保存
  - 新スレッド再開順
- schema update procedure
  - repo schema 更新
  - Action 再反映
  - runtime tool schema 確認

### 保存先候補

- `config/ai/procedures/review.md`
- `config/ai/procedures/routing.md`
- `config/ai/procedures/operations.md`
- `config/ai/procedures/write_gate.md`
- `config/ai/procedures/handover.md`
- `config/ai/procedures/schema_runtime_reflection.md`

### 判断

Procedure は消すのではなく、常時 instruction から外へ逃がす。

ADAM は task 種別を判定した後、該当 procedure を参照する。

---

## 3. Structured Outputs / API Schema

### 目的

tool input / output で機械的に縛れるものを schema 側へ寄せる。

### schema に任せるべきもの

- enum
- required field
- date format
- operation mode
- target
- due_type
- projection payload shape
- Todoist update / close schema
- repo resource action / resource enum
- task object shape

### instruction に残すべきもの

- schema 更新後も runtime 反映済みとはみなさない
- repo schema / runtime tool schema / actual behavior を分ける
- runtime tool schema 上で field が見えることを completed condition に含める
- dry_run で payload を確認してから apply する

### 判断

schema は形を縛る。
Core は判断原則を縛る。
Procedure は手順を縛る。

---

## 4. Knowledge Layer

### 目的

背景知識、用語整理、補足仕様を保持する。

### 置くもの

- ADAM / EVE の関係
- Repo Resource の定義
- notes layer の意味
- Flow Control の詳細知識
- 複数論点が出たときの考え方
- Review / Report 概要
- Handover 詳細知識

### 保存先

- `config/ai/adam_knowledge.md`

### 判断

Knowledge は判断を助ける補助であり、core rule ではない。

---

## 移行方針

### Phase A: design 固定

この design で、core / procedure / schema の責務境界を固定する。

### Phase B: inventory

現行 `adam_instruction.md` の各 section を次へ分類する。

- core に残す
- procedure へ移す
- schema に任せる
- knowledge へ移す
- archive / 削除候補

### Phase C: procedure files 作成

review / routing / operations / write_gate / handover / schema runtime reflection を分ける。

### Phase D: core instruction 圧縮案作成

現行 instruction を削るのではなく、core と参照先を持つ形に再構成する。

### Phase E: runtime 反映確認

repo 更新後、GPT editor / runtime tool schema / 実運用挙動で反映確認する。

---

## 現行 section の初期分類

| 現行 section | 移動先 | 理由 |
|---|---|---|
| Role | core | ADAM の常時役割 |
| 最重要原則 | core | 常時判断原則 |
| ツール実行ルール | core + procedure | 必須 Action は core、詳細手順は procedure |
| Write Gate | core + procedure | 事前表示原則は core、詳細形式は procedure |
| Action / API schema 更新ルール | core + procedure | runtime 分離原則は core、手順は procedure |
| Docs / Notes / Todoist | core + knowledge | SSOT は core、保存先詳細は knowledge / procedure |
| Operations利用ルール | core + procedure | active 正本は core、reroll 詳細は procedure |
| 一般化した再発防止ゲート | core | ADAM の品質ゲート |
| 自己監査 / 深掘り停止ルール | core | 局所最適化防止 |
| Review実行ルール | procedure | review 時だけ必要な詳細手順 |
| Flow Control / Routing利用ルール | procedure + knowledge | routing 時だけ必要な詳細手順 |
| Handover / 再開ルール | procedure | handover 時だけ必要 |
| 出力 / 課題整理 | core + procedure | docs 未取得停止は core、保存手順は procedure |

---

## 重要な非目標

この task では、次は行わない。

- `adam_instruction.md` 本体の rewrite
- procedure file の作成
- schema の変更
- runtime GPT editor への反映
- Todoist projection の変更

これは前提固定 task である。

---

## completed condition

この task は次を満たしたら完了とみなす。

- GPT-5.5 向け再層化の目的が説明できる
- core / procedure / schema / knowledge の役割差が説明できる
- 現行 instruction の初期分類がある
- 即 rewrite しない理由が明示されている
- 後続 task が分解できる

---

## 後続 task 候補

1. `adam_instruction.md の section inventory を作る`
2. `review / routing / operations procedure file の最小構成を設計する`
3. `ADAM core instruction の圧縮案を作る`
4. `procedure specs への分離差分を作る`
5. `runtime 反映確認 task を作る`

---

## 判断

ADAM instruction の GPT-5.5 対応は、ルール削除ではなく責務分離で進める。

常時必要な判断原則は core に残す。
状況依存の手順は procedure spec へ移す。
機械的制約は schema へ寄せる。
背景知識は knowledge に残す。

この順で進めれば、ADAM の安全性と仕様整合を落とさず、instruction の肥大化を抑えられる。
