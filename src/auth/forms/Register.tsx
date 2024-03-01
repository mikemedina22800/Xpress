import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons"
import { createUserAccount } from "@/lib/appwrite/api"
import { Button } from "@/components/ui/button"

const Register = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [inputType, setInputType] = useState('password')

  const toggleVisibility = () => {
    setInputType(inputType === 'password' ? 'text' : 'password')
  }

  const values = {
    name: `${firstName} ${lastName}`,
    email,
    username,
    password
  }

  const navigate = useNavigate()

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    createUserAccount(values, navigate)
  }

  return (
    <form className="sm:w-420 flex-center flex-col gap-10" onSubmit={submit}>
      <h3 className="text-5xl font-bold">Xpress</h3>
      <div className="w-full flex flex-col gap-1">
        <h1>First Name</h1>
        <input 
          type='text' 
          className="auth-input"         
          pattern="[A-za-z]+" 
          value={firstName} 
          required 
          onChange={(e) => {setFirstName(e.target.value)}}
        />
      </div>
      <div className="w-full flex flex-col gap-1">
        <h1>Last Name</h1>
        <input 
          type='text' 
          className="auth-input"         
          pattern="[A-za-z]+" 
          value={lastName} 
          required 
          onChange={(e) => {setLastName(e.target.value)}}
        />
      </div>
      <div className="w-full flex flex-col gap-1">
        <h1>Username</h1>
        <input 
          type='text' 
          className="auth-input"         
          pattern="[A-Za-z0-9]+"
          value={username} 
          required 
          onChange={(e) => {setUsername(e.target.value)}}
        />
      </div>
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
          minLength={8}
          value={password} 
          required 
          onChange={(e) => {setPassword(e.target.value)}}
        />
      </div>
      <Button type="submit" className="auth-button">Register</Button>
      <h1>Already have an account? Click <Link to="/login" className="text-primary-500">here</Link> to log in.</h1>
    </form>
  )
}

export default Register
