import PostCard from "@/components/shared/PostCard"
import { appwriteConfig, databases } from "@/lib/appwrite/config"
import { Query } from "appwrite"
import { useEffect, useState } from "react"
import { MoonLoader } from "react-spinners"

const Home = () => {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.postsCollectionId, [Query.orderDesc("$createdAt"), Query.limit(50)]).then((posts) => {
      setPosts(posts.documents)
      setLoading(false)
    })
  }, [])
                              
  return (
    <div className="flex flex-1">
      {loading === false ? (
        <div className="home-container">
          <div className="home-posts">
            {posts.length > 0 ? (
              <ul className="flex flex-col flex-1 gap-9 w-full">
                {posts.map((post) => (     
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
 
export default Home
