import React from 'react'
import { FaUser, FaBirthdayCake, FaSuitcase, FaChalkboardTeacher } from 'react-icons/fa'

const servicesData = [
  {
    id: 1,
    title: 'Personal Styling',
    description: 'Experience personalized and tailored fashion advice to enhance your individual style and confidence.',
    icon: <FaUser className='text-gray-100' size={64} />,
  },
  {
    id: 2,
    title: 'Event Styling',
    description: 'Make a statement at your special events with expert styling for weddings, parties, and social gatherings.',
    icon: <FaBirthdayCake className='text-gray-100' size={64} />,
  },
  {
    id: 3,
    title: 'Wardrobe Consultation',
    description: 'Revamp your wardrobe with a professional consultation, ensuring a collection that aligns with your lifestyle.',
    icon: <FaSuitcase className='text-gray-100' size={64} />,
  },
  {
    id: 4,
    title: 'Fashion Workshops',
    description: 'Learn the latest trends, styling techniques, and fashion insights through engaging and informative workshops.',
    icon: <FaChalkboardTeacher className='text-gray-100' size={64} />,
  },
]

const Services = () => {
  return (
    <section className='relative py-12 bg-gray-100 overflow-hidden'>
      <div className='container mx-auto text-center mb-8'>
        <h2 className='text-3xl font-bold text-gray-800'>Styling Services</h2>
      </div>
      <div className='container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 relative'>
        {servicesData.map((service) => (
          <div
            key={service.id}
            className='feature-card bg-white p-6 rounded-lg shadow-md transition-transform duration-300 hover:transform hover:-translate-y-2 relative'
          >
            <div className='icon-container bg-black bg-opacity-50 flex items-center justify-center w-16 h-16 rounded-full shadow-lg border mb-4 p-4 mx-auto relative'>
              {service.icon}
            </div>
            <h3 className='text-lg font-semibold mb-2'>{service.title}</h3>
            <p className='text-gray-600'>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Services