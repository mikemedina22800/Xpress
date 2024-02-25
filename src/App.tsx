import './globals.css'
import { useEffect, useState, createContext } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify';
import Login from './auth/forms/Login'
import Register from './auth/forms/Register'
import { Home } from './root/pages'
import AuthLayout from './auth/AuthLayout'
import RootLayout from './root/RootLayout'

export const AuthContext = createContext({
  email: '',
  name: '',
  id: '',
  username: '',
  photo: '',
  bio: '',
  posts: '',
  liked: ''
});

const App = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    name: '',
    id: '',
    username: '',
    photo: '',
    bio: '',
    posts: '',
    liked: '',
  });

  const authCookie = localStorage.getItem('cookieFallback')

  useEffect(() => {
    if (authCookie === '[]' || authCookie === null) {
      navigate('/login')
    } else {
      navigate('/')
    }
  }, [authCookie])

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={user}>
        <Routes>
          <Route element={<AuthLayout/>}>
            <Route index path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
          </Route>
          <Route element={<RootLayout setUser={setUser}/>}>
            <Route path="/" element={<Home/>} />
          </Route>
        </Routes>
      </AuthContext.Provider>
      <ToastContainer />
    </QueryClientProvider>
  )
}

export default App
