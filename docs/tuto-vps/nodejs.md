---
title: Installer Node.js sur votre serveur
toc: false
---

Ce guide vous explique comment installer Node.js sur votre serveur.
Pour ce faire, 2 options principales s'ofrrent à vous.

---

## Via NodeSource
### Pour Node.js 24 LTS

```bash
curl -fsSL https://deb.nodesource.com/setup_24.x | sudo -E bash -
sudo apt-get install nodejs -y
```

### Pour Node.js 22 LTS

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install nodejs -y
```

---

## Via NVM (Node Version Manager)
Utile si vous souhaitez avoir plusieurs versions de Nodejs à la fois
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
source ~/.bashrc
nvm install 24
nvm use 24
```
