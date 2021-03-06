import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './ProductDetail.css'

function ProductDetail({match}) {
  const [prodData, setProdData] = useState({})
  let pid = match.params.pid

  // fetch by PID
  const fetchPid = async () => {
    let url = '/api/product/' + pid
    console.log('fetchPid requestURL:', url)
    try {
      let res = await fetch(url)
      let response = await res.json()
      setProdData(response)
    } catch(error) {
      console.log('error', error)
    }
  }

  useEffect(() => {
    fetchPid()
  }, [])

  const goBack = () => {
    window.history.back()
  }

  if (Object.getOwnPropertyNames(prodData).length === 0) {
    return (
      <div>Loading..</div>
    )
  }

  return (
    <div>
      <div className="product-detail">  
        <Link to='/'>
          <button className='back-button' onClick={goBack}>⬅ Back to products</button>
        </Link>

          <h2>{prodData.designer}</h2>
          <h4>{prodData.name}</h4>
          <p>£{prodData.price}</p>

          <img src={prodData.images.large} alt={`${prodData.name} large`} className='image-large'/>

          <div className="prod-detail-imgs">
            <img src={prodData.images.outfit} alt={`${prodData.name} outfit`}/>
            <img src={prodData.images.small} alt={`${prodData.name} small`}/>
          </div>

          <p><i>Product id: {prodData.id}</i></p>

          {prodData.onSale === true ? <p>Onsale</p> : ''}
          
          { prodData.badges.map((el, i) => 
          <p key={i}>Badge: {el}</p>)}
          <div>
            {prodData.sizes.map((el, i) => 
            <button key={i}>Size: {el.name}</button>
            )}
          </div>

      </div>
    </div>

  )
}

export default ProductDetail

