import { IoIosCash, IoIosListBox, IoIosPeople, IoIosSpeedometer } from 'react-icons/io'
import { FaUser, FaUsers, FaBell, FaShoppingCart, FaClipboardList, FaTshirt, FaRuler  } from 'react-icons/fa'
import { HiHome, HiUserGroup, HiBookOpen, HiMenu } from 'react-icons/hi'
import { AiOutlineLineChart } from 'react-icons/ai'
import { MdOutlineScore } from 'react-icons/md'
import { RiSettings4Line } from 'react-icons/ri'
import { Facebook, Twitter, Instagram } from 'react-feather'

export const PORT = 5000
export const URL = `http://localhost:${PORT}`
export const URL_AUTH = `http://localhost:${PORT}/auth`

export const images = {
  logo: require('../images/logo.jpg'),
  measurement1: require('../images/measurement1.jpg'),
  measurement2: require('../images/measurement2.jpg'),
  measurement3: require('../images/measurement3.jpg'),
  measurement4: require('../images/measurement4.jpg'),
  measurement5: require('../images/measurement5.jpg'),
  measurement6: require('../images/measurement6.jpg'),
  measurement7: require('../images/measurement7.jpg'),
}

export const icons = {
  linechart: AiOutlineLineChart,
  outlinescore: MdOutlineScore,
  speedometer: IoIosSpeedometer,
  home: HiHome,
  menus: HiMenu,
  userGroup: HiUserGroup,
  openBook: HiBookOpen,
  settings: RiSettings4Line,
  user: FaUser,
  users: FaUsers,
  notification: FaBell,
  measurements: FaRuler ,
  customers: IoIosPeople,
  orders: IoIosListBox,
  sales: IoIosCash, 
  clothings: FaTshirt,
  cart: FaShoppingCart,
  clipboard: FaClipboardList,
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
}

export const styles = {
    btnToggler: `
      inline-flex items-center justify-center p-2 rounded-md text-gray-400 
      hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white
    `,
    btnNav: `
        text-indigo-100 font-bold px-4 py-2 rounded-full text-xs uppercase
    `,
    input: `
        bg-slate-100 border border-gray-200 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
        focus:border-primary-600 ark:text-gray-900 
        dark:focus:ring-blue-500 dark:focus:border-blue-500 block w-full p-2.5 placeholder-gray-400 mb-2
    `,
    inputLight: `
        border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
        focus:border-primary-600 block 
        w-full p-2.5 dark:bg-white dark:border-gray-400 dark:placeholder-gray-400 dark:text-gray-900 
        dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2
    `,
    btnPrimary: `
        w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:border 
        focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 
        dark:hover:bg-primary-700 
        dark:focus:ring-primary-800 hover:border my-2
    `,
    btnSecondary: `
        w-full text-white bg-primary-600 hover:bg-primary-200 focus:ring-4 focus:outline-none focus:border 
        focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 
        dark:hover:bg-primary-700 disabled:bg-gray-100
        dark:focus:ring-primary-800 :hover:border my-2
    `,
    navLink: `
        flex items-center p-2 text-base font-normal text-gray-900 
        rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700
    `,
    navDropdown: `
        flex items-center justify-between p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white
        w-full text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700
    `,
    navLinkItem: `
        text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium
    `,
    indicator: `
        text-lg border-2 border-dotted border-pink-100 p-1 rounded-full h-10 w-10 mx-auto
        font-bold text-center text-red-500
    `,
    button: `
        w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none 
        focus:border focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
        dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 hover:border 
        disabled:bg-gray-800
    `,
    label: `
        block mb-2 text-md font-medium text-gray-900 dark:text-white
    `,
}

export const urls = {
    root: '/',
    signin: 'login',
    signup: 'signup',
    signout: 'signout',
    register: 'register',
    calendar: 'calendars',
    contact: 'contact-us',
    about: 'about-us',
    mission: 'our-mission',
    vision: 'our-vision',
    settings: 'users',
    landing: 'landing',
    dashboard: 'dashboard',
    user: 'user',
    admin: 'admin',
    staffs: 'staffs',
    customers: 'customers',
    measurements: 'measurements',
    clothings: 'clothings',
    orders: 'orders',
    sales: 'sales',
}

export const menus = {
    admin: [
      {name: 'Dashboard', link: ``, icon: IoIosSpeedometer },
      {name: 'Staff', link: `${urls.staffs}`, icon: icons.users },
      {name: 'Customers', link: `${urls.customers}`, icon: icons.customers},
      /* {name: 'Measurements', link: `${urls.measurements}`, icon: icons.measurements}, */
      {name: 'Clothings', link: `${urls.clothings}`, icon: icons.clothings},
      {name: 'Orders', link: `${urls.orders}`, icon: icons.orders},
      {name: 'Sales', link: `${urls.sales}`, icon: icons.sales},
      {name: 'Settings', link: `${urls.settings}`, icon: icons.settings },
    ],
    staff: [
        {name: 'Dashboard', link: ``, icon: IoIosSpeedometer },
        {name: 'Staff', link: `${urls.staffs}`, icon: icons.users },
        {name: 'Customers', link: `${urls.customers}`, icon: icons.customers},
        /* {name: 'Measurements', link: `${urls.measurements}`, icon: icons.measurements}, */
        {name: 'Clothings', link: `${urls.clothings}`, icon: icons.clothings},
        {name: 'Orders', link: `${urls.orders}`, icon: icons.orders},
        {name: 'Sales', link: `${urls.sales}`, icon: icons.sales},
    ],
    customer: [
        {name: 'Dashboard', link: ``, icon: IoIosSpeedometer },
        /* {name: 'Measurements', link: `${urls.measurements}`, icon: icons.measurements}, */
        {name: 'Clothings', link: `${urls.clothings}`, icon: icons.clothings},
        {name: 'Orders', link: `${urls.orders}`, icon: icons.orders},
        {name: 'Sales', link: `${urls.sales}`, icon: icons.sales},
    ],
}

export const links = [
    { name: 'Home', link: '/' },
    {
      name: 'Portfolio',
      submenu: false,
      link: '/portfolio',
    },
    {
      name: 'Services',
      submenu: true,
      sublinks: [
        { name: 'Personal Styling', link: '/personal-styling' },
        { name: 'Fashion Consultation', link: '/fashion-consultation' },
        { name: 'Event Styling', link: '/event-styling' },
      ],
    },
    {
      name: 'About',
      submenu: false,
      link: '/about',
    },
    {
      name: 'Blog',
      submenu: false,
      link: '/blog',
    },
    {
      name: 'Contact Us',
      submenu: false,
      link: '/contact-us',
    },
]
  