---
title: Installer des logiciels sur VPS Windows
toc: false
---

Découvrez comment installer et configurer les logiciels les plus utilisés sur votre serveur Windows.

## Environnement web complet

### XAMPP - Solution tout-en-un

XAMPP regroupe Apache, MySQL, PHP et PhpMyAdmin dans un seul package simple à installer.

**Installation :**

1. Rendez-vous sur le site officiel et téléchargez [XAMPP](https://www.apachefriends.org/)
2. Lancez l'installateur téléchargé
3. Acceptez les options par défaut lors de l'installation
4. Attendez la fin de l'installation

**Démarrage des services :**

1. Ouvrez le **XAMPP Control Panel** depuis le menu Démarrer
2. Cliquez sur **Start** à côté de Apache
3. Cliquez sur **Start** à côté de MySQL
4. Les services sont maintenant actifs

:::tip Accès au panneau
Une fois démarré, accédez à votre interface web via `http://localhost` ou `http://VOTRE_IP_VPS` depuis un navigateur.
:::

## Bases de données

### MySQL Server

Pour une installation MySQL dédiée sans interface web :

**Procédure d'installation :**

1. Téléchargez [MySQL Installer](https://dev.mysql.com/downloads/installer/) depuis le site officiel
2. Exécutez le fichier d'installation
3. Sélectionnez le type d'installation **Server only**
4. Suivez l'assistant de configuration :
   - Définissez un mot de passe root sécurisé
   - Configurez le port (3306 par défaut)
   - Validez la configuration

:::warning Mot de passe root
Conservez précieusement le mot de passe root MySQL. Il est impossible de le récupérer si vous le perdez sans réinstallation complète.
:::

**Configuration post-installation :**

Pour autoriser les connexions distantes :
- Éditez le fichier `my.ini` dans le répertoire d'installation
- Modifiez la directive `bind-address` si nécessaire
- Redémarrez le service MySQL

## Serveurs de jeux

### SteamCMD - Gestionnaire de serveurs Steam

SteamCMD permet d'installer et mettre à jour des serveurs de jeux Steam.

**Préparation :**

1. Créez un répertoire dédié :
   ```
   C:\SteamCMD
   ```

2. Téléchargez [SteamCMD](https://steamcdn-a.akamaihd.net/client/installer/steamcmd.zip)

3. Extrayez l'archive dans le dossier `C:\SteamCMD`

4. Exécutez le fichier `steamcmd.exe`
   - La première exécution téléchargera les fichiers nécessaires
   - Patientez jusqu'à voir l'invite `Steam>`

**Utilisation de base :**

```bash
# Se connecter (anonyme pour serveurs gratuits)
login anonymous

# Définir le répertoire d'installation
force_install_dir C:\MonServeur

# Installer un serveur (exemple: CS:GO)
app_update 740 validate

# Quitter
quit
```

:::tip Serveurs disponibles
Chaque jeu possède un App ID unique. Consultez la [liste des App IDs](https://developer.valvesoftware.com/wiki/Dedicated_Servers_List) pour trouver celui de votre jeu.
:::

## Configuration du pare-feu Windows

### Autoriser les connexions entrantes

Pour que vos serveurs soient accessibles, configurez le pare-feu Windows :

**Étapes de configuration :**

1. Ouvrez **Pare-feu Windows Defender**
   - Tapez "pare-feu" dans la recherche Windows
   - Cliquez sur "Pare-feu Windows Defender"

2. Accédez aux **Paramètres avancés** dans le menu latéral

3. Sélectionnez **Règles de trafic entrant** dans le panneau de gauche

4. Cliquez sur **Nouvelle règle** dans le panneau de droite

5. Configurez la règle :
   - Type : **Port**
   - Protocole : TCP ou UDP selon vos besoins
   - Ports : entrez les ports nécessaires (ex: 3306 pour MySQL, 27015 pour Source)
   - Action : **Autoriser la connexion**
   - Profils : sélectionnez tous les profils
   - Nom : donnez un nom explicite

:::danger Sécurité du pare-feu
Ne désactivez JAMAIS complètement le pare-feu Windows. Autorisez uniquement les ports strictement nécessaires pour vos applications.
:::

### Ports courants

<div class="custom-table">

| SERVICE | PORT | PROTOCOLE |
|---------|------|-----------|
| MySQL | 3306 | TCP |
| Apache/HTTP | 80 | TCP |
| HTTPS | 443 | TCP |
| RDP | 3389 | TCP |
| CS:GO | 27015 | UDP |
| Minecraft | 25565 | TCP |

</div>

## Bonnes pratiques

### Sécurité

- ✅ Utilisez des mots de passe forts pour tous vos services
- ✅ Mettez à jour régulièrement vos logiciels
- ✅ N'ouvrez que les ports nécessaires
- ✅ Activez les logs pour surveiller les connexions
- ✅ Créez des sauvegardes régulières de vos bases de données

### Performances

- Allouez suffisamment de RAM à vos services
- Surveillez l'utilisation CPU et mémoire
- Nettoyez régulièrement les fichiers temporaires
- Optimisez les configurations par défaut selon vos besoins

:::tip Monitoring
Utilisez le Gestionnaire des tâches Windows (Ctrl+Shift+Esc) pour surveiller l'utilisation des ressources de vos applications.
:::

## Désinstallation propre

Pour désinstaller proprement un logiciel :

1. Ouvrez **Programmes et fonctionnalités** (Panneau de configuration)
2. Localisez le logiciel à supprimer
3. Cliquez sur **Désinstaller**
4. Suivez l'assistant de désinstallation
5. Redémarrez le serveur si demandé

Les fichiers de configuration peuvent persister dans :
- `C:\ProgramData\`
- `C:\Users\Administrator\AppData\`

Supprimez-les manuellement si nécessaire après désinstallation.
