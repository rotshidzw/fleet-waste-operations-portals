#!/bin/sh
set -e

docker compose build public-web
docker compose build intranet
docker compose up
