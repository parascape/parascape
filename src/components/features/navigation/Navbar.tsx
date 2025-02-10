import { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LinkedInIcon } from "@/components/icons/icons";
import { config } from '@/config/environment';

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
      className={`fixed w-full bg-white/80 backdrop-blur-xl z-50 transition-all duration-300 ${
        isScrolled ? 'shadow-soft' : ''
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-18">
          <div className="flex-shrink-0 flex items-center">
            <button 
              onClick={() => handleNavigation('/')}
              className="text-2xl font-display font-semibold text-gray-900 transition-colors hover:text-parascape-600"
            >
              Parascape
            </button>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-10">
            <button 
              onClick={() => handleNavigation('/services')}
              className="text-base font-medium text-gray-600 hover:text-parascape-600 transition-colors"
            >
              Services
            </button>
            <button 
              onClick={() => handleNavigation('/about')}
              className="text-base font-medium text-gray-600 hover:text-parascape-600 transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => handleNavigation('/contact')}
              className="bg-parascape-100 hover:bg-parascape-200 text-parascape-600 px-8 py-2.5 rounded-full text-base font-medium transition-all duration-200 shadow-soft hover:shadow-medium"
            >
              Get in Touch
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-parascape-600 transition-colors"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-100">
            <div className="px-4 py-6 space-y-4">
              <button
                onClick={() => handleNavigation('/services')}
                className="block w-full text-left px-4 py-2 text-base font-medium text-gray-600 hover:text-parascape-600 transition-colors"
              >
                Services
              </button>
              <button
                onClick={() => handleNavigation('/about')}
                className="block w-full text-left px-4 py-2 text-base font-medium text-gray-600 hover:text-parascape-600 transition-colors"
              >
                About
              </button>
              <button
                onClick={() => handleNavigation('/contact')}
                className="block w-full text-left px-4 py-2 text-base font-medium text-parascape-600 hover:bg-parascape-50 rounded-xl transition-colors"
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