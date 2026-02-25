---
title: Héberger un bot Discord sur LKL Cloud
sidebar_position: 8
---

Guide pour héberger votre bot Discord sur un VPS LKL Cloud avec Node.js, Python ou autres langages.

## Prérequis

- VPS Linux (Debian/Ubuntu recommandé)
- Bot Discord créé sur [Discord Developer Portal](https://discord.com/developers/applications)
- Token du bot
- Connaissances de base en ligne de commande

## Créer votre bot Discord

### Via Discord Developer Portal

1. Allez sur https://discord.com/developers/applications
2. Cliquez **New Application**
3. Nommez votre application
4. Menu **Bot** > **Add Bot**
5. Copiez le **Token** (gardez-le secret !)
6. Activez **Privileged Gateway Intents** si nécessaire :
   - Presence Intent
   - Server Members Intent
   - Message Content Intent

### Inviter le bot sur votre serveur

1. Menu **OAuth2** > **URL Generator**
2. Scopes : `bot` et `applications.commands`
3. Permissions : Sélectionnez selon besoins
4. Copiez l'URL générée
5. Ouvrez dans navigateur
6. Sélectionnez serveur et autorisez

## Hébergement bot Node.js (Discord.js)

### Installation Node.js

```bash
# Mise à jour système
sudo apt update && sudo apt upgrade -y

# Installer Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Vérifier installation
node --version
npm --version
```

### Créer le bot

**Structure projet :**

```bash
mkdir discord-bot
cd discord-bot
npm init -y
```

**Installer dépendances :**

```bash
npm install discord.js dotenv
```

**Créer fichier `.env` :**

```env
DISCORD_TOKEN=votre_token_ici
CLIENT_ID=votre_client_id
GUILD_ID=votre_serveur_id
```

**Créer `index.js` :**

```javascript
require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.once('ready', () => {
    console.log(`✅ Bot connecté en tant que ${client.user.tag}`);
});

client.on('messageCreate', message => {
    if (message.content === '!ping') {
        message.reply('🏓 Pong!');
    }
});

client.login(process.env.DISCORD_TOKEN);
```

**Tester localement :**

```bash
node index.js
```

### Déployer sur VPS

**1. Upload via SFTP/SCP :**

```bash
# Depuis votre PC
scp -r discord-bot/ user@IP_VPS:/home/user/
```

**2. Installer PM2 (Process Manager) :**

```bash
sudo npm install -g pm2
```

**3. Démarrer le bot :**

```bash
cd /home/user/discord-bot
pm2 start index.js --name discord-bot
```

**4. Configuration auto-start :**

```bash
pm2 startup
pm2 save
```

**Commandes PM2 utiles :**

```bash
pm2 list              # Lister processus
pm2 logs discord-bot  # Voir logs
pm2 restart discord-bot  # Redémarrer
pm2 stop discord-bot  # Arrêter
pm2 delete discord-bot  # Supprimer
```

## Hébergement bot Python (discord.py)

### Installation Python

```bash
sudo apt update
sudo apt install python3 python3-pip python3-venv -y
```

### Créer le bot

**Structure projet :**

```bash
mkdir discord-bot-py
cd discord-bot-py
python3 -m venv venv
source venv/bin/activate
```

**Installer dépendances :**

```bash
pip install discord.py python-dotenv
```

**Créer `.env` :**

```env
DISCORD_TOKEN=votre_token
```

**Créer `bot.py` :**

```python
import os
import discord
from discord.ext import commands
from dotenv import load_dotenv

load_dotenv()
TOKEN = os.getenv('DISCORD_TOKEN')

intents = discord.Intents.default()
intents.message_content = True

bot = commands.Bot(command_prefix='!', intents=intents)

@bot.event
async def on_ready():
    print(f'✅ {bot.user} est connecté!')

@bot.command()
async def ping(ctx):
    await ctx.send('🏓 Pong!')

bot.run(TOKEN)
```

### Déployer avec systemd

**Créer service systemd :**

```bash
sudo nano /etc/systemd/system/discord-bot.service
```

**Contenu :**

```ini
[Unit]
Description=Discord Bot Python
After=network.target

[Service]
Type=simple
User=votre_user
WorkingDirectory=/home/votre_user/discord-bot-py
Environment="PATH=/home/votre_user/discord-bot-py/venv/bin"
ExecStart=/home/votre_user/discord-bot-py/venv/bin/python bot.py
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

**Activer et démarrer :**

```bash
sudo systemctl daemon-reload
sudo systemctl enable discord-bot
sudo systemctl start discord-bot

# Vérifier statut
sudo systemctl status discord-bot

# Voir logs
sudo journalctl -u discord-bot -f
```

## Commandes Slash (Interactions)

### Discord.js exemple

**deploy-commands.js :**

```javascript
const { REST, Routes } = require('discord.js');
require('dotenv').config();

const commands = [
    {
        name: 'ping',
        description: 'Répond avec Pong!',
    },
    {
        name: 'serveur',
        description: 'Informations sur le serveur',
    },
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log('Enregistrement des commandes...');
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands },
        );
        console.log('✅ Commandes enregistrées!');
    } catch (error) {
        console.error(error);
    }
})();
```

**Exécuter :**

```bash
node deploy-commands.js
```

**Handler dans index.js :**

```javascript
client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ping') {
        await interaction.reply('🏓 Pong!');
    }

    if (interaction.commandName === 'serveur') {
        await interaction.reply(`Serveur: ${interaction.guild.name}\nMembres: ${interaction.guild.memberCount}`);
    }
});
```

## Bot avec base de données

### SQLite (Simple)

**Node.js avec better-sqlite3 :**

```bash
npm install better-sqlite3
```

```javascript
const Database = require('better-sqlite3');
const db = new Database('bot.db');

