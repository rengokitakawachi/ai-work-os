# 2026-03-27 Phase Plan Operations Structure

## 目的

phase / plan / operations の責務分離と配置方針を整理する。

標準開発フロー設計の前提となる計画系レイヤーの構造を安定化する。

---

## 結論

- phase / plan / operations は分ける
- ただし分断ではなく、上位下位でリンクさせる
- phase は docs で管理する
- plan と operations は notes で管理する
- operations は週次の開発実行計画として持つ
- daily report と連動して更新する

---

## 役割定義

### phase

開発全体の現在地を示す。

どの段階にいるかを表す。

### plan

一定期間で進める重点テーマを示す。

何を前に進めるかを表す。

### operations

plan を前に進めるための短期実行管理を示す。

今週何をやるか、今日は何をやるか、進捗はどうかを表す。

---

## 関係

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
```

---

## 配置方針

### phase

以下で管理する。

```text
docs/05_roadmap.md
```

### plan

以下で管理する。

```text
notes/plans/
```

### operations

以下で管理する。

```text
notes/operations/
```

---

## 判断理由

- phase は全体進行の現在地なので docs が自然
- plan は中期の重点テーマで流動性があるので notes が自然
- operations は短期実行管理で頻繁に更新されるので notes/operations/ が自然

---

## operations 定義

operations は 1週間単位の開発実行計画とする。

以下を満たす。

- 今週何を進めるかを持つ
- 日付ごとの作業欄を持つ
- 各作業項目は status を持つ
- plan とリンクする
- daily report に応じて更新する

---

## 日付運用

operations は日付ごとの欄を持つ。

例

- 2026-03-27
- 2026-03-28
- 2026-03-29
- 2026-03-30

日付欄は、その日に扱う作業の枠とする。

---

## status 方針

status は日付単位ではなく、項目単位で持つ。

採用する status は以下とする。

- planned
- in_progress
- done
- blocked

---

## 日付欄の考え方

日付欄は、その日に扱う作業の枠とする。

各項目は以下を持つ。

- status
- 必要なら plan 参照
- daily report 後の更新対象

---

## plan と operations の関係

- plan と operations は別物とする
- ただし親子関係でつなぐ
- plan が上位とする
- operations が下位とする

---

## 命名方針

operations という名前は維持してよい。

ただし意味は運用全般ではなく、週次の開発実行計画として定義する。

---

## 現時点で固まったこと

- phase / plan / operations の責務分離
- 配置方針
- operations の週次運用
- 日付ごとの管理
- 項目単位 status
- daily report 連動

---

## 残論点

- notes/plans/ をどういう単位で持つか
- operations の週次ファイル名
- operations のテンプレート
- plan と operations のリンク表現

---

## 位置づけ

本整理は、標準開発フロー自動化の前提となる計画系レイヤー設計である。

phase / plan / operations の混線を避け、以後の運用設計と instruction 反映の土台とする。
