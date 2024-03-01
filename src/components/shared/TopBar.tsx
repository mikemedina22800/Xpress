import { Link } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "@/App"
import { Button } from "../ui/button"
import { signOutAccount } from "@/lib/appwrite/api"

const TopBar = () => {
  const user = useContext(AuthContext)
  return (
    <section>

    </section>
  )
}

export default TopBar