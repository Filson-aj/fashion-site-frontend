import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { useGetSalesQuery, useDeleteSaleMutation, useUpdateSaleMutation } from '../../store/apis/salesApiSlice'
import useTitle from '../../hooks/useTitle'
import useAuth from '../../hooks/useAuth'
import { selectCurrentMessage, setMessage, resetMessage } from '../../store/slice/messageSlice'
import { setSpinner, selectCurrentSpinner } from '../../store/slice/spinnerSlice'
import EditSaleForm from './EditSaleForm'
import MessageBox from '../../components/uis/MessageBox/MessageBox'
import ConfirmMessageBox from '../../components/uis/ConfirmMessageBox/ConfirmMessageBox'
import Spinner from '../../components/uis/Spinner/Spinner'

const EditSale = () => {
    useTitle('Update: Edit Sale')

    const { user } = useAuth(),
        status = user?.status

    const [deleteRecord, setDeleteRecord] = useState(false)

    const navigate = useNavigate(),
        dispatch = useDispatch(),
        message = useSelector(selectCurrentMessage),
        spinner = useSelector(selectCurrentSpinner)

    const { id } = useParams(),
        { sale } = useGetSalesQuery('saleList', {
            selectFromResult: ({ data }) =>({
                sale: data?.entities[id]
            }),
        })
    
    const [updateSale, {
        isSuccess,
        }] = useUpdateSaleMutation()
    
    const [deleteSale, {
        isSuccess: isDelSuccess,
        }] = useDeleteSaleMutation()

    const onSave = async(data) =>{
        const status = true
        let title, type, text
        dispatch(setSpinner({ visibility: true }))
        try {
            const res = await updateSale({ id: sale?.id, staff: data?.staff, customer: data?.customer, order: data?.order, saledate: data?.saledate })
            dispatch(setSpinner({ visibility: false }))
            if(res?.error){
                title = 'Update Error'
                type = 'Error'
                text = res?.error?.data?.message || 'Something went wrong'
            }else{
                title = 'Update Success'
                type = 'Success'
                text = res?.data?.message || `Sale's records has been updated successfully!`
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

    const onDelete = async(id) =>{
        const status = true
        let title, type, text
        setDeleteRecord(false)
        dispatch(setSpinner({ visibility: true }))
        try {
            const res = await deleteSale({ id: id })
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
                text = res?.data?.message || `Sale's records has been deleted successfully!`
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
        if(isSuccess || isDelSuccess || message?.type === 'Success'){
           navigate('/dashboard/sales')
        }
    }
    
    const onCancel = () =>{
        navigate('/dashboard/sales')
    }

    let content

    
    if(!sale){
        content = <div className='mx-auto bg-white text-gray-900 shadow-lg rounded-md p-8 mt-16 w-3/4'>Loading Sale Info...</div>
    }else{
        content = <EditSaleForm sale={sale} status={status} onSave={onSave} onCancel={onCancel} onDelete={() =>setDeleteRecord(true)} />
    }

    return (
        <>
            {spinner && <Spinner />}
            {message?.status && <MessageBox open message={message?.text} title={message?.title} close={onDismiss} />}
            {deleteRecord && <ConfirmMessageBox open message={`Do you really want to delete record?`}
            title={`Delete Sale's Record`} close={() => setDeleteRecord(false)}
            confirm={() =>onDelete(sale?.id)} />}
            {content}
        </>
    )
}

export default EditSale