---
title: Tous les ports sont-ils ouverts ?
---

Information sur les ports ouverts et la configuration des pare-feu sur les services LKL Cloud.

## Politique des ports

### VPS Linux/Windows

**Tous les ports sont FERMÉS par défaut** pour des raisons de sécurité.

Vous devez ouvrir manuellement les ports dont vous avez besoin via :
- **UFW** (Linux)
- **Pare-feu Windows** (Windows)
- **Panel de gestion** (si disponible)

### Serveurs de jeu (Panel Game)

**Ports automatiquement ouverts :**
- Port principal du jeu (ex: 30120 pour FiveM, 25565 pour Minecraft)
- Ports additionnels configurés dans le panel

## Ports communs à ouvrir

### Web

| Service | Port | Protocole |
|---------|------|-----------|
| HTTP | 80 | TCP |
| HTTPS | 443 | TCP |
| HTTP/3 | 443 | UDP |

**Commandes UFW :**
```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 443/udp
```

### FTP/SFTP

| Service | Port | Protocole |
|---------|------|-----------|
| FTP | 21 | TCP |
| SFTP | 22 | TCP |
| FTP Passif | 40000-50000 | TCP |

**Commandes UFW :**
```bash
sudo ufw allow 21/tcp
sudo ufw allow 22/tcp
sudo ufw allow 40000:50000/tcp
```

### Base de données

| Service | Port | Protocole |
|---------|------|-----------|
| MySQL/MariaDB | 3306 | TCP |
| PostgreSQL | 5432 | TCP |
| MongoDB | 27017 | TCP |
| Redis | 6379 | TCP |

:::warning Sécurité
N'ouvrez les ports de base de données que si absolument nécessaire. Préférez un accès local ou via tunnel SSH.
:::

**Accès sécurisé :**
```bash
# Autoriser seulement IP spécifique
sudo ufw allow from VOTRE_IP to any port 3306
```

### Serveurs de jeu

| Jeu | Port par défaut | Protocole |
|-----|----------------|-----------|
| FiveM | 30120 | TCP/UDP |
| Minecraft Java | 25565 | TCP |
| Minecraft Bedrock | 19132 | UDP |
| Garry's Mod | 27015 | TCP/UDP |
| CS:GO | 27015 | TCP/UDP |
| ARK | 7777-7778 | UDP |
| Rust | 28015-28016 | TCP/UDP |
| Valheim | 2456-2458 | UDP |

**FiveM exemple :**
```bash
sudo ufw allow 30120/tcp
sudo ufw allow 30120/udp
sudo ufw allow 40120/tcp  # txAdmin
```

### Email

| Service | Port | Protocole | Usage |
|---------|------|-----------|-------|
| SMTP | 25 | TCP | Envoi |
| SMTP SSL | 465 | TCP | Envoi sécurisé |
| SMTP TLS | 587 | TCP | Envoi sécurisé |
| POP3 | 110 | TCP | Réception |
| POP3S | 995 | TCP | Réception sécurisée |
| IMAP | 143 | TCP | Réception |
| IMAPS | 993 | TCP | Réception sécurisée |

### Autres services

| Service | Port | Protocole |
|---------|------|-----------|
| SSH | 22 | TCP |
| RDP | 3389 | TCP |
| VNC | 5900 | TCP |
| Docker API | 2375-2376 | TCP |
| Portainer | 9000 | TCP |
| Plesk | 8443 | TCP |
| cPanel | 2083 | TCP |

## Vérifier les ports ouverts

### Depuis le serveur

**Lister ports en écoute :**
```bash
# Tous les ports
sudo netstat -tulpn

# Ports TCP
sudo ss -tulpn | grep LISTEN

# Avec lsof
sudo lsof -i -P -n | grep LISTEN
```

**Vérifier règles firewall :**
```bash
# UFW
sudo ufw status verbose

# iptables
sudo iptables -L -n -v

# firewalld
sudo firewall-cmd --list-all
```

### Depuis l'extérieur

**Test simple :**
```bash
# Telnet
telnet IP_SERVEUR PORT

# Netcat
nc -zv IP_SERVEUR PORT

# Nmap
nmap -p PORT IP_SERVEUR
```

**Outils en ligne :**
- https://www.yougetsignal.com/tools/open-ports/
- https://www.canyouseeme.org/
- https://portchecker.co/

