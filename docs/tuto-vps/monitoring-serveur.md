---
title: Monitoring serveur
sidebar_position: 9
---

Guide complet pour surveiller les performances et l'état de votre serveur avec différents outils de monitoring.

## Monitoring de base

### Commandes système essentielles

**CPU et RAM :**

```bash
# Vue d'ensemble
top

# Alternative moderne
htop

# Vue système complète
glances
```

**Espace disque :**

```bash
# Utilisation disques
df -h

# Utilisation dossiers
du -sh /*

# Trouver gros fichiers
du -ah / | sort -rh | head -20
```

**Processus :**

```bash
# Lister processus
ps aux

# Par utilisation CPU
ps aux --sort=-%cpu | head -10

# Par utilisation RAM
ps aux --sort=-%mem | head -10
```

**Réseau :**

```bash
# Connexions actives
netstat -tulpn

# Alternative moderne
ss -tulpn

# Bande passante temps réel
iftop
```

## htop - Monitoring interactif

### Installation

```bash
sudo apt install htop
```

### Utilisation

```bash
htop
```

**Navigation :**
- `F1` : Aide
- `F2` : Setup
- `F3` : Recherche processus
- `F4` : Filtre
- `F5` : Vue arbre
- `F6` : Trier par colonne
- `F9` : Kill processus
- `F10` : Quitter

**Colonnes importantes :**
- **PID** : Process ID
- **USER** : Propriétaire
- **PRI** : Priorité
- **NI** : Nice value
- **VIRT** : Mémoire virtuelle
- **RES** : RAM réelle utilisée
- **SHR** : Mémoire partagée
- **%CPU** : Utilisation CPU
- **%MEM** : Utilisation RAM
- **TIME+** : Temps CPU total

## glances - Monitoring complet

### Installation

```bash
sudo apt install glances
```

### Utilisation

**Mode local :**

```bash
glances
```

**Mode serveur :**

```bash
# Démarrer serveur
glances -w

# Accès web
# http://VOTRE_IP:61208
```

**Mode client :**

```bash
glances -c SERVEUR_IP
```

**Fonctionnalités :**
- CPU, RAM, Swap, Load average
- Réseau (RX/TX)
- Disques I/O
- Processus triés
- Sensors température
- Docker containers
- Alertes configurables

**Raccourcis :**
- `h` : Aide
- `q` : Quitter
- `d` : Afficher/Cacher disques
- `n` : Afficher/Cacher réseau
- `s` : Afficher/Cacher sensors
- `D` : Afficher/Cacher Docker

## Netdata - Monitoring temps réel

### Installation

```bash
# Script automatique
bash <(curl -Ss https://my-netdata.io/kickstart.sh)
```

### Accès interface

**URL :** `http://VOTRE_IP:19999`

**Fonctionnalités :**
- Dashboard temps réel (1s refresh)
- Graphiques interactifs
- Historique complet
- Alertes configurables
- Support Docker
- Export vers backends (Prometheus, Graphite)

### Configuration alertes

```bash
sudo nano /etc/netdata/health_alarm_notify.conf
```

**Discord webhook :**

```bash
DISCORD_WEBHOOK_URL="https://discord.com/api/webhooks/..."
SEND_DISCORD="YES"
DEFAULT_RECIPIENT_DISCORD=""
```

**Email :**

```bash
EMAIL_SENDER="netdata@votredomaine.com"
DEFAULT_RECIPIENT_EMAIL="admin@votredomaine.com"
SEND_EMAIL="YES"
```

### Sécuriser Netdata

**Restriction IP :**

```bash
sudo nano /etc/netdata/netdata.conf
```

```ini
[web]
    bind to = 127.0.0.1
```

**Via Nginx reverse proxy :**

```nginx
server {
    listen 443 ssl http2;
    server_name monitoring.votredomaine.com;

    auth_basic "Monitoring";
    auth_basic_user_file /etc/nginx/.htpasswd;

    location / {
        proxy_pass http://127.0.0.1:19999;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## Prometheus + Grafana

Stack monitoring professionnel.

### Installation Prometheus

```bash
# Créer utilisateur
sudo useradd --no-create-home --shell /bin/false prometheus

# Télécharger
cd /tmp
wget https://github.com/prometheus/prometheus/releases/download/v2.45.0/prometheus-2.45.0.linux-amd64.tar.gz
tar xvf prometheus-*.tar.gz
cd prometheus-*/

# Installer
sudo cp prometheus promtool /usr/local/bin/
sudo cp -r consoles console_libraries /etc/prometheus/

# Configuration
sudo nano /etc/prometheus/prometheus.yml
```

**prometheus.yml :**

```yaml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']

  - job_name: 'node'
    static_configs:
      - targets: ['localhost:9100']
```

**Service systemd :**

```bash
sudo nano /etc/systemd/system/prometheus.service
```

```ini
[Unit]
Description=Prometheus
Wants=network-online.target
After=network-online.target

