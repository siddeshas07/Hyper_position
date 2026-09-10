import React, { useEffect, useState } from 'react'

const navItems = [
  ['Overview', 'grid'],
  ['Portfolio', 'wallet'],
  ['Trade replay', 'replay'],
  ['Flow radar', 'radar'],
  ['Risk lab', 'shield'],
  ['Execution', 'route'],
]

const positions = [
  { token: 'ETH', name: 'Ethereum', side: 'LONG', size: '$72,440', entry: '$3,214.60', mark: '$3,428.12', pnl: '+$4,802.46', pct: '+7.18%', tone: 'violet' },
  { token: 'BTC', name: 'Bitcoin', side: 'LONG', size: '$54,218', entry: '$108,640', mark: '$111,742', pnl: '+$1,548.34', pct: '+2.94%', tone: 'orange' },
  { token: 'SOL', name: 'Solana', side: 'SHORT', size: '$18,862', entry: '$204.18', mark: '$198.42', pnl: '+$532.08', pct: '+2.82%', tone: 'blue' },
]

const Icon = ({ name, size = 18 }) => {
  const paths = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/></>,
    wallet: <><path d="M4 7.5h15a2 2 0 0 1 2 2v8.5a2 2 0 0 1-2 2H5a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h12"/><path d="M16 13h5"/><circle cx="16" cy="13" r=".8" fill="currentColor"/></>,
    replay: <><path d="M4 7V3m0 0h4M4 3l3.2 3.2A8 8 0 1 1 4 12"/><path d="M10 9v6l5-3-5-3Z"/></>,
    radar: <><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><path d="m12 12 6-6"/></>,
    shield: <><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="m9 12 2 2 4-5"/></>,
    route: <><circle cx="6" cy="6" r="3"/><circle cx="18" cy="18" r="3"/><path d="M9 6h2a4 4 0 0 1 4 4v4a4 4 0 0 0 4 4"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></>,
    chevron: <path d="m9 18 6-6-6-6"/>,
    arrow: <><path d="M5 12h14M14 7l5 5-5 5"/></>,
    spark: <path d="m13 2-1.6 6.4L5 10l6.4 1.6L13 18l1.6-6.4L21 10l-6.4-1.6L13 2ZM5 17l-.6 2.4L2 20l2.4.6L5 23l.6-2.4L8 20l-2.4-.6L5 17Z"/>,
    more: <><circle cx="5" cy="12" r="1" fill="currentColor"/><circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="19" cy="12" r="1" fill="currentColor"/></>,
    external: <><path d="M14 3h7v7M10 14 21 3"/><path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"/></>,
  }
  return <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

const HyperliquidMark = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 62 30" role="img" aria-label="Hyperliquid logo">
    <path d="M2 16.5C2 8.2 6.7 3 11.7 3c6.1 0 7.3 8.8 13.2 8.8C30.8 11.8 33 1 40 1c6.8 0 6.1 9.1 12.9 9.1 3.1 0 5.2-1.9 7.1-4.1v7.5C58 18 54.7 21 50.6 21c-7 0-7-8.8-12.9-8.8-5.7 0-7.7 10.8-14.9 10.8-6.2 0-7.6-8.8-13.2-8.8-3.2 0-5.6 2.4-7.6 5.5v-3.2Z" fill="currentColor" />
  </svg>
)

const ThemeToggle = ({ theme, onChange }) => (
  <div className="theme-switch" aria-label="Color theme">
    <button className={theme === 'light' ? 'active' : ''} onClick={() => onChange('light')} aria-label="Use light theme">☼ <span>Light</span></button>
    <button className={theme === 'dark' ? 'active' : ''} onClick={() => onChange('dark')} aria-label="Use dark theme">☾ <span>Dark</span></button>
  </div>
)

const Logo = () => (
  <a className="brand" href="#overview" aria-label="HyperPosition overview">
    <span className="brand-symbol"><HyperliquidMark /></span>
    <span className="brand-word">hyper<span>position</span></span>
  </a>
)

