# Project guide

This is the one-page, static SvelteKit syllabus for Ben Welsh's Fall 2026 SVA
course, Truth-Telling 101: Artists Meet Data Journalism. It is separate from
the CUNY course site. Keep this guide current when the project structure changes.

## Content

- Edit course facts and public-facing copy in `src/content/homepage.yaml`.
- Keep all six Monday dates visible. Do not invent weekly topics, assignments,
  guest dates, or headshots. A week link belongs in the YAML only after its
  matching `src/content/weeks/week-N.svx` page is ready.
- Do not add student information, enrollment figures, or classroom door codes.
- Link to the official SVA listing for registration, location, and policies.

## Code and design

- Use Svelte 5, TypeScript, the existing static build, and MDsveX for future
  weekly pages. Keep the site small; no backend or deployment workflow is set up.
- The SVA mark and Ringside/Sentinel fonts are used with permission and are not
  part of the MIT source-code license. Keep the SVA color and type tokens in
  `src/app.css`. The hero has no illustration.
- Preserve keyboard access, readable contrast, mobile layout, and print styles.
- `BASE_PATH` and `VITE_CANONICAL_URL` remain configurable until a host is chosen.

## Checks

Run `pnpm lint`, `pnpm build`, and `pnpm test` after code changes. The browser
tests use a local static preview; install Chromium once with
`pnpm exec playwright install chromium`. Run pre-commit when hooks are set up.
Lighthouse is available with `pnpm lighthouse` when Chrome is installed.
