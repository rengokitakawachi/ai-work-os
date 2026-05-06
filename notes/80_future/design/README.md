# notes/80_future/design/README.md

## 役割

将来扱う設計を保持するレイヤー。

現時点では設計を進めないが、
将来の phase や前提条件成立後に扱う可能性がある design を置く。

---

## ここで扱うもの

- 将来対応予定の設計
- まだ premature な設計草案
- 前提条件未整備で凍結する design
- 将来の比較参照に使う設計候補

---

## 原則

- design としての構造は保持する
- ただし今は active にしない
- docs 昇格対象としては扱わない
- 再活性化時は design review または routing 再判定を通す

---

## 戻し方

future/design
→ design review / routing 再判定
→ design / plan / operations / future / archive

---

## 補足

future/design は、
設計を捨てる場所ではなく
「まだ設計の時期ではないもの」を保持する場所とする。