const Sidebar = ({ active, setActive, theme, setTheme, mobileOpen, closeMobile }) => (
  <aside className={`sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
    <div className="sidebar-head"><Logo /><button className="mobile-close" onClick={closeMobile}>×</button></div>
    <nav className="main-nav" aria-label="Dashboard navigation">
      <p>Workspace</p>
      {navItems.map(([label, icon]) => (
        <button key={label} className={active === label ? 'active' : ''} onClick={() => { setActive(label); closeMobile() }}>
          <Icon name={icon} /><span>{label}</span>{label === 'Flow radar' && <em>3</em>}
        </button>
      ))}
      <p className="space-above">Account</p>
      <button><Icon name="bell" /><span>Activity</span><b className="notice" /></button>
      <button><Icon name="shield" /><span>API &amp; security</span></button>
    </nav>
    <div className="sidebar-bottom">
      <div className="powered"><HyperliquidMark /><span>Powered by<br /><b>Hyperliquid</b></span></div>
      <ThemeToggle theme={theme} onChange={setTheme} />
      <div className="profile">
        <div className="avatar">0X</div>
        <div><strong>0x71A4...92F8</strong><span>Connected</span></div>
        <Icon name="more" />
      </div>
    </div>
  </aside>
)

const AreaChart = () => (
  <div className="chart-wrap" aria-label="Portfolio value chart showing growth over 30 days">
    <div className="chart-tooltip"><span>Aug 28, 2026</span><strong>$176,482.20</strong><small>+$2,842.12 · 1.64%</small></div>
    <svg viewBox="0 0 820 270" preserveAspectRatio="none" role="img">
      <defs>
        <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--accent)" stopOpacity=".27" />
          <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
        <filter id="lineGlow" x="-10%" y="-20%" width="120%" height="140%"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      {[35, 92, 149, 206].map(y => <line key={y} x1="0" y1={y} x2="820" y2={y} className="gridline" />)}
      <path className="area" d="M0 220 C35 208 50 215 82 202 S125 173 156 181 S203 205 235 188 S269 144 304 152 S351 174 385 157 S431 117 469 126 S516 149 550 128 S593 72 631 87 S675 118 713 92 S756 38 820 42 L820 270 L0 270Z" />
      <path className="line" d="M0 220 C35 208 50 215 82 202 S125 173 156 181 S203 205 235 188 S269 144 304 152 S351 174 385 157 S431 117 469 126 S516 149 550 128 S593 72 631 87 S675 118 713 92 S756 38 820 42" />
      <line x1="713" y1="92" x2="713" y2="270" className="guide" />
      <circle cx="713" cy="92" r="6" className="point" />
    </svg>
    <div className="chart-labels"><span>Aug 03</span><span>Aug 10</span><span>Aug 17</span><span>Aug 24</span><span>Sep 02</span></div>
  </div>
)

const StatCard = ({ label, value, note, icon, tone = '' }) => (
  <article className="stat-card panel">
    <div className={`stat-icon ${tone}`}><Icon name={icon} /></div>
    <div><span>{label}</span><strong>{value}</strong><small className={note.startsWith('+') ? 'positive' : ''}>{note}</small></div>
  </article>
)

const RiskGauge = () => (
  <div className="risk-gauge">
    <svg viewBox="0 0 190 110" aria-hidden="true">
      <path d="M25 92a70 70 0 0 1 140 0" className="gauge-bg" />
      <path d="M25 92a70 70 0 0 1 140 0" className="gauge-value" />
    </svg>
    <div><strong>68</strong><span>/ 100</span><small>Balanced</small></div>
  </div>
)

const Dashboard = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem('hyperposition-theme') || 'light')
  const [active, setActive] = useState('Overview')
  const [range, setRange] = useState('30D')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('hyperposition-theme', theme)
  }, [theme])

  return (
    <div className="app-shell" id="overview">
      <Sidebar active={active} setActive={setActive} theme={theme} setTheme={setTheme} mobileOpen={mobileOpen} closeMobile={() => setMobileOpen(false)} />
      {mobileOpen && <button className="mobile-backdrop" onClick={() => setMobileOpen(false)} aria-label="Close menu" />}

      <section className="workspace">
        <header className="topbar">
          <button className="menu-button" onClick={() => setMobileOpen(true)} aria-label="Open menu">☰</button>
          <button className="search-button"><Icon name="search" /><span>Search markets, positions...</span><kbd>⌘ K</kbd></button>
          <div className="top-actions">
            <div className="status-pill"><i /> Hyperliquid mainnet</div>
            <button className="icon-button" aria-label="Notifications"><Icon name="bell" /><i /></button>
            <button className="wallet-button"><span className="wallet-dot" />0x71A4...92F8</button>
          </div>
        </header>

        <main className="dashboard">
          <div className="page-heading">
            <div><span className="eyebrow">LIVE PORTFOLIO INTELLIGENCE</span><h1>{active}</h1><p>Your complete Hyperliquid performance, decoded in real time.</p></div>
            <div className="heading-actions"><button className="ghost-button"><Icon name="external" /> Export report</button><button className="accent-button"><Icon name="replay" /> Replay portfolio</button></div>
          </div>

          <section className="summary-grid">
            <article className="balance-card panel">
              <div className="card-top"><span>Portfolio value</span><button><Icon name="more" /></button></div>
              <strong>$184,620<span>.42</span></strong>
              <div className="balance-meta"><b>+$28,712.08</b><span>+18.42% all time</span></div>
              <div className="mini-line"><svg viewBox="0 0 300 62" preserveAspectRatio="none"><path d="M0 53C26 55 29 43 55 45S83 55 105 39s31-4 52-17 39 4 59-3 38-11 84-17" /></svg></div>
            </article>
            <StatCard label="Today's P&L" value="+$3,284.16" note="+1.81% today" icon="spark" tone="mint" />
            <StatCard label="Open interest" value="$145.52K" note="3 active positions" icon="wallet" tone="purple" />
            <StatCard label="Available margin" value="$39,100" note="78.6% margin health" icon="shield" tone="blue" />
          </section>

          <section className="analytics-grid">
            <article className="performance-card panel">
              <div className="panel-heading">
                <div><span>Portfolio performance</span><strong>$184,620.42</strong><small><b>+$17,840.52</b> in the selected period</small></div>
                <div className="range-tabs">{['7D', '30D', '90D', '1Y'].map(item => <button key={item} className={range === item ? 'active' : ''} onClick={() => setRange(item)}>{item}</button>)}</div>
              </div>
              <AreaChart />
            </article>

            <article className="decision-card panel">
              <div className="panel-heading compact"><div><span>Decision health</span><small>AI signal · updated now</small></div><span className="live-badge"><i /> Live</span></div>
              <RiskGauge />
              <div className="risk-insight"><span><Icon name="spark" /></span><p><strong>Risk is under control</strong>Your leverage is 12% below the portfolio average. ETH concentration is the next thing to watch.</p></div>
              <button className="full-button">Open risk lab <Icon name="arrow" /></button>
            </article>
          </section>

          <section className="lower-grid">
            <article className="positions-card panel">
              <div className="panel-heading compact"><div><span>Open positions</span><small>3 positions · $145,520 notional</small></div><button className="text-button">View all <Icon name="chevron" size={15} /></button></div>
              <div className="position-table">
                <div className="table-head"><span>MARKET</span><span>SIDE</span><span>SIZE</span><span>ENTRY / MARK</span><span>UNREALIZED P&amp;L</span><span /></div>
                {positions.map(position => (
                  <div className="table-row" key={position.token}>
                    <div className="market-cell"><span className={`token ${position.tone}`}>{position.token.slice(0, 1)}</span><p><strong>{position.token}-USD</strong><small>{position.name}</small></p></div>
                    <span className={`side ${position.side.toLowerCase()}`}>{position.side}</span>
                    <strong>{position.size}</strong>
                    <p className="price-pair"><span>{position.entry}</span><small>{position.mark}</small></p>
                    <p className="pnl"><strong>{position.pnl}</strong><small>{position.pct}</small></p>
                    <button className="row-action"><Icon name="more" /></button>
                  </div>
                ))}
              </div>
            </article>

            <article className="pulse-card panel">
              <div className="panel-heading compact"><div><span>Market pulse</span><small>Hyperliquid, now</small></div><button className="icon-plain"><Icon name="more" /></button></div>
              <div className="pulse-score"><span className="pulse-orb"><b>74</b></span><p><strong>Constructive</strong><small>Momentum favors longs</small></p><em>+8.4%</em></div>
              <div className="signal-list">
                <div><span>Open interest</span><b>Rising</b><i className="good" /></div>
                <div><span>Funding bias</span><b>Neutral</b><i /></div>
                <div><span>Liquidation risk</span><b>Low</b><i className="good" /></div>
              </div>
              <button className="full-button secondary">Explore flow radar <Icon name="arrow" /></button>
            </article>
          </section>
        </main>
      </section>
    </div>
  )
}

export default Dashboard
