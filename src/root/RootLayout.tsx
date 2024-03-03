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
import { MoonLoader } from 'react-spinners'

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
      databases.getDocument(appwriteConfig.databaseId, appwriteConfig.usersCollectionId, user.$id).then((userDoc) => {
        setUser({
          loggedIn: true,
          email: user.email,
          name: user.name,
          id: user.$id,
          username: userDoc.username,
          photo: userDoc.photo,
          bio: userDoc.bio,
          posts: userDoc.posts,
          liked: userDoc.liked
        })
      }).catch(() => {
        toast.error('Failed to load user information.')
      })
    }).catch(() => {
      toast.error('Failed to load user information.')
    })
  }, [])

  useEffect(() => {
    if (user.loggedIn === true) {
      const name = user.name.split(' ')[0]
      if (firstSession === 'true') {
        toast(`Welcome to Xpress ${name}! 🎉`, {theme: 'light'})
        setConfetti(true)
      }
      if (newSession === 'true') {
        toast(`Welcome back ${name}! 👋`, {theme: 'light'})
      }
    }
  }, [user])

  return (
    <>
      {user.loggedIn === true ? (
        <div className="w-full md:flex">
          <LeftSideBar/>
          <TopBar/>
          <section className="flex flex-1 h-full">
            <Outlet/>
          </section>
          <BottomBar/>
          {confetti === true && <ConfettiExplosion/>}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen w-screen">
          <MoonLoader color="white" loading={user.loggedIn === false} size={50}/>
        </div>
      )}
    </>
  )
}

export default RootLayout