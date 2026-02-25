---
title: Configurer un nom de domaine
sidebar_position: 1
toc: false
---

Ce guide vous montre étape par étape comment lier votre nom de domaine à votre hébergement LKL Cloud.

## Avant de commencer

Pour suivre ce tutoriel, assurez-vous d'avoir :

- Un nom de domaine enregistré chez un registrar (OVH, Namecheap, Gandi, etc.)
- Un hébergement web actif sur LKL Cloud

## Étape 1 : Configuration des enregistrements DNS

Connectez-vous à l'interface de gestion de votre registrar et créez les enregistrements suivants :

<div class="custom-table">

| TYPE | NOM | VALEUR | TTL |
|------|-----|--------|-----|
| A | @ | IP_SERVEUR | 3600 |
| A | www | IP_SERVEUR | 3600 |
| CNAME | www | votredomaine.com | 3600 |

</div>

:::warning Important
L'adresse `IP_SERVEUR` doit être remplacée par l'IP de votre serveur disponible dans votre espace client LKL Cloud.
:::

### Détails des enregistrements

- **Enregistrement A (@)** : Pointe votre domaine racine vers le serveur
- **Enregistrement A (www)** : Permet l'accès avec le préfixe www
- **Enregistrement CNAME** : Crée un alias pour le sous-domaine www

## Étape 2 : Ajout du domaine dans Plesk

Une fois vos DNS configurés, ajoutez le domaine dans votre panel Plesk :

1. Accédez à votre interface Plesk
2. Naviguez vers la section **Sites Web & Domaines**
3. Sélectionnez **Ajouter un domaine**
4. Saisissez votre nom de domaine complet
5. Validez la configuration

:::caution Délai de propagation
La propagation DNS peut prendre de quelques minutes à 48 heures. Pendant ce temps, votre site peut ne pas être accessible.
:::

## Vérifier la configuration

### Via la ligne de commande

Utilisez la commande suivante pour vérifier la résolution DNS :

```bash
nslookup votredomaine.com
```

### Via un outil en ligne

Vous pouvez également utiliser [DNS Checker](https://dnschecker.org) pour vérifier la propagation mondiale de vos DNS.
