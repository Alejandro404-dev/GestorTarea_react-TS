import { useEffect, useReducer } from "react"
import tareasReducer from "../reducers/tareasReducer"
import type { Tarea } from "../types/TareasTypes"


export default function useTareas() {

  const [tareas, dispatch ] =  useReducer (tareasReducer, [], () => {
    const tareaLocalStorage = localStorage.getItem("tareas")
    return tareaLocalStorage ?( JSON.parse(tareaLocalStorage) as Tarea[] ) : []
  }) 

  useEffect(() => {  
    localStorage.setItem("tareas", JSON.stringify(tareas))
  }, [tareas] )

  const crearTarea = (tarea: Tarea ) =>{

    dispatch({type: "nueva_tarea",payload: tarea })
  }

  const editarTarea = (tareaEditada: Tarea) => {

    dispatch({type: "editar_tarea", payload: tareaEditada})
  }

  const eliminarTarea = (tareaid: string) => {
    dispatch({type: "eliminar_tarea", payload: tareaid})

  }

  return {
    tareas,
    crearTarea,
    editarTarea,
    eliminarTarea
  }
}
