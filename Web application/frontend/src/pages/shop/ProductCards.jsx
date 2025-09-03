import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';  
import { addToCart } from '../../redux/features/cart/cartSlice.js';

const formatMoney = (n) => Number(n || 0).toFixed(2);

const ProductCards = ({ products = [] }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products.map((product, idx) => (
        <div key={product.id ?? idx} className="relative group rounded-xl border bg-white shadow-sm hover:shadow-md transition h-full">
          {/* Zone image: ratio fixe */}
          <Link to={`/shop/${product.id}`} className="block rounded-t-xl overflow-hidden">
            {/* Choisis un ratio: 4/3 (ou square: aspect-square) */}
            <div className="aspect-[4/3] w-full bg-gray-100">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
            </div>
          </Link>

          {/* Bouton panier en overlay */}
          <div className="absolute top-3 right-3">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(product);
              }}
              aria-label={`Add ${product.name} to cart`}
              className="rounded-md bg-primary text-white p-1.5 hover:brightness-110"
            >
              <i className="ri-shopping-cart-2-line" />
            </button>
          </div>

          {/* Contenu */}
          <div className="p-3 flex flex-col items-center text-center gap-1">
            <h3 className="text-sm font-medium line-clamp-1">{product.name}</h3>
            <p className="text-gray-800">
              ${formatMoney(product.price)}
              {product?.oldPrice ? (
                <s className="ml-2 text-gray-500">${formatMoney(product.oldPrice)}</s>
              ) : null}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCards;
