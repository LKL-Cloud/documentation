---
title: Activer OneSync et OneSync Infinity
---

Configuration de OneSync et OneSync Infinity pour augmenter le nombre de joueurs et améliorer les performances de votre serveur FiveM.

## Qu'est-ce que OneSync ?

OneSync est un système de synchronisation développé par l'équipe FiveM permettant d'augmenter la limite de joueurs au-delà de 32 slots vanilla.

**Versions disponibles :**

**OneSync Legacy** (Gratuit)
- Jusqu'à **48 joueurs**
- Inclus avec toute clé serveur
- Synchronisation améliorée

**OneSync Infinity** (Patreon)
- Jusqu'à **2048 joueurs**
- Nécessite tier Patreon
- Optimisations avancées
- Support entités étendu

**OneSync Beyond** (Patreon+)
- Plus de 2048 joueurs théoriques
- Maximum testé : 1024+ joueurs
- Requiert infrastructure puissante

## Prérequis

### Pour OneSync Legacy (Gratuit)

- Clé serveur FiveM valide
- FiveM artifacts récents (build 2802+)
- 2GB RAM minimum pour 48 slots

### Pour OneSync Infinity

1. **Abonnement Patreon** tier "El Jefe" ou supérieur
   - https://www.patreon.com/fivem

2. **Lier compte Patreon à Keymaster**
   - Connectez-vous sur https://keymaster.fivem.net
   - Liez votre compte Patreon

3. **Ressources hardware augmentées**
   - 4GB+ RAM recommandé
   - CPU multicœurs performant
   - Bande passante suffisante

## Activation OneSync Legacy

### Dans server.cfg

Ajoutez ces lignes :

```bash
# Activer OneSync
set onesync on

# Type: legacy (gratuit)
set onesync_enableInfinity 0
set onesync_enableBeyond 0

# Augmenter slots
sv_maxclients 48

# Population settings
set onesync_population 1
set onesync_distanceCullVehicles 1000.0
set onesync_distanceCull 1000.0
```

### Vérification

Démarrez le serveur et dans la console :

```
[OneSync] Enabled: true
[OneSync] Infinity: false
[OneSync] Max clients: 48
```

Si vous voyez ces messages, OneSync est actif !

## Activation OneSync Infinity

### Vérifier l'éligibilité

1. Compte Patreon actif tier requis
2. Compte lié sur Keymaster
3. Clé serveur générée avec Patreon lié

### Configuration server.cfg

```bash
# OneSync Infinity
set onesync on
set onesync_enableInfinity 1
set onesync_enableBeyond 0

# Nombre de slots (ajustez selon vos besoins)
sv_maxclients 128

# Optimisations
set onesync_population 1
set onesync_distanceCullVehicles 500.0
set onesync_distanceCull 500.0
set onesync_logRequestsData 0
set onesync_forceMigration 1
```

### Test progressif

**Ne passez pas directement à 128 slots !**

1. Commencez à **64 slots**
2. Testez charge et stabilité
3. Augmentez progressivement
4. Surveillez performances

## Configuration optimale

### Distance culling

Ajustez les distances de synchronisation :

```bash
# Véhicules visibles jusqu'à 500m
set onesync_distanceCullVehicles 500.0

# Joueurs visibles jusqu'à 500m  
set onesync_distanceCull 500.0

# Pour grands serveurs (économiser ressources)
set onesync_distanceCullVehicles 350.0
set onesync_distanceCull 350.0
```

### Population settings

```bash
# Population AI (PNJ, trafic)
set onesync_population 1

# Désactiver si serveur RP sans AI
# set onesync_population 0
```

### Migration forcée

```bash
# Force migration scope ownership
set onesync_forceMigration 1

# Utile pour serveurs à haute densité
```

### Logs debug (développement seulement)

```bash
# Activer logs OneSync détaillés
set onesync_logRequestsData 1

# Désactivez en production (spam console)
```

## Optimisations par nombre de joueurs

### 32-48 joueurs (OneSync Legacy)

```bash
set onesync on
set onesync_enableInfinity 0
sv_maxclients 48
set onesync_distanceCullVehicles 1000.0
set onesync_distanceCull 1000.0
set onesync_population 1
```

**Ressources recommandées :**
- RAM : 4GB
- CPU : 2 cores
- Bande passante : 50 Mbps

### 64-128 joueurs (Infinity)

```bash
set onesync on
set onesync_enableInfinity 1
sv_maxclients 128
set onesync_distanceCullVehicles 500.0
set onesync_distanceCull 500.0
set onesync_population 1
set onesync_forceMigration 1
```

**Ressources recommandées :**
- RAM : 8-12GB
- CPU : 4+ cores haute fréquence
- Bande passante : 100 Mbps

### 256+ joueurs (Beyond)

```bash
set onesync on
set onesync_enableInfinity 1
set onesync_enableBeyond 1
sv_maxclients 256
set onesync_distanceCullVehicles 300.0
set onesync_distanceCull 300.0
set onesync_population 0  # Désactiver AI
set onesync_forceMigration 1
```

**Ressources recommandées :**
- RAM : 16GB+
- CPU : 8+ cores haute fréquence
- Bande passante : 250+ Mbps
- Infrastructure distribuée recommandée

## Compatibilité scripts

### Scripts compatibles OneSync

La plupart des scripts modernes sont compatibles. Vérifiez :

```lua
-- Dans le script
if GetConvarInt('onesync_enabled', 0) == 1 then
    -- Code optimisé OneSync
else
    -- Code vanilla
end
```

### Scripts problématiques

**Native non supportées :**
- Certaines natives réseau anciennes
- Scripts avec hardcoded slots (32)
- Anciens scripts de gestion joueurs

