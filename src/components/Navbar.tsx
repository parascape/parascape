import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { LinkedInIcon } from "./icons/icons";
import { config } from '@/config/environment';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate('/contact');
    setIsOpen(false);
  };

  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-sm z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-parascape-green">Parascape</Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/services" className="text-gray-700 hover:text-parascape-green transition-colors">
              Services
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-parascape-green transition-colors">
              About
            </Link>
            <Link to="/success-stories" className="text-gray-700 hover:text-parascape-green transition-colors">
              Success Stories
            </Link>
            <button 
              onClick={handleContactClick}
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
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/services"
                className="block px-3 py-2 text-gray-700 hover:text-parascape-green transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Services
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 text-gray-700 hover:text-parascape-green transition-colors"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                to="/success-stories"
                className="block px-3 py-2 text-gray-700 hover:text-parascape-green transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Success Stories
              </Link>
              <button
                onClick={handleContactClick}
                className="w-full text-left px-3 py-2 text-parascape-green hover:bg-parascape-green/10 rounded-md transition-colors"
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

export default Navbar;