import { Formulario } from "./components/Formulario"

function App(){

  return(
    <div className=" flex justify-center pt-10 min-h-screen bg-gray-700 " >
      <div className="w-4/5 bg-gray-500 rounded shadow-md " >
        <h1 className=" text-2xl mb-4 text-center " >Gestion de tareas</h1>
        <div className=" w-11/12 mx-auto " >

        <Formulario/>

        </div>
      </div>
    </div>

  )
}
export default App