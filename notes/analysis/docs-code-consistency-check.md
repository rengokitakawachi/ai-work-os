# docs-code-consistency-check

## 概要

AI Work OS における docs と code の整合性チェック結果を記録する。

---

## 結論

全体として高い整合性が保たれている（約85〜90%）。

致命的不整合は存在しないが、いくつかの軽微〜中程度のズレが確認された。

---

## 整合している点

### API設計

- APIは薄く、service層にロジック集中
- routing / validation / dispatch の分離が明確

### resource分離

- docs：read only
- notes：read / create / update
- code：read / create / update

### エラー構造

- code / category / step / retryable / details / request_id
- createError / normalizeError により統一

### フロー整合

- validation → dispatch → service → normalize

---

## 軽微なズレ

### 1. repo-resource統合状態

- docs：統合予定
- code：実質統合済み

#### 問題

仕様と実装のフェーズ定義にズレ

#### 対応案

- docsを統合済みに更新
- または現状を明示

---

### 2. docs更新禁止の明示不足

- code上はPOSTでdocs操作不可
- ただし明示的な禁止ガードなし

#### リスク

将来の変更でdocs更新が混入する可能性

#### 対応案

- validatePostでdocsを明示的に拒否

---

### 3. path検証の責務

- docs：厳格なパス制約あり
- code：service層依存

#### 問題

handler層で保証されていない

#### 対応案

- docsに責務明記
- またはhandlerで簡易チェック追加

---

## 中程度のズレ

### 1. docs更新フローの実装未反映

- docs：notes/design経由必須
- code：構造強制なし

#### 対応案

- notes APIにディレクトリ制約

---

### 2. request_id伝播

- handlerでは生成
- service層には未伝播

#### リスク

トレーサビリティ低下

#### 対応案

- service層へrequest_id伝播

---

### 3. repo-resourceの未完成部分

未実装：

- diff取得
- index/search
- semantic検索

#### 状態

仕様Phase通り未実装

---

## 優先度

### 高

- repo-resource統合状態のdocs更新
- docs POST禁止の明示

### 中

- path検証責務の明確化
- request_id伝播

### 低

- notes構造強制
- 将来Phase明文化

---

## 本質

AI Work OS は設計と実装の整合性が非常に高い。

ズレは主に以下の2種類：

- フェーズズレ（仕様が遅れている）
- ガード不足（将来リスク）

---

## 次アクション候補

- docs修正案作成
- 実装改善パッチ
- 自動整合チェック設計
