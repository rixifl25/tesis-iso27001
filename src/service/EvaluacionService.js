import apiInstanceFunction from '../interceptor/ServicesAxiosInterceptor'

const API_BASE = process.env.REACT_APP_API_BASE || '/api'
const STORAGE_KEY = 'tesis_evaluaciones'

export default class EvaluacionService {
    constructor() {
        this.api = apiInstanceFunction(API_BASE)
    }

    async getEvaluaciones() {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
        return { data: { data: { assesments: saved } } }
    }

    async guardarEvaluacion(data) {
        try {
            // La API calcula los puntajes con la lógica real del backend
            const response = await this.api.post('/guardar-evaluacion', data)
            const evaluation = response.data.evaluation

            // Guardamos la evaluación calculada en localStorage
            const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
            saved.push(evaluation)
            localStorage.setItem(STORAGE_KEY, JSON.stringify(saved))

            return response
        } catch (error) {
            throw new Error(error?.response?.data?.error_usuario || 'Ha ocurrido un error al guardar la evaluación')
        }
    }
}
