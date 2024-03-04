import { AuthContext } from "@/App"
import PostCard from "@/components/shared/PostCard"
import { appwriteConfig, databases } from "@/lib/appwrite/config"
import { Query } from "appwrite"
import { useContext, useEffect, useState } from "react"
import { MoonLoader } from "react-spinners"

const Home = () => {
  const user = useContext(AuthContext);

  const [userPosts, setUserPosts] = useState<any[]>([])

  useEffect(() => {
    databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.postsCollectionId, [Query.equal("username", [user.username])]).then((posts) => {
      setUserPosts(posts.documents)
    })
  }, [])

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Feed</h2>
          {userPosts.length > 0 ? (
            <ul>
              {userPosts.map((post) => (
                <div className="bg-dark-3 w-full p-4 flex flex-col">
                  <h1>{post.name}</h1>
                  <h1>{post.username}</h1>
                  <img src={post.imageURL}/>
                  <h1>{post.text}</h1>
                  <h1>{post.$createdAt}</h1>
                  <h1>{post.location}</h1>
                  <h1>{post.tags}</h1>
                </div>
              ))}
            </ul>
          ) : (
            <h1>No posts available</h1>
          )}
        </div>
      </div>
    </div>
  )
}
 
export default Home
