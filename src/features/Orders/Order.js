import { Fragment, memo } from 'react'
import moment from 'moment'

import useAuth from '../../hooks/useAuth'
import { useGetOrdersQuery } from '../../store/apis/ordersApiSlice'

const Order = ({ orderId, onUpdate, onDelete }) => {
    const { user } = useAuth(),
        status = user?.status

    const { order } = useGetOrdersQuery('ordersList', {
        selectFromResult: ({ data }) => ({
            order: data?.entities[orderId]
        }),
    })

    const priceFormatter = price => `₦${price?.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`

    const customer = order?.customer,
        customername = `${customer?.name.firstname} ${customer?.name.othername} ${customer?.name.surname}`,
        phone = customer?.contact.phone,
        address = customer?.contact.address
    const items = order?.items
        
    return(
        <Fragment>
            <td className={`px-4 py-1.5`}>{order?.sn}</td>
            <td className={`px-4 py-1.5`}>
                <p className='my-1'><span className='italic font-bold'>Name: </span>{customername}</p>
                <p className='my-1'><span className='italic font-bold'>Phone: </span>{phone}</p>
                <p className='my-1'><span className='italic font-bold'>Address: </span>{address}</p>
            </td>
            <td className={`px-4 py-1.5`}>{order?.orderid}</td>
            <td className={`px-4 py-1.5`}>{moment(order?.orderdate).format('DD/MM/YYYY')}</td>
            <td className={`px-4 py-1.5 w-[30%]`}>{items?.map(item =>(
                <p key={item?.clothing?._id}>{`${item?.clothing?.name} ==> (${priceFormatter(item?.price)})`}</p>
            ))}</td>
            <td className={`px-4 py-1.5`}>{priceFormatter(order?.price)}</td>
            <td className={`px-4 py-1.5`}>
                <p className={`font-bold text-center py-1 px-3 rounded-full w-full ${order?.status === 'pending' ? 'bg-blue-300': order?.status === 'delivered' ? 'bg-green-600 text-gray-100' : 'bg-red-300'}`}>{ order?.status}</p>
            </td>
            {status !== 'Customer' && <td className={`px-4 py-1.5`}>
                <div className='flex flex-col justify-between'>
                    {order?.status === 'Pending' && <button className='py-1 px-2 mb-2 font-bold text-white rounded bg-red-400 shadow hover:bg-red-200 hover:text-gray-900 hover:font-extrabold transition duration-500' onClick={() => onUpdate({
                        id: order?._id,
                        status: 'Cancelled',
                    })}>
                        Cancel
                    </button>}
                    <button className='py-1 px-2 font-bold text-white rounded bg-red-600 shadow hover:bg-red-400 hover:text-gray-900 hover:font-extrabold transition duration-500' onClick={() => onDelete(order?._id)}>
                        Delete
                    </button>
                </div>
            </td>}
        </Fragment>
    )
}

const memoizedOrder = memo(Order)

export default memoizedOrder