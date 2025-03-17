
import { v4 as uuidv4 } from 'uuid';
import { Server } from '@/context/ServerContext';
import Papa from 'papaparse';

// Function to validate that a CSV has the required fields
export const validateCsvHeaders = (headers: string[]): boolean => {
  const requiredFields = [
    'name', 
    'ipAddress', 
    'status', 
    'operatingSystem'
  ];
  
  return requiredFields.every(field => 
    headers.map(h => h.toLowerCase()).includes(field.toLowerCase())
  );
};

// Parse CSV file and return Server objects
export const parseServerCsv = (file: File): Promise<Server[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          // Validate headers
          const headers = results.meta.fields || [];
          if (!validateCsvHeaders(headers)) {
            reject(new Error('CSV is missing required fields. Required: name, ipAddress, status, operatingSystem'));
            return;
          }

          // Transform CSV data to Server objects
          const servers: Server[] = results.data.map((row: any) => {
            // Normalize field names (case-insensitive matching)
            const normalizedRow: any = {};
            Object.keys(row).forEach(key => {
              const lowerKey = key.toLowerCase();
              // Map CSV headers to our server properties
              if (lowerKey === 'name') normalizedRow.name = row[key];
              else if (lowerKey === 'ipaddress') normalizedRow.ipAddress = row[key];
              else if (lowerKey === 'status') normalizedRow.status = row[key].toLowerCase();
              else if (lowerKey === 'operatingsystem') normalizedRow.operatingSystem = row[key];
              else if (lowerKey === 'cpu') normalizedRow.cpu = row[key];
              else if (lowerKey === 'memory') normalizedRow.memory = row[key];
              else if (lowerKey === 'storage') normalizedRow.storage = row[key];
              else if (lowerKey === 'location') normalizedRow.location = row[key];
              else if (lowerKey === 'lastupdated') normalizedRow.lastUpdated = row[key];
            });

            // Generate missing or default values
            return {
              id: uuidv4(),
              name: normalizedRow.name || 'Unknown',
              ipAddress: normalizedRow.ipAddress || '0.0.0.0',
              status: ['online', 'offline', 'maintenance'].includes(normalizedRow.status) 
                ? normalizedRow.status 
                : 'offline',
              operatingSystem: normalizedRow.operatingSystem || 'Unknown',
              cpu: normalizedRow.cpu || 'N/A',
              memory: normalizedRow.memory || 'N/A',
              storage: normalizedRow.storage || 'N/A',
              location: normalizedRow.location || 'Unknown',
              lastUpdated: normalizedRow.lastUpdated || new Date().toISOString(),
            };
          });

          resolve(servers);
        } catch (error) {
          reject(error);
        }
      },
      error: (error) => {
        reject(error);
      }
    });
  });
};

// Generate a sample CSV content for download
export const generateSampleCsv = (): string => {
  const headers = [
    'name', 
    'ipAddress', 
    'status', 
    'operatingSystem', 
    'cpu', 
    'memory', 
    'storage', 
    'location', 
    'lastUpdated'
  ].join(',');
  
  const rows = [
    ['Web Server 1', '192.168.1.1', 'online', 'Ubuntu 20.04', 'Intel Xeon E5-2680', '16GB', '500GB SSD', 'US East', '2023-07-15T14:30:00Z'],
    ['Database Server', '192.168.1.2', 'online', 'CentOS 8', 'AMD EPYC 7542', '64GB', '2TB SSD', 'US West', '2023-07-14T09:15:00Z'],
    ['Backup Server', '192.168.1.3', 'maintenance', 'Windows Server 2019', 'Intel Xeon Gold 6230', '32GB', '8TB HDD', 'EU Central', '2023-07-10T22:45:00Z'],
    ['Application Server', '192.168.1.4', 'offline', 'Debian 11', 'Intel Xeon E5-2690', '24GB', '1TB SSD', 'Asia Pacific', '2023-07-13T11:20:00Z']
  ].map(row => row.join(',')).join('\n');
  
  return `${headers}\n${rows}`;
};

// Function to download the sample CSV
export const downloadSampleCsv = () => {
  const csvContent = generateSampleCsv();
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'sample_servers.csv');
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
