import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { FiSave } from 'react-icons/fi'
import { HiTrash } from 'react-icons/hi'
import { X } from 'react-feather'

import { styles } from '../../assets/constants/data'
import { saleSchema } from '../../assets/schema/schema'

const EditSaleForm = ({ sale, onSave, onDelete, onCancel  }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({defaultValues: {
    id: sale?.id,
    staff: sale?.staff?.staffid,
    customer: sale?.customer?.customerid,
    order: sale?.order?.orderid,
    saledate: sale?.saledate,
  }, resolver: yupResolver(saleSchema), mode: 'onBlur'})
  
  const content = (
    <div className='flex items-center justify-center w-3/4 py-4 my-2 mx-auto'>
        <div className='w-full px-6 py-6 bg-white dark:text-gray-800
            border rounded-lg shadow-lg'>
            <form onSubmit={handleSubmit(onSave)}>
              <div className='flex justify-between items-center border-b border-gray-200 mb-4'>
                <h2 className='text-xl font-bold text-center pb-2 '>Update Sale's Records</h2>
                <div className='flex justify-end py-2 mb-2'>
                  <button
                      type='submit'
                      className='mr-2 px-3 py-1.5 cursor-pointer bg-blue-500 hover:bg-blue-400 rounded-md disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center text-white'
                      title='Save'><span className='mr-2'><FiSave size={20} /></span> Save</button>
                  <button
                    type='button'
                    className='px-3 py-1.5 cursor-pointer bg-red-500 hover:bg-red-400 rounded-md disabled:bg-red-300 disabled:cursor-not-allowed flex items-center text-white'
                    title='Delete'
                    onClick={onDelete}><span className='mr-2'><HiTrash size={20} /></span> Delete</button>
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
                    <label htmlFor='orderdate' className='block font-bold mb-2 text-sm'>
                        Date
                    </label>
                    <input type='date' name='orderdate' id='orderdate' className={styles.input} required
                        {...register('orderdate')} aria-invalid={errors.orderdate ? 'true' : 'false'} />
                    {errors.orderdate && <p className='text-red-400 text-sm'>{errors.orderdate.message}</p>}
                </div>
            </form>
        </div>
    </div>)

  return content
}

export default EditSaleForm