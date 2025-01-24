import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import productsData from '../../data/products.json';
import ProductCards from './ProductCards';


const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const foundProduct = productsData.find((product) => product.id === parseInt(id));
    setProduct(foundProduct);
  }, [id]);

  if (!product) {
    return <p>Product not found!</p>;
  }

  return (
    <>
      <section className="section__container bg-primary-light">
        <h2 className="section__header capitalize">{product.name}</h2>
      </section>

      <div className="product-info">
        {/* Pass the product as an array */}
        <ProductCards products={[product]} />
        <h3>{product.description}</h3>
      </div>
    </>
  );
};

export default SingleProduct;
