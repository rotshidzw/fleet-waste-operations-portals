$ErrorActionPreference = "Stop"

docker compose build public-web
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

docker compose build intranet
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

docker compose up
