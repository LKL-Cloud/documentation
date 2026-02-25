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
      link: {
        type: 'doc',
        id: 'information/index',
      },
      items: [
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
      link: {
        type: 'doc',
        id: 'panel-game/index',
      },
      items: [
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
      label: 'Aide Cloud',
      link: {
        type: 'doc',
        id: 'tuto-vps/index',
      },
      items: [
        'tuto-vps/se-connecter-ssh',
        'tuto-vps/changer-port-ssh',
        'tuto-vps/installer-nodejs',
        'tuto-vps/installer-plesk',
        'tuto-vps/installer-docker',
        'tuto-vps/configurer-reverse-proxy',
        'tuto-vps/monitoring-serveur',
        'tuto-vps/heberger-bot-discord',
      ],
    },
    {
      type: 'category',
      label: 'VPS Windows',
      link: {
        type: 'doc',
        id: 'vps-windows/index',
      },
      items: [
        'vps-windows/connect-rdp',
        'vps-windows/install-software',
        'vps-windows/firewall-config',
      ],
    },
    {
      type: 'category',
      label: 'FiveM',
      link: {
        type: 'doc',
        id: 'fivem/index',
      },
      items: [
        'fivem/txadmin',
        'fivem/mysql',
        'fivem/importer-sql',
        'fivem/onesync-infinity',
        'fivem/optimiser',
        'fivem/erreur-serveur-prive',
        'fivem/mettre-a-jour-artifacts',
      ],
    },
    {
      type: 'category',
      label: 'Minecraft',
      link: {
        type: 'doc',
        id: 'minecraft/index',
      },
      items: [
        'minecraft/version',
        'minecraft/plugins',
      ],
    },
    {
      type: 'category',
      label: "Garry's Mod",
      link: {
        type: 'doc',
        id: 'gmod/index',
      },
      items: [
        'gmod/modes',
        'gmod/config',
        'gmod/wiremod',
      ],
    },
    {
      type: 'category',
      label: 'Hytale',
      link: {
        type: 'doc',
        id: 'hytale/index',
      },
      items: [],
    },
  ],
};
