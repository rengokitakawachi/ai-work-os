## 2026-03-26

### 20260326-003
- title: notesフォルダ構造の責務ベース整理の必要性
- category: architecture
- description: notesのディレクトリ構造をフェーズではなく責務ベースで固定し、思考フローと一致させる必要がある
- context: Idea Captureや課題整理モード導入により、ideas / backlog / design / operations の役割分離が重要になった
- impact: high
- status: open
- created_at: 2026-03-26

## 2026-03-27

### 20260327-001
- title: スレッド切替後の再開フローが手動依存で重い
- category: ops
- description: ChatGPT は特定の作業種類に限らず、会話が長くなると反応が遅くなる。そのため一定のタイミングで新しいスレッドへ切り替える運用を行っている。引き継ぎ書の仕組み自体は有効だが、スレッド切替後は引き継ぎ書を読むだけでは十分ではなく、docs / notes / code を追加で読み込み全体構造を理解する必要がある。現状ではその初期読込を毎回手動で指示する必要があり、再開フローが自動化・定型化されていないことが負担になっている。加えて、ADAM が会話の肥大化を運用上の切替タイミングとして明示的に扱っておらず、適切な区切りでスレッド切替を提案する仕組みも不足している。
- context: 長いスレッドでは ChatGPT の応答が遅くなるため、作業継続のために定期的にスレッドを切り替えている。再開起点の正本は notes/handover、短期実行管理の正本は operations としたい。理想は、引き継ぎ書を読んだら必要な docs / notes / code を自動で読みに行き、全体構造を把握したうえで再開できる状態である。また、ADAM には会話肥大化を検知したら作業の区切りでスレッド切替を提案してほしい。
- impact: high
- status: open
- created_at: 2026-03-27

### 20260327-002
- title: AI instructions・schema の配置を code/config/ai/ に統一する必要がある
- category: architecture
- description: 現在、ADAM と EVE の instructions / schema はリポジトリ直下の AI/ フォルダに保存されている。ただし、AI/ 配下は現行の access path に含まれていないため、ADAM は必要時にそれらを直接参照できない。その結果、repo に現物が存在していても、運用上は現状把握や差分確認に使いにくい状態になっている。特に instruction や schema をアップデートするときに、ADAM が現在の内容を直接読めないため、更新前の確認や差分判断が手動依存になっている。
- context: 解決策としては AI/ に API を追加する案と、API がある責務領域へ移動する案があった。方針としては後者を採用し、保存先を code/config/ai/ に統一する。これにより code resource の read 経路に乗せ、更新時の標準フローを 現状読取 → 差分確認 → 草案生成 → 更新判断 に揃えたい。
- impact: high
- status: open
- created_at: 2026-03-27

### 20260327-003
- title: 課題発見から実装までの標準開発フローと判断を自動化する必要がある
- category: ops
- description: 開発フローが一貫していないため、課題、検討、設計、実装に関するファイルの置き場所や流れがぶれやすい。その結果、ファイルが散らかる、どこを見ればよいか分かりにくい、同じ確認を繰り返しやすい、作業効率が落ちるという問題が起きている。課題発見から整理、設計、仕様反映判断、実装までを毎回同じ順序で進められる標準フローを確立したい。さらに、フローが決まっているなら、課題の種類判定、保存先判定、次アクション判定も ADAM が自動で行える状態にしたい。
- context: 理想状態は、課題の種類ごとに保存先と次アクションが自動で決まり、課題発見から実装まで毎回同じ順序で進められることにある。標準フローは単なる手順書ではなく、ADAM が現在フェーズ、保存先、次アクションを判断するための実行ルールとして設計したい。
- impact: high
- status: open
- created_at: 2026-03-27

## 2026-03-28

### 20260328-001
- title: GitHub のユーザー名を個人利用前提の名前へ変更したい
- category: ops
- description: 現在の GitHub ユーザー名は `rengokitakawachi` である。これは組織名ベースで登録した名前だが、組織を離れた後も自分で継続利用する前提では、個人アカウントとしての実態と合わなくなる。そのため、今後も長く使える個人利用前提の名前へ変更したい。候補としては `santos-no-one` を想定している。また、この変更はシステムが大きくなる前に早めに行った方がよいという助言を受けている。後になるほど、GitHub ユーザー名に依存する設定、デプロイ、CI、Webhook、外部参照が増え、移行コストとリスクが高くなるためである。ただし、懸念しているのはリポジトリ URL の変化そのものではなく、変更によって既存の運用中システムや連携が壊れたり、動かなくなったりする可能性である。特に影響が心配なのは Vercel のデプロイ、GitHub Actions、外部 API / Webhook である。
- context: 過去の開発メモおよび handover から、現在の開発基盤は GitHub / Vercel / repo-resource API / GPTs Action を前提に構成されていることが分かっている。そのため GitHub ユーザー名変更は、単なる識別名変更ではなく、repo-resource、Action 接続、Vercel デプロイ、外部連携への影響確認を伴う運用変更として扱う必要がある。後回しにすると依存箇所が増えて移行難度が上がるため、早期対応候補として扱うべき課題である。
- impact: high
- status: open
- created_at: 2026-03-28

