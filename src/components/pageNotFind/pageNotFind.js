import React from 'react'
import { Link } from 'react-router-dom'

import './pageNotFind.scss'

const PageNotFind = () => {
  return (
    <div className="col-12 not_find_page">
      <p>Page not found</p>
      <p>404</p>
      <Link to="/app">
        <button className="btn btn-outline-secondary btn-lg mt-4 mb-4">
          To Home page
        </button>
      </Link>
    </div>
  )
}

export default PageNotFind
