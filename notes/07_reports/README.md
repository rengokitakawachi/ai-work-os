# 07_reports

## 役割

review の結果を保存するレイヤー。

日次・週次・月次の実績、意思決定、学び、未解決、次アクションを蓄積する。

---

## 位置づけ

- reports は review の結果を残す成果物レイヤー
- review そのものではない
- daily review / weekly review / monthly review の出力を保存する
- 短期実行順の正本は `04_operations`
- reports は実績と振り返りの記録を担う

---

## 現在の構造

- `daily/`
- `monthly/`

weekly は今後必要に応じて導入する。

---

## 各ディレクトリの役割

### daily

日報を保存する。

- 保存先: `notes/07_reports/daily/YYYY-MM-DD.md`
- 当日の成果
- 意思決定
- 学び / 気づき
- 未解決 / リスク
- 次のアクション

### weekly

週報を保存する予定のレイヤー。

- 保存先候補: `notes/07_reports/weekly/YYYY-MM-DD.md`
- 今週の成果
- 整合確認結果
- 次週テーマ

現時点では常設運用前。

### monthly

月報を保存する。

- 保存先: `notes/07_reports/monthly/YYYY-MM.md`
- daily / weekly の集約
- 月間の成果
- 意思決定
- 設計進化
- 未解決
- 来月テーマ

---

## 運用原則

- report は保存して終わりにしない
- daily review では operations 更新と合わせて扱う
- 価値化できる論点は `09_content/drafts/` に抽出する
- monthly では roadmap / plan / operations との整合確認結果も反映する

---

## 関連

- `notes/04_operations/`
- `notes/09_content/`
- `notes/02_design/2026-04-03_review_system_operating_spec.md`
