# Deployment Guide (VPS + Docker + Nginx)

## 1) Provision the VPS

- Ubuntu 22.04 LTS recommended
- Open ports: 80, 443

## 2) Install Docker + Compose

```bash
sudo apt-get update
sudo apt-get install -y docker.io docker-compose-plugin
sudo usermod -aG docker $USER
```

## 3) Clone and configure

```bash
git clone <repo-url> njilo-portal
cd njilo-portal
cp .env.example .env
```

Update `.env` with:

- `DATABASE_URL`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`

## 4) Start services

```bash
docker compose up --build -d
```

## 5) Nginx reverse proxy

Example Nginx config:

```nginx
server {
    server_name njiloconsulting.co.za;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

server {
    server_name intranet.njiloconsulting.co.za;

    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## 6) SSL

Use Certbot for TLS:

```bash
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d njiloconsulting.co.za -d intranet.njiloconsulting.co.za
```
