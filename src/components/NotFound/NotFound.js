import { Link } from 'react-router-dom'
import { urls } from '../../assets/constants/data'

const NotFound = () => {
  return (
    <div className='flex items-center justify-center h-screen bg-gray-100'>
      <div className='text-center'>
        <h1 className='text-4xl font-bold text-gray-800'>Page Not Found</h1>
        <p className='mt-2 text-gray-600'>Return to <Link to={urls.root}>Home</Link></p>
      </div>
    </div>
  );
};

export default NotFound