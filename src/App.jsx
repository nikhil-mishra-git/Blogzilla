import React, { useEffect, useState } from 'react'
import { Header, Footer, Loading, Herobanner, BlogcardSection, Signup, Signin, Blogcreate, BlogDetail } from './Components'
import { useDispatch } from 'react-redux'
import authService from './appwrite/authService'
import { login, logout } from './Store/authSlice'
import { Outlet } from 'react-router-dom'


const App = () => {

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {

    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout)
        }
      })
      .finally(() => setLoading(false))
  }, [])

  return loading
    ? <Loading message="Welcome To Blogzilla" />
    : (
      <div>
        <div className='w-full block'>
          <Header />
          <main>
            {/* <Outlet/> */}
          </main>
          <Footer />
        </div>
      </div>
    );
};

export default App;