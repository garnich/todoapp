import React, { FunctionComponent, ReactElement } from 'react'

import './title.scss'

interface ITitle {
  todo: number,
  done: number
}

const Title: FunctionComponent<ITitle>  = ({ todo, done }): ReactElement => {
  return (
    <div className="title pr-1">
      <h1 className="pr-1">My ToDo App</h1>
      <span>
        to do {todo}, done {done}
      </span>
    </div>
  )
}

export default Title
