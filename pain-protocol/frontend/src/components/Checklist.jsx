import React, { useState, useEffect } from 'react'
import { fetchChecklist } from '../utils/api'
import styles from './Checklist.module.css'

function CheckGroup({ title, items, checked, onToggle }) {
  const doneCount = items.filter(i => checked[i.id]).length

  return (
    <div className={styles.group}>
      <div className={styles.groupHeader}>
        <span className={styles.groupTitle}>{title}</span>
        <span className={styles.groupProgress} style={{ color: doneCount === items.length ? 'var(--success)' : 'var(--muted)' }}>
          {doneCount} / {items.length}
        </span>
      </div>
      <div className={styles.list}>
        {items.map(item => (
          <div
            key={item.id}
            className={`${styles.item} ${checked[item.id] ? styles.done : ''}`}
            onClick={() => onToggle(item.id)}
          >
            <div className={`${styles.box} ${checked[item.id] ? styles.boxDone : ''}`}>
              {checked[item.id] && '✓'}
            </div>
            <div>
              <div className={styles.itemText}>{item.text}</div>
              <div className={styles.itemSub}>{item.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Checklist() {
  const [data, setData] = useState(null)
  const [checked, setChecked] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchChecklist()
      .then(res => setData(res.data.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const toggle = (id) => setChecked(prev => ({ ...prev, [id]: !prev[id] }))
  const reset = () => setChecked({})

  const allItems = data ? [...(data.basic || []), ...(data.opioid || []), ...(data.special || [])] : []
  const doneCount = allItems.filter(i => checked[i.id]).length
  const pct = allItems.length ? Math.round((doneCount / allItems.length) * 100) : 0

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>처방 전 체크리스트</h2>
          <p className={styles.sub}>진통제 처방 전 임상 안전 확인 항목 — Pre-Prescribing Safety Checklist</p>
        </div>
        <button className={styles.resetBtn} onClick={reset}>초기화</button>
      </div>

      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: `${pct}%`, background: pct === 100 ? 'var(--success)' : 'var(--accent)' }} />
      </div>
      <div className={styles.progressLabel}>
        {doneCount} / {allItems.length} 항목 완료 ({pct}%)
      </div>

      {loading ? (
        <div className={styles.loading}>로딩 중...</div>
      ) : data && (
        <>
          <CheckGroup title="▸ 기본 평가 / Basic Assessment" items={data.basic} checked={checked} onToggle={toggle} />
          <CheckGroup title="▸ 오피오이드 처방 시 추가 확인 / Opioid-specific" items={data.opioid} checked={checked} onToggle={toggle} />
          <CheckGroup title="▸ 특수 환자군 / Special Populations" items={data.special} checked={checked} onToggle={toggle} />
        </>
      )}

      {pct === 100 && (
        <div className="alert alert-success" style={{ marginTop: '1rem' }}>
          ✅ &nbsp;모든 항목이 확인되었습니다. 처방을 진행하십시오.
        </div>
      )}
    </div>
  )
}
