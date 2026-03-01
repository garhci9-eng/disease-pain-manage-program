import React, { useState, useEffect } from 'react'
import { fetchAllProtocols } from '../utils/api'
import styles from './ProtocolView.module.css'

function DrugCard({ drug }) {
  const [open, setOpen] = useState(false)

  return (
    <div className={`${styles.card} ${open ? styles.open : ''}`}>
      <button className={styles.cardHeader} onClick={() => setOpen(!open)}>
        <div className={styles.cardLeft}>
          <span className="tag tag-blue">{drug.category}</span>
          <div>
            <div className={styles.cardTitle}>{drug.name}</div>
            {drug.mechanism && <div className={styles.cardMechanism}>{drug.mechanism}</div>}
          </div>
        </div>
        <span className={styles.chevron}>{open ? '▾' : '▸'}</span>
      </button>

      {open && (
        <div className={styles.cardBody}>
          {drug.items?.length > 0 && (
            <div className={styles.tableWrap}>
              <table className="drug-table">
                <thead>
                  <tr>
                    <th>약물명</th>
                    <th>용량</th>
                    <th>투여 간격</th>
                    <th>최대 일일 용량</th>
                    <th>투여 경로</th>
                    <th>비고</th>
                  </tr>
                </thead>
                <tbody>
                  {drug.items.map((item, i) => (
                    <tr key={i}>
                      <td>
                        <div className={styles.drugName}>{item.brand}</div>
                        {item.generic && <div className={styles.drugGeneric}>{item.generic}</div>}
                      </td>
                      <td><span className={styles.dose}>{item.dose}</span></td>
                      <td>{item.interval}</td>
                      <td>{item.maxDaily || '—'}</td>
                      <td><span className="tag tag-cyan">{item.route || '—'}</span></td>
                      <td className={styles.noteCell}>{item.notes || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {drug.warnings?.length > 0 && (
            <div className={`alert alert-warn ${styles.alertSpacing}`}>
              <span>⚠️</span>
              <div>
                {drug.warnings.map((w, i) => <div key={i}>{w}</div>)}
              </div>
            </div>
          )}

          {drug.contraindications?.length > 0 && (
            <div className={`alert alert-danger ${styles.alertSpacing}`}>
              <span>🚫</span>
              <div>
                <strong>금기:</strong> {drug.contraindications.join(' · ')}
              </div>
            </div>
          )}

          {drug.antidote && (
            <div className={`alert alert-danger ${styles.alertSpacing}`}>
              🚨 &nbsp;<strong>해독제 / Antidote:</strong> {drug.antidote.name} — {drug.antidote.dose} (최대 {drug.antidote.maxDose})
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function StepSection({ protocol, active }) {
  const stepColors = { 1: '#10b981', 2: '#f59e0b', 3: '#ef4444' }
  const color = stepColors[protocol.level]

  return (
    <div className={`${styles.stepSection} ${active ? 'animate-up' : ''}`}>
      <div className={styles.stepHeader} style={{ borderColor: `${color}40` }}>
        <div className={styles.stepNum} style={{ color }}>Step {protocol.level}</div>
        <div>
          <div className={styles.stepLabel}>{protocol.label}</div>
          <div className={styles.stepRange}>
            NRS {protocol.nrsRange[0]}–{protocol.nrsRange[1]} &nbsp;/&nbsp; VAS {protocol.vasRange[0]}–{protocol.vasRange[1]} mm
          </div>
        </div>
        <div className={styles.stepDot} style={{ background: color }} />
      </div>

      <div className={styles.drugList}>
        {protocol.drugs.map((drug, i) => (
          <DrugCard key={i} drug={drug} />
        ))}
      </div>
    </div>
  )
}

export default function ProtocolView({ activeStep }) {
  const [protocols, setProtocols] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    fetchAllProtocols()
      .then(res => setProtocols(res.data.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const filtered = selected !== null
    ? protocols.filter(p => p.level === selected)
    : protocols

  if (loading) return (
    <div className={styles.loading}>
      <div className={styles.loadingDot} />
      <span>프로토콜 로딩 중...</span>
    </div>
  )

  return (
    <div>
      <div className={styles.topBar}>
        <div>
          <h2 className={styles.pageTitle}>처방 프로토콜</h2>
          <p className={styles.pageSub}>WHO 3단계 진통제 계단 기반 처방 가이드 — WHO Analgesic Ladder Protocol</p>
        </div>
        <div className={styles.stepFilter}>
          {[null, 1, 2, 3].map(s => (
            <button
              key={s}
              className={`${styles.filterBtn} ${selected === s ? styles.filterActive : ''}`}
              onClick={() => setSelected(s)}
            >
              {s === null ? '전체' : `Step ${s}`}
            </button>
          ))}
        </div>
      </div>

      {activeStep && activeStep > 0 && (
        <div className="alert alert-info" style={{ marginBottom: '1.25rem' }}>
          💡 &nbsp;현재 평가된 통증 점수(NRS {activeStep > 6 ? '7–10' : activeStep > 3 ? '4–6' : '1–3'})에 해당하는 프로토콜이 표시됩니다.
        </div>
      )}

      {filtered.map((p, i) => (
        <StepSection key={p.level} protocol={p} active={i === 0} />
      ))}
    </div>
  )
}
