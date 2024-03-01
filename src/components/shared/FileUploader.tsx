import {useCallback, useState} from 'react'
import {FileWithPath, useDropzone} from 'react-dropzone'
import { Button } from '../ui/button'

interface Props {
  fileURL: string
  setFileURL: React.Dispatch<React.SetStateAction<string>>;
}

const FileUploader: React.FC<Props> = ({fileURL, setFileURL}) => {
  const [file, setFile] = useState<File[]>([])

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFile(acceptedFiles);
    setFileURL(URL.createObjectURL(acceptedFiles[0]))
  }, [file])

  const {getRootProps, getInputProps} = useDropzone({onDrop, accept: {'image/*': ['.png', '.jpeg', '.jpg', '.svg']}})

  return (
    <div {...getRootProps()} className='flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer'>
      <input {...getInputProps()} className='cursor-pointer'/>
      {fileURL ? ( 
        <>
          <div className='flex-flex-1 justify-center w-full p-5 lg:p-10'>
            <img src={fileURL} alt='image' className='file_uploader-img'/>
          </div>
          <p className='file_uploader-label'>Click or drag image to replace</p>
        </>
      ) : ( 
        <div className='file_uploader-box'>
          <img src={"/assets/icons/file-upload.svg"} width={100} height={75} alt="file-upload" />
          <h3 className='base-medium text-light-2 mb-2 mt-4'>Drag photo here</h3>
          <p className='text-light-4 small-regular mb-6'>SVG, PNG, JPG</p>
          <Button className='shad-button_dark_4'>Select from files</Button>
        </div>
      )}
    </div>
  )
}

export default FileUploader