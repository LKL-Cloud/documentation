---
title: Configurer un Reverse Proxy
---

Guide pour configurer Nginx comme reverse proxy et gérer plusieurs applications sur un même serveur.

## Qu'est-ce qu'un Reverse Proxy ?

Un reverse proxy est un serveur intermédiaire qui :
- Reçoit requêtes HTTP/HTTPS des clients
- Les transmet aux serveurs backend appropriés
- Retourne les réponses aux clients

**Avantages :**
- ✅ Héberger plusieurs apps sur un serveur (différents domaines/sous-domaines)
- ✅ SSL/TLS centralisé
- ✅ Load balancing
- ✅ Cache et compression
- ✅ Protection backend (ne pas exposer directement)

**Cas d'usage :**
- Application Node.js sur port 3000 → Accessible via domaine.com
- Bot Discord sur port 8080 → bot.domaine.com
- API sur port 5000 → api.domaine.com

## Installation Nginx

```bash
# Mettre à jour système
sudo apt update

# Installer Nginx
sudo apt install nginx -y

# Démarrer et activer
sudo systemctl start nginx
sudo systemctl enable nginx

# Vérifier status
sudo systemctl status nginx
```

**Tester :**

Accédez à `http://VOTRE_IP` dans navigateur. Devrait afficher page Nginx par défaut.

## Configuration de base

### Structure des fichiers

```
/etc/nginx/
├── nginx.conf              # Configuration principale
├── sites-available/        # Configs disponibles
│   ├── default
│   └── mon-site
├── sites-enabled/          # Configs actives (symlinks)
│   └── default -> ../sites-available/default
└── conf.d/                 # Configs additionnelles
```

### nginx.conf principal

```bash
sudo nano /etc/nginx/nginx.conf
```

**Configuration optimisée :**

```nginx
user www-data;
worker_processes auto;
pid /run/nginx.pid;

events {
    worker_connections 1024;
    use epoll;
}

http {
    # Basic Settings
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;
    server_tokens off;

    # Mime types
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    # Logging
    access_log /var/log/nginx/access.log;
    error_log /var/log/nginx/error.log;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml text/javascript 
               application/json application/javascript application/xml+rss 
               application/rss+xml font/truetype font/opentype 
               application/vnd.ms-fontobject image/svg+xml;

    # Include virtual hosts
    include /etc/nginx/conf.d/*.conf;
    include /etc/nginx/sites-enabled/*;
}
```

## Exemple 1 : Application Node.js

**Scénario :** App Node.js sur port 3000, accessible via `monsite.com`

### Configuration backend

**app.js :**

```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello from Node.js!');
});

app.listen(3000, 'localhost', () => {
    console.log('App running on port 3000');
});
```

:::tip Important
L'app écoute sur `localhost:3000`, pas `0.0.0.0:3000`. Nginx sera le seul point d'entrée public.
:::

### Configuration Nginx

```bash
sudo nano /etc/nginx/sites-available/monsite
```

**Contenu :**

```nginx
server {
    listen 80;
    server_name monsite.com www.monsite.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**Activer :**

```bash
sudo ln -s /etc/nginx/sites-available/monsite /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## Exemple 2 : Plusieurs applications

**Scénario :**
- Site principal : `domaine.com` → Port 3000
- API : `api.domaine.com` → Port 5000
- Admin : `admin.domaine.com` → Port 8080

### Configuration multi-apps

```nginx
# Site principal
server {
    listen 80;
    server_name domaine.com www.domaine.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}

# API
server {
    listen 80;
    server_name api.domaine.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        
        # CORS headers si nécessaire
        add_header 'Access-Control-Allow-Origin' '*';
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
    }
}

# Admin
server {
    listen 80;
    server_name admin.domaine.com;

    # Restriction IP (optionnel)
    allow 1.2.3.4;
    deny all;

    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## SSL/TLS avec Let's Encrypt

### Installation Certbot

```bash
sudo apt install certbot python3-certbot-nginx -y
```

### Obtenir certificats

**Pour un domaine :**

```bash
sudo certbot --nginx -d monsite.com -d www.monsite.com
```

**Pour plusieurs domaines simultanément :**

```bash
sudo certbot --nginx \
  -d domaine.com -d www.domaine.com \
  -d api.domaine.com \
  -d admin.domaine.com
