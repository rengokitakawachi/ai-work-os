# 2026-04-18 daily_review_output_to_content_and_operations_connection_rule

## 目的

daily review の出力から、

- `07_reports/daily`
- `09_content/drafts`
- `04_operations`

への接続ルールを整理する。

本メモは、

- report を保存して終わりになりやすい
- content 抽出が会話依存になりやすい
- operations rolling との接続点が曖昧

という状態を減らし、
review と routing の責務分離を保ったまま
daily review の出力運用を安定させることを目的とする。

---

## 結論

daily review の最小接続順は次とする。

```text
当日の実績確認
↓
candidate source 確認
↓
operations reroll
↓
operations 更新
↓
Todoist projection 更新
↓
daily report 保存
↓
content 抽出
```

重要なのは次の 4 点である。

1.
**candidate source 確認を先に閉じる**

2.
**operations reroll と operations 更新を report より先に閉じる**

3.
**report は review の結果物であり、rolling の代替ではない**

4.
**content は report から派生する素材抽出であり、review 本体ではない**

---

## なぜこの順か

### 1. operations が短期実行順の正本だから

daily review の主要責務は、
翌日以降の実行順を更新することにある。

したがって、
report を先に保存しても、
operations が更新されていなければ
review は閉じていない。

### 2. candidate source 確認が reroll の前提だから

reroll は、
何を候補源として比較したかが曖昧だと
局所的な並べ替えに崩れやすい。

そのため、
daily review では先に

- plan
- open issue
- next_operations
- current active

を candidate source として確認し、
その後で reroll に入る必要がある。

### 3. Todoist は projection だから

Todoist は `04_operations` の projection であり、
reports の projection ではない。

そのため、
Todoist 同期は
report 保存後ではなく、
operations 更新後に行うのが自然である。

### 4. content は価値抽出だから

`09_content/drafts` は
review の本体レイヤーではなく、
日々の開発や学びから価値ある情報を抽出する層である。

したがって、
content 抽出は
review の結果物を素材化する後段として扱う。

---

## daily review の最小出力

daily review の最小出力は次である。

- 更新済み `active_operations`
- 更新済み `next_operations`
- 更新済み Todoist projection
- `07_reports/daily/YYYY-MM-DD.md`
- `09_content/drafts/` への抽出結果

このとき、
report だけ保存して
content や operations を未処理のままにしない。

---

## レイヤーごとの責務

### 04_operations

- 短期実行順の正本
- 完了 task / 未完了 task / 明日の実行順を反映する
- reroll の結果を保持する

### Todoist

- operations の execution projection
- daily review 後に同期する
- 正本ではない

### 07_reports/daily

- その日の実績と振り返りの記録
- review の結果物
- operations 更新後の状態を説明する

### 09_content/drafts

- report や design / issue / decision から抽出した価値素材
- 記事完成ではなく素材蓄積
- review 本体ではない

---

## content 抽出の接続点

content は、
daily report のどこからでも機械的に全文コピーするのではなく、
価値のある論点を抽出して 1トピック1ファイルで残す。

抽出元として特に見るのは次である。

- `重要な意思決定`
- `学び / 気づき`
- `未解決 / リスク`
- `次のアクション`

ただし、
`次のアクション` をそのまま content にする必要はない。

content 化すべきなのは、

- 再利用価値がある
- 他日に参照価値がある
- note 記事素材になりうる

ものに限る。

---

## operations rolling との関係

daily review では、
rolling を report から生成しない。

正しくは、

- 当日の実績
- 現行 operations
- plan
- open issue
- next_operations

を見て reroll を行い、
その結果を `04_operations` に反映する。

その後で、
report は
「何が変わったか」「なぜそうなったか」を記録する。

つまり、

```text
report → rolling
```

ではなく、

```text
candidate source 確認 → rolling → operations 更新 → report
```

である。

---

## report に残すべきこと

daily report では少なくとも次を残す。

- 今日の成果
- 重要な意思決定
- 学び / 気づき
- 未解決 / リスク
- 次のアクション

ただし、
次のアクションは
operations 正本の代替ではない。

reports に書いた next action があっても、
正本は `04_operations` にある。

---

## content 抽出の最小ルール

### 抽出するもの

- 他日にも参照価値がある判断
- 一般化できる学び
- note 記事素材になりうる論点

### 抽出しないもの

- 単発の status だけ
- operations task 名の写し
- その日だけ意味がある細片

### 形式

- 1トピック1ファイル
- 完成を目指さない
- 1行でもよい
- 後から統合前提

---

## daily review 完了条件との関係

`2026-04-03_review_system_operating_spec.md`
にある通り、
daily review の最低完了条件には

- candidate source 確認
- reroll
- active / next 更新
- Todoist projection 更新
- daily report 保存
- content 保存

が含まれる。

したがって、
接続順を曖昧にせず、
少なくとも次を順に閉じる必要がある。

1.
candidate source 確認

2.
operations reroll

3.
operations 更新

4.
Todoist projection 更新

5.
report 保存

6.
content 保存

---

## routing との分離

content 抽出は routing ではない。

理由は次である。

- issue / design / future への送付先判定をしない
- 未整理入力を構造化する処理ではない
- review の結果物から価値素材を抜く後段だから

同様に、
daily report も routing ではない。

routing が必要な新論点が report から見つかった場合は、
別途 issue routing / conversation routing で扱う。

つまり、

- review
- report
- content
- routing

を 1 処理に混ぜない。

---

## 実運用での最小フロー

```text
1. 当日の完了 / 未完了を確認する
2. candidate source を確認する
   - plan
   - open issue
   - next_operations
   - current active
3. operations reroll を行う
4. active / next を更新する
5. Todoist projection を同期する
6. daily report を保存する
7. report から価値ある論点だけ content drafts に抽出する
```

この順なら、
review の本体と派生処理が混ざりにくい。

---

## まだ固定しないこと

現段階では次を固定しない。

- content 抽出の自動判定条件
- 1日あたり何本 content を作るか
- reports から issue / design を自動再生成するルール
- content と decisions の連動保存ルール

まずは接続順と責務分離だけを固定する。

---

## 判断

daily review の出力接続は、

- candidate source 確認
- operations
- Todoist projection
- report
- content

の順を守るのが自然である。

このとき、

- report は review の結果物
- content は report 等からの素材抽出
- rolling は report の前に閉じる
- routing は別 usecase

として分離する。

このルールを固定すれば、
daily review を
「report を書いて終わり」
にせず、
operations 正本更新と content 資産化まで含めて
安定運用しやすくなる。
