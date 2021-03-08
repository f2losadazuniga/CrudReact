import React,{useState, useEffect } from 'react'
import { isEmpty,size } from 'lodash'
// import shortid from 'shortid' // para genrar indices de tablas 
import { addDocument, deleteDocument, getCollection, updateDocument } from './Actions'

function App() {
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([])
  const [editMode, setEditMode] = useState(false)
  const [id, setId] = useState("")
  const [error, setError] = useState(null)

   useEffect(() => {
   (async () => {
     const result = await getCollection("tasks") 
     if(result.statusResponse) {
      setTasks(result.data)
     } else {
       setError(result.error)
     }
     
     //console.log(result)
   })()
    }, [])

  const validForm = ()=> {
    let isValid = true
    setError(null)
    if(isEmpty(task)){
      setError("Debes ingresar una tarea ")
      console.log("task empty")
      isValid = false 
    }
    return isValid
  }
   
  const addTask =async (e)=>{
    e.preventDefault()
    
    if (! validForm()){
       return
     }
    
     const result = await addDocument("tasks",{ name: task })
       if (!result.statusResponse){
        setError(result.error)
        return 
       } 
       // Como se adiciona una tarea con id en memoria 
       //const newTask={
       //id: shortid.generate(),
       // name: task 
       //}

     setTasks([...tasks, {id: result.data.id , name: task}])    
     setTask("")
  }

  
  const saveTask = async(e)=>{
    e.preventDefault()
    
    if (! validForm()){
      return
    }
  
    const result = await updateDocument("tasks", id ,{name: task })
    //console.log(editedSetTask)
    if(!result.statusResponse){
      setError(result.error)
      return
    }
    const editedSetTask =tasks.map( item => item.id === id ? { id , name:task } : item )
    setTasks(editedSetTask)
    setEditMode(false)
    setTask("")
    setId("")
  }
  
  const deteTask= async (id) => {
    const result = await deleteDocument("tasks", id ) 
    if(!result.statusResponse){
      setError(result.error)
      return
    }
    const filterTask = tasks.filter(task=> task.id !== id)
    setTasks(filterTask)
  }

  const editTask=(thetask)=>{
    setTask(thetask.name)
    setEditMode(true)
    setId(thetask.id)  
  }
  return (
<div className="container mt-5">
  <h1>Tareas </h1>
  <hr/>
  <div className="row">
      <div className="col-8">
        <h4 className="text-center">Lista de Tareas </h4>
      {
        size(tasks) === 0 ? (
            <li className="list-group-item">Aun no hay tareas programadas.</li>
        ):(
          <ul className="list-group">
            { 
              tasks.map((task)=> (
              <li className="list-group-item" key={task.id}>
                <span className="lead"> {task.name} </span>
                <button 
                  className="btn btn-danger btn-sm float-right mx-2"
                  onClick={()=> deteTask(task.id)}
                >
                    Eliminar
                </button>
                <button 
                  className="btn btn-warning btn-sm float-right"
                  onClick={()=> editTask(task)}
                >
                    Editar
                  </button>
              </li>
            
              ))
            }
          </ul>
        )
       
     }      
</div>
      <div className="col-4">
        <h4 className="text-center">
          { editMode ? "Modificar Tarea" : "Agregar Tarea"}
        </h4>
        <form onSubmit={ editMode ? saveTask : addTask }>
        {
            error && <span className="text-danger mb-2">{ error }</span>
          }
         <input 
          type="text" 
          className="form-control mb-2"
          placeholder="Ingrese la tarea... "
          onChange={(text)=> setTask(text.target.value)}
          value={task}
          />
          <button 
            className={ editMode ? "btn btn-warning btn-block" : "btn btn-dark btn-block" } 
            type="submit"
          > 
          { editMode ? "Agregar" : "Guardar" }
          </button>
        </form>
      </div>
  </div>
</div>
  )
}
export default App