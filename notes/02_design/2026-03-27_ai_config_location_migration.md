# 2026-03-27 AI Config Location Migration

## 目的

ADAM / EVE の instructions / schema を、ADAM が直接読める責務領域へ再配置する。

保存場所を access layer と整合させ、更新時の現状把握を安定化する。

---

## 背景

現在、ADAM と EVE の instructions / schema はリポジトリ直下の AI/ フォルダに保存されている。

ただし、AI/ 配下は現行の access path に含まれていない。

そのため、ADAM は必要時に以下を直接実行できない。

- 現状ファイルの読取
- 更新前の確認
- 差分判断
- 更新フローの標準化

結果として、repo に情報は存在していても、運用上は参照不能に近い状態になっている。

---

## 問題

現在の構造では、保存場所と読取経路が分離している。

- 保存場所: AI/
- 読取経路: docs / notes / code を中心とした repo-resource

この分離により、instruction / schema の更新時に必要な以下のフローが手動依存になる。

- 現状読取
- 差分確認
- 草案生成
- 更新判断

---

## 方針

解決方針は以下とする。

- AI/ に専用 API を追加する案は採用しない
- instructions / schema は API で読める責務領域へ移動する
- 保存先は code/config/ai/ とする
- code resource の read 経路に統一する

これにより、instructions / schema を例外的な特別領域ではなく、構成資産として扱う。

---

## 保存先

新しい保存先は以下とする。

```text
code/config/ai/
```

想定例

```text
code/config/ai/adam_instruction.md
code/config/ai/adam_schema.json
code/config/ai/eve_instruction.md
code/config/ai/eve_schema.json
```

命名は今後の実ファイル状況に合わせて確定する。

---

## 期待効果

- ADAM が code resource として現状ファイルを直接読める
- 更新前の確認を標準フローに組み込める
- 差分確認の再現性が上がる
- handover / restart flow との接続がしやすくなる
- access layer の例外追加を避けられる

---

## 更新フロー

instruction / schema 更新時の標準フローは以下とする。

1. code/config/ai/ 配下の現状ファイルを読む
2. 差分を整理する
3. 修正案を作る
4. 更新判断を行う
5. 必要に応じて code resource を更新する

---

## 非採用案

### AI/ に API を追加する案

この案は短期の応急処置としては成立する。

ただし、以下の理由で本線にはしない。

- access layer の責務が増える
- 特別扱い resource が増える
- 長期運用で例外管理が増える
- handover / restart flow との接続が複雑になる

---

## 影響範囲

- 現在の AI/ 配下ファイル
- code resource の対象構造
- instruction / schema 更新フロー
- ADAM / EVE の運用手順

---

## 残論点

- 既存 AI/ 配下の実ファイル名と移行対象一覧
- code resource での実際の配置パス
- 読取 API の対象範囲確認
- instructions / schema の命名規約
- 移行後に AI/ を残すか削除するか

---

## 判断

本件は architecture 課題として扱う。

実装前に、既存 AI/ 配下ファイルの棚卸しと移行マッピングを整理する。
