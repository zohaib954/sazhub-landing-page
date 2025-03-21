
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Solutions', path: '/#solutions' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-3',
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-sm' 
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className={cn(
            "font-bold text-xl md:text-2xl transition-all duration-300",
            isScrolled ? "text-sazvida-700" : "text-gray-900"
          )}
        >
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-md bg-sazvida-500 flex items-center justify-center">
              <span className="text-white text-sm font-bold">SZ</span>
            </div>
            <span>Sazvida Solutions</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                'hover-lift text-md font-medium button-transition',
                (location.pathname === link.path || 
                 (location.pathname === '/' && link.path.startsWith('/#')))
                  ? 'text-sazvida-600'
                  : 'text-gray-700 hover:text-sazvida-600'
              )}
            >
              {link.name}
            </Link>
          ))}
          <Button className="bg-sazvida-600 hover:bg-sazvida-700 hover-lift">
            Get Started
          </Button>
        </nav>

        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg p-5 border-t animate-fade-in">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  'py-2 px-4 rounded-md transition-colors',
                  (location.pathname === link.path || 
                   (location.pathname === '/' && link.path.startsWith('/#')))
                    ? 'bg-sazvida-50 text-sazvida-600'
                    : 'text-gray-700 hover:bg-sazvida-50 hover:text-sazvida-600'
                )}
              >
                {link.name}
              </Link>
            ))}
            <Button className="w-full bg-sazvida-600 hover:bg-sazvida-700 mt-2">
              Get Started
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
