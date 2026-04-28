# DELTA read-only Action runtime reflection

## 仮タイトル

GPT Actions は schema を貼っただけでは完成しない: DELTA v0.2 read-only 化で学んだこと

## 要旨

DELTA v0.2 では、GitHub 上の `systems/delta/` 配下を read-only で参照する Action を作った。

最初は専用 API route として `/api/delta-resource` を追加したが、Vercel Hobby の Serverless Functions 上限に衝突した。結果として、新規 route を増やす設計をやめ、既存 `/api/repo-resource` に `resource=delta` を統合する方式へ変更した。

最終的に DELTA GPT Actions から tree / read / bulk がすべて成功し、`branch=feature/atlas-pre-delta-foundation` と `read_only: true` を確認できた。

## 学び

### 1. route を増やすことは構造的には綺麗でも、運用制約に弱いことがある

専用 endpoint は責務分離としては分かりやすい。

しかし、Vercel Hobby のように Serverless Functions 数に上限がある環境では、endpoint を増やすたびに deploy 不能リスクが増える。

今回の結論は、専用 route ではなく、既存 route に resource / action 境界を追加する方が現実的だった。

### 2. read-only は API 実装だけでなく schema でも縛る

DELTA v0.2 は `/api/repo-resource` を使うが、schema 上は `resource=delta` と `action=tree/read/bulk` のみに制約する。

実装側でも read-only service に閉じ、write action を露出しない。

権限は一層ではなく、schema / route / service / runtime behavior の複数層で縛る必要がある。

### 3. runtime behavior confirmed まで完了扱いにしない

repo に schema file を保存しても、GPT Actions に反映されたとは限らない。

GPT Actions に schema を貼り、認証を設定し、実際に tree / read / bulk を呼んで初めて完了と判断できる。

今回も、最初は `NOT_FOUND`、次に `UNAUTHORIZED` が出た。どちらも repo 実装だけ見ていると見落とす。

### 4. 認証エラーは進捗でもある

`NOT_FOUND` は endpoint まで届いていない。

一方、`UNAUTHORIZED` は endpoint には到達している。

今回、`UNAUTHORIZED` になった段階で routing / schema / endpoint はかなり前進しており、残り blocker は Bearer 認証だと判断できた。

## 汎用ルール

- 新規 API route を増やす前に、hosting / deployment 制約を確認する
- GPT Actions の完了条件は runtime behavior まで含める
- repo schema / configured Action schema / runtime-visible schema / actual behavior を分けて扱う
- write 権限へ進む前に read-only を runtime confirmed にする
- write scope は resource 単位で最小化する

## 今後の展開

v0.3 では history write を扱う。

ただし、専用 `/api/delta-history` route は作らない。

既存 `/api/repo-resource` に `resource=delta_history` を追加し、`systems/delta/history/` の `.md` だけを書けるようにする。

operations write はさらに強い権限なので、v0.4 として別 gate に分ける。
