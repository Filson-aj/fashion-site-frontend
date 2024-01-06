import React from 'react'

const packagesData = [
  {
    id: 1,
    title: 'Style Essentials Package',
    description: 'Get essential tools and resources to kickstart your fashion styling journey.',
    price: 'Starting from ₦25,000',
  },
  {
    id: 2,
    title: 'Personal Styling Experience',
    description: 'Elevate your style with a personalized styling session guided by our expert fashion stylists.',
    price: 'Starting from ₦40,000',
  },
  {
    id: 3,
    title: 'Wardrobe Refresh Package',
    description: 'Optimize your wardrobe with a curated selection of trendy clothing and accessories.',
    price: 'Starting from ₦55,000',
  },
]

const Packages = () => {
  return (
    <section className='bg-gray-100 py-12'>
      <div className='container mx-auto text-center'>
        <h2 className='text-3xl font-bold text-gray-800 mb-8'>Exclusive Style Packages</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
          {packagesData.map((packageItem) => (
            <div
              key={packageItem.id}
              className='bg-white p-6 rounded-lg shadow-md hover:border hover:border-pink-400 hover:scale-105 hover:-translate-y-1 transform transition-transform duration-300'
            >
              <h3 className='text-lg font-semibold mb-2'>{packageItem.title}</h3>
              <p className='text-gray-600 mb-4'>{packageItem.description}</p>
              <div className='text-2xl font-bold text-indigo-700'>{packageItem.price}</div>
              <button className='mt-4 bg-pink-700 text-white py-2 px-4 rounded-full hover:bg-pink-600 transition duration-300'>
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Packages