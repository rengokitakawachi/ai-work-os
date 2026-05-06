# 2026-04-03 Notes Delete Allowed Prefixes Decision

## 決定事項

`src/services/repo-resource/notes.js` の `DELETE_ALLOWED_PREFIXES` は以下とする。

```js
const DELETE_ALLOWED_PREFIXES = [
  '00_inbox/',
  '01_issues/',
  '02_design/',
  '03_plan/',
  '04_operations/',
  '05_decisions/',
  '08_analysis/',
  '09_content/',
];
```

---

## 決定日

2026-04-03

---

## 理由

notes の各レイヤーを
「進行中に整理・統合・置換されうるレイヤー」と
「履歴・再開・保管を優先するレイヤー」に分けて考える。

削除を許可するのは、
開発進捗に応じて整理し直したり、
統合・置換・再編が起こりうるレイヤーとする。

削除を許可しないのは、
履歴の保持、
再開起点の維持、
実績記録の保全、
保管先としての役割を優先するレイヤーとする。

---

## 許可するレイヤー

### 00_inbox

未整理入力の入口であり、
誤投入、再整理、移設が起こりやすい。

### 01_issues

issue の統合、
誤登録の削除、
整理し直しが起こりうる。

### 02_design

docs 直前の草案であり、
更新・置換・削除が発生しやすい。

### 03_plan

開発進捗に応じて
重点テーマや計画を見直す可能性がある。

### 04_operations

短期実行順の正本だが、
rolling 更新、
計画の置換、
単一運用ファイル化などに伴う整理需要がある。

### 05_decisions

意思決定ログだが、
統合後の旧記録や不要化した判断メモを整理する余地がある。

### 08_analysis

横断確認や分析メモであり、
一時的・補助的な性格が強い。

### 09_content

将来の記事執筆や発信のための素材、
ネタ、
記事ドラフトの蓄積レイヤーであり、
再整理や統合作業が起こりやすい。

---

## 許可しないレイヤー

### 06_handover

スレッド再開の起点であり、
再開可能性を優先して保全する。

### 07_reports

daily / monthly の実績記録であり、
履歴として残すことを優先する。

### 10_logs

補助ログや失敗記録の蓄積先であり、
履歴保持を優先する。

### 99_archive

退避先であり、
削除より保管を優先する。

---

## 前提条件

- 現行 notes 構造は indexed path を採用している
- `exploration` と `backlog` は repo から削除済みである
- delete 許可範囲は「中核かどうか」ではなく「整理・統合・置換の可能性」で判断する
- delete 非許可範囲は「正本かどうか」だけでなく「履歴保全の必要性」でも判断する

---

## 影響範囲

- `src/services/repo-resource/notes.js`
- 今後の notes delete API 運用
- `docs/10_repo_resource_api.md` の更新時の補足判断

---

## 保留事項

- `05_decisions` を今後も delete 許可に含め続けるか
- `04_operations` の運用が単一ファイル化された後も delete 許可を維持するか
- `09_content` を将来より厳格な保管レイヤーに変更するか
