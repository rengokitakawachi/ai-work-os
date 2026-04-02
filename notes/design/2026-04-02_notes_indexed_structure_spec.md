# 2026-04-02 Notes Indexed Structure Spec

## 目的

notes フォルダの中核構造を、GitHub 上で見て理解しやすい形へ整理する。

フォルダ名にインデックス番号を付与することで、
役割の違いだけでなく、どの順で参照・運用するレイヤーかを視覚的に把握できる状態を作る。

本設計は、notes 構造整備、移行マッピング、docs 差分整理の前提となる design 草案とする。

---

## 背景

現状の notes は運用上かなり発達している一方で、
以下の問題が残っている。

- GitHub 上でフォルダの並びが責務順に見えにくい
- 旧構造と新運用が混在している
- ideas / issue / design / operations / reports / handover / content の関係が README だけでは読み取りにくい
- notes の現行実態が docs/15_notes_system.md に十分反映されていない

また、過去の議論では番号付き構造案が出ていたが、
その時点では現行運用の全体像が固まっておらず、以下が未反映だった。

- notes/plans/
- ideas → issues の再編方針
- notes/handover/
- notes/reports/
- notes/content/
- exploration の縮小方針

そのため、現行実態を反映した番号付き構造をあらためて設計し直す必要がある。

---

## 結論

- notes の中核フォルダにはインデックス番号を付与する
- 番号は厳密な時系列ではなく、「運用上の参照順 + 主責務順」を表す
- 主線は inbox → issues → design → plans → operations とする
- decisions は design / operations に近い判断レイヤーとして中盤に置く
- handover と reports は運用継続を支える独立レイヤーとして後段に置く
- analysis は横断確認レイヤーとして content より前に置く
- content は発信用素材レイヤーとして analysis の後ろに置く
- logs は補助レイヤーとして後段に置く
- archive は最終段に置く
- exploration は中核から外し、縮小・凍結寄りで扱う
- ideas は将来的に issues へ寄せる

---

## インデックス番号の意味

番号は以下を表す。

1. 日常運用で上から読むと理解しやすい順序
2. 思考と実行の流れを壊さない責務順
3. GitHub 上で中核フォルダを先に視認できる並び

したがって、番号は「厳密な処理ステップ番号」ではない。

たとえば handover は毎回の主線には入らないが、
再開時の重要度が高いため中核フォルダとして固定する。

reports、analysis、content も思考主線そのものではないが、
運用上の価値が高いため独立番号を持たせる。

---

## 採用構造案

```text
notes/
  00_inbox/
  01_issues/
  02_design/
  03_plans/
  04_operations/
  05_decisions/
  06_handover/
  07_reports/
  08_analysis/
  09_content/
  10_logs/
  99_archive/
```

---

## 各フォルダの役割

### 00_inbox

未整理入力の入口。

内容:
- web
- dev_memo
- 一時入力

役割:
- まだ構造化していない入力を受ける
- intake review 前の一次置き場
- 原則として滞留させず、後で空に戻す

---

### 01_issues

課題、問題、違和感、改善論点を保持するレイヤー。

役割:
- 何が問題かを保持する
- design や operations へ接続する起点になる
- 現在の notes/ideas/idea_log.md の思想を将来的に吸収する

補足:
- 当面は ideas と issue が混在していてもよい
- ただし設計上の正式名称は issues に寄せる

---

### 02_design

仕様草案と構造整理のレイヤー。

役割:
- docs 直前の草案を置く
- 保存先設計、運用ルール設計、移行設計を行う
- docs 更新前の論点整理を行う

---

### 03_plans

中期の重点テーマと計画を置くレイヤー。

役割:
- phase の下位、operations の上位に位置づく
- 一定期間で何を前進させるかを示す
- short term の実行管理ではなく、重点テーマの束を置く

補足:
- unit は今後さらに具体化する
- ただし phase / plan / operations の責務分離自体は確定とする

---

### 04_operations

短期実行順の正本。

役割:
- 今週何をやるか
- 直近の着手順
- 短期の優先順位管理

補足:
- issue / design を直接実行しない
- operations は「今やるもの」に限定する

---

### 05_decisions

意思決定ログのレイヤー。

役割:
- なぜその判断をしたかを残す
- design と docs の間で失われやすい判断理由を保持する
- 後続の運用変更や docs 更新時の根拠を残す

補足:
- 現状は薄いが、構造上は design / operations に近い中核記録として扱う

