module.exports = {
  docs: [
    {
      type: 'doc',
      id: 'intro',
      label: 'Bienvenue sur la documentation',
    },
    {
      type: 'category',
      label: 'Information sur LKLCloud',
      items: [
        'information/index',
        'information/faq',
        'information/infra',
        'information/ports',
        'information/ddos',
        'information/tous-ports-ouverts',
      ],
    },
    {
      type: 'category',
      label: 'Panel Game',
      items: [
        'panel-game/index',
        'panel-game/configurations',
      ],
    },
    {
      type: 'category',
      label: 'Tuto Web',
      items: ['tuto-web/configure-domain', 'tuto-web/ssl-certificate'],
    },
    {
      type: 'category',
      label: 'Tuto VPS',
      items: [ 
        'tuto-vps/index',
        'tuto-vps/se-connecter-ssh',
        'tuto-vps/changer-port-ssh',
        'tuto-vps/ssh',
        'tuto-vps/installer-nodejs',
        'tuto-vps/nodejs',
        'tuto-vps/installer-plesk',
        'tuto-vps/installer-docker',
        'tuto-vps/configurer-reverse-proxy',
        'tuto-vps/monitoring-serveur',
      ],
    },
    {
      type: 'category',
      label: 'VPS Windows',
      items: [
        'vps-windows/index',
        'vps-windows/connect-rdp', 
        'vps-windows/install-software', 
        'vps-windows/firewall-config',
      ],
    },
    {
      type: 'category',
      label: 'FiveM',
      items: [
        'fivem/index',
        'fivem/txadmin',
        'fivem/mysql',
        'fivem/onesync',
        'fivem/onesync-infinity',
        'fivem/optimiser',
        'fivem/erreur-serveur-prive',
        'fivem/mettre-a-jour-artifacts',
        'fivem/discount',
      ],
    },
    {
      type: 'category',
      label: 'Minecraft',
      items: [
        'minecraft/index',
        'minecraft/version',
        'minecraft/plugins',
      ],
    },
    {
      type: 'category',
      label: "Garry's Mod",
      items: [
        'gmod/index',
        'gmod/modes',
        'gmod/config',
        'gmod/wiremod',
      ],
    },
    {
      type: 'category',
      label: 'Hytale',
      items: [
        'hytale/index',
      ],
    },
  ],
};
