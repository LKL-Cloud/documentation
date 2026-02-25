---
title: Installer Docker & Docker Compose
sidebar_position: 6
---

Guide complet pour installer et utiliser Docker sur votre VPS Linux.

## Installation Docker

### Méthode automatique (Script officiel)

La méthode la plus simple et recommandée.

```bash
# Télécharger et exécuter script d'installation
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Vérifier installation
docker --version
```

### Méthode manuelle (Ubuntu/Debian)

**1. Prérequis :**

```bash
sudo apt update
sudo apt install apt-transport-https ca-certificates curl gnupg lsb-release -y
```

**2. Ajouter clé GPG Docker :**

```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```

**3. Ajouter repository :**

```bash
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

**4. Installer Docker :**

```bash
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io -y
```

**5. Vérifier :**

```bash
sudo docker run hello-world
```

### Configuration post-installation

**Permettre utilisation sans sudo :**

```bash
# Ajouter utilisateur au groupe docker
sudo usermod -aG docker $USER

# Appliquer changements
newgrp docker

# Tester
docker run hello-world
```

**Démarrage automatique :**

```bash
sudo systemctl enable docker
sudo systemctl start docker
```

## Installation Docker Compose

### Version standalone (Recommandé)

```bash
# Télécharger dernière version
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# Rendre exécutable
sudo chmod +x /usr/local/bin/docker-compose

# Vérifier
docker-compose --version
```

### Via plugin Docker

```bash
sudo apt install docker-compose-plugin
docker compose version
```

## Concepts de base

### Images vs Containers

**Image :**
- Template read-only
- Contient application + dépendances
- Stockée dans registry (Docker Hub)

**Container :**
- Instance exécutable d'une image
- Isolé et léger
- Peut être démarré/arrêté

### Dockerfile

Fichier définissant comment construire une image.

**Exemple simple :**

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
```

### Docker Compose

Orchestration de plusieurs containers.

**docker-compose.yml exemple :**

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    depends_on:
      - db
    
  db:
    image: mysql:8
    environment:
      MYSQL_ROOT_PASSWORD: password
      MYSQL_DATABASE: myapp
    volumes:
      - db_data:/var/lib/mysql

volumes:
  db_data:
```

## Commandes Docker essentielles

### Gestion images

```bash
# Lister images
docker images

# Télécharger image
docker pull nginx:latest

# Construire image depuis Dockerfile
docker build -t mon-app:1.0 .

# Supprimer image
docker rmi nginx:latest

# Nettoyer images non utilisées
docker image prune -a
```

### Gestion containers

```bash
# Lister containers actifs
docker ps

# Lister tous les containers
docker ps -a

# Démarrer container
docker run -d --name mon-container nginx

# Arrêter container
docker stop mon-container

# Redémarrer
docker restart mon-container

# Supprimer container
docker rm mon-container

# Supprimer container en cours
docker rm -f mon-container

# Nettoyer containers arrêtés
docker container prune
```

### Logs et debugging

```bash
# Voir logs
docker logs mon-container

# Logs en temps réel
docker logs -f mon-container

# Dernières 100 lignes
docker logs --tail 100 mon-container

# Exécuter commande dans container
docker exec -it mon-container bash

# Inspecter container
docker inspect mon-container

# Stats ressources
docker stats
```

### Volumes et données

```bash
# Créer volume
docker volume create mon-volume

# Lister volumes
docker volume ls

# Inspecter volume
docker volume inspect mon-volume

# Supprimer volume
docker volume rm mon-volume

# Nettoyer volumes non utilisés
docker volume prune
```

### Réseaux

```bash
# Lister réseaux
docker network ls

# Créer réseau
docker network create mon-reseau

# Connecter container au réseau
docker network connect mon-reseau mon-container

# Inspecter réseau
docker network inspect mon-reseau
```

## Exemples pratiques

### Nginx reverse proxy

**docker-compose.yml :**

```yaml
version: '3.8'

services:
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/nginx/ssl:ro
      - ./html:/usr/share/nginx/html:ro
    restart: unless-stopped
```

### Application Node.js

**Dockerfile :**

```dockerfile
FROM node:20-alpine

WORKDIR /app

# Copier package.json
COPY package*.json ./

# Installer dépendances
RUN npm ci --only=production

# Copier code source
COPY . .

# Exposer port
EXPOSE 3000

# Utilisateur non-root
USER node

# Démarrer app
CMD ["node", "server.js"]
```

**docker-compose.yml :**

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=mysql://user:pass@db:3306/mydb
    volumes:
      - ./logs:/app/logs
    depends_on:
      - db
    restart: unless-stopped
  
  db:
    image: mysql:8
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: mydb
      MYSQL_USER: user
      MYSQL_PASSWORD: pass
    volumes:
      - mysql_data:/var/lib/mysql
    restart: unless-stopped

volumes:
  mysql_data:
```

**Déployer :**

```bash
docker-compose up -d
```

### WordPress avec MySQL

```yaml
version: '3.8'

services:
  wordpress:
    image: wordpress:latest
    ports:
      - "8080:80"
    environment:
      WORDPRESS_DB_HOST: db:3306
      WORDPRESS_DB_USER: wordpress
      WORDPRESS_DB_PASSWORD: wordpress_password
      WORDPRESS_DB_NAME: wordpress
    volumes:
      - wp_data:/var/www/html
    depends_on:
      - db
    restart: unless-stopped
  
  db:
    image: mysql:8
    environment:
      MYSQL_ROOT_PASSWORD: root_password
      MYSQL_DATABASE: wordpress
      MYSQL_USER: wordpress
      MYSQL_PASSWORD: wordpress_password
    volumes:
      - db_data:/var/lib/mysql
    restart: unless-stopped

volumes:
  wp_data:
  db_data:
```

