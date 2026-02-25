---
title: Configurer son serveur GMOD
sidebar_position: 3
---

Configuration complète de votre serveur Garry's Mod pour des performances optimales.

## Configuration de base

### server.cfg

Fichier principal de configuration dans `garrysmod/cfg/server.cfg` :

```lua
// Informations serveur
hostname "Mon Serveur GMod | DarkRP | discord.gg/xxxxx"
sv_password ""              // Mot de passe (vide = public)
rcon_password "motdepasse_securise"

// Réseau
sv_region "3"               // 3 = Europe
sv_lan 0                    // 0 = Internet
sv_allowdownload 1
sv_allowupload 1
sv_downloadurl "http://fastdl.monsite.com/gmod/"

// Gameplay
sv_defaultgamemode "darkrp"
gamemode "darkrp"
map "rp_downtown_v4c_v2"

// Limites joueurs
sv_visiblemaxplayers 128    // Slots visibles
maxplayers 64              // Slots réels

// Performance
sv_loadingurl "https://monsite.com/loading.html"
net_maxfilesize 64         // MB max par fichier
sv_minrate 100000
sv_maxrate 500000
sv_minupdaterate 33
sv_maxupdaterate 66
sv_mincmdrate 33
sv_maxcmdrate 66

// Logs
log on
sv_logbans 1
sv_logecho 1
sv_logfile 1
sv_log_onefile 0

// Sécurité
sv_allowcslua 0            // Désactiver Lua client
sv_contact "admin@monsite.com"
sv_cheats 0
sv_pausable 0
```

### Commande de démarrage

Script de lancement optimisé :

```bash
#!/bin/bash
screen -dmS gmod ./srcds_run \
  -game garrysmod \
  -console \
  -ip 0.0.0.0 \
  -port 27015 \
  -maxplayers 64 \
  +gamemode darkrp \
  +map rp_downtown_v4c_v2 \
  +host_workshop_collection 123456789 \
  -authkey VOTRE_API_KEY \
  +sv_setsteamaccount "VOTRE_GSLT_TOKEN"
```

### Steam Game Server Login Token

Nécessaire pour apparaître sur la liste des serveurs :

1. Allez sur https://steamcommunity.com/dev/managegameservers
2. App ID : **4000** (Garry's Mod)
3. Copiez le token généré
4. Ajoutez dans server.cfg :
```lua
sv_setsteamaccount "VOTRE_TOKEN"
```

## Workshop Collection

### Créer une collection

1. Allez sur Workshop GMod
2. Créez une collection avec tous vos addons
3. Notez l'ID de la collection (dans l'URL)
4. Obtenez une clé API : https://steamcommunity.com/dev/apikey

### Configuration Workshop

Dans le script de lancement :
```bash
+host_workshop_collection 123456789 \
-authkey VOTRE_CLE_API_STEAM
```

Ou dans server.cfg :
```lua
host_workshop_collection "123456789"
```

### resource.AddWorkshop

Alternative dans `lua/autorun/server/workshop.lua` :

```lua
-- Addons individuels
resource.AddWorkshop("123456789")
resource.AddWorkshop("987654321")
resource.AddWorkshop("555555555")

-- OU collection complète
resource.AddWorkshopCollection("123456789")
```

## Configuration DarkRP

### darkrpmodification/lua/darkrp_config.lua

```lua
-- Langue
GM.Config.language = "fr"

-- Économie
GM.Config.currency = "€"
GM.Config.startingmoney = 500
GM.Config.moneypocketconfiscateamount = 250

-- Salaire
GM.Config.payday = 150
GM.Config.paydelay = 160

-- Portes
GM.Config.doorcost = 30
GM.Config.maxdoors = 6

-- Props
GM.Config.restrictallteams = false
GM.Config.allowrpnames = true
GM.Config.strictsuicide = true

-- Armes
GM.Config.dropweaponondeath = true
GM.Config.dropmoneyondeath = false

-- Voix
GM.Config.voiceradius = 550
GM.Config.talkietalkie = true
```

### Créer des jobs personnalisés

`darkrpmodification/lua/darkrp_customthings/jobs.lua` :

```lua
-- Job Mafioso
TEAM_MAFIA = DarkRP.createJob("Mafioso", {
    color = Color(75, 75, 75),
    model = {
        "models/player/gman_high.mdl",
        "models/player/hostage/hostage_01.mdl"
    },
    description = [[Vous faites partie de la mafia.
        Protégez votre territoire et vos affaires.]],
    weapons = {"m9k_usp", "lockpick"},
    command = "mafia",
    max = 4,
    salary = 100,
    admin = 0,
    vote = false,
    hasLicense = false,
    candemote = true,
    category = "Criminel",
    PlayerSpawn = function(ply)
        ply:SetMaxHealth(120)
        ply:SetHealth(120)
        ply:SetArmor(50)
    end
})
```

