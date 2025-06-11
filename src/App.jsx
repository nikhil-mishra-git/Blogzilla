import React from 'react'
import { Header, Footer } from './components'
import { Outlet } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { login as authLogin } from "./features/authSlice";
import authService from "./services/authService";

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currUserData = await authService.getUser();
        if (currUserData) {
          dispatch(authLogin({userData:currUserData}));
        }
      } catch (error) {
        console.log("User not logged in or session expired");
      }
    };

    checkUser();
  }, []);

  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default App