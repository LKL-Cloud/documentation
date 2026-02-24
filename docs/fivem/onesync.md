---
title: Importer et compresser un fichier SQL
---

Guide pour gérer efficacement vos bases de données FiveM, incluant l'import et la compression de fichiers SQL volumineux.

## Import de fichiers SQL

### Via phpMyAdmin

**Pour fichiers < 50MB :**

1. Connectez-vous à **phpMyAdmin**
2. Sélectionnez votre base de données
3. Onglet **Importer**
4. Cliquez **Choisir un fichier**
5. Sélectionnez votre `.sql`
6. Format : **SQL**
7. Options :
   - ☑ Permettre l'interruption
   - ☑ Activer la vérification des clés étrangères
8. Cliquez **Exécuter**

:::tip Temps d'import
Un fichier de 10MB prend environ 30 secondes. Soyez patient !
:::

**Pour fichiers > 50MB :**

La limite d'upload PHP peut bloquer. Utilisez la ligne de commande.

### Via ligne de commande SSH

**Import basique :**

```bash
mysql -u utilisateur -p nom_base < fichier.sql
```

Exemple :
```bash
mysql -u fivem_user -p'MonMotDePasse123' fivem_server < esx_full.sql
```

**Import avec progression :**

```bash
pv fichier.sql | mysql -u fivem_user -p nom_base
```

Installez `pv` si nécessaire :
```bash
apt install pv
```

**Import de fichiers volumineux :**

Pour fichiers > 1GB, utilisez des options optimisées :

```bash
mysql -u fivem_user -p nom_base \
  --max_allowed_packet=512M \
  --net_buffer_length=16384 \
  < huge_database.sql
```

### Import de fichiers multiples

Si votre framework a plusieurs fichiers SQL :

```bash
# ESX
cd resources/[esx]/es_extended/sql/
for f in *.sql; do
    mysql -u fivem_user -p fivem_server < "$f"
    echo "Imported: $f"
done
```

**Ou avec un script :**

```bash
#!/bin/bash
# import-all.sh

DB_USER="fivem_user"
DB_PASS="password"
DB_NAME="fivem_server"
SQL_DIR="./sql"

for file in $SQL_DIR/*.sql; do
    echo "Importing $file..."
    mysql -u $DB_USER -p$DB_PASS $DB_NAME < "$file"
    if [ $? -eq 0 ]; then
        echo "✓ Success: $file"
    else
        echo "✗ Error: $file"
    fi
done

echo "All imports completed!"
```

Utilisation :
```bash
chmod +x import-all.sh
./import-all.sh
```

## Compression de fichiers SQL

### Pourquoi compresser ?

**Avantages :**
- Réduction de 80-90% de la taille
- Transferts plus rapides
- Économie d'espace de stockage
- Backups plus légers

**Exemple :**
```
database.sql        : 500 MB
database.sql.gz     : 50 MB  (90% de réduction)
database.sql.bz2    : 40 MB  (92% de réduction)
```

### Compression avec Gzip

**Compresser :**

```bash
gzip fichier.sql
# Crée fichier.sql.gz et supprime l'original
```

**Compresser en gardant l'original :**

```bash
gzip -c fichier.sql > fichier.sql.gz
```

**Niveau de compression :**

```bash
gzip -9 fichier.sql  # Maximum (plus lent)
gzip -1 fichier.sql  # Rapide (moins de compression)
```

**Décompresser :**

```bash
gunzip fichier.sql.gz
# Ou
gzip -d fichier.sql.gz
```

### Compression avec Bzip2

Meilleure compression mais plus lent :

```bash
# Compresser
bzip2 fichier.sql

# Décompresser
bunzip2 fichier.sql.bz2
```

### Import direct de fichiers compressés

**Gzip :**

```bash
zcat fichier.sql.gz | mysql -u user -p database
```

Ou :
```bash
gunzip < fichier.sql.gz | mysql -u user -p database
```

**Bzip2 :**

```bash
bzcat fichier.sql.bz2 | mysql -u user -p database
```

**Avec progression :**

```bash
pv fichier.sql.gz | gunzip | mysql -u user -p database
```

## Export et compression combinés

### Export vers fichier compressé

**Export standard :**

```bash
mysqldump -u user -p database > backup.sql
```

**Export + compression Gzip :**

```bash
mysqldump -u user -p database | gzip > backup.sql.gz
```

**Export + compression Bzip2 :**

```bash
mysqldump -u user -p database | bzip2 > backup.sql.bz2
```

**Export avec options optimisées :**

