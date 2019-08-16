import React from 'react';
import { Link } from 'react-router-dom'

function Error() {
  return (
    <div>
      <p>404 page not found</p>
      <Link to='/'>
        Return to home
      </Link>
    </div>
  )
}

export default Error