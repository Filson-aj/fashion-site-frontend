import React from 'react'
import { images } from '../../assets/constants/data'

const portfolioData = [
  {
    id: 1,
    image: images.measurement1,
    title: 'Chic Casual',
    category: 'Casual Wear',
    description: 'A trendy and chic casual look for everyday comfort with a touch of style.',
  },
  {
    id: 2,
    image: images.measurement2,
    title: 'Elegant Evening',
    category: 'Evening Gowns',
    description: 'Experience the epitome of elegance with these stunning evening gown styles.',
  },
  {
    id: 3,
    image: images.measurement3,
    title: 'Street Style',
    category: 'Urban Fashion',
    description: 'Explore the urban fashion scene with these stylish and street-smart looks.',
  },
  {
    id: 4,
    image: images.measurement4,
    title: 'Boho Vibes',
    category: 'Bohemian Fashion',
    description: 'Immerse yourself in the carefree and bohemian vibes with these stylish outfits.',
  },
  {
    id: 5,
    image: images.measurement5,
    title: 'Professional Chic',
    category: 'Work Attire',
    description: 'Achieve a perfect balance of professionalism and chic style with these work attire options.',
  },
  {
    id: 6,
    image: images.measurement6,
    title: 'Wedding Glam',
    category: 'Bridal Styling',
    description: 'Experience the glamour and grace of wedding fashion with these stunning bridal styles.',
  },
]

const Portfolio = () => {
  return (
    <section className='bg-gray-100 py-12'>
      <div className='container mx-auto text-center'>
        <h2 className='text-3xl font-bold text-gray-800 mb-2'>Fashion Stylist Portfolio</h2>
        <p className='text-lg text-gray-600 mb-8'>
          Explore a curated collection of our stylist's work, showcasing a blend of elegance, trendiness, and personalized style. Each piece tells a unique fashion story.
        </p>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
          {portfolioData.map((item) => (
            <div key={item.id} className='relative group'>
              <img
                src={item.image}
                alt={item.title}
                className='w-full h-64 object-cover rounded-lg transform transition-transform duration-300 group-hover:scale-105 group-hover:-translate-y-1'
              />
              <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500'>
                <div className='text-white'>
                  <h3 className='text-lg font-semibold mb-2'>{item.title}</h3>
                  <p className='text-sm'>{item.category}</p>
                  <p className='text-xs mt-2'>{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Portfolio