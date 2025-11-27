import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import axios from "axios";
import Loader from "@/components/ui/Loader";
import { useUserIdContext } from "@/context/roles/roleContext";

const stateOptions = ["PENDIENTE", "EN_PROGRESO", "COMPLETADA"];
const priorityOptions = ["BAJA", "MEDIA", "ALTA"];

export default function TaskForm({ open, onClose, onSubmit, initialData }) {

  const adminId = useUserIdContext()

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [state, setState] = useState("PENDIENTE");
  const [priority, setPriority] = useState("BAJA");
  const [dateLimit, setDateLimit] = useState("");
  const [assignedUserId, setAssignedUserId] = useState(null);
  const [ moderatorsData, setModeratorsData ] = useState(null)  

  // Rellenar datos cuando sea edición
  useEffect(() => {
    if (initialData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTitle(initialData.title);
      setDescription(initialData.description);
      setState(initialData.state);
      setPriority(initialData.priority);
      setDateLimit(initialData.dateLimit);
      setAssignedUserId(initialData.assignedUserId || null);
    } else {
      setTitle("");
      setDescription("");
      setState("PENDIENTE");
      setPriority("BAJA");
      setDateLimit("");
      setAssignedUserId(null);
    }

    const fetchModeratorsData = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/usuarios?role=MODERATOR")        
        setModeratorsData(res.data)
      } catch (error) {
        console.log("No se ha podido obtener la información de los moderadores" + error)
      }
    }
    
    fetchModeratorsData()
  }, [initialData]);

  const handleSubmit = () => {
    onSubmit({
      title,
      description,
      state,
      dateCreated: new Date().toISOString(),
      dateLimit,
      priority,
      assignedUserId: assignedUserId || null,
      createdById: adminId
    });
    onClose();
  };

  if (!moderatorsData) return <Loader />

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{initialData ? "Editar tarea" : "Nueva tarea"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} />

          <Textarea placeholder="Descripción" value={description} onChange={(e) => setDescription(e.target.value)} />

          <div>
            <p className="text-sm">Estado</p>
            <Select value={state} onValueChange={(v) => setState(v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {stateOptions.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div>
            <p className="text-sm">Prioridad</p>
            <Select value={priority} onValueChange={(v) => setPriority(v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {priorityOptions.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <p className="text-sm">Fecha limite</p>
            <Input type="date" value={dateLimit} onChange={(e) => setDateLimit(e.target.value)} />
          </div>

          <div>
            <p className="text-sm">Moderador a asignar</p>
            <Select value={assignedUserId} onValueChange={(v) => setAssignedUserId(v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {moderatorsData.map(moderator => <SelectItem key={moderator.firstName} value={moderator.id}>{moderator.firstName} {moderator.lastName}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSubmit}>
            {initialData ? "Guardar cambios" : "Crear tarea"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
