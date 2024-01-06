import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import { store } from '../../store/store'
import { usersApiSlice } from '../../store/apis/usersApiSlice'
import { staffsApiSlice } from '../../store/apis/staffsApiSlice'
import { customersApiSlice } from '../../store/apis/customersApiSlice'
//import { measurementsApiSlice } from '../../store/apis/measurementsApiSlice'
import { clothingsApiSlice } from '../../store/apis/clothingsApiSlice'
/* import { salesApiSlice } from '../../store/apis/salesApiSlice'
import { ordersApiSlice } from '../../store/apis/ordersApiSlice' */

const Prefetch = () => {
    useEffect(() =>{
        store.dispatch(usersApiSlice.util.prefetch('getUsers', 'usersList', { force: true }))
        store.dispatch(staffsApiSlice.util.prefetch('getStaffs', 'staffsList', { force: true }))
        store.dispatch(customersApiSlice.util.prefetch('getCustomers', 'customersList', { force: true }))
        //store.dispatch(measurementsApiSlice.util.prefetch('getMeasurements', 'measurementsList', { force: true }))
        //store.dispatch(ordersApiSlice.util.prefetch('getOrders', 'ordersList', { force: true }))
        store.dispatch(clothingsApiSlice.util.prefetch('getClothings', 'clothingsList', { force: true }))
        //store.dispatch(salesApiSlice.util.prefetch('getSales', 'salesList', { force: true }))
    }, [])
    return <Outlet />
}

export default Prefetch