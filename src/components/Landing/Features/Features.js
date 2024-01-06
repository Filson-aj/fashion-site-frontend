import React from 'react'
import { FaPalette, FaCut, FaShoppingBag } from 'react-icons/fa'

import './Snowfall.css'

const featuresData = [
  {
    id: 1,
    title: 'Trendy Styles',
    description: 'Explore the latest and trendiest fashion styles curated by our expert stylists.',
    icon: <FaPalette className='feature-icon text-4xl' />,
    color: 'bg-pink-500',
  },
  {
    id: 2,
    title: 'Personalized Styling',
    description: 'Experience personalized styling sessions to enhance your individual fashion sense.',
    icon: <FaCut  className='feature-icon text-4xl' />,
    color: 'bg-yellow-500',
  },
  {
    id: 3,
    title: 'Fashion Boutique',
    description: 'Discover a wide range of clothing options in our fashion boutique for a perfect look.',
    icon: <FaShoppingBag className='feature-icon text-4xl' />,
    color: 'bg-teal-500',
  },
]

const Features = () => {
  return (
    <section className='relative py-12 bg-gray-100 overflow-hidden'>
      <div className='container mx-auto text-center mb-8'>
        <h2 className='text-3xl font-bold text-gray-800'>Discover Exciting Features</h2>
      </div>
      <div className='container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative'>
        {featuresData.map((feature) => (
          <div
            key={feature.id}
            className='feature-card bg-white p-6 rounded-lg shadow-md transition-transform duration-300 hover:transform hover:-translate-y-2 relative'
          >
            <div className={`icon-container ${feature.color} text-white rounded-full p-4 mb-4 mx-auto relative`}>
              {feature.icon}
            </div>
            <h3 className='text-lg font-semibold mb-4'>{feature.title}</h3>
            <p className='text-gray-600'>{feature.description}</p>
          </div>
        ))}

        {/* Snowfall effect */}
        {[...Array(80)].map((_, index) => (
          <div
            key={index}
            className='snowflake'
            style={{ left: `${Math.random() * 100}%`, '--delay': Math.random() }}
          />
        ))}
      </div>
    </section>
  )
}

export default Features