import React, {useState, useEffect} from 'react';
import './Navbar.css'

function Navbar({offset, setOffset, priceSort, setPriceSort, selDesigner, setSelDesigner, totalProducts}) {
  const [designers, setDesigners] = useState([])

  // fetch designers list for dropdown
  async function fetchDesignerList() {
    let res = await fetch('/api/designers')
    let response = await res.json()
    setDesigners(response.uniqDesArr)
  }

  useEffect(() => {
    fetchDesignerList()
  }, [])

  // update to custom amount
  const incrOffset = () => {
    let temp = offset + 60
    setOffset(temp)
  }

  const decrOffset = () => {
    let temp = offset - 60
    setOffset(temp)
  }

  const handleSetPriceSort = (e) => {
    setPriceSort(e.target.value)
    setOffset(0)
  }

  const handleSetDesigner = (e) => {
    setSelDesigner(e.target.value)
    setOffset(0)
  }

  const showResults = () => {
    let limit = offset + 60 >= totalProducts ? totalProducts : offset + 60
    if (totalProducts !== 0) {
      if (totalProducts > 60) {
        return `Showing ${offset} to ${limit} of ${totalProducts} results`
      } else if (totalProducts > 1) {
        return `Showing ${totalProducts} results`
      }
      else {
        return `${totalProducts} result`
      } 
    } else {
        return 'No results'
    }
  }

  return (
    <nav>
      <select value={priceSort} onChange={(e) => handleSetPriceSort(e)}>
        <option value="">Sort By</option>
        <option value="asc">Price low to high</option>
        <option value="desc">Price high to low</option>
      </select>

      <select value={selDesigner} onChange={(e) => handleSetDesigner(e)}>
        <option value="" defaultValue>All Designers</option>
        {designers.map(el =>
          <option value={el} key={designers[el]}>{el}</option>
        )}
      </select>
      
      <span>
      {totalProducts < 60 ? null :
        <div>
        <button className='pagination-button' onClick={decrOffset} disabled={offset<=0}>← Prev Page</button>
        <button className='pagination-button' onClick={incrOffset} disabled={offset + 60 > totalProducts}>Next Page →</button>
        </div>
      }
      </span>

      <div>{showResults()}</div>
    </nav>
  )
}

export default Navbar