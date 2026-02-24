---
title: Installer Plesk
---

Guide d'installation et de configuration de Plesk sur votre VPS pour une gestion web facilitée.

## Qu'est-ce que Plesk ?

Plesk est un panel de contrôle web qui simplifie la gestion de sites web, bases de données, emails et plus encore via une interface graphique intuitive.

**Fonctionnalités :**
- Gestion sites web et domaines
- Bases de données (MySQL, PostgreSQL)
- Serveur email complet
- Certificats SSL Let's Encrypt
- Backups automatiques
- Applications en 1 clic (WordPress, etc.)
- Gestionnaire de fichiers
- Monitoring serveur

## Prérequis

### Système compatible

**OS supportés :**
- Ubuntu 20.04, 22.04 LTS
- Debian 10, 11
- CentOS/AlmaLinux/Rocky Linux 8, 9
- Windows Server 2019, 2022

**Ressources minimales :**
- **RAM** : 2GB minimum, 4GB recommandé
- **Espace disque** : 10GB minimum
- **Connexion Internet** : Nécessaire

### Système propre

Plesk doit être installé sur un **serveur fraîchement installé** sans autre panel ou serveur web.

:::warning Important
N'installez PAS Plesk sur un serveur avec Apache/Nginx déjà configuré manuellement.
:::

## Installation automatique

### Script d'installation

La méthode la plus simple et recommandée.

**1. Connectez-vous en SSH :**

```bash
ssh root@VOTRE_IP
```

**2. Téléchargez et lancez l'installateur :**

```bash
wget https://installer.plesk.com/one-click-installer
chmod +x one-click-installer
./one-click-installer
```

**3. Suivez les instructions :**

L'installateur va :
- Vérifier compatibilité système
- Télécharger composants nécessaires
- Installer Plesk et ses dépendances
- Configurer services (Apache, MySQL, etc.)

**Temps d'installation :** 15-30 minutes selon connexion.

### Installation personnalisée

Pour choisir composants spécifiques :

```bash
sh <(curl https://autoinstall.plesk.com/one-click-installer || wget -O - https://autoinstall.plesk.com/one-click-installer)
```

Options interactives :
- Version Plesk (Obsidian, dernière)
- Composants (Web hosting, Email, DNS)
- Extensions

## Première connexion

### Accès à Plesk

Une fois installation terminée :

**URL :** `https://VOTRE_IP:8443`

Ou si domaine configuré :
`https://votredomaine.com:8443`

:::tip Certificat SSL
Le navigateur affichera un avertissement (certificat auto-signé). Cliquez "Avancé" > "Accepter le risque".
:::

### Configuration initiale

**1. Accepter EULA**

Lisez et acceptez les conditions d'utilisation.

**2. Créer compte administrateur**

- **Login** : admin
- **Mot de passe** : [Choisissez un mot de passe fort]
- **Email** : votre@email.com

**3. Choisir type de licence**

- **Essai gratuit** : 15 jours, toutes fonctionnalités
- **Acheter licence** : Plesk Web Admin, Web Pro, Web Host
- **Clé existante** : Si vous avez acheté

**4. Configuration réseau**

- **Hostname** : server.votredomaine.com
- **IP address** : Détectée automatiquement

**5. Update settings**

Configurez mises à jour automatiques (recommandé).

## Configuration de base

### Ajouter un domaine

**1. Tableau de bord Plesk**

Cliquez **Ajouter un domaine** ou **Sites web et domaines** > **Ajouter un domaine**.

**2. Configuration domaine**

- **Nom de domaine** : votresite.com
- **Type d'hébergement** : Site web
- **Document root** : `/httpdocs` (par défaut)

**3. Paramètres PHP**

- Version PHP : 8.1 ou 8.2
- Mode : FPM (recommandé)

**4. Créer**

Plesk configure automatiquement :
- Virtual host Apache/Nginx
- Document root
- Logs
- Permissions

### Installer certificat SSL

**Let's Encrypt (Gratuit) :**

