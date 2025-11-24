import { useState } from "react";
import { Card, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge, CircleCheck, Clock, ClockAlert, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Modal = ({ task, close, onUpdate }) => {

  const [ stateValue, setStateValue ] = useState(task.state);

  const handleStateChange = (value) => {
    setStateValue(value);
    
    onUpdate(task.id, {
      ...task,
      state: value,
    });
  };

  return (
    <Card className="w-md absolute right-5 bottom-5 z-30 shadow-xl border">
      <CardHeader className="flex justify-between">
        <h2 className="font-bold text-xl">Detalles de la tarea</h2>
        <button onClick={close} className="cursor-pointer">
          <X />
        </button>
      </CardHeader>

      <hr />

      <CardDescription className="grid grid-cols-2 gap-3 p-4">
        <div className="flex gap-2 items-center">
          <Clock />
          <p>Creada el</p>
        </div>
        <p>{task.dateCreated}</p>

        <div className="flex gap-2 items-center">
          <Badge />
          <p>Estado</p>
        </div>

        {/* Select para cambiar estado */}
        <Select value={stateValue} onValueChange={handleStateChange}>
          <SelectTrigger>
            <SelectValue placeholder="Seleccionar estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Pendiente">Por hacer</SelectItem>
            <SelectItem value="Proceso">En proceso</SelectItem>
            <SelectItem value="Completado">Completado</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex gap-2 items-center">
          <CircleCheck />
          <p>Prioridad</p>
        </div>
        <p>{task.priority}</p>

        <div className="flex gap-2 items-center">
          <ClockAlert />
          <p>Fecha límite</p>
        </div>
        <p>{task.dateLimit}</p>
      </CardDescription>

      <CardFooter className="flex flex-col gap-2 p-4">
        <h3 className="font-semibold text-lg">Descripción</h3>
        <p>{task.description}</p>
      </CardFooter>
    </Card>
  );
};

export default Modal;
