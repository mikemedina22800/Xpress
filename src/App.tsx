import './globals.css'
import { Routes, Route } from 'react-router-dom'
import Login from './auth/forms/Login'
import Register from './auth/forms/Register'
import { Home } from './root/pages'
import AuthLayout from './auth/AuthLayout'
import RootLayout from './root/RootLayout'


const App = () => {
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
 