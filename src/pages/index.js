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
    icon: <IconCastle />,
    color: '#34d399',
    title: 'Hytale',
    description: 'Configuration et gestion de votre serveur.',
    link: '/docs/hytale/',
  },
];

const infrastructure = [
  {
    icon: <IconServer />,
    color: '#60a5fa',
    title: 'VPS Linux',
    description: 'SSH, Node.js, Docker, configuration.',
    link: '/docs/tuto-vps/',
  },
  {
    icon: <IconMonitor />,
    color: '#a78bfa',
    title: 'VPS Windows',
    description: 'Bureau à distance, logiciels, configuration.',
    link: '/docs/vps-windows/',
  },
  {
    icon: <IconGlobe2 />,
    color: '#34d399',
    title: 'Hébergement Web',
    description: 'Domaines, certificats SSL, déploiement.',
    link: '/docs/tuto-web/configure-domain',
  },
  {
    icon: <IconGamepad />,
    color: '#f472b6',
    title: 'Panel Game',
    description: 'Gestion de vos serveurs de jeux.',
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
      </main>
    </>
  );
}
