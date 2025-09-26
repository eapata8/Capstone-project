import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import cartImg from "../../assets/cart.png"; // Assurez-vous d'avoir une image de cart dans ce chemin


const CartNavigationPage = () => {
  const navigate = useNavigate();
  const [isMoving, setIsMoving] = useState(true);

  const handleCheckout = () => {
    setIsMoving(false);
    navigate("/checkout");
  };

  return (
    <section className="section__container bg-primary-light flex flex-col items-center justify-center h-screen text-center">
      <h2 className="section__header capitalize text-2xl font-semibold mb-4">
        Your cart is on the move 🛒
      </h2>
      <p className="section__subheader mb-6">
        ChaseCart is collecting your items...  
        Press the button when you're ready to checkout!
      </p>

      {/* Animation du cart */}
        <div className="relative w-full h-60 overflow-hidden">
        <img
            src={cartImg}
            alt="Shopping cart"
            className={`absolute left-0 bottom-0 w-48 h-48 object-contain ${
            isMoving ? "animate-[moveCart_10s_linear_infinite]" : ""
            }`}
        />
        </div>


      {/* Bouton */}
      <button
        onClick={handleCheckout}
        className="mt-10 bg-pink-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition duration-300"
      >
        J’ai ramassé mes articles → Checkout
      </button>

      {/* Animation keyframes */}
      <style>
        {`
          @keyframes moveCart {
            0% { transform: translateX(0); }
            100% { transform: translateX(100vw); }
          }
        `}
      </style>
    </section>
    
  );
};

export default CartNavigationPage;
