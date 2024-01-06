import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

import { urls, images } from '../../../assets/constants/data'
import useAuth from '../../../hooks/useAuth'
import { useLogoutMutation } from '../../../store/apis/authApiSlice'
import ConfirmMessageBox from '../ConfirmMessageBox/ConfirmMessageBox'
import DropdownMenu from '../DropdownMenu/DropdownMenu'
import Navigations from '../Navigations/Navigations'

const Header = () => {
    const [onLogout, setOnLogout] = useState(false),
        [logout] = useLogoutMutation(),
        { auth, user } = useAuth(),
        navigate = useNavigate()
    
    //handle user's logout click event
    const handleConfirm = () =>{
        setOnLogout(false)
        logout()
        navigate(urls.root)
    }
  return (
    <header className='w-full bg-white text-gray-900 py-2 shadow-lg'>
        {onLogout && <ConfirmMessageBox open message={`Do you want to logout?`} title={`System Logout`} close={ () => setOnLogout(false)} confirm={handleConfirm} />}
        <div className='container mx-auto px-4 w-full flex justify-between items-center'>
            <div className='text-xl font-bold w-2/5'>
                <NavLink to={urls.root} className={`text-blue-600 flex items-center`}>
                    <img src={images.logo} alt='logo' className='h-12 w-12 mr-2 rounded-full shadow-lg' />
                    <h1 className='text-lg font-bold uppercase'>Joyce's Fashion Stylist Zone</h1>
                </NavLink>
            </div>
            <nav className='flex py-4 px-2'>
                <ul className='flex space-x-4 w-full'>
                    <Navigations />
                    {!auth && (
                    <>
                        <li>
                            <Link className='bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold py-2 px-4 rounded-full shadow hover:from-purple-500 hover:to-blue-500 hover:text-gray-900 transition duration-500' to={`/${urls.signin}`}>Sign in</Link>
                        </li>
                       <li>
                            <Link className='bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold py-2 px-4 rounded-full shadow hover:from-purple-500 hover:to-blue-500 hover:text-gray-900 transition duration-500' to={`/${urls.register}`}>Register</Link>
                       </li>
                    </>)}
                </ul>
                {auth && <div className='flex px-4 py-2 justify-end w-1/4'>
                    <DropdownMenu user={user} logout={() => setOnLogout(true)} />
                </div>}
            </nav>
        </div>
    </header>
  )
}

export default Header