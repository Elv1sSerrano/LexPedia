import { useState } from "react"
import Task from "../components/Task"
import Modal from "../components/Modal"

const Tasks = () => {

  //data = axios.get()
  //tasks = data.tasks

  const [ isOpen, setIsOpen ] = useState(false)
  const [ selectedTask, setSelectedTask ] = useState(null)

  const openModal = (id) => {
    const taskDetails = tasks.find((task) => task.id === id ) 
    setSelectedTask(taskDetails)    
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  const tasks = [
    {id: "tarea1", title: "Agregar artículo 683", description: "Recordar la jurisprudencia es diferente y otras cosas como no sé", state: "Pendiente", dateCreated: new Date().toLocaleDateString(), dateLimit: new Date("2025-11-25").toLocaleDateString(), priority: "Baja"},
    {id: "tarea2", title: "Agregar artículo 683", description: "Recordar la jurisprudencia es diferente y otras cosas como no sé", state: "Pendiente", dateCreated: new Date().toLocaleDateString(), dateLimit: new Date("2025-11-25").toLocaleDateString(), priority: "Media"},
    {id: "tarea3", title: "Agregar artículo 683", description: "Recordar la jurisprudencia es diferente y otras cosas como no sé", state: "Pendiente", dateCreated: new Date().toLocaleDateString(), dateLimit: new Date("2025-11-25").toLocaleDateString(), priority: "Alta"}
  ]

  return (
    <div className="p-4 relative">
      <h1 className="text-4xl font-bold my-6">Tareas por hacer</h1>
      { isOpen && <Modal  close={closeModal} {...selectedTask}/> }
      <section className="grid grid-cols-3 gap-4 mt-4">
        {
          tasks.map((task) => (
            <Task key={task.id} openModal={() => openModal(task.id)} {...task}/>
          ))
        }
      </section>
      <h1 className="text-4xl font-bold my-6">Tareas en proceso</h1>
      <h1 className="text-4xl font-bold my-6">Tareas hechas</h1>
    </div>
  )
}

export default Tasks