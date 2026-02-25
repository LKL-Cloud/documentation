---
title: Optimiser son serveur FiveM
sidebar_position: 6
---

Guide complet pour optimiser les performances de votre serveur FiveM et offrir la meilleure expérience à vos joueurs.

## Diagnostic des performances

### Mesurer les performances actuelles

**Commande console :**
```bash
# Afficher FPS serveur (devrait être ~30)
perf

# Métriques détaillées
resmon
```

**Indicateurs clés :**
- **Server FPS** : 30 = Parfait, 20-25 = Acceptable, &lt;20 = Problématique
- **Tick Time** : &lt;5ms = Excellent, 5-15ms = Bon, &gt;15ms = À optimiser
- **RAM Usage** : Selon nombre de joueurs (100-150MB/joueur)

### Identifier les ressources gourmandes

Dans la console txAdmin ou FXServer :
```bash
# Afficher ressources par CPU usage
resmon

# Trier par ordre décroissant
# Identifiez les scripts consommant le plus
```

**Top 3 coupables habituels :**
1. Scripts véhicules personnalisés
2. HUD/UI complexes
3. Scripts de mapping dynamique

## Optimisation server.cfg

### Configuration réseau

```bash
# Endpoints
endpoint_add_tcp "0.0.0.0:30120"
endpoint_add_udp "0.0.0.0:30120"

# Heartbeat
sv_endpointprivacy true

# Network threading (améliore performances)
set sv_useSocketThreading true

# Enforcer GameBuild (stabilité)
sv_enforceGameBuild 2802

# Connexion settings
sv_maxclients 32  # Ajustez selon vos besoins
sv_timeout 120

# Téléchargement optimisé
sv_allowDownload true
load_server_icon logo.png
```

### OneSync optimisé

```bash
# OneSync avec optimisations
set onesync on
set onesync_enableInfinity 1  # Si disponible
set onesync_enableBeyond 0

# Distances de synchronisation réduites = meilleure perf
set onesync_distanceCullVehicles 400.0
set onesync_distanceCull 400.0

# Population AI (désactivez si RP sans PNJ)
set onesync_population 0

# Force migration
set onesync_forceMigration 1
```

### Convars performance

```bash
# FiveM performance convars
set sv_filterRequestControl 4
set sv_packetTimeInterval 10

# Voice chat optimisé
setr voice_useNativeAudio true
setr voice_use3dAudio false
setr voice_useSendingRangeOnly true

# Script hook
set sv_scriptHookAllowed 0

# Entity lockdown
set sv_entityLockdown true
```

## Optimisation scripts

### Bonnes pratiques Lua

**Évitez les boucles inutiles :**

```lua
-- ❌ MAUVAIS - Loop toutes les frames
Citizen.CreateThread(function()
    while true do
        Citizen.Wait(0)  -- Trop fréquent !
        -- Code
    end
end)

-- ✅ BON - Loop intelligente
Citizen.CreateThread(function()
    while true do
        Citizen.Wait(1000)  -- Toutes les secondes
        -- Code non-critique
    end
end)
```

**Utilisez les events au lieu de loops :**

```lua
-- ❌ MAUVAIS - Vérifier constamment
Citizen.CreateThread(function()
    while true do
        Citizen.Wait(0)
        if IsControlJustPressed(0, 38) then  -- E
            -- Action
        end
    end
end)

-- ✅ BON - Event listener
RegisterCommand('interact', function()
    -- Action
end, false)
```

**Optimisez les recherches de joueurs :**

```lua
-- ❌ MAUVAIS
for _, player in ipairs(GetPlayers()) do
    local ped = GetPlayerPed(player)
    local coords = GetEntityCoords(ped)
    -- Chaque frame = lourd !
end

-- ✅ BON - Cache et update moins fréquent
local nearbyPlayers = {}

Citizen.CreateThread(function()
    while true do
        Citizen.Wait(1000)  -- Update toutes les secondes
        nearbyPlayers = GetNearbyPlayers(100.0)
    end
end)
```

### Scripts à éviter

**Remplacements recommandés :**

| Script lourd | Alternative légère |
|--------------|-------------------|
| esx_scoreboard ancien | esx_scoreboard optimisé |
| bob74_ipl | PocceMod |
| vSync / cd_easytime | qb-weathersync |
| esx_status | Status moderne |

### Nettoyage des ressources

**Scripts inutilisés :**
```bash
# Commentez dans server.cfg
# ensure old_unused_script
```