### 20260328-002
- title: notes フォルダ構造の再編方針を正式確定する必要がある
- category: architecture
- description: notes フォルダ構造が視覚的に分かりにくく、GitHub 上で目的のファイルを探す際に迷いやすい。README に定義された思考フローと実際のフォルダ構造も一致していない。中核フォルダと保留整理対象が混在しているため、標準開発フローの前提となる notes 構造を正式に確定する必要がある。
- context: 開発メモでは、issues / design / operations / handover / reports / inbox を中核にし、analysis / backlog / logs / decisions / archive は保留整理対象として扱う方向が見えている。フォルダ名そのものより、標準フローにどう接続するかを先に固定する必要がある。
- impact: high
- status: open
- created_at: 2026-03-28

### 20260328-003
- title: future レイヤーの導入と運用ルールを定義する必要がある
- category: ops
- description: inbox だけでは、今は解釈すべきでないが将来のために残したい未整理入力を扱いにくい。そのため、未来向け未整理入力を保持する future レイヤーが必要である。future は整理済み保管ではなく、将来の文脈で再解釈する前提の未整理保管として扱う必要がある。
- context: 振り分け基準には phase を使う方針が自然であり、現フェーズまたは次期フェーズに関係するものは inbox で扱い、それより先のものは future に送る方針が整理されている。future は archive と異なり、将来再活性化する前提のレイヤーである。
- impact: high
- status: open
- created_at: 2026-03-28

### 20260328-004
- title: インテークレビューを正式な運用機能として定義する必要がある
- category: ops
- description: notes/inbox/web や notes/inbox/memo などの未整理入力を、そのまま放置せず中核フローへ接続するためのインテークレビュー機能が必要である。入力を読み取り、整理し、分類し、保存先を決め、元ファイルの処理まで判断する工程を正式な運用機能として定義する必要がある。
- context: インテークレビューはファイル単位ではなく、フォルダ全体を読んで統合的に処理する方針が見えている。処理後は inbox を原則空に戻す運用とし、issue は標準開発フローへ、task は operations へ、不要なものは delete する流れを持たせたい。
- impact: high
- status: open
- created_at: 2026-03-28

### 20260328-005
- title: 1ファイルを論点チャンクに分解して 1テーマ1メモへ変換するルールが必要である
- category: architecture
- description: web や開発メモの 1 ファイル内には、複数のフェーズや複数の論点が混在することがある。そのため、ファイル単位で inbox / future / design などへ移動するだけでは不十分である。処理単位をファイルではなく論点チャンクにし、必要なら 1 ファイルを複数テーマに分解して 1テーマ1メモとして扱うルールが必要である。
- context: phase 判定や future 送りもテーマ単位で行う方が自然であると整理されている。元ファイルは原本として archive へ送る、または不要なら delete し、中核フローでは分割後のテーマメモを主に扱う方針が見えている。
- impact: high
- status: open
- created_at: 2026-03-28

### 20260328-006
- title: source_ref の適用ルールを定義する必要がある
- category: architecture
- description: 入力ファイルを論点チャンクに分割し、テーマメモを生成する場合、元の文脈や出自を失いやすい。そのため、各テーマメモがどの元ファイル・元入力から切り出されたかを示す source_ref を導入し、どのレイヤーで必須にするかを定義する必要がある。
- context: source_ref は Obsidian 的なノート間参照に近いが、通常の関連リンクより出自追跡の意味が強い。特に issue / design / future への派生や再解釈において有効であり、複数由来の統合テーマでは複数の source_ref を持つことも自然である。
- impact: medium
- status: open
- created_at: 2026-03-28

### 20260328-007
- title: 旧開発メモフォルダを新フォルダ構成へ移行する必要がある
- category: architecture
- description: 旧開発メモの保存先として使っていた `notes/exploration/memo` を、新しい方針である `notes/inbox/memo` へ移行する必要がある。現在は旧構造と新構造が混在しており、開発メモの入口と運用ルールが一貫していない。そのため、未整理入力の入口を inbox に統一する方針と整合するように、既存メモの移行計画と実施が必要である。
- context: 新運用では未整理入力の入口を inbox に統一したい一方、旧運用では exploration/memo に開発メモを置いていた。新旧構造が併存すると保存先判断とレビュー運用がぶれるため、棚卸し・移行・旧参照更新・旧構造の廃止判断まで含めた移行課題として扱う必要がある。
- impact: high
- status: open
- created_at: 2026-03-28

## 2026-03-29

### 20260329-001
- title: operations を weekly_tasks.md の単一継続更新ファイルとして運用するルールが必要である
- category: ops
- description: operations を週ごとにファイル分割するよりも、`notes/operations/weekly_tasks.md` のような単一ファイルを継続更新し、常に今日から7日程度の短期実行タスクを管理する方式の方が現運用に合っている可能性が高い。そのため、週次ファイル名とテンプレートを設計するのではなく、単一継続更新ファイルとしての命名、期間、日付欄、完了項目の残し方、daily report との役割分離を定義する必要がある。
- context: operations について議論した結果、週次分割ファイルは切替コストがあり、今ほしいのは履歴よりも「今から7日を見る実行面」であると整理された。`current.md` より `weekly_tasks.md` の方が役割が分かりやすく、weekly は週ごとのファイル分割ではなく、ローリングな7日管理を意味する名称として使う方針が見えている。
- impact: medium
- status: open
- created_at: 2026-03-29
