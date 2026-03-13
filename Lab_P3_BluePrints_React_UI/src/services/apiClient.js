import axios from 'axios'

const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  timeout: 8000,
})

apiInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

apiInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.status === 401) {
      localStorage.removeItem('token')
    }
    return Promise.reject(err)
  },
)

const apiClient = {
  getAll: () => apiInstance.get('/blueprints'),
  getByAuthor: (author) => apiInstance.get(`/blueprints/${encodeURIComponent(author)}`),
  getByAuthorAndName: (author, name) =>
    apiInstance.get(`/blueprints/${encodeURIComponent(author)}/${encodeURIComponent(name)}`),
  create: (blueprint) => apiInstance.post('/blueprints', blueprint),
  // Auth method
  login: (credentials) => apiInstance.post('/auth/login', credentials),
}

export default apiClient

