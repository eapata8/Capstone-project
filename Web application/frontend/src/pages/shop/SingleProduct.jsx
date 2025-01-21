import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import productsData from '../../data/products.json';

const SingleProduct = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);

  // Fetch the product details based on the id
  useEffect(() => {
    const foundProduct = productsData.find((product) => product.id === parseInt(id));
    setProduct(foundProduct);
  }, [id]);

  if (!product) {
    return <p>Product not found!</p>;
  }

  return (
    <>
      {/* Product details section */}
      <section className="section__container bg-primary-light">
        <h2 className="section__subheader capitalize">{product.name}</h2>
      </section>

      <div className="product-details">
        {/* Centered and smaller image */}
        <img src={product.image} alt={product.name} className="product-image-centered" />
        <div className="product-info">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p><strong>${product.price}</strong></p>
          {product.oldPrice && <p className="old-price"><s>${product.oldPrice}</s></p>}
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
