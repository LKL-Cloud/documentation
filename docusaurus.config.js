// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'LKLCloud',
  tagline: 'Documentation officielle LKLCloud',
  favicon: 'img/favicon.ico',

  url: 'https://docs.lklcloud.fr',
  baseUrl: '/',

  organizationName: 'LKLCloud',
  projectName: 'documentation',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'fr',
    locales: ['fr'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: '/docs',
          editUrl: undefined,
          showLastUpdateTime: true,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],

  themeConfig: {
    image: 'img/social-card.jpg',
    
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },

    navbar: {
      title: 'LKLCloud',
      logo: {
        alt: 'LKLCloud',
        src: 'img/logo.svg',
      },
      items: [
        { to: '/docs', label: 'Documentation', position: 'left' },
        { href: 'https://lklcloud.fr', label: 'Site Web', position: 'right' },
        { href: 'https://client.lklcloud.fr/', label: 'Espace client', position: 'right' },
        { href: 'https://discord.gg/UaHNnMarQA', label: 'Discord', position: 'right' },
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },

    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            { label: 'Accueil', to: '/docs' },
          ],
        },
        {
          title: 'Support',
          items: [
            { label: 'Discord', href: 'https://discord.gg/UaHNnMarQA' },
            { label: 'Espace client', href: 'https://client.lklcloud.fr' },
          ],
        },
        {
          title: 'LKLCloud',
          items: [
            { label: 'Site Web', href: 'https://lklcloud.fr' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} LKLCloud.`,
    },

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  },
};

export default config;
