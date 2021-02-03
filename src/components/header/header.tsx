import React, { FunctionComponent, ReactElement } from 'react'
import { NavLink } from 'react-router-dom'

import './header.scss'

interface IHeader {
  auth: string,
  logout: () => void
}

const Header: FunctionComponent<IHeader> = ({ auth, logout }):ReactElement => {
  return (
    <header className="d-flex justify-content-left ">
      <nav>
        <ul className="mb-0">
          <li>
            <NavLink to="/" exact={true} activeClassName="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/todo" activeClassName="active">
              App
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" activeClassName="active">
              About
            </NavLink>
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
