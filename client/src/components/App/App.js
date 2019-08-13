import React, {useState, useEffect} from 'react';
import Product from '../Product/Product';
import Nav from '../Nav/Nav';
import './App.css';

function App() {
  const [products, setProducts] = useState([])


  // TEMP FIX THIS TO ACCOMMODATE NEW FETCH
  async function fetchProducts() {
    var res = await fetch('/api/products')
    console.log(res)
    var response = await res.json()
    console.log("response", response, typeof response)
    console.warn(res)
    setProducts(response.data)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  // TEMP
  // fetchTest()
  // fetchTest2()


  return (
    <React.Fragment>
      <Nav/>
      <main id="products-container">
        posthydrated main
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
