---
title: Intégrer MySQL avec FiveM
sidebar_position: 3
---

Configuration complète de MySQL pour votre serveur FiveM et intégration avec oxmysql.

## Pourquoi utiliser MySQL ?

MySQL est indispensable pour la persistance des données sur les serveurs FiveM modernes.

**Utilisations :**
- Inventaires joueurs
- Économie et comptes bancaires
- Véhicules possédés
- Propriétés et maisons
- Statistiques et progression
- Données de framework (ESX, QBCore)

## Prérequis

### Créer une base de données

Via le panel Plesk ou phpMyAdmin :

1. Connectez-vous à votre panel
2. **Bases de données** > **Ajouter une base de données**
3. Nom : `fivem_server`
4. Utilisateur : `fivem_user`
5. Mot de passe : [générez un mot de passe fort]
6. Permissions : Toutes sur cette base

### Informations de connexion

Notez ces informations :
```
Host: localhost (ou IP si distant)
Port: 3306
Database: fivem_server
Username: fivem_user
Password: votre_mot_de_passe
```

## Installation oxmysql

oxmysql est le connecteur MySQL moderne pour FiveM, remplaçant mysql-async.

### Téléchargement

**Via GitHub (Recommandé) :**

1. Téléchargez depuis https://github.com/overextended/oxmysql/releases
2. Extrayez dans `resources/[standalone]/oxmysql/`
3. Ajoutez dans `server.cfg` :
```lua
ensure oxmysql
```

**Via txAdmin :**

Si vous utilisez txAdmin, oxmysql est souvent pré-installé.

### Configuration

Dans `server.cfg`, **AVANT** toute ressource utilisant MySQL :

```lua
# MySQL Configuration
set mysql_connection_string "mysql://fivem_user:password@localhost/fivem_server?charset=utf8mb4"

# Alternative avec paramètres séparés
# set mysql_connection_string "user=fivem_user;password=password;host=localhost;port=3306;database=fivem_server"

# Ensure oxmysql AVANT les autres ressources
ensure oxmysql

# Debug (désactivez en production)
set mysql_debug 0
set mysql_slow_query_warning 150

# Puis vos frameworks
ensure es_extended
ensure qb-core
```

### Format de connexion

**Format URI (Recommandé) :**
```lua
mysql://utilisateur:motdepasse@host:port/database?charset=utf8mb4
```

**Exemples :**
```lua
# Serveur local
set mysql_connection_string "mysql://fivem:Pass123!@localhost/fivem_db?charset=utf8mb4"

# Serveur distant
set mysql_connection_string "mysql://user:pass@192.168.1.100:3306/fivem?charset=utf8mb4"

# Avec options SSL
set mysql_connection_string "mysql://user:pass@host/db?ssl=true&charset=utf8mb4"
```

**Format paramètres :**
```lua
set mysql_connection_string "user=fivem;password=Pass123;host=localhost;port=3306;database=fivem_db"
```

## Import base de données

### Import via phpMyAdmin

1. Connectez-vous à **phpMyAdmin**
2. Sélectionnez votre base `fivem_server`
3. Onglet **Importer**
4. Choisissez le fichier `.sql` (fourni par ESX/QBCore)
5. Format : SQL
6. Cliquez **Exécuter**

### Import via ligne de commande

```bash
mysql -u fivem_user -p fivem_server < framework.sql
```

Entrez le mot de passe quand demandé.

### Import manuel des tables

Si vous avez des fichiers SQL séparés :

```bash
cd /votre/serveur/resources/es_extended/
mysql -u fivem_user -p fivem_server < sql/legacy.sql
```

## Frameworks avec MySQL

### ESX Legacy

**Installation base de données :**

```bash
# Tables ESX
mysql -u fivem_user -p fivem_server < resources/[esx]/es_extended/sql/legacy.sql

# Jobs
mysql -u fivem_user -p fivem_server < resources/[esx]/esx_society/sql/society.sql

# Autres resources
mysql -u fivem_user -p fivem_server < resources/[esx]/esx_property/sql/property.sql
```

**Configuration ESX :**

Dans `resources/[esx]/es_extended/config.lua` :
```lua
Config.EnableDefaultInventory = true
Config.MaxWeight = 24
Config.PaycheckInterval = 7 * 60000 -- 7 minutes

Config.Accounts = {
    bank = _U('account_bank'),
    black_money = _U('account_black_money'),
    money = _U('account_money')
}
```

**Server.cfg :**
```lua
ensure oxmysql
ensure es_extended
ensure esx_menu_default
ensure esx_menu_dialog
ensure esx_menu_list
```

### QBCore Framework

**Installation :**

1. Import de `qbcore.sql` :
```bash
mysql -u fivem_user -p fivem_server < qbcore.sql
```

2. Configuration `qb-core/config.lua` :
```lua
QBConfig = {}
QBConfig.MaxPlayers = 32
QBConfig.DefaultSpawn = vector4(-1035.71, -2731.87, 12.86, 0.0)
QBConfig.UpdateInterval = 5
```

