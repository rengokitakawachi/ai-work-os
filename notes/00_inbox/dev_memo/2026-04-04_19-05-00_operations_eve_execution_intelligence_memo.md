# 2026-04-04 Operations / EVE Execution Intelligence Memo

## 概要

本メモは、operations の位置づけ、7日ローリング運用、Outlook / Todoist / MindMeister / Obsidian との関係、および EVE の本質についてのディスカッションを記録する。

---

## 主要な結論

### 1. operations は短期実行順の正本

operations は単なるタスクリストではなく、短期実行順の正本とする。

operations は以下を兼ねる。

- 今すぐ進める短期実行順
- 1週間前後の実行計画
- daily / weekly review で継続更新される正本

### 2. operations は 7日ローリング計画を持つ

operations は schedule ではなく、日単位に分割された順序付きタスク群として扱う。

想定区分は以下とする。

- Day0（今日）
- Day1（明日）
- Day2
- Day3
- Day4
- Day5
- Day6

各日の中ではタスク順を持つが、時刻は持たない。

これは「いつ頃やるか」の仮配置であり、時間割ではない。

### 3. operations は rolling する

daily review では、

- Day0 の実績確認
- 未完了タスクの再配置
- Day1 以降の繰り上げ
- 新しい Day6 の補充

を行う。

weekly review では、

- 7日構成全体の再設計
- 優先順位の組み直し
- 大きな再構成
- archive 判定

を行う。

### 4. operations は schedule ではない

operations は日単位の実行計画であり、時刻配置された予定ではない。

役割分離は以下とする。

- operations = 何をいつ頃やるか
- Outlook = 何時から何時に行うか

### 5. Outlook 連携は EVE の中核

Outlook 連携が成立すると、

- 予定の隙間に応じて実行可能なタスクを当てはめる
- operations のタスクを Outlook 上の予定へ配置する
- 実行可能性を踏まえた現実的な計画にする

ことができる。

これは、

- operations = 意図
- Outlook = 制約

を組み合わせて実行可能な計画を生成する構造である。

### 6. Obsidian は実行インテリジェンスの長期記憶

EVE の本質はタスク管理ではなく、知識を蓄積しながら計画精度と実行精度を継続的に高める知的実行支援にある。

Obsidian には、以下のような実行知を蓄積する。

- タスクの重要度
- 想定所要時間
- 実績時間
- 着手しやすさ / 重さ
- 集中度
- 分割しやすさ
- 時間帯との相性
- 失敗パターン / 成功パターン

この蓄積により、EVE は

- どのタスクがどの空き時間に合うか
- 見積が甘いタスクは何か
- どの時間帯に何を置くと成功しやすいか

を学習的に支援できる。

### 7. EVE の本質

EVE は単なる秘書ではなく、実行のための学習するインテリジェンスと整理する。

流れは以下とする。

- plan
- operations（7日ローリング）
- Outlook 制約との接続
- 実行
- 結果を Obsidian に蓄積
- 次回計画の改善

### 8. Todoist と MindMeister は operations の view

operations を正本とし、外部ツールは view / projection として扱う。

役割分離は以下とする。

- operations = 正本
- Todoist = execution view + 操作UI
- MindMeister = structure / strategy view

Todoist は操作可能だが正本ではない。

MindMeister は構造把握と俯瞰のための補助 view とする。

### 9. operations の発生源

operations の発生源は以下とする。

- plan
- issue
- adam
- review

補足すると、

- plan = 中期計画から落ちる短期実行項目
- issue = 直ちに着手すべき課題
- adam = 会話の中で新たに確定した短期実行項目
- review = daily / weekly review による再構成結果

### 10. operations に入る条件

会話上で出た論点がそのまま operations に入るのではなく、以下を満たすもののみを operations に入れる。

- 今すぐ進める短期実行対象である
- 実行順を持つ
- 7日内に配置する価値がある

operations に入らない論点は、issue / design / dev_memo / future に振り分ける。

---

## 全体構造

全体構造は以下のように整理できる。

- roadmap = 上位方針
- plan = 中期テーマ
- operations = 7日ローリングの短期実行計画
- Outlook = 時刻配置された予定の正本
- Obsidian = 実行知の蓄積層
- Todoist = execution view
- MindMeister = structure / strategy view
- EVE = これらを統合し、計画と実行を支援する知能

---

## 今後の設計反映先

- notes/02_design/2026-04-04_operations_active_archive_model_light_draft.md
- notes/02_design/2026-04-03_plan_layer_operating_spec.md
- notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md
- docs/05_roadmap.md
- docs/15_notes_system.md
- EVE 側の instruction / operating model

---

## メモ

今回の議論により、operations は単なる短期タスク列ではなく、EVE の実行知能を支える中核レイヤーとして扱うべきことが明確になった。

特に重要なのは以下である。

- operations は 7日ローリング計画を持つ
- operations は schedule ではない
- Outlook は現実制約として連携する
- Obsidian は実行インテリジェンスを蓄積する
- Todoist / MindMeister は operations の view として扱う
- EVE の本質は、知識蓄積を通じて計画実行精度を高めることにある
