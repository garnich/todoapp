import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './todoItem.scss'

const TodoItem = props => {
  const { name, delItem, addToDone, addToImportant, done, important } = props
  let classNames = ''
  if (done) classNames += ' done'
  if (important) classNames += ' important'

  return (
    <li className="list-group-item d-flex justify-content-between">
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

TodoItem.propTypes = {
  name: PropTypes.string.isRequired,
  delItem: PropTypes.func.isRequired,
  addToDone: PropTypes.func.isRequired,
  addToImportant: PropTypes.func.isRequired,
  done: PropTypes.bool,
  important: PropTypes.bool,
}

TodoItem.defaultProps = {
  done: false,
  important: false,
}

export default TodoItem
