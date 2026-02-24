---
title: Installer Node.js & NVM
---

Guide complet pour installer Node.js sur votre VPS Linux avec différentes méthodes.

## Méthodes d'installation

### Méthode 1 : Via NodeSource (Recommandé)

La méthode la plus simple et fiable.

**Node.js 20 LTS (Recommandé) :**

```bash
# Télécharger et exécuter script d'installation
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

# Installer Node.js et npm
sudo apt install -y nodejs

# Vérifier installation
node --version
npm --version
```

**Autres versions disponibles :**

```bash
# Node.js 18 LTS
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Node.js 21 (Current)
curl -fsSL https://deb.nodesource.com/setup_21.x | sudo -E bash -
sudo apt install -y nodejs
```

### Méthode 2 : Via NVM (Node Version Manager)

Idéal pour gérer plusieurs versions de Node.js.

**Installation NVM :**

```bash
# Télécharger et installer NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Recharger configuration shell
source ~/.bashrc
# Ou pour zsh
source ~/.zshrc

# Vérifier installation
nvm --version
```

**Utiliser NVM :**

```bash
# Installer dernière version LTS
nvm install --lts

# Installer version spécifique
nvm install 20.10.0

# Lister versions installées
nvm list

# Utiliser version spécifique
nvm use 20

# Définir version par défaut
nvm alias default 20

# Afficher version active
nvm current
```

**Passer entre versions :**

```bash
nvm use 18    # Node 18
nvm use 20    # Node 20
nvm use node  # Dernière version
```

### Méthode 3 : Depuis les dépôts Ubuntu (Non recommandé)

Version souvent obsolète.

```bash
sudo apt update
sudo apt install nodejs npm
```

## Configuration Node.js

### Variables d'environnement

**Ajouter au PATH (si nécessaire) :**

```bash
echo 'export PATH="$HOME/.nvm/versions/node/$(nvm current)/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

### npm configuration

**Registry par défaut :**

```bash
# Vérifier registry
npm config get registry

# Utiliser registry officiel
npm config set registry https://registry.npmjs.org/
```

**Cache npm :**

```bash
# Localiser cache
npm config get cache

# Nettoyer cache
npm cache clean --force
```

## Installer des packages globalement

### Packages essentiels

**PM2 - Process Manager :**

```bash
npm install -g pm2

# Vérifier
pm2 --version
```

**Yarn - Alternative à npm :**

```bash
npm install -g yarn

# Vérifier
yarn --version
```

**TypeScript :**

```bash
npm install -g typescript

# Vérifier
tsc --version
```

**Nodemon - Auto-reload :**

```bash
npm install -g nodemon

# Utilisation
nodemon app.js
```

### Permissions globales

Si erreurs de permissions lors de l'installation globale :

```bash
# Changer propriétaire dossier npm global
mkdir -p ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

## Projet Node.js basique

### Initialiser projet

```bash
# Créer dossier
mkdir mon-projet
cd mon-projet

# Initialiser npm
npm init -y
```

**Éditer package.json :**

```json
{
  "name": "mon-projet",
  "version": "1.0.0",
  "description": "Mon application Node.js",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
  "keywords": [],
  "author": "Votre Nom",
  "license": "MIT"
}
```

### Créer application simple

**index.js :**

```javascript
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Hello World from Node.js!');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
```

**Installer dépendances :**

```bash
npm install express
```

**Lancer :**

```bash
npm start
```

## Déploiement avec PM2

### Installation PM2

```bash
npm install -g pm2
```

### Démarrer application

**Basique :**

```bash
pm2 start index.js --name "mon-app"
```

**Avec options :**

```bash
pm2 start index.js \
  --name "mon-app" \
  --watch \
  --instances 4 \
  --max-memory-restart 300M
```

**Avec fichier ecosystem :**

```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'mon-app',
    script: './index.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
  }]
};
```

**Démarrer avec ecosystem :**

```bash
pm2 start ecosystem.config.js
```

### Commandes PM2 essentielles

```bash
# Lister processus
pm2 list

# Logs en temps réel
pm2 logs

# Logs application spécifique
pm2 logs mon-app

# Monitoring
pm2 monit

# Redémarrer
pm2 restart mon-app

# Recharger (zero-downtime)
pm2 reload mon-app

# Arrêter
pm2 stop mon-app

# Supprimer
pm2 delete mon-app

# Informations détaillées
pm2 show mon-app
```

### Auto-démarrage PM2

```bash
# Générer script startup
pm2 startup

# Sauvegarder liste processus
pm2 save

# Les apps redémarreront automatiquement après reboot
```

## Reverse Proxy avec Nginx

### Installer Nginx

```bash
sudo apt install nginx
```

