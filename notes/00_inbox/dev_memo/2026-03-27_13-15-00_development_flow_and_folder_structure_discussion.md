# 2026-03-27 Development Flow and Folder Structure Discussion

## 概要

標準開発フローの前提として、phase / plan / operations の役割、入力経路、一次判定、フォルダ構成の接続を整理した。

本メモは会話由来の途中整理であり、正式仕様ではない。

---

## 主要論点

### 1. 標準開発フローは計画系を内包して考える

標準開発フローは単に

- 課題発見
- 設計
- 実装

の直列ではなく、以下の計画系レイヤーを前提に組み込むべきと整理した。

- phase
- plan
- operations

統合イメージ

```text
phase を前提にする
↓
plan を置く
↓
operations に落とす
↓
新しい入力を受ける
↓
一次判定
↓
issue の場合は課題整理
↓
必要なら design
↓
docs 確認
↓
実装
↓
daily report
↓
operations 更新
```

---

### 2. phase / plan / operations の責務分離

#### phase

- 開発全体の現在地
- プロダクト全体の進行段階を示す
- docs 側で管理する

保存先

```text
docs/05_roadmap.md
```

#### plan

- 一定期間で進める重点テーマ
- 今の phase で何を前に進めるかを示す
- notes 側で管理する

保存先

```text
notes/plans/
```

#### operations

- plan を前に進めるための短期実行管理
- 今週何をやるか、今日は何をやるか、進捗はどうかを示す
- notes 側で管理する

保存先

```text
notes/operations/
```

関係

```text
phase
↓
plan
↓
operations
↓
daily report
↓
operations 更新
↓
monthly report
```

---

### 3. operations の位置づけ

operations は単なる「後でやること一覧」ではなく、1週間単位の開発実行計画として持つ方針がよいと整理した。

定義

- 今週何を進めるかを持つ
- 日付ごとの作業欄を持つ
- 各作業項目は status を持つ
- plan とリンクする
- daily report に応じて更新する

日付運用例

- 2026-03-27
- 2026-03-28
- 2026-03-29
- 2026-03-30

status 方針

- status は日付単位ではなく項目単位で持つ
- 採用候補は以下
  - planned
  - in_progress
  - done
  - blocked

---

### 4. 入力経路は複数あるが、途中で統合する

入力元は複数あってよいが、分岐しっぱなしにせず、どこかで共通フローへ統合する必要があると整理した。

主な入力元

- conversation
- docs_code_review
- external
- execution
- review

重要なのは、入力元の違いそのものではなく、どこで統合するかである。

---

### 5. 一次判定の4分類

入力後の一次判定として、以下の4分類を置く案を整理した。

- knowledge
- issue
- task
- hold

#### knowledge

- 将来参照価値がある情報として保存する対象

#### issue

- 解決、設計、判断が必要な課題対象

#### task

- 次アクションが明確で短期実行管理へ載せる対象

#### hold

- 今は進めないが後で再評価するために保留する対象

hold の扱い

- 短期保留は operations の Later
- 課題として残す保留は ideas の open
- 専用の hold フォルダは作らない方針が自然

---

### 6. inbox/web の位置づけ

notes/inbox/web は、iPhone などで見つけた未整理の参考記事の一次受け皿として使う方針が自然と整理した。

フロー

```text
external input
↓
notes/inbox/web
↓
定期レビュー
↓
knowledge / issue / hold / discard
↓
必要に応じて ideas / design / operations / exploration へ
```

運用方針

- inbox/web は未整理の一時置き場
- 正本ではない
- 定期レビューで必ず次の状態へ送る

---

### 7. exploration/memo の位置づけ

notes/exploration/memo は、ADAM との会話から出た開発論点、考察、途中整理を置く補助レイヤーとして定義するのが自然と整理した。

役割

- 会話由来の開発メモ
- issue や design に上げる前の途中整理
- 判断の流れを保持するメモ

自然な流れ

```text
会話
↓
notes/exploration/memo
↓
必要なら
- issue 化して ideas
- 設計化して design
- 参考メモとして保持
```

---

### 8. reports の位置づけ

#### daily

- 日次の実績と振り返り
- operations を更新するための入力

保存先

```text
notes/reports/daily/
```

#### monthly

- daily を月単位で整理した上位レビュー

保存先

```text
notes/reports/monthly/
```

---

### 9. フォルダ構成の現時点評価

中核として使うフォルダ

- docs/
- notes/plans/
- notes/ideas/
- notes/design/
- notes/operations/
- notes/handover/
- notes/reports/daily/
- notes/reports/monthly/
- notes/inbox/web/
- notes/exploration/memo/

保留整理対象

- notes/analysis/
- notes/backlog/
- notes/logs/
- notes/decisions/
- notes/archive/

評価

- フォルダ名は大筋このままでよい
- ただし全フォルダを同じ重要度で扱わない
- 中核フォルダを先に固定し、保留整理対象は後で個別に見直す

---

## 現時点の統合フロー骨格

```text
0. 入力元判定
1. 一次判定
2. phase 確認
3. plan 確認
4. operations 確認
5. issue の場合は課題整理
6. 種類判定
7. 保存先判定
8. 次アクション判定
9. 必要なら design
10. docs 確認
11. 実装可否判定
12. 実装
13. daily report
14. operations 更新
15. monthly report へ集約
```

---

## 補足

本メモは exploration/memo として保存する。

設計として確度が上がった部分は、必要に応じて notes/design へ昇格する。
