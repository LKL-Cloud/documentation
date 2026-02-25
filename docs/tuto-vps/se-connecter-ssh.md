---
title: Se connecter en SSH
sidebar_position: 2
---

Guide complet pour se connecter à votre VPS Linux via SSH depuis Windows, macOS ou Linux.

## Récupérer vos identifiants

### Via email de bienvenue

Lors de la livraison de votre VPS, vous recevez un email contenant :
- **Adresse IP** : `123.456.789.012`
- **Nom d'utilisateur** : `root` ou `admin`
- **Mot de passe** : Mot de passe temporaire

### Via le panel client

1. Connectez-vous à votre espace client
2. **Services** > **Mes services**
3. Cliquez sur votre VPS
4. Consultez les informations de connexion

## Connexion depuis Windows

### Méthode 1 : Windows Terminal (Windows 10/11)

**Installation :**
Windows 10/11 inclut OpenSSH nativement.

**Connexion :**
1. Ouvrez **Windows Terminal** ou **PowerShell**
2. Tapez :
```powershell
ssh root@VOTRE_IP
```
3. Première connexion, acceptez la clé :
```
Are you sure you want to continue connecting (yes/no)? yes
```
4. Entrez votre mot de passe

**Exemple :**
```powershell
PS C:\Users\YourName> ssh root@51.210.123.45
root@51.210.123.45's password: ********
```

### Méthode 2 : PuTTY

