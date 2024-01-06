import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { HiOutlinePlusSm } from 'react-icons/hi'
import { FaSearch } from 'react-icons/fa'

import { useGetOrdersQuery } from '../../store/apis/ordersApiSlice'
import { useUpdateOrderStatusMutation, useDeleteOrderMutation } from '../../store/apis/ordersApiSlice'
import { selectCurrentMessage, setMessage, resetMessage } from '../../store/slice/messageSlice'
import { setSpinner, selectCurrentSpinner } from '../../store/slice/spinnerSlice'
import useAuth from '../../hooks/useAuth'
import Order from './Order'
import Pagination from '../../components/uis/Pagination/Pagination'
import MessageBox from '../../components/uis/MessageBox/MessageBox'
import ConfirmMessageBox from '../../components/uis/ConfirmMessageBox/ConfirmMessageBox'
import Spinner from '../../components/uis/Spinner/Spinner'

const Orders = () => {
    const [currentPage, setCurrentPage] = useState(1),
        [deleteRecord, setDeleteRecord] = useState(false),
        [recordId, setRecordId] = useState(''),
        [params, setParams] = useState(''),
        { user } = useAuth(),
        status = user?.status

    const navigate = useNavigate(),
        dispatch = useDispatch(),
        message = useSelector(selectCurrentMessage),
        spinner = useSelector(selectCurrentSpinner)

    const { 
        data: orders,
        isLoading,
        isSuccess,
        isError,
        error
     } = useGetOrdersQuery('orders', {
        pollingInterval: 300000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    })

    const [updateOrderStatus, {
        isSuccess: isUpdateSuccess,
    }] = useUpdateOrderStatusMutation()

    const [deleteOrder, {
        isSuccess: isDelSuccess,
    }] = useDeleteOrderMutation()

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    const onSearchChange = (e) => {
        const query = e.target.value.toLowerCase()
        setParams(query)
    }

    const onUpdate = async(data) =>{
        const status = true
        let title, type, text
        dispatch(setSpinner({ visibility: true }))
        try {
            const res = await updateOrderStatus({ id: data?.id, status: data?.status })
            dispatch(setSpinner({ visibility: false }))
            if(res?.error){
                title = 'Update Error'
                type = 'Error'
                text = res?.error?.data?.message || 'Something went wrong'
            }else{
                title = 'Update Success'
                type = 'Success'
                text = res?.data?.message || `Order's status has been updated successfully!`
            }
            dispatch(setMessage({ status, type, text, title }))
        } catch (err) {
            //console.log(err)
            dispatch(setSpinner({ visibility: false }))
            title = 'Update Error'
            type = 'Error'
            text = err.data?.message || 'Something weng wrong'
            dispatch(setMessage({ status, type, text, title }))
        }
    }

    const handleOndelete = id =>{
        setRecordId(id)
        setDeleteRecord(true)
    }

    const onDelete = async(id) =>{
        const status = true
        let title, type, text
        setDeleteRecord(false)
        dispatch(setSpinner({ visibility: true }))
        try {
            const res = await deleteOrder({ id: id })
            setTimeout(() => {
                dispatch(setSpinner({ visibility: false }))
            }, 500)
            if(res?.error){
                title = 'Delete Error'
                type = 'Error'
                text = res?.error?.data?.message || 'Something went wrong'
            }else{
                title = 'Delete Success'
                type = 'Success'
                text = res?.data?.message || `Order's records has been deleted successfully!`
            }
            dispatch(setMessage({ status, type, text, title }))
        } catch (err) {
            //console.log(err)
            dispatch(setSpinner({ visibility: false }))
            title = 'Delete Error'
            type = 'Error'
            text = err.data?.message || 'Something weng wrong'
            dispatch(setMessage({ status, type, text, title }))
        }
    }

    const onDismiss = () =>{
        dispatch(resetMessage())
        if(isSuccess || isDelSuccess || isUpdateSuccess || message?.type === 'Success'){
           navigate('/dashboard/orders')
        }
    }
    
    let content 
    if(isLoading) content = <p className='bg-white text-green-500 font-bold rounded-lg shadow border mx-auto'>Loading...</p>

    if(isError){
        content = <p className={`bg-white rounded-lg border shadow-lg mx-auto p-4 ${isError ? 'text-red' : 'text-green'}`}>{error?.data?.message || `An error occured: ${error}`}</p>
    }

    if(isSuccess){
        const { ids } = orders
        let filteredIds = ids

        if(status === 'Customer'){
            filteredIds = ids.filter(id => orders?.entities[id]?.customer?._id === user?.userid)
        }
        if(params){
            filteredIds = ids.filter(id => orders.entities[id]?.orderid?.toLowerCase().includes(params) || orders.entities[id]?.status?.toLowerCase().includes(params) || orders.entities[id]?.customer?.name?.firstname?.toLowerCase().includes(params) || orders.entities[id]?.customer?.name?.surname?.toLowerCase().includes(params) || orders.entities[id]?.customer?.name?.othername?.toLowerCase().includes(params))
        }

        if(filteredIds?.length > 0){
            const PAGE_SIZE = 8, // Number of rows per page
            totalPages = Math.ceil(filteredIds?.length / PAGE_SIZE),
            startIndex = (currentPage - 1) * PAGE_SIZE,
            endIndex = currentPage * PAGE_SIZE,
            currentIds = filteredIds.slice(startIndex, endIndex)

            const tableContent = currentIds?.length > 0 && currentIds.map((orderId, index) =><tr key={orderId} className={index % 2 === 0 ? 'bg-gray-300 text-gray-900' : 'bg-gray-200 text-gray-800'}>
                <Order key={orderId} orderId={orderId} onUpdate={onUpdate} onDelete={handleOndelete} />
            </tr>)

            content = (
                <>
                    <table className='w-full table-auto border-collapse text-gray-900'>
                        <thead>
                            <tr className='dark:bg-gray-600 text-gray-800 dark:text-gray-100'>
                                <th scope='col' className='px-4 py-2 text-left'>S/N</th>
                                <th scope='col' className='px-4 py-2 text-left'>Customer</th>
                                <th scope='col' className='px-4 py-2 text-left'>ID</th>
                                <th scope='col' className='px-4 py-2 text-left'>Date</th>
                                <th scope='col' className='px-4 py-2 text-left'>Items</th>
                                <th scope='col' className='px-4 py-2 text-left'>Price</th>
                                <th scope='col' className='px-4 py-2 text-left'>Status</th>
                                {status !== 'Customer' && <th scope='col' className='px-4 py-2 text-left'>Action</th>}
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
               {`Pharmaceutical Inventory Orders`} </h2>
            <div className='flex items-center justify-end m-2 border-b border-b-2 border-teal-500 py-2 w-[25%]'>
                <div className='flex-shrink-0'>
                    <FaSearch className='text-gray-500' />
                </div>
                <input
                    className='appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none'
                    type='text'
                    placeholder='Search by ID, status, customer name...'
                    value={params}
                    onChange={onSearchChange}
                />
            </div>
            {status === 'Admin' && <Link className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-2 w-8 h-8
                shadow-lg rounded-full text-center mx-4 my-4 text-center' to={`/dashboard/orders/new`} title='Book a order'>
                <span><HiOutlinePlusSm /></span>
            </Link>}
        </div>
        <main>
            {spinner && <Spinner />}
            {message?.status && <MessageBox open message={message?.text} title={message?.title} close={onDismiss} />}
            {deleteRecord && <ConfirmMessageBox open message={`Do you really want to delete record?`}
            title={`Delete Order's Record`} close={() => setDeleteRecord(false)}
            confirm={() =>onDelete(recordId)} />}
            {content}
        </main>
    </div>
  )
}

export default Orders