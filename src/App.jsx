import { useState, useEffect } from 'react'
import { Header, Footer } from './components'
import { Outlet } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { login as authLogin } from "./features/authSlice"
import authService from "./services/authService"
import { Toaster } from "react-hot-toast"
import SearchResult from './components/SearchResult' // New component you'll create

const App = () => {
  const dispatch = useDispatch()
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currUserData = await authService.getUser()
        if (currUserData) {
          dispatch(authLogin({ userData: currUserData }))
        }
      } catch (error) {
        console.log("User not logged in or session expired")
      }
    }
    checkUser()
  }, [])

  return (
    <div>
      <Toaster position="top-right" toastOptions={{ style: { marginTop: '6rem', padding: '10px' } }} />
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {searchQuery
        ? <SearchResult query={searchQuery} />
        : <Outlet />}
      <Footer />
    </div>
  )
}

export default App
