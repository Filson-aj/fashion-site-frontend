import { urls, images } from '../../../assets/constants/data'
import SlideShow from './Slideshow/Slideshow'

const profiles = [
  {
    image: images.measurement1,
    link: '/styles',
    text: 'Explore Styles',
    title: 'Discover the Latest Fashion Trends',
    description: 'Explore a curated collection of the latest fashion trends, handpicked by our expert stylists. Stay ahead in the world of fashion with unique and stylish clothing options.'
  },
  {
    image: images.measurement2,
    link: '/portfolio',
    text: 'View Portfolio',
    title: 'Bespoke Styling Experiences',
    description: 'Immerse yourself in bespoke styling experiences tailored to your preferences. Browse through our portfolio to witness the artistry and creativity of our fashion stylists.'
  },
  {
    image: images.measurement3,
    link: '/services',
    text: 'Our Services',
    title: 'Personalized Fashion Services',
    description: 'Sign up for personalized fashion services designed to enhance your individual style. Our fashion experts are here to assist you in creating a wardrobe that reflects your personality.'
  },
  {
    image: images.measurement4,
    link: urls.contact,
    text: 'Contact Us',
    title: 'Elevate Your Fashion Experience',
    description: 'Connect with us to elevate your fashion experience. Our team is dedicated to providing top-notch fashion advice and assistance. Let us help you define your unique style.'
  },
  {
    image: images.measurement5,
    link: urls.about,
    text: 'About Us',
    title: 'The Art of Fashion Styling',
    description: 'Learn about our commitment to the art of fashion styling. Discover the passion and expertise behind our fashion stylist team, dedicated to making you look and feel your best.'
  },
  {
    image: images.measurement6,
    link: urls.signup,
    text: 'Sign up',
    title: 'Unlock Your Style Potential',
    description: 'Sign up for exclusive access to personalized fashion recommendations and style tips. Unlock your style potential and embrace a wardrobe that resonates with your fashion preferences.'
  },
  {
    image: images.measurement7,
    link: '/login',
    text: urls.signin,
    title: 'Your Fashion Journey Begins Here',
    description: 'Embark on a personalized fashion journey with our login feature. Access your style profile, track your favorite looks, and stay connected with the latest trends in the fashion world.'
  }
]

const Hero = () => <SlideShow profiles={profiles} />

export default Hero