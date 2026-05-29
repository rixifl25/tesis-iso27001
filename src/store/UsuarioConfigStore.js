import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import UsuarioService from '../service/UsuarioService'

const usuarioService = new UsuarioService()

// Thunks asíncronos para las solicitudes API
export const getUserConfig = createAsyncThunk('userConfig/getUserConfig', async () => {
    const response = await usuarioService.listadoConfig()
    return response.data
})

export const getGeneralData = createAsyncThunk('userConfig/getGeneralData', async () => {
    const response = await usuarioService.listadoDataGeneral()
    return response.data
})

export const crearUsuario = createAsyncThunk('userConfig/crearUsuario', async (data) => {
    const response = await usuarioService.createUser(data)
    return response.data
})
// Crear el slice
const userConfigSlice = createSlice({
    name: 'userConfig',
    initialState: {
        nombre: '',
        isLoading: true,
        generalData: null,
        configData: null,
        user: null,
        controls: null,
        categorias: null,
        propuestas: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Manejo de getUserConfig
            .addCase(getUserConfig.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getUserConfig.fulfilled, (state, action) => {
                state.isLoading = false
                state.configData = action.payload
                state.user = action.payload.data.user
            })
            .addCase(getUserConfig.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
            // Manejo de getGeneralData
            .addCase(getGeneralData.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getGeneralData.fulfilled, (state, action) => {
                state.isLoading = false
                state.generalData = action.payload
                state.categorias = action.payload.categorias
                state.controls = action.payload.categorias.flatMap(categoria => categoria.controles)
                state.propuestas = action.payload.propuestas
            })
            .addCase(getGeneralData.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
            // Manejo de crearUsuario
            .addCase(crearUsuario.pending, (state) => {
                state.isLoading = true
            })
            .addCase(crearUsuario.fulfilled, (state) => {
                state.isLoading = false
            })
            .addCase(crearUsuario.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
    }
})

export default userConfigSlice.reducer

