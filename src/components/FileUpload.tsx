
import { useState, useRef } from 'react';
import { Upload, FileText, Check, AlertCircle, Download } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useServers } from '@/context/ServerContext';
import { parseServerCsv, downloadSampleCsv } from '@/utils/csvParser';

const FileUpload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addServers } = useServers();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      processFile(droppedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      processFile(selectedFile);
    }
  };

  const processFile = (selectedFile: File) => {
    if (selectedFile.type !== 'text/csv' && !selectedFile.name.endsWith('.csv')) {
      toast.error('Please upload a CSV file');
      return;
    }

    setFile(selectedFile);
    setIsProcessing(true);

    parseServerCsv(selectedFile)
      .then(servers => {
        addServers(servers);
        toast.success(`Successfully processed ${servers.length} servers`);
      })
      .catch(error => {
        console.error('Error parsing CSV:', error);
        toast.error(error.message || 'Failed to parse CSV file');
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDownloadSample = () => {
    downloadSampleCsv();
    toast.success('Sample CSV downloaded');
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="border-dashed">
        <CardContent className="p-6">
          <div
            className={`
              flex flex-col items-center justify-center p-8 rounded-lg transition-all duration-300
              ${isDragging ? 'bg-primary/5 border-primary/30' : 'bg-muted/30 border-muted/50'}
              border-2 border-dashed cursor-pointer
            `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={triggerFileInput}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".csv"
              className="hidden"
            />
            
            <div className="relative mb-4">
              <div className={`
                rounded-full p-3 transition-all duration-300
                ${isProcessing ? 'bg-yellow-100' : isDragging ? 'bg-primary/10' : 'bg-muted'}
              `}>
                {isProcessing ? (
                  <div className="animate-pulse">
                    <FileText className="h-8 w-8 text-yellow-500" />
                  </div>
                ) : file ? (
                  <Check className="h-8 w-8 text-green-500" />
                ) : (
                  <Upload className={`h-8 w-8 ${isDragging ? 'text-primary' : 'text-muted-foreground'}`} />
                )}
              </div>
              {isProcessing && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-full h-12 w-12 border-4 border-t-primary/30 border-r-primary/30 border-b-primary/30 border-l-primary animate-spin"></div>
                </div>
              )}
            </div>
            
            <h3 className="font-medium text-lg mb-2">
              {isProcessing ? 'Processing...' : file ? 'File ready' : 'Upload CSV File'}
            </h3>
            
            <p className="text-muted-foreground text-center text-sm mb-4">
              {file 
                ? `Selected: ${file.name}` 
                : 'Drag and drop a CSV file here, or click to browse'}
            </p>
            
            {!file && !isProcessing && (
              <div className="flex items-center mt-2 text-xs text-muted-foreground">
                <AlertCircle className="h-3 w-3 mr-1" />
                <span>Only CSV files are supported</span>
              </div>
            )}
          </div>
          
          <div className="flex justify-center mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleDownloadSample();
              }}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              <span>Download Sample CSV</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FileUpload;
