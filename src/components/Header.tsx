
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Server, Home, Database, Upload, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300",
      scrolled 
        ? "py-3 bg-white/90 backdrop-blur shadow-sm" 
        : "py-5 bg-transparent"
    )}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 animate-fade-in">
          <Server className="h-6 w-6 text-primary" />
          <span className="font-semibold text-lg">ServerBook</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <NavLinks />
        </nav>

        <div className="flex items-center space-x-4">
          <Link to="/dashboard">
            <Button variant="outline" size="sm" className="hidden md:flex items-center gap-2">
              <Database className="h-4 w-4" />
              <span>Dashboard</span>
            </Button>
          </Link>
          <Button onClick={() => setMobileMenuOpen(true)} size="icon" variant="ghost" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={cn(
        "fixed inset-0 bg-background/95 backdrop-blur z-50 flex flex-col md:hidden transition-transform duration-300 ease-in-out",
        mobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex items-center justify-between p-4">
          <Link to="/" className="flex items-center space-x-2" onClick={() => setMobileMenuOpen(false)}>
            <Server className="h-6 w-6 text-primary" />
            <span className="font-semibold text-lg">ServerBook</span>
          </Link>
          <Button size="icon" variant="ghost" onClick={() => setMobileMenuOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex flex-col items-center justify-center space-y-8 flex-1 p-8">
          <NavLinks mobile onClick={() => setMobileMenuOpen(false)} />
        </div>
      </div>
    </header>
  );
};

const NavLinks = ({ mobile = false, onClick = () => {} }) => {
  const baseClasses = "transition-colors duration-200 font-medium";
  const mobileClasses = mobile ? "text-xl py-2" : "";
  
  return (
    <>
      <Link to="/" className={cn(baseClasses, mobileClasses, "hover:text-primary")} onClick={onClick}>
        <div className="flex items-center gap-2">
          <Home className={cn("h-4 w-4", mobile && "h-5 w-5")} />
          <span>Home</span>
        </div>
      </Link>
      <Link to="/dashboard" className={cn(baseClasses, mobileClasses, "hover:text-primary")} onClick={onClick}>
        <div className="flex items-center gap-2">
          <Database className={cn("h-4 w-4", mobile && "h-5 w-5")} />
          <span>Dashboard</span>
        </div>
      </Link>
      <Link to="/upload" className={cn(baseClasses, mobileClasses, "hover:text-primary")} onClick={onClick}>
        <div className="flex items-center gap-2">
          <Upload className={cn("h-4 w-4", mobile && "h-5 w-5")} />
          <span>Upload</span>
        </div>
      </Link>
    </>
  );
};

export default Header;
