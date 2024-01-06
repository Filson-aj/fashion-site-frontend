import { useState } from 'react'
import { Link } from 'react-router-dom'
import { HiOutlinePlusSm } from 'react-icons/hi'
import { FaSearch } from 'react-icons/fa'

import { useGetSalesQuery } from '../../store/apis/salesApiSlice'
import useAuth from '../../hooks/useAuth'
import Sale from './Sale'
import Pagination from '../../components/uis/Pagination/Pagination'

const Sales = () => {
    const [currentPage, setCurrentPage] = useState(1),
        [params, setParams] = useState(''),
        { user } = useAuth(),
        status = user?.status

    const { 
        data: sales,
        isLoading,
        isSuccess,
        isError,
        error
     } = useGetSalesQuery('sales', {
        pollingInterval: 300000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    })

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    const onSearchChange = (e) => {
        const query = e.target.value.toLowerCase()
        setParams(query)
    }
    
    let content 
    if(isLoading) content = <p className='bg-white text-green-500 font-bold rounded-lg shadow border mx-auto'>Loading...</p>

    if(isError){
        content = <p className={`bg-white rounded-lg border shadow-lg mx-auto p-4 ${isError ? 'text-red' : 'text-green'}`}>{error?.data?.message || `An error occured: ${error}`}</p>
    }

    if(isSuccess){
        const { ids } = sales
        let filteredIds = ids

        if (status === 'Customer'){
            filteredIds = ids.filter(id => sales?.entities[id]?.customer?._id === user?.userid)
        }
        if (status === 'Staff'){
            filteredIds = ids.filter(id => sales?.entities[id]?.staff?._id === user?.userid)
        }

        if(params){
            filteredIds = ids.filter(id => sales.entities[id]?.saleid?.toLowerCase().includes(params) || sales.entities[id]?.category?.name.toLowerCase().includes(params) || sales.entities[id]?.customer?.name?.firstname?.toLowerCase().includes(params) || sales.entities[id]?.customer?.name?.surname?.toLowerCase().includes(params) || sales.entities[id]?.customer?.name?.othername?.toLowerCase().includes(params) || sales.entities[id]?.customer?.name?.firstname?.toLowerCase().includes(params) || sales.entities[id]?.customer?.name?.surname?.toLowerCase().includes(params) || sales.entities[id]?.customer?.name?.othername?.toLowerCase().includes(params))
        }

        if(filteredIds?.length > 0){
            const PAGE_SIZE = 8, // Number of rows per page
            totalPages = Math.ceil(filteredIds?.length / PAGE_SIZE),
            startIndex = (currentPage - 1) * PAGE_SIZE,
            endIndex = currentPage * PAGE_SIZE,
            currentIds = filteredIds.slice(startIndex, endIndex)

            const tableContent = currentIds?.length > 0 && currentIds.map((saleId, index) =><tr className={index % 2 === 0 ? 'bg-gray-300 text-gray-900' : 'bg-gray-200 text-gray-800'}>
                <Sale key={saleId} saleId={saleId} />
            </tr>)

            content = (
                <>
                    <table className='w-full table-auto border-collapse text-gray-900'>
                        <thead>
                            <tr className='dark:bg-gray-600 text-gray-800 dark:text-gray-100'>
                                <th scope='col' className='px-4 py-2 text-left'>S/N</th>
                                <th scope='col' className='px-4 py-2 text-left'>Customer</th>
                                <th scope='col' className='px-4 py-2 text-left'>Sold By</th>
                                <th scope='col' className='px-4 py-2 text-left'>Order</th>
                                <th scope='col' className='px-4 py-2 text-left'>Price</th>
                                <th scope='col' className='px-4 py-2 text-left'>Order Date</th>
                                <th scope='col' className='px-4 py-2 text-left'>Date</th>
                                {status === 'Admin' && <th scope='col' className='px-4 py-2 text-left'>Action</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {tableContent}
                        </tbody>
                    </table>
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
               {`Pharmaceutical Inventory Sales`} </h2>
            <div className='flex items-center justify-end m-2 border-b border-b-2 border-teal-500 py-2 w-[25%]'>
                <div className='flex-shrink-0'>
                    <FaSearch className='text-gray-500' />
                </div>
                <input
                    className='appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none'
                    type='text'
                    placeholder='Search by ID, customer or staff name...'
                    value={params}
                    onChange={onSearchChange}
                />
            </div>
            {status === 'Admin' && <Link className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-2 w-8 h-8
                shadow-lg rounded-full text-center mx-4 my-4 text-center' to={`/dashboard/sales/new`} title='Book a sale'>
                <span><HiOutlinePlusSm /></span>
            </Link>}
        </div>
        <main>
            {content}
        </main>
    </div>
  )
}

export default Sales