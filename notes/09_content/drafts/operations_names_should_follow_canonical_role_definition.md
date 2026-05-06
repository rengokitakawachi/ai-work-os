# operations names should follow canonical role definition

operations の名称変更は、先に語感で決めるのではなく、
正本構造と責務定義を揃えてから行うべき。

今回見えた本質は、
`standby_operations` か `next_operations` かという名前の問題より前に、
`docs/15_notes_system.md` と `docs/16_operations_system.md` で
operations 定義が二重化していたこと。

学び:
- naming より canonical definition が先
- external projection（Todoist）と結びつく名前は、API / UI 仕様確認後に決めるべき
- repo の本当の破綻点は「名前」ではなく「責務の二重定義」

記事化できる論点:
- 名前を変える前に、何の責務を持つ層かを固定する
- 構造が揃っていない状態での naming 議論はノイズを増やす
- 正本統一 → 外部連携確認 → 命名、の順が安全
