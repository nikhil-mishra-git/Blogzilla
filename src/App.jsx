import { useEffect } from 'react'
import { Header, Footer } from './components'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login as authLogin , setAvtarUrl } from './features/authSlice'
import authService from './services/authService'
import { Toaster } from 'react-hot-toast'
import SearchResult from './components/SearchResult'

const App = () => {
  const dispatch = useDispatch()
  const query = useSelector((state) => state.search.query)

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currUserData = await authService.getUser()
        if (currUserData) {
          dispatch(authLogin({
            userData: currUserData,
          }));
        }
      } catch (error) {
        console.log('User not logged in or session expired')
      }
    }

    checkUser()
  }, [])

  useEffect(() => {
    dispatch(setAvtarUrl("https://avatar.iran.liara.run/public/boy"))
  }, [])
  


  return (
    <div>
      <Toaster position="top-right" toastOptions={{ style: { marginTop: '6rem', padding: '10px' } }} />
      <Header />
      {query.trim()
        ? <SearchResult />
        : <Outlet />}
      <Footer />
    </div>
  )
}

export default App
