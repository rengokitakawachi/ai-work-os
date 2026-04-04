# 05_roadmap.md

## 目的

本ドキュメントは、AI Work OS / EVE の上位開発計画を定義する。

roadmap は AI Work OS / EVE 全体の進化段階を示す上位計画とする。

plan は roadmap を一定期間やテーマ単位に落とした中期計画とする。

operations は今すぐ進める短期実行順とする。

本ロードマップは、
Phase 0 で共通 operating model を整備し、
その上で EVE を段階的に成立させるための開発フェーズを整理し、
roadmap → plan → operations の階層を安定運用するための上位方針を示す。

---

## 前提 / 定義

EVE は、実行、予定、戦略、知識、通知をつなぐシステムとする。

roadmap は AI Work OS / EVE の大きな到達段階を示す。

plan は roadmap の一部を具体化した中期計画とする。

operations は短期実行順の正本とする。

GitHub は構造的正本の基盤とする。

docs は仕様の正本とする。

notes は補助情報とする。

code は実装資産とする。

Todoist は execution view として扱う。

MindMeister は strategy / structure view として扱う。

Obsidian は knowledge layer として扱う。

Outlook は schedule の正本として扱う。

Teams はプロジェクトメンバーへの通知チャネルとして扱う。

Phase 0 は、EVE の実行系機能を本格的に前進させる前に、AI Work OS 全体に共通する operating model を整備する段階とする。

Phase 1 以降は、Phase 0 の共通骨格の上で EVE の実行系と外部接続を前進させる段階とする。

EVE は Outlook 上の予定を確認し、
空き時間を把握したうえで、
優先順位づけしたタスクを当てはめたスケジュール案を提示する。

承認されたスケジュール案は Outlook に書き込む。

Obsidian は Phase 1 または Phase 2 の段階から限定的に利用してよい。

ただし、knowledge layer としての本格連携は Phase 3 で扱う。

deferred なテーマは future レイヤーへ退避しうる。

completed / superseded / split 元など、
役目を終えたものは archive レイヤーへ退避する。

---

## 基本原則

- roadmap は AI Work OS / EVE 全体の上位計画として扱う
- roadmap → plan → operations の順で具体化する
- 各 phase は役割の違いが分かるように分離する
- 先に共通 operating model を整備する
- 次に EVE の最小運用を成立させる
- その後に正本と view の分離を進める
- knowledge layer の本格連携は基盤成立後に進める
- 拡張は基盤成立後に進める
- 未確定の将来像は広めに書き、過度に固定しない
- 正本と view の役割を混線させない
- review を通じて roadmap / plan / operations の整合を保つ

---

## 階層

roadmap
↓
plan
↓
operations

- roadmap は docs で管理する
- plan は notes/03_plan で管理する
- operations は notes/04_operations で管理する

---

## 開発フェーズ

### Phase 0: Common Operating Model Foundation

目的

ADAM の開発を通じて、
AI Work OS 全体に共通する operating model を整備する。

範囲

- intake routing の位置づけ整理
- issue routing の位置づけ整理
- roadmap / plan / operations の3階層整理
- routing と review の責務分離
- handover を入口にした再開構造の整理
- docs / notes / code / operations の正本関係整理
- ADAM 固有要素と EVE 共通骨格の分離整理

位置づけ

この phase は、
EVE の実行系機能を本格的に進める前に、
AI Work OS 全体に共通する operating model を定義する foundation phase とする。

Phase 1 以降の EVE 実行系 plan 群は、
この共通骨格の上で進める。

完了イメージ

- intake routing / issue routing / roadmap / plan / operations / review の責務分離が説明できる
- ADAM 固有要素と EVE に展開できる共通骨格を分けて説明できる
- handover を入口にした再開構造が整理されている
- Phase 1 の EVE 実行系 plan を支える上位骨格が整っている

現在の plan

- notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md

### Phase 1: Prototype / MVP

目的

EVE の最小実行系を成立させる。

範囲

