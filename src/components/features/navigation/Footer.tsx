import { Link } from 'react-router-dom';
import { LinkedInIcon, TwitterIcon } from '@/components/icons/icons';

export const Footer = () => {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
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
            <h3 className="mb-4 text-lg font-semibold">Services</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link to="/services#web">Web Development</Link>
              </li>
              <li>
                <Link to="/services#brand">Branding</Link>
              </li>
              <li>
                <Link to="/services#content">Content Creation</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Company</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Arcata, CA</li>
              <li>contact@parascape.com</li>
              <li>1(707)362-6816</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-gray-600">
          <p>© {new Date().getFullYear()} Parascape. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
