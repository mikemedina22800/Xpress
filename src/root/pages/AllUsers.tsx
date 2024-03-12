import { appwriteConfig, databases } from "@/lib/appwrite/config"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { MoonLoader } from "react-spinners"

const AllUsers = () => {
  const [users, setUsers] = useState<any[]>([null])

  useEffect(() => {
    databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.usersCollectionId).then((users) => {
      setUsers(users.documents)
    })
  }, [])
                              
  return (
    <div className="flex flex-1">
      {users[0] ? (
        <div className="home-container">
          <div className="home-users">
            <ul className="flex flex-col flex-1 gap-9 w-full">
              {users.map((user) => (     
                 <div className="post-card">
                    <div className="flex-between">
                      <div className="flex items-center gap-3">
                        <Link to={`/profile/${user.username}`}>
                          <img src={user?.photo || '/assets/icons/profile-placeholder.svg'} alt="creator" className="rounded-full w-12 h-12"/>
                        </Link>
                        <div className="flex flex-col">
                          <p className="base-medium lg:body-bold text-light-1">
                            {user.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="w-full h-screen flex justify-center items-center">
          <MoonLoader color="white" size={50}/>
        </div>      
      )}
    </div>
  )
}
 
export default AllUsers
