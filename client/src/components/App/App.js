import React, {useState, useEffect} from 'react';
import { Switch, Route} from 'react-router-dom'
import Navbar from '../Navbar/Navbar';
import ProductList from '../ProductList/ProductList';
import ProductDetail from '../ProductDetail/ProductDetail';
import Error from '../Error/Error'
import './App.css';

function App() {
  const [products, setProducts] = useState([])
  const [totalProducts, setTotalProducts] = useState('')
  const [offset, setOffset] = useState(0)
  const [priceSort, setPriceSort] = useState('')
  const [selDesigner, setSelDesigner] = useState('')

  // fetch products
  async function fetchProducts() {
    var designer = selDesigner === '' ? '' : `&designer=${selDesigner}` 
    var offsetVar = `&offset=${offset}`
    var sort = priceSort === '' ? '' : `&order=${priceSort}` 

    var url = '/api/products?' + designer + sort + offsetVar 
    console.log('fetchProducts requestURL:', url)
    var res = await fetch(url)
    var response = await res.json()
    setProducts(response.data)
    setTotalProducts(response.total)
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
          totalProducts={totalProducts}
        />

        <Switch>
            <Route exact path="/" render={(x) => <ProductList {...x} products={products} />}/>
            <Route exact path='/product/:pid' component={ProductDetail}/>
            <Route component={Error}/>
        </Switch>

      </React.Fragment>
  );
}



export default App;
