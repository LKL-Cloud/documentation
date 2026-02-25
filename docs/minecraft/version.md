---
title: Choisir la version du serveur
sidebar_position: 2
---

Guide pour choisir et configurer la meilleure version de Minecraft pour votre serveur.

## Versions disponibles

### Versions Vanilla

**Minecraft Java Edition officiel** - Direct depuis Mojang sans modifications.

**Avantages :**
- Stable et officiel
- Pas de bugs liés aux forks
- Compatible avec toutes les fonctionnalités vanilla

**Inconvénients :**
- Performances limitées
- Pas de support des plugins
- Consommation RAM élevée

### Paper (Recommandé)

Fork de Spigot ultra-optimisé pour les performances.

**Avantages :**
- **Excellentes performances** (jusqu'à 50% plus rapide)
- Compatible plugins Bukkit/Spigot
- Configuration avancée
- Corrections de bugs vanilla
- Anti-duplication intégré

**Inconvénients :**
- Quelques différences mineures avec vanilla
- Redstone légèrement modifiée (configurable)

**Installation :**

```bash
mkdir minecraft-server
cd minecraft-server
wget https://api.papermc.io/v2/projects/paper/versions/1.20.4/builds/latest/downloads/paper-1.20.4-XXX.jar
java -Xms2G -Xmx4G -jar paper-*.jar --nogui
```

### Purpur

Fork de Paper avec encore plus de fonctionnalités.

**Avantages :**
- Toutes les optimisations de Paper
- Configurations supplémentaires
- Fonctionnalités uniques (mobs transparents, etc.)
- Idéal pour serveurs créatifs

**Téléchargement :**
```bash
wget https://api.purpurmc.org/v2/purpur/1.20.4/latest/download
```

### Fabric

Modloader moderne et léger pour mods côté serveur.

**Avantages :**
- Support des mods Fabric
- Très performant
- Mises à jour rapides
- Lithium + Phosphor = performances excellentes

**Mods recommandés :**
- **Lithium** : Optimisations générales
- **Phosphor** : Optimisations lumière
- **Krypton** : Optimisations réseau
- **FerriteCore** : Réduction RAM

### Forge

Le modloader historique pour Minecraft.

**Avantages :**
- Énorme catalogue de mods
- Communauté établie
- Mods complexes (tech, magie)

**Inconvénients :**
- Plus gourmand en ressources
- Chargement plus lent
- Mises à jour parfois tardives

## Quelle version choisir ?

### Pour un serveur Survie/Faction/SkyBlock

→ **Paper** est le meilleur choix

Configuration recommandée :
```yaml
# paper-world-defaults.yml
chunks:
  auto-save-interval: 6000  # 5 minutes au lieu de 30s
entities:
  spawning:
    all-chunks-are-slime-chunks: false
    alt-item-despawn-rate:
      enabled: true
```

### Pour un serveur Créatif/Build

→ **Purpur** pour les fonctionnalités extras

### Pour un serveur Moddé (tech/magie)

→ **Forge** avec un pack de mods

### Pour un serveur ultra-optimisé avec mods légers

→ **Fabric** avec Lithium/Phosphor

## Versions Minecraft recommandées

### Version 1.20.4 (Dernière stable)

- Correctifs de sécurité
- Meilleures performances
- Support complet Paper/Purpur

### Version 1.19.4

- Très stable
- Large support plugins
- Bonne alternative si 1.20 a des bugs

### Version 1.16.5 (LTS)

- Extrêmement stable
- Tous les plugins disponibles
- Idéal pour serveurs établis

### Version 1.12.2 (Legacy)

- Énorme catalogue de mods Forge
- Communauté active
- Pour serveurs moddés anciens

:::warning Versions anciennes
Évitez les versions < 1.12.2 pour des raisons de sécurité et performances.
:::

## Compatibilité des versions

### ViaVersion - Support multi-versions

Permet aux joueurs de différentes versions de se connecter :

```bash
# Télécharger ViaVersion
cd plugins/
wget https://github.com/ViaVersion/ViaVersion/releases/latest/download/ViaVersion.jar
```

**Versions supportées simultanément :**
- Serveur en 1.20.4
- Joueurs en 1.8 à 1.20.4

### Protocole de version

| Version | Protocole |
|---------|-----------|
| 1.20.4  | 765       |
| 1.19.4  | 762       |
| 1.18.2  | 758       |
| 1.16.5  | 754       |
| 1.12.2  | 340       |
| 1.8.9   | 47        |

## Configurer Java

### Java 17 (Recommandé pour 1.17+)

```bash
# Debian/Ubuntu
sudo apt install openjdk-17-jre-headless

# Vérifier
java -version
```

### Java 8 (Pour versions 1.16.5 et inférieures)

```bash
sudo apt install openjdk-8-jre-headless
```

### Arguments JVM optimisés

Pour serveur avec 4GB RAM :

```bash
java -Xms4G -Xmx4G \
  -XX:+UseG1GC \
  -XX:+ParallelRefProcEnabled \
  -XX:MaxGCPauseMillis=200 \
  -XX:+UnlockExperimentalVMOptions \
  -XX:+DisableExplicitGC \
  -XX:+AlwaysPreTouch \
  -XX:G1NewSizePercent=30 \
  -XX:G1MaxNewSizePercent=40 \
  -XX:G1HeapRegionSize=8M \
  -XX:G1ReservePercent=20 \
  -XX:G1HeapWastePercent=5 \
  -XX:G1MixedGCCountTarget=4 \
  -XX:InitiatingHeapOccupancyPercent=15 \
  -XX:G1MixedGCLiveThresholdPercent=90 \
  -XX:G1RSetUpdatingPauseTimePercent=5 \
  -XX:SurvivorRatio=32 \
  -XX:+PerfDisableSharedMem \
  -XX:MaxTenuringThreshold=1 \
  -Dusing.aikars.flags=https://mcflags.emc.gs \
  -Daikars.new.flags=true \
  -jar paper.jar --nogui
```

## Migration entre versions

### Sauvegarder avant migration

```bash
# Arrêter le serveur
screen -r minecraft
/stop

# Sauvegarder
cd ..
tar -czf backup-$(date +%Y%m%d).tar.gz minecraft-server/
```

### Mettre à jour Paper

```bash
cd minecraft-server
# Sauvegarder l'ancien jar
mv paper-old.jar paper-backup.jar

# Télécharger la nouvelle version
wget https://api.papermc.io/v2/projects/paper/versions/NOUVELLE_VERSION/builds/latest/downloads/paper-*.jar

# Démarrer
java -Xmx4G -jar paper-*.jar
```

### Tester avant production

1. Créez une copie du serveur
2. Testez la nouvelle version
3. Vérifiez tous les plugins
4. Testez le gameplay
5. Si OK, migrez en production

## Dépannage versions

### "Unsupported version"

Le plugin n'est pas compatible avec votre version.

**Solutions :**
- Cherchez une version alternative du plugin
- Utilisez ViaVersion si c'est un problème client
- Contactez le développeur du plugin

### "Server outdated"

Un joueur essaie de se connecter avec une version trop récente.

**Solutions :**
- Mettez à jour le serveur
- Installez ViaVersion
- Demandez au joueur d'utiliser la bonne version

### Rollback de version

Si problème après mise à jour :

```bash
# Arrêter serveur
/stop

# Restaurer ancien jar
rm paper-new.jar
mv paper-backup.jar paper.jar

# Restaurer monde si corrompu
rm -rf world world_nether world_the_end
tar -xzf backup-DATE.tar.gz
```

## Ressources

- [Paper Downloads](https://papermc.io/downloads)
- [Purpur Downloads](https://purpurmc.org/downloads)
- [Fabric Installation](https://fabricmc.net/use/server/)
- [Forge Downloads](https://files.minecraftforge.net/)
- [Version Support Status](https://mcversions.net/)

## Besoin d'aide ?

Rejoignez notre [Discord](https://discord.gg/UaHNnMarQA) pour obtenir de l'aide sur le choix de version !