### Créer des entités

`darkrpmodification/lua/darkrp_customthings/entities.lua` :

```lua
DarkRP.createEntity("Imprimante d'argent", {
    ent = "money_printer",
    model = "models/props_c17/consolebox01a.mdl",
    price = 1500,
    max = 3,
    cmd = "buymoneyprinter",
    allowed = {TEAM_MAFIA, TEAM_GANGSTER}
})
```

### Shipments (Caisses d'armes)

`darkrpmodification/lua/darkrp_customthings/shipments.lua` :

```lua
DarkRP.createShipment("AK47", {
    model = "models/weapons/w_rif_ak47.mdl",
    entity = "m9k_ak47",
    price = 5000,
    amount = 10,
    separate = true,
    pricesep = 600,
    noship = false,
    allowed = {TEAM_GUN}
})
```

## Optimisation des performances

### Server.cfg optimisé

```lua
// Tick et rates
sv_parallel_packentities 1
sv_parallel_sendsnapshot 1

// Threading
threadpool_affinity 0
mat_queue_mode 2

// Network optimization
net_splitpacket_maxrate 50000
net_maxcleartime 0.001

// Physics
sv_turbophysics 1
phys_timescale 1
phys_pushscale 1

// Think limits
gmod_physiterations 2
phys_speeds 1

// Autres
sv_hibernate_think 1
fps_max 100
```

### Limiter les props (Sandbox/DarkRP)

```lua
// Props limits
sbox_maxprops 150
sbox_maxragdolls 5
sbox_maxvehicles 4
sbox_maxeffects 50
sbox_maxdynamite 0
sbox_maxlamps 3
sbox_maxthrusters 10
sbox_maxwheels 4
sbox_maxhoverballs 20
sbox_maxballoons 10
sbox_maxcameras 10
sbox_maxbuttons 20
sbox_noclip 0
```

### Cleanup automatique

Installez **Stacker Improved** ou **Prop Cleaner** :

```lua
// Config de cleanup
sv_kickerrornum 0
sv_timeout 120

// Autodestruction props
prop_auto_remove_delay 300
```

## Configuration ULX/ULib

### Installation

```lua
Workshop ID: 557962280
```

### Groupes et permissions

`data/ulib/groups.txt` :

```lua
"superadmin"
{
    "allow"
    {
        "ulx rcon"
        "ulx luarun"
    }
    "inherit_from" "admin"
}

"admin"
{
    "allow"
    {
        "ulx ban"
        "ulx kick"
        "ulx noclip"
    }
    "inherit_from" "operator"
}

"vip"
{
    "allow"
    {
        "ulx thirdperson"
        "ulx god"
    }
    "inherit_from" "user"
}
```

### Commandes utiles

```lua
// Promouvoir joueur
ulx adduser "Pseudo" superadmin

// Bannir
ulx ban "Pseudo" 0 "Raison"

// Kick
ulx kick "Pseudo" "Raison"

// Map
ulx map rp_downtown_v4c_v2

// Changer gamemode
ulx gamemode darkrp
```

## Configuration avancée

### Loading Screen personnalisée

Créez `loading.html` et hébergez-la :

```html
<!DOCTYPE html>
<html>
<head>
    <title>Chargement...</title>
    <style>
        body {
            background: #1a1a1a;
            color: white;
            font-family: Arial;
            text-align: center;
        }
        .progress-bar {
            width: 50%;
            height: 30px;
            background: #333;
            margin: 20px auto;
            border-radius: 15px;
        }
        .progress {
            height: 100%;
            background: linear-gradient(90deg, #ff6b00, #ff9500);
            border-radius: 15px;
            transition: width 0.3s;
        }
    </style>
    <script>
        function SetStatusChanged(status) {
            document.getElementById("status").innerHTML = status;
        }
        function SetFilesTotal(total) {
            document.getElementById("total").innerHTML = total;
        }
        function SetFilesNeeded(needed) {
            var percent = (needed / total) * 100;
            document.getElementById("progress").style.width = percent + "%";
        }
        function DownloadingFile(file) {
            document.getElementById("file").innerHTML = file;
        }
    </script>
</head>
<body>
    <h1>Bienvenue sur [NOM DU SERVEUR]</h1>
    <h2 id="status">Chargement...</h2>
    <div class="progress-bar">
        <div class="progress" id="progress"></div>
    </div>
    <p id="file">Connexion au serveur...</p>
    <p>Discord: discord.gg/xxxxx</p>
</body>
</html>
```

