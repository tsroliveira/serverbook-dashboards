
import { Server } from '@/context/ServerContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Cpu, Database, HardDrive, MapPin, Clock } from 'lucide-react';

interface ServerCardProps {
  server: Server;
}

const ServerCard = ({ server }: ServerCardProps) => {
  // Determine status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'offline':
        return 'bg-red-500';
      case 'maintenance':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };
  
  // Format the date
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short'
      }).format(date);
    } catch (e) {
      return 'Unknown date';
    }
  };

  return (
    <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold truncate">{server.name}</CardTitle>
          <Badge className="ml-2 capitalize" variant={
            server.status === 'online' ? 'default' : 
            server.status === 'offline' ? 'destructive' : 
            'outline'
          }>
            <span className={`mr-1.5 inline-block h-2 w-2 rounded-full ${getStatusColor(server.status)}`}></span>
            {server.status}
          </Badge>
        </div>
        <p className="text-sm font-mono text-muted-foreground mt-1">{server.ipAddress}</p>
      </CardHeader>
      
      <CardContent className="space-y-3 pb-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Operating System</p>
            <p className="text-sm truncate">{server.operatingSystem || 'N/A'}</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Location</p>
            <p className="text-sm flex items-center">
              <MapPin className="h-3 w-3 mr-1 text-muted-foreground" />
              <span className="truncate">{server.location || 'Unknown'}</span>
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-2 pt-2">
          <div className="flex flex-col items-center p-2 bg-muted/40 rounded text-center">
            <Cpu className="h-4 w-4 text-muted-foreground mb-1" />
            <span className="text-xs truncate" title={server.cpu}>{server.cpu || 'N/A'}</span>
          </div>
          
          <div className="flex flex-col items-center p-2 bg-muted/40 rounded text-center">
            <Database className="h-4 w-4 text-muted-foreground mb-1" />
            <span className="text-xs truncate" title={server.memory}>{server.memory || 'N/A'}</span>
          </div>
          
          <div className="flex flex-col items-center p-2 bg-muted/40 rounded text-center">
            <HardDrive className="h-4 w-4 text-muted-foreground mb-1" />
            <span className="text-xs truncate" title={server.storage}>{server.storage || 'N/A'}</span>
          </div>
        </div>
        
        <div className="pt-2 flex items-center text-xs text-muted-foreground">
          <Clock className="h-3 w-3 mr-1" />
          <span>Last updated: {formatDate(server.lastUpdated)}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServerCard;
