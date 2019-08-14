import React, {useState, useEffect} from 'react';
import Product from '../Product/Product';
import Navbar from '../Navbar/Navbar';
import './App.css';

function App() {
  const [products, setProducts] = useState([])
  const [offset, setOffset] = useState(0)

  // console.log('offset from App.js', offset)
  // console.log('products', products[0])

  // TEMP FIX THIS TO ACCOMMODATE NEW FETCH
  async function fetchProducts() {
    var url = `/api/products?offset=${offset}`
    var res = await fetch(url)
    // console.log(res)
    var response = await res.json()
    // console.log("response", response, typeof response)
    // console.warn(res)
    setProducts(response.data)
  }

  useEffect(() => {
    fetchProducts()
    // console.log("useEffect sent")
  }, [])

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
