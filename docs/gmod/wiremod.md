---
title: Installer WireMod
---

Guide d'installation et d'utilisation de WireMod, l'addon indispensable pour les constructions avancées sur GMod.

## Qu'est-ce que WireMod ?

WireMod est un addon révolutionnaire pour Garry's Mod permettant de créer des systèmes électroniques complexes, des circuits logiques et des mécanismes automatisés.

**Fonctionnalités principales :**
- Circuits électroniques et logiques
- Composants programmables (E2, Starfall)
- Sensors et détecteurs
- Affichages et écrans
- Moteurs et actionneurs
- Systèmes de contrôle avancés

## Installation

### Via Workshop (Recommandé)

WireMod est composé de plusieurs addons :

**1. Wire** (Base obligatoire)
```
Workshop ID: 160250458
```

**2. Wire Extras** (Addons supplémentaires)
```
Workshop ID: 948242371
```

**3. Advanced Duplicator 2** (Recommandé)
```
Workshop ID: 773402917
```

### Dans server.cfg ou startup

```lua
resource.AddWorkshop("160250458")  // Wire
resource.AddWorkshop("948242371")  // Wire Extras
resource.AddWorkshop("773402917")  // Adv Dupe 2
```

### Installation manuelle

Si vous ne pouvez pas utiliser Workshop :

1. Téléchargez depuis GitHub : https://github.com/wiremod/wire
2. Extrayez dans `garrysmod/addons/`
3. Structure :
```
addons/
└── wire/
    ├── lua/
    ├── materials/
    └── models/
```

## Composants WireMod

### Composants de base

**Wire Tool** - Outil principal pour relier les composants
```
Clic gauche = Sortie (Output)
Clic droit = Entrée (Input)
```

**Constantes**
- Valeur fixe à transmettre
- Utile pour tests et prototypes

**Gates (Portes logiques)**
- AND, OR, NOT, NAND, NOR, XOR
- Opérations mathématiques
- Comparaisons

### Inputs (Entrées)

**Button** - Bouton pressable
- Toggle ou momentané
- Configurable

**Numpad** - Touches du clavier numérique
- Lier actions aux touches
- Toggle ou maintien

**Pod Controller** - Contrôle depuis véhicule
- WASD, souris
- Angles de vue

**Sensors**
- Ranger : Mesure distance
- GPS : Position XYZ
- Gyroscope : Angles et rotation
- Speed : Vitesse

### Outputs (Sorties)

**Lamps** - Lumières contrôlables
- Couleur variable
- Intensité ajustable

**Sounds** - Sons déclenchables
- Bibliothèque complète
- Volume/pitch variables

**Thrusters** - Propulsion
- Force réglable
- Direction configurable

**Explosions** - Effets d'explosion
- Taille personnalisable
- Dégâts paramétrables

### Displays (Affichages)

**Digital Screen** - Écran numérique
- Affichage de valeurs
- Formatage personnalisé

**Text Screen** - Écran texte
- Multi-lignes
- Couleurs personnalisables

**Pixel** - Affichage graphique
- Dessins pixels
- Animations possibles

**Light** - Indicateur lumineux
- États on/off
- Changements de couleur

## Expression 2 (E2)

Langage de programmation intégré à WireMod.

### Premier script E2

Créez un chip E2 et ouvrez l'éditeur :

```lua
@name Mon Premier E2
@inputs Button
@outputs Lumiere

if (Button) {
    Lumiere = 1
} else {
    Lumiere = 0
}
```

**Explication :**
- `@inputs` : Entrées du chip
- `@outputs` : Sorties du chip
- `if/else` : Condition simple

### E2 avancé - Contrôle de véhicule

```lua
@name Controle Vehicule
@inputs W A S D Space [entity]:Entity
@outputs Forward Right Up Brake
@persist Pod:entity

# Initialisation
if (first()) {
    Pod = entity()
}

# Contrôle directionnel
Forward = W - S
Right = D - A
Up = Space

# Affichage HUD
if (driver(Pod)) {
    Player = driver(Pod)
    
    # Vitesse
    Vel = Pod:vel():length()
    hint("Vitesse: " + round(Vel) + " u/s", 1)
}
```

