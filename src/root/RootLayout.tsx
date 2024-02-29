import { useContext, useEffect, useState } from "react"
import TopBar from "@/components/shared/TopBar"
import LeftSideBar from "@/components/shared/LeftSideBar"
import { Outlet } from "react-router-dom"
import BottomBar from "@/components/shared/BottomBar"
import { AuthContext } from "@/App"
import { toast } from "react-toastify"
import ConfettiExplosion from 'react-confetti-explosion';
import { account, appwriteConfig, databases } from "@/lib/appwrite/config"
import { IUser } from "@/types"

interface Props {
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
}

const RootLayout: React.FC<Props> = ({ setUser }) => {
  const user = useContext(AuthContext);
  const query = new URLSearchParams(window.location.search)
  const firstSession = query.get('first_session')
  const newSession = query.get('new_session')
  const [confetti, setConfetti] = useState(false)

  useEffect(() => {
    account.get().then((user) => {
      databases.getDocument(appwriteConfig.databaseId, appwriteConfig.usersCollectionId, user.$id).then((user) => {
        setUser({
          loggedIn: true,
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
    })
  }, [])

  useEffect(() => {
    if (user.loggedIn === true) {
      const name = user.name.split(' ')[0]
      if (firstSession === 'true') {
        toast(`Welcome to Snapagram ${name}! 🎉`, {theme: 'light'})
        setConfetti(true)
      }
      if (newSession === 'true') {
        toast(`Welcome back ${name}! 👋`, {theme: 'light'})
      }
    }
  }, [user])

  return (
    <div className="w-full md:flex">
      {user.loggedIn === true && 
        <>
          <LeftSideBar/>
          <TopBar/>
          <section className="flex flex-1 h-full">
            <Outlet/>
          </section>
          <BottomBar/>
        </>
      }
      {confetti === true && <ConfettiExplosion/>}
    </div>
  )
}

export default RootLayout