**Doublons :**
- N'ayez qu'un seul script HUD
- Qu'un seul système d'inventaire
- Qu'un seul système de garage

## Optimisation base de données

### MySQL/MariaDB configuration

Dans `/etc/mysql/my.cnf` :

```ini
[mysqld]
# InnoDB optimizations
innodb_buffer_pool_size = 2G  # 70% RAM disponible
innodb_log_file_size = 512M
innodb_flush_log_at_trx_commit = 2
innodb_flush_method = O_DIRECT
innodb_file_per_table = 1

# Query cache
query_cache_type = 1
query_cache_size = 128M
query_cache_limit = 4M

# Connections
max_connections = 200
connect_timeout = 10
wait_timeout = 600

# Thread pool
thread_cache_size = 50
table_open_cache = 4000

# Binlog (désactivez si pas de réplication)
skip-log-bin
```

### Optimisation oxmysql

```bash
# server.cfg
set mysql_connection_string "mysql://user:pass@localhost/db?connectionLimit=10&charset=utf8mb4"
set mysql_slow_query_warning 100
set mysql_debug 0
```

### Index sur tables

Accélérez les requêtes :

```sql
-- Identifier et owner fréquemment recherchés
CREATE INDEX idx_identifier ON users(identifier);
CREATE INDEX idx_owner ON owned_vehicles(owner);

-- Tables d'inventaire
CREATE INDEX idx_item ON items(owner, name);

-- Logs avec date
CREATE INDEX idx_date ON server_logs(date);
```

### Nettoyage régulier

```sql
-- Supprimer anciens logs (> 30 jours)
DELETE FROM server_logs WHERE date < DATE_SUB(NOW(), INTERVAL 30 DAY);

-- Optimiser tables
OPTIMIZE TABLE users, owned_vehicles, items;

-- Analyser tables
ANALYZE TABLE users, owned_vehicles;
```

## Optimisation assets

### Modèles et textures

**Compression textures :**
- Utilisez DDS au lieu de PNG/JPG
- Résolution max 2048x2048 pour véhicules
- Résolution max 1024x1024 pour props

**YTD Optimizer :**
```bash
# Compresser automatiquement
ytd_optimizer.exe input.ytd output.ytd --quality 85
```

### Audio files

```bash
# Convertir en OGG (meilleure compression)
ffmpeg -i input.wav -c:a libvorbis -q:a 4 output.ogg

# Mono pour sons simples (économise 50%)
ffmpeg -i stereo.ogg -ac 1 mono.ogg
```

### Streaming optimisé

Dans `fxmanifest.lua` :

```lua
fx_version 'cerulean'
game 'gta5'

-- Streaming optimisé
this_is_a_map 'yes'

files {
    'stream/**/*.ytyp',
}

data_file 'DLC_ITYP_REQUEST' 'stream/**/*.ytyp'
```

## Optimisation cartes et maps

### Optimisation IPL

```lua
-- Désactiver IPL inutiles
Citizen.CreateThread(function()
    -- Liste IPL non utilisés
    local unusedIpls = {
        'id2_14_during_door',
        'id2_14_during1',
        'id2_14_during2',
    }
    
    for _, ipl in ipairs(unusedIpls) do
        RemoveIpl(ipl)
    end
end)
```

### LOD (Level of Detail)

Créez des LOD pour objets volumineux :
- Détaillé près (&lt;50m)
- Moyen proche (50-150m)
- Simplifié loin (&gt;150m)

### Props limits

```lua
-- Limiter props par zone
Config.MaxProps = {
    ["legion_square"] = 100,
    ["lsia"] = 50,
    ["default"] = 150
}
```

## Optimisation véhicules

### Handling optimisé

```xml
<!-- handling.meta -->
<fMass value="1400.0" />  <!-- Réduire masse -->
<fDragCoeff value="3.5" />  <!-- Réduire drag -->
```

### Streaming véhicules

```lua
-- Stream on-demand au lieu de pré-charger
Config.VehicleStreaming = true

-- Limiter véhicules simultanés
Config.MaxVehiclesSpawned = 10
```

### Cleanup automatique

```lua
-- Script cleanup.lua
Citizen.CreateThread(function()
    while true do
        Citizen.Wait(300000)  -- 5 minutes
        
        local vehicles = GetAllVehicles()
        for _, veh in ipairs(vehicles) do
            if not IsPedAVehicle(GetPedInVehicleSeat(veh, -1)) then
                local timer = GetVehicleUpgradeTimer(veh)
                if timer > 600 then  -- 10 min sans conducteur
                    DeleteEntity(veh)
                end
            end
        end
    end
end)
```

