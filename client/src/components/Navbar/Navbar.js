import React, {useState, useEffect} from 'react';

function Navbar({offset, setOffset, fetchProducts}) {
  const [designers, setDesigners] = useState([])
  console.log("offset from navbar", offset)

  // fetch designers
  async function fetchDesignerList() {
    var res = await fetch('/api/designers')
    var response = await res.json()
    console.log("response", response.uniqDesArr, typeof response)
    setDesigners(response.uniqDesArr)
  }

  useEffect(() => {
    fetchDesignerList()
    console.log(designers)
  }, [])

  function incrOffset() {
    offset += 60
    setOffset(offset)
    // console.log('incrOffset')
    fetchProducts()
  }

  function decrOffset() {
    offset -= 60
    setOffset(offset)
    // console.log('decrOffset')
    fetchProducts()
  }

  return (
    <nav>
      <select>
        <option value="" defaultValue disabled>Sort By</option>
        <option value="Price low to high">Price low to high</option>
        <option value="Price high to low">Price high to low</option>
        <option value="Designer">Designer A-Z</option>
      </select>

      <select>
        <option value="" defaultValue disabled>Choose Designer</option>
        {designers.map(el =>
          <option value={el}>{el}</option>
        )}

        <option value="Designer">Designer</option>
      </select>

      <button onClick={decrOffset} disabled={offset<=0}>Prev Page</button>

      <button onClick={incrOffset} disabled={offset>500}>Next Page</button>
    </nav>
  )
}

export default Navbar