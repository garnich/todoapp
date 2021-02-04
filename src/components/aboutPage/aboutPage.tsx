import React, { FunctionComponent, ReactElement } from 'react'

import './aboutPage.scss'

const AboutPage: FunctionComponent = ():ReactElement => {
  return (
    <div className="col-12 about_page">
        <h1>About ToDo App</h1>
        <div className="about_page_content">
          <div className="about_page_content_item">
            <h2>ToDo App v.1</h2>
            <ul>
              For creating SPA used:
              <li>React</li>
              <li>Typescript</li>
              <li>Firebase</li>
              <li>WebPack</li>
              <li>Express</li>
              <li>Bootstrap</li>
              <li>Sass</li>
              <li>GitHub</li>
              <li>Heroku (as PaaS)</li>
            </ul>
          </div>
        </div>
      </div>
  )
}

export default AboutPage
