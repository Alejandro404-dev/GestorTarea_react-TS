import type { Tarea } from "../types/TareasTypes"

type Action =
    { type: "nueva_tarea"; payload: Tarea }



const initialState: Tarea []= []

//recibe el estado actual del array vacio que es el inicialstate y luego una accion que devuelve un nuevo estado

function tareasReducer(state:Tarea[]= initialState, action: Action ): Tarea[] {

    if (action.type === "nueva_tarea" ) {

        console.log("Agregar tarea en el reducer",action.payload )

        return [
            ...state,
            action.payload
        ]
        
    }


    return state
}

export default tareasReducer