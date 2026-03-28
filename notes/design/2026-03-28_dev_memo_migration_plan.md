# 2026-03-28 Dev Memo Migration Plan

## 目的

旧 `notes/exploration/memo/` に存在する開発メモを、新しい運用方針に沿って整理・移行する計画を定義する。

未整理開発メモの入口を `notes/inbox/dev_memo/` に統一し、旧構造との混在を解消する。

---

## 背景

現状では以下が併存している。

- 旧運用: `notes/exploration/memo/`
- 新運用: `notes/inbox/dev_memo/`

これにより、開発メモの保存先判断がぶれやすい。

また、`notes/exploration/README.md` には旧保存ルールが残っている一方で、最近の検討では `exploration` 廃止寄り、未整理開発メモは `inbox/dev_memo` に集約する方針が見えている。

---

## 結論

- 未整理の開発メモの入口は `notes/inbox/dev_memo/` に統一する
- `notes/exploration/memo/` の既存ファイルは一括移動せず、棚卸し後に段階移行する
- 移行単位は「ファイル」ではなく「役割」で判定する
- 移行後の旧 `exploration/memo/` は新規保存先として使わない
- 旧フォルダは移行完了後に archive 扱いまたは廃止判断を行う

---

## 移行対象

主対象は以下とする。

```text
notes/exploration/memo/
```

関連確認対象は以下とする。

```text
notes/exploration/README.md
notes/inbox/README.md
notes/inbox/dev_memo/
notes/design/
notes/ideas/idea_log.md
notes/operations/
```

---

## 移行方針

### 1. 入口統一

今後、新しい未整理開発メモはすべて `notes/inbox/dev_memo/` に保存する。

### 2. 既存メモの棚卸し

`notes/exploration/memo/` の既存ファイルを一覧化し、以下の観点で分類する。

- 未整理のまま保持すべきか
- すでに design 化済みか
- すでに issue 化済みか
- operations に接続済みか
- 役割を終えて archive 候補か

### 3. 役割ベース移行

各ファイルは以下のいずれかへ振り分ける。

- 未整理入力として保持
  - `notes/inbox/dev_memo/`
- 仕様草案として昇格
  - `notes/design/`
- issue として記録済み
  - `notes/ideas/idea_log.md` を参照し、原本は archive 候補
- 実行計画へ接続済み
  - `notes/operations/` を参照し、原本は archive 候補
- 参照価値のみ残る
  - archive 候補

### 4. 旧フォルダ凍結

`notes/exploration/memo/` は移行期間中は read only 相当で扱う。

新規保存は行わない。

---

## 振り分けルール

### inbox/dev_memo へ移すもの

以下を満たすもの。

- 未整理である
- まだ統合レビューにかけていない
- 今後インテークレビュー対象にしたい
- 会話由来の論点メモである

### design へ昇格させるもの

以下を満たすもの。

- 目的、責務、方向性がある程度固まっている
- docs 直前の草案として扱う価値がある
- 1テーマ1メモとして独立性がある

### archive 候補にするもの

以下を満たすもの。

- すでに設計ノートへ吸収されている
- すでに issue / operations に要点が反映されている
- 原本参照以上の役割が薄い

### 保留するもの

以下を満たすもの。

- 論点が混在していて分割基準がまだない
- future / source_ref の設計待ちで処理判断が早い

---

## 実行手順

### Step 1

`notes/exploration/memo/` の全ファイルを棚卸しする。

### Step 2

各ファイルについて、以下を付けて一覧化する。

- current_path
- title
- status
  - keep_in_inbox
  - promote_to_design
  - archive_candidate
  - hold
- reason
- linked_design
- linked_issue
- linked_operations

### Step 3

未整理のものだけを `notes/inbox/dev_memo/` へ移す候補として確定する。

### Step 4

design 化すべきものは個別に `notes/design/` へ昇格させる。

### Step 5

archive 候補は、必要な参照先が確保された後にまとめて処理する。

### Step 6

移行後に `notes/exploration/README.md` の役割を見直す。

---

## 完了条件

以下を満たしたら移行計画の完了とみなす。

- 新規の未整理開発メモ保存先が `notes/inbox/dev_memo/` に統一されている
- `notes/exploration/memo/` の全ファイルに移行判定が付いている
- design 化対象と archive 候補が分離されている
- 旧 `exploration/memo/` が新規運用で使われなくなっている

---

## リスク

- ファイル単位で移すだけだと、論点混在を温存する
- design / issue / operations への接続確認なしに archive すると参照経路を失う
- future と source_ref の未確定論点が一部の移行判断を遅らせる

---

## 次のアクション

1. `notes/exploration/memo/` の棚卸し表を作る
2. 既存ファイルを role ベースで分類する
3. まず未整理のまま残すものだけを `notes/inbox/dev_memo/` 候補にする
4. 並行して `notes/exploration/README.md` の更新要否を判断する
