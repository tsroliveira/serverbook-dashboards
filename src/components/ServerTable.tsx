
import { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Server, useServers } from '@/context/ServerContext';
import { Search, Filter, SortAsc, SortDesc, RefreshCw, Trash2 } from 'lucide-react';

const ServerTable = () => {
  const { servers, deleteServer } = useServers();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Server>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Filter servers based on search term
  const filteredServers = servers.filter(server => 
    server.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    server.ipAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
    server.operatingSystem.toLowerCase().includes(searchTerm.toLowerCase()) ||
    server.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort servers based on the current sort field and direction
  const sortedServers = [...filteredServers].sort((a, b) => {
    let valueA = a[sortField];
    let valueB = b[sortField];

    // Handle string comparison
    if (typeof valueA === 'string' && typeof valueB === 'string') {
      valueA = valueA.toLowerCase();
      valueB = valueB.toLowerCase();
    }

    if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
    if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  // Toggle sort direction and field
  const handleSort = (field: keyof Server) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-US', {
        dateStyle: 'short',
        timeStyle: 'short'
      }).format(date);
    } catch (e) {
      return 'Unknown';
    }
  };

  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'online':
        return <Badge variant="default" className="capitalize">{status}</Badge>;
      case 'offline':
        return <Badge variant="destructive" className="capitalize">{status}</Badge>;
      case 'maintenance':
        return <Badge variant="outline" className="capitalize bg-yellow-100 text-yellow-800 border-yellow-200">{status}</Badge>;
      default:
        return <Badge variant="secondary" className="capitalize">{status}</Badge>;
    }
  };

  return (
    <div className="w-full overflow-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="relative flex-1 w-full max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search servers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 w-full"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">Filter</span>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <RefreshCw className="h-4 w-4" />
            <span className="hidden sm:inline">Refresh</span>
          </Button>
        </div>
      </div>

      <div className="rounded-md border overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center">
                    Name
                    {sortField === 'name' && (
                      sortDirection === 'asc' ? 
                      <SortAsc className="ml-1 h-4 w-4" /> : 
                      <SortDesc className="ml-1 h-4 w-4" />
                    )}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort('ipAddress')}
                >
                  <div className="flex items-center">
                    IP Address
                    {sortField === 'ipAddress' && (
                      sortDirection === 'asc' ? 
                      <SortAsc className="ml-1 h-4 w-4" /> : 
                      <SortDesc className="ml-1 h-4 w-4" />
                    )}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center">
                    Status
                    {sortField === 'status' && (
                      sortDirection === 'asc' ? 
                      <SortAsc className="ml-1 h-4 w-4" /> : 
                      <SortDesc className="ml-1 h-4 w-4" />
                    )}
                  </div>
                </TableHead>
                <TableHead 
                  className="hidden md:table-cell cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort('operatingSystem')}
                >
                  <div className="flex items-center">
                    OS
                    {sortField === 'operatingSystem' && (
                      sortDirection === 'asc' ? 
                      <SortAsc className="ml-1 h-4 w-4" /> : 
                      <SortDesc className="ml-1 h-4 w-4" />
                    )}
                  </div>
                </TableHead>
                <TableHead 
                  className="hidden lg:table-cell cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort('location')}
                >
                  <div className="flex items-center">
                    Location
                    {sortField === 'location' && (
                      sortDirection === 'asc' ? 
                      <SortAsc className="ml-1 h-4 w-4" /> : 
                      <SortDesc className="ml-1 h-4 w-4" />
                    )}
                  </div>
                </TableHead>
                <TableHead 
                  className="hidden lg:table-cell cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort('lastUpdated')}
                >
                  <div className="flex items-center">
                    Last Updated
                    {sortField === 'lastUpdated' && (
                      sortDirection === 'asc' ? 
                      <SortAsc className="ml-1 h-4 w-4" /> : 
                      <SortDesc className="ml-1 h-4 w-4" />
                    )}
                  </div>
                </TableHead>
                <TableHead className="w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedServers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No servers found. Try adjusting your search or upload a CSV file.
                  </TableCell>
                </TableRow>
              ) : (
                sortedServers.map((server) => (
                  <TableRow key={server.id}>
                    <TableCell className="font-medium">{server.name}</TableCell>
                    <TableCell className="font-mono text-sm">{server.ipAddress}</TableCell>
                    <TableCell>{getStatusBadge(server.status)}</TableCell>
                    <TableCell className="hidden md:table-cell">{server.operatingSystem}</TableCell>
                    <TableCell className="hidden lg:table-cell">{server.location}</TableCell>
                    <TableCell className="hidden lg:table-cell">{formatDate(server.lastUpdated)}</TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => deleteServer(server.id)}
                        className="h-8 w-8 text-destructive hover:text-destructive/80"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="text-sm text-muted-foreground mt-4">
        Showing {sortedServers.length} of {servers.length} servers
      </div>
    </div>
  );
};

export default ServerTable;
