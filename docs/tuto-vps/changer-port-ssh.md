---
title: Changer le port SSH
---

Guide pour modifier le port SSH par défaut et améliorer la sécurité de votre VPS.

## Pourquoi changer le port SSH ?

Le port **22** est le port SSH par défaut, ce qui en fait une cible privilégiée des attaques automatisées.

**Avantages :**
- ✅ Réduction drastique des tentatives de connexion malveillantes
- ✅ Logs moins pollués
- ✅ Moins de charge CPU (moins de tentatives à traiter)
- ✅ Couche de sécurité supplémentaire

**Inconvénients :**
- ⚠️ Vous devrez spécifier le port lors des connexions
- ⚠️ Risque de vous bloquer si mal configuré

## Choix du nouveau port

### Ports recommandés

**Évitez :**
- Ports < 1024 (nécessitent root)
- Ports utilisés par autres services (80, 443, 3306, etc.)
- Ports dans liste IANA

**Recommandés :**
- **2222** : Facile à retenir
- **2200** : Alternative commune
- **49152-65535** : Range ports dynamiques

### Vérifier disponibilité

```bash
# Vérifier si port déjà utilisé
sudo ss -tulpn | grep :2222

# Si aucun résultat = port disponible
```

## Procédure de changement

### Étape 1 : Backup configuration

**Toujours sauvegarder avant modification :**

```bash
sudo cp /etc/ssh/sshd_config /etc/ssh/sshd_config.backup
```

### Étape 2 : Ouvrir nouveau port dans firewall

**CRITIQUE : Faites ceci AVANT de changer le port SSH**

```bash
# UFW
sudo ufw allow 2222/tcp

# Vérifier
sudo ufw status
```

:::danger Ne pas oublier !
Si vous ne faites pas cette étape, vous serez bloqué après redémarrage SSH.
:::

### Étape 3 : Modifier configuration SSH

```bash
sudo nano /etc/ssh/sshd_config
```

**Trouvez la ligne :**
```
#Port 22
```

**Remplacez par :**
```
Port 2222
```

**Ou ajoutez temporairement les deux ports :**
```
Port 22
Port 2222
```

:::tip Conseil
Gardez les deux ports actifs temporairement pour éviter tout blocage. Vous fermerez le port 22 après avoir vérifié que le nouveau fonctionne.
:::

### Étape 4 : Vérifier syntaxe

```bash
sudo sshd -t
```

Si aucune erreur affichée = configuration valide.

### Étape 5 : Redémarrer SSH

```bash
sudo systemctl restart sshd
```

**Vérifier statut :**
```bash
sudo systemctl status sshd
```

Doit afficher "active (running)".

### Étape 6 : Tester nouvelle connexion

**SANS FERMER votre session actuelle :**

Ouvrez un **nouveau terminal** et testez :

```bash
ssh -p 2222 root@VOTRE_IP
```

Si connexion réussie : ✅ Changement réussi

Si connexion échoue : ❌ Gardez session ouverte et déboguez

### Étape 7 : Fermer ancien port (optionnel)

**Une fois nouveau port validé :**

```bash
sudo nano /etc/ssh/sshd_config
```

**Retirez :**
```
Port 22
```

**Gardez seulement :**
```
Port 2222
```

**Redémarrez :**
```bash
sudo systemctl restart sshd
```

**Fermez port 22 dans firewall :**
```bash
sudo ufw delete allow 22/tcp
```

## Configuration SELinux (CentOS/RHEL)

Si SELinux activé, autorisez le nouveau port :

```bash
# Installer outils SELinux
sudo yum install policycoreutils-python-utils

# Autoriser port
sudo semanage port -a -t ssh_port_t -p tcp 2222

# Vérifier
sudo semanage port -l | grep ssh
```

## Connexion avec nouveau port

### Ligne de commande

```bash
ssh -p 2222 user@IP
```

### PuTTY

1. **Host Name** : VOTRE_IP
2. **Port** : 2222
3. Sauvegardez session

