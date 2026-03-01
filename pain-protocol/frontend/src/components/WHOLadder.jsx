import React from 'react'
import styles from './WHOLadder.module.css'

const LADDER = [
  {
    step: 1, color: '#10b981', range: 'NRS 1–3', label: '경증 / Mild',
    drugs: ['아세트아미노펜', 'NSAIDs', 'COX-2 억제제', '± 보조 진통제'],
    note: '비오피오이드 단독'
  },
  {
    step: 2, color: '#f59e0b', range: 'NRS 4–6', label: '중등도 / Moderate',
    drugs: ['트라마돌', '코데인', '하이드로코돈', '+ 비오피오이드', '± 보조 진통제'],
    note: '약한 오피오이드 + 비오피오이드'
  },
  {
    step: 3, color: '#ef4444', range: 'NRS 7–10', label: '중증 / Severe',
    drugs: ['모르핀', '옥시코돈', '펜타닐', '하이드로모르폰', '메타돈'],
    note: '강한 오피오이드 + 복합 치료'
  },
]

const PRINCIPLES = [
  { icon: '💊', title: 'By mouth', desc: '가능한 경구 투여 우선' },
  { icon: '⏰', title: 'By the clock', desc: '규칙적 시간 투여 (PRN ×)' },
  { icon: '🪜', title: 'By the ladder', desc: '통증 강도에 맞는 단계' },
  { icon: '👤', title: 'For the individual', desc: '환자 개인화 맞춤 처방' },
]

export default function WHOLadder() {
  return (
    <div className={styles.wrap}>
      <h2 className={styles.title}>WHO 진통제 계단</h2>
      <p className={styles.sub}>세계보건기구 3단계 진통 원칙 — WHO 3-Step Analgesic Ladder (1986, updated)</p>

      <div className={styles.ladder}>
        {LADDER.map((s) => (
          <div key={s.step} className={styles.step} style={{ borderColor: `${s.color}35`, background: `${s.color}06` }}>
            <div className={styles.stepLeft}>
              <div className={styles.stepNum} style={{ color: s.color }}>{s.step}</div>
              <div className={styles.stepRange} style={{ background: `${s.color}15`, color: s.color }}>{s.range}</div>
            </div>
            <div className={styles.stepContent}>
              <div className={styles.stepLabel}>{s.label}</div>
              <div className={styles.stepNote}>{s.note}</div>
              <div className={styles.pillList}>
                {s.drugs.map((d, i) => (
                  <span key={i} className={styles.pill} style={{ color: s.color, borderColor: `${s.color}35` }}>{d}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.principles}>
        <div className={styles.principlesTitle}>4가지 핵심 원칙 / Four Core Principles</div>
        <div className={styles.principleGrid}>
          {PRINCIPLES.map((p, i) => (
            <div key={i} className={styles.principle}>
              <div className={styles.principleIcon}>{p.icon}</div>
              <div className={styles.principleTitle}>{p.title}</div>
              <div className={styles.principleDesc}>{p.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="alert alert-info">
        💡 &nbsp;WHO 계단은 반드시 순서대로 올라갈 필요가 없습니다. <strong>통증 강도에 맞는 단계에서 즉시 시작</strong>하는 것이 권장됩니다. (중증 통증 = Step 3에서 바로 시작)
      </div>
    </div>
  )
}
