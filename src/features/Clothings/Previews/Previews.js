import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { HiOutlinePlusSm } from 'react-icons/hi'
import { FaSearch, FaShoppingCart } from 'react-icons/fa'

import { useGetClothingsQuery } from '../../../store/apis/clothingsApiSlice'
import { selectCurrentCart } from '../../../store/slice/cartSlice'
import { selectCurrentMessage, resetMessage } from '../../../store/slice/messageSlice'
import { selectCurrentSpinner } from '../../../store/slice/spinnerSlice'
import { resetCart } from '../../../store/slice/cartSlice'
import useAuth from '../../../hooks/useAuth'
import Preview from './Preview'
import Pagination from '../../../components/uis/Pagination/Pagination'
import Cart from '../../../components/uis/Cart/Cart'
import MessageBox from '../../../components/uis/MessageBox/MessageBox'
import Spinner from '../../../components/uis/Spinner/Spinner'

const Previews = () => {
    const [currentPage, setCurrentPage] = useState(1),
        [params, setParams] = useState(''),
        [open, setOpen] = useState(false),
        { user } = useAuth(),
        status = user?.status,
        cart = useSelector(selectCurrentCart),
        message = useSelector(selectCurrentMessage),
        spinner = useSelector(selectCurrentSpinner),
        dispatch = useDispatch()

    const { 
        data: clothings,
        isLoading,
        isSuccess,
        isError,
        error
     } = useGetClothingsQuery('clothings', {
        pollingInterval: 300000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    })

    const onDismiss = () =>{
        dispatch(resetMessage())
        dispatch(resetCart())
    }

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    const onSearchChange = (e) => {
        const query = e.target.value.toLowerCase()
        setParams(query)
    }

    const handleCart = state => setOpen(state)
    
    let content 
    if(isLoading) content = <p className='bg-white text-green-500 font-bold rounded-lg shadow border mx-auto'>Loading...</p>

    if(isError){
        content = <p className={`bg-white rounded-lg border shadow-lg mx-auto p-4 ${isError ? 'text-red' : 'text-green'}`}>{error?.data?.message || `An error occured: ${error}`}</p>
    }

    if(isSuccess){
        const { ids } = clothings
        let filteredIds = ids
        if(params){
            filteredIds = ids.filter(id => clothings.entities[id]?.categoryid?.toLowerCase().includes(params) || clothings.entities[id]?.name?.toLowerCase().includes(params) || clothings.entities[id]?.price?.toString().toLowerCase().includes(params) || clothings.entities[id]?.style?.toString().toLowerCase().includes(params) || clothings.entities[id]?.category?.toString().toLowerCase().includes(params))
        }

        if(filteredIds?.length > 0){
            const PAGE_SIZE = 8, // Number of rows per page
            totalPages = Math.ceil(filteredIds?.length / PAGE_SIZE),
            startIndex = (currentPage - 1) * PAGE_SIZE,
            endIndex = currentPage * PAGE_SIZE,
            currentIds = filteredIds.slice(startIndex, endIndex)

            content = (
                <>
                    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-4 px-4'>
                        {currentIds?.length > 0 && currentIds.map(clothingId => <Preview key={clothingId} clothingId={clothingId} />)}
                    </div>
                    <div className='py-4 pr-4'>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}/>
                    </div>
                </>
            ) 
        }else{
            content = <div className='w-full bg-white text-gray-900 p-4'>No record found</div>
        }
    }

  return (
    <div className='container mx-auto bg-white text-gray-800 rounded-lg border shadow-lg w-full'>
        <div className='border-b border-gray-200 pb-2 flex items-center justify-between'>
            <h2 className='text-xl font-bold text-gray-700 hover:text-gray-400 p-2 w-[70%]'>
               {`Clothing Categories`} </h2>
            <div className='flex items-center justify-end m-2 border-b border-b-2 border-teal-500 py-2 w-[25%]'>
                <div className='flex-shrink-0'>
                    <FaSearch className='text-gray-500' />
                </div>
                <input
                    className='appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none'
                    type='text'
                    placeholder='Search by name, style, category, price, ID...'
                    value={params}
                    onChange={onSearchChange}
                />
            </div>
            {(cart?.items?.length > 0) && <div className='flex mx-4 cursor-pointer' onClick={() => setOpen(true)}>
                <FaShoppingCart size={30} /> 
                <span className='bg-red-500 text-white text-sm font-bold rounded-full w-5 h-5 text-center ml-[-8px] mt-[-8px]'>{cart?.items?.length}</span>   
            </div>}
            {(status === 'Admin' || status === 'Staff') && <Link className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-2 w-8 h-8
                shadow-lg rounded-full text-center mx-4 my-4 text-center' to={`/dashboard/clothings/new`} title='Add new product'>
                <span><HiOutlinePlusSm /></span>
            </Link>}
        </div>
        <main>
            {(open && cart?.items?.length > 0) && <Cart open={open} close={handleCart} />}
            {spinner && <Spinner />}
            {message.status && <MessageBox open message={message.text} title={message.title} close={onDismiss} />}
            {content}
        </main>
    </div>
  )
}

export default Previews