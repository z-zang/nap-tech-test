import React, {useState, useEffect} from 'react'

function Product({pid, name, price, designer, img}) {
  return (
    <div id={pid} className="product">
      <p>{designer}</p>
      <img src={img} alt={name} className="prodImg"/>
      <p className="productText">{name}</p>
      <p>£{price}</p>
    </div>
  )
}

export default Product