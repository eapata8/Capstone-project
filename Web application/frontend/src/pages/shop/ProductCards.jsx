import React from 'react';
import { Link } from 'react-router-dom';

const ProductCards = ({ products }) => {
  const dispatch = useDispatch();
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  }



  console.log(products);


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products.map((product) => (
        <div className="relative" key={product.id}>
          {/* Display product image */}
          <Link to={`/shop/${product.id}`} className="product_card">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto object-cover"
            />
          </Link>

          <div className='hover: block absolute top-3 right-3'>
            <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart(product);
            }}>
              <i className="ri-shopping-cart-2-line bg-primary p-1.5 text-white hover:bg-primary-dark" ></i>
            </button>
          </div>

          <div className="product__card__content">
            <h3>{product.name}</h3>
            <p>
              ${product.price}
              {product?.oldPrice ? <s> ${product.oldPrice}</s> : null}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCards;