- 概念設計とアーキテクチャの確定
- Vercel API 経由での Todoist タスク登録の実装
- Todoist タスクの読み込み・一覧取得の実装
- Outlook 予定表との接続
- Outlook 上の空き時間把握
- 優先順位づけしたタスクに基づくスケジュール案提示
- 承認後の Outlook 予定書き込み
- Teams への通知
- Obsidian の限定的な利用

位置づけ

この phase は、
Phase 0 で整備した共通骨格の上で、
EVE の最小実行系を成立させる段階とする。

既存 API を使いながら、
タスク管理、予定確認、通知の最小ループを成立させる。

Todoist と Outlook を中心に、
読取、提案、承認後反映までの最小実行系を整える。

完了イメージ

- EVE から Todoist を使ってタスク登録と一覧確認ができる
- Outlook を schedule の正本として参照できる
- 空き時間を踏まえたスケジュール案を提示できる
- 承認された案を Outlook に反映できる
- Teams へ必要な通知を送れる
- Obsidian を補助的に利用できる
- 日常運用に耐える最小 MVP が成立している

現在の plan

- notes/03_plan/2026-04_phase1_todoist_outlook_foundation.md
- notes/03_plan/2026-04_phase1_schedule_proposal_and_outlook_write.md
- notes/03_plan/2026-04_phase1_teams_and_obsidian_light_use.md

### Phase 2: Canonical Source and Projection Views

目的

EVE が正本を扱い、
複数の view / projection を使い分けられる状態を作る。

範囲

- GitHub を正本として扱う構造の成立
- Todoist を execution view として扱う
- MindMeister を strategy / structure view として扱う
- Todoist 上の主要な操作結果を正本へ反映する
- Obsidian の限定利用を継続する
- 正本と各 view の責務分離を成立させる
- 正本更新と projection 更新の基本ルールを整える
- repo-resource を基盤とした正本アクセスの整理

位置づけ

この phase では、
EVE を単なる外部連携ツールではなく、
正本を中心に複数の view を扱うシステムへ進化させる。

完了イメージ

- GitHub を正本として保持できる
- Todoist は execution 用の view として利用できる
- Todoist 上の主要操作結果を正本へ反映できる
- MindMeister は戦略や構造の補助 view として利用できる
- MindMeister は正本ではなく可視化レイヤーとして扱われる
- Obsidian は限定的に併用できる
- 正本と view の責務が混線しない

### Phase 3: Knowledge Integration

目的

Obsidian の本格的な連携を導入し、
ナレッジの蓄積と活用の基礎を作る。

範囲

- Obsidian 内データとの本格連携
- ナレッジ蓄積の導線整備
- 実行結果や学びを knowledge layer に接続する
- 検索、参照、再利用の基礎を整える
- RAG 的活用の前提整理
- notes / reports / content / external knowledge の接続整理

位置づけ

この phase では、
EVE に知識の蓄積と参照の機能を加え、
単なる実行支援から思考支援へ拡張する。

完了イメージ

- Obsidian を knowledge layer として本格的に扱える
- 実行、振り返り、学びが知識として蓄積される
- 今後の RAG や高度検索の前提が整う

### Phase 4: アプリ化とさらなる拡張

目的

EVE の提供形態と利用環境を広げる。

範囲

- アプリ化を含む提供形態の拡張
- 利用環境やインターフェースの拡張
- 将来の方向に応じたプロダクト化
- より高度な分析、自動化、戦略支援への拡張

位置づけ

この phase では、
EVE をより完成度の高いプロダクトとして展開する。

完了イメージ

- アプリ化を含む拡張の方向が具体化している
- 利用環境が広がっている
- 将来のプロダクト化に耐える構造がある

---

## 外部サービスの位置づけ

### GitHub

EVE の構造的正本を保持する基盤とする。

- docs は仕様の正本
- notes は補助情報
- code は実装資産

### Todoist

execution view として扱う。

- タスク実行の操作対象
- 正本ではない
- 正本との接続対象

### Outlook

schedule の正本として扱う。

- 既存予定の確認対象
- 空き時間把握の基準
- 承認後の予定反映先

### Teams

通知チャネルとして扱う。

