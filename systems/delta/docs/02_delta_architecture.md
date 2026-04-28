# Delta Architecture

## System boundary

Delta is a domain system under `systems/delta/`.

## Resource layout

```text
systems/delta/
├─ docs/
├─ roadmap/
├─ plan/
├─ operations/
├─ history/
├─ review/
├─ resources/
└─ config/
```

## Common boundary

Common should remain thin and domain-neutral.

Delta-specific learning policy belongs in Delta config and future Delta adapter logic.

## Initial implementation

The MVP is markdown-first.

Dedicated `system-resource` API is a later step after manual operation validates the required access pattern.
