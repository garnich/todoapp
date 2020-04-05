import React from 'react'
import { Link } from 'react-router-dom'

import './header.css'

const Header = () => {
  return (
    <header className="d-flex justify-content-center ">
      <nav>
        <ul className="mb-0 py-2">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/todo">APP</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
