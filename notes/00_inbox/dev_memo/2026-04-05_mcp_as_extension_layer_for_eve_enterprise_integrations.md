# MCP as extension layer for EVE enterprise integrations

## 結論

EVE において SharePoint へのアクセスは必須要件とみなす。

そのため、Outlook / Teams / SharePoint の企業内連携を設計する段階から、
Action だけでなく MCP も正式な候補として並行検討する。

ただし、正本操作と厳密制御が必要な領域は、
引き続き Action を中核に置く前提を維持する。

---

## 背景

- EVE の社内資産は SharePoint に保存される前提である
- 一般業務では Outlook / Teams / SharePoint の接続価値が高い
- これらは公開API接続だけでなく、認証・権限制御・社内資産参照が重要になる
- MCP はこの種の enterprise integration に向く可能性が高い

---

## 現時点の判断

### Action を中核に置く領域

- 正本操作
- 厳密な write 制御
- repo / notes / operations の契約固定
- 安全な read-before-write フロー

### MCP を初期から検討すべき領域

- SharePoint の検索 / 取得 / 要約
- Outlook の読取 / 空き時間取得 / 予定候補生成
- Teams の通知 / メッセージ連携
- 社内閉域または企業認証前提の接続
- 将来のマルチLLM対応を意識する接続基盤

---

## 基本方針

- GitHub / Todoist の基幹操作は当面 Action 優先
- Outlook / Teams / SharePoint は設計初期から MCP 併用を検討する
- ただし「MCP に全面移行する」のではなく、
  Action を正本操作、MCP を拡張接続レイヤーとして分けて考える

---

## AI platform neutrality

- ChatGPT は主要実装先の一つとして扱う
- ただし ChatGPT 依存の system にはしない
- AI Work OS の正本は docs / notes / operations / external SSOT 側に置く
- 業務ロジック、tool contract、approval flow は AI プラットフォーム層から分離する
- 将来的に Anthropic / Google / その他の AI へ切替・併用できる構造を目指す
- enterprise integration は ChatGPT 固有機能ではなく、再利用可能な接続基盤として設計する
- その観点で、Outlook / Teams / SharePoint は Action だけでなく MCP も初期から検討対象に含める

### 補足

- ChatGPT を使うことと、ChatGPT に依存することは分けて考える
- 短期は Action 中心でもよい
- 中長期は MCP や他の共通接続方式を取り込み、マルチLLM対応を確保する

---

## 今後の検討論点

1. SharePoint は read 専用から始めるか
2. Outlook は read / proposal / write をどう分離するか
3. Teams は通知専用に絞るか、双方向操作まで広げるか
4. 公式MCPがあるサービスはそれを使うか、自製MCPを作るか
5. OAuth / 権限境界 / approval をどこで握るか
6. Action と MCP の責務境界を docs でどう定義するか

---

## 一言

EVE の enterprise integration は、
Action だけで閉じるのではなく、
MCP を含む二層設計で考える方が拡張性が高い。
