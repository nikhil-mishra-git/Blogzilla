import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Blogzilla Logo.png';

const Logo = () => {
    return (
        <Link to="/">
            <img
                src={logo}
                alt="Blogzilla"
                className={`h-14 w-auto object-contain`}
            />
        </Link>
    );
};

export default Logo;
