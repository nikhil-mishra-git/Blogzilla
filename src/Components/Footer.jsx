import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Blogzilla Logo.png';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 border-t border-gray-800 mt-20">
      <div className="max-w-[1350px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <img
              src={logo}
              alt="Blogzilla Logo"
              className="h-32 w-auto object-contain invert"
            />
          </Link>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-gray-400 text-center md:text-left">
          <Link to="/" className="hover:text-white transition">Home</Link>
          <Link to="/write" className="hover:text-white transition">Write</Link>
          <Link to="/profile" className="hover:text-white transition">Profile</Link>
          <Link to="/about" className="hover:text-white transition">About</Link>
          <Link to="/contact" className="hover:text-white transition">Contact</Link>
        </div>

        {/* Social */}
        <div className="flex gap-4 text-gray-400">
          <a href="#" className="hover:text-white transition" aria-label="Facebook"><FaFacebookF size={18} /></a>
          <a href="#" className="hover:text-white transition" aria-label="Twitter"><FaTwitter size={18} /></a>
          <a href="#" className="hover:text-white transition" aria-label="Instagram"><FaInstagram size={18} /></a>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="mt-6 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Blogzilla. Built with passion.
      </div>
    </footer>
  );
};

export default Footer;
