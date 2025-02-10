import { Link } from 'react-router-dom';
import { LinkedInIcon, TwitterIcon } from "@/components/icons/icons";

export const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Parascape</h3>
            <p className="text-sm text-gray-600">
              Digital solutions for Humboldt County businesses
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-parascape-green">
                <LinkedInIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-parascape-green">
                <TwitterIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/services#web">Web Development</Link></li>
              <li><Link to="/services#brand">Branding</Link></li>
              <li><Link to="/services#content">Content Creation</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Humboldt County, CA</li>
              <li>contact@parascape.com</li>
              <li>(555) 123-4567</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t text-center text-sm text-gray-600">
          <p>© {new Date().getFullYear()} Parascape. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}; 