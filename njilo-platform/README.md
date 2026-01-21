# Njilo Platform (Monorepo)

Enterprise-grade public website + private intranet, built for local-first development.

## Stack
- TypeScript + Next.js (App Router)
- Tailwind CSS + Framer Motion
- PostgreSQL (Docker) + Prisma
- NextAuth (Credentials provider)
- pnpm workspace monorepo

## Quickstart (Windows / Docker Desktop)

```bash
pnpm i
```

```bash
docker compose up -d
```

```bash
pnpm db:migrate
```

```bash
pnpm db:seed
```

```bash
pnpm dev
```

- Public site: http://localhost:3000
- Intranet: http://localhost:3001

Demo intranet login:
- Email: admin@njilo.local
- Password: Welcome123!

## Environment
Copy the example files and update as needed:

```bash
cp .env.example .env
cp apps/public-web/.env.example apps/public-web/.env
cp apps/intranet/.env.example apps/intranet/.env
cp packages/db/.env.example packages/db/.env
```

## Troubleshooting
- Ensure Docker Desktop is running and ports 5432/5050 are available.
- If migrations fail, run `docker compose down -v` and retry.
- When updating Prisma schema, re-run `pnpm db:migrate`.

## One-command local run

```bash
pnpm i && docker compose up -d && pnpm db:migrate && pnpm db:seed && pnpm dev
```
