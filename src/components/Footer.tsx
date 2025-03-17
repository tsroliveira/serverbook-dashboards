
import { Link } from 'react-router-dom';
import { Server, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-100 py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Server className="h-6 w-6 text-primary" />
              <span className="font-semibold text-lg">ServerBook</span>
            </div>
            <p className="text-muted-foreground max-w-xs">
              The elegant solution for managing and visualizing your server infrastructure.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">Navigation</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="text-foreground/80 hover:text-primary transition-colors">Home</Link>
              <Link to="/dashboard" className="text-foreground/80 hover:text-primary transition-colors">Dashboard</Link>
              <Link to="/upload" className="text-foreground/80 hover:text-primary transition-colors">Upload</Link>
            </nav>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">Resources</h3>
            <nav className="flex flex-col space-y-2">
              <a href="#" className="text-foreground/80 hover:text-primary transition-colors">Documentation</a>
              <a href="#" className="text-foreground/80 hover:text-primary transition-colors">Help Center</a>
              <a href="#" className="text-foreground/80 hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="text-foreground/80 hover:text-primary transition-colors">Terms of Service</a>
            </nav>
          </div>
        </div>
        
        <div className="border-t border-gray-100 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} ServerBook. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center mt-4 md:mt-0">
            Made with <Heart className="h-4 w-4 text-red-500 mx-1" fill="currentColor" /> for a better server management
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