### Fichier config SSH

**Éditez `~/.ssh/config` :**

```
Host mon-vps
    HostName 51.210.123.45
    User root
    Port 2222
    IdentityFile ~/.ssh/id_ed25519
```

**Connexion simplifiée :**
```bash
ssh mon-vps
```

### Scripts et cron

**Adaptez vos scripts :**

```bash
# Ancien
scp fichier.txt root@IP:/chemin/

# Nouveau
scp -P 2222 fichier.txt root@IP:/chemin/
```

**Attention : SCP utilise -P majuscule (SSH utilise -p minuscule)**

## Dépannage

### Impossible de se connecter au nouveau port

**1. Session originale toujours ouverte ?**

Si oui, revenez et corrigez.

**2. Vérifier SSH écoute bien le nouveau port :**

```bash
sudo ss -tulpn | grep sshd
```

Doit afficher :
```
tcp   LISTEN  0  128  *:2222  *:*  users:(("sshd",pid=1234))
```

**3. Firewall bloque-t-il ?**

```bash
sudo ufw status | grep 2222
```

Doit afficher :
```
2222/tcp                   ALLOW       Anywhere
```

**4. Logs SSH :**

```bash
sudo tail -f /var/log/auth.log
# Ou
sudo journalctl -u sshd -f
```

### Bloqué dehors

**Si vous avez fermé session avant de tester :**

**Solutions :**

1. **Console VNC/KVM via panel**
   - Connectez-vous via panel hébergeur
   - Console d'urgence disponible
   - Restaurez configuration

2. **Mode rescue**
   - Démarrez en mode rescue
   - Montez partition
   - Éditez `/mnt/etc/ssh/sshd_config`

3. **Restaurer backup :**
```bash
sudo cp /etc/ssh/sshd_config.backup /etc/ssh/sshd_config
sudo systemctl restart sshd
```

### Port déjà utilisé

```
sshd: error: Bind to port 2222 on 0.0.0.0 failed: Address already in use.
```

**Identifier service utilisant port :**
```bash
sudo lsof -i :2222
```

**Choisir port différent.**

### SELinux bloque

```bash
# Désactiver temporairement (test)
sudo setenforce 0

# Si fonctionne = problème SELinux
# Réactivez et configurez correctement
sudo setenforce 1
sudo semanage port -a -t ssh_port_t -p tcp 2222
```

## Sécurité renforcée

### Multiple changements simultanés

Combinez avec autres mesures :

```bash
sudo nano /etc/ssh/sshd_config
```

**Configuration sécurisée complète :**

```
# Port personnalisé
Port 2222

# Protocole
Protocol 2

# Authentification
PermitRootLogin prohibit-password
PubkeyAuthentication yes
PasswordAuthentication no
PermitEmptyPasswords no

# Limitations
MaxAuthTries 3
MaxSessions 2
ClientAliveInterval 300
ClientAliveCountMax 2

# Désactiver fonctions dangereuses
X11Forwarding no
AllowTcpForwarding no
PermitTunnel no

# Utilisateurs autorisés
AllowUsers votre_user

# Banner
Banner /etc/ssh/banner
```

### Fail2Ban sur nouveau port

**Adapter configuration :**

```bash
sudo nano /etc/fail2ban/jail.local
```

```ini
[sshd]
enabled = true
port = 2222
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
bantime = 3600
findtime = 600
```

**Redémarrer :**
```bash
sudo systemctl restart fail2ban
```

### Port Knocking (avancé)

Masquer complètement SSH :

```bash
sudo apt install knockd
```

**Configuration :**
```bash
sudo nano /etc/knockd.conf
```

```
[openSSH]
    sequence    = 7000,8000,9000
    seq_timeout = 5
    command     = /sbin/iptables -A INPUT -s %IP% -p tcp --dport 2222 -j ACCEPT
    
[closeSSH]
    sequence    = 9000,8000,7000
    seq_timeout = 5
    command     = /sbin/iptables -D INPUT -s %IP% -p tcp --dport 2222 -j ACCEPT
```

