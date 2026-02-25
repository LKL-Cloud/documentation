---
title: Serveur Minecraft
sidebar_position: 1
toc: false
---

Guide complet pour installer et gérer votre serveur Minecraft sur LKL Cloud.

## Types de serveurs disponibles

LKL Cloud propose plusieurs versions de serveurs Minecraft :

### Vanilla

Serveur Minecraft **officiel** sans modifications :
- Version pure du jeu
- Mises à jour automatiques
- Performance optimale
- Idéal pour du survie classique

### Spigot

Version **modifiée** avec support de plugins :
- Compatible avec les plugins Bukkit
- Meilleure performance que Vanilla
- API complète pour développeurs
- Grande communauté

### Paper

Fork **optimisé** de Spigot :
- Performance supérieure
- Corrections de bugs avancées
- Compatible plugins Spigot/Bukkit
- **Recommandé** pour serveurs populaires

### Forge

Pour les **mods** côté client et serveur :
- Supporte les mods Forge
- Nécessite que les joueurs installent les mods
- Idéal pour modpacks
- Compatible avec CurseForge

### Fabric

Alternative **légère** à Forge :
- Plus rapide que Forge
- Mods modernes et optimisés
- Mises à jour rapides
- Compatible avec les shaders

## Installation via le Panel

1. **Connectez-vous** au [Panel Game](https://game.lklcloud.fr/)
2. Sélectionnez votre serveur Minecraft
3. Choisissez la **version** (1.20.x, 1.19.x, etc.)
4. Sélectionnez le **type** (Paper, Spigot, Fabric, etc.)
5. Démarrez le serveur

:::tip Première installation
Lors du premier démarrage, le serveur génère le monde et les fichiers de configuration. Cela peut prendre quelques minutes.
:::

## Configuration de base

### server.properties

Fichier principal de configuration :

```properties
# Informations serveur
server-name=Mon Serveur Minecraft - LKL Cloud
motd=Bienvenue sur notre serveur !
max-players=20

# Mode de jeu
gamemode=survival
difficulty=normal
pvp=true
online-mode=true

# Monde
level-name=world
level-seed=
spawn-protection=16
view-distance=10
simulation-distance=10

# Performance
max-tick-time=60000
```

### Ports utilisés

<div class="custom-table">

| SERVICE | PORT | PROTOCOLE | USAGE |
|---------|------|-----------|-------|
| Minecraft | 25565 | TCP | Connexion des joueurs |
| RCON | 25575 | TCP | Administration à distance |
| Query | 25565 | UDP | Liste des joueurs |

</div>

## Installer des plugins (Paper/Spigot)

### Via le Panel

1. Allez dans **Fichiers** > **plugins/**
2. Uploadez votre fichier `.jar`
3. **Redémarrez** le serveur
4. Le plugin sera chargé automatiquement

### Plugins essentiels recommandés

**Gestion :**
- **EssentialsX** : Commandes de base (/tp, /home, /warp)
- **LuckPerms** : Système de permissions avancé
- **Vault** : API pour économie et permissions

**Protection :**
- **WorldGuard** : Protection de zones
- **WorldEdit** : Édition de terrain
- **CoreProtect** : Logs et rollback

**Performance :**
- **ClearLag** : Nettoie les entités
- **FastAsyncWorldEdit** : WorldEdit optimisé
- **Chunky** : Pré-génération de chunks

**Économie :**
- **EssentialsX Economy** : Système monétaire
- **ChestShop** : Boutiques joueurs
- **Jobs** : Système de métiers

## Installer des mods (Forge/Fabric)

### Configuration Forge

1. Téléchargez les mods depuis [CurseForge](https://www.curseforge.com/minecraft/mc-mods)
2. Uploadez les fichiers `.jar` dans `/mods/`
3. Redémarrez le serveur
4. **Important** : Les joueurs doivent avoir les mêmes mods

### Configuration Fabric

1. Installez **Fabric API** (obligatoire)
2. Ajoutez vos mods dans `/mods/`
3. Redémarrez le serveur
4. Les joueurs installent Fabric Loader + les mods

:::warning Compatibilité
Assurez-vous que tous les mods sont compatibles avec votre version de Minecraft et entre eux. Des mods incompatibles peuvent crasher le serveur.
:::

## Gestion du monde

### Sauvegarder le monde

Via SFTP :
1. Arrêtez le serveur
2. Téléchargez le dossier `/world/`
3. Conservez-le en sécurité

### Restaurer une sauvegarde

1. Arrêtez le serveur
2. Supprimez l'ancien dossier `/world/`
3. Uploadez votre sauvegarde
4. Redémarrez le serveur

### Changer de seed

Dans `server.properties` :
```properties
level-seed=123456789
```
Puis supprimez le monde existant et redémarrez.

### Importer un monde personnalisé

1. Préparez votre monde (dossier avec region/, data/, etc.)
2. Arrêtez le serveur
3. Uploadez via SFTP dans le dossier racine
4. Renommez-le en `world`
5. Redémarrez

## Whitelist

### Activer la whitelist

```properties
white-list=true
```

### Ajouter des joueurs

Via console :
```
whitelist add NomDuJoueur
whitelist reload
```

Via fichier `whitelist.json` :
```json
[
  {
    "uuid": "UUID-du-joueur",
    "name": "NomDuJoueur"
  }
]
```

## Opérateurs (OP)

### Donner les droits OP

Via console :
```
op NomDuJoueur
```

### Niveaux OP

<div class="custom-table">

| NIVEAU | PERMISSIONS |
|--------|-------------|
| 1 | Bypass spawn protection |
| 2 | /clear, /difficulty, /effect, /gamemode, /tp |
| 3 | /ban, /kick, /op |
| 4 | /stop (arrêt serveur) |

</div>

## Optimisation des performances

### Dans server.properties

```properties
# Réduire la distance de vue
view-distance=8
simulation-distance=6

# Désactiver ce qui n'est pas nécessaire
spawn-animals=true
spawn-monsters=true
spawn-npcs=false
```

### Avec Paper

Éditez `paper-global.yml` :
```yaml
chunk-loading:
  autoconfig-send-distance: true
  target-player-chunk-send-rate: 100.0

async-chunks:
  threads: 4
```

### Plugins d'optimisation

- **Paper** : Déjà optimisé de base
- **ClearLag** : Nettoie les items au sol
- **FarmControl** : Limite les fermes automatiques
- **EntityTrackerFixer** : Optimise le tracking

## Dépannage

### Le serveur crash au démarrage

- ✅ Vérifiez les **logs** dans le panel
- ✅ Assurez-vous que les plugins sont **compatibles**
- ✅ Supprimez les mods/plugins problématiques
- ✅ Vérifiez que la RAM est suffisante

### Lag / TPS bas

TPS (Ticks Per Second) devrait être à 20 :

1. Utilisez `/tps` pour vérifier
2. Identifiez les chunks laggeux avec `/timings`
3. Réduisez `view-distance` et `simulation-distance`
4. Installez ClearLag
5. Pré-générez les chunks avec Chunky

### Joueurs ne peuvent pas se connecter

- ✅ Vérifiez que `online-mode=true`
- ✅ Désactivez temporairement la whitelist
- ✅ Vérifiez le pare-feu (port 25565)
- ✅ Testez avec l'IP:PORT directement

### Monde corrompu

Si le monde est corrompu :
1. Arrêtez le serveur
2. Sauvegardez `/world/` (même corrompu)
3. Utilisez [MCEdit](https://www.mcedit.net/) pour réparer
4. Ou restaurez une sauvegarde précédente

## Commandes utiles

### Gestion serveur

```
/stop - Arrêter le serveur
/save-all - Sauvegarder le monde
/reload - Recharger la config (déconseillé)
/whitelist on/off - Activer/désactiver whitelist
```

### Gestion joueurs

```
/op <joueur> - Donner OP
/deop <joueur> - Retirer OP
/ban <joueur> - Bannir
/pardon <joueur> - Débannir
/kick <joueur> - Éjecter
```

### Monde

```
/time set <value> - Changer l'heure
/weather clear/rain - Changer la météo
/gamerule <rule> <value> - Modifier les règles
/tp <joueur> <x> <y> <z> - Téléporter
```

## Mises à jour

### Mettre à jour la version

1. **Sauvegardez** votre serveur complet
2. Dans le panel, changez la version
3. Vérifiez la compatibilité des plugins/mods
4. Redémarrez le serveur
5. Testez que tout fonctionne

:::danger Mises à jour majeures
Les mises à jour majeures (1.19 → 1.20) peuvent nécessiter de mettre à jour tous vos plugins et peuvent causer des incompatibilités.
:::

## Ressources utiles

- [Documentation Spigot](https://www.spigotmc.org/wiki/)
- [PaperMC Docs](https://docs.papermc.io/)
- [Fabric Wiki](https://fabricmc.net/wiki/)
- [Forge Documentation](https://docs.minecraftforge.net/)
- [Discord LKL Cloud](https://discord.gg/UaHNnMarQA)

## Besoin d'aide ?

Pour toute assistance avec votre serveur Minecraft :
- Rejoignez notre [Discord](https://discord.gg/UaHNnMarQA)
- Consultez les logs dans le panel
- Fournissez la version de Minecraft et la liste des plugins/mods
