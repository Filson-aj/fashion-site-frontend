import { Fragment, memo } from 'react'
import { BiEdit } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'

import { useGetDrugsQuery } from '../../store/apis/drugsApiSlice'

const Drug = ({ drugId }) => {
    const { drug } = useGetDrugsQuery('drugsList', {
            selectFromResult: ({ data }) => ({
                drug: data?.entities[drugId]
            }),
        }),
        navigate = useNavigate()

    const expired = moment(drug?.manufacturedate).isSameOrAfter(moment(drug?.expiredate))
  
    const handleEdit = () => navigate(`/dashboard/drugs/${drugId}`)

    const priceFormatter = price => `₦${price?.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`

    return(
        <Fragment>
            <td className={`px-4 py-1.5`}>{drug?.sn}</td>
            <td className={`px-4 py-1.5`}>{drug?.category?.name}</td>
            <td className={`px-4 py-1.5`}>{drug?.supplier?.name}</td>
            <td className={`px-4 py-1.5`}>{moment(drug?.manufacturedate).format('YYYY/MM/DD')}</td>
            <td className={`px-4 py-1.5`}>{moment(drug?.expiredate).format('YYYY/MM/DD')}</td>
            <td className={`px-4 py-1.5`}>{priceFormatter(drug?.category?.price)}</td>
            <td className={`px-4 py-1.5`}>
                <p className={`font-bold text-center py-1 px-2 rounded-full w-full ${expired ? 'bg-red-400': 'bg-sky-400'}`}>{ expired ? 'Expired' : 'Good'}</p>
            </td>
            <td className={`px-4 py-1.5`}>
                <button onClick={handleEdit}>
                    <span className=''><BiEdit size={20} /></span>
                </button>
            </td>
        </Fragment>
    )
}

const memoizedDrug = memo(Drug)

export default memoizedDrug