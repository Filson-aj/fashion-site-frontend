import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalPrice: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const { clothing, price } = action.payload
      const existingClothing = state.items.find(item => item.clothing._id === clothing._id)
      
      if (!existingClothing) {
        state.items.push({ clothing, price })
        // Update totalPrice and totalQuantity
        state.totalPrice += price
      }
    },
    removeFromCart: (state, action) => {
      const clothingId = action.payload
      const removedClothing = state.items.find((item) => item.clothing._id === clothingId)
      
      if (removedClothing) {
        state.totalPrice -= removedClothing.price
        state.items = state.items.filter((item) => item.clothing._id !== clothingId)
      }
    },
    resetCart: (state, action) => {
      state.items = []
      state.totalPrice = 0
      state.totalQuantity = 0
    },
  },
})

export const { addToCart, removeFromCart, resetCart } = cartSlice.actions

export default cartSlice.reducer


export const selectCurrentCart = state => state.cart
