import { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LinkedInIcon } from "@/components/icons/icons";
import { config } from '@/config/environment';
import { Logo } from "@/components/ui/logo";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Handle scroll restoration
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = 'unset';
    } else {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleNavigation = useCallback((to: string) => {
    // Don't navigate if we're already on the page
    if (location.pathname === to) {
      setIsOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Close menu and navigate immediately
    setIsOpen(false);
    navigate(to);
    
    // Scroll to top after navigation
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
  }, [navigate, location.pathname]);

  return (
    <nav 
      className={`fixed w-full bg-white/90 backdrop-blur-sm z-50 transition-all duration-200 ${
        isScrolled ? 'shadow-md' : 'shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <button 
              onClick={() => handleNavigation('/')}
              className="transition-transform hover:scale-105"
            >
              <Logo />
            </button>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => handleNavigation('/services')}
              className="text-gray-700 hover:text-parascape-green transition-colors"
            >
              Services
            </button>
            <button 
              onClick={() => handleNavigation('/about')}
              className="text-gray-700 hover:text-parascape-green transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => handleNavigation('/contact')}
              className="bg-parascape-green text-white px-6 py-2 rounded-md hover:bg-parascape-green/90 transition-colors"
            >
              Get in Touch
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-parascape-green"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => handleNavigation('/services')}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-parascape-green transition-colors"
              >
                Services
              </button>
              <button
                onClick={() => handleNavigation('/about')}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-parascape-green transition-colors"
              >
                About
              </button>
              <button
                onClick={() => handleNavigation('/contact')}
                className="block w-full text-left px-3 py-2 text-parascape-green hover:bg-parascape-green/10 rounded-md transition-colors"
              >
                Get in Touch
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}; 