## Ouvrir des ports

### Linux avec UFW

**Installation :**
```bash
sudo apt install ufw
```

**Configuration basique :**
```bash
# Autoriser SSH AVANT d'activer UFW
sudo ufw allow 22/tcp

# Activer UFW
sudo ufw enable

# Ouvrir ports
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 30120  # TCP et UDP

# Port range
sudo ufw allow 7777:7780/udp

# IP spécifique
sudo ufw allow from 1.2.3.4 to any port 3306

# Vérifier status
sudo ufw status numbered
```

**Fermer un port :**
```bash
# Par numéro de règle
sudo ufw delete 3

# Par spécification
sudo ufw delete allow 80/tcp
```

### Linux avec iptables

```bash
# Autoriser port TCP
sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT

# Autoriser port UDP
sudo iptables -A INPUT -p udp --dport 30120 -j ACCEPT

# Sauvegarder règles
sudo iptables-save > /etc/iptables/rules.v4
```

### Windows Firewall

**Via interface graphique :**
1. **Panneau de configuration**
2. **Système et sécurité**
3. **Pare-feu Windows Defender**
4. **Paramètres avancés**
5. **Règles de trafic entrant**
6. **Nouvelle règle...**
7. Type : **Port**
8. Protocole et ports : TCP/UDP + numéro
9. Action : **Autoriser**
10. Profil : Tous
11. Nom : Description claire

**Via PowerShell :**
```powershell
# Ouvrir port TCP
New-NetFirewallRule -DisplayName "HTTP" -Direction Inbound -LocalPort 80 -Protocol TCP -Action Allow

# Ouvrir port UDP
New-NetFirewallRule -DisplayName "FiveM" -Direction Inbound -LocalPort 30120 -Protocol UDP -Action Allow

# Range de ports
New-NetFirewallRule -DisplayName "FTP Passif" -Direction Inbound -LocalPort 40000-50000 -Protocol TCP -Action Allow
```

## Configuration par cas d'usage

### Serveur web complet

```bash
# HTTP/HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# SSH
sudo ufw allow 22/tcp

# FTP (si nécessaire)
sudo ufw allow 21/tcp
sudo ufw allow 40000:50000/tcp

# Activer
sudo ufw enable
```

### Serveur FiveM production

```bash
# Port jeu
sudo ufw allow 30120/tcp
sudo ufw allow 30120/udp

# txAdmin
sudo ufw allow 40120/tcp

# SSH (changez port si modifié)
sudo ufw allow 22/tcp

sudo ufw enable
```

### Serveur Minecraft

```bash
# Minecraft
sudo ufw allow 25565/tcp

# RCON (optionnel)
sudo ufw allow 25575/tcp

# SSH
sudo ufw allow 22/tcp

sudo ufw enable
```

### Serveur de développement

```bash
# SSH
sudo ufw allow 22/tcp

# HTTP/HTTPS
sudo ufw allow 80,443/tcp

# Ports dev communs
sudo ufw allow 3000/tcp  # React/Node
sudo ufw allow 8080/tcp  # Alt HTTP
sudo ufw allow 5432/tcp  # PostgreSQL (IP limitée recommandée)

sudo ufw enable
```

## Sécurité des ports

### Principe du moindre privilège

**N'ouvrez que les ports nécessaires.**

❌ **Mauvaise pratique :**
```bash
# Tout ouvrir (DANGEREUX)
sudo ufw default allow
```

✅ **Bonne pratique :**
```bash
# Deny par défaut, allow seulement ce qui est nécessaire
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
```

### Limiter le rate

Protégez SSH contre brute-force :

```bash
sudo ufw limit 22/tcp
```

Limite les connexions à 6 tentatives en 30 secondes.

### IP whitelisting

Pour services sensibles :

```bash
# MySQL accessible seulement depuis votre IP
sudo ufw allow from VOTRE_IP to any port 3306

# Ou subnet
sudo ufw allow from 192.168.1.0/24 to any port 3306
```

### Knock port (avancé)

Service invisible jusqu'à "frappe" sur ports spécifiques.

**Installation :**
```bash
sudo apt install knockd
```