[Service]
User=prometheus
Group=prometheus
Type=simple
ExecStart=/usr/local/bin/prometheus \
    --config.file /etc/prometheus/prometheus.yml \
    --storage.tsdb.path /var/lib/prometheus/ \
    --web.console.templates=/etc/prometheus/consoles \
    --web.console.libraries=/etc/prometheus/console_libraries

[Install]
WantedBy=multi-user.target
```

**Démarrer :**

```bash
sudo systemctl daemon-reload
sudo systemctl start prometheus
sudo systemctl enable prometheus
```

### Node Exporter

Exporte métriques système pour Prometheus.

```bash
# Télécharger
wget https://github.com/prometheus/node_exporter/releases/download/v1.6.0/node_exporter-1.6.0.linux-amd64.tar.gz
tar xvf node_exporter-*.tar.gz
sudo cp node_exporter-*/node_exporter /usr/local/bin/

# Service
sudo nano /etc/systemd/system/node_exporter.service
```

```ini
[Unit]
Description=Node Exporter
After=network.target

[Service]
User=prometheus
Group=prometheus
Type=simple
ExecStart=/usr/local/bin/node_exporter

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl start node_exporter
sudo systemctl enable node_exporter
```

### Installation Grafana

```bash
# Ajouter repository
sudo apt install -y software-properties-common
wget -q -O - https://packages.grafana.com/gpg.key | sudo apt-key add -
echo "deb https://packages.grafana.com/oss/deb stable main" | sudo tee /etc/apt/sources.list.d/grafana.list

# Installer
sudo apt update
sudo apt install grafana

# Démarrer
sudo systemctl start grafana-server
sudo systemctl enable grafana-server
```

**Accès :** `http://VOTRE_IP:3000`

**Login par défaut :**
- Username: `admin`
- Password: `admin` (à changer)

### Configuration Grafana

**1. Ajouter Data Source**

- Configuration > Data Sources
- Add data source
- Prometheus
- URL: `http://localhost:9090`
- Save & Test

**2. Importer Dashboard**

- Create > Import
- Dashboard ID: `1860` (Node Exporter Full)
- Load
- Select Prometheus data source
- Import

**Dashboards recommandés :**
- **1860** : Node Exporter Full
- **11074** : Node Exporter for Prometheus
- **13978** : Docker monitoring
- **7362** : MySQL Overview

## Uptime Kuma

Monitoring uptime et alertes.

### Installation via Docker

```bash
docker run -d \
  --name uptime-kuma \
  --restart=unless-stopped \
  -p 3001:3001 \
  -v uptime-kuma:/app/data \
  louislam/uptime-kuma:1
```

**Accès :** `http://VOTRE_IP:3001`

### Configuration

**1. Créer compte admin**

**2. Ajouter monitors**

- Add New Monitor
- Monitor Type: HTTP(s), TCP Port, Ping, Docker
- Friendly Name: Mon Site Web
- URL: https://monsite.com
- Heartbeat Interval: 60 seconds
- Retries: 3

**3. Notifications**

- Settings > Notifications
- Setup Notif Type:
  - Discord Webhook
  - Email (SMTP)
  - Telegram
  - Slack
  - Pushover

**4. Status Page**

- Status Pages > Add
- URL publique pour clients
- Choix monitors à afficher

## Scripts monitoring custom

### CPU Alert

```bash
#!/bin/bash
# cpu-alert.sh

THRESHOLD=80
CPU=$(top -bn1 | grep "Cpu(s)" | awk '{print $2}' | cut -d'%' -f1)

if (( $(echo "$CPU > $THRESHOLD" | bc -l) )); then
    echo "⚠️ CPU Usage: ${CPU}%"
    # Envoyer notification Discord
    curl -X POST "WEBHOOK_URL" \
        -H "Content-Type: application/json" \
        -d "{\"content\":\"⚠️ CPU élevé: ${CPU}%\"}"
fi
```

### Disk Space Alert

```bash
#!/bin/bash
# disk-alert.sh

THRESHOLD=85
USAGE=$(df / | tail -1 | awk '{print $5}' | sed 's/%//')

if [ $USAGE -gt $THRESHOLD ]; then
    echo "⚠️ Disk Usage: ${USAGE}%"
    # Notification
    curl -X POST "WEBHOOK_URL" \
        -H "Content-Type: application/json" \
        -d "{\"content\":\"⚠️ Disque plein: ${USAGE}%\"}"
fi
```

### Service Monitor

```bash
#!/bin/bash
# service-monitor.sh

SERVICES=("nginx" "mysql" "docker")

for service in "${SERVICES[@]}"; do
    if ! systemctl is-active --quiet $service; then
        echo "❌ $service is down"
        # Restart service
        sudo systemctl restart $service
        # Notification
        curl -X POST "WEBHOOK_URL" \
            -H "Content-Type: application/json" \
            -d "{\"content\":\"❌ $service was down and restarted\"}"
    fi
done
```

