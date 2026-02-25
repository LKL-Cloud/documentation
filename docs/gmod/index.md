---
title: Serveur Garry's Mod
sidebar_position: 1
toc: false
---

Guide complet pour créer et gérer votre serveur Garry's Mod sur LKL Cloud.

## Qu'est-ce que Garry's Mod ?

Garry's Mod (GMod) est un **sandbox** basé sur Source Engine permettant de créer des modes de jeu personnalisés : DarkRP, TTT, Prop Hunt, Murder, et bien plus.

## Prérequis

Pour héberger un serveur GMod :

- Serveur de jeu LKL Cloud actif
- Copie de Garry's Mod sur Steam
- Accès au Panel Game
- Connaissance de base de Lua (pour personnalisation)

## Installation

### Via le Panel Game

1. **Connectez-vous** au [Panel Game](https://game.lklcloud.fr/)
2. Sélectionnez votre serveur Garry's Mod
3. Le serveur est pré-configuré avec les fichiers de base
4. Démarrez le serveur

:::tip Premier démarrage
Le premier démarrage peut prendre plusieurs minutes car le serveur télécharge les ressources nécessaires depuis Steam.
:::

## Modes de jeu populaires

### DarkRP

Mode de jeu **roleplay** le plus populaire :
- Métiers (police, gangster, maire, etc.)
- Économie avec argent virtuel
- Propriétés et véhicules
- Jobs et salaires

**Installation :**
1. Téléchargez [DarkRP](https://github.com/FPtje/DarkRP)
2. Extrayez dans `/garrysmod/gamemodes/darkrp/`
3. Configurez `server.cfg` : `gamemode darkrp`

### Trouble in Terrorist Town (TTT)

Mode **enquête** et élimination :
- Innocents vs Traîtres
- Détectives avec équipement
- Plusieurs rounds par partie

**Installation :**
```cfg
gamemode terrortown
```
TTT est inclus de base dans GMod.

### Prop Hunt

Mode **cache-cache** avec transformation :
- Une équipe se transforme en objets
- L'autre équipe doit les trouver
- Chronomètre et système de points

### Murder

Un **assassin**, un **témoin** avec arme, des **innocents** :
- L'assassin doit éliminer tout le monde
- Les innocents doivent survivre ou trouver l'arme

## Configuration du serveur

### server.cfg

Fichier principal de configuration :

```cfg
// Informations serveur
hostname "Mon Serveur GMod - LKL Cloud"
sv_password ""
sv_region "3"

// Limites joueurs
maxplayers 32

// Network
sv_lan 0
sv_allowupload 1
sv_allowdownload 1
sv_downloadurl ""

// Game mode
gamemode darkrp

// RCON
rcon_password "votre_password_secure"

// Logs
log on
sv_logbans 1
sv_logecho 1
sv_logfile 1
```

### Configuration réseau

<div class="custom-table">

| SERVICE | PORT | PROTOCOLE | USAGE |
|---------|------|-----------|-------|
| GMod | 27015 | UDP/TCP | Connexion joueurs |
| RCON | 27015 | TCP | Administration |
| SourceTV | 27020 | UDP | Spectateur (optionnel) |

</div>

## Installer des addons

### Via le Workshop Steam

**Méthode recommandée** pour les addons du Workshop :

1. Créez une **Collection** sur le Workshop Steam
2. Ajoutez vos addons à la collection
3. Notez l'**ID de la collection** (dans l'URL)

Dans votre fichier `server.cfg` :
```cfg
// Collection Workshop
host_workshop_collection "ID_DE_VOTRE_COLLECTION"
```

Pour charger des addons spécifiques :
```lua
-- Dans lua/autorun/server/workshop.lua
resource.AddWorkshop("123456789") -- ID de l'addon
```

### Installation manuelle

Pour les addons non-Workshop :

1. Uploadez le dossier dans `/garrysmod/addons/`
2. Respectez la structure : `addon_name/lua/`, `addon_name/materials/`, etc.
3. Redémarrez le serveur

:::warning Taille des addons
Trop d'addons lourds ralentissent le chargement. Limitez-vous aux addons essentiels et utilisez FastDL pour les ressources.
:::

## FastDL (Fast Download)

Accélérez le téléchargement des ressources pour vos joueurs.

### Configuration

1. Hébergez vos fichiers sur un serveur web externe
2. Dans `server.cfg` :
```cfg
sv_downloadurl "https://votre-fastdl.com/garrysmod/"
sv_allowupload 0
sv_allowdownload 1
```

### Structure FastDL

```
/garrysmod/
  /maps/
  /materials/
  /models/
  /sound/
  /resource/
```

Compressez les fichiers en `.bz2` :
```bash
bzip2 -k fichier.mdl
```

## Configuration DarkRP

### darkrp_config.lua

Configuration des jobs, salaires, armes :

```lua
-- Paramètres généraux
DarkRP.config.startingMoney = 500
DarkRP.config.currency = "€"
DarkRP.config.salary = 45

-- Jobs personnalisés
TEAM_POLICE = DarkRP.createJob("Policier", {
    color = Color(25, 25, 170),
    model = {"models/player/police.mdl"},
    description = "Vous protégez la ville",
    weapons = {"arrest_stick", "unarrest_stick", "weapon_glock"},
    command = "police",
    max = 4,
    salary = 75,
    admin = 0,
    vote = false,
    hasLicense = true,
})
```

### Entités personnalisées

Dans `darkrp_customthings.lua` :

```lua
-- Armes achetables
DarkRP.createShipment("AK47", {
    model = "models/weapons/w_rif_ak47.mdl",
    entity = "weapon_ak47_darkrp",
    price = 3600,
    amount = 10,
    separate = true,
    pricesep = 600,
    noship = false,
    allowed = {TEAM_GUN}
})
```

## Administration

### Addons d'administration recommandés

**ULX/ULAdmin :**
- Gestion complète des joueurs
- Permissions par groupes
- Commandes !ban, !kick, !noclip

**ServerGuard :**
- Alternative moderne à ULX
- Interface intuitive
- Anti-cheat intégré

### Commandes console utiles

```
// Gestion joueurs
status - Liste des joueurs connectés
kick <nom> - Éjecter un joueur
ban <nom> <durée> - Bannir un joueur

// Serveur
changelevel <map> - Changer de map
sv_cheats 1 - Activer les cheats (admin)
map_background <nom> - Map d'arrière-plan
```

## Maps personnalisées

### Installer une map

1. Téléchargez le fichier `.bsp`
2. Uploadez dans `/garrysmod/maps/`
3. Changez la map : `changelevel nom_de_la_map`

### Maps DarkRP populaires

- **rp_downtown_v4c_v2** : Ville moderne
- **rp_evocity_v4b1** : Grande ville RP
- **rp_rockford_v2b** : Ville américaine
- **rp_florida_v2** : Style Miami

:::tip Workshop pour les maps
Préférez les maps du Workshop pour simplifier l'installation et la mise à jour automatique.
:::

## Content packs

### CSS Content

Beaucoup d'addons nécessitent les textures de Counter-Strike Source :

1. Téléchargez [CSS Content](https://github.com/Kefta/CSS-Content)
2. Extrayez dans `/garrysmod/`
3. Redémarrez

## Optimisation

### Performance serveur

Dans `server.cfg` :
```cfg
// Performance
sv_minrate 30000
sv_maxrate 60000
net_splitpacket_maxrate 50000
decalfrequency 10

// Props
sbox_maxprops 150
sbox_maxragdolls 5
sbox_maxvehicles 4
```

### Nettoyage automatique

Installez un addon de nettoyage automatique des props abandonnés pour éviter le lag.

## Sécurité

### Protection anti-exploit

```lua
-- Dans lua/autorun/server/security.lua
-- Bloquer les commandes dangereuses
hook.Add("PlayerSay", "BlockExploits", function(ply, text)
    local blacklist = {"lua_run", "lua_openscript", "connect"}
    for _, cmd in ipairs(blacklist) do
        if string.find(string.lower(text), cmd) then
            return ""
        end
    end
end)
```

### Permissions strictes

- N'accordez **jamais** superadmin à un inconnu
- Utilisez des groupes avec permissions limitées
- Surveillez les logs régulièrement

## Dépannage

### Textures manquantes (errors)

- ✅ Installez **CSS Content**
- ✅ Téléchargez les content packs nécessaires
- ✅ Vérifiez que les addons sont à jour

### Crash au démarrage

- ✅ Vérifiez les **logs** (`console.log`)
- ✅ Désactivez les addons un par un
- ✅ Vérifiez la compatibilité des addons
- ✅ Supprimez le cache dans `/cache/`

### Lag serveur

1. Vérifiez l'utilisation CPU/RAM dans le panel
2. Limitez le nombre de props par joueur
3. Réduisez les effets visuels d'addons
4. Optimisez les scripts Lua
5. Nettoyez régulièrement les entités

### Joueurs qui "timeout"

```cfg
// Augmentez les timeouts
sv_timeout 120
net_maxfilesize 64
```

## Monétisation

### Addons premium populaires

Tebex (anciennement Gmodstore) propose des addons payants de qualité :
- **M9K Weapons** : Armes réalistes
- **VCMod** : Véhicules personnalisables
- **3D2D Textscreens** : Panneaux 3D
- **Advanced Duplicator 2** : Sauvegarde de constructions

:::warning Piratage
N'utilisez jamais d'addons piratés. Ils contiennent souvent des backdoors et peuvent compromettre votre serveur.
:::

## Sauvegarde

### Éléments à sauvegarder

- `/garrysmod/data/` : Données DarkRP, jobs, etc.
- `/garrysmod/addons/` : Vos addons
- `/garrysmod/cfg/` : Vos configs
- `/garrysmod/gamemodes/` : Gamemodes modifiés
- `server.cfg` : Configuration serveur

Sauvegardez régulièrement via SFTP.

## Ressources utiles

- [GMod Wiki](https://wiki.facepunch.com/gmod/)
- [DarkRP Documentation](https://darkrp.miraheze.org/)
- [Facepunch Forums](https://forum.facepunch.com/)
- [Workshop Steam GMod](https://steamcommunity.com/workshop/browse/?appid=4000)
- [Discord LKL Cloud](https://discord.gg/UaHNnMarQA)

## Besoin d'aide ?

Pour toute assistance avec votre serveur Garry's Mod :
- Rejoignez notre [Discord](https://discord.gg/UaHNnMarQA)
- Fournissez les logs du serveur
- Listez vos addons installés
- Décrivez précisément le problème rencontré
