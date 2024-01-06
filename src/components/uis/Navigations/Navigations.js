import React from 'react'
import { NavLink } from 'react-router-dom'
import { urls } from '../../../assets/constants/data'

const Header = () => {
  return (
    <>
      <li>
        <NavLink to={`/styles`} className='text-gray-800 hover:text-gray-900 duration-500'>
          Styles
        </NavLink>
      </li>
      <li>
        <NavLink to={`/portfolio`} className='text-gray-800 hover:text-gray-900 duration-500'>
          Portfolio
        </NavLink>
      </li>
      <li>
        <NavLink to={`/services`} className='text-gray-800 hover:text-gray-900 duration-500'>
          Services
        </NavLink>
      </li>
      <li>
        <NavLink to={urls.contact} className='text-gray-800 hover:text-gray-900 duration-500'>
          Contact
        </NavLink>
      </li>
      <li>
        <NavLink to={urls.about} className='text-gray-800 hover:text-gray-900 duration-500'>
          About
        </NavLink>
      </li>
    </>
  )
}

export default Header