import { useState } from "react"
import FileUploader from "../shared/FileUploader"
import { Button } from "../ui/button"

const PostForm = () => {
  
  const [caption, setCaption] = useState('')
  const [image, setImage] = useState('')
  const [file, setFile] = useState<File[]>([])
  const [fileURL, setFileURL] = useState('')

  const submitPost = () => {

  }

  return (
    <form className="flex flex-col gap-9 w-full max-w-5xl">
      <div className="flex flex-col gap-3">
        <h1 className="text-xl font-bold">Add caption</h1>
        <textarea className="outline-none text-black resize-none rounded-xl p-4 w-full h-96"/>
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="text-xl font-bold">Add photos</h1>
        <FileUploader fileURL={fileURL} setFileURL={setFileURL}/>
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="text-xl font-bold">Add location</h1>
        <input className="outline-none text-black resize-none rounded-xl p-4 w-full"/>
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="text-xl font-bold">Add Tags</h1>
        <input className="outline-none text-black resize-none rounded-xl p-4 w-full" placeholder="art, expression, learning"/>
      </div>
      <Button type="submit" className="w-[10rem] bg-primary-500 text-white rounded-2xl p-2 outline-none font-bold my-10 flex justify-center">Post</Button>
    </form>
  )
}

export default PostForm