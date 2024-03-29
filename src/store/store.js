import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { apiSlice } from './apis/apiSlice'
import authSlice from './slice/authSlice'
import messageSlice from './slice/messageSlice'
import spinnerSlice from './slice/spinnerSlice'
import sidedrawSlice from './slice/sidedrawSlice'
import cartSlice from './slice/cartSlice'

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSlice,
        message: messageSlice,
        spinner: spinnerSlice,
        sidedraw: sidedrawSlice,
        cart: cartSlice,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
})

setupListeners(store.dispatch)