3. Server.cfg :
```lua
ensure oxmysql
ensure qb-core
ensure qb-multicharacter
ensure qb-spawn
ensure qb-apartments
ensure qb-garages
```

## Utilisation dans vos scripts

### Queries basiques (oxmysql)

**SELECT - Récupérer des données :**

```lua
-- Single row
MySQL.Async.fetchScalar('SELECT money FROM users WHERE identifier = ?', {identifier}, function(money)
    print('Argent: ' .. money)
end)

-- Single row avec plusieurs colonnes
MySQL.Async.fetchAll('SELECT * FROM users WHERE identifier = ?', {identifier}, function(result)
    if result[1] then
        print('Nom: ' .. result[1].firstname)
        print('Argent: ' .. result[1].money)
    end
end)

-- Multiple rows
MySQL.Async.fetchAll('SELECT * FROM vehicles WHERE owner = ?', {owner}, function(vehicles)
    for k, v in pairs(vehicles) do
        print('Véhicule: ' .. v.plate)
    end
end)
```

**INSERT - Insérer des données :**

```lua
MySQL.Async.execute('INSERT INTO owned_vehicles (owner, plate, vehicle, stored) VALUES (?, ?, ?, ?)', {
    owner,
    plate,
    json.encode(vehicle),
    1
}, function(rowsChanged)
    print('Véhicule ajouté!')
end)
```

**UPDATE - Mettre à jour :**

```lua
MySQL.Async.execute('UPDATE users SET money = ? WHERE identifier = ?', {
    newMoney,
    identifier
}, function(affectedRows)
    print('Argent mis à jour!')
end)
```

**DELETE - Supprimer :**

```lua
MySQL.Async.execute('DELETE FROM owned_vehicles WHERE plate = ?', {
    plate
}, function(rowsChanged)
    print('Véhicule supprimé!')
end)
```

### Queries modernes (exports)

oxmysql offre aussi une syntaxe moderne :

```lua
-- Async/Await style
local result = MySQL.query.await('SELECT * FROM users WHERE identifier = ?', {identifier})

-- Single value
local money = MySQL.scalar.await('SELECT money FROM users WHERE identifier = ?', {identifier})

-- Insert et récupérer ID
local insertId = MySQL.insert.await('INSERT INTO vehicles (plate, model) VALUES (?, ?)', {plate, model})

-- Update
local affectedRows = MySQL.update.await('UPDATE users SET money = ? WHERE identifier = ?', {money, identifier})

-- Prepare (pour requêtes répétées)
local query = MySQL.prepare.await('SELECT * FROM users WHERE identifier = ?')
local result = query(identifier)
```

### Transactions

Pour garantir l'intégrité des données :

```lua
MySQL.transaction({
    {query = 'UPDATE users SET money = money - ? WHERE identifier = ?', values = {amount, buyer}},
    {query = 'UPDATE users SET money = money + ? WHERE identifier = ?', values = {amount, seller}},
    {query = 'INSERT INTO transactions (buyer, seller, amount) VALUES (?, ?, ?)', values = {buyer, seller, amount}}
}, function(success)
    if success then
        print('Transaction réussie!')
    else
        print('Transaction annulée!')
    end
end)
```

## Optimisation MySQL

### Index sur tables

Les index accélèrent considérablement les requêtes :

```sql
-- Index sur colonnes fréquemment recherchées
CREATE INDEX idx_identifier ON users(identifier);
CREATE INDEX idx_owner ON owned_vehicles(owner);
CREATE INDEX idx_plate ON owned_vehicles(plate);

-- Index composites
CREATE INDEX idx_user_account ON accounts(identifier, name);
```

### Configuration MySQL

Dans `/etc/mysql/my.cnf` ou via phpMyAdmin :

```ini
[mysqld]
# InnoDB optimizations
innodb_buffer_pool_size = 2G
innodb_log_file_size = 512M
innodb_flush_log_at_trx_commit = 2
innodb_flush_method = O_DIRECT

# Query cache
query_cache_type = 1
query_cache_size = 64M
query_cache_limit = 2M

# Connections
max_connections = 200
connect_timeout = 10

# Logs (désactivez en production)
slow_query_log = 1
long_query_time = 2
```

### Connection pooling

oxmysql gère automatiquement le pool de connexions :

```lua
# Dans server.cfg
set mysql_connection_string "mysql://user:pass@host/db?connectionLimit=10"
```

### Requêtes optimisées

**Mauvaise pratique :**
```lua
-- N+1 queries problématiques
for k, v in pairs(players) do
    MySQL.Async.fetchAll('SELECT * FROM inventory WHERE owner = ?', {v.identifier})
end
```

**Bonne pratique :**
```lua
-- Une seule query avec IN
local identifiers = {}
for k, v in pairs(players) do
    table.insert(identifiers, v.identifier)
end

MySQL.Async.fetchAll('SELECT * FROM inventory WHERE owner IN (?)', {table.concat(identifiers, ',')})
```

## Sécurité