### Automatiser avec Cron

```bash
crontab -e
```

```bash
# CPU check toutes les 5 minutes
*/5 * * * * /root/scripts/cpu-alert.sh

# Disk space check quotidien
0 8 * * * /root/scripts/disk-alert.sh

# Services check toutes les minutes
* * * * * /root/scripts/service-monitor.sh
```

## Logs centralisés

### rsyslog

Centraliser logs de plusieurs serveurs.

**Serveur central :**

```bash
sudo nano /etc/rsyslog.conf
```

```
# Activer réception TCP
module(load="imtcp")
input(type="imtcp" port="514")

# Template
$template RemoteLogs,"/var/log/remote/%HOSTNAME%/%PROGRAMNAME%.log"
*.* ?RemoteLogs
& ~
```

```bash
sudo systemctl restart rsyslog
```

**Clients :**

```bash
sudo nano /etc/rsyslog.conf
```

```
*.* @@SERVEUR_IP:514
```

```bash
sudo systemctl restart rsyslog
```

### Loki + Grafana

Alternative moderne à ELK stack.

```yaml
# docker-compose.yml
version: '3.8'

services:
  loki:
    image: grafana/loki:latest
    ports:
      - "3100:3100"
    volumes:
      - ./loki-config.yml:/etc/loki/local-config.yaml
      - loki_data:/loki
    command: -config.file=/etc/loki/local-config.yaml

  promtail:
    image: grafana/promtail:latest
    volumes:
      - /var/log:/var/log:ro
      - ./promtail-config.yml:/etc/promtail/config.yml
    command: -config.file=/etc/promtail/config.yml

  grafana:
    image: grafana/grafana:latest
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
    volumes:
      - grafana_data:/var/lib/grafana

volumes:
  loki_data:
  grafana_data:
```

## Alertes avancées

### PagerDuty

Service d'astreinte professionnel.

**Intégration Prometheus :**

```yaml
# alertmanager.yml
route:
  receiver: 'pagerduty'

receivers:
  - name: 'pagerduty'
    pagerduty_configs:
      - service_key: 'VOTRE_SERVICE_KEY'
```

### OpsGenie

Alternative PagerDuty.

### Healthchecks.io

Monitoring de cronjobs.

**Utilisation :**

```bash
#!/bin/bash
curl -fsS -m 10 --retry 5 https://hc-ping.com/VOTRE_UUID
./mon-backup.sh
curl -fsS -m 10 --retry 5 https://hc-ping.com/VOTRE_UUID/$?
```

## Monitoring applications

### PM2 Monitoring

Pour applications Node.js.

```bash
# Monitoring local
pm2 monit

# Dashboard web
pm2 install pm2-server-monit

# PM2 Plus (cloud)
pm2 link [secret] [public]
```

### APM (Application Performance Monitoring)

**New Relic :**

```bash
# Installer agent
npm install newrelic

# Configuration
cp node_modules/newrelic/newrelic.js .
```

**Datadog :**

```bash
# Agent
DD_AGENT_MAJOR_VERSION=7 DD_API_KEY=VOTRE_CLE bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script.sh)"
```

## Best practices

### Checklist monitoring

- [ ] Monitoring CPU/RAM/Disk en temps réel
- [ ] Alertes configurées (>80% CPU, >85% Disk)
- [ ] Uptime monitoring sites critiques
- [ ] Logs centralisés et rotationnés
- [ ] Backup monitoring (vérifier réussite)
- [ ] Services monitoring (auto-restart)
- [ ] Dashboard accessible équipe
- [ ] Notification multi-canaux (Discord, Email, SMS)
- [ ] Rétention logs appropriée (30-90 jours)
- [ ] Documentation procédures d'urgence

### Métriques importantes

**Serveur :**
- CPU usage moyenne et pics
- RAM disponible
- Espace disque libre
- Load average (1, 5, 15 min)
- Disk I/O
- Network throughput

**Application :**
- Response time
- Error rate (%)
- Requests per second
- Database query time
- Cache hit ratio

**Business :**
- Uptime (%)
- Utilisateurs actifs
- Conversions
- Revenue

### Retention

**Métriques :**
- Haute résolution (1s) : 1 jour
- Moyenne résolution (1m) : 7 jours
- Basse résolution (1h) : 90 jours
- Archives (1d) : 1 an

**Logs :**
- Application : 30 jours
- Accès web : 30 jours
- Sécurité/audit : 1 an
- Erreurs : 90 jours

## Ressources

- [Netdata Documentation](https://learn.netdata.cloud/)
- [Prometheus Documentation](https://prometheus.io/docs/)
- [Grafana Documentation](https://grafana.com/docs/)
- [Uptime Kuma GitHub](https://github.com/louislam/uptime-kuma)

## Support

Questions monitoring ? [Discord LKL Cloud](https://discord.gg/UaHNnMarQA)
