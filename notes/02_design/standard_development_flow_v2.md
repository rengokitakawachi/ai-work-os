# Standard Development Flow v2

## 目的

未整理入力から実行・仕様確定までの一連の流れを統一し、
思考・判断・実行を分離しながら一貫した開発プロセスを実現する。

---

## 全体フロー

inbox  
↓  
intake routing  
↓  
archive（同一構造で移動）  
↓  

routing による分岐  

A: 今やる  
  → issue  
  → design  
  → operations候補生成  

B: 今やらない  
  → future  

C: 役目終了  
  → archive  

↓  

operations rolling（順位づけ）  

↓  

実行  

↓  

docs / code  

---

## レイヤー構造

### inbox

未整理入力の入口。

- web（外部情報）
- dev_memo（内部思考）

---

### issue

問題・課題を保持するレイヤー。

---

### design

解決方法を定義するレイヤー。

---

### operations

実行対象を管理するレイヤー。

---

### future

未来に関係する要素を保持するレイヤー。

構造:

future/
  inbox/
  issue/
  design/
  plan/

定義:

- `future/inbox/`
  - 未整理だが未来の開発に関係しそうな情報
- `future/issue/`
  - 未来に対応予定の課題
- `future/design/`
  - 未来に対応予定の設計
- `future/plan/`
  - 未来に実行予定の計画

future の要素は現時点では active ではないが、
将来 active に移行する可能性を前提とする。

---

### archive

過去の状態を保持するレイヤー。

- active のスナップショットとして保存
- 実行対象ではない
- 再活性化対象でもない（参照専用）

---

## intake routing

### 役割

未整理入力を再構成し、適切なレイヤーへ振り分ける。

---

### 処理フロー

1. 読取
2. チャンク分解
3. テーマ統合
4. 1テーマ1メモ生成
5. source_ref 付与
6. 保存先判定
7. inbox 後処理

---

### 判定ロジック

1. 問題か  
  → issue候補  

2. 設計対象か  
  → design候補  

3. 今やるか  
  → yes: issue / design  
  → no: future  

---

## issue routing

issue を plan / operations / design / future / archive へ送る。

必要に応じて、

- 論点分解
- 類似論点統合
- 1テーマ1判断単位への再構成

を行う。

---

## operations 候補生成

operations 候補は、単一ルートではなく複数の流入元から生成される。

主な流入元:

- plan
- issue
- design
- dev_memo
- 会話
- review

補足:

- issue / design は主要な流入元だが、それだけに限定しない
- plan 直結の短期実行候補もある
- review による再配置や、会話・dev_memo 起点の候補化もありうる

---

## operations rolling

収集した候補を優先順位で並べ、7日枠に入るものを active_operations とする。

フロー:

operations 候補収集  
↓  
優先順位づけ  
↓  
7日枠に入るもの  
= active_operations  

残りの上位候補  
= next_operations  

---

## future 再活性化

### inbox 系

future/inbox  
↓  
intake routing 再実行  
↓  
issue / design / future  

### issue / design 系

future/issue または future/design  
↓  
issue routing または design review / routing再判定  
↓  
plan / operations / design / future / archive  

### plan 系

future/plan  
↓  
weekly / monthly review  
↓  
active plan / 継続 / archive  

---

## review の役割

review は進行中資産の見直しと再判定を担う。

- daily review: operations 更新
- weekly review: plan / operations / future 調整
- monthly review: roadmap / phase 整合
- design review: design の継続 / 昇格 / future / archive 判断

---

## source_ref

出自追跡のための参照情報。

---

## archive の原則

- スナップショットとして保存する
- 内容は変更しない
- 参照専用とする

---

## archive の禁止事項

- archive から直接作業しない
- archive を active として扱わない
- archive に新規思考を書かない

---

## 基本原則

- routing と review を分離する
- issue / design を直接実行しない
- operations のみ実行対象とする
- inbox は常に空に戻す

---

## 補足

issue:
何が問題か

design:
どう解くか

operations:
何をやるか

future:
未来に関係する要素を保持する
