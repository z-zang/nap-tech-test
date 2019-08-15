import React, {useState, useEffect} from 'react';
import Product from '../Product/Product';
import Navbar from '../Navbar/Navbar';
import './App.css';

function App() {
  const [products, setProducts] = useState([])
  const [offset, setOffset] = useState(0)
  const [priceSort, setPriceSort] = useState('')
  const [selDesigner, setSelDesigner] = useState('')

  async function fetchProducts() {
    var designer = selDesigner == '' ? '' : `&designer=${selDesigner}` 
    var offsetVar = `&offset=${offset}`
    var sort = priceSort == '' ? '' : `&order=${priceSort}` 

    var url = '/api/products?' + designer + sort + offsetVar 
    console.log('requestURL:', url)
    var res = await fetch(url)
    var response = await res.json()
    setProducts(response.data)
  }

  useEffect(() => {
    fetchProducts()
  }, [offset, priceSort, selDesigner])

  return (
      <React.Fragment>

        <Navbar 
          offset={offset} 
          setOffset={setOffset} 
          priceSort={priceSort}
          setPriceSort={setPriceSort}
          selDesigner={selDesigner}
          setSelDesigner={setSelDesigner}
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
