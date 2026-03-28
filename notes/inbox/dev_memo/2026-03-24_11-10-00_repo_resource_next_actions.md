# repo-resource next actions (2026-03-24)

## 現状

- repo-resource API 完成（notes delete 含む）
- docs / notes / code の基本操作は揃った
- エラー構造も統一済み

---

## 次にやること

### 1. docs整合（最優先）

目的
- SSOT（docs）と実装のズレ解消

対応内容
- 10_repo_resource_api.md に delete 追加
- notes delete の制約（許可パス）を明文化
- code resource が実装済みであることを反映

完了条件
- docs と code の差分がゼロ

---

### 2. auth / request_id の統一

目的
- 全エラーに request_id を付与

対応内容
- internal-auth.js を修正
- auth失敗時も request_id を含める

完了条件
- 全レスポンスで request_id が保証される

---

### 3. AI利用ルールの設計（重要）

目的
- APIを「使われる状態」にする

背景
- APIがあってもルールがないと呼ばれない

対応内容
- docs取得ルール（強制）
- notes保存ルール
- 差分検出フロー
- repo-resource呼び出し優先順位

保存先
- notes/design 配下

完了条件
- AIが自律的に repo-resource を使う

---

### 4. docs/code 差分検出の整理

目的
- 仕様ズレを継続的に検出

対応内容
- docs-code consistency の整理
- 差分検出フローを定義

---

### 5. 次の機能検討（後回し）

- search API
- diff API
- move API
- delete（code）

※ すべて docs整合後に検討

---

## 優先順位

1 docs整合
2 auth改善
3 AIルール設計
4 差分検出
5 機能拡張

---

## 判断

現フェーズは「機能追加」ではなく

- 整合性
- 利用性
- 運用性

を固める段階

無理に拡張しない

---

## 次アクション

1
10_repo_resource_api.md の差分抽出

2
docs修正案の作成

3
design に AI利用ルール草案を作る
