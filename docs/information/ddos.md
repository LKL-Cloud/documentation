---
id: ddos
title: Protection Anti-DDoS
---

LKL Cloud utilise plusieurs solutions de protection Anti-DDoS pour garantir la disponibilité de vos services.

## Nos solutions réseau

### GCore

Protection Anti-DDoS de niveau entreprise pour notre infrastructure réseau.

<div class="custom-table">

| CARACTERISTIQUE  | DETAIL |
|------------------|--------|
| Capacité de filtrage | Plusieurs Tbps |
| Temps de mitigation | < 5 secondes |
| Protection | L4, L7 |

</div>

### Stormwall

Solution complémentaire pour une protection renforcée.

<div class="custom-table">

| CARACTERISTIQUE  | DETAIL |
|------------------|--------|
| Type | Protection réseau avancée |
| Couverture | Trafic UDP/TCP |
| Spécialité | Gaming et applications temps réel |

</div>

## Protection Web

### Cloudflare

Nos sites web, panels et APIs sont protégés par Cloudflare.

## Comment ça fonctionne ?

:::info Flux de protection
Trafic entrant → Gcore / Stormwall → Filtrage → Votre serveur  
↓  
Trafic malveillant bloqué
:::

1. **Détection** : Le trafic est analysé en temps réel
2. **Filtrage** : Les paquets malveillants sont identifiés et bloqués
3. **Mitigation** : Seul le trafic légitime atteint votre serveur

## Impact sur vos services

### Pendant une attaque

- Légère augmentation de la latence possible
- Certains ports peuvent être temporairement restreints
- Protection automatique sans intervention de votre part

## Besoin d'une protection renforcée ?

Si vous êtes régulièrement ciblé par des attaques ou avez des besoins spécifiques, contactez notre [support](https://discord.gg/UaHNnMarQA) pour discuter des options de protection personnalisées.
