import React, { useState } from 'react'
import PainAssessor from './components/PainAssessor'
import ProtocolView from './components/ProtocolView'
import WHOLadder from './components/WHOLadder'
import EquiTable from './components/EquiTable'
import Checklist from './components/Checklist'
import DrugSearch from './components/DrugSearch'
import styles from './styles/App.module.css'

const NAV = [
  { id: 'assess', label: '통증 평가', sub: 'NRS / VAS', dot: '#3b82f6', icon: '📊' },
  { id: 'who', label: 'WHO 계단', sub: '3-Step Ladder', dot: '#06b6d4', icon: '🪜' },
  { id: 'protocols', label: '처방 프로토콜', sub: 'Drug Protocols', dot: '#8b5cf6', icon: '💊' },
  { id: 'search', label: '약물 검색', sub: 'Drug Search', dot: '#ec4899', icon: '🔍' },
  { id: 'equi', label: '동등 용량표', sub: 'Equianalgesic', dot: '#f59e0b', icon: '⚖️' },
  { id: 'checklist', label: '체크리스트', sub: 'Pre-Rx Check', dot: '#10b981', icon: '✅' },
]

export default function App() {
  const [active, setActive] = useState('assess')
  const [nrsScore, setNrsScore] = useState(0)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const renderContent = () => {
    switch (active) {
      case 'assess': return <PainAssessor onScoreChange={setNrsScore} />
      case 'who': return <WHOLadder />
      case 'protocols': return <ProtocolView activeStep={nrsScore} />
      case 'search': return <DrugSearch />
      case 'equi': return <EquiTable />
      case 'checklist': return <Checklist />
      default: return null
    }
  }

  return (
    <div className={styles.app}>
      {/* HEADER */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <button className={styles.menuBtn} onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>🩺</div>
            <div>
              <div className={styles.logoText}>통증 관리 프로토콜</div>
              <span className={styles.logoSub}>Pain Management Manual v2.1</span>
            </div>
          </div>
        </div>
        <div className={styles.headerRight}>
          <span className={styles.badge}>임상 참조용 · Clinical Reference</span>
        </div>
      </header>

      <div className={styles.layout}>
        {/* SIDEBAR */}
        <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
          <div className={styles.navLabel}>도구 / Tools</div>
          {NAV.map(n => (
            <button
              key={n.id}
              className={`${styles.navItem} ${active === n.id ? styles.navActive : ''}`}
              onClick={() => { setActive(n.id); setSidebarOpen(false) }}
            >
              <span className={styles.navDot} style={{ background: n.dot }} />
              <span className={styles.navIcon}>{n.icon}</span>
              <div className={styles.navText}>
                <span className={styles.navLabel2}>{n.label}</span>
                <span className={styles.navSub}>{n.sub}</span>
              </div>
            </button>
          ))}

          <div className={styles.sidebarFooter}>
            <div className={styles.footerLine}>
              <span className={styles.footerDot} style={{ background: '#10b981' }} />
              API 연결됨
            </div>
            <div className={styles.footerDisclaimer}>
              ⚠️ 공익 목적 전용<br />For public interest only
            </div>
          </div>
        </aside>

        {/* OVERLAY */}
        {sidebarOpen && <div className={styles.overlay} onClick={() => setSidebarOpen(false)} />}

        {/* MAIN */}
        <main className={styles.main}>
          <div key={active} className="animate-up">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  )
}
