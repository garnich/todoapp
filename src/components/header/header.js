import React from 'react'
import { Link } from 'react-router-dom'

import './header.scss'

const Header = props => {
  const { auth, logout } = props

  return (
    <header className="d-flex justify-content-left ">
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
      {auth && (
        <button className="btn btn-secondary logout" onClick={() => logout()}>
          Logout
        </button>
      )}
    </header>
  )
}

export default Header