**Solutions :**
- Mettez à jour les scripts
- Utilisez alternatives modernes
- Contactez développeur

### Frameworks compatibles

**ESX Legacy** ✅
```lua
-- Support OneSync natif
Config.MaxSlots = GetConvarInt('sv_maxclients', 32)
```

**QBCore** ✅
```lua
-- Pleinement compatible
QBConfig.MaxPlayers = GetConvarInt('sv_maxclients', 32)
```

**vRP** ✅
```lua
-- Compatible avec configuration
cfg.max_players = GetConvarInt('sv_maxclients', 32)
```

## Monitoring et performance

### Commandes debug

Dans la console serveur :

```bash
# Statistiques OneSync
onesync_stats

# Voir scopes actifs
onesync_showScopes

# Lister migrations
onesync_showMigrations
```

### Métriques à surveiller

**CPU Usage :**
- < 50% = Bon
- 50-80% = Acceptable
- > 80% = Problématique

**RAM Usage :**
- Planifiez 100-150MB par joueur
- 64 joueurs = 8-10GB RAM
- 128 joueurs = 16-20GB RAM

**Network :**
- Upload : ~1 Mbps par joueur
- 64 joueurs = 64 Mbps upload minimum
- 128 joueurs = 128 Mbps upload minimum

### Outils monitoring

**txAdmin Dashboard :**
- CPU/RAM en temps réel
- Joueurs connectés
- Performance tickrate

**Externes :**
- Grafana + Prometheus
- Netdata
- htop/glances

## Optimisation ressources

### Scripts côté serveur

Limitez les ressources gourmandes :

```lua
-- Évitez trop de threads
Citizen.CreateThread(function()
    while true do
        Citizen.Wait(1000)  -- Pas 0 !
        -- Code
    end
end)
```

### Entités et objets

```bash
# Limiter entités
set onesync_distanceCullVehicles 400.0

# Cleanup automatique
ensure cleanupscript
```

### Streaming assets

```bash
# Limiter ressources streamées
set onesync_useExperimentalWeaponAssetLoader 1
```

## Mise à l'échelle

### Architecture distribuée

Pour 500+ joueurs, envisagez :

**Multi-serveurs avec load balancing :**
- Serveur 1 : Zone A (128 joueurs)
- Serveur 2 : Zone B (128 joueurs)
- Serveur 3 : Zone C (128 joueurs)

**Transition seamless :**
```lua
-- Script de transfert inter-serveurs
exports['multiserver']:TransferPlayer(source, 'server2')
```

### Base de données

**MySQL optimisé :**
```ini
max_connections = 500
innodb_buffer_pool_size = 8G
thread_cache_size = 100
```

**Connexion pooling :**
```lua
set mysql_connection_string "mysql://user:pass@host/db?connectionLimit=50"
```

## Dépannage

### "OneSync is not enabled"

**Causes :**
- Convar manquant
- Clé serveur invalide
- Build artifacts ancien

**Solution :**
```bash
# Vérifier build
version

# Doit être > 2802
# Mettre à jour si nécessaire
```

### Infinity non disponible

**Message :**
```
[OneSync] Infinity is not available with your server key
```

**Solutions :**
1. Vérifiez Patreon actif
2. Reliez compte sur Keymaster
3. Générez nouvelle clé serveur
4. Attendez 5 minutes propagation

### Lag avec beaucoup de joueurs

**Optimisations :**

```bash
# Réduire distances
set onesync_distanceCullVehicles 300.0
set onesync_distanceCull 300.0

# Désactiver AI si inutile
set onesync_population 0

# Limiter tick rate scripts
# Vérifiez scripts lourds
```

### Crashes fréquents

**Causes communes :**
- RAM insuffisante
- Scripts incompatibles
- Trop d'entités

**Diagnostic :**
```bash
# Logs
cat FXServer.log | grep "ERROR"

# Vérifier RAM
free -h

# Top processes
htop
```

### Désyncs joueurs

**Symptômes :**
- Joueurs "téléportent"
- Actions non synchronisées
- Véhicules fantômes

**Solutions :**
```bash
# Augmenter tick rate
sv_maxClients 64  # Réduire si problème
set onesync_forceMigration 1

# Vérifier latence réseau
# Clients > 150ms = problème potentiel
```

## Bonnes pratiques

### Scaling progressif

1. **Démarrez à 32 slots** (vanilla)
2. **Testez à 48** (OneSync Legacy)
3. **Si stable, passez à 64** (Infinity)
4. **Puis 96, 128** progressivement
5. **Surveillez métriques** à chaque étape

### Tests de charge

Avant lancement public :

```bash
# Simuler joueurs
# Utilisez bots ou invitez testeurs
# Mesurez :
- Tickrate moyen
- RAM peak usage  
- CPU utilization
- Latence joueurs
```

### Maintenance

```bash
# Restart réguliers
# Toutes les 6-12h recommandé pour > 100 joueurs

# Backup avant changements
# Toujours tester en dev
```

## Alternatives pour petits budgets

Si OneSync Infinity trop cher :

**Optimiser avec OneSync Legacy (gratuit) :**
- 48 slots bien optimisés
- Scripts légers uniquement
- Hardware correct
- Expérience fluide possible

**Multiserveurs :**
- 2x serveurs 48 slots
- Plus économique que 1x Infinity
- Communauté divisée mais viable

## Ressources

- [OneSync Documentation](https://docs.fivem.net/docs/scripting-reference/onesync/)
- [Patreon FiveM](https://www.patreon.com/fivem)
- [Keymaster](https://keymaster.fivem.net/)
- [Forum FiveM](https://forum.cfx.re/)

## Support

Questions sur OneSync ? [Discord LKL Cloud](https://discord.gg/UaHNnMarQA)