**Configuration :**
```bash
# /etc/knockd.conf
[openSSH]
    sequence    = 7000,8000,9000
    seq_timeout = 5
    command     = /sbin/iptables -A INPUT -s %IP% -p tcp --dport 22 -j ACCEPT
    
[closeSSH]
    sequence    = 9000,8000,7000
    seq_timeout = 5
    command     = /sbin/iptables -D INPUT -s %IP% -p tcp --dport 22 -j ACCEPT
```

**Usage :**
```bash
# Depuis client
knock SERVER_IP 7000 8000 9000
ssh user@SERVER_IP
knock SERVER_IP 9000 8000 7000
```

## Résolution problèmes

### Port apparemment ouvert mais inaccessible

**Causes possibles :**

1. **Service ne tourne pas**
```bash
sudo systemctl status nom_service
```

2. **Service écoute mauvaise interface**
```bash
sudo netstat -tulpn | grep :PORT
```

Si `127.0.0.1:PORT` au lieu de `0.0.0.0:PORT`, le service écoute seulement localhost.

**Fix :**
Éditez config du service pour bind sur `0.0.0.0` ou IP publique.

3. **Firewall niveau supérieur**

Fournisseur peut avoir firewall devant votre VPS. Contactez support.

### Port bloqué par ISP

Certains FAI bloquent ports comme 25 (SMTP), 80, 443.

**Test :**
```bash
# Depuis une autre connexion
telnet IP_SERVEUR PORT
```

**Solutions :**
- Utilisez port alternatif (8080 au lieu de 80)
- VPN/Proxy
- Contactez votre FAI

### Conflit de ports

Deux services essaient d'utiliser même port.

**Identifier :**
```bash
sudo lsof -i :PORT
```

**Résoudre :**
- Changez port d'un des services
- Arrêtez service non nécessaire

## Documentation LKL Cloud

### Support infrastructure

**Nos datacenters autorisent tous les ports** sauf restrictions légales.

**Ports toujours disponibles :**
- ✅ Tous ports 1-65535
- ✅ TCP et UDP
- ✅ Sans restriction débit

**Exceptions légales :**
- Port 25 (SMTP) peut nécessiter validation anti-spam
- Contactez support si besoin

### Demande d'ouverture de port

Si vous rencontrez des difficultés :

1. **Vérifiez** d'abord votre firewall local
2. **Testez** avec firewall désactivé temporairement
3. **Contactez** support si toujours bloqué :
   - [Discord LKL Cloud](https://discord.gg/UaHNnMarQA)
   - Précisez : Port, protocole, service

## Best practices

### Checklist sécurité

- [ ] Firewall activé (UFW/Windows Firewall)
- [ ] Deny all par défaut, allow seulement nécessaire
- [ ] SSH sur port non-standard (optionnel mais recommandé)
- [ ] Fail2Ban installé et configuré
- [ ] Rate limiting sur services critiques
- [ ] Monitoring des connexions actives
- [ ] Logs régulièrement consultés
- [ ] Updates de sécurité appliquées

### Monitoring continu

**Script de surveillance :**

```bash
#!/bin/bash
# check-ports.sh

PORTS="22 80 443 30120"

for port in $PORTS; do
    if nc -zv -w 3 localhost $port 2>&1 | grep -q 'succeeded'; then
        echo "✅ Port $port: OK"
    else
        echo "❌ Port $port: DOWN"
        # Alert Discord/Email
    fi
done
```

### Documentation

Maintenez un fichier listant :
- Ports ouverts
- Services associés
- Raison de l'ouverture
- Date d'ouverture

**Exemple :**
```
# ports-ouverts.txt
22/tcp - SSH - Toujours ouvert - 2024-01-09
80/tcp - Nginx - Site web - 2024-01-09
443/tcp - Nginx SSL - Site web - 2024-01-09
30120/tcp+udp - FiveM - Serveur RP - 2024-01-09
40120/tcp - txAdmin - Admin FiveM - 2024-01-09
```

## Ressources

- [IANA Port Numbers](https://www.iana.org/assignments/service-names-port-numbers/)
- [UFW Documentation](https://help.ubuntu.com/community/UFW)
- [iptables Tutorial](https://www.netfilter.org/documentation/)
- [Windows Firewall Guide](https://docs.microsoft.com/en-us/windows/security/threat-protection/windows-firewall/)

## Support

Questions sur les ports ? [Discord LKL Cloud](https://discord.gg/UaHNnMarQA)
