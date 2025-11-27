import { useEffect, useState } from "react";
import Task from "../components/Task";
import Modal from "../components/Modal";
import axios from "axios";
import { useUserIdContext } from "@/context/roles/roleContext";
import Loader from "@/components/ui/Loader";

const Tasks = () => {

  const userId = useUserIdContext()

  const [tasks, setTasks] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const fetchData = async () => {
      const res = await axios.get(`http://localhost:8080/api/tareas/asignadas/${userId}`);
      setTasks(res.data);
    };

  // Cargar tareas desde backend
  useEffect(() => {    
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData();
  }, []);

  const openModal = (id) => {
    const task = tasks.find(t => t.id === id);
    setSelectedTask(task);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  const updateTask = async (id, updatedTask) => {
    await axios.put(`http://localhost:8080/api/tareas/${id}`, updatedTask);
    fetchData();
  };

  const tasksTODO = tasks.filter(t => t.state === "PENDIENTE");
  const tasksPROCESS = tasks.filter(t => t.state === "EN_PROGRESO");
  const tasksDONE = tasks.filter(t => t.state === "COMPLETADA");


  if (!tasks) return <Loader />

  return (
    <div className="p-4 relative">      

      {isOpen && (
        <Modal
          task={selectedTask}
          close={closeModal}
          onUpdate={updateTask}
        />
      )}

      <h1 className="text-4xl font-bold my-6">Tareas por hacer</h1>
      <section className="grid grid-cols-3 gap-4 mt-4">
        {tasksTODO.map(task => (
          <Task
            key={task.id}
            openModal={() => openModal(task.id)}
            {...task}
          />
        ))}
      </section>
      
      <h1 className="text-4xl font-bold my-6">Tareas en proceso</h1>
      <section className="grid grid-cols-3 gap-4 mt-4">
        {tasksPROCESS.map(task => (
          <Task
            key={task.id}
            openModal={() => openModal(task.id)}
            {...task}
          />
        ))}
      </section>
      
      <h1 className="text-4xl font-bold my-6">Tareas completadas</h1>
      <section className="grid grid-cols-3 gap-4 mt-4">
        {tasksDONE.map(task => (
          <Task
            key={task.id}
            openModal={() => openModal(task.id)}
            {...task}
          />
        ))}
      </section>

    </div>
  );
};

export default Tasks;
