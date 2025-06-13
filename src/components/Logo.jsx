import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Blogzilla Logo.png';

const Logo = ({ height = 36 }) => {
    return (
        <Link to="/">
            <img
                src={logo}
                alt="Blogzilla"
                className={`h-auto w-[150px] md:h-36 md:w-auto object-contain`}
            />
        </Link>
    );
};

export default Logo;
