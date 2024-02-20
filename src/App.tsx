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
import { account, appwriteConfig, databases } from './lib/appwrite/config'

export const AuthContext = createContext({email: '', name: '', id: '', username: '', photo: '', bio: '', posts: '', liked: ''})

const App = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({email: '', name: '', id: '', username: '', photo: '', bio: '', posts: '', liked: ''})

  const getUser = async () => {
    try {
      const user = await account.get()
      return user
    }
    catch {
      return null
    }
  }

  useEffect(() => {
    if (localStorage.getItem('cookieFallback') === '[]' || localStorage.getItem('cookieFallback') === null) {
      navigate('/login')
    } else {
      getUser().then((user) => {
        if (user) {
          databases.getDocument(appwriteConfig.databaseId, appwriteConfig.usersCollectionId, user.$id).then((user) => {
            setUser({
              email: user.email,
              name: user.name,
              id: user.id,
              username: user.username,
              photo: user.photo,
              bio: user.bio,
              posts: user.posts,
              liked: user.liked
            })
          })
          navigate('/')
        } else {
          navigate('/login')
        }
      })
    }
  }, [])

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={user}>
        <Routes>
          <Route element={<AuthLayout/>}>
            <Route index path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
          </Route>
          <Route element={<RootLayout/>}>
            <Route path="/" element={<Home/>}/>
          </Route>
        </Routes>
      </AuthContext.Provider>
      <ToastContainer/>
    </QueryClientProvider>
  )
} 

export default App
 