// Créer table
db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        points INTEGER DEFAULT 0
    )
`);

// Ajouter points
function addPoints(userId, points) {
    const stmt = db.prepare('INSERT OR REPLACE INTO users (id, points) VALUES (?, ?)');
    stmt.run(userId, points);
}
```

### MySQL (Production)

```bash
npm install mysql2
```

```javascript
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'bot_user',
    password: 'password',
    database: 'discord_bot',
    waitForConnections: true,
    connectionLimit: 10,
});

// Utilisation
async function getUser(userId) {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);
    return rows[0];
}
```

## Sécurité

### Variables d'environnement

**Ne jamais hardcoder le token !**

```javascript
// ❌ MAUVAIS
const token = 'MTIzNDU2Nzg5MDEyMzQ1Njc4.XXXXXX.YYYYYY';

// ✅ BON
require('dotenv').config();
const token = process.env.DISCORD_TOKEN;
```

### Gitignore

**Créer `.gitignore` :**

```
node_modules/
.env
*.log
config.json
bot.db
```

### Permissions minimales

N'accordez que les permissions nécessaires au bot :

```javascript
// Intents minimaux
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        // N'ajoutez que ce dont vous avez besoin
    ],
});
```

## Monitoring et logs

### Winston (Logging)

```bash
npm install winston
```

```javascript
const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
    ],
});

logger.info('Bot démarré');
logger.error('Erreur:', error);
```

### Status monitoring

```javascript
client.once('ready', () => {
    client.user.setActivity('Surveiller le serveur', { type: 'WATCHING' });
    
    // Update régulier
    setInterval(() => {
        const serverCount = client.guilds.cache.size;
        client.user.setActivity(`${serverCount} serveurs`, { type: 'WATCHING' });
    }, 60000);
});
```

## Optimisation performances

### Partitioning (Sharding)

Pour bots sur 2500+ serveurs :

```javascript
const { ShardingManager } = require('discord.js');

const manager = new ShardingManager('./bot.js', { 
    token: process.env.DISCORD_TOKEN,
    totalShards: 'auto'
});

manager.on('shardCreate', shard => {
    console.log(`Shard ${shard.id} lancé`);
});

manager.spawn();
```

### Cache optimization

```javascript
const client = new Client({
    intents: [...],
    makeCache: Options.cacheWithLimits({
        MessageManager: 200, // Limite messages en cache
        UserManager: 100,
    }),
});
```

## Mise à jour automatique

### Script update

**update.sh :**

```bash
#!/bin/bash

cd /home/user/discord-bot

echo "🔄 Mise à jour du bot..."

# Pull changements
git pull origin main

# Installer dépendances
npm install

# Redémarrer
pm2 restart discord-bot

echo "✅ Bot mis à jour!"
```

### GitHub Webhooks

Configurez webhook pour deploy automatique :

```javascript
// webhook-server.js
const express = require('express');
const { exec } = require('child_process');
const app = express();

app.post('/webhook', (req, res) => {
    exec('bash /home/user/update.sh', (error, stdout) => {
        console.log(stdout);
    });
    res.sendStatus(200);
});

app.listen(3000);
```

## Dépannage

### Bot offline

**Vérifications :**

```bash
# PM2
pm2 logs discord-bot

# Systemd
sudo systemctl status discord-bot
sudo journalctl -u discord-bot -n 50
```

### Token invalide

```
Error: An invalid token was provided
```

**Solution :**
- Régénérez token sur Developer Portal
- Mettez à jour `.env`
- Redémarrez bot

### Missing permissions

```
DiscordAPIError: Missing Permissions
```

**Solution :**
- Vérifiez permissions bot sur serveur
- Vérifiez rôle bot hiérarchie
- Ajustez permissions nécessaires

### Rate limiting

```
DiscordAPIError: You are being rate limited
```

**Solution :**
- Réduisez fréquence requêtes API
- Implémentez délais entre actions
- Utilisez batch requests

## Exemples de bots

### Bot modération

```javascript
client.on('messageCreate', message => {
    if (message.author.bot) return;
    
    // Anti-spam
    const filter = ['spam', 'mot_interdit'];
    const content = message.content.toLowerCase();
    
    if (filter.some(word => content.includes(word))) {
        message.delete();
        message.channel.send(`${message.author}, message supprimé!`);
    }
});
```

### Bot musique (simple)

```bash
npm install @discordjs/voice @discordjs/opus
```

```javascript
const { joinVoiceChannel, createAudioPlayer } = require('@discordjs/voice');

client.on('interactionCreate', async interaction => {
    if (interaction.commandName === 'play') {
        const channel = interaction.member.voice.channel;
        if (!channel) {
            return interaction.reply('Rejoignez un salon vocal!');
        }
        
        const connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: interaction.guildId,
            adapterCreator: interaction.guild.voiceAdapterCreator,
        });
        
        // Jouer audio...
    }
});
```

### Bot statistiques

```javascript
client.on('ready', () => {
    const stats = {
        servers: client.guilds.cache.size,
        users: client.users.cache.size,
        channels: client.channels.cache.size,
    };
    
    console.log(`📊 Stats: ${JSON.stringify(stats, null, 2)}`);
});
```

## Ressources

- [Discord.js Guide](https://discordjs.guide/)
- [discord.py Documentation](https://discordpy.readthedocs.io/)
- [Discord Developer Portal](https://discord.com/developers/docs)
- [Discord.js Documentation](https://discord.js.org/)

## Support

Questions sur hébergement bot ? [Discord LKL Cloud](https://discord.gg/UaHNnMarQA)
