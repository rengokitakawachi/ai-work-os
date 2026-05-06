# 2026-04_phase1_teams_and_obsidian_light_use

## phase

Phase 1: Prototype / MVP

## 位置づけ

Phase 1 の foundation plan、
schedule proposal plan に続く補助系 plan。

本 plan では、
Teams をプロジェクトメンバーへの通知チャネルとして扱い、
Obsidian を本格連携前の限定利用レイヤーとして扱う。

EVE の最小実行系を支える周辺レイヤーを軽量に成立させることを目的とする。

---

## 目的

Teams への通知導線と、
Obsidian の限定的な活用導線を整え、
Phase 1 の MVP を支える補助機能を成立させる。

---

## 背景

Phase 1 の中核は、
Todoist、Outlook、スケジュール案提示、Outlook 書き込みである。

一方で、
運用に入るためには
関係者への通知と、
軽い知識蓄積・参照の導線もある程度必要になる。

ただし、
Teams も Obsidian も
この時点で本格統合まで進める必要はない。

そのため、
本 plan では
Teams を通知チャネルとして、
Obsidian を限定利用レイヤーとして扱い、
Phase 1 に必要な最小導線のみを対象にする。

---

## スコープ

この plan で扱うもの

- Teams 通知の最小ユースケース整理
- 何を通知対象にするかの整理
- 通知タイミングの最小設計
- Obsidian の限定利用範囲の整理
- Phase 1 時点での knowledge 的な補助利用の整理
- Teams / Obsidian を MVP 補助レイヤーとして扱うルール整理

この plan で扱わないもの

- Teams との高度な双方向同期
- Teams を execution 正本として扱うこと
- Obsidian の本格連携
- Obsidian 検索や RAG
- GitHub 正本との深い接続
- article/content の本格自動化
- 高度なナレッジ抽出ロジック

---

## 完了条件

- Teams を通知チャネルとしてどう使うかを定義できる
- 通知対象と通知タイミングを最小粒度で整理できる
- Obsidian の限定利用範囲を定義できる
- Obsidian の本格連携は Phase 3 で扱う前提を維持できる
- Phase 1 に必要な補助レイヤーの扱いが明確になる

---

## 主要論点

### 1. Teams で何を通知するか

- スケジュール案提示の通知を入れるか
- 承認完了の通知を入れるか
- 重要タスクや更新結果を通知するか
- 個人向けとプロジェクト向けを分けるか

### 2. 通知タイミング

- イベント発生時に即時通知するか
- まとめ通知にするか
- 手動トリガー前提にするか

### 3. Obsidian の限定利用範囲

- 参照のみか
- 軽い保存も含めるか
- どの情報を Obsidian に寄せるか
- notes / reports / content との役割をどう切るか

### 4. 本格連携との境界

- どこまでが light use か
- どこからを Phase 3 の本格連携とみなすか
- 先行利用で複雑化しないようにするにはどうするか

---

## 現時点の仮方針

- Teams は通知チャネルとして限定利用する
- 通知対象は最小限から始める
- Obsidian は補助的な参照 / 軽い利用に留める
- 本格的な knowledge layer 連携は Phase 3 に残す
- Phase 1 では複雑な統合を避ける

---

## 関連 docs

- docs/05_roadmap.md

---

## 関連 design

- notes/02_design/2026-04-03_plan_layer_operating_spec.md
- notes/02_design/2026-04-03_review_system_operating_spec.md

---

## 関連 operations

- notes/04_operations/2026-03-26_short_term_plan.md

---

## 次に落とす作業

- Teams 通知ユースケースの最小整理
- 通知対象イベントの整理
- Obsidian 限定利用の境界整理
- Phase 1 と Phase 3 の Obsidian 境界の明文化

---

## 次 plan 候補

- 05_roadmap.md への roadmap 反映
