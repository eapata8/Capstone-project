import React, {useState} from 'react'

import productsData from '../../data/products.json'
import ProductCards from '../shop/ProductCards';

const Search = () => {
    const[searchQuery, setSearchQuerry] = useState('');
    const[filtredProducts, setFiltredProducts] = useState(productsData);
    
    const handleSearch = () => {
        const query = searchQuery.toLowerCase();
        const filtered = productsData.filter(product => product.name.toLowerCase().includes(query) ||
        product.description.toLocaleLowerCase().includes(query));
        setFiltredProducts(filtered);
    };

    return (
        <>
      <section className="section__container bg-primary-light">
        <h2 className="section__header capitalize">Search Products</h2>
        <p className="section__subheader">
        Browse a wide selection of categories, from everyday essentials to exciting new finds. Whatever you're looking for, we've got something for you!
        </p>
      </section>

      <section className='section__container'>
        <div className='w-full mb-12 flex flex-col md:flex-row items-center'>
          <input
            className='search-bar w-full max-w-4x1 p-2 border rounded'
            type='text'
            placeholder='Search for products...'
            value={searchQuery}
            onChange={(e) => setSearchQuerry(e.target.value)}
          />
          <button onClick= {handleSearch}
           className = 'search-button w-full md:w-auto py-3 px-8 bg-primary text-white rounded'>Search</button>
        </div> 
        <ProductCards products={filtredProducts}/>

      </section>
      </>
    );
}

export default Search