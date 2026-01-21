# Njilo Platform (Monorepo)

Enterprise-grade public website + private intranet, built for local-first development.

## Stack
- TypeScript + Next.js (App Router)
- Tailwind CSS + Framer Motion
- PostgreSQL (Docker) + Prisma
- NextAuth (Credentials provider)
- pnpm workspace monorepo

## Quickstart (Windows / Docker Desktop)

### Prerequisites (Windows)
- Install **Node.js 20+** (LTS recommended).
- Install **pnpm**: `corepack enable` then `corepack prepare pnpm@9.12.2 --activate`.
- Install **Docker Desktop** and ensure it is running.

### What you need to add
Create local environment files from the examples and set values:
- `.env` (repo root): update `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`.
- `apps/public-web/.env`: set `DATABASE_URL` (used by server actions).
- `apps/intranet/.env`: set `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`.
- `packages/db/.env`: set `DATABASE_URL`.

You can keep the default local database values if you use the provided Docker Compose config.

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
- Ensure Docker Desktop is running and ports 5433/5050 are available (Postgres now maps to 5433).
- If migrations fail, run `docker compose down -v` and retry.
- When updating Prisma schema, re-run `pnpm db:migrate`.
- If you see `Environment variable not found: DATABASE_URL`, make sure `packages/db/.env` exists (and `.env` if you use root-level env values).
- If you see `dotenv is not recognized`, re-run `pnpm i` or use the updated scripts that no longer require dotenv-cli.
- If you see `P1000: Authentication failed`, ensure your `.env` `DATABASE_URL` matches the `POSTGRES_USER`/`POSTGRES_PASSWORD` in `docker-compose.yml`, then run `docker compose down -v` and retry.
- If you're still blocked on `P1000`, confirm the database is accepting connections: `psql postgresql://njilo:njilo_password@localhost:5433/njilo_platform` (install PostgreSQL client tools if needed).

## Optional additions
- Replace placeholder media in `apps/public-web/public/media/stock` with real assets.
- Update `apps/public-web/public/media/asset-manifest.json` to match new files.
- Update `PGADMIN_DEFAULT_EMAIL` in `docker-compose.yml` to your preferred email if desired.

## One-command local run

```bash
pnpm i && docker compose up -d && pnpm db:migrate && pnpm db:seed && pnpm dev
```
