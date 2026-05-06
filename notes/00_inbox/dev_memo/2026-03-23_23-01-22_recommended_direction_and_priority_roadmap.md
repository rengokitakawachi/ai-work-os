# 推奨方向性メモ（2026-03-23 23:01:22）

## 位置づけ

AI Work OS の全 docs を読んだうえで、
現時点で最も整合的な進行方向を整理した素材メモ。

design/dev_memo.md への統合前の単票メモとして扱う。

---

## 結論

AI Work OS の主軸は「個別業務の自動化ツール群」より、
「docs を根拠に repo を読み、notes/design を介して安全に進化できる AI 開発 OS」に置く方がよい。

---

## 要点

- 最優先は repo-resource 基盤の完成
- その次に notes/design 運用の固定化を行う
- その後に docs と code のズレ検出を可能にする
- Knowledge Integration はその後に進める
- Outlook / Teams / kintone / GAS / Actions / MCP などの外部自動化は基盤完成後に拡張する

---

## 判断理由

- concept と architecture の中心は思考支援であり、単なる API 自動化の集合より根拠ベースで知識と仕様を扱える基盤が重要
- docs 群の重心は repo access と統治にある
- notes/inbox → exploration → design → docs → code の流れを実運用化する方が自然

---

## 基盤で優先する項目

- notes update
- code tree
- code read
- 構造化エラー統一
- resource boundary 固定

---

## design レイヤーで整理する項目

- テンプレート定義
- 昇格基準
- decisions の使い分け
- backlog 接続

---

## docs と code のズレ検出観点

- 命名差分
- endpoint 差分
- request / response 差分
- error schema 差分

---

## 最初の具体タスク

- repo-resource における code tree / read の仕様確定
- notes/design の標準テンプレート作成
- 1つの docs を対象にした docs vs code 差分検出の試行

---

## 今後の優先順位判断基準

- docs 全体と整合しているか
- SSOT 運用を強めるか
- notes/design を活かせるか
- code との整合確認に寄与するか
- 単なる便利機能追加に留まっていないか
