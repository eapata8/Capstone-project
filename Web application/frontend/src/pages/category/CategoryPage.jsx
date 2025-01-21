import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import products from "../../data/products.json"
import ProductCards from '../shop/ProductCards';



const CategoryPage = () => {
    const { categoryName } = useParams();
    const [filteredProducts, setFilteredProducts] = useState([]);
  
    useEffect(() => {
      const filtered = products.filter((product) =>  product.category === categoryName.toLowerCase()

      );
      setFilteredProducts(filtered);
    }, [categoryName])
  
    return (
    <>
      <section className="section__container bg-primary-light">
        <h2 className="section__header capitalize">{categoryName}</h2>
        <p className="section__subheader">
        Browse a wide selection of categories, from everyday essentials to exciting new finds. Whatever you're looking for, we've got something for you!
        </p>
      </section>
      <div className='section__container'>
        <ProductCards products ={filteredProducts}/>
      </div>
      </>
    );
  };
  
  export default CategoryPage;