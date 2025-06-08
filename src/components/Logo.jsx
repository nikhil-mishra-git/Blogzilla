import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Blogzilla Logo.png';

const Logo = ({ height = 32 }) => {
    return (
        <Link to="/">
            <img
                src={logo}
                alt="Blogzilla"
                className={`h-${height} w-[150px] object-contain`}
            />
        </Link>
    );
};

export default Logo;
