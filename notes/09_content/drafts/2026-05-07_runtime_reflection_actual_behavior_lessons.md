# 2026-05-07 runtime reflection actual behavior lessons

## status

draft

## source

- `notes/07_reports/daily/2026-05-07.md`
- `notes/10_logs/2026-05-07_delta_runtime_fixture_active_next_guard_failure.md`
- `notes/10_logs/2026-05-07_delta_active_next_heading_guard_fix.md`
- `notes/10_logs/2026-05-07_delta_main_source_read_confirmation_resolved.md`

## draft theme

Schema が見えることと、実際に安全に動くことは違う。

## key points

- Repository test PASS は必要だが、runtime actual behavior の代替ではない。
- configured GPT Action schema を更新しても、runtime-visible schema と actual behavior は別に確認する必要がある。
- `deltaResourceWrite` が見えることと、壊れた operations を拒否できることは別である。
- `# Next operations:` だけを検出する validator は、`# Next operations` や `## Next operations` のような自然な variant を見逃す。
- production file に対する破壊的 fixture は避け、disposable branch で actual behavior を確認する方が安全。
- source availability も gate の一部である。validator が正しくても、roadmap / plan / daily history が main になければ reverse-planning gate は閉じられない。
- ATLAS はテスト担当、ADAM は修正担当という分担を明確にしたことで、事故後の責務混線を避けられた。

## possible article outline

1. Problem: tests pass but runtime gate is still open
2. Four layers to separate:
   - repo code / tests
   - configured Action schema
   - runtime-visible schema
   - actual behavior
3. Why negative fixtures matter
4. Why branch-safe runtime tests matter
5. Source files are also part of readiness
6. Controller / tester role separation
7. Operational checklist

## excerpt candidate

「schema が更新された」は、まだ安全性の証明ではない。  
実際の production runtime がその schema を見ているか、壊れた入力を拒否できるか、正しい入力を通せるか、そして必要な source files を読めるか。  
この4層を分けて確認しないと、テスト済みのはずのシステムが本番では簡単に壊れる。

## next use

- runtime reflection procedure の docs / knowledge 更新候補
- ADAM / ATLAS 役割分担の説明素材
- future article draft