**Usage :**
```bash
knock IP 7000 8000 9000
ssh -p 2222 user@IP
knock IP 9000 8000 7000
```

## Migration d'infrastructure

### Documentation équipe

**Informez votre équipe :**

```markdown
# NOUVEAU PORT SSH : 2222

**Depuis :** 09/01/2024

**Connexion :**
```bash
ssh -p 2222 user@51.210.123.45
```

**Scripts à mettre à jour :**
- backup.sh
- deploy.sh
- monitoring.sh
```

### Automatisation déploiement

**Ansible playbook :**

```yaml
- name: Change SSH Port
  hosts: all
  become: yes
  tasks:
    - name: Open new port in UFW
      ufw:
        rule: allow
        port: 2222
        proto: tcp
        
    - name: Update sshd_config
      lineinfile:
        path: /etc/ssh/sshd_config
        regexp: '^Port '
        line: 'Port 2222'
        
    - name: Restart SSH
      systemd:
        name: sshd
        state: restarted
```

### Terraform

```hcl
resource "null_resource" "change_ssh_port" {
  provisioner "remote-exec" {
    inline = [
      "sudo ufw allow 2222/tcp",
      "sudo sed -i 's/^#Port 22/Port 2222/' /etc/ssh/sshd_config",
      "sudo systemctl restart sshd"
    ]
  }
}
```

## Monitoring

### Surveiller tentatives connexion

```bash
# Connexions réussies
sudo grep "Accepted" /var/log/auth.log | grep "port 2222"

# Tentatives échouées
sudo grep "Failed" /var/log/auth.log | grep "port 2222"

# Statistiques
sudo grep "port 2222" /var/log/auth.log | wc -l
```

### Script alerte

```bash
#!/bin/bash
# check-ssh-attempts.sh

FAILED=$(grep "Failed password" /var/log/auth.log | grep "port 2222" | wc -l)

if [ $FAILED -gt 10 ]; then
    echo "⚠️ $FAILED tentatives SSH échouées détectées"
    # Envoyer notification Discord/Email
fi
```

### Logs temps réel

```bash
sudo tail -f /var/log/auth.log | grep --line-buffered "port 2222"
```

## Best practices

### Checklist avant changement

- [ ] Backup configuration actuelle
- [ ] Ouvrir nouveau port dans firewall
- [ ] Modifier sshd_config
- [ ] Tester syntaxe (`sshd -t`)
- [ ] Redémarrer SSH
- [ ] Tester connexion nouveau port SANS fermer session actuelle
- [ ] Valider fonctionnement
- [ ] Documenter changement
- [ ] Informer équipe
- [ ] Mettre à jour scripts

### Après changement

- [ ] Vérifier logs régulièrement
- [ ] Adapter Fail2Ban
- [ ] Mettre à jour monitoring
- [ ] Tester backups
- [ ] Documenter procédure rollback

## Rollback

Si problème, revenir à port 22 :

```bash
# Via console VNC/KVM du panel
sudo nano /etc/ssh/sshd_config

# Remettre Port 22
Port 22

# Sauvegarder et redémarrer
sudo systemctl restart sshd

# Ouvrir port 22
sudo ufw allow 22/tcp
```

## Statistiques impact

**Avant changement (port 22) :**
```
- 5000+ tentatives connexion/jour
- Logs pollués
- CPU gaspillé
```

**Après changement (port 2222) :**
```
- <10 tentatives/jour
- Logs propres
- Ressources économisées
```

## Ressources

- [OpenSSH sshd_config Manual](https://man.openbsd.org/sshd_config)
- [SSH Security Best Practices](https://www.ssh.com/academy/ssh/sshd_config)
- [UFW Guide](https://help.ubuntu.com/community/UFW)

## Support

Problème lors du changement de port ? [Discord LKL Cloud](https://discord.gg/UaHNnMarQA)
