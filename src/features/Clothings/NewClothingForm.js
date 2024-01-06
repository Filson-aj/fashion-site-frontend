import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { FiSave } from 'react-icons/fi'
import { X } from 'react-feather'

import { styles } from '../../assets/constants/data'
import { clothingSchema } from '../../assets/schema/schema'
import { CATEGORIES } from '../../configs/categories'
import { COLORS } from '../../configs/colors'
import useTitle from '../../hooks/useTitle'
import { useAddNewClothingMutation } from '../../store/apis/clothingsApiSlice'
import { selectCurrentMessage, setMessage, resetMessage } from '../../store/slice/messageSlice'
import { setSpinner, selectCurrentSpinner } from '../../store/slice/spinnerSlice'
import MessageBox from '../../components/uis/MessageBox/MessageBox'
import Spinner from '../../components/uis/Spinner/Spinner'

const NewClothingForm = () => {
    useTitle('Create: New Clothing')
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ resolver: yupResolver(clothingSchema), mode: 'onBlur'})

    const navigate = useNavigate(),
        dispatch = useDispatch(),
        message = useSelector(selectCurrentMessage),
        spinner = useSelector(selectCurrentSpinner)

    const [addNewClothing, {
        isSuccess, 
    }] = useAddNewClothingMutation()

    const categories = Object.values(CATEGORIES).map(category =>{
        return (
            <option key={category} value={category}>{category}</option>
        )
    })
    const colors = Object.values(COLORS).map(color =>{
        return (
            <option key={color} value={color}>{color}</option>
        )
    })

    const onSave = async(data) =>{
        const status = true
        let title = 'New Clothing Record', type, text

        dispatch(setSpinner({ visibility: true }))

        try {            
            const response = await addNewClothing(data)
            if(response?.error){
                type = 'Error'
                text = response?.error?.data?.message || 'Something went wrong'
            }else{
                type = 'Success'
                text = response?.data?.message || 'Clothing records has been saved successfully!'
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
           navigate('/dashboard/clothings')
        }
    }

    const onCancel = () =>{
        navigate('/dashboard/clothings')
    }

    const content = (
    <div className='flex items-center justify-center w-3/4 py-4 my-2 mx-auto'>
        <div className='w-full px-6 py-6 bg-white dark:text-gray-800
            border rounded-lg shadow-lg'>
            <form onSubmit={handleSubmit(onSave)} >
                <div className='flex justify-between items-center border-b border-gray-200 mb-4'>
                    <h2 className='text-xl font-bold text-center pb-2 '>New Clothing</h2>
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
                    <label htmlFor='name' className='block font-bold mb-2 text-sm'>
                        Name
                    </label>
                    <input type='text' name='name' id='name' className={styles.input} required
                        {...register('name')} placeholder='Enter your first name'
                        aria-invalid={errors.name ? 'true' : 'false'} />
                    {errors.name && <p className='text-red-400 text-sm'>{errors.name.message}</p>}
                </div>
                <div className='mb-2'>
                    <label htmlFor='style' className='block font-bold mb-2 text-sm'>
                        Style
                    </label>
                    <input type='text' name='style' id='style' className={styles.input} required
                        {...register('style')}
                        aria-invalid={errors.style ? 'true' : 'false'} />
                    {errors.style && <p className='text-red-400 text-sm'>{errors.style.message}</p>}
                </div>
                <div className=''>
                    <label className='block mb-2 font-bold text-md' htmlFor='category'>Category</label>
                    <select 
                        id='category'
                        name='category'
                        className={`${styles.input}`}
                        {...register('category')}>{categories}</select>
                </div>
                <div className=''>
                    <label className='block mb-2 font-bold text-md' htmlFor='color'>Colors</label>
                    <select 
                        id='color'
                        name='color'
                        className={`${styles.input}`}
                        multiple={true}
                        size={3}
                        {...register('color')}>{colors}</select>
                </div>
                <div className='mb-2'>
                    <label htmlFor='price' className='block font-bold mb-2 text-sm'>
                        Price
                    </label>
                    <input type='number' name='price' id='price' className={styles.input} required
                        {...register('price')}
                        aria-invalid={errors.price ? 'true' : 'false'} />
                    {errors.price && <p className='text-red-400 text-sm'>{errors.price.message}</p>}
                </div>
                <div className='mb-2'>
                    <label htmlFor='description' className='block font-bold mb-2 text-sm'>
                        Description
                    </label>
                    <textarea name='description' id='description' rows={4} className={styles.input} 
                        {...register('description')}
                        placeholder='Enter Description' 
                        aria-invalid={errors.description ? true : false}></textarea>
                    {errors.description && <p style={{color: 'red', fontSize: '10pt'}}>
                        {errors.description.message}</p>}
                </div>
                <div className=''>
                  <label className='block mb-2 font-bold text-md' htmlFor='image'>Image</label>
                  <input type='file'  name='image'  id='image' accept='image/*' className={styles.input} {...register('image')} />
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

export default NewClothingForm