Dans server.cfg :
```lua
sv_loadingurl "https://monsite.com/loading.html"
```

### Message de bienvenue (MOTD)

Créez `garrysmod/settings/motd.txt` :

```html
<html>
<body style="background:#222; color:white; font-family:Arial;">
    <center>
        <h1>Bienvenue sur notre serveur!</h1>
        <h3>Règles du serveur:</h3>
        <ul style="text-align:left; max-width:600px;">
            <li>Pas de RDM (Random Death Match)</li>
            <li>Respectez les autres joueurs</li>
            <li>Pas de prop-block</li>
            <li>Roleplay de qualité requis</li>
        </ul>
        <p>Discord: <a href="https://discord.gg/xxxxx">discord.gg/xxxxx</a></p>
    </center>
</body>
</html>
```

### MySQL pour DarkRP

Configuration MySQL pour données persistantes :

`garrysmod/sv.db` → MySQL

Installez **MySQLOO** :
1. Téléchargez depuis https://github.com/FredyH/MySQLOO/releases
2. Extrayez dans `garrysmod/lua/bin/`

`darkrpmodification/lua/darkrp_config.lua` :
```lua
GM.Config.UseMysql = true
GM.Config.MySQLServer = "localhost"
GM.Config.MySQLUsername = "gmod_user"
GM.Config.MySQLPassword = "password"
GM.Config.MySQLDatabase = "gmod_darkrp"
GM.Config.MySQLPort = 3306
```

## Anti-cheat et sécurité

### Netvar Protection

```lua
// server.cfg
sv_allowcslua 0
sv_pure 1
sv_pure_kick_clients 1
```

### Scanner backdoors

Installez **Backdoor Scanner** :
```
Workshop: 1471796217
```

Scannez régulièrement :
```lua
ulx backdoorscanner
```

### Permissions fichiers

```bash
# Protéger les fichiers sensibles
chmod 600 garrysmod/cfg/server.cfg
chmod 700 garrysmod/lua/autorun/server/
```

## Logs et monitoring

### Logs détaillés

```lua
// server.cfg
log on
sv_logbans 1
sv_logecho 1
sv_logfile 1
sv_log_onefile 0
```

Logs dans : `garrysmod/logs/`

### ServerGuard Logs

Si vous utilisez ServerGuard :
```lua
sgr_mysql_hostname "localhost"
sgr_mysql_username "gmod"
sgr_mysql_password "password"
sgr_mysql_database "serverguard"
sgr_mysql_port 3306
```

## Sauvegardes automatiques

Script de backup :

```bash
#!/bin/bash
# backup-gmod.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/gmod"
SOURCE_DIR="/home/gmod/gmod-server/garrysmod"

mkdir -p $BACKUP_DIR

tar -czf $BACKUP_DIR/gmod_backup_$DATE.tar.gz \
    $SOURCE_DIR/data/ \
    $SOURCE_DIR/sv.db \
    $SOURCE_DIR/cfg/ \
    $SOURCE_DIR/addons/ \
    $SOURCE_DIR/gamemodes/darkrp/

# Garder seulement 7 derniers backups
find $BACKUP_DIR -name "gmod_backup_*.tar.gz" -mtime +7 -delete

echo "Backup completed: gmod_backup_$DATE.tar.gz"
```

Automatiser avec cron :
```bash
crontab -e
0 3 * * * /root/backup-gmod.sh
```

## Dépannage

### "Connection failed after 4 retries"

**Causes :**
- Port 27015 fermé
- Mauvaise IP dans startup
- Firewall bloque

**Solution :**
```bash
# Vérifier port ouvert
netstat -tulpn | grep 27015

# Ouvrir port
ufw allow 27015/tcp
ufw allow 27015/udp
```

### "Pure server: file doesn't match"

Fichiers modifiés par client.

**Solution :**
```lua
sv_pure 0  // Temporairement
```

Ou nettoyez fichiers clients.

### Memory leak

Serveur utilise trop de RAM progressivement.

**Solutions :**
- Redémarrage automatique toutes les 6h
- Limiter props plus strictement
- Scanner addons problématiques
- Utiliser **GMod Anti-Crash**

### Lua errors

Consultez les logs :
```bash
tail -f garrysmod/logs/server_log.txt
```

Cherchez :
```
[ERROR]
[DarkRP]
[ULX]
```

## Ressources

- [GMod Wiki](https://wiki.facepunch.com/gmod/)
- [DarkRP Documentation](https://darkrp.miraheze.org/)
- [ULX Documentation](https://ulyssesmod.net/)
- [Workshop GMod](https://steamcommunity.com/app/4000/workshop/)

## Support

Besoin d'aide ? [Discord LKL Cloud](https://discord.gg/UaHNnMarQA)
