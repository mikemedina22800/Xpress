import { AuthContext } from '@/App'
import { sidebarLinks } from '@/constants'
import { INavLink } from '@/types'
import { useContext } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Button } from '../ui/button'
import { signOutAccount } from '@/lib/appwrite/api'

const LeftSideBar = () => {
  const user = useContext(AuthContext)
  const { pathname } = useLocation()

  return (
    <nav className='leftsidebar'>
      <div className='flex flex-col gap-11'>
        <Link to={`/profile/${user.id}`} className='flex gap-3 items-center'>
          <img src={user.photo} alt="user_photo" className="h-10 w-10 rounded-full"/>
          <div className='flex flex-col'>
            <p className='body-bold'>{user.name}</p>
            <p className='small-regular text-light-3'>@{user.username}</p>
          </div>
        </Link>
        <ul className='flex flex-col gap-6'>
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;
            return (
              <li key={link.label} className={`leftsidebar-link group ${isActive && 'bg-primary-500'}`}>
                <NavLink to={link.route} className={"flex gap-4 items-center p-4"}>
                  <img src={link.imgURL} alt={link.label} className={`group-hover:invert-white ${isActive && 'invert-white'}`}/>
                  {link.label}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </div>
      <Button variant="ghost" className="shad-button_ghost" onClick={() => signOutAccount()}>
        <img src="assets/icons/logout.svg" alt="logout"/>
        <p className='small-medium lg:base-medium'>Logout</p>
      </Button>
    </nav>
  )
}

export default LeftSideBar