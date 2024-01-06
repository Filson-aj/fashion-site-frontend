import React from 'react'
import { NavLink } from 'react-router-dom'

const Slide = ({ imageUrl, title, description, buttonText, link }) => {
  return (
    <section className='relative h-[400px]'>
      <img
        src={imageUrl}
        alt={title}
        className='object-cover h-full w-full'
      />
      <div className='absolute top-0 left-0 h-full w-full bg-gradient-to-b from-gray-800 to-pink-500 opacity-70'></div>
      <div className='absolute top-0 left-0 h-full w-full flex items-center justify-center text-white'>
        <div className='container mx-auto px-4 text-center'>
          <h1 className='text-4xl font-bold mb-6'>{title}</h1>
          <p className='text-xl mb-8'>{description}</p>
          <div className='flex justify-center'>
            <NavLink
              to={link}
              className='bg-gradient-to-r from-gray-200 to-gray-500 text-gray-900 font-bold py-3 px-8 rounded-full shadow-xl hover:text-red-800 hover:from-teal-200 hover:to-teal-900 hover:text-gray-100 transition duration-500'>
              {buttonText}
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Slide