import React from "react";
import { useNavigate } from "react-router-dom";
import cartImg from "../../assets/cart.png"; 
import Type from '../../components/Type';

const CartNavigationPage = () => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <section className="section__container bg-primary-light h-screen flex flex-col items-center justify-between text-center p-8 overflow-hidden">
      {/* Text at top */}
      <div>
        <h2 className="section__header capitalize text-3xl font-bold mb-4">
          Your cart is on the move 🛒
        </h2>
        <p className="section__subheader text-lg text-gray-700 max-w-2xl mx-auto">
          <Type texts={["ChaseCart is collecting your items...", "Press the button when you're ready to checkout!"]} />
        </p>
      </div>

      {/* Animated cart image in center */}
      <div className="flex-1 flex items-center justify-center relative w-full">
        <img
          src={cartImg}
          alt="Shopping cart"
          className="w-[400px] h-auto object-contain animate-moveCart"
        />
      </div>

      {/* Button at bottom */}
      <div className="mb-10">
        <button
          onClick={handleCheckout}
          className="bg-pink-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-600 transition duration-300"
        >
          I'm done → Checkout
        </button>
      </div>

      {/* Keyframes for cart animation */}
      <style>
        {`
          @keyframes moveCart {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
          .animate-moveCart {
            animation: moveCart 6s linear infinite;
          }
        `}
      </style>
    </section>
  );
};

export default CartNavigationPage;
