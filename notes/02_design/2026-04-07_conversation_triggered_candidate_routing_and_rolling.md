# Conversation Triggered Candidate Routing and Rolling

## 目的

ADAM との会話中に新たな課題・設計論点・実行候補が発生したとき、
それを notes システムの構造に沿って一貫して扱うための標準フローを定義する。

---

## 結論

会話起点の論点は、原則として issue として受ける。

そのうえで、必要に応じて以下を派生生成する。

- operations candidate（実行単位）
- dev_memo（詳細記録）
- design（解決策の構造化）
- future（時間軸的に後回し）

---

## 全体フロー

```text
会話
↓
論点抽出
↓
issue として課題定義
↓
派生出力判定
  - operations candidate
  - dev_memo
  - design
  - future
↓
（operations candidate がある場合）rolling 提案
↓
提案提示（未保存）
↓
合意
↓
保存（複数レイヤー）
```

---

## issue（主入口）

### 定義

会話から抽出された「何が問題か」「何を課題として扱うか」を保持する。

### 原則

- 会話起点の新論点は、原則 issue として受ける
- 曖昧な段階でも issue として保持する
- いきなり design や operations に直接落とさない

---

## 派生出力

issue を起点として、以下を必要に応じて生成する。

---

### operations candidate

#### 定義

短期実行順へ接続可能な実行単位。

#### 生成条件

- 実行可能粒度である
- 明確な対象がある
- 1セッションで進められる

#### 原則

- operations は起点ではなく issue から派生する
- operations candidate は rolling に接続される

---

### dev_memo

#### 定義

詳細に記録して残すべき観察・思考・判断材料。

#### 生成条件

- 後で参照価値がある
- 即時構造化しないが消すべきではない
- 比較・迷い・仮説が含まれる

#### 原則

- issue / design を補助するレイヤーとして扱う
- 正本ではない

---

### design

#### 定義

issue に対する解決策を構造化したもの。

#### 特性

- docs に通じる仕様草案である
- 責務・構造・ルールを持つ

#### 生成条件

- 解決策が構造として整理されている
- 再利用可能な形で説明できる

#### 原則

- design は乱発しない
- issue を経由して昇格する

---

### future

#### 定義

現時点では扱わないが、将来扱う可能性があるもの。

#### 条件

- 今は優先度が低い
- 前提条件が未整備
- phase が異なる

---

## operations 接続

operations candidate がある場合、必ず以下を行う。

```text
- task 明示
- source_ref 設定（会話起点）
- why_now 明示
- placement 案提示（active / next / future）
- rolling 提案
```

---

## 提案フェーズ（未保存）

### 原則

- この段階では正本に書き込まない
- すべて候補として提示する

### 提案フォーマット

```text
[issue]
- xxx

[派生出力]
- operations:
- dev_memo:
- design:
- future:

[operations提案]
- task:
- why_now:
- placement:
```

---

## 保存ルール

### 合意前

- 保存しない
- 候補として扱う

### 合意後

以下の順で保存する。

```text
1. issue
2. design（ある場合）
3. operations（rolling 反映）
4. dev_memo（必要に応じて）
5. future（必要に応じて）
```

---

## source_ref

```text
type: conversation
thread_id: xxx
message_range: xxx
```

---

## 他usecaseとの関係

| usecase | 役割 |
|--------|------|
| intake routing | 未整理入力の構造化 |
| issue routing | issue の再配置 |
| conversation routing | 新規論点の生成 |

---

## 一文定義

会話起点の論点は原則 issue として受け、そこから operations / dev_memo / design / future を派生生成し、operations は rolling を経て短期実行順へ接続する。
