
import { useContext } from "react"
import TopBar from "@/components/shared/TopBar"
import LeftSideBar from "@/components/shared/LeftSideBar"
import { Outlet } from "react-router-dom"
import BottomBar from "@/components/shared/BottomBar"
import { AuthContext } from "@/App"

const RootLayout = () => {
  const user = useContext(AuthContext)
  console.log(user)
  
  return (
    <div className="w-full md:flex">
      <TopBar/>
      <LeftSideBar/>
      <section className="flex flex-1 h-full">
        <Outlet/>
      </section>
      <BottomBar/>
    </div>
  )
}

export default RootLayout