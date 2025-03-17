
import { useState } from 'react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, 
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid 
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Server as ServerIcon, Database, HardDrive, BarChart as BarChartIcon } from 'lucide-react';
import { useServers } from '@/context/ServerContext';
import ServerTable from '@/components/ServerTable';
import ServerCard from '@/components/ServerCard';
import MainLayout from '@/layouts/MainLayout';

const Dashboard = () => {
  const { servers, loading } = useServers();
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  // Status counts for pie chart
  const statusCounts = servers.reduce((acc, server) => {
    acc[server.status] = (acc[server.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const statusData = Object.entries(statusCounts).map(([name, value]) => ({
    name,
    value
  }));

  // OS Distribution for bar chart
  const osCounts = servers.reduce((acc, server) => {
    const os = server.operatingSystem || 'Unknown';
    // Extract just the main OS name (e.g., "Ubuntu 20.04" -> "Ubuntu")
    const mainOS = os.split(' ')[0];
    acc[mainOS] = (acc[mainOS] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const osData = Object.entries(osCounts)
    .sort((a, b) => b[1] - a[1]) // Sort by count descending
    .slice(0, 5) // Take top 5
    .map(([name, value]) => ({
      name,
      value
    }));

  // Colors for pie chart
  const COLORS = {
    online: '#22c55e',
    offline: '#ef4444',
    maintenance: '#f59e0b',
    unknown: '#6b7280'
  };

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Server Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Manage and monitor your server infrastructure
            </p>
          </div>
          
          <div className="w-full max-w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger 
                value="table" 
                onClick={() => setViewMode('table')}
                className={`flex items-center gap-2 ${viewMode === 'table' ? 'bg-background text-foreground shadow-sm' : ''}`}
              >
                <ServerIcon className="h-4 w-4" />
                Table View
              </TabsTrigger>
              <TabsTrigger 
                value="grid" 
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-2 ${viewMode === 'grid' ? 'bg-background text-foreground shadow-sm' : ''}`}
              >
                <Database className="h-4 w-4" />
                Grid View
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64 mt-6">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : servers.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="space-y-1">
                    <CardTitle className="text-sm font-medium">Total Servers</CardTitle>
                    <CardDescription>Across all environments</CardDescription>
                  </div>
                  <ServerIcon className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{servers.length}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="space-y-1">
                    <CardTitle className="text-sm font-medium">Server Status</CardTitle>
                    <CardDescription>Health overview</CardDescription>
                  </div>
                  <BarChartIcon className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent className="pt-1">
                  <div className="h-24">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={statusData}
                          cx="50%"
                          cy="50%"
                          innerRadius={30}
                          outerRadius={45}
                          paddingAngle={5}
                          dataKey="value"
                          labelLine={false}
                        >
                          {statusData.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={COLORS[entry.name as keyof typeof COLORS] || COLORS.unknown} 
                            />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value, name) => [`${value} servers`, name]}
                          contentStyle={{ fontSize: '12px' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="space-y-1">
                    <CardTitle className="text-sm font-medium">OS Distribution</CardTitle>
                    <CardDescription>Top operating systems</CardDescription>
                  </div>
                  <HardDrive className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent className="pt-1">
                  <div className="h-24">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={osData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                        <XAxis type="number" hide />
                        <YAxis 
                          type="category" 
                          dataKey="name" 
                          width={70}
                          tick={{ fontSize: 10 }}
                        />
                        <Tooltip 
                          formatter={(value) => [`${value} servers`, 'Count']}
                          contentStyle={{ fontSize: '12px' }}
                        />
                        <Bar dataKey="value" fill="#60a5fa" barSize={12} radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="space-y-1">
                    <CardTitle className="text-sm font-medium">Server Health</CardTitle>
                    <CardDescription>Current status</CardDescription>
                  </div>
                  <div className="flex space-x-1">
                    <div className="h-3 w-3 rounded-full bg-green-500" 
                      title={`Online: ${statusCounts.online || 0}`} />
                    <div className="h-3 w-3 rounded-full bg-red-500"
                      title={`Offline: ${statusCounts.offline || 0}`} />
                    <div className="h-3 w-3 rounded-full bg-yellow-500"
                      title={`Maintenance: ${statusCounts.maintenance || 0}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-500">
                    {statusCounts.online ? Math.round((statusCounts.online / servers.length) * 100) : 0}%
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {statusCounts.online || 0} servers online
                  </p>
                </CardContent>
              </Card>
            </div>

            {viewMode === 'table' ? (
              <div className="rounded-md overflow-hidden">
                <ServerTable />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {servers.map((server) => (
                  <ServerCard key={server.id} server={server} />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center p-8 text-center mt-6 border border-dashed rounded-lg">
            <div className="bg-muted/50 p-4 rounded-full mb-4">
              <Database className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-medium mb-2">No servers found</h3>
            <p className="text-muted-foreground max-w-md">
              Upload a CSV file with server information to get started.
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Dashboard;
