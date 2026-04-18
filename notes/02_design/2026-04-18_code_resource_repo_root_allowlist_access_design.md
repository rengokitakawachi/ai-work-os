# 2026-04-18 code_resource_repo_root_allowlist_access_design

## 目的

code resource から、
repo ルート直下の重要設定ファイルを
安全に read できるようにする変更要求を design として固定する。

本メモは、

- 何を read 可能にしたいか
- なぜ必要か
- どこまで開けるか
- root 全開放を避ける理由
- 代替運用との関係

を明確にすることを目的とする。

---

## 結論

採るべき方針は次である。

- repo root 全開放はしない
- code resource に repo root の **allowlist** を追加する
- 最低限の対象から始める
- 追加対象は build / test / workspace / lint の主要設定に限る

最小 allowlist は次とする。

- `package.json`
- `vitest.config.js`
- `jest.config.js`

追加候補は次である。

- `tsconfig.json`
- `eslint.config.js`
- `pnpm-workspace.yaml`
- `package-lock.json`
- `pnpm-lock.yaml`
- `yarn.lock`

---

## なぜ必要か

現在の code resource では、
少なくとも次の範囲は読める。

- `src/`
- `api/`
- `lib/`
- `scripts/`
- `config/`

一方で、
repo ルート直下の設定ファイルは read できない。

このため、次が不完全になりやすい。

### 1. テスト実行方法の判定

- Vitest なのか
- Jest なのか
- npm scripts 経由か
- workspace 経由か

### 2. 依存関係の確認

- test runner が何か
- package manager が何か
- scripts がどう定義されているか

### 3. workspace / monorepo 構成の確認

- pnpm workspace か
- npm workspaces か
- root package と subpackage の関係は何か

### 4. lint / typecheck 前提の確認

- TypeScript 設定
- ESLint 設定
- root scripts の役割

したがって、
repo 実体の理解精度を上げるには
root 設定ファイルの read が必要である。

---

## なぜ全開放しないか

repo root には、
設定以外のファイルが混在しうる。

たとえば、

- 一時ファイル
- 機密寄り設定
- 運用メモ
- ローカル専用ファイル
- 読む価値が低い雑多ファイル

まで含めてしまう可能性がある。

そのため、

```text
repo root を丸ごと読めるようにする
```

より、

```text
必要な root files だけを allowlist で明示する
```

方が安全である。

---

## 最小 allowlist

### 必須

- `package.json`
- `vitest.config.js`
- `jest.config.js`

### 推奨

- `tsconfig.json`
- `eslint.config.js`
- `pnpm-workspace.yaml`

### 条件付き

- `package-lock.json`
- `pnpm-lock.yaml`
- `yarn.lock`

lockfile は巨大なことがあるため、
常時読む対象というより
必要時に読める対象として扱う方がよい。

---

## 非対象

少なくとも初期段階では、
次は対象にしない。

- `.env`
- `.env.*`
- 秘密情報を含みうる設定
- 任意の dotfile 全般
- root 配下の全 md
- root 配下の雑多なログ / dump / cache

つまり、
設定ファイル access 拡張であって、
repo root 全閲覧ではない。

---

## tool 側に求める変更

変更要求の本体は次である。

### 現状

code resource の read 対象:

- `src/`
- `api/`
- `lib/`
- `scripts/`
- `config/`

### 変更後

上記に加えて、
repo root allowlist files を read 対象に含める。

最小要件:

- `package.json`
- `vitest.config.js`
- `jest.config.js`

推奨追加:

- `tsconfig.json`
- `eslint.config.js`
- `pnpm-workspace.yaml`

---

## 代替運用との関係

この変更が入るまでの代替運用は存在する。

### 1. manifest

- `config/repo_root_manifest.md`

### 2. snapshot

- `config/repo_root_snapshots/package.json.snapshot.json`
- `config/repo_root_snapshots/test_config_summary.md`

### 3. notes 化

- design / issue に要点だけ転記する

ただし、これらは迂回策であり、
本筋ではない。

優先順位は次とする。

1.
tool 側 allowlist 拡張

2.
暫定的に manifest / snapshot

3.
単発の会話内説明

---

## Flow Control 文脈での価値

この変更は、単なる利便性向上ではない。

Flow Control 実装では特に次に効く。

- design routing test 実行方法の確認
- reroll sample dry_run の実行方法確認
- test runner / script の SSOT 確認
- config 差分由来の誤判定低減

つまり、
repo 実体検証の精度が上がる。

---

## 完了条件

この論点を完了とみなす最低条件は次である。

1.
code resource で `package.json` を read できる

2.
code resource で `vitest.config.js` または `jest.config.js` を read できる

3.
repo root 全開放ではなく allowlist 方式である

4.
manifest / snapshot なしでも
基本的な test runner 判定ができる

---

## 未決定

現時点で未決定なのは次である。

- repo root の許可対象をどこまで増やすか
- lockfile を常時対象にするか
- root の md を一部対象にするか
- write まで許可するか

ただし、
まず必要なのは read だけである。

---

## 判断

code resource の repo root access は、
全開放ではなく
**allowlist 方式での最小拡張**
が自然である。

最初の対象は、

- `package.json`
- `vitest.config.js`
- `jest.config.js`

で十分であり、
必要に応じて

- `tsconfig.json`
- `eslint.config.js`
- `pnpm-workspace.yaml`

を追加する。

この形なら、
安全性を崩さずに
repo 実体理解の精度を大きく上げられる。
