---
title: Choisir son mode GMOD
sidebar_position: 2
---

Guide pour choisir et installer le meilleur gamemode pour votre serveur Garry's Mod.

## Gamemodes populaires

### DarkRP - Roleplay

Le mode de jeu le plus populaire sur GMod.

**Concept :**
- Simulation de vie urbaine
- Métiers variés (policier, gangster, maire, etc.)
- Économie avec argent et propriétés
- Interaction sociale et RP

**Installation :**

```bash
cd garrysmod/gamemodes/
git clone https://github.com/FPtje/DarkRP.git darkrp
```

**Configuration server.cfg :**
```lua
hostname "Mon Serveur DarkRP"
gamemode "darkrp"
sv_defaultgamemode "darkrp"
rp_language "fr"
```

**Addons recommandés :**
- **DarkRPModification** : Personnalisation complète
- **M9K Weapons** : Pack d'armes réalistes
- **VCMod** : Système de véhicules avancé
- **PermaProps** : Props permanents
- **ULX/ULib** : Administration

**Personnalisation :**

`darkrpmodification/lua/darkrp_customthings/jobs.lua` :
```lua
TEAM_POLICE = DarkRP.createJob("Policier", {
    color = Color(25, 25, 170),
    model = {"models/player/police.mdl"},
    description = "Faire respecter la loi",
    weapons = {"weapon_glock2", "stunstick", "door_ram"},
    command = "police",
    max = 4,
    salary = 85,
    admin = 0,
    vote = true,
    hasLicense = true,
    category = "Forces de l'ordre",
})
```

### TTT (Trouble in Terrorist Town)

Mode d'enquête et déduction sociale.

**Concept :**
- Innocents vs Traîtres vs Détectives
- Élimination et déduction
- Round-based gameplay
- Très stratégique

**Installation :**

TTT est inclus par défaut dans GMod.

```lua
gamemode "terrortown"
```

**Addons TTT essentiels :**
- **TTT2** : Version améliorée et modernisée
- **TTT Weapons Collection** : Armes supplémentaires
- **TTT Custom Roles** : Rôles additionnels
- **Round Report** : Rapport de fin de round

**Configuration :**

`garrysmod/cfg/server.cfg` :
```lua
# Configuration TTT
ttt_round_limit 6
ttt_time_limit_minutes 75
ttt_preptime_seconds 30
ttt_firstpreptime 60
ttt_posttime_seconds 30
ttt_traitor_pct 0.25          # 25% de traîtres
ttt_detective_pct 0.13        # 13% de détectives
ttt_minimum_players 4
```

### Prop Hunt

Cache-cache avec props.

**Concept :**
- Joueurs se cachent en props
- Hunters cherchent et éliminent
- Timer de survie
- Très fun et accessible

**Installation :**

Via Workshop :
```
workshop.mount("135509255")  # Prop Hunt Enhanced
```

Ou téléchargement direct :
```bash
cd addons/
svn checkout https://github.com/Manti/PropHunt.git prophunt
```

**Configuration :**
```lua
gamemode "prop_hunt"
ph_round_time 300              # 5 minutes par round
ph_freeze_time 30              # 30s pour se cacher
ph_hunter_hp_penalty 5         # Pénalité tir dans le vide
ph_prop_hp_bonus 25           # HP bonus par prop tué
```

### Murder

Mode mystère et survie.

**Concept :**
- 1 Meurtrier, 1 Enquêteur, des Innocents
- Le meurtrier doit éliminer tout le monde
- Tension et suspense maximum

**Installation :**
```
Workshop: 187772328
```

**Configuration :**
```lua
mu_round_time 300
mu_murderer_revolver_shots 5
mu_footstep_time 3
```

### Sandbox

Mode créatif libre, le GMod original.

**Concept :**
- Construction libre
- Physique avancée
- Aucune limite de créativité
- Base pour tous les autres modes

**Addons Sandbox :**
- **Wire Mod** : Électronique et circuits
- **Precision Alignment** : Construction précise
- **Stacker** : Empiler props facilement
- **Advanced Duplicator 2** : Sauvegarder créations

### Death Run

Parcours d'obstacles mortels.

**Concept :**
- Runners traversent le parcours
- Deaths activent les pièges
- Course contre la montre

**Installation :**
```
Workshop: 1447092000
```

### Zombie Survival

Survie contre vagues de zombies.

**Concept :**
- Vagues progressives
- Construction de barricades
- Travail d'équipe essentiel
- Classes et armes variées

**Installation :**
```
Workshop: 1282627913
```

**Configuration :**
```lua
zs_wave_count 10
zs_zombie_speed_multi 1.0
zs_allow_player_zombies 1
```

## Choisir selon votre audience

### Pour débutants GMod

→ **Prop Hunt** ou **Murder**
- Règles simples
- Parties courtes
- Fun immédiat
- Pas de courbe d'apprentissage

### Pour joueurs RP

→ **DarkRP**
- Immersion maximale
- Communauté active
- Contenu infiniment personnalisable
- Nécessite modération active

