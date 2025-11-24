import { useEffect, useState } from "react";
import Task from "../components/Task";
import Modal from "../components/Modal";
import axios from "axios";

const Tasks = () => {

  const [tasks, setTasks] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // Cargar tareas desde backend
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:8080/api/tareas");
      setTasks(res.data);
    };
    fetchData();
  }, []);

  const openModal = (id) => {
    const task = tasks.find(t => t.id === id);
    setSelectedTask(task);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  // Actualizar tarea (PUT)
  const updateTask = async (id, updatedData) => {
    const res = await axios.put(`http://localhost:8080/api/tareas/${id}`, updatedData);

    // Reemplazar en el estado local
    setTasks(prev =>
      prev.map(t => (t.id === id ? res.data : t))
    );
  };

  return (
    <div className="p-4 relative">
      <h1 className="text-4xl font-bold my-6">Tareas por hacer</h1>

      {isOpen && (
        <Modal
          task={selectedTask}
          close={closeModal}
          onUpdate={updateTask}
        />
      )}

      <section className="grid grid-cols-3 gap-4 mt-4">
        {tasks.map(task => (
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
