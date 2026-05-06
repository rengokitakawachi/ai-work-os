# 2026-04-27 Branch Selector Write Probe

## Purpose

Confirm runtime explicit branch write behavior for `repoResourceWrite`.

## Probe

- resource: notes
- action: create
- branch: main
- expected resolved branch: main

## Result

This file exists only to confirm that an explicit branch-scoped write can be created and read back through repoResource actions.

## Status

probe-created
