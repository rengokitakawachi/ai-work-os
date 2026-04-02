# notes/03_plan/README.md

## 役割

plan は、一定期間で進める重点テーマを示すレイヤーである。

今の phase において、何を前に進めるかを整理する。

phase の下位、operations の上位に位置づける。

---

## 位置づけ

- phase は docs で管理する
- plan は notes で管理する
- operations は notes で管理する
- plan と operations は分ける
- ただし分断ではなく、上位下位でリンクさせる

---

## 役割分離

### phase

開発全体の現在地を示す。

どの段階にいるかを表す。

### plan

一定期間で進める重点テーマを示す。

今の phase で何を前に進めるかを表す。

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

## ここで扱うもの

- 一定期間で進める重点テーマ
- phase に対して今どこを前進させるか
- operations に落とす前の中位計画
- 今期 / 今フェーズの推進対象

---

## 原則

- plan は短期の実行管理そのものを持たない
- 今日や今週の実行順は operations を正本とする
- 仕様草案そのものは design に書く
- plan は一定期間の重点テーマを保持する
- operations は plan にリンクする

---

## 保存先

```text
notes/03_plan/
```

---

## 残論点

- plan をどういう単位で持つか
- ファイル命名をどうするか
- operations とのリンク表現をどうするか
- テンプレートをどうするか

上記は design で今後具体化する。
