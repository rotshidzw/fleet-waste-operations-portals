#!/bin/sh
set -e

if [ -n "$DATABASE_URL" ]; then
  npx prisma db push --schema /app/packages/db/prisma/schema.prisma
  npm --workspace packages/db run seed
fi

exec "$@"
