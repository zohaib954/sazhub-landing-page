
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-md bg-sazvida-500 flex items-center justify-center">
                <span className="text-white text-sm font-bold">SZ</span>
              </div>
              <span className="font-bold text-xl text-gray-900">Sazvida</span>
            </Link>
            <p className="text-gray-600 mb-6">
              Empowering healthcare professionals with innovative software solutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-sazvida-600 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-sazvida-600 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-sazvida-600 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-sazvida-600 transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Solutions</h3>
            <ul className="space-y-3">
              <li><Link to="/#solutions" className="text-gray-600 hover:text-sazvida-600 transition-colors">License Management</Link></li>
              <li><Link to="/#solutions" className="text-gray-600 hover:text-sazvida-600 transition-colors">Quality Management</Link></li>
              <li><Link to="/#solutions" className="text-gray-600 hover:text-sazvida-600 transition-colors">User Management</Link></li>
              <li><Link to="/#solutions" className="text-gray-600 hover:text-sazvida-600 transition-colors">Medical Education</Link></li>
              <li><Link to="/#solutions" className="text-gray-600 hover:text-sazvida-600 transition-colors">Analytics Dashboard</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-600 hover:text-sazvida-600 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-sazvida-600 transition-colors">Contact</Link></li>
              <li><a href="#" className="text-gray-600 hover:text-sazvida-600 transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-600 hover:text-sazvida-600 transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-600 hover:text-sazvida-600 transition-colors">Press</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="text-sazvida-600 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-600">Hyderabad</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-sazvida-600 mr-2 flex-shrink-0" />
                <a href="tel:++919396668883" className="text-gray-600 hover:text-sazvida-600 transition-colors">+91 9396668883</a>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-sazvida-600 mr-2 flex-shrink-0" />
                <a href="mailto:info@sazvida.com" className="text-gray-600 hover:text-sazvida-600 transition-colors">info@sazvida.com</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Sazvida Solutions. All rights reserved.
          </p>
          
          <div className="flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-sazvida-600 transition-colors text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-600 hover:text-sazvida-600 transition-colors text-sm">Terms of Service</a>
            <a href="#" className="text-gray-600 hover:text-sazvida-600 transition-colors text-sm">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
