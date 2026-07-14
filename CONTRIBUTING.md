# Contributing to Nuxtathon Leaderboard

Thanks for your interest! This is a small Nuxt 4 app, the live leaderboard for
the Nuxt community hackathon. This guide covers local setup and the checks CI
runs.

## Requirements

- Node 22+
- pnpm 9+ (do not use npm or yarn)

## Local setup

```bash
pnpm install
pnpm dev
```

Copy `.env.example` to `.env` and fill in a GitHub token and admin credentials
(see the README for details).

## Project layout

- `app/`: pages, components, stores, composables (Nuxt srcDir)
- `server/`: Nitro API routes, middleware, and server utils
- `shared/`: types and pure helpers used by both sides
- `config/event.json`: the static event config

## Before you open a pull request

Run the same checks CI runs:

```bash
pnpm lint         # oxlint
pnpm fmt:check    # oxfmt
pnpm build        # production build
```

- Code comments are English only, use plain hyphens (no em-dashes), and explain
  intent rather than restating the obvious.
- Keep each pull request focused on one topic.

## Reporting issues

Open a GitHub issue with steps to reproduce and what you expected. Please report
anything security-related privately rather than in a public issue.