```

**Interactif :**
- Email : votre@email.com
- Accepter TOS : Yes
- Redirection HTTP → HTTPS : 2 (Recommandé)

### Configuration après SSL

Certbot modifie automatiquement votre config :

```nginx
server {
    listen 80;
    server_name monsite.com www.monsite.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name monsite.com www.monsite.com;

    ssl_certificate /etc/letsencrypt/live/monsite.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/monsite.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Renouvellement automatique

Certbot configure automatiquement cron. Tester :

```bash
sudo certbot renew --dry-run
```

## WebSockets

Pour applications nécessitant WebSockets (Socket.IO, etc.).

```nginx
server {
    listen 443 ssl http2;
    server_name chat.domaine.com;

    ssl_certificate /etc/letsencrypt/live/chat.domaine.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/chat.domaine.com/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        
        # WebSocket headers
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Timeouts pour WebSocket
        proxy_connect_timeout 7d;
        proxy_send_timeout 7d;
        proxy_read_timeout 7d;
    }
}
```

## Load Balancing

Répartir charge entre plusieurs instances.

```nginx
upstream backend {
    # Méthode de distribution
    least_conn;  # ou ip_hash, ou round_robin (défaut)
    
    server localhost:3000 weight=3;
    server localhost:3001 weight=2;
    server localhost:3002 weight=1;
    
    # Backup server
    server localhost:3003 backup;
}

server {
    listen 443 ssl http2;
    server_name monsite.com;

    location / {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        
        # Health check
        proxy_next_upstream error timeout invalid_header http_500 http_502 http_503;
        proxy_connect_timeout 2s;
    }
}
```

## Cache avec Nginx

Améliorer performances en cachant réponses.

```nginx
# Définir zone cache
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=my_cache:10m max_size=1g 
                 inactive=60m use_temp_path=off;

server {
    listen 443 ssl http2;
    server_name api.domaine.com;

    location / {
        proxy_pass http://localhost:5000;
        
        # Cache configuration
        proxy_cache my_cache;
        proxy_cache_use_stale error timeout updating http_500 http_502 http_503 http_504;
        proxy_cache_background_update on;
        proxy_cache_lock on;
        
        # Cache headers
        proxy_cache_valid 200 302 60m;
        proxy_cache_valid 404 1m;
        add_header X-Cache-Status $upstream_cache_status;
        
        # Cache bypass
        proxy_cache_bypass $http_cache_control;
        
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## Fichiers statiques

Servir fichiers statiques directement (meilleure performance).

```nginx
server {
    listen 443 ssl http2;
    server_name monsite.com;

    root /var/www/monsite;
    index index.html;

    # Assets statiques
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # API requests vers backend
    location /api/ {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # SPA fallback
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## Sécurité

### Rate limiting

Protection contre abus.

```nginx
# Définir zone rate limit
limit_req_zone $binary_remote_addr zone=general:10m rate=10r/s;
limit_req_zone $binary_remote_addr zone=login:10m rate=3r/m;

server {
    listen 443 ssl http2;
    server_name monsite.com;

    # Rate limit général
    location / {
        limit_req zone=general burst=20 nodelay;
        proxy_pass http://localhost:3000;
    }

    # Rate limit strict pour login
    location /api/login {
        limit_req zone=login burst=5;
        proxy_pass http://localhost:3000;
    }
}
```

### Headers de sécurité

```nginx
server {
    listen 443 ssl http2;
    server_name monsite.com;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' https:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    location / {
        proxy_pass http://localhost:3000;
    }
}
```

### Restriction IP

```nginx
server {
    listen 443 ssl http2;
    server_name admin.monsite.com;

    # Whitelist IPs
    allow 1.2.3.4;
    allow 5.6.7.8;
    deny all;

    location / {
        proxy_pass http://localhost:8080;
    }
}
```

### Basic Auth

```nginx
server {
    listen 443 ssl http2;
    server_name private.monsite.com;

    auth_basic "Restricted Area";
    auth_basic_user_file /etc/nginx/.htpasswd;

    location / {
        proxy_pass http://localhost:9000;
    }
}
```

**Créer .htpasswd :**

```bash
sudo apt install apache2-utils
sudo htpasswd -c /etc/nginx/.htpasswd username
```

## Monitoring et logs

### Logs par vhost

```nginx
server {
    listen 443 ssl http2;
    server_name monsite.com;

    access_log /var/log/nginx/monsite-access.log;
    error_log /var/log/nginx/monsite-error.log;

    location / {
        proxy_pass http://localhost:3000;
    }
}
```

### Format de log personnalisé

```nginx
log_format detailed '$remote_addr - $remote_user [$time_local] '
                    '"$request" $status $body_bytes_sent '
                    '"$http_referer" "$http_user_agent" '
                    'rt=$request_time uct="$upstream_connect_time" '
                    'uht="$upstream_header_time" urt="$upstream_response_time"';

access_log /var/log/nginx/detailed.log detailed;
```

### Analyser logs

```bash
# Top 10 IPs
awk '{print $1}' /var/log/nginx/access.log | sort | uniq -c | sort -rn | head -10

# Top 10 pages
awk '{print $7}' /var/log/nginx/access.log | sort | uniq -c | sort -rn | head -10

# Codes d'erreur
awk '{print $9}' /var/log/nginx/access.log | sort | uniq -c | sort -rn
```

## Dépannage

### Tester configuration

```bash
# Vérifier syntaxe
sudo nginx -t

# Verbose
sudo nginx -T
```

### "502 Bad Gateway"

Backend inaccessible.

**Vérifications :**

```bash
# Backend tourne-t-il ?
sudo lsof -i :3000

# Nginx peut-il y accéder ?
curl http://localhost:3000

# SELinux bloque ? (CentOS)
sudo setsebool -P httpd_can_network_connect 1
```

### "504 Gateway Timeout"

Backend répond trop lentement.

**Solution :**

```nginx
location / {
    proxy_pass http://localhost:3000;
    proxy_connect_timeout 300;
    proxy_send_timeout 300;
    proxy_read_timeout 300;
}
```

### Logs en temps réel

```bash
# Access logs
sudo tail -f /var/log/nginx/access.log

# Error logs
sudo tail -f /var/log/nginx/error.log

# Tous les logs
sudo tail -f /var/log/nginx/*.log
```

## Best practices

### Structure organisée

```
/etc/nginx/
├── nginx.conf
├── sites-available/
│   ├── 01-monsite.conf
│   ├── 02-api.conf
│   └── 03-admin.conf
└── sites-enabled/
    ├── 01-monsite.conf -> ../sites-available/01-monsite.conf
    ├── 02-api.conf -> ../sites-available/02-api.conf
    └── 03-admin.conf -> ../sites-available/03-admin.conf
```

Préfixes numériques = ordre de chargement.

### Fichiers include

**snippets/proxy-params.conf :**

```nginx
proxy_set_header Host $host;
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;
proxy_http_version 1.1;
```

**Utilisation :**

```nginx
server {
    location / {
        proxy_pass http://localhost:3000;
        include snippets/proxy-params.conf;
    }
}
```

### Reload vs Restart

```bash
# Reload (pas de downtime)
sudo systemctl reload nginx

# Restart (downtime court)
sudo systemctl restart nginx
```

## Ressources

- [Nginx Documentation](https://nginx.org/en/docs/)
- [Nginx Config Generator](https://www.digitalocean.com/community/tools/nginx)
- [Mozilla SSL Config](https://ssl-config.mozilla.org/)
- [Certbot Documentation](https://certbot.eff.org/docs/)

## Support

Questions sur reverse proxy ? [Discord LKL Cloud](https://discord.gg/UaHNnMarQA)