**Installation :**
1. Téléchargez [PuTTY](https://www.putty.org/)
2. Installez ou utilisez version portable

**Connexion :**
1. Lancez **PuTTY**
2. **Host Name** : `VOTRE_IP`
3. **Port** : `22` (ou port SSH personnalisé)
4. **Connection type** : SSH
5. Cliquez **Open**
6. Acceptez la clé serveur
7. **login as:** `root`
8. **password:** Entrez mot de passe

**Sauvegarder session :**
1. Entrez IP et port
2. **Saved Sessions** : Nom descriptif (ex: "VPS LKL Cloud")
3. Cliquez **Save**
4. Prochaine fois : Double-clic sur session sauvegardée

### Méthode 3 : Windows Subsystem for Linux (WSL)

Si vous avez WSL installé :

```bash
wsl
ssh root@VOTRE_IP
```

## Connexion depuis macOS

### Terminal natif

macOS inclut SSH par défaut.

**Connexion :**
1. Ouvrez **Terminal** (Applications > Utilitaires > Terminal)
2. Tapez :
```bash
ssh root@VOTRE_IP
```
3. Acceptez la clé
4. Entrez mot de passe

**Exemple complet :**
```bash
MacBook:~ user$ ssh root@51.210.123.45
The authenticity of host '51.210.123.45' can't be established.
ED25519 key fingerprint is SHA256:xxxxx.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added '51.210.123.45' to the list of known hosts.
root@51.210.123.45's password: 
Welcome to Ubuntu 22.04 LTS
root@vps:~#
```

## Connexion depuis Linux

SSH est préinstallé sur toutes les distributions Linux.

**Connexion :**
```bash
ssh root@VOTRE_IP
```

**Spécifier port personnalisé :**
```bash
ssh -p 2222 root@VOTRE_IP
```

**Verbose pour debug :**
```bash
ssh -v root@VOTRE_IP
```

## Authentification par clé SSH (Recommandé)

Plus sécurisé que mot de passe.

### Générer une paire de clés

**Windows (PowerShell) :**
```powershell
ssh-keygen -t ed25519 -C "votre@email.com"
```

**macOS/Linux :**
```bash
ssh-keygen -t ed25519 -C "votre@email.com"
```

**Réponses aux questions :**
```
Enter file in which to save the key: [Appuyez Entrée pour défaut]
Enter passphrase: [Optionnel, mot de passe pour la clé]
Enter same passphrase again: [Confirmez]
```

Génère deux fichiers :
- `id_ed25519` : Clé privée (GARDEZ SECRET)
- `id_ed25519.pub` : Clé publique (à copier sur serveur)

### Copier la clé sur le serveur

**Méthode automatique (macOS/Linux) :**
```bash
ssh-copy-id root@VOTRE_IP
```

**Méthode manuelle (Windows/tous) :**

1. **Affichez votre clé publique :**
```powershell
# Windows
type ~/.ssh/id_ed25519.pub

# macOS/Linux
cat ~/.ssh/id_ed25519.pub
```

2. **Copiez la sortie** (commence par `ssh-ed25519 AAAA...`)

3. **Connectez-vous au VPS** avec mot de passe

4. **Créez le dossier SSH :**
```bash
mkdir -p ~/.ssh
chmod 700 ~/.ssh
```

5. **Ajoutez votre clé :**
```bash
nano ~/.ssh/authorized_keys
# Collez votre clé publique
# Ctrl+X, Y, Entrée pour sauvegarder
```

6. **Définissez permissions :**
```bash
chmod 600 ~/.ssh/authorized_keys
```

7. **Testez connexion sans mot de passe :**
```bash
# Déconnectez-vous
exit

# Reconnectez-vous
ssh root@VOTRE_IP
# Devrait connecter sans demander mot de passe
```

### Désactiver l'authentification par mot de passe

**Une fois clés SSH configurées :**

```bash
sudo nano /etc/ssh/sshd_config
```

**Modifiez :**
```
PasswordAuthentication no
PubkeyAuthentication yes
PermitRootLogin prohibit-password
```

**Redémarrez SSH :**
```bash
sudo systemctl restart sshd
```

:::warning Important
NE désactivez les mots de passe qu'APRÈS avoir vérifié que la connexion par clé fonctionne !
:::

## Configuration SSH personnalisée

### Changer le port SSH

**Plus sécurisé :**

```bash
sudo nano /etc/ssh/sshd_config
```

**Modifiez :**
```
Port 2222  # Au lieu de 22
```

**Ouvrez nouveau port :**
```bash
sudo ufw allow 2222/tcp
sudo systemctl restart sshd
```

**Connexion avec nouveau port :**
```bash
ssh -p 2222 root@VOTRE_IP
```

### Fichier config SSH (Client)

Simplifiez vos connexions.

**Créez/éditez `~/.ssh/config` :**

```
Host vps-lkl
    HostName 51.210.123.45
    User root
    Port 22
    IdentityFile ~/.ssh/id_ed25519
    
Host vps-prod
    HostName 192.168.1.100
    User admin
    Port 2222
    IdentityFile ~/.ssh/id_rsa
```

**Connexion simplifiée :**
```bash
ssh vps-lkl
# Au lieu de: ssh -p 22 -i ~/.ssh/id_ed25519 root@51.210.123.45
```

### Keepalive

Éviter déconnexions automatiques.

**Client-side (`~/.ssh/config`) :**
```
Host *
    ServerAliveInterval 60
    ServerAliveCountMax 3
```

**Server-side (`/etc/ssh/sshd_config`) :**
```
ClientAliveInterval 60
ClientAliveCountMax 3
```

## Gestionnaires SSH graphiques

### Windows

**MobaXterm** (Recommandé)
- Interface complète
- SFTP intégré
- X11 forwarding
- Gratuit (version Home)
- https://mobaxterm.mobatek.net/

**WinSCP + PuTTY**
- WinSCP pour fichiers
- PuTTY pour terminal
- Gratuits

### macOS

**Termius**
- Multi-plateforme
- Synchro cloud
- Interface moderne
- Version gratuite disponible

**iTerm2**
- Terminal avancé
- Gestion profils
- Split panes
- Gratuit

### Linux

**Remmina**
- Multi-protocoles (SSH, RDP, VNC)
- Préinstallé sur beaucoup de distros

**Terminator**
- Terminal avec splits
- Gestion sessions

## Transfert de fichiers via SSH

### SCP (Secure Copy)

**Upload vers serveur :**
```bash
scp fichier.txt root@VOTRE_IP:/chemin/destination/
```

**Download depuis serveur :**
```bash
scp root@VOTRE_IP:/chemin/fichier.txt ./local/
```

**Dossier complet (récursif) :**
```bash
scp -r dossier/ root@VOTRE_IP:/destination/
```

### SFTP

**Mode interactif :**
```bash
sftp root@VOTRE_IP
```

**Commandes SFTP :**
```
put fichier.txt          # Upload
get fichier.txt          # Download
ls                       # Lister distant
lls                      # Lister local
cd /chemin              # Changer dir distant
lcd /chemin             # Changer dir local
mkdir dossier           # Créer dossier distant
rm fichier              # Supprimer distant
bye                     # Quitter
```

### rsync

Plus efficace pour synchronisations :

```bash
# Sync local → distant
rsync -avz local/ root@VOTRE_IP:/distant/

# Sync distant → local
rsync -avz root@VOTRE_IP:/distant/ ./local/

# Dry-run (test sans modifier)
rsync -avzn local/ root@VOTRE_IP:/distant/
```

## Dépannage

### "Connection refused"

**Causes possibles :**

1. **Service SSH arrêté**
```bash
# Sur le serveur
sudo systemctl status sshd
sudo systemctl start sshd
```

2. **Mauvais port**
```bash
# Vérifier port d'écoute
sudo ss -tulpn | grep sshd
```

3. **Firewall bloque**
```bash
sudo ufw allow 22/tcp
```

4. **IP incorrecte**
Vérifiez l'IP dans votre panel.

### "Permission denied (publickey)"

**Solutions :**

1. **Clé SSH non configurée correctement**
```bash
# Vérifier authorized_keys
cat ~/.ssh/authorized_keys
```

2. **Mauvaises permissions**
```bash
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

3. **Utiliser mot de passe temporairement**
```bash
ssh -o PreferredAuthentications=password root@VOTRE_IP
```

### "Host key verification failed"

Clé serveur a changé (réinstallation).

**Solution :**
```bash
ssh-keygen -R VOTRE_IP
# Puis reconnectez-vous
```

### "Connection timeout"

**Causes :**

1. **IP inaccessible**
```bash
ping VOTRE_IP
```

2. **Firewall côté client**
Désactivez temporairement pour tester.

3. **Port bloqué par ISP**
Essayez port alternatif (2222, 2200, etc.)

### "Too many authentication failures"

Trop de clés testées.

**Solution :**
```bash
ssh -o IdentitiesOnly=yes -i ~/.ssh/cle_specifique root@VOTRE_IP
```

## Sécurité SSH

### Fail2Ban

Protection contre brute-force.

```bash
sudo apt install fail2ban
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

**Configuration :**
```bash
sudo nano /etc/fail2ban/jail.local
```

```ini
[sshd]
enabled = true
port = ssh
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
bantime = 3600
findtime = 600
```

### Deux-facteurs (2FA)

Ajouter couche sécurité supplémentaire.

```bash
sudo apt install libpam-google-authenticator
google-authenticator
```

Suivez instructions, scannez QR code avec app mobile.

**Activez dans SSH :**
```bash
sudo nano /etc/pam.d/sshd
```

Ajoutez :
```
auth required pam_google_authenticator.so
```

```bash
sudo nano /etc/ssh/sshd_config
```

```
ChallengeResponseAuthentication yes
```

```bash
sudo systemctl restart sshd
```

### Limiter utilisateurs

```bash
sudo nano /etc/ssh/sshd_config
```

```
AllowUsers user1 user2
# Ou
DenyUsers baduser
```

## Bonnes pratiques

✅ **À faire :**
- Utilisez clés SSH au lieu de mots de passe
- Changez port SSH par défaut
- Désactivez connexion root (créez utilisateur non-root)
- Installez Fail2Ban
- Mettez à jour régulièrement
- Surveillez logs (`/var/log/auth.log`)

❌ **À éviter :**
- Mots de passe faibles
- Connexion root avec mot de passe
- Port 22 avec mot de passe seulement
- Négliger updates de sécurité
- Partager clés privées

## Ressources

- [OpenSSH Documentation](https://www.openssh.com/manual.html)
- [SSH Academy](https://www.ssh.com/academy/ssh)
- [PuTTY Documentation](https://www.chiark.greenend.org.uk/~sgtatham/putty/docs.html)

## Support

Problème de connexion SSH ? [Discord LKL Cloud](https://discord.gg/UaHNnMarQA)