### PostgreSQL + pgAdmin

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: admin_password
      POSTGRES_DB: myapp
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    restart: unless-stopped
  
  pgadmin:
    image: dpage/pgadmin4
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@example.com
      PGADMIN_DEFAULT_PASSWORD: admin_password
    ports:
      - "5050:80"
    depends_on:
      - postgres
    restart: unless-stopped

volumes:
  postgres_data:
```

## Docker Compose commandes

```bash
# Démarrer services
docker-compose up -d

# Arrêter services
docker-compose down

# Arrêter et supprimer volumes
docker-compose down -v

# Voir logs
docker-compose logs

# Logs en temps réel
docker-compose logs -f

# Logs service spécifique
docker-compose logs -f web

# Reconstruire images
docker-compose build

# Rebuild et restart
docker-compose up -d --build

# Lister containers
docker-compose ps

# Exécuter commande
docker-compose exec web bash

# Restart service
docker-compose restart web
```

## Portainer - Interface graphique

Gestionnaire Docker avec UI web.

**Installation :**

```bash
docker volume create portainer_data

docker run -d \
  -p 8000:8000 \
  -p 9443:9443 \
  --name portainer \
  --restart=always \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v portainer_data:/data \
  portainer/portainer-ce:latest
```

**Accès :**

`https://VOTRE_IP:9443`

**Première connexion :**
- Créez compte admin
- Connectez-vous à votre environnement Docker local

**Fonctionnalités :**
- Gestion containers via UI
- Monitoring ressources
- Logs graphiques
- Templates d'applications
- Stacks Docker Compose

## Sécurité Docker

### Limiter ressources

```bash
# Limiter CPU et RAM
docker run -d \
  --cpus=".5" \
  --memory="512m" \
  --name limited-container \
  nginx
```

**Dans docker-compose.yml :**

```yaml
services:
  web:
    image: nginx
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
```

### Utilisateurs non-root

**Dockerfile :**

```dockerfile
FROM node:20-alpine

# Créer utilisateur
RUN addgroup -g 1001 appgroup && \
    adduser -D -u 1001 -G appgroup appuser

WORKDIR /app
COPY --chown=appuser:appgroup . .

USER appuser

CMD ["node", "app.js"]
```

### Secrets

Ne jamais hardcoder secrets dans images.

**Via environment :**

```bash
docker run -e DB_PASSWORD="$(cat db_password.txt)" mon-app
```

**Docker secrets (Swarm) :**

```bash
echo "mon_secret" | docker secret create db_password -
```

### Scan vulnérabilités

```bash
# Scanner image
docker scan mon-image:latest

# Ou avec Trivy
docker run aquasec/trivy image mon-image:latest
```

## Optimisation

### Réduire taille images

**Multi-stage build :**

```dockerfile
# Stage 1: Build
FROM node:20 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
CMD ["node", "dist/index.js"]
```

**Utiliser Alpine :**

```dockerfile
# Heavy (1GB+)
FROM node:20

# Léger (100-200MB)
FROM node:20-alpine
```

### .dockerignore

```
node_modules/
npm-debug.log
.git
.env
*.md
.vscode/
```

### Layer caching

```dockerfile
# ✅ BON - Cache layers
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# ❌ MAUVAIS - Invalide cache
FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm install
```

## Backup et restauration

### Backup container

```bash
# Commit container vers image
docker commit mon-container mon-backup:v1

# Sauvegarder image
docker save -o backup.tar mon-backup:v1

# Restaurer
docker load -i backup.tar
```

### Backup volumes

```bash
# Créer backup volume
docker run --rm \
  -v mon-volume:/data \
  -v $(pwd):/backup \
  alpine tar czf /backup/volume-backup.tar.gz /data

# Restaurer
docker run --rm \
  -v mon-volume:/data \
  -v $(pwd):/backup \
  alpine tar xzf /backup/volume-backup.tar.gz -C /
```

## Maintenance

### Nettoyage

```bash
# Tout nettoyer (containers, images, volumes, networks)
docker system prune -a --volumes

# Sans volumes
docker system prune -a

# Espaces utilisé
docker system df
```

### Updates

```bash
# Update images
docker-compose pull
docker-compose up -d

# Ou pour image spécifique
docker pull nginx:latest
docker-compose up -d --no-deps nginx
```

## Dépannage

### Container s'arrête immédiatement

**Vérifier logs :**

```bash
docker logs mon-container
```

**Causes communes :**
- Erreur dans CMD/ENTRYPOINT
- Ports déjà utilisés
- Permissions fichiers

### "Cannot connect to Docker daemon"

```bash
# Vérifier service
sudo systemctl status docker

# Redémarrer
sudo systemctl restart docker

# Permissions
sudo usermod -aG docker $USER
newgrp docker
```

### Port déjà utilisé

```
Error: bind: address already in use
```

**Solution :**

```bash
# Trouver processus
sudo lsof -i :PORT

# Changer port dans docker-compose
ports:
  - "8080:80"  # Au lieu de 80:80
```

### Espace disque plein

```bash
# Vérifier utilisation
docker system df

# Nettoyer
docker system prune -a --volumes
```

## Ressources

- [Documentation Docker](https://docs.docker.com/)
- [Docker Hub](https://hub.docker.com/)
- [Docker Compose Docs](https://docs.docker.com/compose/)
- [Portainer Documentation](https://docs.portainer.io/)
- [Awesome Docker](https://github.com/veggiemonk/awesome-docker)

## Support

Questions sur Docker ? [Discord LKL Cloud](https://discord.gg/UaHNnMarQA)
