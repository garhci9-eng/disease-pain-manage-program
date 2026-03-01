import React, { useState, useCallback, useRef } from 'react'
import { searchDrugs } from '../utils/api'
import styles from './DrugSearch.module.css'

export default function DrugSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const debounceRef = useRef(null)

  const doSearch = useCallback(async (q) => {
    if (!q.trim()) { setResults([]); setSearched(false); return }
    setLoading(true)
    try {
      const res = await searchDrugs(q)
      setResults(res.data.results)
      setSearched(true)
    } catch {
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [])

  const handleChange = (e) => {
    const val = e.target.value
    setQuery(val)
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => doSearch(val), 350)
  }

  const stepColors = { 1: '#10b981', 2: '#f59e0b', 3: '#ef4444' }

  return (
    <div className={styles.wrap}>
      <h2 className={styles.title}>약물 검색</h2>
      <p className={styles.sub}>약물명 또는 성분명으로 검색 — Drug Name Search</p>

      <div className={styles.searchBox}>
        <span className={styles.searchIcon}>🔍</span>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="약물명 입력 (예: 모르핀, tramadol, 타이레놀...)"
          value={query}
          onChange={handleChange}
          autoComplete="off"
        />
        {loading && <span className={styles.spinner} />}
      </div>

      {searched && (
        <div className={styles.results}>
          {results.length === 0 ? (
            <div className={styles.empty}>
              <span style={{ fontSize: '1.5rem' }}>🔍</span>
              <p>'{query}'에 해당하는 약물이 없습니다.</p>
            </div>
          ) : (
            <>
              <div className={styles.resultCount}>{results.length}개 결과</div>
              {results.map((r, i) => (
                <div key={i} className={styles.resultCard}>
                  <div className={styles.resultTop}>
                    <div className={styles.resultName}>{r.brand}</div>
                    <span className={`tag tag-${r.step === 1 ? 'green' : r.step === 2 ? 'yellow' : 'red'}`}>
                      Step {r.step}
                    </span>
                  </div>
                  {r.generic && <div className={styles.resultGeneric}>{r.generic}</div>}
                  <div className={styles.resultCategory}>{r.category}</div>
                  <div className={styles.resultDetails}>
                    {r.dose && <span><span className={styles.detailLabel}>용량</span> <span className={styles.detailValue}>{r.dose}</span></span>}
                    {r.interval && <span><span className={styles.detailLabel}>간격</span> <span className={styles.detailValue}>{r.interval}</span></span>}
                    {r.route && <span><span className="tag tag-cyan">{r.route}</span></span>}
                  </div>
                  {r.notes && <div className={styles.resultNote}>💬 {r.notes}</div>}
                </div>
              ))}
            </>
          )}
        </div>
      )}

      <div className={styles.quickChips}>
        <span className={styles.chipsLabel}>빠른 검색:</span>
        {['모르핀', '트라마돌', '타이레놀', 'NSAIDs', '펜타닐', '옥시코돈'].map(s => (
          <button key={s} className={styles.chip} onClick={() => { setQuery(s); doSearch(s) }}>{s}</button>
        ))}
      </div>
    </div>
  )
}
