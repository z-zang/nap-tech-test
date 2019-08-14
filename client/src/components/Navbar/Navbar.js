import React, {useContext} from 'react';
// import useFetchProductsContext from '../../context/FetchProductsContext';

function Navbar() {
  // const offset = useContext(NavContext);
  // console.log('offset', offset)

  function updateOffset(offset){
    console.log('update offset firing')
  }

  return (
    <nav>
      <select>
        <option value="" selected disabled>Sort By</option>
        <option value="Price low to high">Price low to high</option>
        <option value="Price high to low">Price high to low</option>
        <option value="Designer">Designer A-Z</option>
      </select>

      <select>
        <option value="" selected disabled>Choose Designer</option>
        {/* fetch list of all designers and render here */}

        <option value="Designer">Designer</option>
      </select>

      <button onClick={updateOffset}>Fetch more results</button>
    </nav>
  )
}

export default Navbar