```bash
mysqldump -u fivem_user -p fivem_server \
  --single-transaction \
  --quick \
  --lock-tables=false \
  --routines \
  --triggers \
  --events \
  | gzip > backup_$(date +%Y%m%d).sql.gz
```

### Export de tables spécifiques

```bash
# Une seule table
mysqldump -u user -p database table_name | gzip > table.sql.gz

# Plusieurs tables
mysqldump -u user -p database table1 table2 table3 | gzip > tables.sql.gz

# Exclure certaines tables
mysqldump -u user -p database \
  --ignore-table=database.logs \
  --ignore-table=database.cache \
  | gzip > backup_no_logs.sql.gz
```

## Augmenter les limites PHP

Si vous devez utiliser phpMyAdmin pour de gros fichiers :

### Via php.ini

```ini
upload_max_filesize = 500M
post_max_size = 500M
max_execution_time = 600
max_input_time = 600
memory_limit = 512M
```

Redémarrez PHP-FPM :
```bash
systemctl restart php8.1-fpm
```

### Via .htaccess

Pour un dossier spécifique :

```apache
php_value upload_max_filesize 500M
php_value post_max_size 500M
php_value max_execution_time 600
php_value max_input_time 600
php_value memory_limit 512M
```

### Via Plesk

1. **Domaines** > Votre domaine
2. **Paramètres PHP**
3. Modifiez les valeurs
4. **OK**

## Splitting de gros fichiers SQL

Si votre fichier est vraiment énorme (> 2GB) :

### Split en plusieurs fichiers

```bash
# Découper en fichiers de 100MB
split -b 100M huge.sql huge_part_

# Résultat :
# huge_part_aa
# huge_part_ab
# huge_part_ac
```

### Import des parties

```bash
cat huge_part_* | mysql -u user -p database
```

### Split "intelligent" (par requête)

Pour éviter de couper au milieu d'une requête :

```bash
# Utiliser mysqldump avec --extended-insert=FALSE
mysqldump -u user -p database --extended-insert=FALSE > dump.sql

# Puis split par lignes
split -l 100000 dump.sql part_
```

## Optimisation de l'import

### Désactiver les checks temporairement

Créez un fichier `optimized_import.sql` :

```sql
SET FOREIGN_KEY_CHECKS=0;
SET UNIQUE_CHECKS=0;
SET AUTOCOMMIT=0;

SOURCE /path/to/your/database.sql;

COMMIT;
SET FOREIGN_KEY_CHECKS=1;
SET UNIQUE_CHECKS=1;
SET AUTOCOMMIT=1;
```

Import :
```bash
mysql -u user -p database < optimized_import.sql
```

### Configuration MySQL pour import

Dans `/etc/mysql/my.cnf` :

```ini
[mysqld]
max_allowed_packet=512M
innodb_buffer_pool_size=2G
innodb_log_file_size=512M
innodb_flush_log_at_trx_commit=2
bulk_insert_buffer_size=256M
```

Redémarrez MySQL :
```bash
systemctl restart mysql
```

### Import parallèle

Pour bases avec tables indépendantes :

```bash
# Export chaque table séparément
for table in $(mysql -u user -p database -e "SHOW TABLES;" | tail -n +2); do
    mysqldump -u user -p database $table | gzip > ${table}.sql.gz &
done
wait

# Import parallèle
for file in *.sql.gz; do
    zcat $file | mysql -u user -p database &
done
wait
```

## Automatisation des backups

### Script de backup automatique

```bash
#!/bin/bash
# auto-backup.sh

# Configuration
DB_USER="fivem_user"
DB_PASS="password"
DB_NAME="fivem_server"
BACKUP_DIR="/backups/mysql"
DATE=$(date +%Y%m%d_%H%M%S)
RETENTION_DAYS=30

# Créer dossier si n'existe pas
mkdir -p $BACKUP_DIR

# Backup avec compression
mysqldump -u $DB_USER -p$DB_PASS $DB_NAME \
  --single-transaction \
  --quick \
  --lock-tables=false \
  | gzip > $BACKUP_DIR/backup_${DATE}.sql.gz

# Vérifier succès
if [ $? -eq 0 ]; then
    echo "✓ Backup successful: backup_${DATE}.sql.gz"
    
    # Taille du backup
    SIZE=$(du -h $BACKUP_DIR/backup_${DATE}.sql.gz | cut -f1)
    echo "Size: $SIZE"
    
    # Nettoyer anciens backups
    find $BACKUP_DIR -name "backup_*.sql.gz" -mtime +$RETENTION_DAYS -delete
    echo "✓ Old backups cleaned (>$RETENTION_DAYS days)"
else
    echo "✗ Backup failed!"
    exit 1
fi
```

