import React from 'react'
import PropTypes from 'prop-types'

import TodoItem from '../todoItem'

import './todoList.scss'

const TodoList = ({ todo, onDeleted, addToDone, addToImportant }) => {
  if (!todo.length) return null

  return (
    <ul className="list-group container-fluid">
      {todo.map(({ name, id, important, done }) => {
        return (
          <TodoItem
            key={id}
            name={name}
            important={important}
            done={done}
            delItem={() => onDeleted(id)}
            addToDone={() => addToDone(id)}
            addToImportant={() => addToImportant(id)}
          />
        )
      })}
    </ul>
  )
}

TodoList.propTypes = {
  todo: PropTypes.arrayOf(
    PropTypes.shape({
      done: PropTypes.bool,
      hide: PropTypes.bool,
      important: PropTypes.bool,
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  onDeleted: PropTypes.func.isRequired,
  addToDone: PropTypes.func.isRequired,
  addToImportant: PropTypes.func.isRequired,
}

TodoList.defaultProps = {
  todo: PropTypes.arrayOf(
    PropTypes.shape({
      done: false,
      hide: false,
      important: false,
    })
  ),
}

export default TodoList
