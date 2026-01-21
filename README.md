# Njilo Consulting & Logistics Portal Suite

Enterprise public website and intranet (CRM + operations) for Njilo Consulting & Logistics (Pty) Ltd.

## Monorepo Structure

- `apps/public-web` – Next.js public marketing site
- `apps/intranet` – Next.js intranet portal (CRM + ops)
- `packages/db` – Prisma schema + client
- `packages/config` – Shared content/data seeds
- `packages/ui` – Shared UI primitives

## Local Development

```bash
npm install
cp .env.example .env
npm run db:generate
npm run db:migrate
npm run db:seed
npm run dev
```

Public site: http://localhost:3000

Intranet: http://localhost:3001 (demo account: admin@njiloconsulting.co.za / admin123)

## Docker Compose

```bash
docker compose up --build
```

The `db-init` service runs once, installs the DB workspace dependencies, applies the Prisma schema, and seeds demo data before the apps start.

If Docker Desktop crashes or you see intermittent EOF errors during parallel builds, run the sequential build script instead:

```bash
./scripts/docker-build.sh
```

Windows PowerShell:

```powershell
./scripts/docker-build.ps1
```

## Scripts

- `npm run lint`
- `npm run typecheck`
- `npm run test`

## Deployment

See `docs/deployment.md` for VPS + Docker + Nginx guidance.

## Demo Script

See `docs/demo-script.md` for a 5-7 minute guided tour.
