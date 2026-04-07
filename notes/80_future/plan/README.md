# notes/80_future/plan/README.md

## 役割

将来実行する計画を保持するレイヤー。

今は active plan ではないが、
将来の phase や後続条件成立後に戻す plan を置く。

---

## ここで扱うもの

- deferred な plan
- phase 順序上まだ早い plan
- 前提条件待ちの plan
- 将来再開予定の plan

---

## 原則

- active plan と混在させない
- operations へ直接落とさない
- future/plan は review で再評価する
- 役目を終えたものは archive へ送る

---

## 戻し方

future/plan
→ weekly / monthly review
→ active plan / 継続 / archive

---

## 補足

future/plan は、
保留中の plan を寝かせる場所ではなく、
時間軸上でまだ先にある plan を保持する場所とする。
