import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './todoItem.css'

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
      <span>
        <button className="btn btn-outline-success" onClick={addToImportant}>
          <i className="fa fa-flag" />
        </button>
        <button className="btn btn-outline-danger" onClick={delItem}>
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
