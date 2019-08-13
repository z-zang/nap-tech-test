import React, {useState, useEffect} from 'react'

function Nav({pid, name, price, designer, img}) {
  return (
    <div>
      <select>
        <option value="Price low to high">Price low to high</option>
        <option value="Price high to low">SaPrice high to lowab</option>
        <option value="Designer">Designer</option>
      </select>

      <select>
        <option value="Designer">Designer</option>
      </select>
    </div>
  )
}

export default Nav