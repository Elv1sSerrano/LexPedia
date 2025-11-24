import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ChevronDown } from "lucide-react"


const tasks = [
  {
    id: "tarea1",
    title: "Agregar artículo 683",
    description: "Recordar la jurisprudencia es diferente y otras cosas como no sé",
    state: "Pendiente",
    dateCreated: new Date().toLocaleDateString(),
    dateLimit: new Date("2025-11-25").toLocaleDateString(),
    priority: "Baja",
  },
  {
    id: "tarea2",
    title: "Agregar artículo 683",
    description: "Recordar la jurisprudencia es diferente y otras cosas como no sé",
    state: "Pendiente",
    dateCreated: new Date().toLocaleDateString(),
    dateLimit: new Date("2025-11-25").toLocaleDateString(),
    priority: "Media",
  },
  {
    id: "tarea3",
    title: "Agregar artículo 683",
    description: "Recordar la jurisprudencia es diferente y otras cosas como no sé",
    state: "Pendiente",
    dateCreated: new Date().toLocaleDateString(),
    dateLimit: new Date("2025-11-25").toLocaleDateString(),
    priority: "Alta",
  },
]

const stateColors = {
  Pendiente: "bg-yellow-100 text-yellow-800",
  "En Progreso": "bg-blue-100 text-blue-800",
  Completado: "bg-green-100 text-green-800",
}

const priorityColors = {
  Baja: "bg-gray-100 text-gray-800",
  Media: "bg-orange-100 text-orange-800",
  Alta: "bg-red-100 text-red-800",
}

const sortOptions = [
  { label: "Más recientes", value: "recent" },
  { label: "Prioridad Alta", value: "priority-high" },
  { label: "Vencimiento próximo", value: "deadline-soon" },
  { label: "Estado", value: "state" },
]

const TableTasks = () => {

  const [sortBy, setSortBy] = useState("recent")
  const [expandedId, setExpandedId] = useState(null)

  const getSortedTasks = () => {
    const sorted = [...tasks]
    switch (sortBy) {
      case "priority-high":
        return sorted.sort((a, b) => {
          const priorityOrder = { Alta: 0, Media: 1, Baja: 2 }
          return priorityOrder[a.priority] - priorityOrder[b.priority]
        })
      case "deadline-soon":
        return sorted.sort((a, b) => new Date(a.dateLimit).getTime() - new Date(b.dateLimit).getTime())
      case "state":
        return sorted.sort((a, b) => a.state.localeCompare(b.state))
      default:
        return sorted
    }
  }

  const sortedTasks = getSortedTasks()

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gestión de Tareas</h1>
            <p className="text-muted-foreground mt-1">Supervisa y administra todas las tareas asignadas</p>
          </div>
        </div>

        {/* Controls */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Tareas ({tasks.length})</CardTitle>
                <CardDescription>Lista completa de tareas del sistema</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Ordenar por:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-background text-foreground">
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="w-12"></TableHead>
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
                        className="cursor-pointer hover:bg-muted/50 transition-colors"
                        onClick={() => setExpandedId(expandedId === task.id ? null : task.id)}
                      >
                        <TableCell className="text-center">
                          <ChevronDown
                            className={`w-4 h-4 mx-auto transition-transform ${
                              expandedId === task.id ? "rotate-180" : ""
                            }`}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{task.title}</TableCell>
                        <TableCell>
                          <Badge className={stateColors[task.state]}>{task.state}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={priorityColors[task.priority]}>{task.priority}</Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">{task.dateCreated}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{task.dateLimit}</TableCell>
                      </TableRow>
                      {expandedId === task.id && (
                        <TableRow className="bg-muted/30 hover:bg-muted/30">
                          <TableCell colSpan={6} className="py-4">
                            <div className="space-y-3">
                              <div>
                                <p className="text-sm font-semibold text-foreground mb-1">Descripción</p>
                                <p className="text-sm text-muted-foreground">{task.description}</p>
                              </div>
                              <div className="flex gap-4 pt-2">
                                <Button variant="outline" size="sm">
                                  Editar
                                </Button>
                                <Button variant="outline" size="sm">
                                  Marcar como Completado
                                </Button>
                                <Button variant="destructive" size="sm">
                                  Eliminar
                                </Button>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pendientes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{tasks.filter((t) => t.state === "Pendiente").length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">En Progreso</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{tasks.filter((t) => t.state === "En Progreso").length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Completadas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{tasks.filter((t) => t.state === "Completado").length}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default TableTasks