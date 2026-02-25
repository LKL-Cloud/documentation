---
title: Configurer le Pare-feu Windows
sidebar_position: 4
toc: false
---

Maîtrisez la configuration du pare-feu Windows Defender pour sécuriser et optimiser l'accès à votre serveur VPS.

## Accéder à l'interface du pare-feu

### Méthode 1 : Via le Panneau de configuration

La méthode la plus rapide pour accéder aux paramètres avancés :

1. Appuyez sur `Win + R` pour ouvrir la fenêtre d'exécution
2. Tapez `firewall.cpl` et validez avec **Entrée**
3. Dans la fenêtre qui s'ouvre, cliquez sur **Paramètres avancés** dans le menu latéral

### Méthode 2 : Via les Paramètres Windows

Pour une approche plus guidée :

1. Ouvrez les **Paramètres Windows** avec `Win + I`
2. Naviguez vers **Sécurité Windows** > **Pare-feu et protection réseau**
3. Cliquez sur **Paramètres avancés** en bas de la page

## Comprendre l'interface avancée

L'interface du pare-feu avancé se divise en plusieurs sections principales :

- **Règles de trafic entrant** : Contrôle les connexions qui tentent d'accéder à votre serveur
- **Règles de trafic sortant** : Gère les connexions initiées depuis votre serveur vers l'extérieur
- **Règles de sécurité de connexion** : Configure IPsec et les tunnels sécurisés
- **Analyse** : Affiche une vue d'ensemble de toutes les règles actives

:::tip Navigation rapide
Pour la majorité des configurations de serveur, vous travaillerez principalement dans la section **Règles de trafic entrant** pour autoriser l'accès aux services hébergés.
:::

## Créer une règle pour ouvrir un port

### Via l'interface graphique

Pour autoriser un service à recevoir des connexions :

1. Sélectionnez **Règles de trafic entrant** dans le panneau de gauche
2. Cliquez sur **Nouvelle règle...** dans le panneau de droite
3. Configurez la règle étape par étape :

**Type de règle :**
- Sélectionnez **Port** puis cliquez sur **Suivant**

**Protocole et ports :**
- Choisissez **TCP** ou **UDP** selon votre besoin
- Sélectionnez **Ports locaux spécifiques**
- Entrez le numéro de port (exemple : `25565` pour Minecraft)
- Cliquez sur **Suivant**

**Action :**
- Cochez **Autoriser la connexion**
- Cliquez sur **Suivant**

**Profils :**
- Sélectionnez tous les profils (Domaine, Privé, Public)
- Cliquez sur **Suivant**

:::warning Profils de pare-feu
Pour un VPS, appliquez toujours les règles au profil **Public** car c'est le profil par défaut pour les réseaux non reconnus.
:::

**Nom de la règle :**
- Donnez un nom descriptif (exemple : "Minecraft Server")
- Ajoutez une description si nécessaire
- Cliquez sur **Terminer**

### Via PowerShell (méthode rapide)

Pour automatiser la création de règles, utilisez PowerShell en tant qu'administrateur :

```powershell
# Ouvrir un port TCP
New-NetFirewallRule -DisplayName "Mon Service" -Direction Inbound -Protocol TCP -LocalPort 8080 -Action Allow

# Ouvrir un port UDP
New-NetFirewallRule -DisplayName "Service UDP" -Direction Inbound -Protocol UDP -LocalPort 27015 -Action Allow

# Ouvrir plusieurs ports simultanément
New-NetFirewallRule -DisplayName "Plage de ports" -Direction Inbound -Protocol TCP -LocalPort 7777-7778 -Action Allow
```

## Ports essentiels par type de service

### Services web

<div class="custom-table">

| SERVICE | PORT | PROTOCOLE | DESCRIPTION |
|---------|------|-----------|-------------|
| HTTP | 80 | TCP | Sites web non sécurisés |
| HTTPS | 443 | TCP | Sites web avec SSL/TLS |
| FTP | 21 | TCP | Transfert de fichiers |
| MySQL | 3306 | TCP | Base de données |
| RDP | 3389 | TCP | Bureau à distance |

</div>

### Serveurs de jeux

<div class="custom-table">

