import React, {useState, useEffect, createContext} from 'react';
import Product from '../Product/Product';
import Navbar from '../Navbar/Navbar';
import './App.css';

function App() {
  const [products, setProducts] = useState([])

  // console.log(offset)
  // const [query, setQuery] = useState([])

  // TEMP FIX THIS TO ACCOMMODATE NEW FETCH
  async function fetchProducts() {
    var url = `/api/products`
    var res = await fetch(url)
    console.log(res)
    var response = await res.json()
    console.log("response", response, typeof response)
    console.warn(res)
    setProducts(response.data)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
      <React.Fragment>

          <Navbar/>
      
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
