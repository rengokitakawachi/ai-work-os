# 2026-04-02 Notes Folder Migration Mapping

## 目的

現行の notes フォルダ構造を、
採用した番号付き構造へどう移行するかを対応表として固定する。

本メモは、実際の rename 実行そのものではなく、
どの現行フォルダがどこへ向かうのか、
何を rename し、何を統合し、何を凍結し、何を維持するかを明文化するための design 草案とする。

この整理は以下の前提になる。

- notes/README.md 更新
- docs/15_notes_system.md 差分整理
- 実際のフォルダ rename / create / archive 判断
- ideas → issues 移行方針の具体化

---

## 前提

すでに採用済みの番号付き構造案は以下とする。

```text
notes/
  00_inbox/
  01_issues/
  02_design/
  03_plans/
  04_operations/
  05_decisions/
  06_handover/
  07_reports/
  08_analysis/
  09_content/
  10_logs/
  99_archive/
```

また、現行運用構造の整理では以下を確認済みである。

- inbox / design / operations / handover / reports は中核運用
- ideas は実態として issue レイヤーに近い
- content は運用先行の新レイヤー
- analysis は横断確認レイヤー
- exploration は旧構造であり中核主線ではない
- backlog は operations と一部役割が競合している

---

## 結論

移行の考え方は以下とする。

- 中核として維持するものは、番号付きフォルダへ rename する
- 名称と責務がズレているものは、統合または再編を前提に移す
- 旧構造はすぐ消さず、凍結・段階移行する
- archive は最終退避先として維持する
- 実運用を止めないため、一括 rename は行わない
- 廃止・整理予定でまだ参照が必要なフォルダには `xx_` 接頭辞を付ける

---

## 対応表

### 1. 中核フォルダの rename 対象

```text
notes/inbox/        → notes/00_inbox/
notes/design/       → notes/02_design/
notes/operations/   → notes/04_operations/
notes/decisions/    → notes/05_decisions/
notes/handover/     → notes/06_handover/
notes/reports/      → notes/07_reports/
notes/analysis/     → notes/08_analysis/
notes/content/      → notes/09_content/
notes/logs/         → notes/10_logs/
notes/archive/      → notes/99_archive/
```

補足:
- これらは原則として責務を維持したまま番号付きへ移す対象
- ただし decisions / analysis / logs は現時点では運用が薄いため、rename は後段でもよい

---

### 2. 統合・再編対象

```text
notes/ideas/        → notes/xx_ideas/ → notes/01_issues/
notes/backlog/      → notes/xx_backlog/ → 再整理後に最終配置決定
notes/plans/        → notes/03_plans/ として新設または整理対象
```

#### notes/ideas/

扱い:
- 将来的には `01_issues/` に寄せる

理由:
- 実態が課題ログであり、idea より issue に近い
- 標準開発フローとも命名が揃う
- design や operations への接続起点として自然

当面方針:
- すぐに `01_issues` へ統合しない
- 中間状態として `xx_ideas` を採用する
- 既存の `idea_log.md` は当面維持する
- 最終的には `01_issues` へ統合する

---

#### notes/backlog/

扱い:
- 直ちに番号付き中核へ入れない
- 中間状態として `xx_backlog` を採用する
- operations との役割を再定義してから最終配置を決める

理由:
- 現在の短期実行順の正本は operations に寄っている
- backlog は candidate / blocked / later の保管としては有効だが、中核主線ではない
- 無理に `03` や `04` へ混ぜると責務が曖昧になる

当面方針:
- `xx_backlog` として整理予定を明示する
- 後続フェーズで「残す / 統合する / 補助レイヤー化する」を決める

---

#### notes/plans/

扱い:
- `03_plans/` として置く前提で整理する

理由:
- phase / plan / operations の責務分離はすでに設計済み
- ただし現行 repo 上では plans フォルダが未整備
- 実体の unit 設計が未確定

当面方針:
- 先に concept と責務を確定
- rename ではなく新設寄りで扱う

---

### 3. 凍結・縮小対象

```text
notes/exploration/  → 中核外、凍結・段階移行対象
```

理由:
- 旧運用の名残であり、現在の主線ではない
- 未整理入力は inbox/dev_memo に寄っている
- exploration は意味が広く、責務が曖昧になりやすい

当面方針:
- 新規保存先として使わない
- 既存内容はすぐ消さない
- 必要なら `xx_` 接頭辞の対象として扱える
- inbox / issues / design へ段階的に寄せる
- 最終的な archive / 廃止判断は後続で行う

---

## サブフォルダの対応

### inbox 配下

```text
notes/inbox/web/        → notes/00_inbox/web/
notes/inbox/dev_memo/   → notes/00_inbox/dev_memo/
```

方針:
- そのまま配下構造を維持して移す

---

### reports 配下

```text
notes/reports/daily/    → notes/07_reports/daily/
notes/reports/monthly/  → notes/07_reports/monthly/
```

方針:
- daily / monthly の二層を維持する

---

### content 配下

```text
notes/content/drafts/   → notes/09_content/drafts/
```

方針:
- draft 素材レイヤーとして維持する

---

## 移行タイプ分類

### A. 単純 rename 可能

```text
inbox
design
operations
handover
reports
analysis
content
logs
archive
```

条件:
- 役割がすでに安定している
- 参照先の読み替えで対応しやすい

---

### B. 再編を伴う

```text
ideas
backlog
plans
```

理由:
- 名前と責務がまだ揺れている
- そのまま番号付きへ移すと将来また変更が必要になる

補足:
- ideas / backlog は `xx_` 接頭辞で中間状態を作る
- plans は新設寄りで扱う

---

### C. 凍結・段階移行

```text
exploration
```

理由:
- 中核主線から外れている
- すぐ消すと参照経路を失う
- 旧メモの退避と再整理が必要

---

## 実行順の原則

本メモでは最終的な対応関係を固定するが、
実行順は以下の安全原則に従う。

1. 先に design を固める
2. README / docs の差分を整理する
3. 新規作成で必要なフォルダを先に用意する
4. rename 可能なものから段階的に移す
5. ideas / backlog は `xx_` 接頭辞で中間状態を作る
6. 再編対象は concept 固定後に動かす
7. exploration は最後に扱う

---

## この時点で固定すること

この時点で固定するのは以下。

- inbox / design / operations / decisions / handover / reports / analysis / content / logs / archive は番号付き rename 対象
- ideas は `xx_ideas` を経由して issues へ統合する方向で扱う
- backlog は `xx_backlog` を経由して再整理する
- plans は `03_plans` として新設寄りで扱う
- exploration は凍結・段階移行対象とする
- 実運用を止めないため、一括 rename はしない

---

## 未確定点

以下はまだ未確定。

- ideas → issues の具体的 rename 手順
- backlog の最終配置
- plans の unit 設計
- exploration 配下の個別ファイルの最終行き先
- rename をどの順で実行するか
- 既存リンクや参照文言の一括修正範囲

---

## 次のアクション

1. notes/README.md の更新草案を作る
2. docs/15_notes_system.md の更新草案へ接続する
3. rename 実行前に、参照更新対象を洗い出す
4. ideas / backlog / exploration の個別移行ルールを必要なら別紙化する
