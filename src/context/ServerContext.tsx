
import { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import { loadServers, saveServers } from '@/utils/database';

// Define the Server type
export interface Server {
  id: string;
  name: string;
  ipAddress: string;
  status: 'online' | 'offline' | 'maintenance';
  operatingSystem: string;
  cpu: string;
  memory: string;
  storage: string;
  location: string;
  lastUpdated: string;
}

interface ServerContextType {
  servers: Server[];
  loading: boolean;
  error: string | null;
  addServers: (newServers: Server[]) => void;
  updateServer: (id: string, updatedServer: Partial<Server>) => void;
  deleteServer: (id: string) => void;
  clearServers: () => void;
}

const ServerContext = createContext<ServerContextType | undefined>(undefined);

export const ServerProvider = ({ children }: { children: ReactNode }) => {
  const [servers, setServers] = useState<Server[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Load initial data from localStorage on mount
  useEffect(() => {
    try {
      const initialServers = loadServers();
      setServers(initialServers);
    } catch (err) {
      setError('Failed to load initial server data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Add new servers
  const addServers = useCallback((newServers: Server[]) => {
    setLoading(true);
    try {
      // In a real application, this would interact with a database
      // For now, we'll just update the state
      setServers(prevServers => {
        // Filter out duplicates based on ID
        const existingIds = new Set(prevServers.map(server => server.id));
        const filteredNewServers = newServers.filter(server => !existingIds.has(server.id));
        
        // Create the updated array
        const updatedServers = [...prevServers, ...filteredNewServers];
        
        // Save to localStorage as a simple persistence mechanism
        saveServers(updatedServers);
        
        toast.success(`Added ${filteredNewServers.length} servers`);
        return updatedServers;
      });
      setError(null);
    } catch (err) {
      setError('Failed to add servers');
      toast.error('Failed to add servers');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Update a server
  const updateServer = useCallback((id: string, updatedServer: Partial<Server>) => {
    setLoading(true);
    try {
      setServers(prevServers => {
        const updatedServers = prevServers.map(server => 
          server.id === id ? { ...server, ...updatedServer } : server
        );
        saveServers(updatedServers);
        toast.success(`Updated server ${id}`);
        return updatedServers;
      });
      setError(null);
    } catch (err) {
      setError('Failed to update server');
      toast.error('Failed to update server');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete a server
  const deleteServer = useCallback((id: string) => {
    setLoading(true);
    try {
      setServers(prevServers => {
        const updatedServers = prevServers.filter(server => server.id !== id);
        saveServers(updatedServers);
        toast.success(`Deleted server ${id}`);
        return updatedServers;
      });
      setError(null);
    } catch (err) {
      setError('Failed to delete server');
      toast.error('Failed to delete server');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Clear all servers
  const clearServers = useCallback(() => {
    setLoading(true);
    try {
      setServers([]);
      localStorage.removeItem('servers');
      toast.success('All servers have been cleared');
      setError(null);
    } catch (err) {
      setError('Failed to clear servers');
      toast.error('Failed to clear servers');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <ServerContext.Provider
      value={{
        servers,
        loading,
        error,
        addServers,
        updateServer,
        deleteServer,
        clearServers,
      }}
    >
      {children}
    </ServerContext.Provider>
  );
};

export const useServers = () => {
  const context = useContext(ServerContext);
  if (context === undefined) {
    throw new Error('useServers must be used within a ServerProvider');
  }
  return context;
};
