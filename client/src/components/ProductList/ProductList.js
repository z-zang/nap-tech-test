import React from 'react';
import Product from '../Product/Product';

function ProductList({products}) {
  return (
    <main id="products-container">
    {products.map(el => 
      <Product 
        key={el.id}
        pid={el.id}
        name={el.name}
        price={el.price}
        designer={el.designer}
        img={el.image.outfit}
      />
    )}
  </main>
  )
}

export default ProductList
