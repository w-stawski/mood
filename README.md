# MOOD

AI-assisted journaling app built with Next.js.
Users can write entries, get asynchronous AI insights, and track mood trends over time.

- Live app: `https://mood-chi-lac.vercel.app/`
- Runtime: Next.js App Router on Vercel

## Core features

- Authenticated journal experience (Clerk)
- Create and edit entries
- Asynchronous AI analysis per entry (summary, mood score, feedback)
- Journal Q&A assistant over user entries
- Mood trend chart

## Tech stack

- Next.js 16 + React 19 + TypeScript
- Tailwind CSS 4
- Prisma + PostgreSQL (`pg` + Prisma adapter)
- Vercel AI SDK + OpenAI
- Vitest + Testing Library + `vitest-axe`
- Playwright (e2e)

## Project structure

- `src/app` - App Router pages/layouts
- `src/actions` - server actions (entry CRUD, async analysis workflows)
- `src/components` - shared UI components
- `src/utils` - DB/auth/AI/helper modules
- `prisma` - data model and migrations

## Getting started

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment

Create `.env` (do not commit secrets):

- `DATABASE_URL`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `OPENAI_API_KEY`

Recommended Clerk URL settings:

- `NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in`
- `NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up`
- `NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/new-user`
- `NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/new-user`

### 3) Run database migrations

```bash
npx prisma migrate dev
```

### 4) Start development server

```bash
npm run dev
```

Open `http://localhost:3000`.

## Scripts

- `npm run dev` - run local dev server
- `npm run build` - production build
- `npm run start` - run production server
- `npm run lint` - ESLint
- `npm test` - run Vitest once
- `npm run test:ui` - run Vitest in watch/UI mode
- `npm run test:e2e` - run Playwright tests

## Testing

Unit/integration:

```bash
npm test
```

End-to-end:

```bash
npx playwright install
npm run test:e2e
```

## Performance notes

- Uses Cache Components and user-scoped cache tags.
- Server actions call `updateTag()` to refresh cached journal/chart data after writes.
- `optimizePackageImports` is enabled for heavier UI libraries.
- `turbopack.root` is explicitly pinned in `next.config.ts` to avoid wrong workspace-root inference.

## Accessibility notes

- Skip-to-content link is available globally.
- Async status updates use polite live regions where applicable.
- Basic a11y checks are included via `vitest-axe`.

## Vercel deployment tips

- Keep app and database in the same region.
- Use a pooled Postgres connection string when available.
- Set required secrets in Vercel project environment variables.
