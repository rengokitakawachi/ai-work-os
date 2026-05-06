# 2026-03-28 Dev Memo Migration Plan

## 目的

旧 `notes/exploration/memo/` に存在する開発メモを、新しい運用方針に沿って移行する計画を定義する。

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
- `notes/exploration/memo/` の既存ファイルは、まず `notes/inbox/dev_memo/` に複写する
- 複写後は、新フォルダ側を未整理開発メモの作業対象として使う
- 棚卸しと role ベース分類は、インテークレビュー機能ができてから行う
- 旧 `notes/exploration/memo/` は移行期間中の原本参照用として残す
- 旧 `exploration/memo/` は新規保存先として使わない
- インテークレビュー運用開始後に、旧フォルダの archive / 廃止判断を行う

---

## 移行対象

主対象は以下とする。

```text
notes/exploration/memo/
```

複写先は以下とする。

```text
notes/inbox/dev_memo/
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

### 2. 先行複写

`notes/exploration/memo/` の既存ファイルは、まず `notes/inbox/dev_memo/` に複写する。

この時点では分類しない。

目的は、未整理開発メモの作業対象を新フォルダ側へ先に集約することにある。

### 3. 新フォルダ側を使用開始

複写後は `notes/inbox/dev_memo/` 側を未整理開発メモの主作業対象とする。

新たな開発メモの保存、参照、以後のレビュー起点は新フォルダ側に寄せる。

### 4. 棚卸しは後続フェーズ

複写後の棚卸し、分類、archive 判断はすぐには行わない。

これらはインテークレビュー機能の設計・実装後に、その機能を使って進める。

### 5. 旧フォルダ凍結

`notes/exploration/memo/` は移行期間中は原本参照用として扱う。

新規保存は行わない。

---

## 実行手順

### Step 1

`notes/exploration/memo/` の全ファイルを `notes/inbox/dev_memo/` に複写する。

### Step 2

複写後は、新フォルダ側を未整理開発メモの作業対象として使用する。

### Step 3

インテークレビュー機能の設計・実装を進める。

### Step 4

インテークレビュー運用開始後に、新フォルダ側で棚卸しと分類を行う。

### Step 5

分類結果を踏まえて、旧 `notes/exploration/memo/` の archive / 廃止判断を行う。

---

## 完了条件

以下を満たしたら、この移行計画の現段階は完了とみなす。

- `notes/exploration/memo/` の全ファイルが `notes/inbox/dev_memo/` に複写されている
- 新規の未整理開発メモ保存先が `notes/inbox/dev_memo/` に統一されている
- 旧 `exploration/memo/` が新規運用で使われなくなっている

インテークレビュー機能完成後の次段階では、以下を追加完了条件とする。

- 新フォルダ側の全ファイルに整理判定が付いている
- archive / design / 継続保留の整理が完了している
- 旧フォルダの最終扱いが決まっている

---

## リスク

- 複写直後は同一内容が二重化する
- 棚卸し前は新フォルダ側にも論点混在が残る
- インテークレビュー実装前に archive 判断を行うと参照経路を失う可能性がある

---

## 次のアクション

1. `notes/exploration/memo/` の全ファイルを `notes/inbox/dev_memo/` へ複写する
2. 以後の未整理開発メモは `notes/inbox/dev_memo/` に統一する
3. インテークレビュー機能の設計・実装を進める
