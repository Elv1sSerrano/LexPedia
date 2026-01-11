import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Loader from "@/components/ui/Loader"
import { Users, Shield, FileText, MessageSquare, CheckCircle2, Clock } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"


const Dashboard = () => {

  const [data, setData] = useState(null)  
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/admin/dashboard")
        if (!response.ok) throw new Error("Error al obtener estadísticas")
        const json = await response.json()
        setData(json)
      } catch (err) {
        setError(err.message)
      }
    }

    fetchStats()
  }, [])

  if(!data) return <Loader />

  if (error) {
    return (
      toast.error("Error al obtener las estadísticas")
    )
  }

  const stats = [
    {
      id: 1,
      title: "Usuarios regulares",
      value: data.regularUsers,
      icon: Users,
      color: "bg-blue-500",
      trend: "Crecimiento estable",
    },
    {
      id: 2,
      title: "Moderadores",
      value: data.moderators,
      icon: Shield,
      color: "bg-purple-500",
      trend: "Equipo activo",
    },
    {
      id: 3,
      title: "Artículos publicados",
      value: data.totalArticles,
      icon: FileText,
      color: "bg-orange-500",
      trend: "Actividad editorial",
    },
    {
      id: 4,
      title: "Comentarios totales",
      value: data.totalComments,
      icon: MessageSquare,
      color: "bg-green-500",
      trend: "Alta interacción",
    },
    {
      id: 5,
      title: "Tareas asignadas",
      value: data.assignedTasks,
      icon: Clock,
      color: "bg-amber-500",
      trend: `${data.assignedTasks - data.completedTasks} pendientes`,
    },
    {
      id: 6,
      title: "Tareas completadas",
      value: data.completedTasks,
      icon: CheckCircle2,
      color: "bg-emerald-500",
      trend: "Buen rendimiento",
    },
  ]



  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Admin Dashboard</h1>          
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.id} className="border-border hover:border-primary/30 transition-colors">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                    <div className={`${stat.color} p-2 rounded-lg`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">{stat.trend}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>        
      </div>
    </div>
  )
}

export default Dashboard