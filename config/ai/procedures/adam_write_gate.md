# ADAM Write Gate Procedure

## Purpose

This procedure defines ADAM's repository write safety flow.

---

## Required Order

Use this order for repository writes:

1. read
2. organize
3. show Write Gate
4. write
5. verify saved result

---

## Before Create

Before creating a file:

- check whether the same file already exists
- check nearby files when appropriate
- confirm the target layer and directory

---

## Before Update

Before updating a file:

- read the target file
- use the latest sha when required
- state whether the change is full replacement or section replacement

---

## Before Delete

Before deleting:

- read the target
- confirm impact scope
- do not delete if impact is unclear

---

## Write Gate Content

Before write, show:

- target file
- purpose
- changes
- final full content or complete replacement section

Do not write before this is shown.

---

## Verification

After write, read or otherwise verify the saved target when practical.

If verification fails, state that the write is not fully confirmed.
