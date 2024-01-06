import { NavLink } from 'react-router-dom'

import { urls } from '../../../../assets/constants/data'

const Navigation = () => {

  return (
    <>
      <li>
        <NavLink to={urls.contact} className={`text-gray hover:text-gray-900 hover:font-bold duration-500`}>
          Contact Us
        </NavLink>
      </li>
      <li>
        <NavLink to={urls.about} className={`text-gray hover:text-gray-900 hover:font-bold duration-500`}>
          About Us
        </NavLink>
      </li>
    </>
  )
}

export default Navigation