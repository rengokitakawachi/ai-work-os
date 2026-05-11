# notes/logs/README.md

## 役割

`notes/10_logs` は、補助ログ、失敗記録、検証結果、再発防止メモを置くレイヤーである。

同じ失敗を繰り返さないための知識蓄積を目的とする。

---

## 位置づけ

- notes layer であり、docs SSOT ではない
- operations の代替ではない
- issue routing / design routing の代替ではない
- runtime behavior の確認結果は保存できるが、runtime の正本ではない

---

## ここに残すこと

- 試したこと
- うまくいかなかったこと
- 再発防止メモ
- 暫定対応
- validator / runtime fixture の検証結果
- tool call の失敗と解釈
- ADAM 自身の判断ミス / 回帰 / 修正履歴

---

## ADAM bug fix log

ADAM 自身の不具合・回帰・修正履歴は以下を参照する。

- 集約台帳: `notes/10_logs/adam_bug_fix_log.md`
- 運用方法: `notes/10_logs/adam_bug_fix_log_operating_method.md`

### 記録対象

ADAM の以下の事象は bug fix log 対象とする。

- 以前できていたことが急にできなくなった回帰
- instruction / knowledge 圧縮や再層化で失われた挙動
- review / routing / rolling / handover / report 作成での手順漏れ
- tool call の失敗解釈ミス
- SSOT / projection / view の混同
- branch / canonical / runtime の混同
- report / docs / operations の保存先・形式ミス
- 修正済みだが再発観測が必要なもの

### 記録だけで終わらせないもの

以下は log に残すだけで完了にしない。

- 実行が必要なもの → operations candidate
- 仕様化が必要なもの → issue / design / docs update candidate
- 恒久ルール化が必要なもの → instruction / docs / knowledge placement 判断
- runtime behavior が前提のもの → runtime fixture / read-back confirmation

### Review での確認条件

Daily / weekly review では、以下のいずれかに該当する場合に bug fix log を確認する。

- 当日 ADAM 自身のミス・回帰・誤判定があった
- active task が bug / regression / guardrail / validator / report quality に関係する
- issue touch 対象が bug fix log と接続している
- weekly review で再発防止・instruction反映候補を確認する
- completed task の closure evidence が runtime / validator 修正である

---

## 書き方

個別ログは、可能な限り以下を含める。

```md
status:
severity:
category:
observed_at:
reported_by:

symptom:
impact:
root_cause:
fix_applied:
remaining_risk:
recurrence_prevention:
linked_refs:
next_disposition:
```

---

## 注意

- log が存在するだけでは completed ではない
- report 作成は review 完了の代替ではない
- issue routing は log への記録では完了しない
- runtime fixture の成功と repo 更新は別物として扱う
- tool call 失敗時に、読めた / 書けた / 削除できたふりをしない
