# notes/80_future/issue/README.md

## 役割

将来扱う課題を保持するレイヤー。

現時点では active ではないが、
将来の phase や条件成立後に扱う可能性がある issue を置く。

---

## ここで扱うもの

- 将来対応予定の課題
- 今は優先順位が低い issue
- phase が先の issue
- 前提条件待ちの issue

---

## 原則

- issue としての意味は保持する
- ただし現時点では active にしない
- operations へ直接送らない
- 再活性化時は routing を通す

---

## 戻し方

future/issue
→ issue routing 再実行
→ plan / operations / design / future / archive

---

## 補足

future/issue は、
「消してよい課題」ではなく
「将来また判断対象になる課題」を置く場所とする。
