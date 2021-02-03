import React, { FunctionComponent, ReactElement } from 'react'

import './todoItem.scss'

interface IProps {
  name: string,
  delItem: () => void,
  addToDone: () => void,
  addToImportant: () => void,
  done: boolean,
  important: boolean
}

const TodoItem: FunctionComponent<IProps> = (props):ReactElement => {
  const { name, delItem, addToDone, addToImportant, done, important } = props
  let classNames = ''
  if (done) classNames += ' done'
  if (important) classNames += ' important'

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <span onClick={addToDone} className={classNames}>
        {name}
      </span>
      <span className="buttonBlock">
        <button
          className={`btn btn-outline-success ${done ? 'selectedDone' : ''}`}
          onClick={addToDone}
          title="DONE"
        >
          <i className="fa fa-check-square-o" />
        </button>
        <button
          className={`btn btn-outline-danger ${
            important ? 'selectedImportant' : ''
          }`}
          onClick={addToImportant}
          title="IMPORTANT"
        >
          <i className="fa fa-flag" />
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={delItem}
          title="REMOVE"
        >
          <i className="fa fa-trash-o" />
        </button>
      </span>
    </li>
  )
}

export default TodoItem
