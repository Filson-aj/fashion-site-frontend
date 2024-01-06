import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { FiSave } from 'react-icons/fi'
import { X } from 'react-feather'

import { styles } from '../../assets/constants/data'
import { drugSchema } from '../../assets/schema/schema'
import useTitle from '../../hooks/useTitle'
import { useAddNewDrugMutation } from '../../store/apis/drugsApiSlice'
import { useGetCategoriesQuery } from '../../store/apis/categoriesApiSlice'
import { useGetSuppliersQuery } from '../../store/apis/suppliersApiSlice'
import { selectCurrentMessage, setMessage, resetMessage } from '../../store/slice/messageSlice'
import { setSpinner, selectCurrentSpinner } from '../../store/slice/spinnerSlice'
import MessageBox from '../../components/uis/MessageBox/MessageBox'
import Spinner from '../../components/uis/Spinner/Spinner'

const NewDrugForm = () => {
    useTitle('Create: New Drug')
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ resolver: yupResolver(drugSchema), mode: 'onBlur'})

    const navigate = useNavigate(),
        dispatch = useDispatch(),
        message = useSelector(selectCurrentMessage),
        spinner = useSelector(selectCurrentSpinner)

    const [addNewDrug, {
        isSuccess, 
    }] = useAddNewDrugMutation()

    const { data: categories } = useGetCategoriesQuery('categoriesList')

    const { data: suppliers } = useGetSuppliersQuery('suppliersList')

    const newcategories = []
    const newsuppliers = []

    categories?.ids?.map(id => {
        newcategories.push({
            _id: categories?.entities[id]?._id,
            categoryid: categories?.entities[id]?.categoryid,
            name: categories?.entities[id]?.name,
            price: categories?.entities[id]?.price,
        })
        return true
    })

    suppliers?.ids?.map(id => {
        newsuppliers.push({
            _id: suppliers?.entities[id]?._id,
            supplierid: suppliers?.entities[id]?.supplierid,
            name: suppliers?.entities[id]?.name,
        })
        return true
    })

    const categoriesoptions = newcategories.map(newcategory => <option key={newcategory?._id} value={newcategory?._id}>{newcategory?.name}</option>)

    const suppliersoptions = newsuppliers.map(newsupplier => <option key={newsupplier?._id} value={newsupplier?._id}>{newsupplier?.name}</option>)


    const onSave = async(data) =>{
        const payload = {
            manufacturedate: data?.manufacturedate,
            expiredate: data?.expiredate,
            category: data?.category,
            supplier: data?.supplier,
        }
        const status = true
        let title = 'New Drug Record', type, text

        dispatch(setSpinner({ visibility: true }))

        try {
            const response = await addNewDrug(payload)
            if(response?.error){
                type = 'Error'
                text = response?.error?.data?.message || 'Something went wrong'
            }else{
                type = 'Success'
                text = response?.data?.message || 'New drug has been added successfully!'
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
           navigate('/dashboard/drugs')
        }
    }

    const onCancel = () =>{
        navigate('/dashboard/drugs')
    }

    const content = (
    <div className='flex items-center justify-center w-3/4 py-4 my-2 mx-auto'>
        <div className='w-full px-6 py-6 bg-white dark:text-gray-800
            border rounded-lg shadow-lg'>
            <form onSubmit={handleSubmit(onSave)}>
                <div className='flex justify-between items-center border-b border-gray-200 mb-4'>
                    <h2 className='text-xl font-bold text-center pb-2 '>New Drug</h2>
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
                    <label htmlFor='manufacturedate' className='block font-bold mb-2 text-sm'>
                        Manufacture Date
                    </label>
                    <input type='date' name='manufacturedate' id='manufacturedate' className={styles.input} required
                        {...register('manufacturedate')} aria-invalid={errors.manufacturedate ? 'true' : 'false'} />
                    {errors.manufacturedate && <p className='text-red-400 text-sm'>{errors.manufacturedate.message}</p>}
                </div>
                <div className='mb-2'>
                    <label htmlFor='expiredate' className='block font-bold mb-2 text-sm'>
                        Expire Date
                    </label>
                    <input type='date' name='expiredate' id='expiredate' className={styles.input} required
                        {...register('expiredate')} aria-invalid={errors.expiredate ? 'true' : 'false'} />
                    {errors.expiredate && <p className='text-red-400 text-sm'>{errors.expiredate.message}</p>}
                </div>
                <div className='mb-2'>
                    <label htmlFor='category' className='block font-bold mb-2 text-sm'>
                        Category
                    </label>
                    <select 
                        name='category' 
                        id='category' 
                        className={styles.input} 
                        {...register('category')} 
                        required
                        aria-invalid={errors.category ? 'true' : 'false'}>
                            <option value={``}>---Select---</option>
                            {categoriesoptions}
                        </select>
                    {errors.category && <p style={{color: 'red', fontSize: '10pt'}}>{errors.category.message}</p>}
                </div>
                <div className='mb-2'>
                    <label htmlFor='supplier' className='block font-bold mb-2 text-sm'>
                        Supplier
                    </label>
                    <select 
                        name='supplier' 
                        id='supplier' 
                        className={styles.input} 
                        {...register('supplier')} 
                        required>
                            <option value={``}>---Select---</option>
                            {suppliersoptions}
                    </select>
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

export default NewDrugForm