import { Card, CardDescription, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge, CircleCheck, Clock, ClockAlert, X } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const Modal = ({dateCreated, priority, dateLimit, description, close}) => {
  return (
    <Card className={"w-md absolute right-5 top-5 z-40"}>
      <CardHeader> 
        <button onClick={close} className="cursor-pointer">
          <X />        
        </button>       
      </CardHeader>
      <hr />
      <CardDescription className={"grid grid-cols-2 gap-3 p-2"}>
        <div className="flex gap-2">
          <Clock />
          <p>Creada el</p>
        </div>
        <p>{dateCreated}</p>
        <div className="flex gap-2">
          <Badge />
          <p>Estado</p>
        </div>
        <Select
          value={""}
          // onValueChange={(value) => handleSelectChange("estadoPublicacion", value)}
        >
          <SelectTrigger id="estadoPublicacion">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="TODO">Por hacer</SelectItem>
            <SelectItem value="INPROCESS">En proceso</SelectItem>
            <SelectItem value="COMPLETED">Completado</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex gap-2">
          <CircleCheck />
          <p>Prioridad</p>
        </div>
        <p>{priority}</p>
        <div className="flex gap-2">
          <ClockAlert />
          <p>Fecha limite</p>
        </div>
        <p>{dateLimit}</p>
      </CardDescription>
      <CardFooter className={"flex flex-col gap-2"}>
        <h3>Descripción</h3>
        <p>{description}</p>
      </CardFooter>
    </Card>
  )
}

export default Modal