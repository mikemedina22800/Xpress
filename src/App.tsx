import './globals.css'
import { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Login from './auth/forms/Login'
import Register from './auth/forms/Register'
import { Home } from './root/pages'
import AuthLayout from './auth/AuthLayout'
import RootLayout from './root/RootLayout'
import { getCurrentUser } from './lib/appwrite/api'

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    getCurrentUser().then((user) => {
      console.log(user)
      if (user) {
        navigate('/')
      } else {
        navigate('/login')
      }
    })
  }, [])

  return (
    <main className="flex h-screen">
      <Routes>
        <Route element={<AuthLayout/>}>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
        </Route>
        <Route element={<RootLayout/>}>
          <Route index element={<Home/>}/>
        </Route>
      </Routes>
    </main>
  )
} 

export default App
 