
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowUpRight, 
  Users, 
  UserPlus, 
  FileText, 
  BarChart3, 
  Clock 
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar 
} from "recharts";
import { useUsers } from "@/contexts/UserContext";

const Dashboard = () => {
  const { totalUsers, activeUsers } = useUsers();
  
  const statsData = [
    {
      title: "Total Users",
      value: totalUsers.toString(),
      change: "+12.5%",
      icon: <Users className="h-4 w-4" />,
    },
    {
      title: "Active Users",
      value: activeUsers.toString(),
      change: "+8.2%",
      icon: <UserPlus className="h-4 w-4" />,
    },
    {
      title: "Content Pieces",
      value: "456",
      change: "+5.7%",
      icon: <FileText className="h-4 w-4" />,
    },
    {
      title: "Active Sessions",
      value: "28",
      change: "+14.3%",
      icon: <Clock className="h-4 w-4" />,
    },
  ];

  const chartData = [
    { name: "Jan", users: 400, content: 240 },
    { name: "Feb", users: 300, content: 139 },
    { name: "Mar", users: 200, content: 980 },
    { name: "Apr", users: 278, content: 390 },
    { name: "May", users: 189, content: 480 },
    { name: "Jun", users: 239, content: 380 },
    { name: "Jul", users: 349, content: 430 },
  ];

  const activityData = [
    { name: "Mon", activities: 20 },
    { name: "Tue", activities: 40 },
    { name: "Wed", activities: 30 },
    { name: "Thu", activities: 70 },
    { name: "Fri", activities: 55 },
    { name: "Sat", activities: 30 },
    { name: "Sun", activities: 25 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your admin statistics.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className="bg-primary/10 text-primary p-2 rounded-md">
                {stat.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs text-green-500 mt-1">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                {stat.change} from last month
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-2 md:col-span-1">
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-2 md:col-span-1">
          <CardHeader>
            <CardTitle>Weekly Activity</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={activityData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="activities" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 text-primary p-2 rounded-full">
                  <UserPlus size={16} />
                </div>
                <div>
                  <p className="text-sm font-medium">New user registered</p>
                  <p className="text-xs text-muted-foreground">15 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 text-primary p-2 rounded-full">
                  <FileText size={16} />
                </div>
                <div>
                  <p className="text-sm font-medium">New content published</p>
                  <p className="text-xs text-muted-foreground">1 hour ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 text-primary p-2 rounded-full">
                  <Users size={16} />
                </div>
                <div>
                  <p className="text-sm font-medium">User role updated</p>
                  <p className="text-xs text-muted-foreground">3 hours ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium">CPU Usage</p>
                <p className="text-sm font-medium">45%</p>
              </div>
              <Progress value={45} />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium">Memory Usage</p>
                <p className="text-sm font-medium">62%</p>
              </div>
              <Progress value={62} />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium">Storage</p>
                <p className="text-sm font-medium">28%</p>
              </div>
              <Progress value={28} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
