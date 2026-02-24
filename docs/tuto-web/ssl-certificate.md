---
title: Générer un certificat SSL Let's Encrypt
toc: false
---

Apprenez à sécuriser votre site web avec un certificat SSL gratuit fourni par Let's Encrypt directement depuis votre panel Plesk.

## Prérequis essentiels

Avant de démarrer l'installation du certificat, vérifiez ces points :

- Votre domaine doit être correctement configuré et pointé vers votre serveur
- Les enregistrements DNS doivent être propagés
- Vous devez avoir accès à votre panel Plesk

## Préparation : Vérification DNS

### Test de résolution

Assurez-vous que votre domaine résout correctement vers votre serveur en utilisant la commande :

```bash
ping votredomaine.com
```

La réponse doit afficher l'adresse IP de votre serveur LKL Cloud.

### Cas particulier : Cloudflare activé

Si vous utilisez Cloudflare comme proxy DNS :

1. Accédez à votre tableau de bord Cloudflare
2. Localisez l'enregistrement **A** ou **AAAA** de votre domaine
3. Désactivez temporairement le proxy (icône orange → grise)

:::danger Attention au proxy Cloudflare
Le proxy Cloudflare peut empêcher la validation du certificat Let's Encrypt. Il est impératif de le désactiver pendant la procédure d'installation.
:::

:::tip Délai de propagation
Après modification de vos DNS, patientez quelques minutes avant de continuer. Les changements ne sont pas instantanés.
:::

## Installation du certificat

### Accès à l'interface SSL

1. Connectez-vous à votre **interface Plesk** avec vos identifiants
2. Dans le menu principal, sélectionnez le domaine à sécuriser
3. Recherchez et cliquez sur l'option **Certificats SSL/TLS**

### Configuration Let's Encrypt

Dans la page des certificats SSL/TLS :

1. Localisez le bouton **Installer** (généralement en bas de page)
2. Sélectionnez l'option **Let's Encrypt**

### Paramétrage du certificat

Configurez les options suivantes :

- ✅ **Sécuriser le domaine principal**
- ✅ **Inclure www** (pour couvrir www.votredomaine.com)
- ✅ **Sécuriser le webmail** (si vous utilisez un webmail)
- ✅ **Autres sous-domaines** (si nécessaire)

:::warning Adresse email obligatoire
Renseignez une adresse email valide. Let's Encrypt l'utilisera pour vous notifier de l'expiration du certificat (bien que le renouvellement soit automatique).
:::

Cliquez ensuite sur **Obtenir gratuitement** pour lancer la procédure.

## Validation de propriété

Let's Encrypt doit vérifier que vous êtes propriétaire du domaine.

### Méthode automatique

Dans la plupart des cas, la validation se fait automatiquement via HTTP. Aucune action n'est requise de votre part.

### Méthode manuelle : Enregistrement TXT

Si la validation automatique échoue, Let's Encrypt peut demander un enregistrement TXT :

1. Retournez sur votre **gestionnaire DNS** (Cloudflare, OVH, etc.)
2. Créez un nouvel enregistrement de type **TXT**
3. Dans le champ **Nom** : collez la valeur fournie par Plesk
4. Dans le champ **Contenu** : collez le code de validation
5. Sauvegardez l'enregistrement
6. Retournez sur Plesk et cliquez sur **Continuer**

:::tip Patience requise
Après création de l'enregistrement TXT, attendez 2 à 5 minutes avant de cliquer sur Continuer. La propagation DNS prend du temps.
:::

## Vérification du certificat

### Test HTTPS

Une fois l'installation terminée, testez votre site en HTTPS :

```
https://votredomaine.com
```

Vous devriez voir un **cadenas vert** dans la barre d'adresse de votre navigateur, confirmant que la connexion est sécurisée.

### Détails du certificat

Pour vérifier les détails :

- Cliquez sur le cadenas dans la barre d'adresse
- Consultez les informations du certificat
- Vérifiez la date d'expiration (90 jours pour Let's Encrypt)

## Configuration post-installation

### Réactivation du proxy Cloudflare

Si vous avez désactivé le proxy Cloudflare, vous devez maintenant configurer le SSL :

1. Connectez-vous à votre **dashboard Cloudflare**
2. Allez dans la section **SSL/TLS**
3. Sélectionnez le mode de chiffrement **Full (strict)**
4. Réactivez le proxy (icône grise → orange)

<div class="custom-table">

| PARAMÈTRE | VALEUR |
|-----------|--------|
| Mode SSL | Full (strict) |
| Certificat serveur | Let's Encrypt |
| Proxy | Activé (orange) |

</div>

:::caution Mode SSL Cloudflare
Utilisez impérativement le mode **Full (strict)** pour éviter les erreurs de boucle de redirection. Le mode "Flexible" causera des problèmes.
:::

## Renouvellement automatique

:::tip Renouvellement géré par Plesk
Les certificats Let's Encrypt sont valables 90 jours. Plesk renouvelle automatiquement votre certificat avant expiration. Vous n'avez rien à faire.
:::

En cas de problème de renouvellement, vous recevrez un email à l'adresse indiquée lors de l'installation.
