# 16 Governance

## 目的

AI Work OS の一貫性を維持する

---

## 基本原則

1
SSOTはdocsのみ

2
実装はdocsに従う

3
AIは必ずdocsを先に読む

4
docs更新は差分最小

5
notesは補助レイヤー

---

## 更新順序

notes
→ docs
→ code

---

## AI更新ルール

1 docsを読む  
2 notesを確認  
3 不整合検出  
4 修正生成  
5 docs更新  
6 commit  

---

## 禁止事項

・docs未確認で実装  
・notesを正本扱い  
・大規模な一括書き換え  

---

## 設計方針

・APIは薄く  
・ロジックはservice層  
・責務分離  

---

## 判断基準

迷った場合

docsを優先
