---
title: Se connecter à un VPS Windows
sidebar_position: 2
toc: false
---

Découvrez comment établir une connexion à distance vers votre serveur Windows via le protocole RDP (Remote Desktop Protocol).

:::info Vidéo
📹 Vidéo bientôt disponible
:::

## Connexion depuis Windows

### Étapes de connexion

1. Ouvrez l'outil **Bureau à distance** :
   - Appuyez simultanément sur `Win + R`
   - Tapez `mstsc` dans la fenêtre d'exécution
   - Validez avec **Entrée**

2. Renseignez l'adresse IP de votre serveur dans le champ **Ordinateur**

3. Cliquez sur le bouton **Connexion**

4. Saisissez vos identifiants d'accès :
   - **Nom d'utilisateur** : `Administrator`
   - **Mot de passe** : celui communiqué par email lors de la livraison

:::tip Identifiants de connexion
Les informations de connexion vous ont été envoyées par email après l'activation de votre VPS. Vérifiez votre boîte de réception et vos courriers indésirables.
:::

## Connexion depuis macOS

### Installation du client RDP

Pour vous connecter depuis un Mac, vous devez d'abord installer l'application officielle :

1. Téléchargez [Microsoft Remote Desktop](https://apps.apple.com/fr/app/microsoft-remote-desktop/id1295203466) depuis l'App Store
2. Installez l'application sur votre Mac
3. Lancez Microsoft Remote Desktop

### Procédure de connexion

1. Dans l'application, cliquez sur **Add PC**
2. Entrez l'adresse IP de votre VPS Windows
3. Cliquez sur **Add** pour enregistrer la configuration
4. Double-cliquez sur la connexion créée pour lancer la session

Lors de la première connexion, entrez vos identifiants :
- Utilisateur : `Administrator`
- Mot de passe : fourni par email

## Connexion depuis Linux

### Installation de Remmina

Remmina est le client RDP recommandé pour Linux. Installez-le avec la commande suivante :

```bash
sudo apt install remmina remmina-plugin-rdp
```

:::warning Compatibilité
Cette commande fonctionne sur les distributions basées sur Debian/Ubuntu. Pour d'autres distributions (Fedora, Arch), adaptez la commande à votre gestionnaire de paquets.
:::

### Configuration de la connexion

1. Lancez **Remmina** depuis vos applications
2. Cliquez sur l'icône **+** pour créer une nouvelle connexion
3. Configurez les paramètres :
   - **Protocole** : RDP
   - **Serveur** : adresse IP de votre VPS
   - **Nom d'utilisateur** : `Administrator`
   - **Mot de passe** : celui reçu par email
4. Cliquez sur **Connecter** pour démarrer la session

## Sécurité de la connexion

### Certificat SSL

:::caution Certificat de sécurité
Lors de votre première connexion RDP, un avertissement concernant le certificat de sécurité apparaîtra. C'est normal pour une première connexion.
:::

**Action à effectuer :**
- Cochez l'option "Ne plus me demander pour ce certificat"
- Cliquez sur **Oui** ou **Accepter** pour continuer

Ce certificat garantit le chiffrement de votre connexion. Acceptez-le pour accéder à votre serveur.

## Dépannage

### Connexion refusée

Si vous ne parvenez pas à vous connecter :

- ✅ Vérifiez que l'adresse IP est correcte
- ✅ Assurez-vous que le VPS est bien démarré depuis votre espace client
- ✅ Contrôlez que le port 3389 (RDP) n'est pas bloqué par votre pare-feu local
- ✅ Testez depuis un autre réseau (4G/5G) pour éliminer un blocage réseau

### Identifiants incorrects

Si vos identifiants sont refusés :

- Vérifiez l'email de livraison pour le mot de passe initial
- Assurez-vous d'utiliser `Administrator` comme nom d'utilisateur
- Si vous avez modifié le mot de passe, réinitialisez-le depuis votre espace client

:::tip Besoin d'aide ?
En cas de problème persistant, contactez notre support sur [Discord](https://discord.gg/UaHNnMarQA) avec l'adresse IP de votre VPS et une description du problème rencontré.
:::
