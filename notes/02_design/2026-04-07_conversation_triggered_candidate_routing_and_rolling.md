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

また、保存前には必ず粒度調整と提案提示を行い、
operations candidate がある場合は rolling 提案まで行う。

---

## 全体フロー

```text
会話
↓
論点抽出
↓
論点分解 / 統合
↓
issue として課題定義
↓
派生出力判定
  - operations candidate
  - dev_memo
  - design
  - future
↓
粒度調整
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

### 粒度ルール

issue は原則として 1論点1issue とする。

ここでいう 1論点とは、以下が 1つにまとまっている単位を指す。

- 問題の主語
- 問題の性質
- 影響対象
- 期待する判断単位

以下の場合は issue を分割する。

- 問題の主語が異なる
- 解決責務が異なる
- 影響範囲が大きく異なる
- 別々に優先順位判断した方がよい

以下の場合は 1issue に統合してよい。

- 同じ問題の言い換え
- 同一原因の派生症状
- 同じ判断で同時に扱うべき論点

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

#### 粒度ルール

operations candidate は 1 task = 1つの明確な作業単位とする。

以下の場合は分割する。

- 読む / 書く / 決める が混在している
- 保存先が複数で、別々に完了判定すべき
- issue 整理と design 更新が同居している
- 1セッションで終わらない

以下は許容する。

- 同じ成果物を作るための連続作業
- 1回のセッションで自然に完了できる小さな連結作業

#### 原則

- operations は起点ではなく issue から派生する
- operations candidate は rolling に接続される
- 実行より整理が先なら、operations 化を急がない

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
- issue や design に入れるにはまだ粗い材料を残す

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
- 個別ケースではなく、運用ルールや設計原則として残す価値がある

#### 原則

- design は乱発しない
- issue を経由して昇格する
- 単なる感想や単発判断では作らない

---

### future

#### 定義

現時点では扱わないが、将来扱う可能性があるもの。

#### 条件

- 今は優先度が低い
- 前提条件が未整備
- phase が異なる
- 直ちに issue / operations / design に落とすと premature になる

---

## 粒度調整

提案前に、ADAM は以下を確認する。

- issue が大きすぎないか
- operations candidate が粗すぎないか
- design 化にはまだ早すぎないか
- dev_memo で残す方が自然ではないか
- future へ送るべきものが混ざっていないか

この段階では、分解・統合・保留を行ってよい。

---

## operations 接続

operations candidate がある場合、必ず以下を行う。

- task 明示
- source_ref 設定（会話起点）
- why_now 明示
- placement 案提示（active / next / future）
- rolling 提案

### placement ルール

#### active 提案

以下を満たす場合に提案対象とする。

- 今週の重点に接続する
- ブロッカー解消度が高い
- 今やる理由が明確
- 粒度が小さく、着手障壁が低い

#### next 提案

以下の場合に提案対象とする。

- 重要だが active の上位には入らない
- 近いうちに扱う前提がある
- active の前提として待機させるのが自然

#### future 提案

以下の場合に提案対象とする。

- 今の phase では早い
- 前提条件待ち
- 実行粒度にまだ落ちない

---

## 提案フェーズ（未保存）

### 原則

- この段階では正本に書き込まない
- すべて候補として提示する
- 保存前に issue / operations / design の粒度を確認する

### 提案フォーマット

```text
[issue]
- title:
- description:
- why_issue:
- source_ref:

[派生出力]
- operations: yes / no
- dev_memo: yes / no
- design: yes / no
- future: yes / no

[operations提案]
- task:
- why_now:
- placement:
- source_ref:

[補足]
- split_needed:
- memo_reason:
- design_reason:
- future_reason:
```

---

## source_ref

### 基本形

```text
type: conversation
thread_id: xxx
message_range: xxx
```

### 粒度ルール

#### message_range を使う場合

- 数メッセージをまとめて 1論点として扱う
- 論点が会話往復の中で形成された
- 単一メッセージでは意味が閉じない

#### message_id 単位を使ってよい場合

- 単発の明確な指示
- 単一メッセージで issue が成立する
- operations candidate がその場で閉じている

#### chunk を内部補助として使ってよい場合

- 長文内に複数論点がある
- 1メッセージを分解しないと 1論点1issue にできない

ただし、保存時の source_ref は人間が再読可能な形を優先する。

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

保存前に粒度再確認を行い、
1論点1issue と 1task1作業単位を満たしていない場合は先に分解する。

---

## 他usecaseとの関係

| usecase | 役割 |
|--------|------|
| intake routing | 未整理入力の構造化 |
| issue routing | issue の再配置 |
| conversation routing | 新規論点の生成 |

---

## 一文定義

会話起点の論点は原則 issue として受け、粒度調整のうえで operations / dev_memo / design / future を派生生成し、operations は rolling を経て短期実行順へ接続する。
