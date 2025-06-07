import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Blogzilla Logo.png';

const Logo = ({ height = 32 }) => {
    return (
        <Link to="/" className="flex items-center gap-2">
            <img
                src={logo}
                alt="Blogzilla Logo"
                className={`h-${height} w-auto object-contain`}
            />
        </Link>
    );
};

export default Logo;
