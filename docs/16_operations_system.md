# 16 Operations System

## 目的

operations を短期実行計画の正本として定義し、
AI Work OS における実行層の基盤を確立する。

---

## 位置づけ

- roadmap は上位方針
- plan は中期計画
- operations は短期実行計画

operations は「今何をやるか」を決定する正本とする。

---

## 基本原則

- operations は短期実行順の正本とする
- operations は 7日ローリング計画を持つ
- operations は schedule ではない
- future に operations は置かない
- archive は週次見直しの中で判断する

---

## 構造

operations は以下の構造を持つ。

- active_operations（正本）
- standby_operations（退避）

---

## active_operations

active_operations は短期実行順の正本とする。

### 7日ローリングモデル

active_operations は以下の構造を持つ。

- Day0（今日）
- Day1（明日）
- Day2
- Day3
- Day4
- Day5
- Day6

### ルール

- 各 Day はタスク順序を持つ
- 時刻は持たない
- 仮配置であり、確定スケジュールではない

---

## ローリング更新

### daily review

- Day0 の実績確認
- 未完了タスクの再配置
- Day1 以降の繰り上げ
- 新しい Day6 の補充
- 溢れたタスクは standby に移動

### weekly review

- 7日構成の再設計
- 優先順位の再構築
- standby の再評価
- archive 判定

---

## standby_operations

目的

7日ローリングから一時的に外れたタスクを退避する。

### ルール

- active_operations から溢れたタスクを格納する
- 7日内に収まらないタスクを格納する
- daily / weekly review で再評価する
- Day6 の候補プールとして扱う
- future とは区別する

---

## archive

archive は履歴用途に限定する。

### 判定

weekly review にて以下を満たす場合に archive とする。

- 構造が大きく変わる
- phase / plan が切り替わる
- 履歴として残す価値がある

---

## operations と schedule の分離

operations はスケジュールではない。

- operations = 何をいつ頃やるか（順序）
- schedule = 何時から何時に行うか（時間）

この分離を維持する。

---

## 判断

- operations は短期実行計画の正本とする
- 7日ローリングにより柔軟な運用を実現する
- standby により溢れを吸収する
