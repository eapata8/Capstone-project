import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: [],
    selectedItems: 0,
    totalPrice: 0,
    tax: 0,
    taxRate: 0.15,
    grandTotal: 0,

}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const isExist = state.products.find(product => product.id === action.payload.id),
            if (!isExist) {
                state.products.push({...action.payload, quantity: 1})
            } else {
                console.log('Item already exists')          }
            state.selectedItems = setSelectedItems(state);
            state.totalPrice = setTotalPrice(state); 
            state.tax = setTax(state);
            state.grandTotal = setgrantTotal(state);
        },


        removeFromCart: (state, action) => {
            // Remove item from cart
        },
        clearCart: (state) => {
            // Clear cart
        }
    }
})



//Utility function to set selected items
export const setSelectedItems = (state) => state.products.reduce((total, product) => 
    {return Number(total + product.quantity)})

export const setTotalPrice = (state) => state.products.reduce((total, product) =>
{ return Number(total + (product.price * product.quantity))})

export const setTax = (state) => setTotalPrice(state) * state.taxRate

export const setgrantTotal = (state) => setTotalPrice(state) + setTax(state)  

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions

export default cartSlice.reducer