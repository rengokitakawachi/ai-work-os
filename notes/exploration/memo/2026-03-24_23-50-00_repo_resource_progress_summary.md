# repo-resource progress summary (2026-03-24)

## 今日できたこと

### 1. repo-resource API 完成
- docs / notes / code の基本操作が揃った
- notes に delete を正式導入
- handler / service / common の責務分離を維持

---

### 2. delete 設計と実装
- notes 限定 delete 実装
- 許可ディレクトリ制御（inbox / exploration / logs）
- sha安全取得
- conflict / not_found 正規化

---

### 3. OpenAPI（Action）整備
- requestBody を object に修正（oneOf問題解消）
- delete 対応スキーマ追加
- servers / URL 問題解消

---

### 4. 認証問題の解決
- 403原因特定
- API Key 認証に統一
- Action → API 呼び出し成功

---

### 5. delete 実行可能状態へ
- notes delete を Action 経由で実行可能に
- 実運用可能状態に到達

---

## 明日やること

### 1. delete 実動確認（最優先）
- 乃木坂ファイルを1件削除
- 問題なければ残り7件削除

---

### 2. docs整合（SSOT更新）
- 10_repo_resource_api.md に delete 反映
- notes delete 制約を明文化
- code resource 実装反映

---

### 3. AI利用ルール設計（重要）
- docs取得強制ルール
- notes保存ルール
- repo-resource呼び出し優先順位

---

### 4. auth / request_id 微修正
- auth失敗時にも request_id を返す

---

## 判断

現フェーズは「機能追加」ではなく

- 整合性
- 利用性
- 運用性

を固める段階

無理に拡張しない

---

## 状態

- API: 完成
- 構造: 安定
- 実行導線: 開通

フェーズ: 実装 → 運用設計
