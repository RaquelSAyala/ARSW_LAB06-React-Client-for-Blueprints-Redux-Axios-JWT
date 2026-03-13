import apiClient from './apiClient'
import mockClient from './mockClient'

const useMock = import.meta.env.VITE_USE_MOCK === 'true'

const blueprintsService = useMock ? mockClient : apiClient

export default blueprintsService
