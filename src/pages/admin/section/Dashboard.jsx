import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Shield, FileText, MessageSquare, CheckCircle2, Clock } from "lucide-react"


const Dashboard = () => {

  const stats = [
  {
    id: 1,
    title: "Usuarios regulares",
    value: "1,248",
    icon: Users,
    color: "bg-blue-500",
    trend: "+12% desde el mes pasado",
  },
  {
    id: 2,
    title: "Moderadores",
    value: "24",
    icon: Shield,
    color: "bg-purple-500",
    trend: "+2 este mes",
  },
  {
    id: 3,
    title: "Artículos publicados",
    value: "3,847",
    icon: FileText,
    color: "bg-orange-500",
    trend: "+156 este mes",
  },
  {
    id: 4,
    title: "Comentarios totales",
    value: "12,563",
    icon: MessageSquare,
    color: "bg-green-500",
    trend: "+892 este mes",
  },
  {
    id: 5,
    title: "Tareas asignadas",
    value: "47",
    icon: Clock,
    color: "bg-amber-500",
    trend: "5 pendientes",
  },
  {
    id: 6,
    title: "Tareas completadas",
    value: "284",
    icon: CheckCircle2,
    color: "bg-emerald-500",
    trend: "42 este mes",
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

        {/* Activity Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Actividad reciente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-sm text-foreground">Nuevos artículos publicados</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Hace 2 minutos</span>
                </div>
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-foreground">Usuarios registrados</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Hace 15 minutos</span>
                </div>                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm text-foreground">Moderadores añadidos</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Hace 1 hora</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
        </div>
      </div>
    </div>
  )
}

export default Dashboard