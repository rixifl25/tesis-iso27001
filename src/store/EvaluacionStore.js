import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import EvaluacionService from '../service/EvaluacionService'

const evaluacionService = new EvaluacionService()

// Thunks asíncronos para las solicitudes API
export const getEvaluaciones = createAsyncThunk('evaluaciones/getEvaluaciones', async () => {
    const response = await evaluacionService.getEvaluaciones()
    return response.data
})

export const guardarEvaluacion = createAsyncThunk('evaluaciones/guardarEvaluacion', async (data) => {
    const response = await evaluacionService.guardarEvaluacion(data)
    return response.data
})

// Crear el slice
const evaluacionesSlice = createSlice({
    name: 'evaluaciones',
    initialState: {
        nombre: '',
        isLoading: true,
        evaluaciones: null,
        categoriasAnalisisGraphic: null,
        categoriasAnalisisGeneralGraphic: null,
        categoriasRadarGeneralGraphic: null,
        categoriasBarGeneralGraphic: null,
        controlesLinearGraphic: null,
        alternativas_marcadas: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Manejo de getEvaluaciones
            .addCase(getEvaluaciones.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getEvaluaciones.fulfilled, (state, action) => {
                state.isLoading = false
                state.evaluaciones = action.payload.data.assesments
                const categoriasAnalisisGraphic = []
                const categoriasAnalisisGeneralGraphic = {
                    labels: [],
                    values: [],
                    total: 0
                }
                const categoriasRadarGeneralGraphic = []
                const categoriasBarGeneralGraphic = []
                const controlesLinearGraphic = []
                const alternativas_marcadas = []
                state.evaluaciones.forEach((evaluacion, index) => {
                    const evaluacionLabel = `Evaluación ${index + 1}`
                    controlesLinearGraphic.push({
                        code: evaluacionLabel,
                        controles: []
                    })
                    categoriasAnalisisGeneralGraphic.labels.push(evaluacionLabel)
                    categoriasAnalisisGeneralGraphic.values.push(evaluacion.resultados.puntaje_total.toFixed(2) * 100)
                    categoriasAnalisisGeneralGraphic.total += (evaluacion.resultados.puntaje_total.toFixed(2) * 100)
                    if (!categoriasRadarGeneralGraphic.find(categoria => categoria.code === evaluacionLabel)) {
                        categoriasRadarGeneralGraphic.push({
                            code: evaluacionLabel,
                            labels: [],
                            values: []
                        })
                    }
                    if (!categoriasBarGeneralGraphic.find(categoria => categoria.code === evaluacionLabel)) {
                        categoriasBarGeneralGraphic.push({
                            code: evaluacionLabel,
                            labels: [],
                            values: []
                        })
                    }
                    alternativas_marcadas.push({
                        code: evaluacionLabel,
                        alternativas_marcadas: evaluacion.alternativas_marcadas.alternativas_marcadas
                    })
                    const barCategoria = categoriasBarGeneralGraphic.find(categoria => categoria.code === evaluacionLabel)
                    const radarCategoria = categoriasRadarGeneralGraphic.find(categoria => categoria.code === evaluacionLabel)
                    const controlesLinear = controlesLinearGraphic.find(categoria => categoria.code === evaluacionLabel)
                    evaluacion.resultados.resultados.forEach(resultado => {
                        if (!categoriasAnalisisGraphic.find(categoria => categoria.code === resultado.codigo_categoria)) {
                            categoriasAnalisisGraphic.push({
                                code: resultado.codigo_categoria,
                                labels: [],
                                values: [],
                                total: 0
                            })
                        }
                        const categoria = categoriasAnalisisGraphic.find(categoria => categoria.code === resultado.codigo_categoria)
                        categoria.labels.push(evaluacionLabel)
                        categoria.values.push(resultado.puntaje.toFixed(2) * 100)
                        categoria.total += (resultado.puntaje.toFixed(2) * 100)
                        radarCategoria.labels.push(resultado.codigo_categoria)
                        radarCategoria.values.push(resultado.puntaje.toFixed(2) * 100)
                        controlesLinear.controles.push(...resultado.controles)
                        resultado.controles.forEach(control => {
                            barCategoria.labels.push(control.codigo_control)
                            barCategoria.values.push(control.puntaje.toFixed(2) * 100)
                        })
                    })
                })
                state.categoriasAnalisisGraphic = categoriasAnalisisGraphic
                state.categoriasAnalisisGeneralGraphic = categoriasAnalisisGeneralGraphic
                state.categoriasRadarGeneralGraphic = categoriasRadarGeneralGraphic
                state.categoriasBarGeneralGraphic = categoriasBarGeneralGraphic
                state.controlesLinearGraphic = controlesLinearGraphic
                state.alternativas_marcadas = alternativas_marcadas
            })
            .addCase(getEvaluaciones.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
            // Manejo de guardarEvaluacion
            .addCase(guardarEvaluacion.pending, (state) => {
                state.isLoading = true
            })
            .addCase(guardarEvaluacion.fulfilled, (state) => {
                state.isLoading = false
            })
            .addCase(guardarEvaluacion.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
    }
})

export default evaluacionesSlice.reducer

