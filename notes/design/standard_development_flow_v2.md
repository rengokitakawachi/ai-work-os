# Standard Development Flow v2

## 目的

未整理入力から実行・仕様確定までの一連の流れを統一し、
思考・判断・実行を分離しながら一貫した開発プロセスを実現する。

---

## 全体フロー

inbox  
↓  
intake review  
↓  
archive（同一構造で移動）  
↓  
分岐  

A: 今やる  
  → issue  
  → design  
  → operations  

B: 今やらない  
  → future  

C: 役目終了  
  → archive  

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

将来フェーズの保持レイヤー。

構造:

future/
  inbox/
    web/
    dev_memo/
  issue/
  design/

---

### archive

過去の状態を保持するレイヤー。

- active のスナップショットとして保存
- 実行対象ではない
- 再活性化対象でもない（参照専用）

構造:

archive/
  inbox/
    web/
    dev_memo/
  issue/
  design/
  operations/

---

## intake review

### 役割

未整理入力を構造化し、適切なレイヤーへ分配する。

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

## source_ref

出自追跡のための参照情報。

---

## operations 生成

issue / design を実行可能なタスクへ変換する。

---

## future 再活性化

future  
↓  
再活性化トリガー  
↓  
intake review（再実行）  
↓  
issue / design / operations  

---

## archive の原則

- active / future と同一構造を持つ
- パス構造を維持したまま移動する
- 内容は変更しない（スナップショット）

---

## archive の禁止事項

- archive から直接作業しない
- archive を active として扱わない
- archive に新規思考を書かない

---

## 基本原則

- レイヤーを混在させない
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
今やらない
