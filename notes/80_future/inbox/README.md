# notes/80_future/inbox/README.md

## 役割

将来向け未整理入力を保持するレイヤー。

今は active に上げないが、
将来の開発や検討に関係する可能性がある入力を置く。

---

## ここで扱うもの

- 将来フェーズ向けの未整理入力
- 今は解釈しすぎたくない入力
- 前提条件待ちのため active 化しない入力
- 将来参照する可能性がある raw input

---

## 原則

- issue / design / plan に無理に上げない
- ただし捨てない
- future/inbox は未整理のまま保持してよい
- active に戻すときは intake routing を再実行する

---

## 戻し方

future/inbox
→ intake routing 再実行
→ issue / design / plan / future / archive

---

## 補足

future/inbox は「今やらない箱」ではなく、
将来扱う可能性がある未整理入力の保持場所とする。
