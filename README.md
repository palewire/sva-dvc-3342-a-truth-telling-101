# Truth-Telling 101 syllabus

A one-page, static SvelteKit syllabus for Ben Welsh’s Fall 2026 School of Visual
Arts continuing-education course. It follows the reference course site's
SvelteKit, YAML, and MDsveX approach, but is a separate project with its own
copy and appearance. No deployment is configured.

The official SVA mark and locally bundled Ringside and Sentinel webfonts are
used with permission. These brand and font assets are not covered by the MIT
source-code license.

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
`pnpm lighthouse`. None of these checks publish the site.

## Edit the syllabus

All course facts and page copy live in src/content/homepage.yaml. Change the
course introduction, six schedule entries, guest names and links, instructor
bio, and official listing there. Do not put student details or a classroom door
code in this public file.

The six schedule entries may have an optional href. Leave it out while a week
is unpublished; the page then shows its date and topic as plain text. The
build rejects an href unless the matching MDsveX file exists. Guest cards use
initials until Ben supplies or authorizes photos. To add an approved photo,
put it at static/speakers/filename.jpg and add photo: filename.jpg to that
guest's entry in the YAML file. A failed image also falls back to initials.

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

## Choose a URL later

The root build uses an empty BASE_PATH. If the eventual site lives below a
path, set BASE_PATH without a trailing slash when building, for example
BASE_PATH=/courses/truth-telling-101. Internal links and the favicon follow
that path. After Ben chooses the public URL, set VITE_CANONICAL_URL to the full
homepage URL, including its path and trailing slash. Until then, canonical
metadata is omitted.

The repository is [palewire/sva-dvc-3342-a-truth-telling-101](https://github.com/palewire/sva-dvc-3342-a-truth-telling-101).
There are no hosting credentials, production deployment workflow, or fixed
public URL in this project. Choose the URL and host before adding those settings.
