import React, { FunctionComponent, ReactElement } from 'react'

import TodoItem from '../todoItem'

import './todoList.scss'

interface Itodo {
  done: boolean,
  hide: boolean,
  id: string,
  important: boolean,
  name: string
}

interface IProps {
  todo: Array<Itodo>,
  onDeleted: (id: string) => void,
  addToDone: (id: string) => void,
  addToImportant: (id: string) => void
}

const TodoList:FunctionComponent<IProps> = ({ todo, onDeleted, addToDone, addToImportant }):ReactElement => {
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

export default TodoList
