
import { useState } from 'react';
import { ArrowRight, FileCheck, Database, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import FileUpload from '@/components/FileUpload';
import MainLayout from '@/layouts/MainLayout';

const Upload = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <MainLayout className="bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl mx-auto py-12 animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Upload Server Data</h1>
          <p className="text-muted-foreground">
            Import your server information from a CSV file
          </p>
        </div>

        <div className="flex justify-center mb-10">
          <div className="flex items-center w-full max-w-md">
            <StepIndicator 
              step={1} 
              currentStep={step} 
              icon={<FileCheck className="h-5 w-5" />}
              label="Upload File"
            />
            <div className={`h-1 flex-1 ${step > 1 ? "bg-primary" : "bg-muted"}`} />
            <StepIndicator 
              step={2} 
              currentStep={step} 
              icon={<Database className="h-5 w-5" />}
              label="Save to Database"
            />
          </div>
        </div>

        {step === 1 && (
          <div className="space-y-8">
            <FileUpload />
            
            <Card className="mt-8 bg-secondary/50 border-dashed">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-muted-foreground" />
                  CSV Format Instructions
                </CardTitle>
                <CardDescription>
                  Your CSV file should contain the following columns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Required Columns:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li><span className="font-mono text-xs bg-muted p-1 rounded">name</span> - Server name or identifier</li>
                      <li><span className="font-mono text-xs bg-muted p-1 rounded">ipAddress</span> - IP address of the server</li>
                      <li><span className="font-mono text-xs bg-muted p-1 rounded">status</span> - Status: online, offline, or maintenance</li>
                      <li><span className="font-mono text-xs bg-muted p-1 rounded">operatingSystem</span> - OS type and version</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Optional Columns:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li><span className="font-mono text-xs bg-muted p-1 rounded">cpu</span> - CPU specifications</li>
                      <li><span className="font-mono text-xs bg-muted p-1 rounded">memory</span> - RAM amount</li>
                      <li><span className="font-mono text-xs bg-muted p-1 rounded">storage</span> - Storage capacity</li>
                      <li><span className="font-mono text-xs bg-muted p-1 rounded">location</span> - Physical location</li>
                      <li><span className="font-mono text-xs bg-muted p-1 rounded">lastUpdated</span> - Last update timestamp</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end mt-6">
              <Button onClick={nextStep} className="flex items-center gap-2">
                Continue <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Servers Database</CardTitle>
                <CardDescription>
                  Your server information is securely stored in the local database
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  All server data has been processed and saved to the database. You can now:
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <Button variant="outline" onClick={() => window.location.href = '/upload'}>
                    Upload More Servers
                  </Button>
                  <Button onClick={() => window.location.href = '/dashboard'}>
                    View Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={prevStep}>
                Back
              </Button>
              <Button onClick={() => window.location.href = '/dashboard'} className="flex items-center gap-2">
                Go to Dashboard <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

const StepIndicator = ({ step, currentStep, icon, label }) => {
  const isActive = currentStep >= step;
  
  return (
    <div className="flex flex-col items-center">
      <div 
        className={`w-12 h-12 rounded-full flex items-center justify-center ${
          isActive ? "bg-primary text-white" : "bg-muted text-muted-foreground"
        }`}
      >
        {icon}
      </div>
      <span className={`text-xs mt-2 ${isActive ? "text-primary font-medium" : "text-muted-foreground"}`}>
        {label}
      </span>
    </div>
  );
};

export default Upload;