| JEU | PORT TCP | PORT UDP | NOTES |
|-----|----------|----------|-------|
| Minecraft | 25565 | 25565 | Port par défaut |
| FiveM | 30120 | 30120 | Serveur GTA V |
| Garry's Mod | 27015 | 27015 | Source Engine |
| ARK | 7777-7778 | 7777-7778, 27015 | Nécessite plusieurs ports |
| Rust | 28015-28016 | 28015-28016 | Port principal + RCON |

</div>

## Exemple complet : Configuration FiveM

Voici comment ouvrir les ports nécessaires pour un serveur FiveM :

```powershell
# Port principal FiveM (TCP)
New-NetFirewallRule -DisplayName "FiveM TCP" -Direction Inbound -Protocol TCP -LocalPort 30120 -Action Allow

# Port principal FiveM (UDP)
New-NetFirewallRule -DisplayName "FiveM UDP" -Direction Inbound -Protocol UDP -LocalPort 30120 -Action Allow

# Port txAdmin (interface d'administration)
New-NetFirewallRule -DisplayName "txAdmin" -Direction Inbound -Protocol TCP -LocalPort 40120 -Action Allow
```

:::tip Configuration complète
Après avoir ouvert les ports, n'oubliez pas de configurer également votre fichier `server.cfg` avec le bon endpoint et les paramètres réseau.
:::

## Gérer les règles existantes

### Lister toutes les règles entrantes

```powershell
# Afficher toutes les règles de trafic entrant
Get-NetFirewallRule -Direction Inbound | Format-Table Name, Enabled, Action

# Afficher uniquement les règles actives
Get-NetFirewallRule -Enabled True -Direction Inbound
```

### Désactiver une règle temporairement

```powershell
# Désactiver sans supprimer
Disable-NetFirewallRule -DisplayName "Nom de la règle"

# Réactiver la règle
Enable-NetFirewallRule -DisplayName "Nom de la règle"
```

### Supprimer une règle définitivement

```powershell
Remove-NetFirewallRule -DisplayName "Nom de la règle"
```

## Sécurité avancée

### Bloquer une adresse IP spécifique

Si vous subissez des attaques depuis une IP particulière :

**Via l'interface graphique :**

1. Règles de trafic entrant > Nouvelle règle
2. Type : **Personnalisée** > Suivant
3. Tous les programmes > Suivant
4. Protocole : **Tout** > Suivant
5. **Adresse IP distante** > **Ces adresses IP** > Ajouter l'IP à bloquer
6. Action : **Bloquer la connexion** > Suivant
7. Tous les profils > Suivant
8. Nommez la règle et terminez

**Via PowerShell :**

```powershell
# Bloquer une IP unique
New-NetFirewallRule -DisplayName "Block IP" -Direction Inbound -RemoteAddress 203.0.113.50 -Action Block

# Bloquer une plage d'IP
New-NetFirewallRule -DisplayName "Block IP Range" -Direction Inbound -RemoteAddress 203.0.113.0/24 -Action Block
```

:::danger Blocage d'IP
Soyez prudent avec le blocage d'IP. Assurez-vous de ne jamais bloquer votre propre adresse IP ou celle de votre infrastructure de gestion.
:::

### Autoriser une application spécifique

Pour autoriser un exécutable particulier :

```powershell
New-NetFirewallRule -DisplayName "Mon Application" -Direction Inbound -Program "C:\Chemin\Vers\Application.exe" -Action Allow
```

## Profils de pare-feu

Windows utilise trois profils différents selon le type de réseau :

- **Domaine** : Réseau d'entreprise avec Active Directory
- **Privé** : Réseau de confiance (réseau domestique)
- **Public** : Réseau non fiable (défaut pour les VPS)

### Créer une règle uniquement pour le profil Public

```powershell
New-NetFirewallRule -DisplayName "Web Server" -Direction Inbound -Protocol TCP -LocalPort 80 -Action Allow -Profile Public
```

:::caution Conseil de sécurité
Sur un VPS, privilégiez toujours le profil **Public** pour vos règles, car il offre le niveau de sécurité le plus élevé par défaut.
:::

## Vérifier les ports ouverts

### Lister les ports en écoute

