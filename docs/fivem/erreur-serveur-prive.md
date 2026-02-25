---
title: Erreur "Serveur Privé"
sidebar_position: 7
---

Solutions pour résoudre l'erreur "Ce serveur est privé" lors de la connexion à votre serveur FiveM.

## Comprendre l'erreur

L'erreur "**Ce serveur est privé**" apparaît quand un joueur essaie de se connecter mais que le serveur refuse l'accès.

**Message exact :**
```
You were kicked from the server:
This server is currently private
```

## Causes principales

### 1. Whitelist activée

Si votre serveur utilise un système de whitelist (liste blanche).

**Frameworks concernés :**
- ESX avec whitelist
- QBCore whitelist
- vRP whitelist
- Scripts whitelist custom

### 2. Serveur en développement

Mode développement activé dans txAdmin ou configuration.

### 3. Configuration ACE permissions

Restrictions d'accès via système ACE de FiveM.

### 4. Scripts de sécurité

Addons anti-cheat ou sécurité bloquant connexions.

## Solutions

### Désactiver la whitelist

**ESX :**

Dans `es_extended/config.lua` :
```lua
Config.EnableESXIdentity = false

-- Ou dans la base de données
-- UPDATE users SET enabled = 1 WHERE identifier = 'steam:xxx';
```

**QBCore :**

Dans `qb-core/config.lua` :
```lua
QBConfig.Server = {
    whitelist = false,  -- Désactiver
    closed = false,
}
```

**vRP :**

Dans `vrp/cfg/base.lua` :
```lua
cfg.whitelist = false
```

### Ajouter joueur à la whitelist

**Via base de données :**

```sql
-- ESX
INSERT INTO whitelist (identifier) VALUES ('steam:xxxxx');

-- QBCore
INSERT INTO whitelist (steam, license) VALUES ('steam:xxxxx', 'license:xxxxx');
```

**Via commandes serveur :**

```bash
# ESX
whitelist_add steam:xxxxx

# QBCore
/whitelist add [ID]
```

### Vérifier ACE permissions

Dans `server.cfg` :

```bash
# Désactiver restrictions ACE temporairement
# Commentez ces lignes :
# add_ace resource.exemple allow
# add_principal identifier.steam:xxxxx group.admin

# Ou ajoutez accès global (non recommandé production)
add_ace builtin.everyone command.connect allow
```

### Désactiver mode privé txAdmin

1. Ouvrez **txAdmin**
2. **Settings** > **FXServer**
3. Désactivez **Private Server Mode**
4. Sauvegardez et redémarrez

### Scripts de sécurité

**Vérifiez scripts actifs :**

```lua
-- Dans server.cfg, désactivez temporairement
# ensure anticheat
# ensure securityscript
```

**Redémarrez serveur et testez.**

## Configuration whitelist correcte

### ESX avec whitelist

**1. Activer dans config :**

```lua
-- es_extended/config.lua
Config.EnableESXIdentity = true
```

**2. Table whitelist SQL :**

```sql
CREATE TABLE IF NOT EXISTS `whitelist` (
  `identifier` varchar(46) NOT NULL,
  PRIMARY KEY (`identifier`)
);
```

**3. Ajouter admins :**

```sql
INSERT INTO whitelist (identifier) VALUES 
('steam:110000xxxxxxxx'),
('license:xxxxxxxxxxxxxxxx');
```

### QBCore whitelist

**qb-core/config.lua :**

```lua
QBConfig.Server = {
    whitelist = true,
    closed = false,
    closedReason = "Serveur en maintenance",
    whitelist = true,
    whitelistPermission = 'whitelist',
}
```

**Ajouter via commande :**

```bash
/whitelist add [ID]
```

### vRP whitelist

**vrp/cfg/base.lua :**

```lua
cfg.whitelist = true
```

**Ajouter dans MySQL :**

```sql
INSERT INTO vrp_users (id, whitelisted, banned) 
VALUES (1, 1, 0);
```

## Whitelist par Discord

### Bot Discord pour gestion

**FiveM Discord Bot :**

```lua
-- Dans server.cfg
set sv_discordAppId "YOUR_APP_ID"
set sv_discordBotToken "YOUR_BOT_TOKEN"
set sv_discordGuildId "YOUR_GUILD_ID"

-- Vérification rôle Discord
ensure discord_perms
```

**Script de vérification :**

```lua
-- discord_whitelist.lua
AddEventHandler('playerConnecting', function(name, setKickReason, deferrals)
    local player = source
    local identifiers = GetPlayerIdentifiers(player)
    local discord = nil
    
    for _, id in pairs(identifiers) do
        if string.match(id, 'discord:') then
            discord = string.gsub(id, 'discord:', '')
        end
    end
    
    if discord then
        -- Vérifier rôle Discord
        if not exports.discord_perms:IsRolePresent(discord, WHITELIST_ROLE_ID) then
            deferrals.done('Vous n\'êtes pas whitelist. Rejoignez le Discord!')
        end
    else
        deferrals.done('Discord non détecté. Liez votre compte!')
    end
end)
```

## Messages personnalisés

### Personnaliser message d'erreur

**ESX :**

```lua
-- es_extended/locales/fr.lua
['not_whitelisted'] = 'Vous n\'êtes pas autorisé à rejoindre ce serveur. Postulez sur notre Discord: discord.gg/xxxxx',
```

