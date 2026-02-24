---
title: Activer et configurer txAdmin
---

Guide complet pour installer et configurer txAdmin, le panel d'administration officiel pour serveurs FiveM.

## Qu'est-ce que txAdmin ?

txAdmin est le panel de gestion officiel de FiveM, développé par l'équipe FiveM. Il permet une administration complète de votre serveur via une interface web moderne.

**Fonctionnalités :**
- Interface web complète
- Gestion des ressources
- Console en temps réel
- Système de permissions
- Scheduler de tâches
- Logs détaillés
- Updates automatiques
- Système de backup

## Installation

### Via Pterodactyl Panel (LKL Cloud)

Si vous utilisez notre panel de jeu, txAdmin est pré-installé :

1. Connectez-vous au [Panel Game](https://game.lklcloud.fr/)
2. Sélectionnez votre serveur FiveM
3. Démarrez le serveur
4. Accédez à l'URL txAdmin affichée dans la console
5. Suivez l'assistant de configuration

### Installation manuelle

```bash
# Télécharger artifacts FiveM avec txAdmin
cd /votre/dossier/fivem
wget https://runtime.fivem.net/artifacts/fivem/build_proot_linux/master/latest/fx.tar.xz
tar xf fx.tar.xz

# Démarrer avec txAdmin
./run.sh +exec server.cfg
```

## Première configuration

### Setup initial

Lors du premier lancement, txAdmin vous guide :

**1. Création du compte admin**
```
Username: admin
Password: [mot de passe sécurisé]
PIN: [code à 4 chiffres]
```

:::warning PIN Important
Le PIN est requis pour les actions sensibles. Ne le perdez pas !
:::

**2. Configuration serveur**
```
Server Name: Mon Serveur FiveM
Max Players: 32 (ou selon votre licence)
Game Build: Latest
```

**3. Configuration Recipe**

Choisissez un template de base :
- **Popular** : QBCore, ESX Legacy
- **Basic** : Serveur vanilla minimal
- **Custom** : Configuration personnalisée

### Accéder à txAdmin

URL par défaut :
```
http://VOTRE_IP:40120
```

Ou selon configuration :
```
http://VOTRE_IP:PORT_PERSONNALISE
```

## Configuration avancée

### server.cfg intégration

txAdmin génère automatiquement `server.cfg` mais vous pouvez personnaliser :

```bash
# Configuration serveur
sv_hostname "^2Mon Serveur ^7| discord.gg/xxxxx"
sv_maxclients 32
sv_endpointprivacy true

# txAdmin integration
set sv_licenseKey "cfxk_xxxxx"
set steam_webApiKey "xxxxx"
set sv_tebexSecret "xxxxx"

# OneSync
set onesync on
set onesync_enableInfinity 1
set onesync_enableBeyond 1
set onesync_population 1

# Scripts locations
ensure mapmanager
ensure chat
ensure spawnmanager
ensure sessionmanager
ensure basic-gamemode
ensure hardcap
```

### Permissions utilisateurs

Dans txAdmin, gérez les permissions par rôle :

**Admin** - Tous les droits
```
permissions.all
```

**Moderator** - Modération uniquement
```
permissions.kick
permissions.ban
permissions.warn
permissions.clearCache
```

**Viewer** - Lecture seule
```
permissions.view.logs
permissions.view.players
```

### Configuration Admins

Ajouter des admins via txAdmin :

1. **Settings** > **Admins**
2. Cliquez **Add**
3. Entrez l'identifiant Discord ou FiveM
4. Sélectionnez le rôle
5. Sauvegardez

Ou dans `txData/admins.json` :
```json
{
  "admin": {
    "name": "Admin Principal",
    "password_hash": "...",
    "providers": {
      "discord": "123456789012345678"
    },
    "permissions": ["all"]
  }
}
```

## Fonctionnalités principales

### Dashboard

Vue d'ensemble du serveur :
- **Status** : En ligne/Hors ligne
- **Players** : Joueurs connectés
- **Resources** : État des ressources
- **Performance** : CPU/RAM/Tick
- **Events** : Derniers événements

### Live Console

Console en temps réel directement dans le navigateur.

**Commandes utiles :**
```bash
restart [resource]    # Redémarrer une ressource
ensure [resource]     # Charger une ressource
refresh              # Rafraîchir la liste
quit                 # Arrêter serveur
```

### Player Management

Gestion avancée des joueurs :

**Actions disponibles :**
- **Kick** : Éjecter temporairement
- **Ban** : Bannir définitivement
- **Warn** : Avertir le joueur
- **Spectate** : Observer en NoClip
- **Heal** : Soigner
- **Teleport** : Téléporter

**Informations joueur :**
- Identifiants (Steam, Discord, License)
- Temps de jeu
- Historique des actions
- Notes admin

### Resources Manager

Gérez vos ressources facilement :

**Actions :**
- Start/Stop/Restart
- Update depuis GitHub
- Télécharger depuis txAdmin
- Voir les logs d'erreur

**Organisation :**
```
resources/
├── [core]/         # Ressources système
├── [gameplay]/     # Scripts gameplay
├── [maps]/         # Maps
└── [cars]/         # Véhicules
```

### Scheduler

Automatisez des tâches :

**Exemples de tâches :**

**Redémarrage automatique :**
```
Type: Restart Server
Schedule: 0 6 * * *  (tous les jours à 6h)
Message: "Redémarrage dans 5 minutes!"
```

**Backup automatique :**
```
Type: Database Backup
Schedule: 0 */6 * * *  (toutes les 6h)
Path: /backups/
```

**Annonces :**
```
Type: Command
Command: announce "Rejoignez notre Discord!"
Schedule: 0 */2 * * *  (toutes les 2h)
```

### Logs & Reporting

Consultez tous les logs :

**Types de logs :**
- **Server** : Démarrage/arrêt
- **Resources** : Chargement/erreurs
- **Players** : Connexions/actions
- **Admin** : Actions administratives
- **Chat** : Messages in-game

**Filtres :**
- Par date/heure
- Par joueur
- Par type d'événement
- Par niveau (Info/Warning/Error)

### Backups

Système de sauvegarde intégré :

**Backup automatique :**
1. **Settings** > **FXServer**
2. Activez **Auto Backup**
3. Fréquence : Quotidien/Hebdomadaire
4. Retention : 7 derniers backups

**Backup manuel :**
- Cliquez **Backup** dans le dashboard
- Attendez la fin
- Téléchargez depuis **Backups** > **Manage**

**Structure backup :**
```
txData/
└── backups/
    ├── backup_20260109_140530.zip
    └── backup_20260108_140530.zip
```

## Sécurité txAdmin

### Protéger l'accès

**1. Changer le port par défaut**

Dans `txAdmin.json` :
```json
{
  "port": 40120,    // Changez en un port custom
  "loginPageLogo": "URL_LOGO"
}
```

**2. Utiliser HTTPS**

Configurez un reverse proxy (Nginx) :
```nginx
server {
    listen 443 ssl;
    server_name txadmin.votredomaine.com;
    
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    location / {
        proxy_pass http://127.0.0.1:40120;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
    }
}
```

**3. Restreindre par IP**

Dans txAdmin > Settings > Security :
```
Allowed IPs: 1.2.3.4, 5.6.7.8
```

**4. Authentification 2FA**

Activez dans **Settings** > **Account** :
- Scannez QR code avec Google Authenticator
- Entrez le code de confirmation
- Sauvegardez les codes de backup

### Mots de passe forts

**Requirements :**
- Minimum 12 caractères
- Majuscules + minuscules
- Chiffres
- Caractères spéciaux

**Exemple :**
```
MyFiveM$erver2026!Secure
```

### Monitoring connexions

Vérifiez régulièrement :
- **Settings** > **Action Log**
- Connexions suspectes
- Actions non autorisées

## Optimisation txAdmin

### Performance

**Désactiver fonctions inutiles :**

Dans **Settings** > **FXServer** :
```
☐ Player Whitelist (si non utilisé)
☐ Advanced Logging (si performances limitées)
☐ Auto Screenshot (si espace limité)
```

**Limiter historique :**
```json
{
  "playerDatabase": {
    "maxRetention": 30  // Jours
  },
  "actionLog": {
    "maxEntries": 1000
  }
}
```

### Base de données

txAdmin utilise SQLite par défaut, mais peut utiliser MySQL pour meilleures performances :

**Migration vers MySQL :**
1. Créez base de données MySQL
2. Dans `txData/txadmin.json` :
```json
{
  "database": {
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "user": "txadmin",
    "password": "password",
    "database": "txadmin_db"
  }
}
```
3. Redémarrez txAdmin

## Intégration Discord

### Bot txAdmin

Configurez le bot Discord intégré :

**1. Créer application Discord**
- https://discord.com/developers/applications
- Créez nouvelle application
- Bot > Add Bot
- Copiez le Token

**2. Configuration txAdmin**

Dans **Settings** > **Discord Bot** :
```
Bot Token: VOTRE_TOKEN_BOT
Guild ID: ID_DE_VOTRE_SERVEUR
```

**3. Permissions bot**
```
Administrator (ou permissions spécifiques)
```

**4. Commandes Discord**

```
!status           # Statut serveur
!players          # Liste joueurs
!kick @player     # Kick joueur
!ban @player      # Ban joueur
!restart          # Redémarrer serveur
```

### Logs Discord

Envoyez les événements dans Discord :

**Configuration channels :**
```json
{
  "discordBot": {
    "channels": {
      "status": "123456789",
      "chat": "234567890",
      "admin": "345678901"
    }
  }
}
```

## Recipes (Templates)

### QBCore Installation

Via txAdmin Recipe :

1. **Setup** > **Popular Templates**
2. Sélectionnez **QBCore Framework**
3. Attendez téléchargement automatique
4. Configuration auto server.cfg
5. Démarrage serveur

### ESX Legacy Installation

1. Recipe **ESX Legacy**
2. Configuration MySQL automatique
3. Import base de données
4. Démarrage

### Custom Recipe

Créez votre propre recipe :

`recipes/myserver.yaml` :
```yaml
name: Mon Serveur Custom
author: Votre Nom
description: Configuration personnalisée

tasks:
  - action: download_github
    src: https://github.com/user/repo
    dest: resources/[custom]
    
  - action: ensure_dir
    path: resources/[cars]
    
  - action: waste_time
    seconds: 2
    
  - action: write_file
    file: server.cfg
    content: |
      ensure myresource
```

## Dépannage

### txAdmin ne démarre pas

**Vérifications :**
```bash
# Port déjà utilisé
netstat -tulpn | grep 40120

# Permissions fichiers
chmod -R 755 txData/

# Logs
cat txData/txAdmin.log
```

### Impossible de se connecter

**Solutions :**
1. Vérifiez firewall :
```bash
ufw allow 40120/tcp
```

2. Vérifiez IP/port correct

3. Réinitialisez admin :
```bash
rm txData/admins.json
# Recréez compte au prochain démarrage
```

### Resources ne démarrent pas

**Consultez console :**
- Erreurs Lua
- Dépendances manquantes
- Conflits de noms

**Restart manuel :**
```bash
restart [resource]
# Si erreur, vérifiez dans Resources > View
```

### Performances lentes

**Optimisations :**
- Limitez logs
- Désactivez auto-screenshot
- Nettoyez anciens backups
- Utilisez MySQL au lieu de SQLite

## Mise à jour txAdmin

### Update automatique

txAdmin se met à jour automatiquement, mais vous pouvez forcer :

1. **Settings** > **FXServer**
2. **Update Channel** : Latest/Recommended
3. Cliquez **Check for Updates**
4. Si disponible, **Update Now**

### Update manuelle

```bash
cd /votre/serveur
wget https://runtime.fivem.net/artifacts/fivem/build_proot_linux/master/latest/fx.tar.xz
tar xf fx.tar.xz --overwrite
```

## Ressources

- [Documentation txAdmin](https://docs.fivem.net/docs/server-manual/setting-up-a-server-txadmin/)
- [Forum FiveM](https://forum.cfx.re/)
- [Discord FiveM](https://discord.gg/fivem)

## Support

Besoin d'aide ? [Discord LKL Cloud](https://discord.gg/UaHNnMarQA)
