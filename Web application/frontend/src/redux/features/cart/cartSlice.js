import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [],
    selectedItems: 0,
    totalPrice: 0,
    tax: 0,
    taxRate: 0.15,
    grandTotal: 0,
};

// Utility function to set selected items
const setSelectedItems = (state) => 
    state.products.reduce((total, product) => total + product.quantity, 0);

// Utility function to set total price
const setTotalPrice = (state) => 
    state.products.reduce((total, product) => total + product.price * product.quantity, 0);

// Utility function to set tax
const setTax = (state) => setTotalPrice(state) * state.taxRate;

// Utility function to set grand total
const setGrandTotal = (state) => setTotalPrice(state) + setTax(state);

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const isExist = state.products.find(product => product.id === action.payload.id);
            if (!isExist) {
                state.products.push({ ...action.payload, quantity: 1 });
            } else {
                isExist.quantity += 1;
            }
            state.selectedItems = setSelectedItems(state);
            state.totalPrice = setTotalPrice(state);
            state.tax = setTax(state);
            state.grandTotal = setGrandTotal(state);
        },

        updateQuantity: (state, action) => {
            const product = state.products.find(product => product.id === action.payload.id);
            if (product) {
                if (action.payload.type === 'increment') {
                    product.quantity += 1;
                } else if (action.payload.type === 'decrement' && product.quantity > 1) {
                    product.quantity -= 1;
                }
            }
            state.selectedItems = setSelectedItems(state);
            state.totalPrice = setTotalPrice(state);
            state.tax = setTax(state);
            state.grandTotal = setGrandTotal(state);
        },

        removeFromCart: (state, action) => {
            state.products = state.products.filter(product => product.id !== action.payload.id);
            state.selectedItems = setSelectedItems(state);
            state.totalPrice = setTotalPrice(state);
            state.tax = setTax(state);
            state.grandTotal = setGrandTotal(state);
        },

        clearCart: (state) => {
            state.products = [];
            state.selectedItems = 0;
            state.totalPrice = 0;
            state.tax = 0;
            state.grandTotal = 0;
        }
    }
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
