# 2026-03-27 Development Flow Restructure Discussion

## 概要

標準開発フローの骨格を議論する中で、計画系レイヤー、入力整理、一次判定、レビュー前段のインテークレビュー、フォルダ構成の再設計について整理した。

本メモは会話由来の統合メモであり、未整理入力の一時置き場に保存する。

---

## 1. 計画系レイヤーの整理

### 結論

- phase / plan / operations は分ける
- ただし分断ではなく、上位下位でリンクさせる
- phase は docs
- plan と operations は notes
- operations は週次の開発実行計画として持つ
- daily report と連動して更新する

### 役割定義

#### phase

- 開発全体の現在地
- どの段階にいるかを示す

保存先

```text
docs/05_roadmap.md
```

#### plan

- 一定期間で進める重点テーマ
- 今の phase で何を前に進めるかを示す

保存先

```text
notes/plans/
```

#### operations

- plan を前に進めるための短期実行管理
- 今週何をやるか、今日は何をやるか、進捗はどうかを示す

保存先

```text
notes/operations/
```

### 関係

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

## 2. operations の設計方針

### 結論

operations は単なる「後でやること一覧」ではなく、1週間単位の開発実行計画として持つ。

### 定義

- 今週何を進めるかを持つ
- 日付ごとの作業欄を持つ
- 各作業項目は status を持つ
- plan とリンクする
- daily report に応じて更新する

### 日付運用

日付ごとの欄を持つ。

例

- 2026-03-27
- 2026-03-28
- 2026-03-29
- 2026-03-30

### status 方針

status は日付単位ではなく、項目単位で持つ。

採用する status

- planned
- in_progress
- done
- blocked

### 補足

operations という名前は維持してよい。

ただし意味は「運用全般」ではなく、「週次の開発実行計画」として明確化する。

---

## 3. 標準開発フローへの計画系統合

### 結論

計画系は標準開発フローの外側に置くのではなく、最初の前提ステップとして統合して考える。

### 統合骨格

```text
0. phase 確認
1. plan 確認
2. operations 確認
3. 課題認識
4. 課題整理
5. 種類判定
6. 保存先判定
7. 次アクション判定
8. 必要なら design
9. docs 確認
10. 実装可否判定
11. 実装
12. daily report
13. operations 更新
```

---

## 4. 入力経路は複数ある

### 入力元

- conversation
- docs_code_review
- external
- execution
- review

### 論点

重要なのは入力元そのものより、どこで同じ土俵に乗せるかである。

入力元が違っても、途中で統合して共通フローへ入れる必要がある。

---

## 5. 一次判定の考え方

### 基本4分類

- knowledge
- issue
- task
- hold

### 各分類の意味

#### knowledge

- 将来参照価値がある情報として保存する対象

#### issue

- 解決、設計、判断が必要な課題対象

#### task

- 次アクションが明確で短期実行管理へ載せる対象

#### hold

- 今は進めないが後で再評価するために保留する対象

### hold の扱い

- 短期保留は operations の Later
- 課題として残す保留は issues 側の open
- hold 専用フォルダは作らない方針が自然

---

## 6. インテークレビューの再定義

### 背景

当初は未整理入力をファイル単位で処理する案を考えたが、それでは重複や共通テーマの整理が弱い。

### 結論

インテークレビューはファイル単位ではなく、フォルダ単位で全体を読んで統合してから処理する。

### 対象フォルダ

- notes/inbox/web
- notes/inbox/dev_memo

### 処理の流れ

```text
0. 対象フォルダ選定
1. フォルダ全体読取
2. 統合整理
3. 統合テーマ抽出
4. 一次判定
   - knowledge
   - issue
   - task
   - hold
   - discard
5. 保存先決定
6. 元ファイル群の処理
   - keep
   - archive
   - delete
7. issue は標準開発フローへ接続
```

### 補足

インテークレビューの出力は 1テーマ1メモ とする方針が自然。

---

## 7. inbox/web の位置づけ

### 結論

notes/inbox/web は、iPhone などで見つけた未整理の参考記事の一次受け皿とする。

### フロー

```text
external input
↓
notes/inbox/web
↓
インテークレビュー
↓
knowledge / issue / task / hold / discard
↓
必要に応じて issues / design / operations などへ
```

### 運用原則

- inbox/web は未整理の一時置き場
- 正本ではない
- インテークレビュー後は原則空に戻す

---

## 8. exploration 廃止と inbox/dev_memo への統合

### 結論

- exploration は廃止寄りでよい
- 会話由来の未整理開発メモは inbox/dev_memo に集約する

### 理由

- 未整理入力の入口を inbox に統一できる
- dev_memo は用途が名前で分かる
- exploration という曖昧な層を減らせる
- インテークレビュー後に空にする運用と相性がよい

### 役割

```text
notes/inbox/web
- 未整理の外部記事

notes/inbox/dev_memo
- 未整理の開発メモ
- 会話由来の論点、違和感、途中整理
```

### 運用イメージ

```text
会話
↓
inbox/dev_memo に入る
↓
インテークレビュー
↓
issue / task / hold / knowledge に整理
↓
issues / design / operations などへ昇格
↓
inbox/dev_memo は空に戻す
```

---

## 9. ideas から issues への変更提案

### 結論

ideas より issues の方が自然。

### 理由

- 実際に保存しているものが「思いつき」より「課題」に近い
- 一次判定の issue と名前が揃う
- design への接続が明確になる
- hold の open 管理とも相性がよい

### 方針

```text
notes/issues/
- 課題として構造化したもの
- open のまま保持する論点
- 後で design や operations へ接続する起点
```

---

## 10. reports の位置づけ

### daily

- 日次の実績と振り返り
- operations を更新するための入力

保存先

```text
notes/reports/daily/
```

### monthly

- daily を月単位で整理した上位レビュー

保存先

```text
notes/reports/monthly/
```

---

## 11. フォルダ構成の現時点整理

### 中核フォルダ

- docs/
- notes/plans/
- notes/issues/
- notes/design/
- notes/operations/
- notes/handover/
- notes/reports/daily/
- notes/reports/monthly/
- notes/inbox/web/
- notes/inbox/dev_memo/

### 保留整理対象

- notes/analysis/
- notes/backlog/
- notes/logs/
- notes/decisions/
- notes/archive/

### 評価

- フォルダ名は大筋このままでよい
- ただし全フォルダを同じ重要度で扱わない
- 中核フォルダを先に固定し、保留整理対象は後で個別に見直す

---

## 12. 現時点の統合フロー骨格

```text
0. 入力元判定
1. インテークレビュー
2. 一次判定
3. phase 確認
4. plan 確認
5. operations 確認
6. issue の場合は課題整理
7. 種類判定
8. 保存先判定
9. 次アクション判定
10. 必要なら design
11. docs 確認
12. 実装可否判定
13. 実装
14. daily report
15. operations 更新
16. monthly report へ集約
```

---

## 補足

本メモは未整理入力の統合メモである。

今後、確度の上がった内容は notes/design へ昇格し、必要に応じて docs / code / operations に接続する。
