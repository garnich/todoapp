import React, { Component } from 'react'

import './aboutPage.scss'

class AboutPage extends Component {
  constructor() {
    super()
  }

  render() {
    var launchDate = new Date('06/26/2020')
    var today = new Date()
    var timeDiff = launchDate.getTime() - today.getTime()
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24))

    return (
      <div className="col-12 about_page">
        <h1>About ToDo App</h1>
        <div className="about_page_content">
          <div className="about_page_content_item">
            <h2>ToDo App v.1</h2>
            <ul>
              For creating SPA used:
              <li>React</li>
              <li>Firebase</li>
              <li>WebPack</li>
              <li>Express</li>
              <li>Bootstrap</li>
              <li>Sass</li>
              <li>GitHub</li>
              <li>Herocu (as PaaS)</li>
            </ul>
          </div>
          <div className="about_page_content_item">
            <h2>ToDo App v.1.1</h2>
            <p>{`${diffDays} days to go...`}</p>
            <ul>
              Updates of ToDo App:
              <li>Implement unit test</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default AboutPage
