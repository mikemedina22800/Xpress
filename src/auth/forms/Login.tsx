import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { signInAccount } from "@/lib/appwrite/api"
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons"
import { toast } from "react-toastify"
import { useSignInAccount } from "@/lib/react-query/queriesAndMutations"
import { Loader } from "lucide-react"

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [inputType, setInputType] = useState('password')

  const toggleVisibility = () => {
    setInputType(inputType === 'password' ? 'text' : 'password')
  }

  const values = {
    email,
    password
  }

  const { mutateAsync: signInAccount, isPending: isSigningIn } = useSignInAccount();

  const navigate = useNavigate()

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    signInAccount(values).then(() => {
      toast.success('Successfully logged in.')
      navigate('/')
    })
  }

  return (
    <form className="sm:w-420 flex-center flex-col" onSubmit={submit}>
      <h3 className="text-5xl font-bold mb-10">Snapagram</h3>
      <div className="w-full mb-5">
        <h1 className="mb-2">Email</h1>
        <input 
          type="email" 
          className="auth-input" 
          required onChange={(e) => {setEmail(e.target.value)}}
        />
      </div>
      <div className="w-full">
        <div className="w-full flex justify-between">
          <h1 className="mb-2">Password</h1>
          <div className="text-xl flex items-center cursor-pointer" onClick={toggleVisibility}>
            {inputType === 'password' && <EyeFilled/>}
            {inputType === 'text' && <EyeInvisibleFilled/>}
          </div>
        </div>
        <input 
          type={inputType} 
          className="auth-input"         
          minLength={8}
          value={password} 
          required 
          onChange={(e) => {setPassword(e.target.value)}}
        />
      </div>
      <button type="submit" className="auth-button">
        {isSigningIn ? (
          <div className="flex-center  gap-2">
            <Loader/>
          </div>
        ) : (
          <h1>Log In</h1>
        )}
      </button>
      <h1>Don't have an account? Click <Link to="/register" className="text-purple-600">here</Link> to register.</h1>
    </form>
  )
}

export default Login
