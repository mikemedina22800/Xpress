import { AuthContext } from "@/App"
import PostCard from "@/components/shared/PostCard"
import { appwriteConfig, databases } from "@/lib/appwrite/config"
import { Query } from "appwrite"
import { useContext, useEffect, useState } from "react"
import { MoonLoader } from "react-spinners"

const Profile = () => {
  const user = useContext(AuthContext);

  const [userPosts, setUserPosts] = useState<any[]>([null])
  
  useEffect(() => {
    databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.postsCollectionId, [Query.equal("username", user.username), Query.limit(50)]).then((posts) => {
      setUserPosts(posts.documents)
    })
  }, [])
                              
  return (
    <div className="flex flex-1">
      {userPosts[0] ? (
        <div className="home-container">
          <div className="home-posts">
            {userPosts.length > 0 ? (
              <ul className="flex flex-col flex-1 gap-9 w-full">
                {userPosts.map((post) => (     
                  <PostCard post={post} key={post.$createdAt}/>
                ))}
              </ul>
            ) : (
              <h1>You haven't posted anything yet.</h1>
            )}
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
 
export default Profile
