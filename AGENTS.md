# Repository Guidelines

## Project Structure & Module Organization

This repository currently contains the Forge One charter as a Markdown-first project.

- `Charter-of-ForgeOne.md`: canonical bilingual charter for Forge One.
- `DESIGN.md`: machine-readable and human-readable design system for the landing page.
- `AGENTS.md`: contributor and agent operating guide.
- `.git/`: repository metadata; do not edit directly.

If source code is added later, place application code under `src/`, tests under `tests/` or colocated as `*.test.*`, and static assets under `assets/`. Keep top-level documents reserved for project-wide guidance, governance, and onboarding.

## Build, Test, and Development Commands

There is no package manager or build system configured yet. Use these commands for the current repository:

- `git status`: inspect local changes before editing.
- `git diff -- Charter-of-ForgeOne.md AGENTS.md`: review document changes.
- `sed -n '1,160p' Charter-of-ForgeOne.md`: preview document structure in the terminal.
- `npm run design:lint`: validate `DESIGN.md` structure and tokens.

When adding tooling, commit the manifest and document the exact commands here, for example `npm test`, `pnpm lint`, or `make build`.

## Coding Style & Naming Conventions

Use Markdown for repository documentation. Keep headings descriptive, use sentence case where practical, and prefer short paragraphs or bullets over dense prose. Preserve the charter’s bilingual style when editing `Charter-of-ForgeOne.md`; do not remove Chinese or English context unless the change is explicitly scoped that way.

Name documentation files with clear title case or established uppercase convention, for example `Charter-of-ForgeOne.md` and `AGENTS.md`. Use ASCII punctuation in new contributor docs unless editing existing bilingual content that already uses non-ASCII text.

## Testing Guidelines

No automated tests exist yet. For documentation changes, manually check Markdown rendering, heading hierarchy, links, and bilingual formatting. If code is introduced, add a test command and keep tests close to the behavior they verify. Prefer explicit test names that describe expected behavior, such as `creates_agent_review_record`.

## Commit & Pull Request Guidelines

Current history only shows `first commit`, so no detailed convention is established. Use concise, imperative commit messages such as `Add contributor guide` or `Update charter governance section`.

Pull requests should include a short summary, the reason for the change, affected files, and screenshots only when visual rendering matters. Link related issues or decisions when available. For charter edits, call out any semantic changes separately from wording or formatting changes.

## Agent-Specific Instructions

Treat the charter as the source of truth for project philosophy. Keep edits narrow, preserve organizational memory, and document any new workflow or automation so future human and AI contributors can replay the decision context.

Before changing visual style, read `DESIGN.md` and keep `styles.css` aligned with its tokens, tone, and component guidance. Do not introduce dominant black backgrounds, purple gradients, decorative orbs, or generic SaaS styling.