### E2 Fonctions utiles

**Mathématiques :**
```lua
X = abs(Number)        # Valeur absolue
Y = round(Number)      # Arrondi
Z = clamp(Val, Min, Max)  # Limiter valeur
```

**Vecteurs :**
```lua
Pos = entity():pos()   # Position
Ang = entity():angles() # Angles
Dir = Pos - Target     # Direction
Dist = Pos:distance(Target)  # Distance
```

**Entités :**
```lua
E = entity()           # Chip lui-même
O = owner()            # Propriétaire
Players = players()    # Liste joueurs
```

## Starfall

Alternative moderne à E2, plus puissant.

### Premier script Starfall

```lua
--@name Mon Starfall
--@author Votre Nom

if SERVER then
    -- Code serveur
    hook.add("tick", "monTick", function()
        -- Code exécuté chaque tick
    end)
end

if CLIENT then
    -- Code client (rendering)
    hook.add("render", "monRender", function()
        -- Dessiner à l'écran
    end)
end
```

### Starfall Screen - Affichage avancé

```lua
--@name Ecran Info
--@author Votre Nom

if CLIENT then
    local font = render.createFont("Arial", 30, 400, true)
    
    hook.add("render", "drawScreen", function()
        render.setColor(Color(255, 255, 255))
        render.setFont(font)
        
        render.drawText(256, 100, "Bienvenue!")
        render.drawText(256, 150, "Serveur GMod")
        
        -- Temps
        local time = os.date("%H:%M:%S")
        render.drawText(256, 200, time)
    end)
end
```

## Projets WireMod

### Porte automatique

**Composants nécessaires :**
- Ranger Sensor
- Gate (Comparaison)
- Hydraulic (ou Motor)

**Logique :**
1. Ranger détecte joueur (distance < 200)
2. Gate compare distance
3. Si proche, ouvre porte (Hydraulic)

### Système d'alarme

**Composants :**
- Sensor (détection)
- E2 (logique)
- Light (lumière rouge)
- Sound (sirène)

**E2 Code :**
```lua
@name Alarme
@inputs Detection
@outputs Sirene Lumiere
@persist Active

if (Detection) {
    Active = 1
    timer("alarme", 5000)  # 5 secondes
}

if (clk("alarme")) {
    Active = 0
}

Sirene = Active
Lumiere = Active
```

### Véhicule contrôlable

**Composants :**
- Pod Controller
- E2
- 4x Thrusters (mouvement)
- 2x Gyroscope (stabilisation)

**E2 simplifié :**
```lua
@name Controle Voiture
@inputs Pod:entity W A S D
@outputs T1 T2 T3 T4

# Avant/Arrière
T1 = (W - S) * 100
T2 = (W - S) * 100

# Rotation
T3 = (D - A) * 50
T4 = (A - D) * 50
```

## Optimisation WireMod

### Limiter les composants

Dans `server.cfg` :
```lua
sbox_maxwire_buttons 20
sbox_maxwire_sensors 15
sbox_maxwire_screens 10
sbox_maxwire_expression2s 5
sbox_maxwire_gpus 3
```

### E2 Performance

**Évitez :**
- Boucles infinies `while(1) {}`
- Trop de calculs par tick
- Opérations coûteuses répétées

**Optimisez :**
```lua
@persist LastCheck

# Au lieu de chaque tick
if (curtime() > LastCheck + 1) {  # Toutes les secondes
    # Calculs lourds ici
    LastCheck = curtime()
}
```

### Starfall Quotas

Starfall a des limites CPU :

```lua
-- Vérifier quota restant
local ops = quotaAverage()
print("Operations: " .. ops .. " / " .. quotaMax())

-- Si quota faible, réduire calculs
if ops > quotaMax() * 0.8 then
    -- Simplifier le code
end
```

## Sécurité WireMod

### Permissions E2

Par défaut, E2 peut être dangereux.

