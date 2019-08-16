import React, {useState, useEffect} from 'react';

function Navbar({offset, setOffset, priceSort, setPriceSort, selDesigner, setSelDesigner, totalProducts}) {
  const [designers, setDesigners] = useState([])

  // fetch designers list for dropdown
  async function fetchDesignerList() {
    var res = await fetch('/api/designers')
    var response = await res.json()
    setDesigners(response.uniqDesArr)
  }

  useEffect(() => {
    fetchDesignerList()
  }, [])

  // update to custom amount
  function incrOffset() {
    var temp = offset + 60
    setOffset(temp)
  }
  function decrOffset() {
    var temp = offset - 60
    setOffset(temp)
  }

  function handleSetPriceSort(e) {
    setPriceSort(e.target.value)
    setOffset(0)
  }

  function handleSetDesigner(e) {
    setSelDesigner(e.target.value)
    setOffset(0)
  }

  return (
    <nav>
      <select value={priceSort} onChange={(e) => handleSetPriceSort(e)}>
        <option value="">Sort By</option>
        <option value="asc">Price low to high</option>
        <option value="desc">Price high to low</option>
      </select>

      <select value={selDesigner} onChange={(e) => handleSetDesigner(e)}>
        <option value="" defaultValue>Choose Designer</option>
        {designers.map(el =>
          <option value={el} key={designers[el]}>{el}</option>
        )}
      </select>

      <button onClick={decrOffset} disabled={offset<=0}>Prev Page</button>
      <button onClick={incrOffset} disabled={offset>500}>Next Page</button>

      <p>{totalProducts !== 0 ? (totalProducts > 1 ? `${totalProducts} results` : `${totalProducts} result`) : 'No results'}</p>
    </nav>
  )
}

export default Navbar