import { useEffect, useState } from "react";
import axios from "axios";
import TaskForm from "../components/TaskForm";
import ConfirmDelete from "../components/ConfirmDelete";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ChevronDown } from "lucide-react";
import { toast } from "react-toastify";

const stateColors = {
  Pendiente: "bg-yellow-100 text-yellow-800",
  Proceso: "bg-blue-100 text-blue-800",
  Completado: "bg-green-100 text-green-800",
};

const priorityColors = {
  Baja: "bg-gray-100 text-gray-800",
  Media: "bg-orange-100 text-orange-800",
  Alta: "bg-red-100 text-red-800",
};

const TableTasks = () => {
  const [tasks, setTasks] = useState([]);
  // const [sortBy, setSortBy] = useState("recent");
  const [expandedId, setExpandedId] = useState(null);

  // Modales
  const [modalFormOpen, setModalFormOpen] = useState(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);

  const [taskToEdit, setTaskToEdit] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);    

  const getTasks = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/tareas");
      setTasks(res.data);
    } catch (error) {
      toast.error("Algo salió mal al obtener las tareas")
      console.error("Error al obtener tareas:", error);
    }
  }

  useEffect( () => {    
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getTasks();
  }, []);
  
  const createTask = async (data) => {
    await axios.post("http://localhost:8080/api/tareas", data);
    getTasks();
  };

  const editTask = async (id, data) => {
    await axios.put(`http://localhost:8080/api/tareas/${id}`, data);
    getTasks();
  };
  
  const deleteTask = async () => {
    await axios.delete(`http://localhost:8080/api/tareas/${taskToDelete}`);
    setModalDeleteOpen(false);
    toast.error("Tarea eliminada correctamente")
    getTasks();
  };  

  const openCreateModal = () => {
    setTaskToEdit(null);
    setModalFormOpen(true);
  };

  const openEditModal = (task) => {
    setTaskToEdit(task);
    setModalFormOpen(true);
  };

  const sortedTasks = tasks; 

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-6">

        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Gestión de Tareas</h1>
            <p className="text-muted-foreground">Administra todas las tareas del sistema</p>
          </div>

          <Button className={"cursor-pointer"} onClick={openCreateModal}>+ Nueva tarea</Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Tareas ({tasks.length})</CardTitle>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead></TableHead>
                  <TableHead>Título</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Prioridad</TableHead>
                  <TableHead>Creado</TableHead>
                  <TableHead>Vencimiento</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {sortedTasks.map((task) => (
                  <>
                    <TableRow
                      className="cursor-pointer"
                      onClick={() => setExpandedId(expandedId === task.id ? null : task.id)}
                    >
                      <TableCell>
                        <ChevronDown className={`transition ${expandedId === task.id ? "rotate-180" : ""}`} />
                      </TableCell>

                      <TableCell>{task.title}</TableCell>

                      <TableCell>
                        <Badge className={stateColors[task.state]}>{task.state}</Badge>
                      </TableCell>

                      <TableCell>
                        <Badge className={priorityColors[task.priority]}>{task.priority}</Badge>
                      </TableCell>

                      <TableCell>{task.dateCreated}</TableCell>
                      <TableCell>{task.dateLimit}</TableCell>
                    </TableRow>

                    {expandedId === task.id && (
                      <TableRow className="bg-muted/30">
                        <TableCell colSpan={6} className="p-4">
                          <p><strong>Descripción:</strong> {task.description}</p>

                          <div className="flex gap-3 mt-4">
                            <Button className={"cursor-pointer"} variant="outline" onClick={() => openEditModal(task)}>
                              Editar
                            </Button>                            

                            <Button
                              className={"cursor-pointer"}
                              variant="destructive"
                              onClick={() => {
                                setTaskToDelete(task.id);
                                setModalDeleteOpen(true);
                              }}
                            >
                              Eliminar
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      
      <TaskForm
        open={modalFormOpen}
        onClose={() => setModalFormOpen(false)}
        onSubmit={(form) => taskToEdit ? editTask(taskToEdit.id, form) : createTask(form)}
        initialData={taskToEdit}
      />

      <ConfirmDelete
        open={modalDeleteOpen}
        onClose={() => setModalDeleteOpen(false)}
        onConfirm={deleteTask}
      />
    </div>
  );
};

export default TableTasks;
