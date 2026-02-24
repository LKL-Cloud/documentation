---
title: Mettre à jour les artefacts FiveM
---

Guide pour mettre à jour les artifacts FiveM de votre serveur vers la dernière version.

## Qu'est-ce que les artifacts ?

Les **artifacts** sont les binaires du serveur FiveM (FXServer). Ils contiennent :
- Moteur serveur
- Composants réseau
- Bibliothèques natives
- txAdmin (si inclus)

**Pourquoi mettre à jour ?**
- Correctifs de sécurité
- Nouvelles fonctionnalités
- Meilleures performances
- Support des nouvelles versions GTA
- Bugs corrigés

## Versions disponibles

### Recommended (Stable)

Version testée et stable, recommandée pour production.

```
https://runtime.fivem.net/artifacts/fivem/build_proot_linux/master/[BUILD]/fx.tar.xz
```

### Latest (Bleeding Edge)

Dernière version avec nouvelles fonctionnalités, peut être instable.

```
https://runtime.fivem.net/artifacts/fivem/build_proot_linux/master/latest/fx.tar.xz
```

### Optional

Versions spécifiques pour tests ou compatibilité.

## Vérifier version actuelle

### Via console serveur

```bash
version
```

Affiche :
```
FXServer-master SERVER v1.0.0.6683 linux
```

Le numéro (6683) est votre build actuel.

### Via txAdmin

1. Connectez-vous à txAdmin
2. **Settings** > **FXServer**
3. Section **Update Channel**
4. Version actuelle affichée

## Méthode 1 : Via txAdmin (Recommandé)

### Update automatique

1. **txAdmin Dashboard**
2. **Settings** > **FXServer**  
3. **Update Channel** : 
   - Recommended (stable)
   - Latest (récente)
   - Optional (spécifique)
4. Cliquez **Check for Updates**
5. Si disponible : **Update Now**
6. Attendez fin du téléchargement
7. **Restart Server**

:::tip Sauvegarde automatique
txAdmin créé un backup avant update. Vous pouvez rollback si problème.
:::

### Rollback si problème

1. **Settings** > **FXServer**
2. **Server Data** > **Restore from Backup**
3. Sélectionnez backup pré-update
4. Confirmez restauration

## Méthode 2 : Update manuelle

### Linux

**1. Arrêter le serveur**

```bash
# Si screen
screen -r fivem
# Puis Ctrl+C

# Si systemd
sudo systemctl stop fivem
```

**2. Backup version actuelle**

```bash
cd /chemin/vers/serveur
cp -r . ../fivem-backup-$(date +%Y%m%d)
```

**3. Télécharger nouveaux artifacts**

```bash
# Latest
wget https://runtime.fivem.net/artifacts/fivem/build_proot_linux/master/latest/fx.tar.xz

# Ou recommended (remplacez BUILD par numéro)
wget https://runtime.fivem.net/artifacts/fivem/build_proot_linux/master/6683/fx.tar.xz
```

**4. Extraire et remplacer**

```bash
tar xf fx.tar.xz

# Les fichiers sont extraits dans le dossier courant
# Écrasent les anciens binaires
```

**5. Vérifier permissions**

```bash
chmod +x run.sh
chmod +x FXServer
```

**6. Redémarrer serveur**

```bash
./run.sh +exec server.cfg
```

### Windows

**1. Arrêter le serveur**

Fermez la fenêtre FXServer ou Ctrl+C.

**2. Backup**

Copiez le dossier complet vers `fivem-backup-DATE`.

**3. Télécharger artifacts**

URL Windows :
```
https://runtime.fivem.net/artifacts/fivem/build_server_windows/master/latest/server.zip
```

**4. Extraire**

- Clic droit > Extraire tout
- Remplacer fichiers existants

**5. Redémarrer**

Double-cliquez `FXServer.exe` ou `run.cmd`.

## Méthode 3 : Script automatique

### Script Linux update