- プロジェクトメンバーへの通知
- 実行正本ではない
- Phase 1 では最小通知導線のみ扱う

### MindMeister

補助 view として扱う。

- 構造の俯瞰
- 関係整理
- 正本ではない
- strategy / structure を可視化する補助レイヤーとする

### Obsidian

knowledge layer の接続先として扱う。

- Phase 1 / 2 では限定利用
- Phase 3 で本格連携を扱う

---

## レビュー設計

### intake review

- 未整理入力を構造化する
- issue / design / future へ安全に振り分ける
- 現 phase / 次期 phase より先のものは future に送る
- future から active に戻すときも再度 review を通す

### daily review

- 当日の実績を確認する
- 明日の実行順を調整する
- operations を更新する
- 日報を書く

位置づけ

daily review は短期実行順の更新と記録を担う。

roadmap 自体の見直しを主目的としない。

### weekly review

- roadmap / plan / operations の整合を確認する
- 次週の方針を整理する
- active plan の継続 / 分割 / 完了 / defer / 新規化を判断する
- 80_future / 99_archive の更新判断を行う
- 週報を書く

位置づけ

weekly review は
roadmap → plan → operations を接続し直す主要 review 地点とする。

### monthly review

- daily / weekly の蓄積を集約して整理する
- roadmap の現在地を確認する
- phase の進み具合を確認する
- plan 群を整理する
- future / archive の再評価を行う
- 月報を書く

位置づけ

monthly review は roadmap の正式な見直し地点とする。

phase の現在地を確認し、
中期方針のズレを補正する場でもある。

### design review

- docs に昇格すべき design があるか確認する
- stale / 重複 / 未整理 design を整理する
- future / archive への移動候補を判断する

位置づけ

design review は monthly review の一部として実施する。

### 統合レビュー

- 戦略、実行、知識、予定、通知の各レイヤーを横断確認する
- システム上のボトルネックと改善案を整理する
- 必要に応じて roadmap / plan / operations / design の再編候補を抽出する

---

## 現在地

現在は Phase 0 を進行中とし、
Phase 1 の主要 plan 群を準備済みとする。

詳細な進捗は notes/03_plan と notes/04_operations を参照する。

---

## 未解決課題

- Todoist 一覧取得、Outlook 接続、Teams 通知をどの順で安定化するか
- Outlook 上の空き時間把握とスケジュール案生成をどう実装するか
- 承認フローをどう設計し、Outlook 書き込みと結びつけるか
- GitHub 正本と Todoist execution view の同期境界をどう設計するか
- Todoist 上のどの操作結果を正本へ反映対象とするか
- MindMeister を strategy / structure view としてどう位置づけるか
- Obsidian の限定利用をどの範囲で先行導入するか
- Obsidian を knowledge layer としてどう本格接続するか
- legacy docs API と repo-resource docs access をどう統一するか
- code bulk をどう実装するか
- bulk read の件数 / サイズ制御をどう設計するか
- source_ref をどのレイヤーまで正式反映するか
- operations → Todoist の一方向反映をどう設計するか
- 実績時間と見積時間の差分記録をどこに保持するか
- app layer を含む将来の提供形態をどう定義するか

---

## 判断基準

- AI Work OS / EVE 全体の進化段階として自然か
- roadmap と plan と operations の階層が崩れていないか
- 正本と view の役割分離が明確か
- 今すぐ必要な機能と将来の拡張が混線していないか
- review を通じた見直し運用に耐えられるか
- 将来の方向変更に耐えられるか

---

## 関連

- notes/03_plan/README.md
- notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md
- notes/03_plan/2026-04_phase1_todoist_outlook_foundation.md
- notes/03_plan/2026-04_phase1_schedule_proposal_and_outlook_write.md
- notes/03_plan/2026-04_phase1_teams_and_obsidian_light_use.md
- notes/02_design/2026-04-03_plan_layer_operating_spec.md
- notes/02_design/2026-04-03_future_layer_operating_spec.md
- notes/02_design/2026-04-03_review_system_operating_spec.md
- notes/04_operations/2026-03-26_short_term_plan.md

---

最終更新: 2026-04-04
