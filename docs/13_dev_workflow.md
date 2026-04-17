# docs/13_dev_workflow.md

# 13 Dev Workflow

## 目的

本ドキュメントは、AI Work OS における開発フローおよび人と AI の役割分担を定義する。

本ワークフローに従うことで、仕様と実装の整合性を維持する。

---

## 前提 / 定義

開発は Docs Driven Development に基づいて行う。

仕様（docs）を起点とし、実装と更新を循環させる。

docs は SSOT である。

notes は検討メモであり、SSOT ではない。

operations は短期実行順の正本である。

handover は再開入口であり、execution 正本ではない。

reports は review の結果を保存する成果物である。

docs の更新は人間の判断を前提とする。

---

## 基本原則

- docs を最優先の仕様とする
- 実装は docs に従う
- notes → docs → code の順で確定する
- 更新は差分最小で行う
- 未確定事項は docs に書かない
- docs 更新は notes/design を経由する
- routing と review を混同しない
- execution 正本は operations とする

---

## 処理（フロー）

### 全体フロー

課題の発見  
↓  
notes に記録  
↓  
設計整理（notes/design）  
↓  
intake routing / issue routing / design routing  
↓  
operations rolling  
↓  
execution（operations）  
↓  
review  
↓  
docs に反映（人間判断）  
↓  
実装  
↓  
docs 更新（必要な場合・人間判断）  

---

### フェーズ定義

#### 1 課題の発見

機能追加、改善、バグなどの課題を認識する。

---

#### 2 notes への記録

課題やアイデアを notes に記録する。

未整理の内容は 00_inbox に格納する。

---

#### 3 設計整理

notes/design にて仕様案を整理する。

必要に応じて notes/decisions に意思決定を記録する。

---

#### 4 routing

未整理入力や issue や design を構造化し、
適切なレイヤーへ送る。

- intake routing
  - 未整理入力を issue / design / future / archive へ振り分ける

- issue routing
  - issue を operations / design / future / archive / issue へ再配置する

- design routing
  - design を docs / design / future / archive / operations candidate へ再配置する

routing は保存先判定と初期処理を担う。

routing は review の代替ではない。

---

#### 5 operations rolling

複数の流入元から候補を収集し、
短期実行順を生成する。

operations rolling の最小責務は以下とする。

- candidate collection
- normalization
- rule evaluation
- ranking
- placement

この結果として、
active_operations / next_operations / archive_operations を更新する。

---

#### 6 execution

実行は operations に基づいて行う。

execution 正本は active_operations とする。

会話中の実行は、
active に入っている task を前提とする。

---

#### 7 review

review は進行中資産の見直しと更新を担う。

- daily review
  - 当日の実績確認
  - 完了 task の archive 移動
  - 未完了 task の繰越判断
  - 明日の実行順調整
  - operations 更新
  - daily report 保存

- weekly review
  - roadmap / plan / operations / future の整合確認
  - 次週方針の整理
  - weekly report 保存

- monthly review
  - roadmap / phase / plan 群の見直し
  - design layer の棚卸し
  - design routing 対象の抽出
  - monthly report 保存

report は review の結果物であり、
保存だけでは review 完了とはみなさない。

---

#### 8 docs への反映

仕様が確定した内容のみ docs に反映する。

docs は SSOT である。

反映は人間の判断で行う。

---

#### 9 実装

docs に基づいて実装を行う。

実装は docs と整合している必要がある。

---

#### 10 docs 更新

実装後に docs と差異があれば修正する。

修正は notes/design を経由し、人間が最終判断する。

更新は差分最小で行う。

---

### docs 修正フロー（必須）

docs 修正時は必ず以下の手順で行う。

1  
GET /api/docs により docs 一覧を取得  

2  
対象 docs を /api/docs-read で取得  

3  
関連 docs を取得  

4  
差分確認  

5  
修正案生成  

6  
notes/design に整理  

7  
実装・運用差分を確認する  

8  
人間レビュー  

9  
docs 反映  

---

## AI の役割

AI は以下を担当する。

- docs の読取
- 仕様理解
- 差分検出
- 修正案の生成
- notes/design への整理
- routing / review / operations の境界整理

---

## 人間の役割

人間は以下を担当する。

- 意思決定
- 最終判断
- docs 反映
- 実装の実行
- 外部環境の操作

---

## ルール（制約・禁止事項）

### Docs取得ルール

- docs は必ず API 経由で取得する
- docs は本文を直接確認する
- 過去の会話で代替しない
- 不明な場合は再取得する

---

### 停止条件

- docs 未取得の場合は修正出力を行ってはならない
- 取得済み docs を明示していない場合は処理を停止する

---

### 出力ルール

- 必ず全文出力する
- 部分出力は禁止する
- コードブロック内で出力する
- コードブロックのネストは禁止する

---

## notes と docs の関係

notes は検討メモであり、SSOT ではない。

docs は正式仕様である。

notes の内容を docs に反映する場合は、仕様として確定している必要がある。

notes/design を docs 直前の草案レイヤーとする。

---

## 更新原則

更新は小さく行う。

一度に大きな変更を行わない。

常に整合性を維持する。

---

## 最重要原則

SSOT = GitHub docs  

Docs Driven Development  

仕様  
↓  
実装  
↓  
仕様更新
