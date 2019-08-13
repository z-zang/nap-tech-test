import React, {useState, useEffect} from 'react';
import Product from '../Product/Product'
import './App.css';

function App() {
  const [products, setProducts] = useState([]);

  async function fetchProducts() {
    var res = await fetch('/api/products')
    var response = await res.json()
    console.log("response", response, typeof response)
    setProducts(response.data)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <React.Fragment>
      <nav>
        sdfs
      </nav>
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

    </React.Fragment>

  );
}

export default App;
