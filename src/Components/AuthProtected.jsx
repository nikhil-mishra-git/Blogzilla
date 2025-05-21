import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Loading } from '../Components'

const AuthProtected = ({ children, authentication = true }) => {

    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const isLoggedin = useSelector(state => state.auth.isLoggedin)

    useEffect(() => {

        if (authentication && isLoggedin !== authentication) {
            navigate("/login")
        } else if (!authentication && isLoggedin !== authentication) {
            navigate("/")
        }

        setLoading(false)

    }, [isLoggedin, navigate, authentication])


    return loading
        ? <Loading />
        : <>{children}</>
}

export default AuthProtected