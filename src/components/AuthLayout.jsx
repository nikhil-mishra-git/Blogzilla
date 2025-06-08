import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = ({ children, authentication = true }) => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector((state) => state.auth.isLoggedin);

    useEffect(() => {
        if (authentication && !authStatus) {
            navigate("/login");
        } else if (!authentication && authStatus) {
            navigate("/");
        } else {
            setLoader(false);
        }
    }, [authStatus, navigate, authentication]);

    return loader ? <div className="text-center mt-20 text-lg">Loading...</div> : <>{children}</>;
};

export default ProtectedRoute;