**Restrictions recommandées :**

Via addon **E2 Power** ou **ServerGuard** :

```lua
-- Bloquer fonctions dangereuses
e2_function_ban("runOnFile")
e2_function_ban("fileWrite")
e2_function_ban("http")
e2_function_ban("concmd")
```

### Limiter Starfall

```lua
-- Quota CPU par défaut (microseconds)
sf_timebuffer_size 100000

-- Limite RAM
sf_ram_max 65536

-- Désactiver si problèmes
sf_enabled 0
```

### Anti-lag automatique

Installez **ACF (Armored Combat Framework)** avec limiteur :

```lua
sbox_maxwire_expression2s 3
sbox_maxwire_cpus 5000  # Ops/second
```

## Dépannage

### "Expression 2 Extension not found"

Extension E2 manquante.

**Solution :**
- Vérifiez que Wire est bien installé
- Réinstallez Wire depuis Workshop
- Vérifiez les logs : `lua/autorun/wire/`

### Starfall "Quota exceeded"

Script utilise trop de ressources.

**Solutions :**
- Réduisez la complexité du code
- Utilisez moins de hooks
- Ajoutez des délais entre opérations
- Augmentez quota : `sf_timebuffer_size 200000`

### Wire ne s'affiche pas

**Vérifications :**
1. Addon activé
2. Pas de conflit avec autres addons
3. Console erreurs : `developer 1`

### E2 crash serveur

E2 mal codé peut crash.

**Protection :**
- Installez **E2Guard**
- Limitez ops/second
- Blacklist fonctions dangereuses

## Tutoriels avancés

### HUD personnalisé

Starfall HUD dans véhicule :

```lua
--@name HUD Vehicule

if CLIENT then
    local scrW = 512
    local scrH = 512
    
    hook.add("render", "hud", function()
        local ply = owner()
        
        -- Fond semi-transparent
        render.setColor(Color(0, 0, 0, 180))
        render.drawRect(10, 10, 200, 100)
        
        -- Vitesse
        local vel = ply:getVelocity():getLength()
        render.setColor(Color(255, 255, 255))
        render.drawText(20, 20, "Vitesse: " .. math.floor(vel))
        
        -- Santé
        local hp = ply:getHealth()
        render.setColor(Color(255, 0, 0))
        render.drawText(20, 50, "HP: " .. hp)
    end)
end
```

### Turret automatique

E2 pour tourelle qui vise automatiquement :

```lua
@name Turret Auto
@outputs Angle:angle Fire
@persist Target:entity

# Trouver cible
Players = players()
Closest = 9999
Target = noentity()

foreach (I, P:entity = Players) {
    if (P:isAlive() & P != owner()) {
        Dist = entity():pos():distance(P:pos())
        if (Dist < Closest & Dist < 1000) {
            Closest = Dist
            Target = P
        }
    }
}

# Viser
if (Target:isValid()) {
    TargetPos = Target:pos() + vec(0, 0, 50)
    MyPos = entity():pos()
    Direction = TargetPos - MyPos
    Angle = Direction:toAngle()
    
    # Tirer si aligné
    if (Direction:normalized():dot(entity():forward()) > 0.95) {
        Fire = 1
    } else {
        Fire = 0
    }
}
```

## Ressources

- [WireMod Wiki](https://github.com/wiremod/wire/wiki)
- [E2 Documentation](https://github.com/wiremod/wire/wiki/Expression-2)
- [Starfall Documentation](https://github.com/thegrb93/StarfallEx/wiki)
- [Exemples E2](https://github.com/wiremod/wire/tree/master/lua/entities/gmod_wire_expression2/core)

## Communauté

- [WireMod Discord](https://discord.gg/H8UKY3Y)
- [Forums Facepunch](https://facepunch.com/forumdisplay.php/126)
- [Workshop Collection](https://steamcommunity.com/workshop/browse/?appid=4000&searchtext=wiremod)

## Support

Besoin d'aide ? [Discord LKL Cloud](https://discord.gg/UaHNnMarQA)
