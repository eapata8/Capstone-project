import React from 'react'
import { useParams } from 'react-router-dom'


const CategoryPage = () => {
    const{categoryName} = useParams()
    console.log(categoryName)
  return (
    <div>CategoryPage</div>
  )
}

export default CategoryPage