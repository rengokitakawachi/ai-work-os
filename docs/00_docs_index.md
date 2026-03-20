# 00_docs_index.md

## 概要

本ファイルは、AI Work OS の docs 全体の構造と読取順序を定義する。

AI は本ファイルを入口として docs を読み、仕様理解を行う。

---

## docs の役割

docs は AI Work OS の正式仕様書であり、Single Source of Truth（SSOT）である。

仕様判断は常に docs を最優先とする。

---

## docs 構成

docs は以下の3つの領域で構成される。

プロダクト仕様  
開発基盤仕様  
運用仕様  

---

## ファイル一覧と役割

01_concept.md  
AI Work OS の目的、思想、価値を定義する  

02_architecture.md  
システム全体の構造、レイヤー、情報フローを定義する  

03_api_spec.md  
ユーザー向け機能 API の仕様を定義する  

04_data_model.md  
データ構造（Task、Project 等）を定義する  

05_roadmap.md  
開発フェーズと進行方針を定義する  

06_obsidian_design.md  
Obsidian 連携およびノート構造を定義する  

07_external_integration.md  
外部サービス連携（Todoist、GitHub 等）を定義する  

08_dev_config.md  
開発環境、ディレクトリ構成、環境変数を定義する  

09_troubleshooting.md  
過去の問題と再発防止策を記録する  

10_docs_dev_api.md  
docs 操作用 API（read / update）の仕様を定義する  

11_doc_style.md  
docs の記述ルールおよびフォーマットを定義する  

12_ai_update_policy.md  
AI の docs 更新ルールと制約を定義する  

13_dev_workflow.md  
AI と人間の開発手順を定義する  

16_governance.md  
統治ルールおよび禁止事項を定義する  

---

## AI の読取順序

AI は必ず次の順序で docs を読むこと。

1  
本ファイル（00_docs_index.md）  

2  
対象機能に関連する docs  

3  
開発基盤仕様  

08_dev_config.md  
10_docs_dev_api.md  

4  
ルール系ドキュメント  

11_doc_style.md  
12_ai_update_policy.md  
13_dev_workflow.md  
16_governance.md  

---

## Docs取得強制ルール

AI は docs を扱う際、必ず以下を実行する。

- 修正前に必ず API で docs を取得する  
- 対象 docs だけでなく関連 docs も取得する  
- 取得済み docs を明示する  
- docs 未取得の場合は処理を停止する  
- 11_doc_style.md を事前取得し準拠する  
- GitHub URL を直接参照しない  
- 「アクセスできない」と判断しない  

---

## Docs取得方法

ベースURL  

https://ai-work-os.vercel.app  

使用するAPI  

GET /api/docs  
docs一覧を取得する  

GET /api/docs-read?file=FILENAME  
指定ファイルの本文を取得する  

---

## 出力ルール

- 必ず全文出力する  
- コードブロック内で出力する  

---

## docs と notes の関係

docs は正式仕様である。

notes は検討メモ、設計草案、意思決定記録であり、SSOT ではない。

docs と notes が矛盾した場合は、docs を優先する。

---

## AI 行動ルール

AI は仕様に関する判断・修正を行う際、必ず以下を守る。

docs を API 経由で取得する  
docs を最優先の仕様として扱う  
推測で仕様を補完しない  
既存文章を維持する  
差分最小で修正する  

---

## 最重要原則

SSOT = GitHub docs  

Docs Driven Development  

仕様  
↓  
実装  
↓  
仕様更新  
