import React, {useState, useEffect} from 'react';
import Product from '../Product/Product';
import Navbar from '../Navbar/Navbar';
import './App.css';

function App() {
  const [products, setProducts] = useState([])
  const [offset, setOffset] = useState(0)

// add functionality to get stuff from one designer only: might need to update express?
  async function fetchProducts() {
    var url = `/api/products?offset=${offset}`
    var res = await fetch(url)
    var response = await res.json()
    setProducts(response.data)
  }

  useEffect(() => {
    fetchProducts()
  }, [offset])

  return (
      <React.Fragment>

        <Navbar 
          offset={offset} 
          setOffset={setOffset} 
          fetchProducts={fetchProducts}
        />
      
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
