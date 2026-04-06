# MOOD

Open-source demo project: a journaling app with **AI-generated mood insights** and a **mood trends** chart.

- **Live app**: `https://mood-chi-lac.vercel.app/`
- **Status**: Work in progress (passion/learning project)

## Features

- Journal entries (create/edit/list)
- Async AI analysis (summary, mood score, feedback)
- Mood trends chart
- Authentication via Clerk

## Stack

- Next.js 16 (App Router, Cache Components), React 19
- Tailwind CSS 4
- Postgres + Prisma
- Vercel AI SDK + OpenAI
- Testing: Vitest + Testing Library (+ axe checks), Playwright (smoke e2e)

## Local development

### Prerequisites

- Node.js 20+
- Postgres database
- Clerk app (publishable + secret keys)
- OpenAI API key

### Install

```bash
npm install
```

### Configure environment

Create `.env` (never commit secrets):

- `DATABASE_URL`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `OPENAI_API_KEY`

Optional Clerk URLs (recommended):

- `NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in`
- `NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up`
- `NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/new-user`
- `NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/new-user`

### Database

```bash
npx prisma migrate dev
```

### Run

```bash
npm run dev
```

Open `http://localhost:3000`.

## Local deployment (production mode)

```bash
npm run build
npm run start
```

## Tests

```bash
npm test
```

Playwright (requires browser install once):

```bash
npx playwright install
npm run test:e2e
```

> For e2e, run the app first (`npm run dev`) or set `PLAYWRIGHT_BASE_URL`.

## Notes

- Uses user-scoped cache tags + `updateTag()` to keep the journal list and chart consistent.
- `turbopack.root` is pinned in `next.config.ts` to avoid wrong root inference when a parent folder contains an extra lockfile.

## License

MIT. See `LICENSE`.
