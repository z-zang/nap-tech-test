import React, {useState, useEffect} from 'react';

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
    <div className="App">
      {products.map(el => 
        <div key={el.id}>
          {el.id}
          {el.name}
          {el.price}
          <img src={el.image.outfit} alt={el.name}/>
        </div>
      )}
    </div>
  );
}

export default App;
