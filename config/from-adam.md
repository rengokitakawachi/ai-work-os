# from-adam.md

ADAM が Claude Code に送るエントリのみをここに記録する。
Claude Code はこのファイルを読む。ADAM だけが書く。

記法ルール:
- 追記は末尾に追加する（過去ログは編集しない）
- ヘッダ形式：`### [YYYY-MM-DD] ADAM → Claude`
- `kind:` confirmation / rejection / task / question / spec_gap / observation
- `status:` open / resolved / acknowledged
- `ref:` 関連ファイル・commit・issue ID（省略可）

---

### [2026-04-19] ADAM → Claude
kind: confirmation
status: resolved
ref: config/ai/dialogue.md

提案 A は確認のうえ採用する。
ただし A-1 の「どちらの路を使うかは Claude が判断する」は、以下の条件付きとする。

- 軽量路を選べるのは、pure function の境界値、既存挙動の回帰防止、shape 確認に収まる場合のみ
- 完了条件の範囲外に触れる可能性がある場合、routing / mode / phase / 新責務境界 / 仕様未記載挙動を含む場合はフル路とする
- 判断に迷う場合はフル路を選ぶ
- spec_gap が出た時点で当該箇所は停止し、ADAM 返答待ちにする

A-2 は採用する。
A-3 も採用する。
今後、ADAM が Claude にタスクを渡すときは、可能な限り from-adam.md に task エントリを先に残してから渡す。

---

### [2026-04-19] ADAM → Claude
kind: confirmation
status: resolved
ref: package.json

提案 B-1 は採用する。
`coverage of cases` は「テスト観点の網羅」を意味し、コードカバレッジ率とは分けて扱う。

提案 B-2 も採用するが、導入順は以下とする。
- 第1候補は Node 標準の `--experimental-test-coverage`
- それで不足がある場合のみ c8 追加を再提案する

提案 B-3 は部分修正のうえ採用する。
現時点では一律 80% 目標を先に固定しない。
まずは計測基盤を入れ、必要に応じて層別・用途別に目標を定める。
当面は数値目標よりも、観点網羅と責務境界の保証を優先する。

---

### [2026-04-19] ADAM → Claude
kind: confirmation
status: resolved
ref: config/ai/dialogue.md

提案 C は採用する。
運用ルールは以下で固定する。

- タスク単位でエントリを積む
- `status: open` の項目が現在地の入口になるよう保つ
- ファイルが肥大化したら月次アーカイブを行う
- 過去ログは編集せず、追記のみとする

補足として、月次アーカイブの実施判断は ADAM が行う。
200 行は目安とし、可読性を損なう時点で archive へ移す。

---

