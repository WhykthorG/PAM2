# PAM2 Workspace Guide

This repository contains multiple standalone Expo / React Native projects, each under its own folder. Treat each project as an independent app unless you are explicitly working at the workspace root.

## Where to work

- Start by identifying the target app before editing files.
- Read the nearest project-level instructions first, especially any `AGENTS.md`, `CLAUDE.md`, or app-specific README in the same folder.
- Keep changes scoped to the selected app; do not change unrelated projects in the same workspace.

## Project layout

- `2bimestre/` — React Native / Expo exercises and examples
- `3bimestre/` — navigation and multi-screen examples
- `4bimestre/` — larger combined project samples
- `aula-07-27/` — classroom app examples
- `README.md` — root notes for the course / setup context

## Coding conventions

- Prefer the conventions already used in the target app, especially component naming, folder structure, and file organization.
- For Expo projects, check the project package version and use the matching Expo docs before making framework-level changes.
- When adding or editing app code, favor the existing app-local structure instead of creating cross-project abstractions.
- Keep examples simple and educational; avoid introducing unnecessary tooling or architecture changes.

## Common commands

Most app folders are standard Expo projects and can usually be run with:

- `npm install`
- `npx expo start`
- `npm run web` for browser previews

Use the project-local `package.json` as the source of truth for scripts and dependencies.

## Before making changes

1. Identify the exact project folder you are editing.
2. Read that app's local instructions and package setup.
3. Confirm whether the request is app-specific or workspace-wide.
4. Keep edits minimal and consistent with the app's existing pattern.

## Useful references

- [README.md](README.md)
- [2bimestre/react/exemplo/README.md](2bimestre/react/exemplo/README.md)
- [2bimestre/react/exemplo/AGENTS.md](2bimestre/react/exemplo/AGENTS.md)
- [3bimestre/varias_tela/AGENTS.md](3bimestre/varias_tela/AGENTS.md)

This file gives agents the repo-level context needed to find the right project without guessing.