**QBCore :**

```lua
-- qb-core/config.lua
QBConfig.Server = {
    whitelist = true,
    whitelistMessage = 'Vous devez être whitelist pour rejoindre. Discord: discord.gg/xxxxx',
}
```

**Custom script :**

```lua
AddEventHandler('playerConnecting', function(name, setKickReason, deferrals)
    deferrals.defer()
    
    Wait(0)
    deferrals.update('Vérification whitelist...')
    
    -- Vérifications...
    
    if not isWhitelisted then
        deferrals.done('🔒 Serveur privé\n\nPostulez sur notre Discord:\ndiscord.gg/xxxxx\n\nTemps de réponse: 24-48h')
    else
        deferrals.done()
    end
end)
```

## Mode maintenance

### Fermer serveur temporairement

**QBCore :**

```lua
QBConfig.Server = {
    closed = true,
    closedReason = "Maintenance en cours. Retour prévu: 18h00",
}
```

**ESX :**

```lua
-- Script custom
local serverClosed = true
local closedReason = "Mise à jour en cours..."

AddEventHandler('playerConnecting', function(name, setKickReason, deferrals)
    if serverClosed then
        deferrals.done(closedReason)
    end
end)
```

**Exceptions admins :**

```lua
AddEventHandler('playerConnecting', function(name, setKickReason, deferrals)
    local player = source
    local identifiers = GetPlayerIdentifiers(player)
    
    if serverClosed then
        -- Autoriser admins
        if IsPlayerAceAllowed(player, 'admin') then
            deferrals.done()
        else
            deferrals.done('Serveur en maintenance')
        end
    end
end)
```

## Système de candidature

### Script de whitelist automatique

**Formulaire Discord :**

1. Bot Discord avec formulaire
2. Questions: Âge, expérience RP, motivation
3. Validation par staff
4. Ajout automatique en BDD

**Intégration FiveM :**

```lua
-- Script API Discord
RegisterServerEvent('whitelist:check')
AddEventHandler('whitelist:check', function()
    local player = source
    local identifier = GetPlayerIdentifier(player, 0)
    
    -- API call vers bot Discord
    PerformHttpRequest('https://votre-bot.com/api/checkWhitelist', function(err, text, headers)
        local data = json.decode(text)
        if data.whitelisted then
            -- Autoriser connexion
        else
            DropPlayer(player, 'Candidature en attente de validation')
        end
    end, 'POST', json.encode({
        identifier = identifier
    }), { ['Content-Type'] = 'application/json' })
end)
```

## Dépannage

### Joueur whitelisté ne peut pas se connecter

**Vérifications :**

1. **Identifiant correct :**
```sql
-- Vérifier identifiants du joueur
SELECT * FROM whitelist WHERE identifier LIKE '%steam:xxxxx%';
```

2. **Format identifiant :**
```
steam:110000xxxxxxxx  ✅ Bon
steam:xxxxxxxx        ❌ Mauvais
```

3. **Cache whitelist :**
```lua
-- Recharger ressource
restart es_extended
# Ou
refresh
ensure es_extended
```

### Tous les joueurs refusés

Script whitelist mal configuré.

**Test :**
```lua
-- Désactiver temporairement
stop whitelist_script

-- Tester connexion
-- Si OK = problème script
```

### Erreur après ajout en BDD

**Redémarrer serveur complet :**
```bash
stop
# Attendre 10 secondes
start
```

Ou forcer reload :
```lua
restart es_extended
restart qb-core
```

## Bonnes pratiques

### Sécurité whitelist

✅ **À faire :**
- Vérifier plusieurs identifiants (steam + license)
- Logs des connexions refusées
- Système de candidature clair
- Délai de réponse raisonnable

❌ **À éviter :**
- Whitelist basée uniquement sur IP
- Pas de procédure de candidature
- Rejets sans explication
- Base de données non sécurisée

### Performance

```lua
-- Cache whitelist en mémoire
local whitelistCache = {}

Citizen.CreateThread(function()
    while true do
        Citizen.Wait(60000)  -- Update toutes les minutes
        MySQL.Async.fetchAll('SELECT identifier FROM whitelist', {}, function(result)
            whitelistCache = {}
            for _, row in ipairs(result) do
                whitelistCache[row.identifier] = true
            end
        end)
    end
end)

-- Check rapide
function IsWhitelisted(identifier)
    return whitelistCache[identifier] == true
end
```

## Alternatives à la whitelist

### Système de niveaux

```lua
-- Accès progressif
Config.AccessLevels = {
    visitor = 0,      -- Peut regarder
    member = 1,       -- Peut jouer
    vip = 2,          -- Avantages
    staff = 99        -- Admin
}
```

### Pay-to-play

```lua
-- Abonnement requis
-- Vérification Tebex/PayPal
```

### Système de parrainage

```lua
-- Joueur parrainé par membre existant
-- Validation community
```

## Ressources

- [FiveM ACE Documentation](https://docs.fivem.net/docs/server-manual/setting-up-a-server-txadmin/)
- [Discord Developer Portal](https://discord.com/developers/applications)
- [ESX Documentation](https://documentation.esx-framework.org/)

## Support

Problème de whitelist ? [Discord LKL Cloud](https://discord.gg/UaHNnMarQA)
