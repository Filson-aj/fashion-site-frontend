import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { FiSave } from 'react-icons/fi'
import { X } from 'react-feather'

import { styles } from '../../assets/constants/data'
import { saleSchema } from '../../assets/schema/schema'
import useTitle from '../../hooks/useTitle'
import { useAddNewSaleMutation } from '../../store/apis/salesApiSlice'
import { selectCurrentMessage, setMessage, resetMessage } from '../../store/slice/messageSlice'
import { setSpinner, selectCurrentSpinner } from '../../store/slice/spinnerSlice'
import MessageBox from '../../components/uis/MessageBox/MessageBox'
import Spinner from '../../components/uis/Spinner/Spinner'

const NewSaleForm = () => {
    useTitle('Create: New Sale')
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ resolver: yupResolver(saleSchema), mode: 'onBlur'})

    const navigate = useNavigate(),
        dispatch = useDispatch(),
        message = useSelector(selectCurrentMessage),
        spinner = useSelector(selectCurrentSpinner)

    const [addNewSale, {
        isSuccess, 
    }] = useAddNewSaleMutation()


    const onSave = async(data) =>{
        const payload = {
            staff: data?.staff,
            customer: data?.customer,
            order: data?.order,
            saledate: data?.saledate,
        }
        const status = true
        let title = 'New Sale Record', type, text

        dispatch(setSpinner({ visibility: true }))

        try {
            const response = await addNewSale(payload)
            if(response?.error){
                type = 'Error'
                text = response?.error?.data?.message || 'Something went wrong'
            }else{
                type = 'Success'
                text = response?.data?.message || 'New sale record has been added successfully!'
            }
            dispatch(setSpinner({ visibility: false }))
            dispatch(setMessage({ status, type, text, title }))
        } catch (err) {
            //console.log(err)
            dispatch(setSpinner({ visibility: false }))
            type = 'Error'
            text = err.data?.message || 'Something weng wrong'
            dispatch(setMessage({ status, type, text, title }))
        }
    }

    const onDismiss = () =>{
        dispatch(resetMessage())
        if(isSuccess || message.type === 'Success'){
           navigate('/dashboard/sales')
        }
    }

    const onCancel = () =>{
        navigate('/dashboard/sales')
    }

    const content = (
    <div className='flex items-center justify-center w-3/4 py-4 my-2 mx-auto'>
        <div className='w-full px-6 py-6 bg-white dark:text-gray-800
            border rounded-lg shadow-lg'>
            <form onSubmit={handleSubmit(onSave)}>
                <div className='flex justify-between items-center border-b border-gray-200 mb-4'>
                    <h2 className='text-xl font-bold text-center pb-2 '>New Sale Record</h2>
                    <div className='flex justify-end py-2 mb-2'>
                    <button
                        type='submit'
                        className='mr-2 px-3 py-1.5 cursor-pointer bg-blue-500 hover:bg-blue-400 rounded-md disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center text-white'
                        title='Save'><span className='mr-2'><FiSave size={20} /></span> Save</button>
                    <button
                        type='button'
                        className='px-3 py-1.5 cursor-pointer bg-red-400 hover:bg-yellow-400 rounded-md disabled:bg-yellow-300 disabled:cursor-not-allowed flex items-center text-white ml-4'
                        title='Cancel'
                        onClick={onCancel}><span className='mr-2'><X size={20} /></span> Cancel</button>
                    </div>
                </div>
                <div className='mb-2'>
                    <label htmlFor='staff' className='block font-bold mb-2 text-sm'>
                        Staff ID
                    </label>
                    <input type='text' name='staff' id='staff' placeholder='Staff in charge of order' className={styles.input} required
                        {...register('staff')} aria-invalid={errors.staff ? 'true' : 'false'} />
                    {errors.staff && <p className='text-red-400 text-sm'>{errors.staff.message}</p>}
                </div>
                <div className='mb-2'>
                    <label htmlFor='customer' className='block font-bold mb-2 text-sm'>
                        Customer ID
                    </label>
                    <input type='text' name='customer' id='customer' placeholder='Enter customer ID' className={styles.input} required
                        {...register('customer')} aria-invalid={errors.customer ? 'true' : 'false'} />
                    {errors.customer && <p className='text-red-400 text-sm'>{errors.customer.message}</p>}
                </div>
                <div className='mb-2'>
                    <label htmlFor='order' className='block font-bold mb-2 text-sm'>
                        Order ID
                    </label>
                    <input type='text' name='order' id='order' placeholder='Enter order ID' className={styles.input} required {...register('order')} aria-invalid={errors.order ? 'true' : 'false'} />
                    {errors.order && <p className='text-red-400 text-sm'>{errors.order.message}</p>}
                </div>
                <div className='mb-2'>
                    <label htmlFor='saledate' className='block font-bold mb-2 text-sm'>
                        Date
                    </label>
                    <input type='date' name='saledate' id='saledate' className={styles.input} required
                        {...register('saledate')} aria-invalid={errors.saledate ? 'true' : 'false'} />
                    {errors.saledate && <p className='text-red-400 text-sm'>{errors.saledate.message}</p>}
                </div>
            </form>
        </div>
    </div>)

    return (
        <>
            {spinner && <Spinner />}
            {message.status && <MessageBox open message={message.text} title={message.title} close={onDismiss} />}
            {content}
        </>
    )
}

export default NewSaleForm