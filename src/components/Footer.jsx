import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Container, Logo } from './index'

const Footer = () => {
    return (
        <footer className="bg-black text-white py-10 border-t border-gray-800">
            <Container>
                <div className="px-4 flex flex-col md:flex-row justify-between items-center gap-10">

                    {/* Left: Logo */}
                    <div className="flex items-center gap-3 invert">
                        <Logo height={32} />
                    </div>

                    {/* Center: Navigation Links */}
                    <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-gray-400 text-center md:text-left">
                        <Link to="/" className="hover:text-white transition">Home</Link>
                        <Link to="/write" className="hover:text-white transition">Write</Link>
                        <Link to="/profile" className="hover:text-white transition">Profile</Link>
                        <Link to="/about" className="hover:text-white transition">About</Link>
                        <Link to="/contact" className="hover:text-white transition">Contact</Link>
                    </div>

                    {/* Right: Social Icons */}
                    <div className="flex gap-4 text-gray-400">
                        <a href="#" className="hover:text-white transition" aria-label="Facebook">
                            <FaFacebookF size={16} />
                        </a>
                        <a href="#" className="hover:text-white transition" aria-label="Twitter">
                            <FaTwitter size={16} />
                        </a>
                        <a href="#" className="hover:text-white transition" aria-label="Instagram">
                            <FaInstagram size={16} />
                        </a>
                    </div>
                </div>

                {/* Bottom Line */}
                <div className="mt-6 text-center text-xs text-gray-500">
                    © {new Date().getFullYear()} Blogzilla — Built by Nikhil Mishra
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
