import React from 'react'
import { images } from '../../assets/constants/data'

const stylesData = [
  {
    id: 1,
    title: 'Modern Chic',
    description: 'Embrace the latest trends with a modern and chic style that exudes confidence and sophistication.',
    image: images.measurement1,
  },
  {
    id: 2,
    title: 'Bohemian Vibes',
    description: 'Experience the free-spirited and bohemian vibes with eclectic patterns, flowing fabrics, and unique accessories.',
    image: images.measurement2,
  },
  {
    id: 3,
    title: 'Classic Elegance',
    description: 'Achieve timeless beauty and sophistication with classic and elegant fashion choices that never go out of style.',
    image: images.measurement3,
  },
  {
    id: 4,
    title: 'Streetwear Swagger',
    description: 'Rock the streets with trendy streetwear styles that showcase your individuality and urban flair.',
    image: images.measurement4,
  },
]

const Styles = () => {
  return (
    <section className='bg-gray-100 py-12'>
      <div className='container mx-auto text-center'>
        <h2 className='text-3xl font-bold text-gray-800 mb-2'>Fashion Styles</h2>
        <p className='text-lg text-gray-600 mb-8'>
          Discover a diverse range of fashion styles curated by our stylist. From modern chic to bohemian vibes, explore your unique style journey.
        </p>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8'>
          {stylesData.map((style) => (
            <div key={style.id} className='relative group'>
              <img
                src={style.image}
                alt={style.title}
                className='w-full h-64 object-cover rounded-lg transform transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-1'
              />
              <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500'>
                <div className='text-white'>
                  <h3 className='text-lg font-semibold mb-2'>{style.title}</h3>
                  <p className='text-sm'>{style.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Styles