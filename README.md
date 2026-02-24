# LKLCloud Documentation

Documentation officielle de [LKLCloud](https://lklcloud.fr) — votre nouvel hébergeur français haute performance.

## Stack

- [Docusaurus 3](https://docusaurus.io/) — Générateur de sites statiques
- Déploiement automatique via Plesk Git
- Notifications Discord via GitHub Actions

## Installation

```bash
npm install --legacy-peer-deps
```

## Développement local

```bash
npm start
```

Le site sera accessible sur `http://localhost:3000/`.

## Build

```bash
npm run build
```

Génère le site statique dans le dossier `build/`.

## Structure

```
docs/               # Pages de documentation (Markdown)
├── information/     # Infos sur LKLCloud
├── panel-game/      # Panel Game
├── tuto-web/        # Tutoriels Web
├── tuto-vps/        # Tutoriels VPS Linux
├── vps-windows/     # VPS Windows
├── fivem/           # FiveM
├── minecraft/       # Minecraft
├── gmod/            # Garry's Mod
└── intro.md         # Page d'accueil
src/css/             # Styles custom
static/              # Assets statiques (images, favicon)
i18n/                # Traductions (FR/EN)
```

## Liens

- [Site Web](https://lklcloud.fr)
- [Espace client](https://client.lklcloud.fr)
- [Discord](https://discord.gg/UaHNnMarQA)
- [Documentation](https://docs.lklcloud.fr)

## Licence

Copyright © 2026 LKLCloud. Tous droits réservés.
