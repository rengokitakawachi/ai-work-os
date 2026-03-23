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

### inbox構造（更新）
- notes/inbox/web：外部記事・URLなどの素材
- notes/inbox/memo：思いつき・断片メモなどの素材
- inbox は未整理の「素材置き場」として統一（種類はサブフォルダで分離）

### inbox記事・メモの運用フロー
- 気になるWeb記事は notes/inbox/web/ に保存
- 思いつきメモは notes/inbox/memo/ に新規作成
- 定期的に inbox を見直す（web / memo 両方）
- 必要な情報・示唆・設計に効く内容は design/dev_memo.md に要点追記する
- 元記事・元メモは使い終わったら notes/archive/ に移動する
- inbox は未整理情報の一時置き場とする

### archive構造
- notes/archive/：使用済み素材（web / memo）の保管場所
- 参照はするが、日常的には触らない領域

### AIエージェント設計メモ
- AIエージェントは目的を1つに絞ることが成功の鍵
- ナレッジの質がエージェントの精度を決める
- 初期ユースケースは「FAQ」または「ナレッジ検索」が最適
- 基本構造は「目的 → ナレッジ → ルール → 連携 → 運用」
- AIエージェントはチャットボットではなく、ナレッジベースの意思決定システム
- スモールスタート（単一ユースケース）で始める
- 人間のレビューを前提に設計する
- ワークフローと権限設計が重要
- ログを基に改善サイクル（PDCA）を回す
- PoC止まりを防ぐには現場で使われる設計が必要
- AIは「思い出す・整理する」を担当し、「考える」は人間が行う
- 思考・判断・内省はAIに外注してはいけない
- 自動化の境界を明確に設計することが重要
- AIは答えではなく「問い」を生成する役割が有効
- 構造は「事実（AI）→ 内省（人間）」で分離する
- ログや事実データを元にした具体的な問い生成が有効

### 設計ルール（DESIGN.md的発想）
- 設計ルールは外部化して再利用する
- dev_memoは設計ルールの集約（DESIGN.md的役割）
- 「方向性 → ルール → 実装」の順で設計する
- 実装前にルールを定義することで一貫性を保つ
- 抽象（目的・意図）→具体（タスク・UI）の順で落とす
- AIは役割ごとに分離して使う（生成・整理・実行）
- 毎回ゼロから作らず、ルールを再利用する
- ロジックはコードではなくテンプレートで外部化する

### UI戦略（Stitch活用）
- 現在はChatGPTをUIとして使用している（暫定UI）
- 将来的には独自UIの構築をスコープに含める
- Stitchは独自UIの「設計・探索フェーズ」に活用できる
- StitchはUI生成ツールではなく「設計支援ツール」として位置付ける
- 自然言語から複数の画面案を生成し、比較・検討が可能
- DESIGN.mdによりデザインルールを外部化し再利用できる
- 「画面 → 実装」ではなく「目的 → 画面 → ルール → 実装」の流れを作る
- Stitchで方向性を決め、実装は別レイヤーで行う（役割分離）
- 将来的な流れ：
  ChatGPT（暫定UI） → Stitch（UI設計） → 独自UI実装
- Phase設計への組み込み：
  Phase2.5としてUI設計フェーズを追加するのが自然

### repoResource API 改善メモ
- archive運用のためには delete API が必要
- move は不要で、copy + delete で実現する
- 現状は delete が存在しないため、inbox → archive の状態遷移が完結しない
- 将来的に repoResourceWrite に delete アクションを追加する

### 推奨方向性メモ（2026-03-23）
- AI Work OS の主軸は「個別業務の自動化ツール群」より「docs を根拠に repo を読み、notes/design を介して安全に進化できる AI 開発 OS」に置く方がよい
- 最優先は repo-resource 基盤の完成
- その次に notes/design 運用の固定化を行う
- その後に docs と code のズレ検出を可能にする
- Knowledge Integration はその後に進める
- Outlook / Teams / kintone / GAS / Actions / MCP などの外部自動化は基盤完成後に拡張する
- concept と architecture の中心は思考支援であり、単なる API 自動化の集合より根拠ベースで知識と仕様を扱える基盤が重要
- docs 群の重心は repo access と統治にある
- notes/inbox → exploration → design → docs → code の流れを実運用化する方が自然
- repo-resource 基盤で優先する項目は notes update、code tree、code read、構造化エラー統一、resource boundary 固定
- design レイヤーではテンプレート定義、昇格基準、decisions の使い分け、backlog 接続を整理する
- docs と code のズレ検出では命名差分、endpoint 差分、request / response 差分、error schema 差分を観点にする
- 最初の具体タスクは以下
  - repo-resource における code tree / read の仕様確定
  - notes/design の標準テンプレート作成
  - 1つの docs を対象にした docs vs code 差分検出の試行
- 今後の優先順位判断は以下で行う
  - docs 全体と整合しているか
  - SSOT 運用を強めるか
  - notes/design を活かせるか
  - code との整合確認に寄与するか
  - 単なる便利機能追加に留まっていないか

---

## 今後の検討
- duration設計
- Outlook自動スケジューリング
- MindMeister → Task変換
- Task → MindMeister再構造化

---

## 未整理メモ
（自由に追記）
