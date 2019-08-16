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
    console.log(response)
    setProdData(response)
  }

  useEffect(() => {

    fetchPid()
  }, [pid])

  function goBack() {
    window.history.back()

  }



  return (
    <div>
      <div className="product-detail">
        {/* <p>{prodData[0]}</p> */}
        {/* <p>{prodData[id]}</p> */}

          <p>{prodData.id}</p>
          
          <img src={prodData.images === undefined ? '' : prodData.images.large }/>
          <p>{prodData.name}</p>
          <p>{prodData.designer}</p>
          <p>{prodData.price}</p>
          {/* <img src={prodData.images.outfit}/> */}
          <img src={prodData.images === undefined ? '' : prodData.images.outfit }/>
          <img src={prodData.images === undefined ? '' : prodData.images.small }/>
          
          {prodData.onSale === true ? <p>on Sale</p> : ''}


        {/* <p>{prodData.designer}</p> */}
        <Link>
          <button onClick={goBack}>Back to products</button>
        </Link>
      </div>
    </div>

  )
}

export default ProductDetail

