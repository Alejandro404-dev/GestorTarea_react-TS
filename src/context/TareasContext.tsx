import { createContext, useContext, type ReactNode,   } from "react"
import useTareas from "../hooks/useTareas"
import type { Tarea } from "../types/TareasTypes"

interface TareasContextType{
    tareas: Tarea[]
    crearTarea: (tarea: Tarea) => void
    editarTarea: (tarea: Tarea) => void
    eliminarTarea: (tareaid: string) => void
}


const TareasContext = createContext<TareasContextType | undefined>(undefined)

export const  TareasProvaider =({ children }: {children: ReactNode } ) => {

    const { tareas, crearTarea, editarTarea, eliminarTarea } = useTareas()
    return(
        <TareasContext.Provider
            value= {{ tareas,crearTarea, editarTarea, eliminarTarea }}
        
        >
            {children}
        </TareasContext.Provider >
    )
}


export const useTareasContext = () =>{
    const context = useContext(TareasContext)

    if (!context) {
        throw new Error("useTareasContext debe ser usado dentri de un provaider")
        
    }
    return context
}