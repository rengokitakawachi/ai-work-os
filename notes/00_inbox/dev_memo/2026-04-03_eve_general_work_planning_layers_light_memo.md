# EVE 一般業務版に 3階層 planning を持たせたいメモ（軽量）

## 位置づけ

roadmap / plan / operations の3階層は、開発用に整理しているが、一般業務にもかなり相性がよさそう。  
ただし今は深掘りしない。将来の設計論点として軽く残しておく。

---

## 現時点の仮説

- roadmap = 上位方針 / 到達したい状態
- plan = 一定期間またはテーマ単位の中期計画
- operations = 直近の実行順

この分離は開発に限らず、一般業務でも使える可能性が高い。

---

## なぜ残すか

- 一般業務を扱う EVE に planning 機能を持たせるときの核になりそう
- 今の開発用 3階層を、そのままではなく抽象化して再利用できるかを後で見たい
- Todoist / Outlook / review 系と接続すると強い可能性がある
- ただし今は roadmap docs 更新や bulk 論点の方が優先なので、先に進みすぎない

---

## 今は決めないこと

- 一般業務版 roadmap の正式 schema
- plan の unit 設計
- operations と Outlook 連携の詳細
- EVE instruction や docs への正式反映

---

## 後で見ればよい論点

- 開発計画の 3階層と一般業務 planning の共通部分
- roadmap / plan / operations を EVE の汎用 planning model にできるか
- review とどう接続するか
- Outlook / Todoist とどこで接続するか

---

## 当面の扱い

- issue として残す
- 今は深掘りしない
- roadmap docs 更新など、直近優先タスクを先に進める
