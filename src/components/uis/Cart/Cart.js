import { useSelector, useDispatch } from 'react-redux'

import { selectCurrentCart, removeFromCart } from '../../../store/slice/cartSlice'
import { useAddNewOrderMutation } from '../../../store/apis/ordersApiSlice'
import { setMessage } from '../../../store/slice/messageSlice'
import { setSpinner } from '../../../store/slice/spinnerSlice'
import useAuth from '../../../hooks/useAuth'

const Cart = ({ open, close}) => {
    const cart = useSelector(selectCurrentCart),
        dispatch = useDispatch(),
        { user } = useAuth()

    const [addNewOrder] = useAddNewOrderMutation()

    const priceFormatter = price => `₦${price?.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`

    const handleRemoveFromCart = (clothingId) =>{
        dispatch(removeFromCart(clothingId))
    }

    const onOrder = async() =>{
        const payload = {
            customer: user?.userid,
            items: cart?.items,
            orderdate: Date.now()
        }
        const status = true
        let title = 'Process Order', type, text

        close(false)

        dispatch(setSpinner({ visibility: true }))
        try {
            const response = await addNewOrder(payload)
            if(response?.error){
                type = 'Error'
                text = response?.error?.data?.message || 'Something went wrong'
            }else{
                type = 'Success'
                text = 'Your order has been placed successfully and is underprocessing! Thank you for your patronage!!'
            }
            dispatch(setSpinner({ visibility: false }))
            dispatch(setMessage({ status, type, text, title }))
        } catch (err) {
            dispatch(setSpinner({ visibility: false }))
            type = 'Error'
            text = err.data?.message || 'Something weng wrong'
            dispatch(setMessage({ status, type, text, title }))
        }
    }

    return (
        <div>
            {open && (
            <div className='fixed inset-0 flex items-center justify-center z-50'>
                <div className='fixed inset-0 bg-gray-800 opacity-90'></div>
                <div className='relative bg-white w-auto rounded-lg shadow-lg z-10'>
                    <div className='text-center'>
                        <h2 className='text-xl font-bold border-b border-gray-500 py-2 text-gray-800 text-center'> Cart Items Preview</h2>
                        <div className='text-gray-700 '>
                            {cart?.items?.length > 0 && (
                                <table className='w-full table-auto border-collapsee'>
                                    <thead>
                                        <tr className='bg-gray-400 text-gray-800'>
                                            <th className='px-4 py-2 text-left'>S/N</th>
                                            <th className='px-4 py-2 text-left'>Item</th>
                                            <th className='px-4 py-2 text-left'>Price</th>
                                            <th className='px-4 py-2 text-left'>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cart?.items?.map((item, index) =>(
                                            <tr key={item?.clothing?._id}
                                                className={index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-400'}>
                                                <td className='px-4 py-2'>{index + 1}</td>
                                                <td className='px-4 py-2 text-left'>{item?.clothing?.name}</td>
                                                <td className='px-4 py-2'>{priceFormatter(item?.clothing?.price)}</td>
                                                <td className='px-4 py-2'>
                                                    <button className='px-2 py-1 rounded font-bold text-white bg-red-500 hover:bg-red-400 hover:text-gray-900 transition duration-500' onClick={() => handleRemoveFromCart(item?.clothing?._id)}>Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr className='bg-gray-200 text-gray-800 font-bold border-t border-gray-400 border-t-2'>
                                            <td colSpan={2} className='px-4 py-2 text-right'>Total Price</td>
                                            <td colSpan={2} className='px-4 py-2 text-left'>{priceFormatter(cart?.totalPrice)}</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            )}
                        </div>
                        <div className='flex justify-center p-2 border-t border-gray-400'>
                            <button
                                onClick={() => close(false)}
                                className='bg-red-300 hover:bg-red-500 text-white font-bold py-2 px-8 
                                    rounded-lg mr-2' >
                                Cancel
                            </button>
                            <button
                                onClick={onOrder}
                                className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-8 
                                    rounded-lg mr-2' >
                                Place Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            )}
        </div>
    )
}

export default Cart