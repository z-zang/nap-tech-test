import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

function ProductDetail({match}) {
  const [prodData, setProdData] = useState({})
  var pid = match.params.pid

  // fetch by PID
  async function fetchPid() {
    var url = '/api/product/' + pid
    console.log('fetchPid requestURL:', url)
    var res = await fetch(url)
    var response = await res.json()
    setProdData(response)
  }

  useEffect(() => {
    fetchPid()
  }, [])

  function goBack() {
    window.history.back()
  }

  return (

    <div>
      <div className="product-detail">
          
          <img src={prodData.images === undefined ? '' : prodData.images.large }/>
          <p>{prodData.name}</p>
          <p>{prodData.designer}</p>
          <p>{prodData.price}</p>

          {

            !prodData.images ? null : 
            <div className="prod-detail-imgs">
              <img src={prodData.images.outfit} alt={`${prodData.name} outfit`}/>
              <img src={prodData.images.small} alt={`${prodData.name} small`}/>

            </div>

          }
          <p>{prodData.id}</p>
          {prodData.onSale === true ? <p>on Sale</p> : ''}

        <Link>
          <button onClick={goBack}>Back to products</button>
        </Link>
      </div>
    </div>

  )
}

export default ProductDetail