Créez `update-fivem.sh` :

```bash
#!/bin/bash

SERVER_DIR="/home/fivem/server"
BACKUP_DIR="/home/fivem/backups"
DATE=$(date +%Y%m%d_%H%M%S)

echo "🔄 Mise à jour artifacts FiveM..."

# Arrêter serveur
echo "⏸️  Arrêt du serveur..."
screen -S fivem -X quit
sleep 5

# Backup
echo "💾 Backup en cours..."
mkdir -p $BACKUP_DIR
cp -r $SERVER_DIR $BACKUP_DIR/backup_$DATE

# Télécharger
echo "⬇️  Téléchargement artifacts..."
cd $SERVER_DIR
wget -q https://runtime.fivem.net/artifacts/fivem/build_proot_linux/master/latest/fx.tar.xz

# Extraire
echo "📦 Extraction..."
tar xf fx.tar.xz
rm fx.tar.xz

# Permissions
chmod +x run.sh FXServer

# Redémarrer
echo "▶️  Redémarrage serveur..."
screen -dmS fivem ./run.sh +exec server.cfg

echo "✅ Mise à jour terminée!"
echo "📊 Version:"
sleep 3
screen -S fivem -X stuff "version^M"
```

**Utilisation :**

```bash
chmod +x update-fivem.sh
./update-fivem.sh
```

### Automatisation avec cron

```bash
crontab -e

# Update tous les lundis à 4h du matin
0 4 * * 1 /root/update-fivem.sh >> /var/log/fivem-update.log 2>&1
```

## Vérification post-update

### Tests essentiels

**1. Vérifier version**

```bash
version
```

Doit afficher nouveau build number.

**2. Tester ressources**

```bash
refresh
ensure [resource]
```

Vérifiez pas d'erreurs dans console.

**3. Connexion joueur**

- Connectez-vous au serveur
- Testez gameplay de base
- Vérifiez scripts fonctionnent

**4. Performances**

```bash
resmon
```

Comparez avec avant update.

### Logs à surveiller

```bash
tail -f /chemin/serveur/FXServer.log
```

Cherchez :
- `[ERROR]` : Erreurs critiques
- `[WARN]` : Avertissements
- `Artifact version:` : Confirmation version

## Problèmes courants

### "Unsupported artifact version"

Artifacts trop récents pour vos ressources.

**Solution :**
- Downgrade vers recommended
- Ou mettez à jour vos ressources

### "Cannot execute binary file"

Mauvaise architecture téléchargée.

**Solution :**
```bash
# Vérifier système
uname -m

# x86_64 = build_proot_linux
# Téléchargez version correcte
```

### Serveur ne démarre plus

Artifacts corrompus ou incompatibles.

**Solution :**
```bash
# Restaurer backup
cd /home/fivem
rm -rf server/
cp -r backups/backup_DATE/ server/
```

### Resources ne chargent plus

Changements API dans nouvelle version.

