import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FaNpm, FaReact, FaNode, FaSass, FaBootstrap } from 'react-icons/fa'
import { DiFirebase } from 'react-icons/di'

import './homePage.scss'

class HomePage extends Component {
  constructor() {
    super()
  }

  render() {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.toLocaleString('en', { month: 'long' })
    const day = date.getDate()

    return (
      <div className="col-12 home_page">
        <p>{`Hi, today is ${day} of ${month}, ${year} year.`}</p>
        <p>This is one of my app - ToDo<sup>v.1.1</sup>.</p>
        <Link to="/app/todo">
          <button className="btn btn-outline-secondary btn-lg mt-4 mb-4">
            {' '}
            Welcome!{' '}
          </button>
        </Link>
        <div className="reactIcons">
          <FaNpm title="NPM" />
          <FaReact title="React" />
          <FaNode title="Node" />
          <FaSass title="Sass" />
          <FaBootstrap title="Bootstrap" />
          <DiFirebase title="Firebase" />
        </div>
      </div>
    )
  }
}

export default HomePage
