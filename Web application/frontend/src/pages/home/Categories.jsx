import React from 'react'

import category1 from "../../assets/category-1.jpg"
import category2 from "../../assets/category-2.jpg"
import category3 from "../../assets/category-3.jpg"
import category4 from "../../assets/category-4.jpg"
import { Link } from 'react-router-dom'


const Categories = () => {
    const categories =[
        {name:'Groceries',path: 'groceries', image:category1 },
        {name:'Clothing, Shoes and accessories',path: 'clothing', image:category2 },
        {name:'Electronics',path: 'electronics', image:category3 },
        {name:'Personnal care',path: 'personnal care', image:category4}
    ]
  return (
    <>
    <div className='product__grid'>
        {
        categories.map((category) => (
            <Link to={`/categories/${category.path}`} className='categories__card'>
                <img src={category.image} alt={category.name}></img>
                <h4>{category.name}</h4>
            </Link>
        ))
    }
    </div>
    </>
  )
}

export default Categories