1. **Sites web et domaines** > Votre domaine
2. **SSL/TLS Certificates**
3. **Install** (Let's Encrypt)
4. Cochez :
   - ☑ Sécuriser le site web (www.votresite.com)
   - ☑ Sécuriser le webmail
5. Email : votre@email.com
6. **Installer**

**Renouvellement automatique** configuré par défaut.

### Créer base de données

1. **Bases de données**
2. **Ajouter une base de données**
3. Configuration :
   - Nom : `mon_site_db`
   - Type : MySQL
   - Serveur : localhost
4. **Utilisateur** :
   - Nom : `mon_user`
   - Mot de passe : [généré ou personnalisé]
5. **OK**

**Accès phpMyAdmin :**

**Bases de données** > **phpMyAdmin**

### Configurer email

**1. Activer service mail**

**Outils et paramètres** > **Services** > **Mail Server** : ON

**2. Créer compte email**

**Mail** > **Créer une adresse email**

- **Adresse** : contact@votredomaine.com
- **Mot de passe** : [sécurisé]
- **Mailbox** : 1GB

**3. Configurer DNS MX**

Plesk configure automatiquement enregistrements MX.

**Vérification :**

**Outils et paramètres** > **DNS Settings**

MX doit pointer vers votre serveur.

**4. SPF/DKIM/DMARC**

**Mail Settings** > **Activer SPF** et **DKIM**

Améliore délivrabilité emails.

## Installer WordPress

### Via Applications

**1. Sites web et domaines** > Votre domaine

**2. Applications**

Cliquez **WordPress**

**3. Installer**

- **Chemin d'installation** : `/` (racine)
- **Base de données** : Nouvelle (auto)
- **Admin user** : admin
- **Admin password** : [fort]
- **Email** : votre@email.com
- **Site title** : Mon Site

**4. Installer**

WordPress installé en 2 minutes.

**5. Accéder**

- **Site** : `https://votredomaine.com`
- **Admin** : `https://votredomaine.com/wp-admin`

## Gestion des fichiers

### Gestionnaire de fichiers

**1. Sites web et domaines** > Votre domaine

**2. Gestionnaire de fichiers**

Interface graphique pour :
- Upload/Download fichiers
- Éditer fichiers
- Gérer permissions
- Créer/supprimer dossiers

### Via FTP

**Créer compte FTP :**

1. **Sites web et domaines** > **Accès FTP**
2. **Ajouter un compte FTP**
3. Configuration :
   - Nom d'utilisateur : ftpuser
   - Répertoire : `/httpdocs` ou sous-dossier
   - Mot de passe : [sécurisé]

**Connexion FTP :**

- **Host** : VOTRE_IP ou domaine
- **Port** : 21
- **User** : ftpuser
- **Password** : [votre mot de passe]

**Client FTP recommandé :** FileZilla

## Sauvegardes

### Configuration backup automatique

**1. Outils et paramètres** > **Gestionnaire de sauvegardes**

**2. Paramètres**

- **Stockage** : Serveur local ou distant (FTP, S3)
- **Planification** : Quotidien, Hebdomadaire
- **Rétention** : 7 dernières sauvegardes
- **Contenu** :
  - ☑ Configuration
  - ☑ Fichiers
  - ☑ Bases de données
  - ☑ Emails

**3. Sauvegarder**

**Créer sauvegarde maintenant**

### Restaurer depuis backup

1. **Gestionnaire de sauvegardes**
2. Sélectionnez backup
3. **Restaurer**
4. Choisissez éléments à restaurer
5. Confirmez

## Sécurité Plesk

### Firewall

**1. Outils et paramètres** > **Firewall**

**2. Activer**

**Règles par défaut :**
- ✅ SSH (22)
- ✅ HTTP (80)
- ✅ HTTPS (443)
- ✅ Plesk (8443)
- ✅ FTP (21)
- ✅ Mail (25, 110, 143, 465, 587, 993, 995)

**Ajouter règle personnalisée :**

Exemple pour FiveM :
- Port : 30120
- Protocole : TCP et UDP
- Action : Autoriser

### Fail2Ban

Protection contre attaques brute-force.

**1. Extensions** > **Fail2Ban**

**2. Installer** (si pas déjà installé)

**3. Configurer jails**

- **SSH** : 3 tentatives, ban 1h
- **Plesk** : 5 tentatives, ban 1h
- **FTP** : 3 tentatives, ban 30min
- **Email** : 5 tentatives, ban 1h

**4. Activer**

### Updates automatiques

**1. Outils et paramètres** > **Mises à jour**

**2. Paramètres**

- ☑ Installer automatiquement les mises à jour
- ☑ Installer mises à jour de sécurité immédiatement
- Fréquence : Quotidien
- Heure : 03:00

**3. Sauvegarder**

## Optimisation

### PHP-FPM

**1. Sites web et domaines** > Votre domaine

**2. Paramètres PHP**

- **Mode** : FPM application
- **Version** : 8.2
- **memory_limit** : 256M
- **max_execution_time** : 300

### Cache

**Extensions** > **Redis Object Cache**

Ou **Memcached**

Améliore performances WordPress/applications.

### Compression

**Apache & nginx Settings**

- ☑ gzip compression
- ☑ Brotli (si disponible)

## Monitoring

### Dashboard

**Tableau de bord Plesk** affiche :
- CPU usage
- RAM usage
- Disk usage
- Trafic réseau
- Services status

### Logs

**Outils et paramètres** > **Logs**

Consultez :
- **Access logs** : Visites sites
- **Error logs** : Erreurs PHP/Apache
- **Mail logs** : Emails envoyés/reçus

### Notifications

**Outils et paramètres** > **Notifications**

Configurez alertes email pour :
- Espace disque faible
- CPU élevé
- Services down
- Certificats SSL expirant

## Extensions utiles

### WordPress Toolkit

Gestion avancée WordPress.

**Fonctionnalités :**
- Updates en 1 clic
- Clonage sites
- Staging environment
- Security scanner

### Advisor

Recommandations sécurité/performance.

### SEO Toolkit

Outils SEO intégrés.

### Docker

Gestion containers Docker.

## Migration vers Plesk

### Depuis cPanel

**1. Plesk Migrator Extension**

Extensions > **Plesk Migrator**

**2. Ajouter serveur source**

- Type : cPanel
- Host : IP_SOURCE
- Credentials : root

**3. Sélectionner comptes**

Choisissez comptes à migrer.

**4. Migrer**

Plesk transfère :
- Sites web
- Bases de données
- Emails
- DNS zones

### Depuis serveur manuel

**1. Backup fichiers**

```bash
tar -czf site-backup.tar.gz /var/www/html/
```

**2. Export base de données**

```bash
mysqldump -u user -p database > database.sql
```

**3. Upload vers Plesk**

Via FTP ou gestionnaire fichiers.

**4. Import BDD**

phpMyAdmin ou ligne de commande.

## Licence Plesk

### Types de licences

**Web Admin Edition :**
- 1 domaine
- Hébergement limité
- Prix : ~5€/mois

**Web Pro Edition :**
- 30 domaines
- Fonctionnalités avancées
- Prix : ~11€/mois

**Web Host Edition :**
- Domaines illimités
- Revendeur
- Prix : ~27€/mois

### Acheter licence

1. **Outils et paramètres** > **Clés de licence**
2. **Acheter ou renouveler**
3. Choisissez édition
4. Paiement

### Clé existante

Si clé achetée ailleurs :

1. **Clés de licence**
2. **Installer une clé**
3. Collez clé
4. **Installer**

## Dépannage

### Plesk inaccessible

**Vérifier service :**

```bash
systemctl status psa
systemctl restart psa
```

### Erreur 502/503

**Redémarrer services :**

```bash
systemctl restart httpd
systemctl restart nginx
systemctl restart mysql
```

### Oublié mot de passe admin

```bash
plesk login
# Affiche lien connexion temporaire
```

Ou réinitialiser :

```bash
plesk admin --set-admin-password -passwd NEW_PASSWORD
```

### Site web blanc/erreur

**Vérifier logs :**

**Sites web et domaines** > **Logs** > **Error Log**

**Permissions :**

```bash
plesk repair fs
```

## Commandes CLI utiles

```bash
# Lister domaines
plesk bin domain --list

# Créer domaine
plesk bin domain --create example.com

# Infos domaine
plesk bin domain --info example.com

# Lister comptes email
plesk bin mail --list

# Réparer Plesk
plesk repair all

# Update Plesk
plesk installer update

# Backup
plesk bin pleskbackup --all /var/backup/
```

## Désinstallation Plesk

Si nécessaire (⚠️ Supprime TOUT) :

```bash
plesk installer --remove-all-packages
```

## Ressources

- [Documentation Plesk](https://docs.plesk.com/)
- [Forum Plesk](https://talk.plesk.com/)
- [Video Tutorials](https://www.plesk.com/videos/)
- [Base de connaissances](https://support.plesk.com/)

## Support

Questions sur Plesk ? [Discord LKL Cloud](https://discord.gg/UaHNnMarQA)
