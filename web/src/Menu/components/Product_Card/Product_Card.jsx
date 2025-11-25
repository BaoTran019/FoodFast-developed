import React from 'react'
import './Product_Card.css'
//import img from '../../assets/menu/1_mieng_ga_gion.jpg'

function Product_Card({ food }) {
  if (!food) return null; // ⛑ tránh crash nếu bị undefined
  return (
    <div className='product-card'>
      <div className='product-img-wrapper'>
        <img className='product-img' src={ food.image } alt={ food.name } />
      </div>
      <h1 className='product-name'>{ food.name }</h1>
      <h2 className='product-price'>{ food.price }</h2>
    </div>
  )
}

export default Product_Card
