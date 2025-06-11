import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import { ProtectedRoute } from './components'
import { store } from './app/Store.js'
import './index.css'
import App from './App.jsx'
import { Home, Login, Signup, CreateBlog, EditBlog, BlogPage, Profile, NotFound } from './pages'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route
        path="/login"
        element={
          <ProtectedRoute authentication={false}>
            <Login />
          </ProtectedRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <ProtectedRoute authentication={false}>
            <Signup />
          </ProtectedRoute>
        }
      />
      <Route
        path="/writeblog"
        element={
          <ProtectedRoute authentication>
            {" "}
            <CreateBlog />
          </ProtectedRoute>
        }
      />
      <Route
        path="/editblog/:id"
        element={
          <ProtectedRoute authentication>
            {" "}
            <EditBlog />
          </ProtectedRoute>
        }
      />
      <Route
        path="/blog/:id"
        element={
          <ProtectedRoute authentication>
            {" "}
            <BlogPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute authentication>
            {" "}
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
)