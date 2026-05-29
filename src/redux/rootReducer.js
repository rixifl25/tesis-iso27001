// ** Reducers Imports
import { combineReducers } from '@reduxjs/toolkit'
import layout from "./layout"
import navbar from "./navbar"
import EvaluacionStore from "../store/EvaluacionStore"
import UsuarioConfigStore from "../store/UsuarioConfigStore"
const rootReducer = combineReducers({
    navbar,
    layout,
    EvaluacionStore,
    UsuarioConfigStore
})

export default rootReducer
