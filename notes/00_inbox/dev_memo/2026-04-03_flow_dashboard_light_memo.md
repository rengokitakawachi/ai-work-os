# flow dashboard メモ（軽量）

## 位置づけ

`flow check` の次段として、目詰まり状況を見える化する dashboard があると強そう。  
flow check が点検なら、dashboard は可視化レイヤー。

---

## 何を見たいか

- inbox の未整理件数
- dev_memo の滞留件数
- issue の未routing件数
- plan に対して operations へ未接続の件数
- operations の未完了過多
- future の放置件数
- stale なファイルや長期停滞論点
- reports / handover の更新状況

---

## これは何か

- flow check = ざっと点検して、何を流すべきか指摘する
- dashboard = 全体の流れの健康状態を継続的に見える化する

運用管理画面というより、AI Work OS の health panel に近い。

---

## 当面の考え方

- いきなり dashboard を作るのではなく、先に flow check の検知観点を固める
- その後、何を signal として見せるかを決める
- dashboard は flow check の可視化層として育てる

---

## 当面の扱い

- 今は issue と dev memo に残す
- docs / design への昇格は後で判断する
- ADAM / EVE 共通の将来論点として保持する
