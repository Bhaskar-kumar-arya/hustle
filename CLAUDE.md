# hustle — repo guide

Two things live in this repo:

1. **The leads engine** — Bangalore business scraper + CRM + outreach tooling. See [`PROJECT_CONTEXT.md`](./PROJECT_CONTEXT.md) and [`SHOWCASE_TEMPLATES_STRATEGY.md`](./SHOWCASE_TEMPLATES_STRATEGY.md).
2. **Client website builds** — paid client work, one folder per client under [`clients/`](./clients/), with the site output under [`websites/`](./websites/).

## ⚠️ If this session is about building the Akshaya Dental website

**Read [`clients/akshaya-dental/00-START-HERE.md`](./clients/akshaya-dental/00-START-HERE.md) first and follow it exactly.**

That build is deliberately split across many short sessions, because the *work* doesn't fit in one context window. The docs do — read them all. `00-START-HERE.md` tells you which session is next, what its scope is, and what to update before you finish.

Do not start editing files under `websites/akshaya/` without doing that first.

## Active client builds

| Client | Docs | Output | Status |
| :--- | :--- | :--- | :--- |
| Akshaya Multispeciality Dental Clinic (Hulimavu, Bengaluru) | [`clients/akshaya-dental/`](./clients/akshaya-dental/) | [`websites/akshaya/`](./websites/akshaya/) | In build |

## Conventions

- Client site builds are static HTML/CSS/JS — no frameworks, no build step, no CMS unless a client doc says otherwise.
- The leads-engine app (`server.js`, `src/`, `public/`) and client builds (`websites/`) are independent. Changes to one should not touch the other.
