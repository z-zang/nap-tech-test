import React from 'react'
import { Link } from 'react-router-dom'

function Product({pid, name, price, designer, img}) {
  return (
    <div className="product">

      <Link to={`/product/${pid}`} className="router-link">
        <div id={pid} className="product-container">
          <p>{designer}</p>
          <img src={img} alt={name} className="prodImg"/>
          <p className="productText">{name}</p>
          <p>£{price}</p>
        </div>
      </Link>
    </div>
  )
}

export default Product