### Prepared Statements

**Toujours** utiliser des paramètres (?) :

```lua
-- ✅ BIEN - Protection SQL injection
MySQL.Async.execute('SELECT * FROM users WHERE name = ?', {playerName})

-- ❌ MAL - Vulnérable SQL injection
MySQL.Async.execute('SELECT * FROM users WHERE name = "' .. playerName .. '"')
```

### Permissions utilisateur

Limitez les permissions de l'utilisateur MySQL :

```sql
-- Créer utilisateur avec permissions limitées
CREATE USER 'fivem_limited'@'localhost' IDENTIFIED BY 'password';

-- Accorder uniquement SELECT, INSERT, UPDATE, DELETE
GRANT SELECT, INSERT, UPDATE, DELETE ON fivem_server.* TO 'fivem_limited'@'localhost';

-- Pas de DROP, ALTER, etc.
FLUSH PRIVILEGES;
```

### Mots de passe

**Ne jamais hardcoder dans les scripts :**

```lua
-- ❌ MAL
local password = "MonMotDePasse123"

-- ✅ BIEN - Utiliser convars
local password = GetConvar('mysql_password', '')
```

### Backup réguliers

Automatisez les sauvegardes :

```bash
#!/bin/bash
# backup-mysql.sh

DATE=$(date +%Y%m%d_%H%M%S)
mysqldump -u fivem_user -p'password' fivem_server > /backups/fivem_${DATE}.sql

# Compression
gzip /backups/fivem_${DATE}.sql

# Garder seulement 30 derniers jours
find /backups/ -name "fivem_*.sql.gz" -mtime +30 -delete
```

Cron :
```bash
0 4 * * * /root/backup-mysql.sh
```

## Dépannage

### "Can't connect to MySQL server"

**Vérifications :**

1. MySQL est démarré :
```bash
systemctl status mysql
```

2. Port 3306 ouvert :
```bash
netstat -tulpn | grep 3306
```

3. Utilisateur a les droits :
```sql
SHOW GRANTS FOR 'fivem_user'@'localhost';
```

4. Test connexion :
```bash
mysql -u fivem_user -p -h localhost fivem_server
```

### "Access denied for user"

Mauvais identifiants ou permissions.

**Solution :**
```sql
-- Réinitialiser password
ALTER USER 'fivem_user'@'localhost' IDENTIFIED BY 'nouveau_password';
FLUSH PRIVILEGES;
```

### "Table doesn't exist"

Tables non importées.

**Solution :**
```bash
# Vérifier tables existantes
mysql -u fivem_user -p fivem_server -e "SHOW TABLES;"

# Importer fichier SQL manquant
mysql -u fivem_user -p fivem_server < missing_tables.sql
```

### Queries lentes

Activez le slow query log :

```sql
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 2;
```

Consultez `/var/log/mysql/slow-query.log`

Optimisez avec EXPLAIN :
```sql
EXPLAIN SELECT * FROM users WHERE identifier = 'steam:xxxxx';
```

### "Too many connections"

Augmentez la limite :

```sql
SET GLOBAL max_connections = 200;
```

Ou dans `my.cnf` :
```ini
[mysqld]
max_connections = 200
```

### Connection lost / Timeout

Augmentez timeouts :

```ini
[mysqld]
wait_timeout = 600
interactive_timeout = 600
connect_timeout = 10
```

## Migration de mysql-async vers oxmysql

Si vous migrez depuis mysql-async :

**Changements de syntaxe :**

```lua
-- mysql-async
MySQL.Async.fetchAll('SELECT ...', {}, function(result)
end)

-- oxmysql (compatible)
MySQL.Async.fetchAll('SELECT ...', {}, function(result)
end)

-- oxmysql (moderne)
local result = MySQL.query.await('SELECT ...', {})
```

**Server.cfg :**
```lua
# Remplacez
# ensure mysql-async
# Par
ensure oxmysql
```

**Pas de changement dans vos scripts** - oxmysql est rétro-compatible !

## Monitoring

### Surveiller performance

```sql
-- Connexions actives
SHOW PROCESSLIST;

-- Statistiques
SHOW STATUS LIKE 'Threads_connected';
SHOW STATUS LIKE 'Questions';
SHOW STATUS LIKE 'Slow_queries';

-- Tables les plus utilisées
SELECT * FROM information_schema.tables 
WHERE table_schema = 'fivem_server' 
ORDER BY data_length DESC;
```

### Logs oxmysql

Activez debug temporairement :

```lua
# server.cfg
set mysql_debug 1
set mysql_slow_query_warning 100
```

Consultez les logs dans la console FiveM.

## Ressources

- [oxmysql Documentation](https://overextended.dev/oxmysql)
- [GitHub oxmysql](https://github.com/overextended/oxmysql)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [ESX Documentation](https://documentation.esx-framework.org/)
- [QBCore Docs](https://docs.qbcore.org/)

## Support

Besoin d'aide ? [Discord LKL Cloud](https://discord.gg/UaHNnMarQA)
