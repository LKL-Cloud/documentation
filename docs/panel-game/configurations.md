---
title: Configurer le redémarrage automatique
toc: false
---

Ce guide vous montre comment configurer le redémarrage automatique de votre serveur de jeux.


:::info Vidéo
📹 Vidéo bientôt disponible
:::


## Via les Schedules

1. **Connectez-vous à votre Panel Game :**
   - [game01.lklcloud.fr](https://game.lklcloud.fr/) pour les serveurs standards

2. Sélectionnez votre serveur

3. Allez dans **Schedules**

4. Cliquez sur Create Schedule

5. Configurez 
    - **Name** : Restart automatique
    - **Minute** : 0
    - **Hour** : 4 (pour un restart à 4h du matin)
    - **Day of Month** : * (tous les jours)
    - **Month** : * (tous les mois)
    - **Day of Week** : * (tous les jours)

6. Cliquez sur **Create Schedule**

7. Ajoutez une tâche :
    - Cliquez sur **New Task**
    - Action : **Send power action**
    - Payload : **restart**
    - Time offset : 0

8. Sauvegardez

## Exemple de configuration

Pour un redémarrage quotidien à 6h00 :

- **Minute** : `0`
- **Hour** : `6`
- **Day of Month** : `*`
- **Month** : `*`
- **Day of Week** : `*`

:::info
Le serveur enverra une notification dans la console avant le redémarrage si vous configurez un délai.
:::
