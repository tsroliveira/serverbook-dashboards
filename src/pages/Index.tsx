
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import MainLayout from '@/layouts/MainLayout';
import { Server, Database, Upload, BarChart, Terminal, Shield, ArrowRight } from 'lucide-react';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: <Upload className="h-10 w-10 text-blue-500" />,
      title: "Simple CSV Import",
      description: "Upload your server information using a simple CSV format."
    },
    {
      icon: <Database className="h-10 w-10 text-indigo-500" />,
      title: "Secure Database",
      description: "Store your server information in a secure local database."
    },
    {
      icon: <BarChart className="h-10 w-10 text-green-500" />,
      title: "Visual Analytics",
      description: "Get insightful visualizations of your server infrastructure."
    },
    {
      icon: <Terminal className="h-10 w-10 text-gray-700" />,
      title: "Technical Details",
      description: "View detailed technical specifications for each server."
    },
    {
      icon: <Shield className="h-10 w-10 text-red-500" />,
      title: "Status Monitoring",
      description: "Monitor the status and health of your servers at a glance."
    },
    {
      icon: <Server className="h-10 w-10 text-purple-500" />,
      title: "Server Management",
      description: "Manage your entire server infrastructure from one place."
    }
  ];

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <MainLayout fullWidth>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 py-24 flex flex-col items-center">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="bg-primary/10 text-primary px-4 py-2 rounded-full inline-flex items-center text-sm font-medium mb-6">
              <Server className="h-4 w-4 mr-2" />
              Server Infrastructure Management
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              Visualize Your Server Infrastructure
            </h1>
            <p className="text-xl text-muted-foreground mx-auto max-w-3xl mb-8">
              Upload your server information from CSV, store it securely, and get beautiful visualizations and insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link to="/upload">Upload Server Data</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                <Link to="/dashboard">View Dashboard</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="mt-12 bg-white p-4 rounded-lg shadow-xl border border-gray-100 overflow-hidden w-full max-w-5xl"
            initial={{ opacity: 0, y: 40 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative w-full aspect-video rounded-md overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none" />
              <img 
                src="https://images.unsplash.com/photo-1614064641938-3bbee52942c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
                alt="Server Dashboard" 
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Everything You Need For Server Management
            </h2>
            <p className="text-xl text-muted-foreground">
              Our platform provides all the tools you need to manage and monitor your server infrastructure.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]">
                  <CardContent className="pt-6">
                    <div className="bg-muted/50 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary/5">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Ready to Visualize Your Server Infrastructure?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get started by uploading your server information and see the magic happen.
            </p>
            <Button asChild size="lg" className="rounded-full px-8 flex items-center gap-2">
              <Link to="/upload">
                Get Started <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
