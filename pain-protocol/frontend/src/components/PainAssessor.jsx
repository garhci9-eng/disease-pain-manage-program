import React, { useState, useEffect, useCallback } from 'react'
import { fetchByNRS } from '../utils/api'
import styles from './PainAssessor.module.css'

const FACES = [
  { score: 0, emoji: '😊', label: '없음' },
  { score: 2, emoji: '🙂', label: '약함' },
  { score: 4, emoji: '😐', label: '중등' },
  { score: 6, emoji: '😟', label: '불편' },
  { score: 8, emoji: '😣', label: '심함' },
  { score: 10, emoji: '😭', label: '극심' },
]

function getSeverity(score) {
  if (score === 0) return { label: '통증 없음', color: '#10b981', bg: 'rgba(16,185,129,0.06)', border: 'rgba(16,185,129,0.25)', step: '—', icon: '✅' }
  if (score <= 3) return { label: '경증 (Mild)', color: '#10b981', bg: 'rgba(16,185,129,0.06)', border: 'rgba(16,185,129,0.25)', step: 'Step 1', icon: '🟢' }
  if (score <= 6) return { label: '중등도 (Moderate)', color: '#f59e0b', bg: 'rgba(245,158,11,0.06)', border: 'rgba(245,158,11,0.25)', step: 'Step 2', icon: '🟡' }
  return { label: '중증 (Severe)', color: '#ef4444', bg: 'rgba(239,68,68,0.06)', border: 'rgba(239,68,68,0.25)', step: 'Step 3', icon: '🔴' }
}

export default function PainAssessor({ onScoreChange }) {
  const [score, setScore] = useState(0)
  const [protocol, setProtocol] = useState(null)
  const [loading, setLoading] = useState(false)

  const update = useCallback(async (val) => {
    setScore(val)
    onScoreChange?.(val)
    setLoading(true)
    try {
      const res = await fetchByNRS(val)
      setProtocol(res.data)
    } catch {
      setProtocol(null)
    } finally {
      setLoading(false)
    }
  }, [onScoreChange])

  useEffect(() => { update(0) }, [])

  const sev = getSeverity(score)
  const faceIdx = Math.min(Math.floor(score / 2), 5)

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>통증 평가</h2>
          <p className={styles.sub}>NRS · VAS · WHO 단계 자동 산출 — Numeric Rating Scale Assessment</p>
        </div>
        <div className={styles.scoreDisplay} style={{ color: sev.color }}>
          {score}
        </div>
      </div>

      {/* Face Scale */}
      <div className={styles.faceScale}>
        {FACES.map((f, i) => (
          <button
            key={f.score}
            className={`${styles.faceBtn} ${faceIdx === i ? styles.selected : ''}`}
            onClick={() => update(f.score)}
            style={faceIdx === i ? { borderColor: sev.color, background: sev.bg } : {}}
          >
            <span className={styles.faceEmoji}>{f.emoji}</span>
            <span className={styles.faceLabel}>{f.score} — {f.label}</span>
          </button>
        ))}
      </div>

      {/* Slider */}
      <div className={styles.sliderWrap}>
        <div className={styles.sliderTrack}>
          <div
            className={styles.sliderFill}
            style={{ width: `${score * 10}%`, background: `linear-gradient(to right, #10b981, ${score > 6 ? '#ef4444' : score > 3 ? '#f59e0b' : '#10b981'})` }}
          />
          <input
            type="range" min="0" max="10" value={score}
            className={styles.slider}
            onChange={(e) => update(parseInt(e.target.value))}
          />
        </div>
        <div className={styles.ticks}>
          {Array.from({ length: 11 }, (_, i) => (
            <button key={i} className={styles.tick} onClick={() => update(i)}>
              {i}
            </button>
          ))}
        </div>
      </div>

      {/* Severity Band */}
      <div className={styles.severityBand} style={{ background: sev.bg, borderColor: sev.border, color: sev.color }}>
        <span className={styles.sevIcon}>{sev.icon}</span>
        <div>
          <div className={styles.sevLabel}>{sev.label} — NRS {score}</div>
          <div className={styles.sevDesc}>
            {loading ? '조회 중...' : protocol?.recommendation?.message || '평가 점수를 선택하세요'}
          </div>
        </div>
        <div className={styles.stepBadge} style={{ color: sev.color, borderColor: sev.border }}>
          {sev.step}
        </div>
      </div>

      {/* Stats Row */}
      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>NRS 점수</div>
          <div className={styles.statValue} style={{ color: sev.color }}>{score} / 10</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>VAS 추정치</div>
          <div className={styles.statValue} style={{ color: 'var(--accent)' }}>{Math.round(score * 9.5)} mm</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>WHO 단계</div>
          <div className={styles.statValue} style={{ color: 'var(--accent2)' }}>{sev.step}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>통증 강도</div>
          <div className={styles.statValue} style={{ fontSize: '1rem', color: sev.color }}>{sev.label}</div>
        </div>
      </div>

      <div className="alert alert-info" style={{ marginTop: '1rem' }}>
        ℹ️ &nbsp;인지기능 저하 환자에는 <strong>CPOT</strong> 또는 <strong>FLACC</strong>를 병행하십시오. 소아(3–7세)에는 <strong>Wong-Baker FACES</strong>를 우선 적용합니다.
      </div>
    </div>
  )
}
