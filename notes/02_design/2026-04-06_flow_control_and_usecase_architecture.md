# Flow Control and Usecase Architecture

## 1. 概要

本specは、routing と operations rolling を含む処理を、
共通の上位概念「Flow Control」として再定義する。

目的：

- routing と operations の構造的重複を解消する
- 共通処理と用途別処理を分離する
- プログラム実装の一貫性と拡張性を確保する

---

## 2. 結論

routing と operations rolling は別機能ではなく、

```text
Flow Control 上に載る異なるユースケース
```

として扱う。

---

## 3. Flow Control の定義

Flow Control は以下を担う。

- 候補収集
- 正規化
- ルール評価
- 補助スコア付与
- 配置準備
- 出力データ生成

```text
Flow Control =
candidate collection
→ normalization
→ rule evaluation
→ helper scoring
→ placement preparation
→ output generation
```

ただし、
すべての usecase が同一の前処理を持つわけではない。

特に、

- intake routing
- issue routing

は、候補収集後に
「分解 → 統合 → 1テーマ単位への再構成」
を持つ強い再構成系 usecase とする。

---

## 4. レイヤー構造

```text
Flow Control（共通エンジン）
↓
Usecases（用途別ロジック）
  - intake routing
  - issue routing
  - operations rolling
```

---

## 5. 共通処理（Flow Engine）

### 5.1 candidate collection

以下から候補を収集する。

- plan
- issue
- design
- dev_memo
- 会話
- review
- inbox

---

### 5.2 normalization

- 構造整形
- source_ref 付与
- 重複排除
- 最低限の型揃え

補足：
チャンク分解やテーマ統合そのものは、
共通 engine ではなく usecase 側で扱ってよい。

---

### 5.3 rule evaluation

- 最低条件チェック
- フォーマット検証
- 不正候補除外

---

### 5.4 helper scoring

- plan_link（候補）
- blocker（候補）
- quick_win（候補）
- dependency（候補）

※最終判断は行わない

---

### 5.5 placement preparation

- 配置候補生成
- 保存先候補提示
- 再配置候補生成

---

### 5.6 output generation

- 書き込み用 payload 生成
- 差分生成
- 変更候補提示

---

## 6. Usecase 定義

### 6.1 intake routing

目的：
未整理入力を構造化し、issue / design / future に振り分ける

特徴：
- 入力は非構造
- チャンク分解が必須
- 1テーマ1メモ生成を行う

#### intake routing フロー

```text
inbox / 関連入力読取
↓
チャンク分解
↓
テーマ統合
↓
1テーマ1メモ生成
↓
source_ref 付与
↓
保存先判定
↓
inbox 後処理
```

補足：
intake routing は、Flow Control の中でも
最も前処理色の強い usecase とする。

---

### 6.2 issue routing

目的：
issue を plan / operations / design / future へ送る

特徴：
- 中間状態の再配置
- 上位 / 下位への分岐
- issue 群や関連メモを再読して、判断単位を再構成する

#### issue routing フロー

```text
issue / 関連メモ群読取
↓
論点分解
↓
類似論点統合
↓
1テーマ1判断単位へ再構成
↓
行き先判定
  - plan
  - operations
  - design
  - future
  - archive
↓
反映
```

補足：
issue routing も、単純な一覧振り分けではなく、
必要に応じて issue 群を再編しながら送る usecase とする。

---

### 6.3 operations rolling

目的：
短期実行順を再生成し、active / next / issue に再配置する

特徴：
- 優先順位再構築
- 上位計画との接続
- 分解よりも評価 / 再配置が中心

#### operations rolling フロー

```text
候補読取
↓
重みづけ補助値生成
↓
ADAM による優先順位判断
↓
active / next / issue へ再配置
↓
review 返却候補生成
```

---

## 7. ADAM とプログラムの責務分離

### プログラム

- candidate collection
- normalization
- rule evaluation
- helper scoring
- placement preparation

### ADAM

- 意味理解
- 優先順位判断
- why_now 判断
- 例外処理
- 上位整合判断
- 最終配置決定

補足：
分解・統合を伴う usecase では、
プログラムが分解補助や候補提示を行い、
ADAM が最終統合と意味判断を行う。

---

## 8. service 構成方針

```text
src/services/flow-control/
  common.js
  collect.js
  normalize.js
  evaluate.js
  prepare-placement.js

src/services/flow-control/usecases/
  intake-routing.js
  issue-routing.js
  operations-rolling.js
```

### 役割

- `flow-control/`
  - 共通 engine

- `usecases/`
  - 用途別の再構成・判断補助・出力定義

---

## 9. 設計原則

- 共通処理は Flow Control に集約する
- 用途別ロジックは usecase に閉じる
- 判断は ADAM に寄せる
- ルールはプログラムに寄せる
- API は薄く保つ
- intake / issue routing の再構成性を失わない
- operations rolling の評価・再配置性を失わない

---

## 10. 今後の拡張

- スコアリングの定量化
- 自動候補抽出の強化
- review との連携強化
- flow-control の可視化
- chunk / theme 統合支援の追加
