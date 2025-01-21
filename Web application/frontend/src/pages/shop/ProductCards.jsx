import React from 'react'

const ProductCards = ({ products }) => {
  console.log(products);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products.map((product, index) => (
        <div key={index} className="product_card">
          <div className="relative">
            {/* Display product image */}
            <img 
              src={product.image}
              alt={product.name}      
              className="w-full h-auto object-cover" 
            />
          </div>
          <div className="product__card__content">
            <h3>{product.name}</h3>
            <p>
              ${product.price} 
              {product?.oldPrice ? <s>${product?.oldPrice}</s> : null}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCards;

