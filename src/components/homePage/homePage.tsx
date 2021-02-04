import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { FaNpm, FaReact, FaNode, FaSass, FaBootstrap } from 'react-icons/fa'
import { DiFirebase } from 'react-icons/di'

import './homePage.scss'

const HomePage: FunctionComponent = () => {
  const date: Date = new Date()
  const year: number = date.getFullYear()
  const month: string = date.toLocaleString('en', { month: 'long' })
  const day: number = date.getDate()

  return (
    <div className="col-12 home_page">
      <p>{`Hi, today is ${day} of ${month}, ${year} year.`}</p>
      <p>This is one of my app - ToDo.</p>
      <Link to="/todo">
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

export default HomePage
