import { useEffect, useState } from "react"
import { FrappeGantt, ViewMode, type Task } from "react-frappe-gantt"
import { useTareasContext } from "../context/TareasContext"
import Modal from "./Modal"


export const GanttTareas = () => {

    const { tareas } = useTareasContext()

    const [tareasGantt, setTareasGantt] = useState<Task[]>([])
    const [modoVista, setModoVista] = useState(ViewMode.Month)
    const [seleccionTarea, setSeleccionTarea] = useState<Task | null>(null)


    useEffect(() => {

        const tareasValidas = tareas.filter((tarea) => tarea.comienzo && tarea.final)

        const tareasMapeadas = tareasValidas.map((tarea) => ({
            id: tarea.id,
            name: tarea.nombre,
            start: tarea.comienzo,
            end: tarea.final,
            progress: tarea.progreso
        }))

        setTimeout(() => setTareasGantt(tareasMapeadas), 0)
    }, [tareas])

    const clickTarea = (tarea: Task) => {
        console.log("hemos hecho click en la tarea:", tarea)
        setSeleccionTarea(tarea)
    }

    return (
        <div className=" mt-4 relative" >
            <h2 className=" text-xl font-semibold mb-2 " >Gantt de Tareas</h2>

            <div>
                <button
                    className=" bg-blue-500 text-white p-2 m-1 rounded "
                    onClick={() => setModoVista(ViewMode.HalfDay)}
                >Medio Dia</button>
                <button className=" bg-blue-500 text-white p-2 m-1 rounded "
                    onClick={() => setModoVista(ViewMode.Day)}
                >Dia</button>
                <button className=" bg-blue-500 text-white p-2 m-1 rounded "
                    onClick={() => setModoVista(ViewMode.Week)}
                >Semana</button>
                <button className=" bg-blue-500 text-white p-2 m-1 rounded"
                    onClick={() => setModoVista(ViewMode.Month)}
                >Mes</button>
            </div>

            {tareasGantt.length > 0 ? (
                <>
                    <FrappeGantt
                        tasks={tareasGantt}
                        viewMode={modoVista}
                        onClick={clickTarea}

                    />
                    {seleccionTarea &&
                        <Modal
                            titulo={seleccionTarea.name}
                            onclose={() => setSeleccionTarea(null)}
                        >
                            <p>
                                <span className="font-bold" >Fecha de Inicio: </span>
                                {new Date(seleccionTarea.start).toLocaleDateString("es-ES")}
                            </p>
                            <p>
                                <span className="font-bold" >Fecha de Finalización: </span>
                                {new Date(seleccionTarea.end).toLocaleDateString("es-ES")}
                            </p>
                            <p>
                                <span className="font-bold">Progreso: </span>
                                {seleccionTarea.progress} % Completado
                            </p>
                        </Modal>
                    }
                </>
            ) : (
                <p> No hay tareas para mosotrar. Crear una Tarea para ver el diagrama de Gantt.</p>
            )}
        </div>
    )
}
