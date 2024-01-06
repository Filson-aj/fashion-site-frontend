import React from 'react'

const About = () => {
  return (
    <section className='bg-gray-100 py-12'>
      <div className='container mx-auto text-center'>
        <h2 className='text-3xl font-bold text-gray-800 mb-2'>About Us</h2>
        <p className='text-lg text-gray-600 mb-8'>
          Discover the story behind our passion for fashion and commitment to making you look and feel your best.
        </p>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
          <div className='bg-white p-6 rounded-lg shadow-md'>
            <h3 className='text-lg font-semibold mb-2'>Our Mission</h3>
            <p className='text-gray-600 mb-4'>
              At Joyce's Fashion Stylist Zone, our mission is to empower individuals through personalized fashion experiences. We believe that style is a form of self-expression, and we are here to help you discover and embrace your unique style.
            </p>

            <h3 className='text-lg font-semibold mb-2'>Our Approach</h3>
            <p className='text-gray-600'>
              With a team of experienced and passionate fashion stylists, we take a personalized approach to styling. Whether it's a special event, a wardrobe refresh, or fashion workshops, we are dedicated to providing expert guidance and creating memorable fashion moments.
            </p>
          </div>

          <div className='bg-white p-6 rounded-lg shadow-md'>
            <h3 className='text-lg font-semibold mb-2'>Our Story</h3>
            <p className='text-gray-600'>
              Joyce's Fashion Stylist Zone was founded with a vision to redefine the fashion experience. From humble beginnings to becoming a trusted name in the industry, our journey has been marked by a commitment to excellence, creativity, and a genuine passion for helping individuals look and feel confident in their style.
            </p>

            <h3 className='text-lg font-semibold mb-2 mt-4'>Our Team</h3>
            <p className='text-gray-600'>
              Meet the talented individuals behind Joyce's Fashion Stylist Zone. Our team of experienced fashion stylists is dedicated to staying on top of trends, providing personalized recommendations, and ensuring that each client receives the attention and expertise they deserve.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About