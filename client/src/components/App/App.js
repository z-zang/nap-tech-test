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
  const fetchProducts = async () => {
    let designer = selDesigner === '' ? '' : `&designer=${selDesigner}` 
    let offsetVar = `&offset=${offset}`
    let sort = priceSort === '' ? '' : `&order=${priceSort}` 
    let url = '/api/products?' + designer + sort + offsetVar 
    console.log('fetchProducts requestURL:', url)
    try {
      let res = await fetch(url)
      let response = await res.json()
      setProducts(response.data)
      setTotalProducts(response.total)
    } catch(error) {
      console.log('error', error)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [offset, priceSort, selDesigner])

  return (
      <React.Fragment>
          <Switch>
            <Route exact path="/" render={(x) => 
              <Navbar {...x} 
                offset={offset} 
                setOffset={setOffset} 
                priceSort={priceSort}
                setPriceSort={setPriceSort}
                selDesigner={selDesigner}
                setSelDesigner={setSelDesigner}
                totalProducts={totalProducts} />}
              />
          </Switch>

          <Switch>
              <Route exact path="/" render={(x) => <ProductList {...x} products={products} totalProducts={totalProducts}/>}/>
              <Route exact path='/product/:pid' component={ProductDetail}/>
              <Route component={Error}/>
          </Switch>
      </React.Fragment>
  );
}

export default App;
