# AI Work OS 推奨方向性と優先順位ロードマップ

## 目的

AI Work OS の現行 docs 全体を前提に、
現時点で最も整合的な進行方向と優先順位を整理する。

本メモは docs 直前の設計草案ではなく、
方向性判断のための design レイヤー整理である。

---

## 前提

今回の判断は以下の docs を根拠に行う。

- 00_docs_index.md
- 01_concept.md
- 02_architecture.md
- 03_api_spec.md
- 04_data_model.md
- 05_roadmap.md
- 06_obsidian_design.md
- 07_external_integration.md
- 08_dev_config.md
- 09_troubleshooting.md
- 10_repo_resource_api.md
- 11_doc_style.md
- 12_ai_update_policy.md
- 13_dev_workflow.md
- 14_repo_knowledge_architecture.md
- 15_notes_system.md
- 16_governance.md
- README.md

---

## 結論

現時点で最も良い方向性は、
AI Work OS を「個別業務の自動化ツール群」より先に、
「docs を根拠に repo を読み、notes/design を介して安全に進化できる AI 開発 OS」へ寄せることである。

つまり主軸は以下とする。

- SSOT = docs を中心にする
- repo-resource を統合 Access Layer として整備する
- notes/design を仕様草案レイヤーとして実運用する
- code read を整備し、docs と code のズレを検出できるようにする
- その後に Knowledge Integration と外部自動化を広げる

---

## 判断理由

### 1. concept と architecture の中心は思考支援である

01_concept.md では、
AI Work OS は知識、戦略、実行、レビューを統合する思考パートナー型システムとして定義されている。

02_architecture.md でも、
AI Layer は思考整理と意思決定支援であり、
Knowledge Layer と Execution Layer を分離している。

このため、単なる API 自動化の集合より、
根拠ベースで知識と仕様を扱える基盤を優先する方が概念と整合する。

---

### 2. docs 群の重心は repo access と統治にある

10_repo_resource_api.md
12_ai_update_policy.md
13_dev_workflow.md
16_governance.md
を通して読むと、
現行 docs は以下を強く要求している。

- docs を API 経由で読む
- docs を SSOT とする
- notes/design を docs 直前レイヤーとする
- code は docs に従属する
- AI は repo を根拠付きで読む
- 更新は人間判断で行う

この構造では、最優先の未完成部分は repo-resource 基盤である。

---

### 3. roadmap の次フェーズも基盤拡張を前提にしている

05_roadmap.md では、
Phase 2 は Knowledge Integration、
Phase 3 は Analysis & Optimization とされている。

ただし、それらを成立させる前提は
10_repo_resource_api.md と 14_repo_knowledge_architecture.md に書かれている access / read / index / search の整備である。

つまり、ロードマップ上も先に整えるべきは repo を安全に読める基盤である。

---

### 4. notes system と dev workflow が方向性を固定している

15_notes_system.md と 13_dev_workflow.md では、
以下の流れが明示されている。

notes/inbox
↓
notes/exploration
↓
notes/design
↓
docs
↓
code

この流れを実運用化する方が、
外部連携を増やすより先にやるべき仕事として自然である。

---

## 推奨しない主軸

現時点では以下を主軸にしない方がよい。

### 1. 外部連携の横展開を先行すること

Outlook
Teams
kintone
GAS
MCP
Actions

これらは重要だが、07_external_integration.md 上では周辺連携であり、
中核基盤ではない。

ここを先行すると、
便利機能は増えるが、
仕様根拠と統治が追いつかず、
AI Work OS が「便利 API 集」に崩れる可能性が高い。

### 2. いきなり code update まで自動化すること

現行 docs では、
code は従属レイヤーであり、
まず read と整合確認が優先されている。

したがって、
code 自動更新は後段に置くべきである。

---

## 推奨優先順位

## Priority 1

### repo-resource 基盤の完成

#### 目的

docs / notes / code を一貫した access model で扱えるようにする。

#### 具体項目

- notes update API の整備
- code tree API の整備
- code read API の整備
- docs access と repo-resource の命名整理
- request_id, error.category, retryable を含む構造化エラーの統一
- path validation と resource boundary の固定

#### 成果

- AI が docs だけでなく notes / code も根拠付きで読める
- 設計草案と実装の往復が可能になる
- 後続機能の土台ができる

---

## Priority 2

### notes/design 運用の固定化

#### 目的

仕様変更と機能追加を、会話ではなく design レイヤーで扱う運用に寄せる。

#### 具体項目

- design note のテンプレート定義
- exploration から design へ昇格する判断基準の明文化
- decisions の使い分けルール整理
- dev-backlog との接続ルール整理

#### 成果

- docs 直前の草案レイヤーが安定する
- AI の提案が会話で流れず、設計資産として残る
- 人間レビューの対象が明確になる

---

## Priority 3

### docs と code のズレ検出

#### 目的

AI Work OS を「仕様を読む」だけでなく、
「仕様と実装の差分を見つけられる」状態へ進める。

#### 具体項目

- code read を使った関連コード取得
- docs と code の対応表の整備
- 差分検出の観点整理
  - 命名差分
  - endpoint 差分
  - request / response 差分
  - error schema 差分
- notes/design への差分整理フロー確立

#### 成果

- 14_repo_knowledge_architecture.md の方向に合流できる
- 根拠ベース回答が可能になる
- AI 開発コントローラーとしての価値が出る

---

## Priority 4

### Knowledge Integration の実装

#### 目的

Obsidian / GitHub を AI の知識基盤として活用し、
知識 → 戦略 → 実行 の流れを強める。

#### 具体項目

- note save フロー整備
- Meeting → Task 抽出
- AI 対話ログ → Knowledge 化
- MOC 接続
- 知識検索の基礎整備

#### 成果

- 06_obsidian_design.md と 05_roadmap.md の Phase 2 が前進する
- タスク管理と知識管理が分断されなくなる

---

## Priority 5

### 外部自動化の拡張

#### 目的

基盤完成後に、外部サービス連携を安全に広げる。

#### 具体項目

- Outlook read 連携
- Teams 通知
- kintone 同期プロトコル
- 必要に応じて GAS / Actions / MCP 連携

#### 成果

- 実務効率は上がる
- ただし中核価値は repo / docs / notes / code 基盤の上に載る形になる

---

## 実装順の推奨

### Step 1

repo-resource の notes update を整備する

### Step 2

code tree / read を整備する

### Step 3

design レイヤーのテンプレートと運用ルールを整備する

### Step 4

docs と code の差分検出を小さく始める

### Step 5

Knowledge Integration を限定ユースケースで導入する

### Step 6

外部連携を段階追加する

---

## 最初の 3 つの具体タスク

### Task 1

repo-resource における code tree / read の仕様確定

### Task 2

notes/design の標準テンプレート作成

### Task 3

1つの docs を対象にした docs vs code 差分検出の試行

---

## 判断基準

今後の優先順位判断は以下で行う。

- docs 全体と整合しているか
- SSOT 運用を強めるか
- notes/design を活かせるか
- code との整合確認に寄与するか
- 単なる便利機能追加に留まっていないか

---

## 結論の要約

AI Work OS の現時点の最適方向は、
外部業務の自動化ハブ化ではなく、
仕様根拠を持って repo を読める AI 開発 OS 化である。

最優先は以下の順で進める。

- repo-resource 基盤
- notes/design 運用
- docs / code 差分検出
- Knowledge Integration
- 外部自動化

この順なら、現行 docs の思想、統治、ロードマップ、知識設計のすべてと整合する。