---

### 06_handover

スレッド再開用の引き継ぎレイヤー。

役割:
- 会話スレッドを切り替えた後の再開起点
- セッションの状態サマリ
- 関連 docs / notes / code への接続起点

補足:
- 通常運用の主線ではないが、再開運用では重要度が高い
- そのため独立フォルダとして中核扱いにする

---

### 07_reports

daily / monthly のレポートレイヤー。

役割:
- 実績と振り返りの蓄積
- operations 更新の入力
- 月次集約の土台

構成:
- daily
- monthly

---

### 08_analysis

横断的な分析や整合チェックのレイヤー。

役割:
- docs と code の整合確認
- notes 運用の横断評価
- 一時的な監査メモ

補足:
- 主線そのものではないが、archive ほど遠くない補助レイヤーとして置く

---

### 09_content

発信用素材、記事ドラフト、外部価値化の素材レイヤー。

役割:
- 日々の設計・実装・振り返りから記事素材を蓄積する
- 完成原稿ではなく draft 素材を保持する
- decision_log / case_study と将来的に接続可能な位置に置く

補足:
- 現時点では docs 未反映の運用先行レイヤー
- 今後 formalize 対象とする

---

### 10_logs

失敗、実装メモ、運用ログのレイヤー。

役割:
- 一時的なログ
- 失敗記録
- 補助的な運用履歴

補足:
- 主線や中核記録より補助度が高いため後段に置く

---

### 99_archive

非アクティブ化した過去情報の保存先。

役割:
- 参照専用のスナップショット
- 現役運用から外れたものの保管
- active レイヤーとは明確に分離する

---

## exploration の扱い

exploration は中核フォルダから外す。

理由:
- 未整理入力の入口は inbox に寄せたい
- exploration は意味が広く、責務が曖昧になりやすい
- 現在は inbox/dev_memo と design の間に自然に吸収されつつある

方針:
- 新規保存先としては使わない
- 既存内容は段階的に inbox/dev_memo、issues、design へ寄せる
- 完全廃止ではなく、移行期間中は凍結寄りで扱う

---

## ideas → issues 方針

現行の ideas は、実態としては「思いつき」より「課題ログ」に近い。

そのため、正式設計上は issues へ寄せる。

方針:
- 正式名称は issues を採用する
- 既存の idea_log は当面維持してよい
- ただし構造整理の文脈では issue レイヤーとして扱う
- rename やファイル移設は別フェーズで行う

---

## 現行運用との対応

現行の中核運用は以下に対応付ける。

```text
notes/inbox/                → 00_inbox/
notes/ideas/                → 01_issues/ に将来統合
notes/design/               → 02_design/
notes/plans/                → 03_plans/（新設または整理対象）
notes/operations/           → 04_operations/
notes/decisions/            → 05_decisions/
notes/handover/             → 06_handover/
notes/reports/              → 07_reports/
notes/analysis/             → 08_analysis/
notes/content/              → 09_content/
notes/logs/                 → 10_logs/
notes/archive/              → 99_archive/
notes/exploration/          → 中核外、縮小・凍結対象
```

---

## 移行原則

- いきなり一括 rename しない
- 先に設計とマッピングを固める
- docs 差分整理より先に notes 構造の前提を明文化する
- 旧フォルダは移行期間中に参照可能状態を維持する
- create / update / delete は段階的に行う
- 実運用を止めないことを優先する

---

## 非対象

本設計では以下は確定しない。

- 実際の rename 実行順
- 各フォルダ配下の詳細テンプレート
- plans の具体的 unit 設計
- weekly tasks テンプレート
- source_ref の詳細仕様
- intake review の正式仕様
- future レイヤーの正式導入

これらは後続タスクとして扱う。

---

## この設計で固定すること

この時点で固定するのは以下。

- notes にインデックス番号を付与する方針
- 番号の意味
- 中核フォルダの並び順
- issues / design / plans / operations / decisions / handover / reports / analysis / content / logs の位置づけ
- exploration を中核から外す方針
- archive を最終段に置く方針

---

## 次のアクション

1. notes の現行運用構造をこの構造案に照らして明文化する
2. plans / issues / exploration / content の未確定点を洗い出す
3. フォルダ移行マッピングを統合文書として整理する
4. docs/15_notes_system.md と notes/README.md の差分を洗い出す
5. docs 更新草案へ接続する