### Planifier avec Cron

```bash
# Éditer crontab
crontab -e

# Backup quotidien à 3h du matin
0 3 * * * /root/auto-backup.sh >> /var/log/mysql-backup.log 2>&1

# Backup toutes les 6 heures
0 */6 * * * /root/auto-backup.sh >> /var/log/mysql-backup.log 2>&1
```

### Backup distant (FTP/SFTP)

```bash
#!/bin/bash
# backup-remote.sh

# Backup local
mysqldump -u user -p database | gzip > /tmp/backup.sql.gz

# Upload SFTP
sftppass -p password sftp user@remote_host <<EOF
put /tmp/backup.sql.gz /backups/backup_$(date +%Y%m%d).sql.gz
bye
EOF

# Nettoyage
rm /tmp/backup.sql.gz
```

## Vérification d'intégrité

### Vérifier un fichier SQL

```bash
# Tester la syntaxe
mysql -u user -p --force < fichier.sql 2>&1 | grep -i error

# Compter les erreurs
mysql -u user -p --force < fichier.sql 2>&1 | grep -c "ERROR"
```

### Vérifier une base après import

```sql
-- Tables manquantes
SHOW TABLES;

-- Nombre de lignes par table
SELECT table_name, table_rows 
FROM information_schema.tables 
WHERE table_schema = 'fivem_server';

-- Vérifier intégrité
CHECK TABLE nom_table;

-- Réparer si nécessaire
REPAIR TABLE nom_table;
```

### Comparer deux bases

```bash
# Export structure seule
mysqldump -u user -p --no-data db1 > db1_structure.sql
mysqldump -u user -p --no-data db2 > db2_structure.sql

# Comparer
diff db1_structure.sql db2_structure.sql
```

## Dépannage

### "MySQL server has gone away"

Import trop long, connexion perdue.

**Solutions :**
```sql
SET GLOBAL max_allowed_packet=512M;
SET GLOBAL wait_timeout=600;
SET GLOBAL interactive_timeout=600;
```

### "Out of memory"

**Solutions :**
```bash
# Augmenter limite PHP
php -d memory_limit=2G script.php

# Ou configurer MySQL
innodb_buffer_pool_size=4G
```

### Import très lent

**Optimisations :**
1. Désactivez FOREIGN_KEY_CHECKS
2. Utilisez --quick avec mysqldump
3. Importez en dehors des heures de pointe
4. Augmentez innodb_buffer_pool_size

### Fichier corrompu

```bash
# Tester intégrité archive gzip
gzip -t fichier.sql.gz

# Si corrompu, essayer récupération
gzrecover fichier.sql.gz
```

### Encodage incorrect

Si caractères bizarres après import :

```sql
-- Vérifier encodage
SHOW VARIABLES LIKE 'character_set%';

-- Convertir table
ALTER TABLE nom_table CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Import avec encodage forcé
mysql -u user -p --default-character-set=utf8mb4 database < fichier.sql
```

## Bonnes pratiques

### Avant import

- ✅ **Backup** de la base actuelle
- ✅ Vérifier **espace disque** suffisant
- ✅ Tester sur une **base de test** d'abord
- ✅ Lire le fichier SQL pour comprendre le contenu

### Pendant import

- ✅ Surveiller les **logs d'erreur**
- ✅ Vérifier utilisation **RAM/CPU**
- ✅ Ne pas interrompre sauf erreur critique

### Après import

- ✅ Vérifier **tables créées**
- ✅ Compter les **lignes** importées
- ✅ Tester **requêtes** de base
- ✅ Vérifier **performances**

## Outils utiles

### phpMyAdmin alternatives

- **Adminer** : Plus léger, un seul fichier PHP
- **HeidiSQL** : Client Windows puissant
- **DBeaver** : Multiplateforme, très complet
- **MySQL Workbench** : Officiel MySQL

### Compression outils

```bash
# Installer outils
apt install gzip bzip2 xz-utils pv pigz

# pigz = gzip parallèle (plus rapide)
pigz fichier.sql
unpigz fichier.sql.gz
```

## Ressources

- [MySQL Documentation](https://dev.mysql.com/doc/)
- [mysqldump Manual](https://dev.mysql.com/doc/refman/8.0/en/mysqldump.html)
- [phpMyAdmin Docs](https://docs.phpmyadmin.net/)

## Support

Problème avec votre base de données ? [Discord LKL Cloud](https://discord.gg/UaHNnMarQA)
