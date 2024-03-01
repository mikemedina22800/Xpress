import { useContext, useState } from "react"
import FileUploader from "../shared/FileUploader"
import { Button } from "../ui/button"
import { makePost } from "@/lib/appwrite/api"
import { AuthContext } from "@/App"
import { toast } from "react-toastify"

const PostForm = () => {
  const user = useContext(AuthContext)
  const name = user.name
  const username = user.username
  const [text, setText] = useState('')
  const [file, setFile] = useState<File[]>([])
  const [fileURL, setFileURL] = useState('')
  const [location, setLocation] = useState('')
  const [tags, setTags] = useState('')

  const post = {name, username, text, file, location, tags}

  const submitPost = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (text != '' && fileURL != '') {
      makePost(post)
    } else {
      toast.error('Please provide text and/or image(s).')
    }
  }

  return (
    <form onSubmit={submitPost} className="flex flex-col gap-9 w-full max-w-5xl">
      <div className="flex flex-col gap-3">
        <h1 className="text-xl font-bold">Add text</h1>
        <textarea className="outline-none bg-dark-3 resize-none rounded-xl p-4 w-full h-96" onChange={(e) => {setText(e.target.value)}}/>
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="text-xl font-bold">Add photos</h1>
        <FileUploader file={file} setFile={setFile} fileURL={fileURL} setFileURL={setFileURL}/>
      </div> 
      <div className="flex flex-col gap-3">
        <h1 className="text-xl font-bold">Add location</h1>
        <input className="outline-none  bg-dark-3  resize-none rounded-xl p-4 w-full" onChange={(e) => {setLocation(e.target.value)}}/>
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="text-xl font-bold">Add Tags</h1>
        <input className="outline-none bg-dark-3 resize-none rounded-xl p-4 w-full" placeholder="art, expression, learning" onChange={(e) => {setTags(e.target.value)}}/>
      </div>
      <div className="w-full flex justify-center">
        <Button type="submit" className="w-96 bg-primary-500 text-white rounded-3xl p-4 outline-none font-bold flex justify-center text-xl">Upload</Button>
      </div>
    </form>
  )
}

export default PostForm