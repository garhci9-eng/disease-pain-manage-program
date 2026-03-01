import React, { useState, useEffect } from 'react'
import { fetchEquianalgesic } from '../utils/api'
import styles from './EquiTable.module.css'

export default function EquiTable() {
  const [data, setData] = useState([])
  const [note, setNote] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEquianalgesic()
      .then(res => { setData(res.data.data); setNote(res.data.note) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className={styles.wrap}>
      <h2 className={styles.title}>동등 진통 용량표</h2>
      <p className={styles.sub}>오피오이드 전환 참조 — Opioid Equianalgesic Dose Reference Table</p>
      <p className={styles.basis}>기준: 모르핀 경구 30 mg / 정주 10 mg (Reference: Morphine PO 30 mg / IV 10 mg)</p>

      <div className="alert alert-danger" style={{ marginBottom: '1.25rem' }}>
        🚨 &nbsp;<strong>임상 경고:</strong> 동등 용량은 참고치에 불과합니다. 오피오이드 교체 시 <strong>불완전 교차 내성</strong>으로 인해 계산 용량의 <strong>25–50% 감량</strong> 후 시작하고 반드시 재적정하십시오.
      </div>

      {loading ? (
        <div className={styles.loading}>로딩 중...</div>
      ) : (
        <div className={styles.tableWrap}>
          <table>
            <thead>
              <tr>
                <th>약물</th>
                <th>경구 용량 (PO)</th>
                <th>정주 용량 (IV)</th>
                <th>경구:정주 비율</th>
                <th>비고</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr key={i} className={row.highlight ? styles.highlightRow : ''}>
                  <td className={styles.drugCell}>
                    {row.highlight && <span className={styles.refBadge}>기준</span>}
                    {row.drug}
                  </td>
                  <td className={styles.doseCell}>{row.po}</td>
                  <td className={styles.doseCell}>{row.iv}</td>
                  <td><span className={styles.ratio}>{row.ratio}</span></td>
                  <td className={styles.noteCell}>{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="alert alert-info" style={{ marginTop: '1rem' }}>
        💡 &nbsp;<strong>전환 공식:</strong> 새 약물 일일 용량 = (현재 약물 총량 ÷ 현재 동등 용량) × 새 약물 동등 용량 × <strong>0.5–0.75</strong>
      </div>

      <div className={styles.conversionBox}>
        <ConversionCalculator data={data} />
      </div>
    </div>
  )
}

function ConversionCalculator({ data }) {
  const [fromDrug, setFromDrug] = useState('')
  const [fromDose, setFromDose] = useState('')
  const [toDrug, setToDrug] = useState('')
  const [result, setResult] = useState(null)

  // Simple reference map
  const equiMap = {
    '모르핀 (Morphine)': { po: 30, iv: 10 },
    '옥시코돈 (Oxycodone)': { po: 20, iv: 10 },
    '하이드로모르폰 (Hydromorphone)': { po: 7.5, iv: 1.5 },
    '코데인 (Codeine)': { po: 200, iv: 120 },
    '트라마돌 (Tramadol)': { po: 300, iv: 300 },
  }

  const drugs = Object.keys(equiMap)

  const calculate = () => {
    const dose = parseFloat(fromDose)
    if (!fromDrug || !toDrug || !dose) return
    const from = equiMap[fromDrug]
    const to = equiMap[toDrug]
    if (!from || !to) return
    const mmePerDay = (dose / from.po) * 30
    const rawDose = (mmePerDay / 30) * to.po
    const conservativeDose = rawDose * 0.75
    setResult({ raw: rawDose.toFixed(1), conservative: conservativeDose.toFixed(1), mme: mmePerDay.toFixed(1) })
  }

  return (
    <div className={styles.calcWrap}>
      <div className={styles.calcTitle}>
        <span className="tag tag-blue">β</span>
        간이 전환 계산기 / Quick Conversion Calculator
      </div>
      <div className={styles.calcGrid}>
        <div className={styles.calcGroup}>
          <label className={styles.calcLabel}>현재 약물 (From)</label>
          <select className={styles.calcSelect} value={fromDrug} onChange={e => setFromDrug(e.target.value)}>
            <option value="">선택</option>
            {drugs.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
        <div className={styles.calcGroup}>
          <label className={styles.calcLabel}>일일 용량 mg/day</label>
          <input
            type="number" className={styles.calcInput} value={fromDose}
            onChange={e => setFromDose(e.target.value)} placeholder="예: 60"
          />
        </div>
        <div className={styles.calcGroup}>
          <label className={styles.calcLabel}>전환 약물 (To)</label>
          <select className={styles.calcSelect} value={toDrug} onChange={e => setToDrug(e.target.value)}>
            <option value="">선택</option>
            {drugs.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
        <button className={styles.calcBtn} onClick={calculate}>계산</button>
      </div>
      {result && (
        <div className={styles.calcResult}>
          <div className={styles.resultRow}>
            <span>MME (Morphine Milligram Equivalents)</span>
            <span className={styles.resultValue}>{result.mme} mg/day</span>
          </div>
          <div className={styles.resultRow}>
            <span>이론 전환 용량</span>
            <span className={styles.resultValue}>{result.raw} mg/day</span>
          </div>
          <div className={styles.resultRow} style={{ color: '#fcd34d' }}>
            <span>⚠️ 권장 시작 용량 (25% 감량)</span>
            <span className={styles.resultValue}>{result.conservative} mg/day</span>
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: '0.5rem' }}>
            * 이 계산기는 참고용입니다. 반드시 임상적 판단과 재적정을 병행하십시오.
          </div>
        </div>
      )}
    </div>
  )
}
