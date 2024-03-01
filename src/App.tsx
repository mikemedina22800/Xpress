import './globals.css'
import { useEffect, useState, createContext } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify';
import Login from './auth/forms/Login'
import Register from './auth/forms/Register'
import { AllUsers, CreatePost, EditPost, Explore, Home, PostDetails, Profile, Saved, UpdateProfile } from './root/pages'
import AuthLayout from './auth/AuthLayout'
import RootLayout from './root/RootLayout'

export const AuthContext = createContext({loggedIn: false, email: '', name: '', id: '', username: '', photo: '', bio: '', posts: '', liked: ''});

const App = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ loggedIn: false, email: '', name: '', id: '', username: '', photo: '', bio: '', posts: '', liked: ''});

  const authCookie = localStorage.getItem('cookieFallback')

  useEffect(() => {
    if (authCookie === '[]' || authCookie === null) {
      navigate('/login')
    } else {
      navigate('/')
    }
  }, [])

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
            <Route index element={<Home/>}/>
            <Route path="/explore" element={<Explore/>}/>
            <Route path="/saved" element={<Saved/>}/>
            <Route path="/all-users" element={<AllUsers/>}/>
            <Route path="/create-post" element={<CreatePost/>}/>
            <Route path="/edit-post" element={<EditPost/>}/>
            <Route path="/posts/:id" element={<PostDetails/>}/>
            <Route path="/profile/:id/*" element={<Profile/>}/>
            <Route path="/update-proflile/:id" element={<UpdateProfile/>}/>
          </Route>
        </Routes>
      </AuthContext.Provider>
      <ToastContainer />
    </QueryClientProvider>
  )
}

export default App