Pour voir quels ports sont actuellement utilisés sur votre serveur :

```powershell
# Afficher tous les ports en écoute
netstat -an | findstr LISTENING

# Version détaillée avec le nom du processus
Get-NetTCPConnection -State Listen | Select-Object LocalPort, OwningProcess, @{Name="Process";Expression={(Get-Process -Id $_.OwningProcess).Name}}
```

Cette commande vous permet de vérifier qu'un service écoute bien sur le port que vous avez ouvert.

## Sauvegarde et restauration

### Exporter les règles

Pour sauvegarder votre configuration :

```powershell
# Exporter toutes les règles
netsh advfirewall export "C:\backup\firewall-rules.wfw"
```

### Importer les règles

Pour restaurer une configuration précédente :

```powershell
# Importer les règles
netsh advfirewall import "C:\backup\firewall-rules.wfw"
```

:::tip Automatisation
Exportez régulièrement vos règles de pare-feu avant de faire des modifications importantes. Cela vous permet de revenir rapidement à une configuration fonctionnelle en cas de problème.
:::

## Gestion du pare-feu

### Vérifier l'état du pare-feu

```powershell
Get-NetFirewallProfile | Format-Table Name, Enabled
```

### Désactiver temporairement (NON RECOMMANDÉ)

```powershell
# Désactiver pour tous les profils
Set-NetFirewallProfile -Profile Domain,Public,Private -Enabled False

# Réactiver
Set-NetFirewallProfile -Profile Domain,Public,Private -Enabled True
```

:::danger Jamais en production
Ne désactivez JAMAIS complètement le pare-feu sur un serveur en production. Si vous avez des problèmes de connectivité, créez plutôt des règles spécifiques.
:::

### Réinitialiser aux paramètres par défaut

En cas de configuration corrompue, vous pouvez réinitialiser :

```powershell
netsh advfirewall reset
```

:::warning Perte de configuration
Cette commande supprimera TOUTES vos règles personnalisées ! Assurez-vous d'avoir exporté votre configuration avant.
:::

## Bonnes pratiques de sécurité

### Principe du moindre privilège

- ✅ N'ouvrez que les ports strictement nécessaires
- ✅ Fermez les ports inutilisés
- ✅ Utilisez des noms de règles descriptifs
- ✅ Documentez vos règles personnalisées

### Maintenance régulière

- Auditez vos règles tous les mois
- Supprimez les règles obsolètes
- Vérifiez les logs de sécurité Windows
- Mettez à jour Windows régulièrement

### Test après configuration

Après avoir créé vos règles, testez toujours la connectivité :

1. Depuis l'extérieur, utilisez un outil comme [CanYouSeeMe.org](https://canyouseeme.org/)
2. Vérifiez que les services non autorisés sont bien bloqués
3. Confirmez que les services légitimes sont accessibles

:::tip Test de connectivité
Utilisez la commande `Test-NetConnection -ComputerName VOTRE_IP -Port 25565` depuis un autre ordinateur pour vérifier qu'un port est bien ouvert.
:::

## Dépannage

### Le port est ouvert mais inaccessible

Si malgré la règle de pare-feu votre service reste inaccessible :

1. Vérifiez que le service écoute bien sur le port avec `netstat -an`
2. Contrôlez que la règle est bien activée dans le pare-feu
3. Assurez-vous que votre application est configurée pour écouter sur `0.0.0.0` et non `127.0.0.1`
4. Vérifiez le pare-feu de votre fournisseur VPS (certains ont des pare-feu externes)

### Règle créée mais non fonctionnelle

- Vérifiez que la règle s'applique au bon profil (Public pour un VPS)
- Assurez-vous que le protocole (TCP/UDP) correspond à votre service
- Confirmez que le numéro de port est correct
- Vérifiez qu'il n'y a pas de règle de blocage prioritaire

## Ressources complémentaires

Pour approfondir vos connaissances sur le pare-feu Windows :

- [Documentation officielle Microsoft](https://docs.microsoft.com/fr-fr/windows/security/threat-protection/windows-firewall/)
- Consultez les logs dans l'Observateur d'événements Windows
- Activez la journalisation du pare-feu pour déboguer les problèmes complexes
