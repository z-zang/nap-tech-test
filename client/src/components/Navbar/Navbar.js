import React, {useState, useEffect} from 'react';

function Navbar({offset, setOffset, selDesigner, setSelDesigner}) {
  const [designers, setDesigners] = useState([])

  // fetch designers
  async function fetchDesignerList() {
    var res = await fetch('/api/designers')
    var response = await res.json()
    setDesigners(response.uniqDesArr)
  }

  useEffect(() => {
    fetchDesignerList()
  }, [])

  function incrOffset() {
    var temp = offset + 60
    setOffset(temp)
  }
  function decrOffset() {
    var temp = offset - 60
    setOffset(temp)
  }
  function handleSetDesigner(e) {
    console.log("designer select target", e.target.value)
    setSelDesigner(e.target.value)
  }

  return (
    <nav>
      <select>
        <option value="Sort By">Sort By</option>
        <option value="Price low to high">Price low to high</option>
        <option value="Price high to low">Price high to low</option>
      </select>

      <select value={selDesigner} onChange={(e) => handleSetDesigner(e)}>
        <option value="" defaultValue>Choose Designer</option>
        {designers.map(el =>
          <option value={el} key={designers[el]}>{el}</option>
        )}

      </select>

      <button onClick={decrOffset} disabled={offset<=0}>Prev Page</button>

      <button onClick={incrOffset} disabled={offset>500}>Next Page</button>
    </nav>
  )
}

export default Navbar