# 16_governance.md

## 目的

AI Work OS の一貫性を維持する。

docs を SSOT とした統治ルールを定義し、仕様逸脱を防止する。

---

## 前提 / 定義

docs は正式仕様（SSOT）である。

notes は検討メモであり、正本ではない。

code は docs に従属する。

docs の更新は人間の判断を前提とする。

AI は docs を直接更新しない。

---

## 基本原則

- SSOT は docs のみ
- 実装は docs に従う
- AI は必ず docs を先に読む
- docs 更新は差分最小で行う
- notes は補助レイヤーとして扱う
- docs 更新は notes/design を経由する

---

## 処理（フロー）

### 更新順序

notes  
→ docs  
→ code  

---

### AI更新フロー

1 docs 一覧取得  
2 docs 本文取得  
3 notes 確認  
4 不整合検出  
5 修正案生成  
6 notes/design に整理  
7 人間レビュー  
8 docs 反映  

---

## ルール（制約・禁止事項）

### AI更新ルール

- docs は必ず API 経由で取得する
- docs は /api/docs-read により本文取得する
- 取得済み docs を明示する
- 11_doc_style.md を事前に取得する
- 未取得状態では処理を停止する
- docs 修正案は notes/design に記録する

---

### 禁止事項

- docs を API から直接更新する
- docs 未取得での修正
- docs 未取得での出力
- 「アクセスできない」と判断する
- 推測による補完
- 部分出力
- 省略記述
- 疑似コード
- コードブロック外の出力
- コードブロックのネスト
- notes を正本として扱う
- 大規模な一括書き換え

---

## 設計方針

- API は薄くする
- ロジックは service 層に集約する
- 責務分離を徹底する
- resource ごとに権限を分離する

---

## 判断基準

- 迷った場合は docs を再取得する
- 会話ではなく docs を優先する
- docs と notes が矛盾する場合は docs を正とする

---

## 補足

本ルールは、AI が docs 未取得状態で仕様判断を行うことを防ぐための最終防衛ラインである。

10_docs_dev_api.md、13_dev_workflow.md と連動し、取得・手順・統治の三層で整合性を担保する。

docs の修正は以下を前提とする。

- AI は修正案を生成する
- notes/design に草案を蓄積する
- 人間が最終判断する

これにより SSOT の安定性と変更の安全性を維持する。
