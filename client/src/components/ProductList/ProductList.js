import React from 'react';
import Product from '../Product/Product';
import './ProductList.css'

function ProductList({products, totalProducts}) {
  return (
    <main id="products-container">

    { totalProducts != 0 ? null :
    <div>
      There are currently no products available for this designer.
    </div>
    }

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
