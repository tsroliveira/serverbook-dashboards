
import { Server } from '@/context/ServerContext';
import { v4 as uuidv4 } from 'uuid';

// Sample server data for first-time users
const sampleServers: Server[] = [
  {
    id: uuidv4(),
    name: "Web Server 1",
    ipAddress: "192.168.1.101",
    status: "online",
    operatingSystem: "Ubuntu 22.04 LTS",
    cpu: "Intel Xeon E5-2680 v4",
    memory: "32GB DDR4",
    storage: "2TB SSD RAID-1",
    location: "US East (Virginia)",
    lastUpdated: new Date().toISOString()
  },
  {
    id: uuidv4(),
    name: "Database Server",
    ipAddress: "192.168.1.102",
    status: "online",
    operatingSystem: "CentOS 8",
    cpu: "AMD EPYC 7543",
    memory: "128GB DDR4 ECC",
    storage: "4TB NVMe SSD",
    location: "US West (Oregon)",
    lastUpdated: new Date().toISOString()
  },
  {
    id: uuidv4(),
    name: "Application Server",
    ipAddress: "192.168.1.103",
    status: "maintenance",
    operatingSystem: "Windows Server 2022",
    cpu: "Intel Xeon Gold 6330",
    memory: "64GB DDR4",
    storage: "1TB SSD",
    location: "EU Central (Frankfurt)",
    lastUpdated: new Date().toISOString()
  },
  {
    id: uuidv4(),
    name: "Backup Server",
    ipAddress: "192.168.1.104",
    status: "offline",
    operatingSystem: "Debian 11",
    cpu: "Intel Xeon Silver 4310",
    memory: "16GB DDR4",
    storage: "12TB HDD RAID-6",
    location: "Asia Pacific (Tokyo)",
    lastUpdated: new Date().toISOString()
  },
  {
    id: uuidv4(),
    name: "Monitoring Server",
    ipAddress: "192.168.1.105",
    status: "online",
    operatingSystem: "Rocky Linux 8",
    cpu: "AMD EPYC 7413",
    memory: "32GB DDR4",
    storage: "1TB NVMe SSD",
    location: "South America (São Paulo)",
    lastUpdated: new Date().toISOString()
  }
];

// Load servers from localStorage or use sample data if empty
export const loadServers = (): Server[] => {
  try {
    const serversJson = localStorage.getItem('servers');
    if (serversJson) {
      const savedServers = JSON.parse(serversJson);
      if (savedServers && savedServers.length > 0) {
        return savedServers;
      }
    }
    // If no servers found in localStorage, return sample data
    return sampleServers;
  } catch (error) {
    console.error('Error loading servers from localStorage:', error);
    // Return sample data as fallback
    return sampleServers;
  }
};

// Save servers to localStorage
export const saveServers = (servers: Server[]): void => {
  try {
    localStorage.setItem('servers', JSON.stringify(servers));
  } catch (error) {
    console.error('Error saving servers to localStorage:', error);
  }
};

// Get a single server by ID
export const getServerById = (id: string): Server | null => {
  try {
    const servers = loadServers();
    const server = servers.find(s => s.id === id);
    return server || null;
  } catch (error) {
    console.error('Error getting server by ID:', error);
    return null;
  }
};

// Search servers by a search term
export const searchServers = (term: string): Server[] => {
  if (!term.trim()) return loadServers();
  
  try {
    const servers = loadServers();
    const lowerTerm = term.toLowerCase();
    
    return servers.filter(server => 
      server.name.toLowerCase().includes(lowerTerm) ||
      server.ipAddress.toLowerCase().includes(lowerTerm) ||
      server.operatingSystem.toLowerCase().includes(lowerTerm) ||
      server.location.toLowerCase().includes(lowerTerm)
    );
  } catch (error) {
    console.error('Error searching servers:', error);
    return [];
  }
};
