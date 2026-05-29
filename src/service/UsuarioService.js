import apiInstanceFunction from '../interceptor/ServicesAxiosInterceptor'

const API_BASE = process.env.REACT_APP_API_BASE || '/api'

export default class UsuarioService {
    constructor() {
        this.api = apiInstanceFunction(API_BASE)
    }

    async listadoConfig() {
        try {
            return await this.api.get('/user-config-data')
        } catch (error) {
            throw new Error(error?.response?.data?.error_usuario || 'Ha ocurrido un error al obtener los datos del usuario')
        }
    }

    async listadoDataGeneral() {
        try {
            return await this.api.get('/general-data')
        } catch (error) {
            throw new Error(error?.response?.data?.error_usuario || 'Ha ocurrido un error al obtener los datos generales')
        }
    }

    async createUser(data) {
        try {
            return await this.api.post('/crear-usuario', data)
        } catch (error) {
            throw new Error(error?.response?.data?.error_usuario || 'Ha ocurrido un error al crear el usuario')
        }
    }
}
