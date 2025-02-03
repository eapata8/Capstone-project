import React from 'react'
import { useSelector } from 'react-redux'

const OrderSummary = () => {
    const { tax, taxRate, totalPrice, grandTotal, selectedItems } = useSelector((store) => store.cart)

    return (
        <div className='bg-primary-light mt-5 rounded text-base shadow-lg p-6'>
            <h2 className='text-xl text-text-dark font-semibold mb-4'> 
                Order Summary
            </h2>
            <p className='text-text-dark'>
                Selected Items: <span className='font-medium'>{selectedItems}</span>
            </p>
            <p>
                Total Price: <span className='font-medium'>${totalPrice.toFixed(2)}</span>
            </p>
            <p>
                Tax ({(taxRate * 100).toFixed(2)}%): <span className='font-medium'>${tax.toFixed(2)}</span>
            </p>
            <h3 className='font-bold text-lg mt-2'>
                Grand Total: <span className='text-green-600'>${grandTotal.toFixed(2)}</span>
            </h3>

            <div className='flex justify-between mt-6'>
                <button className='bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition duration-300'>
                    <i className="ri-delete-bin-2-line"></i>
                    Clear Cart
                </button>
                <button className='bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition duration-300'>
                    Proceed to Checkout  
                </button>  
            </div>
        </div>
    )
}

export default OrderSummary
