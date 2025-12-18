import { useReducer } from "react"
import tareasReducer from "../reducers/tareasReducer"
import type { Tarea } from "../types/TareasTypes"


export default function useTareas() {

  const [tareas, dispatch ] =  useReducer (tareasReducer, []) //arreglo vacio =initialState

  const crearTarea = (tarea: Tarea ) =>{

    dispatch({type: "nueva_tarea",payload: tarea })
  }

  return {
    tareas,
    crearTarea
  }
}
