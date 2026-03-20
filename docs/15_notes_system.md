# 15 Notes System

## 目的

未確定情報を管理し
docsへの昇格を制御する

---

## 位置づけ

notesは思考レイヤー

SSOTではない

---

## 基本原則

1
notesは正本ではない

2
未確定情報はnotesへ書く

3
いきなりdocsを書かない

4
docs更新前にdesignを経由

5
意思決定はdecisionsに残す

---

## ディレクトリ構成

notes/
README.md
inbox/
exploration/
design/
decisions/
backlog/
logs/

---

## 各ディレクトリの役割

### inbox

未整理メモ

---

### exploration

調査・論点整理

---

### design

仕様草案
docs直前

---

### decisions

意思決定ログ

---

### backlog

次アクション管理

---

### logs

実装ログ
失敗記録

---

## 最重要ファイル

notes/backlog/dev-backlog.md

---

## dev-backlog構造

・Candidate Tasks
・Ready Next
・Blocked
・Decisions Needed
・Later

---

## 昇格ルール

以下を満たした場合のみ
notes → docs

・目的が明確
・責務が明確
・命名が確定
・例外が見えている
・実装方針が合意されている
