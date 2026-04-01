# Classification and Routing Specification

## 目的

インテークレビューにおける一次判定と、
各要素の保存先・フローを定義する。

入力から保存・実行までの流れを決定論的にし、
判断のブレを排除する。

---

## 一次判定

すべてのチャンクは以下のいずれかに分類する。

- knowledge
- issue
- task
- hold

---

## 全体マッピング

knowledge → notes/knowledge  
issue → notes/issues  
task → operations（条件付き issue 経由）  
hold → future  

---

## knowledge

### 定義

再利用価値のある知識・ノウハウ。

- 問題ではない
- 実行対象ではない
- 将来参照価値がある

---

### 保存先

notes/knowledge/

---

### 特徴

- テーマ単位で整理される
- source_ref を保持する
- 入力種別（web / dev_memo）は持たない

---

### フロー

inbox  
↓  
intake review  
↓  
knowledge  

必要に応じて

knowledge  
↓  
design  
↓  
docs  

---

### ルール

- フォルダはテーマベースで構成する
- source_ref で出自を管理する
- 昇格は必須ではない

---

## issue

### 定義

解決・設計・判断が必要な課題。

---

### 保存先

notes/issues/

---

### フロー

issue  
↓  
design  
↓  
operations  

---

### 特徴

- 問題中心
- 解決対象
- フローの起点

---

## task

### 定義

実行可能な作業単位。

---

### 分類

#### 軽量タスク

- 文脈不要
- 即実行可能

→ operations 直

---

#### 文脈依存タスク

- 背景・理由が必要
- 判断が伴う

→ issue  
  ↓  
  operations（ref付き）

---

### 判定ルール

以下を満たす場合は issue を介する。

- 説明が1行で収まらない
- なぜやるかが必要
- 分岐がある
- 再利用される可能性がある

---

## hold

### 定義

現時点では着手しない対象。

---

### 保存先

future/

---

### 特徴

- 今はやらない
- 再評価前提

---

### フロー

hold  
↓  
future  

再活性化時:

future  
↓  
intake review（再実行）  
↓  
issue / design / operations  

---

### ルール

- 直接 active に戻さない
- 必ず再インテークする

---

## 判定フロー

1. 問題か  
  → yes: issue  

2. 実行可能か  
  → yes: task  

3. 今やるか  
  → no: hold  

4. 上記に当てはまらない  
  → knowledge  

---

## 設計原則

- 分類と保存先は1対1で対応させる
- フローは必ず一方向に流す
- レイヤーを混在させない
- source_ref により出自を担保する

---

## 補足

### knowledge の位置づけ

- docs の前段階
- 思考資産
- Obsidian 連携の基盤

---

### task と issue の関係

- task は実行
- issue は文脈と問題

---

### hold と future の関係

- hold は状態
- future は保存先
