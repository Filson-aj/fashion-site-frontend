import { Fragment, memo } from 'react'
import { BiEdit } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'

import useAuth from '../../hooks/useAuth'
import { useGetSalesQuery } from '../../store/apis/salesApiSlice'

const Sale = ({ saleId }) => {
    const { sale } = useGetSalesQuery('salesList', {
            selectFromResult: ({ data }) => ({
                sale: data?.entities[saleId]
            }),
        }),
        navigate = useNavigate(),
        { user } = useAuth(),
        status = user?.status
  
    const handleEdit = () => navigate(`/dashboard/sales/${saleId}`)

    const priceFormatter = price => `₦${price?.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`

    const customer = sale?.customer,
        customername = `${customer?.name.firstname} ${customer?.name.othername} ${customer?.name.surname}`,
        phone = customer?.contact.phone,
        address = customer?.contact.address

    const staff = sale?.staff,
        staffname = `${staff?.name.firstname} ${staff?.name.othername} ${staff?.name.surname}`,
        staffphone = staff?.contact.phone,
        staffaddress = staff?.contact.address

    const order = sale?.order
    console.log(order)

    return(
        <Fragment>
            <td className={`px-4 py-1.5`}>{sale?.sn}</td>
            <td className={`px-4 py-1.5`}>
                <p className='my-1'><span className='italic font-bold'>Name: </span>{customername}</p>
                <p className='my-1'><span className='italic font-bold'>Phone: </span>{phone}</p>
                <p className='my-1'><span className='italic font-bold'>Address: </span>{address}</p>
            </td>
            <td className={`px-4 py-1.5`}>
                <p className='my-1'><span className='italic font-bold'>Name: </span>{staffname}</p>
                <p className='my-1'><span className='italic font-bold'>Phone: </span>{staffphone}</p>
                <p className='my-1'><span className='italic font-bold'>Address: </span>{staffaddress}</p>
            </td>
            <td className={`px-4 py-1.5`}>{sale?.order?.orderid}</td>
            <td className={`px-4 py-1.5`}>{priceFormatter(sale?.order?.price)}</td>
            <td className={`px-4 py-1.5 w-[20%]`}>{moment(order?.orderdate).format('DD/MM/YYYY')}</td>
            <td className={`px-4 py-1.5`}>{moment(sale?.saledate).format('DD/MM/YYYY')}</td>
            {status === 'Admin' && <td className={`px-4 py-1.5`}>
                <button onClick={handleEdit}>
                    <span className=''><BiEdit size={20} /></span>
                </button>
            </td>}
        </Fragment>
    )
}

const memoizedSale = memo(Sale)

export default memoizedSale