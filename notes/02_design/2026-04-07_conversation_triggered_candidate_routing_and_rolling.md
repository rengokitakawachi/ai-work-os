# Conversation Triggered Candidate Routing and Rolling

## 目的

ADAM との会話中に新たな問題、設計論点、実行候補が発生したとき、
それを構造的に扱うための標準フローを定義する。

---

## 結論

会話中に新論点が発生した場合、以下のフローで扱う。

```text
会話で新論点発生
↓
candidate 抽出
↓
主分類判定
↓
派生出力判定
↓
（operations candidate がある場合）rolling 提案
↓
合意
↓
保存
↓
継続
```

---

## 主分類と派生出力

### 原則

- 分類は単一選択ではない
- 主分類を決めた上で、必要に応じて複数レイヤーへ展開する

---

## 主分類

以下から1つを主分類として選ぶ。

- issue
- design
- dev_memo
- operations candidate
- future candidate

---

## 派生出力

主分類とは別に、必要に応じて以下を追加生成してよい。

- issue
- design
- operations candidate
- future

---

## 分類ルール

### issue

何が問題かを保持する。

---

### design

どう解くかを構造化する。

---

### dev_memo

まだ固定しない観察と思考断片。

---

### operations candidate

rolling にかける実行候補。

重要:

operations candidate は終点ではない。
必要に応じて issue や design を並行して生成する。

---

### future candidate

今ではないが将来扱う可能性があるもの。

---

## 判断ロジック

ADAM は以下の順で判断する。

1. 主分類を決定する
2. 派生出力が必要かを判定する

### 例

#### パターン1

- 主: operations candidate
- 派生: なし

#### パターン2

- 主: issue
- 派生: operations candidate

#### パターン3

- 主: design
- 派生: operations candidate + issue

---

## operations candidate の扱い

operations candidate が存在する場合は必ず以下を行う。

1. candidate として提示する
2. why_now を明示する
3. source_ref を整理する
4. active / next / future の配置案を提示する
5. rolling 提案を行う

---

## 保存原則

### 合意前

- 候補として扱う
- 正本に書き込まない

### 合意後

- 各レイヤーへ保存する
- operations は rolling 結果を反映する

---

## 一文定義

会話起点の論点は、主分類と派生出力を分離して扱い、
必要に応じて複数レイヤーへ展開し、
operations candidate は rolling を経て正本へ反映する。
