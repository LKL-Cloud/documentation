import React from 'react';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';

/* ── SVG Icon Components ── */

function IconGlobe() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function IconClock() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function IconZap() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function IconTerminal() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  );
}

function IconServer() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" />
      <line x1="6" y1="18" x2="6.01" y2="18" />
    </svg>
  );
}

function IconMonitor() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

function IconGlobe2() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function IconGamepad() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="6" y1="12" x2="10" y2="12" />
      <line x1="8" y1="10" x2="8" y2="14" />
      <line x1="15" y1="13" x2="15.01" y2="13" />
      <line x1="18" y1="11" x2="18.01" y2="11" />
      <rect x="2" y="6" width="20" height="12" rx="2" />
    </svg>
  );
}

function IconWrench() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}

function IconCube() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}

function IconCastle() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18M4 21V10l4-4 4 4 4-4 4 4v11" />
      <path d="M9 21v-4h6v4" />
    </svg>
  );
}

function IconDiscord() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

function IconLock() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function IconHelpCircle() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function IconInfo() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}

function IconWifi() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.55a11 11 0 0 1 14.08 0" />
      <path d="M1.42 9a16 16 0 0 1 21.16 0" />
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
      <line x1="12" y1="20" x2="12.01" y2="20" />
    </svg>
  );
}

/* ── Data ── */

const stats = [
  { icon: <IconGlobe />, value: 'Worldwide', label: 'Infrastructure' },
  { icon: <IconClock />, value: '24/7', label: 'Support' },
  { icon: <IconShield />, value: 'Anti-DDoS', label: 'Protection' },
  { icon: <IconZap />, value: '99.9%', label: 'Uptime' },
];

const gameServers = [
  {
    icon: <IconTerminal />,
    color: '#60a5fa',
    title: 'FiveM',
    description: 'txAdmin, bases de données, OneSync, optimisation.',
    link: '/docs/fivem/',
  },
  {
    icon: <IconCube />,
    color: '#a78bfa',
    title: 'Minecraft',
    description: 'Plugins, versions, configuration serveur.',
    link: '/docs/minecraft/',
  },
  {
    icon: <IconWrench />,
    color: '#f472b6',
    title: "Garry's Mod",
    description: 'DarkRP, addons, configuration serveur.',
    link: '/docs/gmod/',
  },
  {
    icon: <IconDiscord />,
    color: '#5865F2',
    title: 'Discord',
    description: 'Bots Discord, Node.js, Python, déploiement.',
    link: '/docs/tuto-vps/heberger-bot-discord',
  },
];

const resources = [
  {
    icon: <IconLock />,
    color: '#f59e0b',
    title: 'Anti-DDoS',
    description: 'Protection réseau, GCore, Stormwall, Cloudflare.',
    link: '/docs/information/ddos',
  },
  {
    icon: <IconHelpCircle />,
    color: '#60a5fa',
    title: 'FAQ',
    description: 'Questions fréquentes, déclaration, facturation.',
    link: '/docs/information/faq',
  },
  {
    icon: <IconInfo />,
    color: '#a78bfa',
    title: 'Info LKLCloud',
    description: 'Infrastructure, réseau, anti-DDoS, CGV.',
    link: '/docs/information/',
  },
  {
    icon: <IconWifi />,
    color: '#34d399',
    title: 'Ports',
    description: 'Ports ouverts, configuration pare-feu.',
    link: '/docs/information/ports',
  },
];

const infrastructure = [
  {
    icon: <IconServer />,
    color: '#60a5fa',
    title: 'VPS Linux',
    description: 'SSH, Node.js, Docker, MariaDB, Pterodactyl.',
    link: '/docs/tuto-vps/',
  },
  {
    icon: <IconMonitor />,
    color: '#a78bfa',
    title: 'VPS Windows',
    description: 'Bureau à distance, IIS, pare-feu, tâches.',
    link: '/docs/vps-windows/',
  },
  {
    icon: <IconGlobe2 />,
    color: '#34d399',
    title: 'Hébergement Web',
    description: 'Domaines, certificats SSL, configuration.',
    link: '/docs/tuto-web/configure-domain',
  },
  {
    icon: <IconGamepad />,
    color: '#f472b6',
    title: 'Panel Game',
    description: 'Sous-utilisateurs, planifications, fichiers.',
    link: '/docs/panel-game/',
  },
];

/* ── Components ── */

function StatCard({ icon, value, label }) {
  return (
    <div className={styles.statCard}>
      <span className={styles.statIcon}>{icon}</span>
      <span className={styles.statValue}>{value}</span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
}

function ServiceCard({ icon, color, title, description, link }) {
  return (
    <Link to={link} className={styles.serviceCard}>
      <div className={styles.serviceIcon} style={{ color: color, backgroundColor: `${color}15` }}>
        {icon}
      </div>
      <div className={styles.serviceContent}>
        <h3 className={styles.serviceTitle}>{title}</h3>
        <p className={styles.serviceDescription}>{description}</p>
      </div>
    </Link>
  );
}

/* ── Page ── */

export default function Home() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <>
      <Head>
        <title>Accueil | {siteConfig.title}</title>
        <meta name="description" content={siteConfig.tagline} />
      </Head>
      <main className={styles.main}>
        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <span className={styles.badge}>
              <span className={styles.badgeDot} />
              Infrastructure en ligne
            </span>
            <h1 className={styles.heroTitle}>
              Documentation <span className={styles.heroAccent}>LKLCloud</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Guides, tutoriels et ressources pour vos serveurs de jeux,
              <br />
              VPS et hébergement web.
            </p>
            <div className={styles.heroCta}>
              <Link to="/docs/intro" className={styles.ctaPrimary}>
                Parcourir la documentation
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '6px' }}>
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </Link>
              <Link to="https://client.lklcloud.fr" className={styles.ctaSecondary}>
                Espace Client
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className={styles.statsRow}>
            {stats.map((stat, i) => (
              <StatCard key={i} {...stat} />
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Game Servers */}
        <section className={styles.section}>
          <span className={styles.sectionTag}>SERVEURS DE JEUX</span>
          <h2 className={styles.sectionTitle}>Configurez votre serveur de jeu</h2>
          <div className={styles.grid}>
            {gameServers.map((s, i) => (
              <ServiceCard key={i} {...s} />
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Infrastructure */}
        <section className={styles.section}>
          <span className={styles.sectionTag}>VPS & INFRASTRUCTURE</span>
          <h2 className={styles.sectionTitle}>Gérez votre infrastructure</h2>
          <div className={styles.grid}>
            {infrastructure.map((s, i) => (
              <ServiceCard key={i} {...s} />
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Resources */}
        <section className={styles.section}>
          <span className={styles.sectionTag}>OUTILS & RESSOURCES</span>
          <h2 className={styles.sectionTitle}>Guides et ressources utiles</h2>
          <div className={styles.grid}>
            {resources.map((s, i) => (
              <ServiceCard key={i} {...s} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
