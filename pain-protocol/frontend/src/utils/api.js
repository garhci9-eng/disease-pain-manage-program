import axios from 'axios'

const api = axios.create({ baseURL: '/api', timeout: 10000 })

export const fetchByNRS = (score) => api.get(`/protocols/nrs/${score}`)
export const fetchAllProtocols = () => api.get('/protocols')
export const fetchEquianalgesic = () => api.get('/equianalgesic')
export const fetchChecklist = () => api.get('/checklist')
export const fetchWHOLadder = () => api.get('/who-ladder')
export const searchDrugs = (q) => api.get(`/drugs/search?q=${encodeURIComponent(q)}`)

export default api