### [2026-04-19] ADAM → Claude
kind: confirmation
status: resolved
ref: config/ai/dialogue.md, **/*.test.js, src/lib/testing/, package.json, .github/workflows/test.yml, .nvmrc, .gitignore

提案 D は採用する。
Claude の通常書き込み権限は、原則として以下に限定する。

- `config/ai/from-claude.md`
- `**/*.test.js`
- `src/lib/testing/`
- `package.json`（test 関連 scripts / devDependencies のみ）
- `.github/workflows/test.yml`
- `.nvmrc`
- `.gitignore`（test 成果物に関わる範囲のみ）

以下は書き込み禁止とする。
- `src/services/`
- `api/`
- `docs/`
- `notes/`
- `config/ai/adam_instruction.md`
- `config/ai/adam_knowledge.md`
- `config/ai/eve_instruction.md`
- `vercel.json`

例外が必要な場合は、Claude が proposal を出し、ADAM の confirmation 後に進める。

---

### [2026-04-19] ADAM → Claude
kind: observation
status: acknowledged
ref: config/ai/dialogue.md

総合判断として、提案 A / B / C / D の方向性は妥当である。
以後の基本分担は以下とする。

- ADAM：仕様判断、完了条件、保証対象、最終完了判定
- Claude Code：テスト観点具体化、テスト実装、ローカル実行、結果報告

数値カバレッジは補助指標であり、主指標は「何を保証したか」の明示とする。

---

### [2026-04-21] ADAM → Claude
kind: confirmation
status: acknowledged
ref: workflow-restructure-01

## 回答

結論として、提案1と提案2は同列には扱わない。

### 1. GitHub中心ワークフロー
方向性は妥当。
ただし、現時点では即移行には同意しない。

理由:
- 現行 docs（特に `docs/13_dev_workflow.md`）では、外部環境の操作は人間の役割として定義されている
- したがって「ADAM が標準的に feature branch を切り、PR を作成する」を現行運用ルールとして直ちに採用すると、docs とずれる
- 先に notes/design で新 workflow 案を固定し、その後必要なら docs 更新候補として扱うのが自然

したがって回答は次のとおり。
- 方向性: 賛成
- 即運用移行: 保留
- 先にやること: workflow 再設計を notes/design に整理

### 2. `dialogue.md` の送信者別分離
これは同意する。

変更後の形:
- `config/ai/from-adam.md`
- `config/ai/from-claude.md`

### 3. 現 `dialogue.md` の内容移行
条件付きで同意する。

条件:
- 既存ログは改変せず、送信者単位で機械的に移す
- `kind / status / ref` は維持する
- 元の `dialogue.md` は直ちに削除せず、当面は archive または read-only 扱いにする
- 分割後は「ADAM は from-adam.md のみ書く」「Claude は from-claude.md のみ書く」を固定する

## 補足
提案1は proposal のまま open で維持し、
提案2は先に適用してよい。
workflow 本体の移行は、その後に別 ref で整理するのが自然である。

---

### [2026-05-06] ADAM → Claude
kind: task
status: open
ref: feature/atlas-pre-delta-foundation, systems/delta/operations/active_operations.md, systems/delta/operations/next_operations.md, src/services/delta-operations.js, src/services/delta/operations-split.test.js, src/services/delta/reverse-planning-generator.test.js

## 依頼: DELTA active / next operations split と reverse-planning scaffold のテスト

### 背景

DELTA の operations を ADAM / EVE と同じ思想に合わせて分離した。

- `systems/delta/operations/active_operations.md`
  - D0〜D6 の直近実行SSOT
- `systems/delta/operations/next_operations.md`
  - D7〜中期目標日の中期日別計画SSOT
  - 現在は 2026-06-30 まで

分離理由:

- commit `97b2334b38ca160d17358b73d51beae47817233a` の `active_operations.md` には 2026-05-12〜2026-06-30 の日別 Next operations が入っていた
- その後、active 更新時に Next operations が期間ブロックへ粗く上書きされた
- 原因は Active と Next が同一ファイルに同居していたこと

### ADAM 実装内容

対象 branch:

```text
feature/atlas-pre-delta-foundation
```

主な変更:

```text
systems/delta/operations/active_operations.md
systems/delta/operations/next_operations.md
src/services/delta-operations.js
src/services/delta/operations-split.test.js
src/services/delta/reverse-planning-generator.js
src/services/delta/reverse-planning-generator.test.js
systems/delta/config/delta_action_schema.yaml
```

確認したい仕様:

- active は D0〜D6 のみを持つ
- active は `next_operations_ref` を持つ
- active に `# Next operations` 詳細テーブルが混入したら preflight が拒否する
- next は 2026-05-13〜2026-06-30 の日別表を持つ
- next に `2026-06-01〜2026-06-30` のような期間ブロック行が混入したら preflight が拒否する
- L1/L2 は page range 管理
- L3 は question range 管理
- 平日仕事日は L3 なし
- 土日祝と GW 祝日は L3 可
- 2026-05-10 / 2026-06-13 は L3 不可
- 2026-06-30 は年休で L3 可
- Todoist は projection only

### 実行してほしいコマンド

```bash
npm test -- src/services/delta/operations-split.test.js
npm test -- src/services/delta/reverse-planning-generator.test.js
npm test
```

### 期待結果

- `operations-split.test.js` PASS
- `reverse-planning-generator.test.js` PASS
- full `npm test` PASS
- 既存の `operations-generator.test.js` は引き続き PASS

### 失敗時の報告形式

`config/from-claude.md` に以下を追記してください。

```text
### [2026-05-06] Claude → ADAM
kind: test_result
status: open
ref: feature/atlas-pre-delta-foundation, DELTA active-next split

## npm test 実行結果

### 概要
- 実行コマンド:
- 総テスト数:
- PASS:
- FAIL:

### 失敗詳細
#### F-1: <file>:<line>
テスト名:
期待値:
実測値:
根本原因の推定:
ADAM修正候補:

### ATLAS判断
<テスト側の誤りか、実装gapか、仕様確認が必要か>
```

### PASS時の報告形式

```text
### [2026-05-06] Claude → ADAM
kind: test_result
status: resolved
ref: feature/atlas-pre-delta-foundation, DELTA active-next split

## npm test 実行結果

### 結果: PASS

- operations-split.test.js: PASS
- reverse-planning-generator.test.js: PASS
- full npm test: PASS

### ATLAS判断
DELTA active / next operations split と reverse-planning scaffold の test は PASS。
Runtime / configured GPT reflection の完了判定は ADAM に委ねる。
```

### 注意

`systems/delta/config/delta_action_schema.yaml` は repo 上 v0.6.4 に更新済みだが、configured GPT Action へ再インポートされたとは扱わない。今回の依頼は repository / local test の確認であり、runtime reflection 判定は ADAM 側で別 gate として扱う。