## Optimisation client-side

### NUI optimisé

**HTML/CSS léger :**

```html
<!-- Évitez gros frameworks comme Bootstrap -->
<!-- Utilisez CSS vanilla optimisé -->
<style>
/* Utilisez transforms au lieu de position */
.element {
    transform: translateX(100px);  /* GPU accelerated */
    /* Au lieu de: left: 100px; */
}
</style>
```

**JavaScript optimisé :**

```javascript
// Debounce events
function debounce(func, wait) {
    let timeout;
    return function() {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, arguments), wait);
    };
}

window.addEventListener('message', debounce((event) => {
    // Handle message
}, 100));
```

### DrawText optimisé

```lua
-- ❌ MAUVAIS - Recalcule chaque frame
Citizen.CreateThread(function()
    while true do
        Citizen.Wait(0)
        DrawText3D(x, y, z, "Texte")
    end
end)

-- ✅ BON - Cache et optimise
local textCoords = vector3(x, y, z)
Citizen.CreateThread(function()
    while true do
        Citizen.Wait(0)
        local pCoords = GetEntityCoords(PlayerPedId())
        if #(pCoords - textCoords) < 10.0 then
            DrawText3D(textCoords, "Texte")
        else
            Citizen.Wait(1000)  -- Plus lent si loin
        end
    end
end)
```

## Monitoring en continu

### txAdmin Monitoring

**Métriques à surveiller :**
- CPU Usage : &lt;70%
- RAM Usage : &lt;80% de disponible
- Tickrate : &gt;25 FPS
- Player Latency : &lt;100ms

### Logs analyse

```bash
# Chercher warnings
cat FXServer.log | grep "WARN"

# Scripts lents
cat FXServer.log | grep "took"

# Erreurs fréquentes
cat FXServer.log | grep "ERROR" | sort | uniq -c
```

### Alertes automatiques

Script Discord webhook :

```bash
#!/bin/bash
# monitor.sh

CPU=$(top -bn1 | grep "Cpu(s)" | awk '{print $2}')
RAM=$(free | grep Mem | awk '{print ($3/$2) * 100.0}')

if (( $(echo "$CPU > 80" | bc -l) )); then
    curl -X POST "WEBHOOK_URL" \
        -H "Content-Type: application/json" \
        -d "{\"content\":\"⚠️ CPU usage: ${CPU}%\"}"
fi
```

## Optimisations avancées

### Multi-threading

Activez dans server.cfg :

```bash
set sv_useSocketThreading true
set sv_netThread true
```

### Garbage Collection

```lua
-- Forcer GC régulièrement côté serveur
Citizen.CreateThread(function()
    while true do
        Citizen.Wait(600000)  -- 10 minutes
        collectgarbage("collect")
    end
end)
```

### Asset pré-loading sélectif

```lua
-- Charger uniquement assets nécessaires
Citizen.CreateThread(function()
    local models = {
        GetHashKey("adder"),
        GetHashKey("zentorno")
    }
    
    for _, model in ipairs(models) do
        RequestModel(model)
        while not HasModelLoaded(model) do
            Citizen.Wait(0)
        end
    end
end)
```

## Checklist optimisation

### Avant lancement

- [ ] Scripts testés et optimisés
- [ ] Base de données indexée
- [ ] Assets compressés
- [ ] Server.cfg configuré
- [ ] Backup créée
- [ ] Load test effectué

### Maintenance régulière

- [ ] Logs analysés (hebdomadaire)
- [ ] BDD optimisée (mensuel)
- [ ] Cleanup ressources (mensuel)
- [ ] Updates scripts (mensuel)
- [ ] Monitoring actif (quotidien)

## Résultats attendus

**Avant optimisation :**
- Server FPS : 15-20
- RAM : 12GB pour 32 joueurs
- Latence : 80-150ms
- Lag spikes fréquents

**Après optimisation :**
- Server FPS : 28-30
- RAM : 6-8GB pour 32 joueurs
- Latence : 40-80ms
- Performance stable

## Ressources

- [FiveM Performance Guide](https://docs.fivem.net/docs/scripting-manual/optimization/)
- [MySQL Tuner](https://github.com/major/MySQLTuner-perl)
- [Lua Performance Tips](https://www.lua.org/gems/sample.pdf)

## Support

Besoin d'aide pour optimiser ? [Discord LKL Cloud](https://discord.gg/UaHNnMarQA)
