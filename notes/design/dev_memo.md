# Dev Memo

## 目的
引き継ぎ書とは別に、機能・設計・気づき・アイデアを蓄積するためのメモ。
スレッド引き継ぎではなく、継続的な開発知識の蓄積を目的とする。

---

## メモ方針
- 粒度は自由
- 未整理OK
- 思考ログ歓迎
- 将来docs化する前段階
- 大きな1ファイルへ追記するより、素材は新規メモとして蓄積する

---

## 現在の設計メモ

### AI Work OS 構造
- MindMeister：思考・全体像
- Todoist：実行
- Outlook：時間
- Obsidian：知識

### フェーズ構成
- Phase1：Todoist運用確立
- Phase2：Outlook / MindMeister連携
- Phase3：Obsidian知識基盤

### Todoist設計
- Project：
  - 北河内｜政策実現
  - 北河内｜交流
  - 北河内｜働く人支援
  - 北河内｜人材育成
  - 北河内｜ジェンダー
  - 北河内｜社会貢献
  - 労福協｜事業

- Label：
  - 組織（北河内 / 労福協 / 連合大阪 / 電機大阪）

- 構造：
  Project → Section → Task

### メモ保存方針
- handover：notes/handover/ に日時付き単票で保存
- 設計素材メモ：notes/design/ 配下に新規作成で蓄積
- 整理済み設計：design/dev_memo.md に要点を統合
- 開発メモは素材であり、散らかっていてよい
- 整理したいときは design 配下のメモをまとめて読んで統合する

### inbox記事の運用フロー
- 気になるWeb記事があれば notes/inbox/ に保存する
- たまに inbox の中身を見直す
- 必要な情報・示唆・設計に効く内容は design/dev_memo.md に要点追記する
- 元記事を使い終わったら別の保管場所へ移す
- inbox は未整理情報の一時置き場とする

---

## 今後の検討
- duration設計
- Outlook自動スケジューリング
- MindMeister → Task変換
- Task → MindMeister再構造化
- inbox記事の移動先ルール
- 設計素材メモの命名規則

---

## 未整理メモ
（自由に追記）
