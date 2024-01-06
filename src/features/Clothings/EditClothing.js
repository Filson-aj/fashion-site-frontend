import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { useGetClothingsQuery, useDeleteClothingMutation, useUpdateClothingMutation } from '../../store/apis/clothingsApiSlice'
import useTitle from '../../hooks/useTitle'
import useAuth from '../../hooks/useAuth'
import { selectCurrentMessage, setMessage, resetMessage } from '../../store/slice/messageSlice'
import { setSpinner, selectCurrentSpinner } from '../../store/slice/spinnerSlice'
import EditClothingForm from './EditClothingForm'
import MessageBox from '../../components/uis/MessageBox/MessageBox'
import ConfirmMessageBox from '../../components/uis/ConfirmMessageBox/ConfirmMessageBox'
import Spinner from '../../components/uis/Spinner/Spinner'

const EditClothing = () => {
    useTitle('Update: Edit Clothing')

    const { user } = useAuth(),
        status = user?.status

    const [deleteRecord, setDeleteRecord] = useState(false)

    const navigate = useNavigate(),
        dispatch = useDispatch(),
        message = useSelector(selectCurrentMessage),
        spinner = useSelector(selectCurrentSpinner)

    const { id } = useParams(),
        { clothing } = useGetClothingsQuery('clothingList', {
            selectFromResult: ({ data }) =>({
                clothing: data?.entities[id]
            }),
        })
    
    const [updateClothing, {
        isSuccess,
        }] = useUpdateClothingMutation()
    
    const [deleteClothing, {
        isSuccess: isDelSuccess,
        }] = useDeleteClothingMutation()

    const onSave = async(data) =>{
        const status = true
        let title, type, text
        dispatch(setSpinner({ visibility: true }))
        try {
            const res = await updateClothing(data)
            dispatch(setSpinner({ visibility: false }))
            if(res?.error){
                title = 'Update Error'
                type = 'Error'
                text = res?.error?.data?.message || 'Something went wrong'
            }else{
                title = 'Update Success'
                type = 'Success'
                text = res?.data?.message || `Clothing's records has been updated successfully!`
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
            const res = await deleteClothing({ id: id })
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
                text = res?.data?.message || `Clothing's records has been deleted successfully!`
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
           navigate('/dashboard/inventory')
        }
    }
    
    const onCancel = () =>{
        navigate('/dashboard/inventory')
    }

    let content

    
    if(!clothing){
        content = <div className='mx-auto bg-white text-gray-900 shadow-lg rounded-md p-8 mt-16 w-3/4'>Loading Clothing Info...</div>
    }else{
        content = <EditClothingForm clothing={clothing} status={status} onSave={onSave} onCancel={onCancel} onDelete={() =>setDeleteRecord(true)} />
    }

    return (
        <>
            {spinner && <Spinner />}
            {message?.status && <MessageBox open message={message?.text} title={message?.title} close={onDismiss} />}
            {deleteRecord && <ConfirmMessageBox open message={`Do you really want to delete record?`}
            title={`Delete Clothing's Record`} close={() => setDeleteRecord(false)}
            confirm={() =>onDelete(clothing?.id)} />}
            {content}
        </>
    )
}

export default EditClothing