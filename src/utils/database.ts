
import { Server } from '@/context/ServerContext';

// This is a mock database service that uses localStorage
// In a real application, this would be replaced with actual database operations

// Load servers from localStorage
export const loadServers = (): Server[] => {
  try {
    const serversJson = localStorage.getItem('servers');
    if (serversJson) {
      return JSON.parse(serversJson);
    }
    return [];
  } catch (error) {
    console.error('Error loading servers from localStorage:', error);
    return [];
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
