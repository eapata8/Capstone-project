import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearCart } from '../../redux/features/cart/cartSlice'
import { useNavigate } from 'react-router-dom'

const OrderSummary = ({ onClose }) => {
  const { tax, taxRate, totalPrice, grandTotal, selectedItems } = useSelector((s) => s.cart)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const itemsCount =
    Array.isArray(selectedItems) ? selectedItems.length :
    typeof selectedItems === 'number' ? selectedItems : 0

    const handleSendToCart = () => {
    onClose?.();           
    window.scrollTo({ top: 0, behavior: "smooth" }); // 🔥 force le scroll en haut
    navigate('/cart-navigation');  
    };


  return (
    <div className='bg-primary-light mt-5 rounded text-base shadow-lg p-6'>
      <h2 className='text-xl text-text-dark font-semibold mb-4'>Order Summary</h2>

      <p className='text-text-dark'>
        Selected Items: <span className='font-medium'>{itemsCount}</span>
      </p>
      <p>
        Total Price: <span className='font-medium'>${Number(totalPrice || 0).toFixed(2)}</span>
      </p>
      <p>
        Tax ({Number((taxRate || 0) * 100).toFixed(2)}%): <span className='font-medium'>${Number(tax || 0).toFixed(2)}</span>
      </p>
      <h3 className='font-bold text-lg mt-2'>
        Grand Total: <span className='text-green-600'>${Number(grandTotal || 0).toFixed(2)}</span>
      </h3>

      <div className='flex justify-between mt-6'>
        <button
          className='bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition duration-300'
          onClick={() => dispatch(clearCart())}
        >
          <i className="ri-delete-bin-2-line"></i>
          Clear Cart
        </button>

        <button
          className='bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition duration-300'
          disabled={itemsCount === 0}
          onClick={handleSendToCart}
        >
          Send to cart
        </button>
      </div>
    </div>
  )
}

export default OrderSummary
