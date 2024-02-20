import { useContext } from "react"
import { AuthContext } from "@/App"

const RootLayout = () => {
  const user = useContext(AuthContext)

  return (
    <div>
      <h1>email: {user.email}</h1>
      <h1>name: {user.name}</h1>
    </div>
  )
}

export default RootLayout