### Configuration Nginx

**Créer config :**

```bash
sudo nano /etc/nginx/sites-available/mon-app
```

**Contenu :**

```nginx
server {
    listen 80;
    server_name votredomaine.com www.votredomaine.com;

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
sudo ln -s /etc/nginx/sites-available/mon-app /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### SSL avec Let's Encrypt

```bash
# Installer Certbot
sudo apt install certbot python3-certbot-nginx

# Obtenir certificat
sudo certbot --nginx -d votredomaine.com -d www.votredomaine.com

# Renouvellement automatique déjà configuré
```

## Gestion des dépendances

### package.json vs package-lock.json

**package.json :**
- Dépendances déclarées
- Versions avec ranges (~, ^)

**package-lock.json :**
- Versions exactes installées
- Ne pas modifier manuellement
- Commiter dans Git

### Installation dépendances

```bash
# Installer toutes dépendances
npm install

# Installer dépendance production
npm install express

# Installer dépendance développement
npm install --save-dev nodemon

# Installer version spécifique
npm install express@4.18.0

# Mettre à jour dépendances
npm update

# Vérifier dépendances obsolètes
npm outdated
```

### Audit sécurité

```bash
# Vérifier vulnérabilités
npm audit

# Corriger automatiquement (attention, peut casser)
npm audit fix

# Force fix (breaking changes possibles)
npm audit fix --force
```

## Variables d'environnement

### Fichier .env

**Installer dotenv :**

```bash
npm install dotenv
```

**Créer .env :**

```env
PORT=3000
NODE_ENV=production
DATABASE_URL=mongodb://localhost:27017/mydb
API_KEY=votre_cle_secrete
```

**Utiliser dans code :**

```javascript
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;

console.log(`Port: ${PORT}`);
```

**Sécurité .gitignore :**

```
node_modules/
.env
*.log
```

## Monitoring et logs

### PM2 Monitoring

**Dashboard web :**

```bash
pm2 install pm2-server-monit
```

**PM2 Plus (cloud) :**

```bash
pm2 link [secret] [public]
```

### Winston pour logs

```bash
npm install winston
```

**Configuration :**

```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'mon-app' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

module.exports = logger;
```

## Performance

### Node.js en cluster

```javascript
const cluster = require('cluster');
const os = require('os');
const express = require('express');

if (cluster.isMaster) {
  const numCPUs = os.cpus().length;
  
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  
  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  const app = express();
  // Votre application...
  app.listen(3000);
}
```

### Optimisation mémoire

```bash
# Augmenter limite mémoire
node --max-old-space-size=4096 index.js

# Via PM2
pm2 start index.js --node-args="--max-old-space-size=4096"
```

## Mise à jour Node.js

### Avec NodeSource

```bash
# Mettre à jour vers version plus récente
curl -fsSL https://deb.nodesource.com/setup_21.x | sudo -E bash -
sudo apt upgrade nodejs
```

### Avec NVM

```bash
# Installer nouvelle version
nvm install 21

# Utiliser nouvelle version
nvm use 21

# Définir comme défaut
nvm alias default 21

# Supprimer ancienne version
nvm uninstall 18
```

## Dépannage

### "node: command not found"

**Vérifier PATH :**

```bash
echo $PATH
which node
```

**Ajouter au PATH :**

```bash
export PATH="/usr/bin:$PATH"
```

### Conflits versions

```bash
# Avec NVM, lister versions
nvm list

# Désinstaller version
nvm uninstall 18

# Nettoyer cache npm
npm cache clean --force
```

### Erreurs permissions

```bash
# Changer propriétaire
sudo chown -R $USER:$USER ~/.npm
sudo chown -R $USER:$USER ~/.config
```

### Port déjà utilisé

```bash
# Trouver processus
sudo lsof -i :3000

# Tuer processus
sudo kill -9 PID
```

## Best practices

### Structure projet

```
mon-projet/
├── node_modules/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── index.js
├── tests/
├── logs/
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

### Scripts npm utiles

```json
{
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js",
    "test": "jest",
    "lint": "eslint src/",
    "build": "tsc",
    "pm2:start": "pm2 start ecosystem.config.js",
    "pm2:stop": "pm2 stop all",
    "pm2:restart": "pm2 restart all"
  }
}
```

## Ressources

- [Node.js Documentation](https://nodejs.org/docs/)
- [npm Documentation](https://docs.npmjs.com/)
- [NVM GitHub](https://github.com/nvm-sh/nvm)
- [PM2 Documentation](https://pm2.keymetrics.io/)
- [Express.js Guide](https://expressjs.com/)

## Support

Questions sur Node.js ? [Discord LKL Cloud](https://discord.gg/UaHNnMarQA)