### Pour joueurs stratégiques

→ **TTT** ou **TTT2**
- Réflexion et déduction
- Rejouabilité élevée
- Communauté mature
- Parties équilibrées

### Pour créatifs

→ **Sandbox** ou **Build**
- Liberté totale
- Partage de créations
- Communauté constructive

## Configuration serveur multi-modes

### Changer de gamemode sans redémarrage

Installez **ULX** :
```lua
ulx map <map> <gamemode>
```

Exemple :
```lua
ulx map gm_construct sandbox
ulx map ttt_minecraft_b5 terrortown
ulx map rp_downtown_v4c_v2 darkrp
```

### Rotation automatique

Dans `server.cfg` :
```lua
# Rotation maps/gamemodes
mapcyclefile "mapcycle_darkrp.txt"
```

`mapcycle_darkrp.txt` :
```
rp_downtown_v4c_v2
rp_evocity_v4b1
rp_rockford_v2b
```

## Maps par gamemode

### DarkRP Maps
- **rp_downtown_v4c_v2** : Classique urbain
- **rp_evocity_v4b1** : Grande ville
- **rp_rockford_v2b** : Ville américaine
- **rp_southside** : Quartier sud

### TTT Maps
- **ttt_minecraft_b5** : Thème Minecraft
- **ttt_67thway_v14** : Immeuble
- **ttt_clue** : Manoir mystère
- **ttt_rooftops_2016_v1** : Toits urbains

### Prop Hunt Maps
- **ph_restaurant** : Restaurant
- **ph_hotel** : Hôtel
- **ph_office** : Bureau
- **de_dust2** : Classique CS

## FastDL pour les maps

Les maps GMod sont volumineuses, utilisez FastDL :

```lua
# server.cfg
sv_allowdownload 1
sv_allowupload 1
sv_downloadurl "http://votresite.com/fastdl/"
```

Structure FastDL :
```
fastdl/
├── maps/
│   ├── rp_downtown_v4c_v2.bsp.bz2
│   └── ttt_minecraft_b5.bsp.bz2
├── materials/
└── models/
```

Compresser pour FastDL :
```bash
bzip2 -9 maps/*.bsp
```

## Optimisation par gamemode

### DarkRP
```lua
# Limiter props
sbox_maxprops 150
sbox_maxragdolls 5
sbox_maxvehicles 4
sbox_maxeffects 50
sbox_maxballoons 10
sbox_maxdynamite 0
```

### TTT
```lua
# Désactiver inutiles
sbox_noclip 0
sbox_godmode 0
ttt_allow_discomb_jump 0
```

### Prop Hunt
```lua
# Performance
ph_max_props 200
ph_auto_taunt 1
```

## Addons de gestion multi-gamemode

**ServerGuard** - Administration complète
```lua
Workshop: 1612828101
```

**ULX/ULib** - Commandes admin
```lua
Workshop: 557962280
```

**DarkRP Modification** - Customisation DarkRP
- Éditer jobs, armes, entités
- Configuration complète
- Interface admin

## Sécurité par gamemode

### DarkRP - Risques élevés

- Backdoors fréquents dans addons
- Scanner avec **Backdoor Scanner**
- N'installer que addons vérifiés
- Mettre à jour régulièrement

### TTT - Risques moyens

- Addons généralement sûrs
- Vérifier les weapons packs
- Limiter admin guns

### Sandbox - Risques faibles

- Mode le plus sûr
- Limiter les commandes lua
- Désactiver lua_run pour joueurs

## Migration entre gamemodes

1. **Sauvegardez tout**
```bash
tar -czf backup-$(date +%Y%m%d).tar.gz garrysmod/
```

2. **Changez le gamemode**
```lua
gamemode "nouveau_mode"
```

3. **Changez la map**
```lua
map gm_flatgrass
```

4. **Reconfigurez**
- Permissions
- Addons
- FastDL

5. **Testez**

## Dépannage gamemodes

### "Attempting to create unknown entity"

Un addon référence une entité manquante.

**Solution :**
- Vérifiez les dépendances de l'addon
- Installez l'addon requis
- Ou supprimez l'addon problématique

### Players stuck in spawn

Configuration spawn incorrecte.

**Solution :**
```lua
# DarkRP
rp_forcedownload 1

# Général
sv_timeout 65
```

### "Lua panic!"

Script Lua corrompu ou incompatible.

**Solution :**
```bash
# Vérifier les logs
cat garrysmod/logs/server_log.txt | grep "ERROR"

# Désactiver addons un par un
```

## Ressources

- [Workshop GMod](https://steamcommunity.com/app/4000/workshop/)
- [DarkRP Docs](https://darkrp.miraheze.org/)
- [TTT2 Guide](https://ttt2.neoxult.de/)
- [GMod Wiki](https://wiki.facepunch.com/gmod/)

## Besoin d'aide ?

[Discord LKL Cloud](https://discord.gg/UaHNnMarQA) - Support communautaire GMod
