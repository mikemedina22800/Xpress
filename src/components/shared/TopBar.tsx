import { Link } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "@/App"
import { Button } from "../ui/button"
import { signOutAccount } from "@/lib/appwrite/api"

const TopBar = () => {
  const user = useContext(AuthContext)

  return (
    <section>
      <div className="flex-between py-4 px-5">
        <Link to="" className="flex gap-3 items-center">
          <img src="assets/images/logo.svg" alt="logo" width={125} height={325}/>
        </Link>
        <div className="flex gap-4">
          <Button variant="ghost" className="shad-button_ghost" onClick={() => signOutAccount()}>
            <img src="assets/icons/logout.svg" alt="logout"/>
          </Button>
          <Link to={`/profile/${user.id}`} className="flex-center gap-3">
            <img/>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default TopBar