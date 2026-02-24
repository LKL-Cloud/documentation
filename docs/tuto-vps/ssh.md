---
title: Se connecter en SSH à votre serveur
toc: false
---

Ce guide vous explique comment vous connecter à votre VPS via SSH.

---

## Informations à préparer
- Vos identifiants VPS (Adresse IP, nom d'utilisateur et mot de passe)

---

## Connextion
Depuis un terminal (Sur macOS et Linux), ou sur Windows depuis le PowerShell (ou CMD) vous pouvez directement vous connecter avec la commande suivante.
```bash
ssh NOM_UTILISATEUR@IP
```

**Information**: Lors de votre première connexion, vous devrez accepter l'empreinte du serveur en entrant `yes` dans votre terminal.\
**Sécurité** :  Changez votre mot de passe immédiatement après vous être connectés à l'aide de la commande `passwd`.

:::tip ASTUCE
Un bot mot de passe devrait contenir **au moins 12 caractères**, **des majuscules ainsi que des minuscules**, **des chiffres** et **des caractères spéciaux**

Une commande utile pour générer un mot de passe aléatoirement :
```bash
openssl rand -base64 16
```
:::
