# Operations Rolling Gap and Direction Memo

## 概要

現行の operations（7日ローリング）は器としては成立しているが、
生成規律と優先順位づけが弱く、実態として「適当に埋めている」感覚が発生している。

本メモでは、そのギャップと今後の方向性を整理する。

---

## 現状の問題

### 1. 生成規律の欠如

- 何を候補として抽出するかが曖昧
- operations 化の条件が弱い
- active / next / issue の配置基準が不明確

結果として、

- 空きを埋める行為に近くなる

---

### 2. 上位接続の弱さ

本来の構造：

roadmap → plan → operations

しかし現状は：

- operations が plan から自然に落ちてきている感覚が弱い

---

### 3. 下位からの返却が弱い

- operations の実行結果が plan / roadmap に返っていない
- 観測点として機能していない

---

### 4. 入力反映の弱さ

- issue
- dev_memo
- 直近会話

これらが優先順位付きで operations に反映されていない

---

## 重要な再定義

operations は以下とする。

- 上位計画を短期実行へ落とす
- 実行結果を上位へ返す

つまり、

「下位実行層」ではなく
「往復接続層」

---

## 案件分類の整理

A / B / C は優先順位ではなく性質分類

- A: plan / roadmap 直結
- B: 支援 / 前提整備
- C: 保留・将来・低優先候補

ただし配置はこれで決めない

---

## 配置の原則

active / next / issue は重みづけで決める

観点：

- plan_link（上位への効き）
- blocker（後続解消）
- quick_win（短期完了性）
- dependency（依存）
- why_now（今やる理由）

C案件でも条件を満たせば active / next に入る

---

## 今後の設計論点

- operations の生成源定義
- operations 化条件
- 優先順位づけアルゴリズム
- active / next 配置条件
- review への返却ルール

---

## 方向性

operations を

「並べるもの」から
「生成されるもの」へ

進化させる

---

## 一文定義

operations = 上位計画を実行に落とし、実行結果で上位を更新する短期実行正本
