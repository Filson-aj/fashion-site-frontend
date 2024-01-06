import React from 'react'
import { Link } from 'react-router-dom'
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'

const Contact = () => {
  return (
    <section className='bg-gray-100 py-12'>
      <div className='container mx-auto text-center'>
        <h2 className='text-3xl font-bold text-gray-800 mb-2'>Contact Us</h2>
        <p className='text-lg text-gray-600 mb-8'>
          Have questions or want to schedule an appointment? Reach out to us. We'd love to hear from you!
        </p>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8'>
          <div className='bg-white p-6 rounded-lg shadow-md'>
            <h3 className='text-lg font-semibold mb-2'>Our Location</h3>
            <div className='flex items-center mb-4'>
              <FaMapMarkerAlt size={20} className='mr-2' />
              <p>123 Fashion Street, Cityville, Country</p>
            </div>

            <h3 className='text-lg font-semibold mb-2'>Contact Information</h3>
            <div className='flex items-center mb-4'>
              <FaPhone size={20} className='mr-2' />
              <p>+1 234 567 890</p>
            </div>
            <div className='flex items-center'>
              <FaEnvelope size={20} className='mr-2' />
              <p>info@example.com</p>
            </div>
          </div>

          <div className='bg-white p-6 rounded-lg shadow-md'>
            <h3 className='text-lg font-semibold mb-2'>Get In Touch</h3>
            <form className='text-left'>
              <div className='mb-4'>
                <label htmlFor='name' className='block text-gray-600 text-sm font-semibold mb-2'>Your Name</label>
                <input type='text' id='name' name='name' className='w-full p-2 border border-gray-300 rounded focus:outline-none' />
              </div>
              <div className='mb-4'>
                <label htmlFor='email' className='block text-gray-600 text-sm font-semibold mb-2'>Your Email</label>
                <input type='email' id='email' name='email' className='w-full p-2 border border-gray-300 rounded focus:outline-none' />
              </div>
              <div className='mb-4'>
                <label htmlFor='message' className='block text-gray-600 text-sm font-semibold mb-2'>Your Message</label>
                <textarea id='message' name='message' rows='4' className='w-full p-2 border border-gray-300 rounded focus:outline-none'></textarea>
              </div>
              <button type='submit' className='bg-pink-500 text-white py-2 px-4 rounded-full hover:bg-pink-600 transition duration-300'>
                Send Message
              </button>
            </form>
          </div>
        </div>

        <div className='mt-8'>
          <h3 className='text-lg font-semibold mb-4'>Connect With Us</h3>
          <ul className='flex space-x-4'>
            <li>
              <Link to='https://facebook.com' target='_blank' rel='noopener noreferrer'>
                <FaFacebook size={24} />
              </Link>
            </li>
            <li>
              <Link to='https://twitter.com' target='_blank' rel='noopener noreferrer'>
                <FaTwitter size={24} />
              </Link>
            </li>
            <li>
              <Link to='https://instagram.com' target='_blank' rel='noopener noreferrer'>
                <FaInstagram size={24} />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Contact