import axios from "axios"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const apiInstanceFunction = (url_api) => {
    const apiInstance = axios.create({ baseURL: url_api })

    apiInstance.interceptors.request.use(
        async (request) => {
            const token = localStorage.getItem('authToken')
            if (token) {
                request.headers.Authorization = `Bearer ${token}`
            }
            return request
        },
        (err) => err
    )

    apiInstance.interceptors.response.use(
        (response) => response,
        async (error) => {
            if (error.response?.status === 403) {
                MySwal.fire({
                    icon: 'warning',
                    title: 'Seguridad',
                    text: 'No tiene acceso al recurso.'
                })
            }
            if (error.response?.status === 401) {
                localStorage.clear()
                location.href = location.origin
            }
            return Promise.reject(error)
        }
    )
    return apiInstance
}

export default apiInstanceFunction
