import { useState } from "react"
import { useTareasContext } from "../context/TareasContext"


export const Formulario = () => {

   const {tareas, crearTarea} = useTareasContext()

    const [nombre, setNombre] = useState<string>("")
    const [comienzo, setComienzo] = useState<Date>(new Date())
    const [final, setFinal] = useState<Date>(new Date)
    const [progreso, setProgreso] = useState<number>(0)
    const [modo, setModo] = useState<"Crear" | "Editar">("Crear")
    const [seleccionarTareaId, setSeleccionarTareaId] = useState<string | null>(null)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const fechaComienzoFormateada = comienzo.toISOString().split("T")[0]
        const fechafinalFormateada = final.toISOString().split("T")[0]

        const nuevaTarea = {
            id: seleccionarTareaId || Date.now.toString(),   //usa un id existente o generamos uno nuevo
            nombre,
            comienzo: fechaComienzoFormateada,
            final: fechafinalFormateada,
            progreso
        }
        console.log(nuevaTarea)

        crearTarea(nuevaTarea)


        resetearformulario()
    }

    const resetearformulario = () => {
        setNombre("")
        setComienzo(new Date())
        setFinal(new Date())
        setProgreso(0)
        setModo("Crear")
        setSeleccionarTareaId(null)
    }

    return (
        <form
            className="w-full p-4 bg-gray-700 border-2 border-blue-950 rounded shadow-md space-x-4"
            onSubmit={handleSubmit}
        >
            <div className=" flex justify-between items-center" >
                {/* Input para nuevo proyecto y select para seleccionar proyecto */}
                {modo === "Crear" ? (
                    <input
                        type="text"
                        className="bg-white w-1/4 p-2 border border-gray-300 rounded "
                        placeholder="Nombre del proyecto"
                        value={nombre}
                        required
                        onChange={(e) => setNombre(e.target.value)}
                    />
                ) : (
                    <select
                        className="bg-white w-1/4 p-2 border border-gray-300 rounded "
                        value={seleccionarTareaId || ""}
                    >
                        <option value="">-- Selecionar proyecto --</option>
                        {tareas.map( ( tarea ) => 
                        <option
                        key={tarea.id}
                        value={tarea.id}
                        >
                            {tarea.nombre}

                        </option>
                        
                        )}

                    </select>
                )}
                {/* Campo de fechas */}

                <input type="date"
                    className=" w-1/6 p-2 border-gray-300 rounded bg-white "
                    required
                    value={comienzo.toISOString().split("T")[0]}
                    onChange={(e) => setComienzo(new Date(e.target.value))}
                />
                <input type="date"
                    className=" w-1/6 p-2 border-gray-300 rounded bg-white "
                    required
                    value={final.toISOString().split("T")[0]}
                    onChange={(e) => setFinal(new Date(e.target.value))}
                />
                {/* Campo de Progreso de Proyecto o Tarea  */}

                <div className="flex items-center border border-gray-300 rounded w-32 bg-white " >
                    <input
                        type="number"
                        className="w-full p-2 border-none rounded-l "
                        placeholder="Progreso"
                        value={progreso}
                        onChange={(e) => setProgreso(Number(e.target.value))}
                    />
                    <span className="p-2 bg-gray-200 rounded-r  " >%</span>
                </div>

                {/* Botones */}

                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded "

                >
                    {modo === "Crear" ? "Crear Tarea" : "Editar Tarea"}
                </button>


                {modo === "Editar" && (
                    <button
                        type="button"
                        className=" bg-red-500 text-white p-2 rounded "
                    >
                        Eliminar
                    </button>)}

                <button
                    type="button"
                    className="bg-orange-300 p-2 rounded "
                    onClick={() => {
                        setModo(modo === "Crear" ? "Editar" : "Crear")
                    }}
                >
                    {modo === "Crear" ? "Cambiar a Editar/Elimiar" : "Cambiar a Crear"}
                </button>



            </div>
        </form>
    )
}
