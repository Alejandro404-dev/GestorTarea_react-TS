import { createContext, useContext, type ReactNode,   } from "react"
import useTareas from "../hooks/useTareas"
import type { Tarea } from "../types/TareasTypes"

interface TareasContextType{
    tareas: Tarea[]
    crearTarea: (tarea: Tarea) => void
}


const TareasContext = createContext<TareasContextType | undefined>(undefined)

export const  TareasProvaider =({ children }: {children: ReactNode } ) => {

    const { tareas, crearTarea} = useTareas()
    return(
        <TareasContext.Provider
            value= {{ tareas,crearTarea }}
        
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