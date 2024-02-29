import { AuthContext } from '@/App'
import { useContext } from 'react'
import { Link } from 'react-router-dom'

const LeftSideBar = () => {
  const user = useContext(AuthContext)

  return (
    <nav className='leftsidebar'>
      <div className='flex flex-col gap-11'>
        <Link to="/" className="flex gap-3 items-center">
          <img src="assets/images/logo.svg" alt="logo" width={170} height={36}/>
        </Link>
        <Link to={`/profile/${user.id}`} className='flex gap-3 items-center'>
          <img src={user.photo} alt="user_photo" className="h-12 w-12 rounded-full"/>
        </Link>
      </div>
    </nav>
  )
}

export default LeftSideBar