import { Fragment, memo } from 'react'
import { BiEdit } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

import { PORT } from '../../assets/constants/data'
import useAuth from '../../hooks/useAuth'
import { useGetClothingsQuery } from '../../store/apis/clothingsApiSlice'

const Clothing = ({ clothingId }) => {
    const { user } = useAuth(),
        status = user?.status

    const { clothing } = useGetClothingsQuery('clothingsList', {
            selectFromResult: ({ data }) => ({
                clothing: data?.entities[clothingId]
            }),
        }),
        navigate = useNavigate()
  
    const handleEdit = () => navigate(`/dashboard/clothing/${clothingId}`)

    const priceFormatter = price => `₦${price?.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`

    return(
        <Fragment>
            <div className='flex flex-col justify-between bg-white shadow-lg border rounded hover:border-blue-500 transform transition-transform duration-500 hover:scale-105 hover:-translate-y-1'>
                <p className='bg-white border-b border-gray-200'>
                    <img src={`http://localhost:${PORT}/images/uploads/${clothing?.image}`} className='w-full h-48 object-cover' alt={`${clothing?.name}`} />
                </p>
                <div className='bg-white border-b border-gray-200 p-2'><p className='font-bold text-lg rounded-full px-2 py-1 bg-sky-300 w-full text-center'> {clothing?.name}</p></div>
                <p className='bg-white border-b border-gray-200 p-2'><span className='font-bold text-sm pr-3'>Price: </span> {priceFormatter(clothing?.price)}</p>
                <p className='bg-white border-b border-gray-200 p-2'><span className='font-bold text-sm pr-3'>Description:</span>
                    {clothing?.description}
                </p>
                <p className='bg-white border-b border-gray-200 p-2'><span className='font-bold text-sm pr-3'>Style:</span>
                    {clothing?.style}
                </p>
                <p className='bg-white border-b border-gray-200 p-2'><span className='font-bold text-sm pr-3'>Category:</span>
                    {clothing?.category}
                </p>
                {(status === 'Admin' || status === 'Staff') && <p className='flex justify-end items-center bg-gray-100 border-b border-gray-200 p-2'>
                    <button onClick={handleEdit}>
                        <span className=''><BiEdit size={20} /></span>
                    </button>
                </p>}
            </div>
        </Fragment>
    )
}

const memoizedClothing = memo(Clothing)

export default memoizedClothing