**Solutions :**
1. Consultez [changelog FiveM](https://runtime.fivem.net/artifacts/fivem/build_proot_linux/master/)
2. Mettez à jour ressources concernées
3. Ou restez sur version antérieure

### Performance dégradée

Nouveau build peut avoir régressions.

**Solution :**
- Testez build recommended au lieu de latest
- Reportez bug sur [forum FiveM](https://forum.cfx.re/)
- Rollback temporairement

## Downgrade vers version antérieure

### Trouver numéro build

Consultez : https://runtime.fivem.net/artifacts/fivem/build_proot_linux/master/

Liste des builds disponibles.

### Télécharger build spécifique

```bash
# Remplacez 6683 par numéro souhaité
wget https://runtime.fivem.net/artifacts/fivem/build_proot_linux/master/6683/fx.tar.xz
```

### Installation

Même procédure que update normale.

## Changelog et notes de version

### Consulter changements

**Page artifacts :**
https://runtime.fivem.net/artifacts/fivem/build_proot_linux/master/

**Forum annonces :**
https://forum.cfx.re/c/announcements/25

**Discord FiveM :**
Canal #announcements

### Changements majeurs récents

**Build 6683+ :**
- OneSync amélioré
- Support GameBuild 2944
- Optimisations réseau

**Build 6500+ :**
- txAdmin 6.0
- Meilleure gestion mémoire
- Fixes sécurité

## Best practices

### Avant chaque update

✅ **Checklist :**
- [ ] Backup complet serveur
- [ ] Backup base de données
- [ ] Lire changelog
- [ ] Tester en environnement dev
- [ ] Prévenir joueurs
- [ ] Planifier heure creuse

### Stratégie d'update

**Serveur production :**
- Utilisez **Recommended** channel
- Testez sur serveur dev d'abord
- Update pendant maintenance

**Serveur développement :**
- **Latest** channel acceptable
- Tests de nouvelles features
- Feedback communauté

### Fréquence d'update

**Recommandé :**
- Sécurité : Immédiatement
- Recommended : Mensuel
- Latest : Hebdomadaire (dev only)

**Évitez :**
- Updates pendant événements
- Updates sans backup
- Updates non testées en prod

## Comparaison versions

### Artifacts vs txAdmin

**Artifacts (FXServer) :**
- Moteur serveur
- Nécessite update manuel ou txAdmin

**txAdmin :**
- Interface web
- S'auto-update généralement
- Intégré dans artifacts récents

### Linux vs Windows

**Linux (Recommandé) :**
- Meilleures performances
- Plus stable
- Moins de ressources

**Windows :**
- Interface graphique
- Plus facile debug
- Consomme plus RAM

## Alternatives de téléchargement

### Mirroirs communautaires

Si runtime.fivem.net inaccessible :

```bash
# Mirror GitHub Actions (officieux)
# Vérifiez forum pour liens alternatifs
```

### Build depuis source

Pour développeurs avancés :

```bash
git clone https://github.com/citizenfx/fivem.git
cd fivem
# Suivre instructions BUILD.md
```

:::warning Compilation
Compiler depuis source n'est pas recommandé pour serveurs production. Réservé aux développeurs.
:::

## Monitoring updates

### Script notification Discord

```bash
#!/bin/bash
# check-updates.sh

CURRENT=$(cat /home/fivem/server/.fxserver-version)
LATEST=$(curl -s https://runtime.fivem.net/artifacts/fivem/build_proot_linux/master/latest/ | grep -oP 'FXServer-[0-9]+' | head -1 | grep -oP '[0-9]+')

if [ "$CURRENT" != "$LATEST" ]; then
    curl -X POST "WEBHOOK_URL" \
        -H "Content-Type: application/json" \
        -d "{\"content\":\"🔔 Nouvelle version FiveM disponible: $LATEST (actuelle: $CURRENT)\"}"
fi
```

Cron :
```bash
0 */6 * * * /root/check-updates.sh
```

## Support update

### En cas de blocage

1. **Forum FiveM :**
   - https://forum.cfx.re/
   - Catégorie "Server Discussion"

2. **Discord FiveM :**
   - https://discord.gg/fivem
   - Canal #server-development

3. **GitHub Issues :**
   - https://github.com/citizenfx/fivem/issues
   - Pour bugs confirmés

### Informations à fournir

- Build number actuel et cible
- OS et version
- Logs d'erreur complets
- server.cfg (sans données sensibles)
- Liste ressources principales

## Ressources

- [Artifacts FiveM](https://runtime.fivem.net/artifacts/fivem/build_proot_linux/master/)
- [Documentation FiveM](https://docs.fivem.net/)
- [Forum officiel](https://forum.cfx.re/)
- [GitHub FiveM](https://github.com/citizenfx/fivem)

## Support LKL Cloud

Besoin d'aide pour update ? [Discord LKL Cloud](https://discord.gg/UaHNnMarQA)
