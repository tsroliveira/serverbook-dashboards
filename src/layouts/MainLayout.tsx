
import { ReactNode } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface MainLayoutProps {
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
}

const MainLayout = ({ children, className = '', fullWidth = false }: MainLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className={`flex-1 pt-16 pb-8 ${className}`}>
        {fullWidth ? (
          children
        ) : (
          <div className="container mx-auto px-4 py-6">
            {children}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
