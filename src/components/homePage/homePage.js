import React, { Component } from 'react'
import {
  FaNpm,
  FaReact,
  FaNode,
  FaSass,
  FaBootstrap,
  FaDatabase,
} from 'react-icons/fa'
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
        <p>This is one of my app - ToDo.</p>
        <p className="reactIcons">
          <FaNpm />
          <FaReact />
          <FaNode />
          <FaSass />
          <FaBootstrap />
          <DiFirebase />
        </p>
      </div>
    )
  }
}

export default HomePage
