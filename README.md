# Truth-Telling 101 syllabus

A one-page, static SvelteKit syllabus for Ben Welsh’s Fall 2026 School of Visual
Arts continuing-education course. It follows the reference course site's
SvelteKit, YAML, and MDsveX approach, but is a separate project with its own
copy and appearance. No deployment is configured.

The official SVA mark and locally bundled Ringside webfonts are used with
permission. These brand and font assets are not covered by the MIT source-code
license.

## Work locally

Use Node.js 24 and pnpm 11.

```sh
pnpm install
pnpm dev
pnpm lint
pnpm build
pnpm exec playwright install chromium
pnpm test
```

Run pre-commit install once in a new checkout to enable the same lint checks
before commits.

The static output is in build/. With no published week files, it contains only
the syllabus page and static assets. The CI workflow checks lint, build,
browser tests, and Lighthouse scores; CodeQL and Dependabot are also enabled.
To run the optional local Lighthouse check, install Chrome and use
`pnpm lighthouse`.

Pushes to `main` also run the deployment workflow. It builds with
`BASE_PATH=/docs/truth-telling-101` and
`VITE_CANONICAL_URL=https://palewi.re/docs/truth-telling-101/`, then uploads
`build/` to the S3 prefix in the `DOCS_AWS_BASE_PATH` repository variable. The
workflow requires the `DOCS_AWS_ACCESS_KEY_ID`, `DOCS_AWS_SECRET_ACCESS_KEY`,
`DOCS_AWS_REGION`, and `DOCS_AWS_BUCKET` repository secrets. Cloudflare routing
for the public URL is configured separately from this repository.

## Edit the syllabus

All course facts and page copy live in src/content/homepage.yaml. Change the
course introduction, six schedule entries, guest names and links, instructor
bio, and official listing there. Do not put student details or a classroom door
code in this public file.

The six schedule entries may have an optional href. Leave it out while a week
is unpublished; the classroom scripts section then presents it as unavailable.
The build rejects an href unless the matching MDsveX file exists. To add an
approved guest photo, put it in static/speakers/ and add its filename to the
guest's entry in the YAML file.

## Publish a week later

Create a real lesson file such as src/content/weeks/week-1.svx. Its frontmatter
must include a title and week number; a summary is optional:

```md
---
title: 'A confirmed lesson title'
summary: 'A short description of the published lesson'
week: 1
---

## Lesson notes

Write the actual student-facing content here.
```

The existing MDsveX route publishes only files present in src/content/weeks/.
When the lesson is ready, update week 1's topic in homepage.yaml and add
href: /weeks/week-1/ to its schedule entry. Then run pnpm lint and pnpm build.
Do not add empty lessons merely to make the dates clickable.

## Public URL

The production site is built for
`https://palewi.re/docs/truth-telling-101/`. Local builds use an empty
`BASE_PATH` unless it is supplied explicitly. Internal links, assets, canonical
metadata, and social-share metadata follow the configured production path.

The repository is [palewire/sva-dvc-3342-a-truth-telling-101](https://github.com/palewire/sva-dvc-3342-a-truth-telling-101).
