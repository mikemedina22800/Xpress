import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons"
import { signInAccount } from "@/lib/appwrite/api"
import { Button } from "@/components/ui/button"

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

  const navigate = useNavigate()

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    signInAccount(values, navigate)
  }

  return (
    <form className="sm:w-420 flex-center flex-col gap-10" onSubmit={submit}>
      <h3 className="text-5xl font-bold mb-10">Snapagram</h3>
      <div className="w-full flex flex-col gap-1">
        <h1>Email</h1>
        <input 
          type="email" 
          className="auth-input" 
          required onChange={(e) => {setEmail(e.target.value)}}
        />
      </div>
      <div className="w-full flex flex-col gap-1">
        <div className="w-full flex justify-between">
          <h1>Password</h1>
          <div className="text-xl flex items-center cursor-pointer" onClick={toggleVisibility}>
            {inputType === 'password' && <EyeFilled/>}
            {inputType === 'text' && <EyeInvisibleFilled/>}
          </div>
        </div>
        <input 
          type={inputType} 
          className="auth-input"         
          value={password} 
          required 
          onChange={(e) => {setPassword(e.target.value)}}
        />
      </div>
      <Button type="submit" className="auth-button">Log In</Button>
      <h1>Don't have an account? Click <Link to="/register" className="text-primary-500">here</Link> to register.</h1>
    </form>
  )
}

export default Login
