---
title: Serveur FiveM
toc: false
---

Guide complet pour installer et configurer votre serveur FiveM sur LKL Cloud.

## Qu'est-ce que FiveM ?

FiveM est une modification pour Grand Theft Auto V permettant de jouer sur des serveurs multijoueurs personnalisés avec des mods, scripts et ressources uniques.

## Prérequis

Avant de commencer, assurez-vous d'avoir :

- Un serveur de jeu actif sur LKL Cloud
- Une copie légale de GTA V (Steam, Epic Games ou Rockstar)
- Accès au panel de jeu

## Installation du serveur

### Via le Panel Game

1. **Connectez-vous** au [Panel Game](https://game.lklcloud.fr/)
2. Sélectionnez votre serveur FiveM
3. Le serveur est **pré-installé** avec txAdmin
4. Démarrez le serveur pour la première fois

### Configuration initiale

Lors du premier démarrage :

1. Accédez à **txAdmin** via le port indiqué (généralement 40120)
2. Créez votre compte administrateur
3. Suivez l'assistant de configuration
4. Choisissez un template de serveur :
   - **Popular Templates** : Serveurs roleplay complets
   - **Empty** : Serveur vierge pour personnalisation

:::tip txAdmin
txAdmin est l'interface d'administration recommandée pour gérer votre serveur FiveM. Elle permet de gérer les ressources, les permissions et le monitoring.
:::

## Configuration des ports

Votre serveur FiveM utilise plusieurs ports :

<div class="custom-table">

| SERVICE | PORT | PROTOCOLE | USAGE |
|---------|------|-----------|-------|
| FiveM Principal | 30120 | TCP/UDP | Connexion des joueurs |
| txAdmin | 40120 | TCP | Interface d'administration |

</div>

Ces ports sont **automatiquement configurés** sur votre serveur LKL Cloud.

## Ajouter des ressources

### Via txAdmin

1. Accédez à l'interface **txAdmin**
2. Allez dans **Resources**
3. Cliquez sur **Add Resource**
4. Téléchargez ou installez depuis GitHub

### Via FTP

1. Connectez-vous en **SFTP** à votre serveur
2. Naviguez vers `/resources/`
3. Uploadez votre dossier de ressource
4. Redémarrez le serveur

### Activer une ressource

Dans votre fichier `server.cfg`, ajoutez :

```cfg
ensure nom_de_la_ressource
```

## Configuration du server.cfg

Exemple de configuration minimale :

```cfg
# Informations serveur
sv_hostname "Mon Serveur FiveM - LKL Cloud"
sv_maxclients 32

# License key (obtenir sur https://keymaster.fivem.net)
sv_licenseKey "votre_clé_ici"

# Endpoint
endpoint_add_tcp "0.0.0.0:30120"
endpoint_add_udp "0.0.0.0:30120"

# Ressources de base
ensure mapmanager
ensure chat
ensure spawnmanager
ensure sessionmanager
ensure basic-gamemode
ensure hardcap
```

:::warning Clé de licence
Obtenez votre clé de licence gratuite sur [FiveM Keymaster](https://keymaster.fivem.net). Sans cette clé, votre serveur ne démarrera pas.
:::

## Ressources essentielles

### Ressources de base

- **mapmanager** : Gestion des maps
- **spawnmanager** : Gestion des spawns
- **sessionmanager** : Gestion des sessions
- **chat** : Système de chat

### Ressources populaires

- **esx_core** / **qb-core** : Frameworks roleplay
- **pma-voice** : Communication vocale
- **ox_lib** : Bibliothèque de fonctions
- **ox_inventory** : Système d'inventaire

## Dépannage

### Le serveur ne démarre pas

- ✅ Vérifiez que votre **clé de licence** est valide
- ✅ Consultez les logs dans txAdmin
- ✅ Assurez-vous que le port 30120 est disponible
- ✅ Vérifiez que vos ressources sont compatibles

### Erreur "Failed to verify Protected resource"

Certaines ressources nécessitent une clé Tebex ou Escrow :
- Consultez la documentation de la ressource
- Ajoutez les clés dans `server.cfg`

### Joueurs qui ne peuvent pas se connecter

1. Vérifiez que votre serveur est **listé**
2. Testez la connexion directe : `connect IP:30120`
3. Vérifiez les **artifacts** (version FiveM server)

## Optimisation

### Performance

- Limitez le nombre de ressources actives
- Utilisez des ressources optimisées
- Surveillez l'utilisation RAM dans txAdmin
- Nettoyez régulièrement les logs

### Sécurité

```cfg
# Restreindre les commandes admin
add_ace group.admin command allow
add_principal identifier.steam:VOTRE_STEAM_ID group.admin

# Anti-cheat
sv_scriptHookAllowed 0
```

## Mises à jour

### Mettre à jour les artifacts

1. Accédez à txAdmin
2. Allez dans **Settings** > **FXServer**
3. Cliquez sur **Update Server**
4. Redémarrez après l'update

:::caution Sauvegarde
Faites toujours une sauvegarde avant de mettre à jour votre serveur ou d'installer de nouvelles ressources importantes.
:::

## Ressources utiles

- [Documentation officielle FiveM](https://docs.fivem.net/)
- [Forum FiveM](https://forum.cfx.re/)
- [CFX Cookbook](https://cookbook.fivem.net/)
- [Discord LKL Cloud](https://discord.gg/UaHNnMarQA)

## Besoin d'aide ?

Si vous rencontrez des difficultés avec votre serveur FiveM, contactez notre support sur [Discord](https://discord.gg/UaHNnMarQA) avec :
- Les logs de votre serveur
- La description du problème
- Votre configuration (server.cfg)
