---
title: Installer des plugins
---

Guide complet pour installer et gérer les plugins sur votre serveur Minecraft.

## Prérequis

Les plugins nécessitent un serveur compatible :
- ✅ **Paper** (recommandé)
- ✅ **Spigot**
- ✅ **Purpur**
- ✅ **Bukkit**
- ❌ **Vanilla** (pas de support plugins)
- ❌ **Forge** (utilise des mods, pas des plugins)

## Installation d'un plugin

### Méthode standard

1. **Téléchargez le plugin** (.jar)
   - [SpigotMC](https://www.spigotmc.org/resources/)
   - [Bukkit](https://dev.bukkit.org/bukkit-plugins)
   - [Hangar](https://hangar.papermc.io/) (Paper)
   - [Modrinth](https://modrinth.com/plugins)

2. **Uploadez via SFTP**
   ```
   /plugins/NomDuPlugin.jar
   ```

3. **Redémarrez le serveur**
   ```
   /stop
   ```
   Ou rechargez (non recommandé) :
   ```
   /reload
   ```

4. **Vérifiez l'installation**
   ```
   /plugins
   ```
   Le plugin doit apparaître en **vert**.

:::warning Reload vs Restart
`/reload` peut causer des memory leaks et bugs. Privilégiez toujours `/stop` puis redémarrage.
:::

## Plugins essentiels

### Gestion & Administration

**EssentialsX** - Commandes de base indispensables
```
/tpa, /home, /warp, /kit, /spawn
```
- [Télécharger](https://essentialsx.net/downloads.html)
- Configuration : `/plugins/Essentials/config.yml`

**LuckPerms** - Système de permissions complet
```
/lp user <joueur> permission set <permission>
/lp group <groupe> permission set <permission>
```
- Interface web pour configuration
- Support MySQL/MariaDB
- [Documentation](https://luckperms.net/)

**WorldEdit** - Édition de terrain
```
//wand
//set <bloc>
//copy
//paste
```
- Indispensable pour builders
- Optimisé avec FastAsyncWorldEdit

**Vault** - API d'économie et permissions
- Requis par beaucoup de plugins
- Fait le lien entre plugins

### Protection & Sécurité

**CoreProtect** - Logs et rollback
```
/co inspect    # Mode inspection
/co rollback u:<user> t:<time>
/co restore u:<user> t:<time>
```
- Enregistre chaque action
- Rollback de griefs
- Essentiel pour modération

**WorldGuard** - Protection de zones
```
/region define <nom>
/region flag <région> pvp deny
/region addmember <région> <joueur>
```
- Protection spawn
- Zones PvP/non-PvP
- Drapeaux personnalisables

**GriefPrevention** - Protection automatique des claims
```
/abandonclaim
/trust <joueur>
/claimslist
```
- Joueurs protègent leur terrain
- Système de coffre d'or
- Anti-grief automatique

### Économie

**EssentialsX Economy** - Système monétaire basique
```
/balance
/pay <joueur> <montant>
/eco give <joueur> <montant>
```

**Vault** + **EssentialsX Economy** = Économie simple

**CMI** - Alternative premium complète à Essentials
- Plus de fonctionnalités
- Interface graphique
- ~20€ mais très complet

### Jobs & Métiers

**Jobs Reborn** - Système d'emplois
```
/jobs browse
/jobs join <métier>
/jobs leave
```
Métiers disponibles :
- Mineur, Bûcheron, Fermier
- Chasseur, Pêcheur, Constructeur
- Enchanteur, Alchimiste

Configuration : `/plugins/Jobs/jobConfig.yml`

### Marché & Shop

**ChestShop** - Boutiques avec panneaux
```
Ligne 1: [Quantité]
Ligne 2: B [Prix achat] : S [Prix vente]
Ligne 3: Nom de l'item
Ligne 4: ?
```

**EssentialsX Signs** - Panneaux de vente intégrés

**ShopGUIPlus** - Interface graphique de shop
- Menu GUI moderne
- Configuration YAML
- Support économies multiples

### Téléportation

**BetterRTP** - Téléportation aléatoire
```
/rtp
```
- Évite les zones dangereuses
- Configurable par monde
- Cooldown personnalisable

**MyWarp** - Système de warps
```
/warp create <nom>
/warp <nom>
/warp list
```

### Mini-jeux

**Multiverse-Core** - Gestion multi-mondes
```
/mv create <monde> <type>
/mv tp <monde>
/mv list
```
Types : normal, nether, end, flat

**WorldBorder** - Limite de monde
```
/wb set <taille>
/wb shape <round|square>
/wb fill
```

**HolographicDisplays** - Hologrammes
```
/hd create <nom> <texte>
/hd addline <nom> <texte>
```
- Affichage informations
- Animations possibles

### Performance

**ClearLag** - Nettoyage automatique
```
/lagg clear    # Nettoyer entities
/lagg unloadchunks
/lagg gc       # Garbage collection
```
Configuration :
```yaml
# config.yml
auto-removal:
  enabled: true
  broadcast-removal: true
  broadcast-warning: true
  interval: 300  # 5 minutes
```

**ChunkHoppers** - Limite les hoppers
- Réduit le lag des hoppers
- Regroupement intelligent

### Social

**DiscordSRV** - Lien Discord ↔ Minecraft
```
Chat Minecraft → Discord
Chat Discord → Minecraft
Logs d'événements
```
Configuration :
```yaml
# config.yml
DiscordChatChannelDiscordToMinecraft: true
DiscordChatChannelMinecraftToDiscord: true
DiscordConsoleChannelUsageLog: "#console"
```

**ViaVersion** - Support multi-versions
- Joueurs 1.8 à 1.20 sur même serveur
- Transparence totale
- Performances excellentes

### Cosmétiques

**Geyser** - Support Bedrock (Windows 10, mobile)
```
Port Java: 25565
Port Bedrock: 19132
```
- Crossplay Java/Bedrock
- Nécessite Floodgate pour authentification

**GadgetsMenu** - Effets cosmétiques
- Particules, costumes, pets
- Personnalisation complète
- Fun pour serveurs créatifs

## Configuration des plugins

### Structure des dossiers

```
minecraft-server/
├── plugins/
│   ├── EssentialsX.jar
│   ├── LuckPerms.jar
│   ├── Essentials/
│   │   ├── config.yml
│   │   └── userdata/
│   └── LuckPerms/
│       ├── config.yml
│       └── luckperms-h2.db
```

### Éditer la configuration

```bash
# Via SFTP, téléchargez le fichier
# Éditez localement
# Re-uploadez

# Ou via console du panel :
nano /plugins/NomPlugin/config.yml
```

### Recharger la config

La plupart des plugins ont :
```
/plugin reload NomPlugin
```

Ou spécifique :
```
/essentials reload
/lp reloadconfig
```

## Compatibilité des plugins

### Vérifier la version

Chaque plugin indique ses versions supportées :
- **1.20.x** = Compatible 1.20, 1.20.1, 1.20.2, etc.
- **1.19-1.20** = Compatible de 1.19.x à 1.20.x
- **1.8-1.20** = Très grande compatibilité

### Conflits courants

**Essentials vs CMI**
- Ne jamais installer les deux ensemble
- Choisissez l'un ou l'autre

**Permissions plugins multiples**
- Un seul plugin de permissions (LuckPerms OU PermissionsEx)

**Économie multiple**
- Vault doit être présent
- Un seul plugin d'économie actif

## Dépannage

### Plugin en rouge dans /plugins

**Causes :**
- Erreur de chargement
- Dépendance manquante
- Version incompatible
- Configuration invalide

**Solution :**
```bash
# Consulter les logs
tail -f logs/latest.log
```

Cherchez :
```
[ERROR] Could not load 'plugins/Plugin.jar'
[ERROR] Missing dependency: Vault
```

### Erreur "Missing dependency"

Le plugin nécessite un autre plugin pour fonctionner.

**Exemple :**
```
[ERROR] ChestShop requires Vault!
```

**Solution :** Installez Vault puis redémarrez.

### Commande ne fonctionne pas

**Vérifiez les permissions :**
```
/lp user <joueur> permission check <permission>
```

**Permissions communes :**
```
essentials.tpa
essentials.home
worldguard.region.define
coreprotect.inspect
```

### Memory leak après /reload

**Symptômes :**
- Serveur lent progressivement
- RAM qui augmente
- Plugins dysfonctionnels

**Solution :**
```
/stop
# Redémarrez proprement le serveur
```

**Prévention :** N'utilisez jamais `/reload`, toujours `/stop` + redémarrage.

## Optimisation des plugins

### Limiter le nombre de plugins

Plus de plugins = plus de lag

**Recommandations :**
- Serveur Survie : 10-15 plugins max
- Serveur Mini-jeux : 20-25 plugins
- Ne gardez que l'essentiel

### Plugins à éviter

❌ **Plugins abandonnés** (> 2 ans sans mise à jour)
❌ **Plugins "all-in-one"** trop lourds
❌ **Multiples plugins faisant la même chose**

### Configuration anti-lag

Dans Paper/Purpur, désactivez fonctions non utilisées :

```yaml
# paper-world-defaults.yml
entities:
  spawning:
    all-chunks-are-slime-chunks: false
  behavior:
    pillager-patrols:
      spawn-chance: 0.0
    wandering-trader:
      spawn-chance: 0
```

## Mises à jour des plugins

### Sauvegardez avant

```bash
cp -r plugins/ plugins-backup/
```

### Processus de mise à jour

1. Téléchargez la nouvelle version
2. Remplacez le .jar
3. Redémarrez
4. Vérifiez les logs
5. Testez en jeu

### Updates automatiques (non recommandé)

Certains plugins s'auto-update, désactivez :
```yaml
# config.yml
auto-update: false
```

## Plugins par type de serveur

### Serveur Survie vanilla

- EssentialsX
- LuckPerms  
- CoreProtect
- GriefPrevention
- Vault

### Serveur Faction/PvP

- EssentialsX
- LuckPerms
- Factions
- WorldGuard
- CombatLogX
- ChestShop

### Serveur Créatif

- EssentialsX
- LuckPerms
- WorldEdit
- WorldGuard
- VoxelSniper
- ProtocolLib (pour fonctions avancées)

### Serveur Mini-jeux

- BedWars/SkyWars (plugin spécifique)
- Multiverse-Core
- WorldEdit
- ProtocolLib
- HolographicDisplays

## API et développement

### Créer son propre plugin

Ressources :
- [Spigot Plugin Dev](https://www.spigotmc.org/wiki/spigot-plugin-development/)
- [Paper API](https://docs.papermc.io/)
- [Bukkit API](https://hub.spigotmc.org/javadocs/bukkit/)

Structure basique :
```java
public class MonPlugin extends JavaPlugin {
    @Override
    public void onEnable() {
        getLogger().info("Plugin activé!");
    }
    
    @Override
    public void onDisable() {
        getLogger().info("Plugin désactivé!");
    }
}
```

### Plugin.yml

```yaml
name: MonPlugin
version: 1.0
main: com.monsite.MonPlugin
api-version: 1.20
depend: [Vault]
softdepend: [WorldGuard]
commands:
  macommande:
    description: Description
    usage: /<command>
    permission: monplugin.use
```

## Ressources

- [SpigotMC Resources](https://www.spigotmc.org/resources/)
- [Paper Plugins](https://hangar.papermc.io/)
- [Modrinth](https://modrinth.com/plugins)
- [Plugin Compatibility](https://docs.papermc.io/paper/plugin-compatibility)

## Support

Besoin d'aide ? [Discord LKL Cloud](https://discord.gg/UaHNnMarQA)
