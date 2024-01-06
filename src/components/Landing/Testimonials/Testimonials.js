import React from 'react'
import { FaHeart } from 'react-icons/fa'
import { images } from '../../../assets/constants/data'

const testimonialsData = [
  {
    id: 1,
    name: 'Emma Fashionista',
    position: 'Style Enthusiast',
    testimonial: `
      I am amazed by the impeccable styling services provided by this fashion stylist team.
      They understand my taste and always deliver looks that make me feel confident and chic.
    `,
    image: images.measurement1,
  },
  {
    id: 2,
    name: 'Alex Trendsetter',
    position: 'Fashion Blogger',
    testimonial: `
      The fashion insights and trendsetting ideas from this team have elevated my fashion game.
      They have an eye for detail and a passion for creating unique and impactful styles.
    `,
    image: images.measurement2,
  },
  {
    id: 3,
    name: 'Sophie Style Maven',
    position: 'Influencer',
    testimonial: `
      Working with this fashion stylist team has been a game-changer for my brand.
      Their innovative approach to styling has garnered attention and admiration from my followers.
    `,
    image: images.measurement3,
  },
]

const Testimonials = () => {
  return (
    <section className='bg-gray-100 py-12'>
      <div className='container mx-auto text-center'>
        <h2 className='text-3xl font-bold text-gray-800 mb-8'>Client Love & Testimonials</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
          {testimonialsData.map((testimonial) => (
            <div key={testimonial.id} className='bg-white p-6 rounded-lg shadow-md hover:border hover:border-pink-400 transition-transform duration-300 hover:transform hover:-translate-y-2'>
              <div className='flex items-center mb-4'>
                <img
                  className='w-12 h-12 rounded-full mr-4'
                  src={testimonial.image}
                  alt={`${testimonial.name}'s Profile`}
                />
                <div>
                  <div className='font-semibold'>{testimonial.name}</div>
                  <div className='text-gray-500'>{testimonial.position}</div>
                </div>
              </div>
              <p className='text-gray-600 text-justify mb-4'>{testimonial.testimonial}</p>
              <div className='flex justify-end text-pink-500'>
                <FaHeart className='text-xl' />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials