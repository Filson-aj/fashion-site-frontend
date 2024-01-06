import React from 'react'
import { Link } from 'react-router-dom'
import {
  FaUsers, FaShoppingCart, FaTshirt, /* FaRuler */
} from 'react-icons/fa'
import { IoIosPeople, IoIosCash } from 'react-icons/io'

const AdminDashboard = () => {
  const modules = [
    {
      icon: <FaUsers />,
      title: 'Staffs',
      description: 'Manage and update staff information and records.',
      link: '/dashboard/staffs',
    },
    {
      icon: <IoIosPeople />,
      title: 'Customers',
      description: 'Manage customer information and preferences.',
      link: '/dashboard/customers',
    },
    {
      icon: <FaTshirt />,
      title: 'Clothings',
      description: 'Manage clothings information.',
      link: '/dashboard/clothings',
    },
    /* {
      icon: <FaRuler />,
      title: 'Measurements',
      description: 'Manage measurements.',
      link: '/dashboard/measurements',
    }, */
    {
      icon: <IoIosCash />,
      title: 'Sales',
      description: 'View and analyze sales data and reports.',
      link: '/dashboard/sales',
    },
    {
      icon: <FaShoppingCart />,
      title: 'Orders',
      description: 'Manage customer orders and sales.',
      link: '/dashboard/orders',
    },
  ]
  

  return (
    <div className='bg-gray-100 min-h-screen py-8 rounded shadow-xl border'>
      <h1 className='text-3xl font-semibold mb-8 border-b border-gray-200 pb-4 px-4'>Admin Dashboard</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-8'>
        {modules.map((module, index) => (
          <Link
            key={index}
            to={module.link}
            className='p-4 bg-white rounded-lg shadow-md hover:border hover:border-teal-400 transform transition-transform duration-500 hover:scale-105 hover:-translate-y-1'
          >
            <div className='text-4xl text-teal-500 mb-2'>{module.icon}</div>
            <h3 className='text-xl font-semibold mb-2'>{module.title}</h3>
            <p className='text-gray-600'>{module.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default AdminDashboard