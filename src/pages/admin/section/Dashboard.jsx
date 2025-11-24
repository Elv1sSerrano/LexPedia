import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Shield, FileText, MessageSquare, CheckCircle2, Clock } from "lucide-react"


const Dashboard = () => {

  const stats = [
    {
      id: 1,
      title: "Regular Users",
      value: "1,248",
      icon: Users,
      color: "bg-blue-500",
      trend: "+12% from last month",
    },
    {
      id: 2,
      title: "Moderators",
      value: "24",
      icon: Shield,
      color: "bg-purple-500",
      trend: "+2 this month",
    },
    {
      id: 3,
      title: "Articles Posted",
      value: "3,847",
      icon: FileText,
      color: "bg-orange-500",
      trend: "+156 this month",
    },
    {
      id: 4,
      title: "Total Comments",
      value: "12,563",
      icon: MessageSquare,
      color: "bg-green-500",
      trend: "+892 this month",
    },
    {
      id: 5,
      title: "Tasks Assigned",
      value: "47",
      icon: Clock,
      color: "bg-amber-500",
      trend: "5 pending",
    },
    {
      id: 6,
      title: "Tasks Completed",
      value: "284",
      icon: CheckCircle2,
      color: "bg-emerald-500",
      trend: "42 this month",
    },
  ]

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Monitor your legal articles platform</p>
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
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-sm text-foreground">New article published</span>
                  </div>
                  <span className="text-xs text-muted-foreground">2 mins ago</span>
                </div>
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-foreground">User registered</span>
                  </div>
                  <span className="text-xs text-muted-foreground">15 mins ago</span>
                </div>
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-foreground">Comment moderated</span>
                  </div>
                  <span className="text-xs text-muted-foreground">32 mins ago</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm text-foreground">New moderator added</span>
                  </div>
                  <span className="text-xs text-muted-foreground">1 hour ago</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle>Platform Health</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">Server Status</span>
                    <span className="text-sm text-green-500 font-medium">Operational</span>
                  </div>
                  <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full w-full bg-green-500 rounded-full"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">Database Performance</span>
                    <span className="text-sm text-green-500 font-medium">Excellent</span>
                  </div>
                  <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full w-[92%] bg-green-500 rounded-full"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">API Response Time</span>
                    <span className="text-sm text-green-500 font-medium">Fast</span>
                  </div>
                  <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full w-[88%] bg-green-500 rounded-full"></div>
                  </div>
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